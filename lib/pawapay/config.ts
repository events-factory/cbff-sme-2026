// PawaPay country / mobile-money-provider configuration.
//
// PawaPay charges in each country's local currency, so registration fees (USD)
// are converted at the rates supplied via the PAWAPAY_USD_RATES env var. A
// country with no configured rate is treated as unavailable.
//
// The `provider` codes are PawaPay "correspondent" identifiers. They should be
// validated against your account's active configuration (PawaPay `/active-conf`)
// before going live, since availability depends on your PawaPay contract.

export interface PawaPayProvider {
  /** PawaPay correspondent code, e.g. "MTN_MOMO_ZMB". */
  provider: string;
  /** Human-readable network name shown in the dropdown. */
  name: string;
}

export interface PawaPayCountry {
  /** ISO-3166 alpha-3 country code, e.g. "ZMB". */
  code: string;
  name: string;
  /** ISO-4217 currency charged by PawaPay, e.g. "ZMW". */
  currency: string;
  /** International dial prefix without "+", e.g. "260". */
  dialPrefix: string;
  /** Example full MSISDN shown as the format hint. */
  example: string;
  providers: PawaPayProvider[];
}

export const PAWAPAY_COUNTRIES: PawaPayCountry[] = [
  {
    code: 'ZMB', name: 'Zambia', currency: 'ZMW', dialPrefix: '260', example: '260763456789',
    providers: [
      { provider: 'MTN_MOMO_ZMB', name: 'MTN MoMo' },
      { provider: 'AIRTEL_OAPI_ZMB', name: 'Airtel Money' },
      { provider: 'ZAMTEL_ZMB', name: 'Zamtel Kwacha' },
    ],
  },
  {
    code: 'KEN', name: 'Kenya', currency: 'KES', dialPrefix: '254', example: '254712345678',
    providers: [
      { provider: 'MPESA_KEN', name: 'M-PESA' },
      { provider: 'AIRTEL_OAPI_KEN', name: 'Airtel Money' },
    ],
  },
  {
    code: 'TZA', name: 'Tanzania', currency: 'TZS', dialPrefix: '255', example: '255712345678',
    providers: [
      { provider: 'VODACOM_TZA', name: 'Vodacom M-PESA' },
      { provider: 'AIRTEL_OAPI_TZA', name: 'Airtel Money' },
      { provider: 'TIGO_TZA', name: 'Tigo Pesa' },
      { provider: 'HALOTEL_TZA', name: 'Halopesa' },
      { provider: 'AZAMPESA_TZA', name: 'Azam Pesa' },
    ],
  },
  {
    code: 'UGA', name: 'Uganda', currency: 'UGX', dialPrefix: '256', example: '256712345678',
    providers: [
      { provider: 'MTN_MOMO_UGA', name: 'MTN MoMo' },
      { provider: 'AIRTEL_OAPI_UGA', name: 'Airtel Money' },
    ],
  },
  {
    code: 'RWA', name: 'Rwanda', currency: 'RWF', dialPrefix: '250', example: '250781234567',
    providers: [
      { provider: 'MTN_MOMO_RWA', name: 'MTN MoMo' },
      { provider: 'AIRTEL_RWA', name: 'Airtel Money' },
    ],
  },
  {
    code: 'GHA', name: 'Ghana', currency: 'GHS', dialPrefix: '233', example: '233241234567',
    providers: [
      { provider: 'MTN_MOMO_GHA', name: 'MTN MoMo' },
      { provider: 'VODAFONE_GHA', name: 'Telecel Cash' },
      { provider: 'AIRTELTIGO_GHA', name: 'AirtelTigo Money' },
    ],
  },
  {
    code: 'CIV', name: "Côte d'Ivoire", currency: 'XOF', dialPrefix: '225', example: '2250712345678',
    providers: [
      { provider: 'MTN_MOMO_CIV', name: 'MTN MoMo' },
      { provider: 'ORANGE_CIV', name: 'Orange Money' },
      { provider: 'MOOV_CIV', name: 'Moov Money' },
    ],
  },
  {
    code: 'CMR', name: 'Cameroon', currency: 'XAF', dialPrefix: '237', example: '237671234567',
    providers: [
      { provider: 'MTN_MOMO_CMR', name: 'MTN MoMo' },
      { provider: 'ORANGE_CMR', name: 'Orange Money' },
    ],
  },
  {
    code: 'SEN', name: 'Senegal', currency: 'XOF', dialPrefix: '221', example: '221771234567',
    providers: [
      { provider: 'ORANGE_SEN', name: 'Orange Money' },
      { provider: 'FREE_SEN', name: 'Free Money' },
    ],
  },
  {
    code: 'BEN', name: 'Benin', currency: 'XOF', dialPrefix: '229', example: '22951234567',
    providers: [
      { provider: 'MTN_MOMO_BEN', name: 'MTN MoMo' },
      { provider: 'MOOV_BEN', name: 'Moov Money' },
    ],
  },
  {
    code: 'COD', name: 'DR Congo', currency: 'CDF', dialPrefix: '243', example: '243811234567',
    providers: [
      { provider: 'VODACOM_MPESA_COD', name: 'Vodacom M-PESA' },
      { provider: 'AIRTEL_COD', name: 'Airtel Money' },
      { provider: 'ORANGE_COD', name: 'Orange Money' },
    ],
  },
  {
    code: 'MWI', name: 'Malawi', currency: 'MWK', dialPrefix: '265', example: '265991234567',
    providers: [
      { provider: 'AIRTEL_MWI', name: 'Airtel Money' },
      { provider: 'TNM_MWI', name: 'TNM Mpamba' },
    ],
  },
  {
    code: 'NGA', name: 'Nigeria', currency: 'NGN', dialPrefix: '234', example: '2348012345678',
    providers: [
      { provider: 'MTN_MOMO_NGA', name: 'MTN MoMo' },
      { provider: 'AIRTEL_NGA', name: 'Airtel Money' },
    ],
  },
];

