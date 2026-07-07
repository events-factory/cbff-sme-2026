import { NextResponse } from 'next/server';
import { PAWAPAY_COUNTRIES, parseRatesEnv } from '@/lib/pawapay/config';

export const dynamic = 'force-dynamic';

// Returns the countries that have a configured USD conversion rate, each with
// its providers and rate, so the client can render the selectors and show the
// converted local amount. No secrets are exposed (rates are not sensitive).
export async function GET() {
  const rates = parseRatesEnv(process.env.PAWAPAY_USD_RATES);
  const countries = PAWAPAY_COUNTRIES
    .filter(c => rates[c.currency])
    .map(c => ({
      code: c.code,
      name: c.name,
      currency: c.currency,
      dialPrefix: c.dialPrefix,
      example: c.example,
      providers: c.providers,
      rate: rates[c.currency],
    }));
  return NextResponse.json({ countries });
}
