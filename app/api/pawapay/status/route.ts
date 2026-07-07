import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const BASE_URL = process.env.PAWAPAY_BASE_URL || 'https://api.sandbox.pawapay.io';
const TOKEN = process.env.PAWAPAY_API_TOKEN;

// Polls a PawaPay deposit's status. Returns { final, status, failure } where
// `final` is true once the deposit is COMPLETED or FAILED.
export async function GET(req: NextRequest) {
  if (!TOKEN) {
    return NextResponse.json({ final: true, status: 'FAILED', failure: 'Payment is not configured.' }, { status: 500 });
  }
  const depositId = req.nextUrl.searchParams.get('depositId');
  if (!depositId) {
    return NextResponse.json({ error: 'Missing depositId.' }, { status: 400 });
  }

  try {
    const res = await fetch(`${BASE_URL}/deposits/${encodeURIComponent(depositId)}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    const data = await res.json().catch(() => null);
    // v1 GET /deposits/{id} returns an array with a single deposit object.
    const deposit = Array.isArray(data) ? data[0] : data;
    const status: string = deposit?.status || 'UNKNOWN';
    const final = status === 'COMPLETED' || status === 'FAILED';
    const failure = deposit?.failureReason?.failureMessage || deposit?.failureReason?.failureCode || null;
    return NextResponse.json({ final, status, failure });
  } catch {
    // Transient error — tell the client to keep polling.
    return NextResponse.json({ final: false, status: 'PENDING' });
  }
}