/** Look up a country by its ISO-3 code. */
export function getCountry(code: string): PawaPayCountry | undefined {
  return PAWAPAY_COUNTRIES.find(c => c.code === code);
}

/** True when a provider code belongs to the given country. */
export function isValidProvider(country: PawaPayCountry, provider: string): boolean {
  return country.providers.some(p => p.provider === provider);
}

/**
 * Normalise a phone entry to digits only (drops "+", spaces, dashes).
 */
export function normalisePhone(raw: string): string {
  return (raw || '').replace(/\D/g, '');
}

/**
 * Validate an MSISDN for a country: digits only, starts with the dial prefix,
 * and a plausible total length (prefix + 7..12 national digits). Kept lenient
 * because national-number lengths vary by operator.
 */
export function isValidPhone(country: PawaPayCountry, raw: string): boolean {
  const digits = normalisePhone(raw);
  if (!digits.startsWith(country.dialPrefix)) return false;
  const national = digits.slice(country.dialPrefix.length);
  return national.length >= 7 && national.length <= 12;
}

/**
 * Convert a USD amount to a country's local currency using the supplied rates
 * map. Returns null when no rate is configured for that currency. Mobile-money
 * amounts are whole numbers, so the result is rounded.
 */
export function convertUsdToLocal(
  amountUsd: number,
  currency: string,
  rates: Record<string, number>,
): number | null {
  const rate = rates[currency];
  if (!rate || rate <= 0) return null;
  return Math.round(amountUsd * rate);
}

/** Parse the PAWAPAY_USD_RATES env JSON into a rates map (server-side use). */
export function parseRatesEnv(raw: string | undefined): Record<string, number> {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    const out: Record<string, number> = {};
    for (const [k, v] of Object.entries(parsed)) {
      const n = Number(v);
      if (Number.isFinite(n) && n > 0) out[k] = n;
    }
    return out;
  } catch {
    return {};
  }
}
