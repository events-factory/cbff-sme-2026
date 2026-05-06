"use client";
import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { t } from "@/locales/translations";

const typeStyles: Record<string, { border: string; bg: string; label: string; labelFr: string }> = {
  plenary:  { border: "var(--gold)",  bg: "rgba(201,151,43,.08)",  label: "Plenary",  labelFr: "Plénière" },
  panel:    { border: "var(--blue)",  bg: "rgba(46,109,173,.07)",  label: "Panel",    labelFr: "Panel" },
  deal:     { border: "#2a7a4b",      bg: "rgba(42,122,75,.07)",   label: "Deal Room",labelFr: "Deal Room" },
  workshop: { border: "#7a4b2a",      bg: "rgba(122,75,42,.07)",   label: "Workshop", labelFr: "Atelier" },
  social:   { border: "#6b3fa0",      bg: "rgba(107,63,160,.07)",  label: "Social",   labelFr: "Social" },
  break:    { border: "var(--muted)", bg: "transparent",           label: "Break",    labelFr: "Pause" },
  logistics:{ border: "var(--muted)", bg: "transparent",           label: "",         labelFr: "" },
};

export default function ProgramPage() {
  const { lang } = useLanguage();
  const T = t[lang].program;
  const [activeDay, setActiveDay] = useState(0);

  const day = T.days[activeDay];

  return (
    <>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, var(--navy2) 0%, var(--navy) 100%)", padding: "120px 24px 60px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 12 }}>{T.eyebrow}</p>
          <h1 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(28px,4vw,52px)", fontWeight: 800, color: "var(--white)", lineHeight: 1.1, marginBottom: 12, maxWidth: 700 }}>
            {T.title}
          </h1>
          <p style={{ fontSize: 15, color: "var(--gold)", fontWeight: 600 }}>{T.subtitle}</p>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.7)", marginTop: 12, maxWidth: 640, lineHeight: 1.8 }}>{T.lead}</p>
        </div>
      </div>

      {/* Day tabs */}
      <div style={{ background: "var(--navy2)", borderBottom: "2px solid rgba(201,151,43,.3)", position: "sticky", top: 68, zIndex: 100 }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", display: "flex", gap: 0, overflowX: "auto" }}>
          {T.days.map((d, i) => (
            <button
              key={i}
              onClick={() => setActiveDay(i)}
              style={{
                fontFamily: "var(--font-poppins),sans-serif",
                fontSize: 12, fontWeight: 700, letterSpacing: 1,
                textTransform: "uppercase",
                padding: "18px 28px",
                background: "transparent",
                color: activeDay === i ? "var(--gold)" : "rgba(255,255,255,.55)",
                border: "none",
                borderBottom: activeDay === i ? "3px solid var(--gold)" : "3px solid transparent",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "color .2s",
              }}
            >
              {d.label} — {d.date}
            </button>
          ))}
        </div>
      </div>

      {/* Sessions */}
      <section style={{ padding: "60px 0 80px", background: "var(--light)", minHeight: 500 }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px" }}>

          {/* Day theme */}
          <div style={{ marginBottom: 36 }}>
            <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 6 }}>{day.date}</p>
            <h2 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 800, color: "var(--navy)" }}>{day.theme}</h2>
            <div style={{ width: 48, height: 3, background: "var(--gold)", marginTop: 12 }} />
          </div>

          {/* Session list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {day.sessions.map((s, i) => {
              const style = typeStyles[s.type] ?? typeStyles.logistics;
              const isMinor = s.type === "break" || s.type === "logistics";
              const badge = lang === "fr" ? style.labelFr : style.label;
              return (
                <div
                  key={i}
                  style={{
                    display: "flex", gap: 0,
                    background: isMinor ? "transparent" : "var(--white)",
                    border: isMinor ? "none" : "1px solid var(--border)",
                    borderLeft: isMinor ? "none" : `4px solid ${style.border}`,
                    opacity: isMinor ? 0.65 : 1,
                  }}
                >
                  {/* Time */}
                  <div style={{
                    minWidth: 130, padding: isMinor ? "8px 16px 8px 0" : "20px 20px",
                    fontFamily: "var(--font-poppins),sans-serif",
                    fontSize: 12, fontWeight: 700, color: "var(--muted)",
                    whiteSpace: "nowrap", flexShrink: 0,
                  }}>
                    {s.time}
                  </div>

                  {/* Content */}
                  <div style={{ padding: isMinor ? "8px 0" : "20px 20px 20px 0", flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: "desc" in s && s.desc ? 8 : 0 }}>
                      <h3 style={{
                        fontFamily: "var(--font-poppins),sans-serif",
                        fontSize: isMinor ? 13 : 15, fontWeight: isMinor ? 500 : 700,
                        color: isMinor ? "var(--muted)" : "var(--navy)",
                      }}>
                        {s.title}
                      </h3>
                      {badge && (
                        <span style={{
                          fontSize: 10, fontWeight: 700, letterSpacing: 1,
                          textTransform: "uppercase",
                          padding: "3px 8px",
                          background: style.bg,
                          color: style.border,
                          border: `1px solid ${style.border}`,
                          borderRadius: 2, flexShrink: 0,
                        }}>
                          {badge}
                        </span>
                      )}
                    </div>
                    {"desc" in s && s.desc && (
                      <p style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.7 }}>{s.desc}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Day nav */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40, gap: 12 }}>
            <button
              onClick={() => setActiveDay((p) => Math.max(0, p - 1))}
              disabled={activeDay === 0}
              style={{
                fontFamily: "var(--font-poppins),sans-serif", fontSize: 12, fontWeight: 700,
                letterSpacing: 1, textTransform: "uppercase",
                padding: "11px 24px", borderRadius: 2, cursor: activeDay === 0 ? "default" : "pointer",
                background: activeDay === 0 ? "var(--border)" : "var(--navy)",
                color: activeDay === 0 ? "var(--muted)" : "var(--white)", border: "none",
              }}
            >
              ← {lang === "fr" ? "Jour Précédent" : "Previous Day"}
            </button>
            <Link
              href="/registration"
              style={{
                fontFamily: "var(--font-poppins),sans-serif", fontSize: 12, fontWeight: 700,
                letterSpacing: 1, textTransform: "uppercase",
                padding: "11px 28px", borderRadius: 2,
                background: "var(--gold)", color: "var(--white)", textDecoration: "none",
              }}
            >
              {lang === "fr" ? "S'inscrire →" : "Register →"}
            </Link>
            <button
              onClick={() => setActiveDay((p) => Math.min(T.days.length - 1, p + 1))}
              disabled={activeDay === T.days.length - 1}
              style={{
                fontFamily: "var(--font-poppins),sans-serif", fontSize: 12, fontWeight: 700,
                letterSpacing: 1, textTransform: "uppercase",
                padding: "11px 24px", borderRadius: 2, cursor: activeDay === T.days.length - 1 ? "default" : "pointer",
                background: activeDay === T.days.length - 1 ? "var(--border)" : "var(--navy)",
                color: activeDay === T.days.length - 1 ? "var(--muted)" : "var(--white)", border: "none",
              }}
            >
              {lang === "fr" ? "Jour Suivant" : "Next Day"} →
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
