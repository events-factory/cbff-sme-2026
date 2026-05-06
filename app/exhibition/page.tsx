"use client";
import SectionHeader from "@/components/SectionHeader";
import ExhibitionPackage from "@/components/ExhibitionPackage";
import Link from "next/link";
import { Eye, Users, Star, TrendingUp } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { t } from "@/locales/translations";

const benefitIcons = [Eye, Users, Star, TrendingUp];

export default function ExhibitionPage() {
  const { lang } = useLanguage();
  const T = t[lang].exhibition;
  const C = t[lang].common;

  return (
    <>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, var(--navy2) 0%, var(--navy) 100%)", padding: "120px 24px 60px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 12 }}>{T.eyebrow}</p>
          <h1 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, color: "var(--white)", lineHeight: 1.2, maxWidth: 700, marginBottom: 16 }}>
            {T.title}
          </h1>
          <p style={{ fontSize: "clamp(14px,2vw,18px)", color: "var(--gold)", fontStyle: "italic", maxWidth: 600 }}>
            {T.subtitle}
          </p>
        </div>
      </div>

      {/* Intro */}
      <section style={{ padding: "80px 0", background: "var(--light)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }} className="two-col">
            <div>
              <SectionHeader eyebrow={T.eyebrow} title={T.introTitle} />
              <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.8 }}>{T.introBody}</p>
            </div>
            <div style={{ background: "var(--navy)", padding: 32, borderTop: "4px solid var(--gold)" }}>
              <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, letterSpacing: 2, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 20 }}>
                {lang === "fr" ? "Dates Clés" : "Key Dates"}
              </p>
              {[
                { label: lang === "fr" ? "Dates du Forum" : "Forum Dates", val: lang === "fr" ? "9–11 Août 2026" : "August 9–11, 2026" },
                { label: lang === "fr" ? "Lieu" : "Location", val: "Kigali, Rwanda" },
                { label: lang === "fr" ? "Délai d'Inscription" : "Booking Deadline", val: lang === "fr" ? "30 Juin 2026" : "June 30, 2026" },
                { label: lang === "fr" ? "Stands Disponibles" : "Stands Available", val: lang === "fr" ? "Limité" : "Limited" },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,.1)" }}>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,.6)" }}>{item.label}</span>
                  <span style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, fontWeight: 700, color: "var(--white)" }}>{item.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Exhibition Packages */}
      <section style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px" }}>
          <SectionHeader eyebrow={T.packagesEyebrow} title={T.packagesTitle} lead={T.packagesLead} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }} className="packages-grid">
            {T.packages.map((pkg) => (
              <ExhibitionPackage
                key={pkg.title}
                title={pkg.title}
                size={pkg.size}
                sqm={pkg.sqm}
                includes={pkg.includes}
                highlighted={pkg.highlighted}
                ctaLabel={C.enquireNow}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Exhibit */}
      <section style={{ padding: "80px 0", background: "var(--navy)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px" }}>
          <SectionHeader eyebrow={T.benefitsEyebrow} title={T.benefitsTitle} dark />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }} className="benefits-grid">
            {T.benefits.map((b, i) => {
              const Icon = benefitIcons[i];
              return (
                <div key={b.title} style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderTop: "3px solid var(--gold)", padding: "24px 20px" }}>
                  <div style={{ width: 44, height: 44, background: "rgba(201,151,43,.15)", border: "1px solid rgba(201,151,43,.3)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                    <Icon size={20} color="var(--gold)" />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 14, fontWeight: 700, color: "var(--white)", marginBottom: 8 }}>{b.title}</h3>
                  <p style={{ fontSize: 13.5, color: "rgba(255,255,255,.65)", lineHeight: 1.7 }}>{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Exhibition Manual note */}
      <section style={{ padding: "40px 0", background: "var(--light)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ background: "var(--white)", border: "1px solid var(--border)", borderLeft: "4px solid var(--gold)", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, fontWeight: 700, color: "var(--navy)", marginBottom: 4 }}>
                {lang === "fr" ? "Manuel de l'Exposant & Plan du Stand" : "Exhibition Manual & Floor Plan"}
              </p>
              <p style={{ fontSize: 13, color: "var(--muted)" }}>
                {lang === "fr" ? "Téléchargez le manuel complet de l'exposant et le plan de la salle d'exposition." : "Download the complete exhibitor manual and exhibition hall floor plan."}
              </p>
            </div>
            <Link
              href="mailto:info@netkigali.com?subject=Exhibition Manual Request"
              style={{
                display: "inline-block", padding: "10px 24px",
                fontFamily: "var(--font-poppins),sans-serif",
                fontSize: 12, fontWeight: 700, letterSpacing: 1,
                textTransform: "uppercase", borderRadius: 2,
                background: "var(--navy)", color: "var(--white)",
                textDecoration: "none", whiteSpace: "nowrap",
              }}
            >
              {lang === "fr" ? "Demander le Manuel →" : "Request Manual →"}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 0", textAlign: "center" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>
          <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 16 }}>
            {T.eyebrow}
          </p>
          <h2 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(22px,3vw,32px)", fontWeight: 700, color: "var(--navy)", marginBottom: 16 }}>
            {T.ctaTitle}
          </h2>
          <div style={{ width: 60, height: 3, background: "var(--gold)", margin: "0 auto 24px" }} />
          <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.8, marginBottom: 36 }}>{T.ctaBody}</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/registration?interest=exhibition"
              style={{
                display: "inline-block", padding: "13px 32px",
                fontFamily: "var(--font-poppins),sans-serif",
                fontSize: 13, fontWeight: 700, letterSpacing: 1,
                textTransform: "uppercase", borderRadius: 2,
                background: "var(--gold)", color: "var(--white)",
                textDecoration: "none",
              }}
            >
              {T.ctaButton}
            </Link>
            <Link
              href="mailto:info@netkigali.com"
              style={{
                display: "inline-block", padding: "13px 32px",
                fontFamily: "var(--font-poppins),sans-serif",
                fontSize: 13, fontWeight: 700, letterSpacing: 1,
                textTransform: "uppercase", borderRadius: 2,
                border: "2px solid var(--navy)",
                color: "var(--navy)", textDecoration: "none",
              }}
            >
              {lang === "fr" ? "info@netkigali.com" : "info@netkigali.com"}
            </Link>
          </div>
          <div style={{ marginTop: 24, fontSize: 13, color: "var(--muted)" }}>
            {lang === "fr" ? "Kigali: +250 788 991 551 · Bruxelles: +32 487 568 199" : "Kigali: +250 788 991 551 · Brussels: +32 487 568 199"}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 640px) {
          .two-col       { grid-template-columns: 1fr !important; }
          .packages-grid { grid-template-columns: 1fr !important; }
          .benefits-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 641px) and (max-width: 900px) {
          .two-col       { grid-template-columns: 1fr !important; }
          .packages-grid { grid-template-columns: 1fr !important; }
          .benefits-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </>
  );
}
