'use client';

import { useEffect, useRef, useState } from 'react';

interface Provider {
  provider: string;
  name: string;
}
interface Country {
  code: string;
  name: string;
  currency: string;
  dialPrefix: string;
  example: string;
  providers: Provider[];
  rate: number;
}

interface PawaPayModalProps {
  isOpen: boolean;
  amountUsd: number;
  email: string;
  name: string;
  onSuccess: (depositId: string) => void;
  onClose: () => void;
}

type Phase = 'form' | 'requesting' | 'pending' | 'success' | 'failed';

function onlyDigits(s: string): string {
  return (s || '').replace(/\D/g, '');
}

function isValidPhone(country: Country, raw: string): boolean {
  const d = onlyDigits(raw);
  if (!d.startsWith(country.dialPrefix)) return false;
  const national = d.slice(country.dialPrefix.length);
  return national.length >= 7 && national.length <= 12;
}

const POLL_INTERVAL_MS = 3000;
const POLL_TIMEOUT_MS = 180000; // 3 minutes

export default function PawaPayModal({ isOpen, amountUsd, email, name, onSuccess, onClose }: PawaPayModalProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loadingConfig, setLoadingConfig] = useState(false);
  const [configError, setConfigError] = useState('');

  const [countryCode, setCountryCode] = useState('');
  const [provider, setProvider] = useState('');
  const [phone, setPhone] = useState('');

  const [phase, setPhase] = useState<Phase>('form');
  const [error, setError] = useState('');
  const [failure, setFailure] = useState('');
  const [depositId, setDepositId] = useState('');

  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const country = countries.find(c => c.code === countryCode);
  const localAmount = country ? Math.round(amountUsd * country.rate) : null;

  // Load supported countries/providers/rates when the modal opens.
  useEffect(() => {
    if (!isOpen) return;
    setLoadingConfig(true);
    setConfigError('');
    fetch('/api/pawapay/config')
      .then(r => r.json())
      .then((data: { countries: Country[] }) => {
        const list = data.countries || [];
        setCountries(list);
        if (list.length) {
          setCountryCode(list[0].code);
          setProvider(list[0].providers[0]?.provider || '');
          setPhone(list[0].dialPrefix);
        }
      })
      .catch(() => setConfigError('Could not load payment options. Please try again.'))
      .finally(() => setLoadingConfig(false));
  }, [isOpen]);

  // Reset provider + phone prefix whenever the country changes.
  useEffect(() => {
    if (!country) return;
    setProvider(country.providers[0]?.provider || '');
    setPhone(prev => {
      const digits = onlyDigits(prev);
      // Keep whatever the user typed only if it already matches this country.
      return digits.startsWith(country.dialPrefix) ? prev : country.dialPrefix;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryCode]);

  // Clean up the poller on unmount.
  useEffect(() => () => { if (pollRef.current) clearInterval(pollRef.current); }, []);

  if (!isOpen) return null;

  const phoneValid = !!country && isValidPhone(country, phone);
  const canPay = phase === 'form' && !!country && !!provider && phoneValid && localAmount != null;

  function stopPolling() {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }

  function pollStatus(id: string) {
    const started = Date.now();
    stopPolling();
    pollRef.current = setInterval(async () => {
      if (Date.now() - started > POLL_TIMEOUT_MS) {
        stopPolling();
        setPhase('failed');
        setFailure(`Still pending. Reference: ${id}. Please check your phone or try again.`);
        return;
      }
      try {
        const res = await fetch(`/api/pawapay/status?depositId=${encodeURIComponent(id)}`);
        const s = await res.json();
        if (s.final) {
          stopPolling();
          if (s.status === 'COMPLETED') {
            setPhase('success');
            onSuccess(id);
          } else {
            setPhase('failed');
            setFailure(s.failure || 'The payment did not go through. Please try again.');
          }
        }
      } catch {
        /* transient — keep polling */
      }
    }, POLL_INTERVAL_MS);
  }

  async function handlePay() {
    if (!country || !canPay) return;
    setError('');
    setPhase('requesting');
    try {
      const res = await fetch('/api/pawapay/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amountUsd,
          country: country.code,
          provider,
          phone: onlyDigits(phone),
          email,
          name,
        }),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.error || 'Could not start the payment. Please try again.');
        setPhase('form');
        return;
      }
      setDepositId(data.depositId);
      setPhase('pending');
      pollStatus(data.depositId);
    } catch {
      setError('Network error. Please try again.');
      setPhase('form');
    }
  }

  function retry() {
    setFailure('');
    setError('');
    setDepositId('');
    setPhase('form');
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div style={{ background: 'linear-gradient(to right, var(--navy2), var(--navy))' }} className="px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Mobile Money Payment</h2>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.8)' }}>Powered by PawaPay</p>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10" aria-label="Close">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {loadingConfig && (
            <p className="text-sm text-center py-8" style={{ color: 'var(--muted)' }}>Loading payment options…</p>
          )}

          {!loadingConfig && configError && (
            <div className="text-sm rounded-lg p-3 bg-red-50 text-red-700 border border-red-200">{configError}</div>
          )}

          {!loadingConfig && !configError && (
            <>
              {/* Amount */}
              <div className="rounded-lg border border-gray-200 p-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span style={{ color: 'var(--muted)' }}>Amount due</span>
                  <span className="font-semibold" style={{ color: 'var(--navy)' }}>USD {amountUsd.toLocaleString()}</span>
                </div>
                {country && localAmount != null && (
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span style={{ color: 'var(--muted)' }}>You will be charged</span>
                    <span className="font-bold tabular-nums" style={{ color: 'var(--navy)' }}>{country.currency} {localAmount.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {(phase === 'form' || phase === 'requesting') && (
                <div className="space-y-4">
                  {/* Country */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text)' }}>Country</label>
                    <select
                      value={countryCode}
                      onChange={e => setCountryCode(e.target.value)}
                      disabled={phase === 'requesting'}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 focus:outline-none"
                    >
                      {countries.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
                    </select>
                  </div>

                  {/* Provider */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text)' }}>Mobile-money network</label>
                    <select
                      value={provider}
                      onChange={e => setProvider(e.target.value)}
                      disabled={phase === 'requesting'}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 focus:outline-none"
                    >
                      {country?.providers.map(p => <option key={p.provider} value={p.provider}>{p.name}</option>)}
                    </select>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text)' }}>Phone number</label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      value={phone}
                      onChange={e => setPhone(onlyDigits(e.target.value))}
                      disabled={phase === 'requesting'}
                      className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:outline-none ${phone && !phoneValid ? 'border-red-400 focus:ring-red-300' : 'border-gray-300 focus:ring-primary-500/30 focus:border-primary-500'}`}
                    />
                    <p className="text-xs mt-1" style={{ color: phone && !phoneValid ? '#b91c1c' : 'var(--muted)' }}>
                      {country ? `Format: ${country.example} — digits only, no “+”.` : ''}
                    </p>
                  </div>

                  {error && <div className="text-sm rounded-lg p-3 bg-red-50 text-red-700 border border-red-200">{error}</div>}

                  <button
                    type="button"
                    onClick={handlePay}
                    disabled={!canPay}
                    className="w-full py-3 rounded-lg text-white font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                    style={{ background: 'var(--navy)' }}
                  >
                    {phase === 'requesting' ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Requesting…
                      </>
                    ) : (
                      'Request payment'
                    )}
                  </button>
                </div>
              )}

              {phase === 'pending' && (
                <div className="text-center py-6">
                  <span className="inline-block w-8 h-8 border-4 border-gray-200 rounded-full animate-spin" style={{ borderTopColor: 'var(--navy)' }} />
                  <p className="mt-4 text-sm font-medium" style={{ color: 'var(--text)' }}>Check your phone and approve the payment</p>
                  <p className="mt-1 text-xs" style={{ color: 'var(--muted)' }}>Enter your mobile-money PIN when prompted. Do not close this window.</p>
                  {depositId && <p className="mt-3 text-xs font-mono" style={{ color: 'var(--muted)' }}>Ref: {depositId}</p>}
                </div>
              )}

              {phase === 'success' && (
                <div className="text-center py-6">
                  <div className="w-14 h-14 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <p className="mt-4 text-sm font-semibold" style={{ color: 'var(--navy)' }}>Payment received — completing your registration…</p>
                </div>
              )}

              {phase === 'failed' && (
                <div className="text-center py-6">
                  <div className="w-14 h-14 mx-auto rounded-full bg-red-100 flex items-center justify-center">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </div>
                  <p className="mt-4 text-sm font-medium text-red-700">{failure || 'Payment failed.'}</p>
                  <button type="button" onClick={retry} className="mt-4 px-5 py-2 rounded-lg text-white font-semibold" style={{ background: 'var(--navy)' }}>Try again</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
