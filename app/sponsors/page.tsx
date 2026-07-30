"use client";
import SectionHeader from "@/components/SectionHeader";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";
import { t } from "@/locales/translations";
import Faq, { faqJsonLd } from "@/components/Faq";
import { waLink } from "@/components/WhatsAppButton";

const tierBgs = ["#0f6b5c", "#4a4a6a", "var(--gold)", "var(--muted)"];

export default function SponsorsPage() {
  const { lang } = useLanguage();
  const T = t[lang].sponsors;
  const C = t[lang].common;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(T.faq)) }}
      />
      <div style={{ background: "linear-gradient(135deg, var(--navy2) 0%, var(--navy) 100%)", padding: "120px 24px 60px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 12 }}>{T.eyebrow}</p>
          <h1 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, color: "var(--white)", lineHeight: 1.2, maxWidth: 700 }}>
            {T.title}
          </h1>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 28 }}>
            <Link href="/registration" style={{ display: "inline-block", padding: "13px 28px", fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", borderRadius: 2, background: "var(--gold)", color: "var(--white)", textDecoration: "none" }}>
              {C.becomeASponsor}
            </Link>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "13px 28px", fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", borderRadius: 2, border: "2px solid var(--white)", color: "var(--white)", textDecoration: "none" }}>
              {T.contactCta}
            </a>
          </div>
        </div>
      </div>

      {/* Institutional support */}
      <section style={{ padding: "32px 0", background: "var(--navy)", borderTop: "1px solid rgba(255,255,255,.1)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <span style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,.55)" }}>
            {T.partnersLabel}
          </span>
          <div style={{ background: "#fff", borderRadius: 4, padding: "5px 12px", display: "flex", alignItems: "center", height: 40 }}>
            <Image src="/logos/minicom.svg" alt="Ministry of Trade — MINICOM" width={72} height={28} style={{ objectFit: "contain", maxWidth: 72, maxHeight: 28 }} />
          </div>
          <div style={{ background: "#fff", borderRadius: 4, padding: "5px 12px", display: "flex", alignItems: "center", height: 40 }}>
            <Image src="/logos/boa.png" alt="Bank of Africa" width={72} height={28} style={{ objectFit: "contain", maxWidth: 72, maxHeight: 28 }} />
          </div>
        </div>
      </section>

      {/* Why partner */}
      <section style={{ padding: "80px 0", background: "var(--light)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
          <SectionHeader eyebrow={T.whyPartnerEyebrow} title={T.whyPartnerTitle} lead={T.whyPartnerBody} />
        </div>
      </section>

      {/* Why sponsor — stats */}
      <section style={{ padding: "0 0 80px", background: "var(--light)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px" }}>
          <SectionHeader eyebrow={T.statsEyebrow} title={T.statsTitle} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }} className="grid-4">
            {T.stats.map((stat) => (
              <div key={stat.desc} style={{ borderLeft: "3px solid var(--gold)", paddingLeft: 16 }}>
                <div style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(22px,3vw,32px)", fontWeight: 800, color: "var(--navy)", lineHeight: 1, marginBottom: 6 }}>{stat.num}</div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section style={{ padding: "80px 0", background: "var(--navy)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px" }}>
          <SectionHeader eyebrow={T.tiersEyebrow} title={T.tiersTitle} dark lead={T.tiersLead} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }} className="grid-4">
            {T.tiers.map((tier, i) => (
              <div key={tier.label} style={{ border: "1px solid var(--border)", overflow: "hidden", background: "var(--white)", display: "flex", flexDirection: "column" }}>
                <div style={{ padding: "14px 16px", background: tierBgs[i], fontFamily: "var(--font-poppins),sans-serif", fontSize: 14, fontWeight: 700, color: "var(--white)" }}>{tier.label}</div>
                <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 19, fontWeight: 800, color: "var(--navy)" }}>{tier.amount}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)", borderTop: "1px solid var(--border)", paddingTop: 8 }}>
                    <div style={{ marginBottom: 4 }}>{T.passesLabel}: <strong style={{ color: "var(--navy)" }}>{tier.passes}</strong></div>
                    <div style={{ marginBottom: 4 }}>{T.boothLabel}: <strong style={{ color: "var(--navy)" }}>{tier.booth}</strong></div>
                    <div>{T.meetingRoomLabel}: <strong style={{ color: "var(--navy)" }}>{tier.meetingRoom}</strong></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed package benefits */}
      <section style={{ padding: "80px 0", background: "var(--navy)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px" }}>
          <SectionHeader eyebrow={T.detailedEyebrow} title={T.detailedTitle} dark />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }} className="grid-2">
            {T.detailedPackages.map((pkg, i) => (
              <div key={pkg.tier} style={{ border: "1px solid var(--border)", overflow: "hidden", background: "var(--white)" }}>
                <div style={{ padding: "16px 20px", background: tierBgs[i] }}>
                  <div style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 16, fontWeight: 700, color: "var(--white)" }}>{pkg.tier} — {pkg.amount}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,.75)", marginTop: 2 }}>{pkg.subtitle}</div>
                </div>
                <ul style={{ padding: "18px 20px", margin: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                  {pkg.bullets.map((b) => (
                    <li key={b} style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, paddingLeft: 14, position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, color: "var(--gold)" }}>•</span>{b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional partnership opportunities */}
      <section style={{ padding: "80px 0", background: "var(--light)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px" }}>
          <SectionHeader eyebrow={T.additionalEyebrow} title={T.additionalTitle} lead={T.additionalLead} />
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700, background: "var(--white)" }}>
              <thead>
                <tr style={{ background: "var(--navy2)" }}>
                  {T.additionalColumns.map((col) => (
                    <th key={col} style={{ textAlign: "left", padding: "14px 16px", fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, color: "var(--white)", fontWeight: 700 }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {T.additionalOpportunities.map((op, i) => (
                  <tr key={op.opportunity} style={{ background: i % 2 === 0 ? "var(--white)" : "var(--light)" }}>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: "var(--navy)", fontWeight: 700, borderBottom: "1px solid var(--border)" }}>{op.opportunity}</td>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: "var(--gold)", fontWeight: 700, borderBottom: "1px solid var(--border)", whiteSpace: "nowrap" }}>{op.investment}</td>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: "var(--muted)", borderBottom: "1px solid var(--border)" }}>{op.benefits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ROI */}
      <section style={{ padding: "80px 0", background: "var(--navy)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px" }}>
          <SectionHeader eyebrow={T.roiEyebrow} title={T.roiTitle} dark center />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 16 }} className="grid-5">
            {T.roi.map((r) => (
              <div key={r.title} style={{ border: "1px solid rgba(255,255,255,.15)", padding: "20px 16px", textAlign: "center", background: "rgba(255,255,255,.03)" }}>
                <div style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 14, fontWeight: 700, color: "var(--gold)", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>{r.title}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,.65)", lineHeight: 1.5 }}>{r.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Opportunities / institutional partner targets */}
      <section style={{ padding: "80px 0", background: "var(--light)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px" }}>
          <SectionHeader eyebrow={T.opportunitiesEyebrow} title={T.opportunitiesTitle} lead={T.opportunitiesLead} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }} className="grid-2">
            {T.opportunities.map((op) => (
              <div key={op.num} style={{ border: "1px solid var(--border)", padding: 24, background: "var(--white)" }}>
                <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 8 }}>{op.tag}</p>
                <h4 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 6 }}>{op.title}</h4>
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.7, marginBottom: 14 }}>{op.rationale}</p>
                <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}><strong style={{ color: "var(--gold)" }}>{T.roiLabel}:</strong> {op.roi}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Faq eyebrow={T.faqEyebrow} title={T.faqTitle} items={T.faq} />

      {/* Contact */}
      <section style={{ padding: "80px 0", background: "var(--navy)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <SectionHeader eyebrow={T.contactEyebrow} title={T.contactTitle} dark center />
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 32 }}>
            <a href={`mailto:${T.contactEmail}`} style={{ color: "var(--gold)", fontFamily: "var(--font-poppins),sans-serif", fontSize: 15, fontWeight: 600, textDecoration: "none" }}>{T.contactEmail}</a>
            <span style={{ color: "rgba(255,255,255,.65)", fontSize: 14 }}>{T.contactKigali}</span>
            <span style={{ color: "rgba(255,255,255,.65)", fontSize: 14 }}>{T.contactBrussels}</span>
          </div>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/registration" style={{ display: "inline-block", padding: "13px 32px", fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", borderRadius: 2, background: "var(--gold)", color: "var(--white)", textDecoration: "none" }}>
              {C.becomeASponsor}
            </Link>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "13px 32px", fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", borderRadius: 2, border: "2px solid var(--white)", color: "var(--white)", textDecoration: "none" }}>
              {T.contactCta}
            </a>
          </div>
        </div>
      </section>

<style>{`
        @media (max-width: 900px) { .grid-5 { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 768px) { .grid-2 { grid-template-columns: 1fr !important; } .grid-4 { grid-template-columns: repeat(2,1fr) !important; } }
      `}</style>
    </>
  );
}
