"use client";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";
import { t } from "@/locales/translations";

export default function Footer() {
  const { lang } = useLanguage();
  const T = t[lang].footer;
  const navT = t[lang].nav;

  const navLinks = [
    { href: "/about",        label: navT.about },
    { href: "/speakers",     label: navT.speakers },
    { href: "/destination",  label: navT.destination },
    { href: "/sponsors",     label: navT.sponsor },
    { href: "/exhibition",   label: navT.exhibition },
    { href: "/registration", label: navT.register },
  ];

  const zones = [
    { zone: "Belgium", contact: "Dorence", phone: "+32 487 568 199", email: "" },
    { zone: "Cameroon", contact: T.toBeConfirmed, phone: "", email: "" },
    { zone: "West Africa (UEMOA)", contact: "SBPME-UEMOA", phone: "", email: "info@sbpme-uemoa.org" },
  ];

  return (
    <footer style={{ background: "var(--navy2)", borderTop: "2px solid var(--gold)", color: "rgba(255,255,255,.6)", padding: "40px 0 24px" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: 48,
            marginBottom: 32,
          }}
          className="footer-grid"
        >
          <div>
            <Image src="/CBFF_logo_original_transparent.png" alt="CBFF-SME" width={120} height={60} style={{ objectFit: "contain", marginBottom: 14, filter: "brightness(0) invert(1)" }} />
            <p style={{ fontSize: 13, lineHeight: 1.7, maxWidth: 280 }}>{T.tagline}</p>
          </div>
          <div>
            <h4 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--gold)", marginBottom: 14 }}>
              {T.navigation}
            </h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {navLinks.map((l) => (
                <li key={l.href} style={{ padding: "4px 0", fontSize: 13 }}>
                  <Link href={l.href} style={{ color: "rgba(255,255,255,.6)", textDecoration: "none" }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--gold)", marginBottom: 14 }}>
              {T.contact}
            </h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {["info@netkigali.com", "+250 788 991 551 (Kigali)", "+32 487 568 199 (Brussels)"].map((txt) => (
                <li key={txt} style={{ padding: "4px 0", fontSize: 13 }}>{txt}</li>
              ))}
            </ul>
            <h4 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--gold)", marginBottom: 14, marginTop: 20 }}>
              {T.consortium}
            </h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {["NET Kigali", "Re-bird Belgium", "SBPME-UEMOA", "Congruence Consulting"].map((txt) => (
                <li key={txt} style={{ padding: "4px 0", fontSize: 13 }}>{txt}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Regional Zone Contacts */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,.1)", paddingTop: 28, marginBottom: 24 }}>
          <h4 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--gold)", marginBottom: 20, textAlign: "center" }}>
            {T.regionalContacts}
          </h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }} className="zones-grid">
            {zones.map((z) => (
              <div key={z.zone} style={{ borderLeft: "2px solid var(--gold)", paddingLeft: 14 }}>
                <div style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, fontWeight: 700, color: "var(--gold)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>{z.zone}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,.8)", marginBottom: 2 }}>{z.contact}</div>
                {z.phone && <div style={{ fontSize: 12, color: "rgba(255,255,255,.5)" }}>{z.phone}</div>}
                {z.email && <div style={{ fontSize: 12, color: "rgba(255,255,255,.5)" }}>{z.email}</div>}
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,.1)", paddingTop: 18, textAlign: "center", fontSize: 12 }}>
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
