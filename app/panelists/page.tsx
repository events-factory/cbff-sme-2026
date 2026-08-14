"use client";
import SectionHeader from "@/components/SectionHeader";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";
import { t } from "@/locales/translations";
import { waLink } from "@/components/WhatsAppButton";
import { Target, Calculator, FileSignature, Users, Clock, MessageSquare, Zap, CheckCircle2 } from "lucide-react";

const ruleIcons = [Target, Calculator, FileSignature];
const formatIcons = [Users, Clock, MessageSquare, Zap];

export default function PanelistsPage() {
  const { lang } = useLanguage();
  const T = t[lang].panelists;
  const C = t[lang].common;

  return (
    <>
      {/* Hero */}
      <div style={{ position: "relative", padding: "120px 24px 60px", overflow: "hidden" }}>
        <Image src="/events/speaker-podium.jpg" alt="" fill priority style={{ objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(10,25,47,.94) 0%, rgba(10,25,47,.86) 45%, rgba(30,77,123,.88) 100%)" }} />
        <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative" }}>
          <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 12 }}>{T.eyebrow}</p>
          <h1 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, color: "var(--white)", lineHeight: 1.2, maxWidth: 760 }}>
            {T.title}
          </h1>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 28 }}>
            <Link href="/registration" style={{ display: "inline-block", padding: "13px 28px", fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", borderRadius: 2, background: "var(--gold)", color: "var(--white)", textDecoration: "none" }}>
              {T.heroCta}
            </Link>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "13px 28px", fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", borderRadius: 2, border: "2px solid var(--white)", color: "var(--white)", textDecoration: "none" }}>
              {T.contactCta}
            </a>
          </div>
        </div>
      </div>

      {/* Panel methodology */}
      <section style={{ padding: "80px 0", background: "var(--light)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 56, alignItems: "center" }} className="grid-2">
          <div>
            <SectionHeader eyebrow={T.methodologyEyebrow} title={T.methodologyTitle} lead={T.methodologyBody1} />
            <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.85, marginTop: -24 }}>{T.methodologyBody2}</p>
          </div>
          <div style={{ position: "relative", height: 340, overflow: "hidden", borderTop: "4px solid var(--gold)" }}>
            <Image src="/events/panel-discussion.jpg" alt="" fill style={{ objectFit: "cover", objectPosition: "center" }} />
          </div>
        </div>
      </section>

      {/* The 3C rule */}
      <section style={{ padding: "80px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image src="/bg-4.jpeg" alt="" fill style={{ objectFit: "cover", objectPosition: "center" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(10,25,47,.9)" }} />
        </div>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <SectionHeader eyebrow={T.ruleEyebrow} title={T.ruleTitle} lead={T.ruleLead} dark />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="grid-3">
            {T.rules.map((rule, i) => {
              const Icon = ruleIcons[i] ?? Target;
              return (
                <div key={rule.label} style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.12)", borderTop: "3px solid var(--gold)", padding: "26px 22px" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 6, background: "rgba(201,151,43,.15)", border: "1px solid rgba(201,151,43,.35)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <Icon size={20} color="var(--gold)" />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 14, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>{rule.label}</h3>
                  <p style={{ fontSize: 13.5, color: "rgba(255,255,255,.68)", lineHeight: 1.7 }}>{rule.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* A dynamic format */}
      <section style={{ padding: "80px 0", background: "var(--white)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px" }}>
          <SectionHeader eyebrow={T.formatEyebrow} title={T.formatTitle} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }} className="grid-4">
            {T.format.map((f, i) => {
              const Icon = formatIcons[i] ?? Clock;
              return (
                <div key={f.label} style={{ borderLeft: "3px solid var(--gold)", paddingLeft: 16 }}>
                  <Icon size={20} color="var(--gold)" style={{ marginBottom: 10 }} />
                  <div style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(20px,2.6vw,28px)", fontWeight: 800, color: "var(--navy)", lineHeight: 1, marginBottom: 8 }}>{f.time}</div>
                  <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>{f.label}</div>
                </div>
              );
            })}
          </div>
          <p style={{ fontSize: 15, color: "var(--navy)", fontWeight: 600, lineHeight: 1.8, marginTop: 36, paddingTop: 24, borderTop: "1px solid var(--border)" }}>
            {T.formatNote}
          </p>
        </div>
      </section>

      {/* Panellist commitments */}
      <section style={{ padding: "80px 0", background: "var(--light)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 56, alignItems: "center" }} className="grid-2">
          <div style={{ position: "relative", height: 420, overflow: "hidden", borderTop: "4px solid var(--gold)" }}>
            <Image src="/events/speaker-female.jpg" alt="" fill style={{ objectFit: "cover", objectPosition: "center" }} />
          </div>
          <div>
            <SectionHeader eyebrow={T.commitmentsEyebrow} title={T.commitmentsTitle} />
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
              {T.commitments.map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 14, borderBottom: "1px solid var(--border)", paddingBottom: 14 }}>
                  <CheckCircle2 size={18} color="var(--gold)" style={{ flexShrink: 0, marginTop: 3 }} />
                  <span style={{ fontSize: 14.5, color: "var(--text)", lineHeight: 1.6 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Themes and target profiles */}
      <section style={{ padding: "80px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image src="/banner2.jpg" alt="" fill style={{ objectFit: "cover", objectPosition: "center" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(10,25,47,.93)" }} />
        </div>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <SectionHeader eyebrow={T.themesEyebrow} title={T.themesTitle} dark />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }} className="grid-2">
            {T.themes.map((theme) => (
              <div key={theme.num} style={{ border: "1px solid var(--border)", background: "var(--white)", display: "flex", flexDirection: "column" }}>
                <div style={{ padding: "16px 20px", background: "var(--navy2)", display: "flex", alignItems: "flex-start", gap: 14 }}>
                  <span style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 20, fontWeight: 800, color: "var(--gold)", lineHeight: 1.1, flexShrink: 0 }}>{theme.num}</span>
                  <h3 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 15, fontWeight: 700, color: "var(--white)", lineHeight: 1.35 }}>{theme.title}</h3>
                </div>
                <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
                  <div>
                    <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 6 }}>{T.objectiveLabel}</p>
                    <p style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.7 }}>{theme.objective}</p>
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 6 }}>{T.profilesLabel}</p>
                    <p style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.7 }}>{theme.profiles}</p>
                  </div>
                  <div style={{ borderTop: "1px solid var(--border)", paddingTop: 14, marginTop: "auto" }}>
                    <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 6 }}>{T.deliverableLabel}</p>
                    <p style={{ fontSize: 13.5, color: "var(--navy)", fontWeight: 600, lineHeight: 1.7 }}>{theme.deliverable}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* A fundamental difference */}
      <section style={{ position: "relative", overflow: "hidden", padding: "72px 0" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image src="/kcc-night.png" alt="" fill style={{ objectFit: "cover", objectPosition: "center" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(10,25,47,.95) 0%, rgba(10,25,47,.82) 55%, rgba(10,25,47,.55) 100%)" }} />
        </div>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 620 }}>
            <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 12 }}>{T.differenceEyebrow}</p>
            <h2 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(20px,2.6vw,30px)", fontWeight: 800, color: "var(--white)", lineHeight: 1.25, marginBottom: 16 }}>{T.differenceTitle}</h2>
            <div style={{ width: 56, height: 3, background: "var(--gold)", marginBottom: 20 }} />
            <p style={{ fontSize: 15, color: "rgba(255,255,255,.75)", lineHeight: 1.85 }}>{T.differenceBody}</p>
          </div>
        </div>
      </section>

      {/* Detailed programme in preparation */}
      <section style={{ padding: "80px 0", background: "var(--white)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px" }}>
          <SectionHeader eyebrow={T.programmeEyebrow} title={T.programmeTitle} lead={T.programmeLead} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }} className="grid-4">
            {T.programme.map((item) => (
              <div key={item} style={{ border: "1px solid var(--border)", borderTop: "3px solid var(--gold)", background: "var(--light)", padding: "22px 20px", fontSize: 13.5, color: "var(--text)", lineHeight: 1.7 }}>
                {item}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32 }}>
            <Link href="/program" style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--navy)", textDecoration: "none", borderBottom: "2px solid var(--gold)", paddingBottom: 4 }}>
              {C.viewProgram} →
            </Link>
          </div>
        </div>
      </section>

      {/* Contact / register interest */}
      <section style={{ padding: "80px 0", background: "var(--navy)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <SectionHeader eyebrow={T.contactEyebrow} title={T.contactTitle} dark center />
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.75)", lineHeight: 1.85, marginBottom: 32, marginTop: -20 }}>{T.contactBody}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 32 }}>
            <a href={`mailto:${T.contactEmail}`} style={{ color: "var(--gold)", fontFamily: "var(--font-poppins),sans-serif", fontSize: 15, fontWeight: 600, textDecoration: "none" }}>{T.contactEmail}</a>
            <span style={{ color: "rgba(255,255,255,.65)", fontSize: 14 }}>{T.contactKigali}</span>
            <span style={{ color: "rgba(255,255,255,.65)", fontSize: 14 }}>{T.contactBrussels}</span>
          </div>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/registration" style={{ display: "inline-block", padding: "13px 32px", fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", borderRadius: 2, background: "var(--gold)", color: "var(--white)", textDecoration: "none" }}>
              {T.heroCta}
            </Link>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "13px 32px", fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", borderRadius: 2, border: "2px solid var(--white)", color: "var(--white)", textDecoration: "none" }}>
              {T.contactCta}
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) { .grid-3 { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 768px) { .grid-2 { grid-template-columns: 1fr !important; } .grid-4 { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 640px) { .grid-3, .grid-4 { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}
