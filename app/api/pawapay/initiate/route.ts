import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import {
  getCountry,
  isValidProvider,
  isValidPhone,
  normalisePhone,
  convertUsdToLocal,
  parseRatesEnv,
} from '@/lib/pawapay/config';

export const dynamic = 'force-dynamic';

const BASE_URL = process.env.PAWAPAY_BASE_URL || 'https://api.sandbox.pawapay.io';
const TOKEN = process.env.PAWAPAY_API_TOKEN;

// Initiates a PawaPay mobile-money deposit. The amount is (re)computed from the
// USD total × the server-side FX rate — the client's currency figure is never
// trusted. Returns a depositId the client polls with /api/pawapay/status.
export async function POST(req: NextRequest) {
  if (!TOKEN) {
    return NextResponse.json({ ok: false, error: 'Payment is not configured.' }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  const country = getCountry(String(body.country || ''));
  if (!country) {
    return NextResponse.json({ ok: false, error: 'Unsupported country.' }, { status: 400 });
  }
  const provider = String(body.provider || '');
  if (!isValidProvider(country, provider)) {
    return NextResponse.json({ ok: false, error: 'Unsupported mobile-money provider.' }, { status: 400 });
  }
  const phone = String(body.phone || '');
  if (!isValidPhone(country, phone)) {
    return NextResponse.json({ ok: false, error: `Enter a valid ${country.name} number, e.g. ${country.example}.` }, { status: 400 });
  }

  const amountUsd = Number(body.amountUsd);
  if (!Number.isFinite(amountUsd) || amountUsd <= 0) {
    return NextResponse.json({ ok: false, error: 'Invalid amount.' }, { status: 400 });
  }

  const rates = parseRatesEnv(process.env.PAWAPAY_USD_RATES);
  const localAmount = convertUsdToLocal(amountUsd, country.currency, rates);
  if (localAmount == null) {
    return NextResponse.json({ ok: false, error: 'This currency is not available for payment.' }, { status: 400 });
  }

  const depositId = randomUUID();
  const payload = {
    depositId,
    amount: String(localAmount),
    currency: country.currency,
    correspondent: provider,
    payer: { type: 'MSISDN', address: { value: normalisePhone(phone) } },
    customerTimestamp: new Date().toISOString(),
    statementDescription: (process.env.PAWAPAY_STATEMENT_DESCRIPTION || 'Registration')
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .slice(0, 22),
    metadata: [
      body.email ? { fieldName: 'email', fieldValue: String(body.email) } : null,
      body.name ? { fieldName: 'name', fieldValue: String(body.name) } : null,
    ].filter(Boolean),
  };

  try {
    const res = await fetch(`${BASE_URL}/deposits`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({} as Record<string, unknown>));

    // PawaPay responds with status ACCEPTED | REJECTED | DUPLICATE_IGNORED.
    if (!res.ok || data.status === 'REJECTED') {
      const rejection = data.rejectionReason as { rejectionMessage?: string; rejectionCode?: string } | undefined;
      const error = rejection?.rejectionMessage || rejection?.rejectionCode || 'The payment request was rejected.';
      return NextResponse.json({ ok: false, error }, { status: 400 });
    }

    return NextResponse.json({ ok: true, depositId, amount: localAmount, currency: country.currency });
  } catch {
    return NextResponse.json({ ok: false, error: 'Could not reach the payment provider. Please try again.' }, { status: 502 });
  }
}
