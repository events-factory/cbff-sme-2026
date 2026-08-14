"use client";
import SectionHeader from "@/components/SectionHeader";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";
import { t } from "@/locales/translations";
import { waLink } from "@/components/WhatsAppButton";
import { Landmark, Globe2, Banknote, ShieldCheck, Truck, Cpu, HeartHandshake, BarChart3 } from "lucide-react";

const categoryIcons = [Landmark, Globe2, Banknote, ShieldCheck, Truck, Cpu, HeartHandshake];

export default function PartnershipOpportunitiesPage() {
  const { lang } = useLanguage();
  const T = t[lang].partnerships;
  const C = t[lang].common;

  return (
    <>
      {/* Hero */}
      <div style={{ position: "relative", padding: "120px 24px 60px", overflow: "hidden" }}>
        <Image src="/events/gallery-dignitaries.jpg" alt="" fill priority style={{ objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(10,25,47,.94) 0%, rgba(10,25,47,.86) 45%, rgba(30,77,123,.88) 100%)" }} />
        <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative" }}>
          <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 12 }}>{T.eyebrow}</p>
          <h1 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, color: "var(--white)", lineHeight: 1.2, maxWidth: 780 }}>
            {T.title}
          </h1>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 28 }}>
            <Link href="/sponsors" style={{ display: "inline-block", padding: "13px 28px", fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", borderRadius: 2, background: "var(--gold)", color: "var(--white)", textDecoration: "none" }}>
              {T.heroCta}
            </Link>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "13px 28px", fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", borderRadius: 2, border: "2px solid var(--white)", color: "var(--white)", textDecoration: "none" }}>
              {T.contactCta}
            </a>
          </div>
        </div>
      </div>

      {/* Strategic positioning proposals */}
      <section style={{ padding: "80px 0 40px", background: "var(--light)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px" }}>
          <SectionHeader eyebrow={T.positioningEyebrow} title={T.positioningTitle} lead={T.positioningLead} />
        </div>
      </section>

      {/* The seven partner categories */}
      <section style={{ padding: "0 0 80px", background: "var(--light)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }} className="grid-2">
            {T.categories.map((cat, i) => {
              const Icon = categoryIcons[i] ?? Landmark;
              return (
                <div key={cat.num} style={{ border: "1px solid var(--border)", background: "var(--white)", display: "flex", flexDirection: "column" }}>
                  <div style={{ padding: "18px 20px", background: "var(--navy2)", display: "flex", alignItems: "flex-start", gap: 14 }}>
                    <div style={{ width: 42, height: 42, flexShrink: 0, borderRadius: 6, background: "rgba(201,151,43,.15)", border: "1px solid rgba(201,151,43,.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={19} color="var(--gold)" />
                    </div>
                    <div>
                      <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, letterSpacing: 2, color: "var(--gold)", fontWeight: 700, marginBottom: 4 }}>{cat.num}</p>
                      <h3 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 16, fontWeight: 700, color: "var(--white)", lineHeight: 1.3 }}>{cat.title}</h3>
                      <p style={{ fontSize: 12.5, color: "rgba(255,255,255,.7)", marginTop: 3 }}>{cat.subtitle}</p>
                    </div>
                  </div>
                  <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
                    <div>
                      <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 6 }}>{T.profilesLabel}</p>
                      <p style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.7 }}>{cat.profiles}</p>
                    </div>
                    <div>
                      <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 6 }}>{T.rationaleLabel}</p>
                      <p style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.7 }}>{cat.rationale}</p>
                    </div>
                    <div>
                      <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 6 }}>{T.positioningLabel}</p>
                      <p style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.7 }}>{cat.positioning}</p>
                    </div>
                    <div>
                      <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 6 }}>{T.benefitsLabel}</p>
                      <ul style={{ padding: 0, margin: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                        {cat.benefits.map((b) => (
                          <li key={b} style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, paddingLeft: 14, position: "relative" }}>
                            <span style={{ position: "absolute", left: 0, color: "var(--gold)" }}>•</span>{b}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div style={{ borderTop: "1px solid var(--border)", paddingTop: 14, marginTop: "auto" }}>
                      <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 6 }}>{T.returnLabel}</p>
                      <p style={{ fontSize: 13.5, color: "var(--navy)", fontWeight: 600, lineHeight: 1.7 }}>{cat.expectedReturn}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* A monitored, documented and measurable investment */}
      <section style={{ padding: "80px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image src="/banner2.jpg" alt="" fill style={{ objectFit: "cover", objectPosition: "center" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(10,25,47,.92)" }} />
        </div>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <SectionHeader eyebrow={T.measuredEyebrow} title={T.measuredTitle} lead={T.measuredBody} dark />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }} className="grid-3">
            {T.followUp.map((f) => (
              <div key={f.day} style={{ border: "1px solid rgba(255,255,255,.15)", borderLeft: "3px solid var(--gold)", padding: "22px 20px", background: "rgba(255,255,255,.03)", display: "flex", gap: 14, alignItems: "flex-start" }}>
                <BarChart3 size={20} color="var(--gold)" style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 14, fontWeight: 700, color: "var(--gold)", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>{f.day}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,.68)", lineHeight: 1.6 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 14.5, color: "rgba(255,255,255,.7)", lineHeight: 1.85, marginTop: 28, maxWidth: 780 }}>{T.measuredNote}</p>
        </div>
      </section>

      {/* Contact and next steps */}
      <section style={{ padding: "80px 0", background: "var(--navy)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <SectionHeader eyebrow={T.contactEyebrow} title={T.contactTitle} dark center />
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.75)", lineHeight: 1.85, marginBottom: 32, marginTop: -20 }}>{T.contactBody}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 32 }}>
            <a href={`mailto:${T.contactEmail}`} style={{ color: "var(--gold)", fontFamily: "var(--font-poppins),sans-serif", fontSize: 15, fontWeight: 600, textDecoration: "none" }}>{T.contactEmail}</a>
            <span style={{ color: "rgba(255,255,255,.65)", fontSize: 14 }}>{T.contactKigali}</span>
            <span style={{ color: "rgba(255,255,255,.65)", fontSize: 14 }}>{T.contactBrussels}</span>
            <span style={{ color: "rgba(255,255,255,.65)", fontSize: 14 }}>{T.contactWestAfrica}</span>
          </div>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/sponsors" style={{ display: "inline-block", padding: "13px 32px", fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", borderRadius: 2, background: "var(--gold)", color: "var(--white)", textDecoration: "none" }}>
              {C.becomeASponsor}
            </Link>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "13px 32px", fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", borderRadius: 2, border: "2px solid var(--white)", color: "var(--white)", textDecoration: "none" }}>
              {T.contactCta}
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) { .grid-3 { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 768px) { .grid-2 { grid-template-columns: 1fr !important; } }
        @media (max-width: 640px) { .grid-3 { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}
