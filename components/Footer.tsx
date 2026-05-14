'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/LanguageContext';
import { t } from '@/locales/translations';

const socialLinks = [
  {
    label: 'X (Twitter)',
    href: 'https://x.com/CBFF_SME',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/cbff-sme/',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/cbff_sme/',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61589055077825',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const { lang } = useLanguage();
  const T = t[lang].footer;
  const navT = t[lang].nav;

  const navLinks = [
    { href: '/about', label: navT.about },
    { href: '/speakers', label: navT.speakers },
    { href: '/destination', label: navT.destination },
    { href: '/sponsors', label: navT.sponsor },
    { href: '/exhibition', label: navT.exhibition },
    { href: '/registration', label: navT.register },
  ];

  const zones = [
    {
      zone: 'Belgium',
      contact: 'Dorence',
      phone: '',
      email: 'mdorence@congruence.be',
    },
    {
      zone: 'Central Africa',
      contact: 'Mrs. Dorance Monkam',
      phone: '',
      email: '',
    },
    {
      zone: 'West Africa (UEMOA)',
      contact: 'SBPME-UEMOA',
      phone: '',
      email: 'partenariat@salonpmeuemoa.org',
    },
  ];

  return (
    <footer
      style={{
        background: 'var(--navy2)',
        borderTop: '2px solid var(--gold)',
        color: 'rgba(255,255,255,.6)',
        padding: '40px 0 24px',
      }}
    >
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr',
            gap: 48,
            marginBottom: 32,
          }}
          className="footer-grid"
        >
          <div>
            <Image
              src="/logos/CBFF-SME Logo Primary RC.png"
              alt="CBFF-SME"
              width={250}
              height={60}
              style={{ objectFit: 'contain', marginBottom: 30, color: 'transparent' }}
            />
            <p style={{ fontSize: 13, lineHeight: 1.7, maxWidth: 280, marginBottom: 20 }}>
              {T.tagline}
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 4,
                    border: '1px solid rgba(201,151,43,.4)',
                    background: 'rgba(201,151,43,.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--gold)',
                    textDecoration: 'none',
                    transition: 'background .2s',
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-poppins),sans-serif',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginBottom: 14,
              }}
            >
              {T.navigation}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {navLinks.map((l) => (
                <li key={l.href} style={{ padding: '4px 0', fontSize: 13 }}>
                  <Link
                    href={l.href}
                    style={{
                      color: 'rgba(255,255,255,.6)',
                      textDecoration: 'none',
                    }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-poppins),sans-serif',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginBottom: 14,
              }}
            >
              {T.contact}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {[
                'info@netkigali.com',
                '+250 788 991 551 (Kigali)',
                '+32 487 568 199 (Brussels)',
              ].map((txt) => (
                <li key={txt} style={{ padding: '4px 0', fontSize: 13 }}>
                  {txt}
                </li>
              ))}
            </ul>
            <h4
              style={{
                fontFamily: 'var(--font-poppins),sans-serif',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginBottom: 14,
                marginTop: 20,
              }}
            >
              {T.consortium}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {[
                'Netkigali',
                'Re-bird Belgium',
                'SBPME-UEMOA',
                'Congruence Consulting',
              ].map((txt) => (
                <li key={txt} style={{ padding: '4px 0', fontSize: 13 }}>
                  {txt}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Regional Zone Contacts */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,.1)',
            paddingTop: 28,
            marginBottom: 24,
          }}
        >
          <h4
            style={{
              fontFamily: 'var(--font-poppins),sans-serif',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: 20,
              textAlign: 'center',
            }}
          >
            {T.regionalContacts}
          </h4>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3,1fr)',
              gap: 24,
            }}
            className="zones-grid"
          >
            {zones.map((z) => (
              <div
                key={z.zone}
                style={{ borderLeft: '2px solid var(--gold)', paddingLeft: 14 }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-poppins),sans-serif',
                    fontSize: 11,
                    fontWeight: 700,
                    color: 'var(--gold)',
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                    marginBottom: 4,
                  }}
                >
                  {z.zone}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: 'rgba(255,255,255,.8)',
                    marginBottom: 2,
                  }}
                >
                  {z.contact}
                </div>
                {z.phone && (
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,.5)' }}>
                    {z.phone}
                  </div>
                )}
                {z.email && (
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,.5)' }}>
                    {z.email}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,.1)',
            paddingTop: 18,
            textAlign: 'center',
            fontSize: 12,
          }}
        >
          <p>{T.copyright}</p>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .zones-grid  { grid-template-columns: 1fr !important; gap: 16px !important; }
        }
      `}</style>
    </footer>
  );
}
