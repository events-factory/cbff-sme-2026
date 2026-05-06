"use client";
import SectionHeader from "@/components/SectionHeader";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { t } from "@/locales/translations";

const tierBgs = ["var(--navy2)", "#4a4a6a", "var(--gold)", "var(--muted)"];

export default function SponsorsPage() {
  const { lang } = useLanguage();
  const T = t[lang].sponsors;
  const C = t[lang].common;

  return (
    <>
      <div style={{ background: "linear-gradient(135deg, var(--navy2) 0%, var(--navy) 100%)", padding: "120px 24px 60px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 12 }}>{T.eyebrow}</p>
          <h1 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, color: "var(--white)", lineHeight: 1.2, maxWidth: 700 }}>
            {T.title}
          </h1>
        </div>
      </div>

      {/* Tiers */}
      <section style={{ padding: "80px 0", background: "var(--navy)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px" }}>
          <SectionHeader eyebrow={T.tiersEyebrow} title={T.tiersTitle} dark lead={T.tiersLead} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }} className="grid-2">
            {T.tiers.map((tier, i) => (
              <div key={tier.label} style={{ border: "1px solid var(--border)", overflow: "hidden", background: "var(--white)" }}>
                <div style={{ padding: "16px 24px", background: tierBgs[i], fontFamily: "var(--font-poppins),sans-serif", fontSize: 15, fontWeight: 700, color: "var(--white)" }}>{tier.label}</div>
                <div style={{ padding: "18px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 22, fontWeight: 800, color: "var(--navy)" }}>{tier.amount}</div>
                    <div style={{ fontSize: 13, color: "var(--muted)" }}>{C.perPartner}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 22, fontWeight: 800, color: "var(--navy)" }}>{tier.slots} {lang === "fr" ? "Partenaires" : "Partners"}</div>
                    <div style={{ fontSize: 13, color: "var(--muted)" }}>{C.availableSlots}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link href="/registration" style={{ display: "inline-block", padding: "13px 32px", fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", borderRadius: 2, background: "var(--gold)", color: "var(--white)", textDecoration: "none" }}>
              {C.becomeASponsor}
            </Link>
          </div>
        </div>
      </section>


<style>{`
        @media (max-width: 768px) { .grid-2 { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}
