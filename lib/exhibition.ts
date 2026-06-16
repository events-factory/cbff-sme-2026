const SMARTEVENT_API = '/api/smartevent';
const EXHIBITION_EVENT_CODE_AUTH = 'tt6S0fXwCg8zJMtXt6JS1kxzR0ZGQVlUZjltaENHMERDVE1KWkE9PQ==';

export interface ApiProduct {
  id?: string | number;
  name_english: string;
  name_french?: string;
  quantity: string | number;
  product_code?: string | null;
  packagecode?: string | null;
  sizes: string;
  description_english?: string;
  description_french?: string;
  prices: string | number;
  currency?: string;
  banner?: string;
}

export const EXHIBITION_PRODUCT_IDS = [21, 22, 23] as const;

export function getBookingKey(product: ApiProduct): string {
  return product.packagecode || product.product_code || String(product.id ?? '');
}

export interface PaymentMethod {
  id: string | number;
  contentEnglish: string;
  contentFrench?: string;
}

export interface PackagesResponse {
  message: string;
  event?: { name: string; code: string; email: string };
  products: ApiProduct[];
  payment_method?: PaymentMethod[];
}

export interface BookingFormData {
  product_key: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  country?: string;
  message?: string;
  quantity: string;
  payment_method: string;
  payment_token?: string;
  payment_session?: string;
  order_id?: string;
}

interface PackageDetailsResponse {
  message: string;
  event?: { name: string; code: string; email: string };
  product?: ApiProduct;
  payment_method?: PaymentMethod[];
}

export async function fetchExhibitionPackageById(id: number | string): Promise<PackageDetailsResponse | null> {
  const res = await fetch(
    `${SMARTEVENT_API}/Get-Exibition-Packages-Full/Details/${id}`,
    { method: 'GET', headers: { Authorization: EXHIBITION_EVENT_CODE_AUTH } },
  );
  if (!res.ok) return null;
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text) as PackageDetailsResponse;
  } catch {
    return null;
  }
}

export async function fetchExhibitionPackages(): Promise<PackagesResponse> {
  const res = await fetch(
    `${SMARTEVENT_API}/Get-Exibition-Packages-Full/List-All`,
    { method: 'GET', headers: { Authorization: EXHIBITION_EVENT_CODE_AUTH } },
  );
  const text = res.ok ? await res.text() : '';
  if (text) {
    const parsed = JSON.parse(text) as PackagesResponse;
    if (parsed.products && parsed.products.length > 0) return parsed;
  }

  const detailResults = await Promise.all(EXHIBITION_PRODUCT_IDS.map((id) => fetchExhibitionPackageById(id)));
  const products: ApiProduct[] = [];
  let paymentMethods: PaymentMethod[] | undefined;
  for (const r of detailResults) {
    if (r?.product) products.push(r.product);
    if (!paymentMethods && r?.payment_method?.length) paymentMethods = r.payment_method;
  }
  return { message: 'fallback', products, payment_method: paymentMethods };
}

export async function validatePaymentMethod(
  data: BookingFormData,
): Promise<{ data?: { result?: boolean; direct_payment?: string } }> {
  const form = new FormData();
  form.append('product_key', data.product_key);
  form.append('name', data.name);
  form.append('email', data.email);
  form.append('phone', data.phone);
  form.append('company', data.company);
  form.append('country', data.country || '');
  form.append('message', data.message || '');
  form.append('quantity', data.quantity);
  form.append('payment_method', data.payment_method);
  form.append('field_name', 'exhibition_email_english');
  form.append('application', 'exhibition');
  form.append('appication_id', 'Exhibition');

  const res = await fetch(`${SMARTEVENT_API}/Validate-Payment-Method`, {
    method: 'POST',
    headers: { Authorization: EXHIBITION_EVENT_CODE_AUTH },
    body: form,
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || `Validation failed: ${res.status}`);
  }
  return res.json();
}

export interface GatewaySessionResponse {
  data: {
    result: string;
    token: string;
    payment_session: string | { id: string };
    orderId: string;
  };
}

export async function initiateExhibitionGatewaySession(
  productKey: string,
  quantity: string,
): Promise<GatewaySessionResponse> {
  const form = new FormData();
  form.append('product_id', productKey);
  form.append('quantity', quantity);
  form.append('application', 'exhibition');

  const res = await fetch(`${SMARTEVENT_API}/Initiate-Gateway-Session`, {
    method: 'POST',
    headers: { Authorization: EXHIBITION_EVENT_CODE_AUTH },
    body: form,
  });
  if (!res.ok) throw new Error(`Gateway session failed: ${res.status}`);
  return res.json();
}

export async function submitExhibitionBooking(
  data: BookingFormData,
): Promise<{ success?: boolean; message?: string }> {
  const form = new FormData();
  form.append('product_key', data.product_key);
  form.append('name', data.name);
  form.append('email', data.email);
  form.append('phone', data.phone);
  form.append('company', data.company);
  form.append('country', data.country || '');
  form.append('message', data.message || '');
  form.append('quantity', data.quantity);
  form.append('payment_method', data.payment_method);
  form.append('field_name', 'exhibition_email_english');
  form.append('application', 'exhibition');
  form.append('payment_token', data.payment_token || '');
  form.append('payment_session', data.payment_session || '');
  form.append('order_id', data.order_id || '');
  form.append('appication_id', 'Exhibition');
  form.append('product_key', data.product_key);

  const res = await fetch(`${SMARTEVENT_API}/Book-Exibition-Packages`, {
    method: 'POST',
    headers: { Authorization: EXHIBITION_EVENT_CODE_AUTH },
    body: form,
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || `Booking failed: ${res.status}`);
  }
  return res.json();
}

export function parsePrice(prices: string | number): number {
  if (typeof prices === 'number') return prices;
  const match = prices.match(/[\d,]+\.?\d*/);
  return match ? parseFloat(match[0].replace(/,/g, '')) : 0;
}

export function extractPaymentSessionId(
  raw: GatewaySessionResponse['data']['payment_session'],
): string {
  if (typeof raw === 'string') return raw;
  if (raw && typeof raw === 'object') {
    return (raw as { id?: string }).id || '';
  }
  return '';
}
