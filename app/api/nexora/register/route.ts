import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';

const NEXORA_API_URL = process.env.NEXORA_API_URL || 'https://nexora-backend.dev-teams.me';
const NEXORA_TRIGGER_CATEGORY_ID = process.env.NEXORA_TRIGGER_CATEGORY_ID || '';
const NEXORA_PARTNER_ROLE = process.env.NEXORA_PARTNER_ROLE || 'partenaire';

interface NexoraSyncBody {
  email?: string;
  firstName?: string;
  lastName?: string;
  categoryId?: string | number;
}

// Mirrors delegates who registered under the "Delegate Registration, Deal Room
// & VIP Dinner" category into NEXORA via its partner register endpoint. This is a
// best-effort side-effect: it must never block or fail the SmartEvent registration,
// so every branch returns HTTP 200 and the client fires it forget-and-forget.
export async function POST(request: NextRequest) {
  let body: NexoraSyncBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ synced: false, error: 'Invalid JSON body' });
  }

  const { email, categoryId } = body;

  // Gate: only sync the configured category. No-op (and no external call) otherwise,
  // including when the trigger id is not yet configured.
  if (!NEXORA_TRIGGER_CATEGORY_ID || String(categoryId) !== NEXORA_TRIGGER_CATEGORY_ID) {
    return NextResponse.json({ synced: false, skipped: true });
  }

  if (!email) {
    return NextResponse.json({ synced: false, error: 'Email is required' });
  }

  // Delegate never supplies a NEXORA password; generate a strong random one.
  // They set their own later via NEXORA's reset flow. base64url => >= 6 chars.
  const motDePasse = randomBytes(12).toString('base64url');

  try {
    const response = await fetch(`${NEXORA_API_URL}/api/v1/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // NEXORA's Joi validation rejects unknown keys, so send only the documented fields.
      body: JSON.stringify({
        email,
        mot_de_passe: motDePasse,
        role: NEXORA_PARTNER_ROLE,
        in_africa: true,
      }),
    });

    if (response.status === 201) {
      return NextResponse.json({ synced: true });
    }

    // Email already has a NEXORA account — treat as a successful sync.
    if (response.status === 409) {
      return NextResponse.json({ synced: true, alreadyExists: true });
    }

    const detail = await response.text();
    console.error('NEXORA register failed:', response.status, detail);
    return NextResponse.json({ synced: false, error: `NEXORA returned ${response.status}` });
  } catch (error) {
    console.error('NEXORA register error:', error);
    return NextResponse.json({ synced: false, error: String(error) });
  }
}
