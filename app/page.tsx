"use client";
import Link from "next/link";
import Image from "next/image";
import CountdownTimer from "@/components/CountdownTimer";
import { MapPin, Calendar, Users, CheckCircle, Building2, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { t } from "@/locales/translations";

const partners = [
  { logo: "/logos/boa.png", name: "Bank of Africa", desc: "Regional banking partner" },
];

export default function Home() {
  const { lang } = useLanguage();
  const T = t[lang].home;
  const C = t[lang].common;

  const heroInfo = [
    { Icon: MapPin,   strong: "Kigali Serena Hotel",      sub: "Venue" },
    { Icon: Calendar, strong: lang === "fr" ? "19 – 20 novembre 2026" : "November 19 – 20, 2026", sub: T.twoDaysForum },
    { Icon: Users,    strong: T.dealRoomNetworking,  sub: T.investmentMatchmaking },
  ];

  return (
    <>
      {/* ── Hero ───────────────────────────────────── */}
      <section style={{
        minHeight: "100vh",
        backgroundImage: "url('/hero-bg.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        textAlign: "center", position: "relative", overflow: "hidden",
        padding: "100px 24px 80px",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(10,25,47,.92) 0%, rgba(10,25,47,.82) 45%, rgba(30,77,123,.85) 100%)", pointerEvents: "none" }} />

        <div style={{ border: "1px solid var(--gold)", color: "var(--white)", fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", padding: "7px 20px", marginBottom: 28, position: "relative" }}>
          {T.badge}
        </div>

        <h1 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(28px,5vw,58px)", fontWeight: 800, color: "var(--white)", lineHeight: 1.15, marginBottom: 10, position: "relative" }}>
          {T.title1}<br /><span style={{ color: "var(--gold)" }}>{T.title2}</span>
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: 14, justifyContent: "center", margin: "10px 0 18px", position: "relative" }}>
          <div style={{ height: 1, width: 40, background: "rgba(201,151,43,.7)" }} />
          <span style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(13px,2vw,17px)", fontWeight: 800, color: "var(--gold)", letterSpacing: 6, textTransform: "uppercase" }}>KIGALI · RWANDA</span>
          <div style={{ height: 1, width: 40, background: "rgba(201,151,43,.7)" }} />
        </div>
        <p style={{ fontSize: "clamp(14px,2vw,18px)", color: "rgba(255,255,255,.8)", fontStyle: "italic", maxWidth: 680, margin: "0 auto 24px", position: "relative" }}>
          {T.tagline}
        </p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 32, flexWrap: "wrap", marginBottom: 48, position: "relative" }}>
          {heroInfo.map((m) => (
            <div key={m.strong} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(201,151,43,.2)", border: "1px solid var(--gold)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <m.Icon size={16} color="var(--gold)" />
              </div>
              <div style={{ textAlign: "left" }}>
                <strong style={{ display: "block", color: "var(--white)", fontFamily: "var(--font-poppins),sans-serif", fontSize: 15, fontWeight: 700 }}>{m.strong}</strong>
                <span style={{ color: "rgba(255,255,255,.6)", fontSize: 12 }}>{m.sub}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", position: "relative" }}>
          <Link href="/registration" style={{ display: "inline-block", padding: "13px 32px", fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", borderRadius: 2, background: "var(--gold)", color: "var(--white)", textDecoration: "none" }}>
            {C.registerNow}
          </Link>
          <Link href="/speakers" style={{ display: "inline-block", padding: "13px 32px", fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", borderRadius: 2, border: "2px solid var(--white)", color: "var(--white)", textDecoration: "none" }}>
            {lang === "fr" ? "Voir le Panel" : "Meet the Panel"}
          </Link>
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
          <CountdownTimer />
        </div>
      </section>

      {/* ── Hosts & Partners bar ───────────────────── */}
      <div style={{ background: "var(--navy2)", borderBottom: "2px solid var(--gold)" }}>

        {/* Hosts row */}
        <div style={{ borderBottom: "1px solid rgba(255,255,255,.08)", padding: "28px 24px" }}>
          <div style={{ maxWidth: 1160, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
              <span style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 9, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", flexShrink: 0, whiteSpace: "nowrap" }}>
                {lang === "fr" ? "Organisé par" : "Hosted by"}
              </span>
              <span style={{ width: 1, height: 28, background: "rgba(201,151,43,.4)", flexShrink: 0 }} />
              {/* Netkigali */}
              <div style={{ background: "#0a192f", borderRadius: 4, padding: "5px 14px", display: "flex", alignItems: "center", justifyContent: "center", height: 44 }}>
                <Image src="/net-kigali.webp" alt="Netkigali" width={88} height={32} style={{ objectFit: "contain", maxWidth: 88, maxHeight: 32 }} />
              </div>
              {/* Re-bird Belgium */}
              <div style={{ background: "#fff", borderRadius: 4, padding: "5px 14px", display: "flex", alignItems: "center", justifyContent: "center", height: 44 }}>
                <Image src="/rebird_logo.png" alt="Re-bird Belgium" width={80} height={32} style={{ objectFit: "contain", maxWidth: 80, maxHeight: 32 }} />
              </div>
              {/* SBPME-UEMOA */}
              <div style={{ background: "#fff", borderRadius: 4, padding: "5px 14px", display: "flex", alignItems: "center", justifyContent: "center", height: 44 }}>
                <Image src="/logos/sbpme-uemoa.png" alt="SBPME-UEMOA" width={80} height={32} style={{ objectFit: "contain", maxWidth: 80, maxHeight: 32 }} />
              </div>
              {/* Congruence Consulting */}
              <div style={{ background: "#fff", borderRadius: 4, padding: "5px 14px", display: "flex", alignItems: "center", justifyContent: "center", height: 44 }}>
                <Image src="/logos/congruence-consulting.jpeg" alt="Congruence Consulting" width={92} height={32} style={{ objectFit: "contain", maxWidth: 92, maxHeight: 32 }} />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ── 2026 Forum Themes ─────────────────────── */}
      <section style={{ padding: "80px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image src="/bg-4.jpeg" alt="" fill style={{ objectFit: "cover", objectPosition: "center" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(10,25,47,.88)" }} />
        </div>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 10 }}>{T.themesLabel}</p>
          <h2 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(22px,3vw,32px)", fontWeight: 700, color: "var(--white)", marginBottom: 18 }}>{T.themesTitle}</h2>
          <div style={{ width: 60, height: 3, background: "var(--gold)", marginBottom: 40 }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="themes-grid">
            {T.themes.map((theme) => (
              <div key={theme.title} style={{ borderLeft: "3px solid var(--gold)", background: "rgba(255,255,255,.05)", padding: "22px 22px 22px 20px" }}>
                <h4 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 14, fontWeight: 700, color: "var(--gold)", marginBottom: 8 }}>{theme.title}</h4>
                <p style={{ fontSize: 13.5, color: "rgba(255,255,255,.65)", lineHeight: 1.65 }}>{theme.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats bar ──────────────────────────────── */}
      <div style={{ background: "var(--gold)", padding: "44px 0" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "rgba(255,255,255,.3)" }} className="stats-grid">
          {T.stats.map((s) => (
            <div key={s.num} style={{ textAlign: "center", padding: "28px 20px", background: "var(--gold)" }}>
              <div style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 800, color: "var(--white)", lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.85)", marginTop: 8 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Kigali Spotlight ──────────────────────── */}
      <section style={{ background: "var(--navy)", padding: "72px 0", overflow: "hidden" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 8 }}>
              {lang === "fr" ? "Ville Hôte · 2026" : "Host City · 2026"}
            </p>
            <h2 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(64px,12vw,140px)", fontWeight: 900, color: "transparent", WebkitTextStroke: "2px var(--gold)", lineHeight: 0.85, letterSpacing: -2, marginBottom: 8 }}>KIGALI</h2>
            <h3 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(14px,2.5vw,22px)", fontWeight: 800, color: "var(--white)", letterSpacing: 10, textTransform: "uppercase", marginBottom: 20 }}>RWANDA</h3>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,.55)", maxWidth: 440, margin: "0 auto" }}>
              {lang === "fr" ? "La Capitale de l'Innovation en Afrique" : "Africa's Innovation Capital"}
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }} className="kigali-grid">
            {[
              { num: "#1", label: lang === "fr" ? "Ville la plus propre" : "Cleanest City", sub: lang === "fr" ? "en Afrique" : "in Africa" },
              { num: "KIFC", label: lang === "fr" ? "Hub Financier" : "Finance Hub", sub: lang === "fr" ? "Continental" : "Continental" },
              { num: "Top 3", label: lang === "fr" ? "Ville la plus sûre" : "Safest City", sub: lang === "fr" ? "en Afrique" : "in Africa" },
              { num: "EAC", label: lang === "fr" ? "Passerelle" : "Gateway", sub: lang === "fr" ? "Afrique de l'Est" : "East Africa" },
            ].map((item) => (
              <div key={item.num} style={{ textAlign: "center", border: "1px solid rgba(201,151,43,.3)", padding: "24px 16px" }}>
                <div style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(16px,2vw,24px)", fontWeight: 900, color: "var(--gold)", marginBottom: 6 }}>{item.num}</div>
                <div style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 12, fontWeight: 700, color: "var(--white)", marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,.45)", textTransform: "uppercase", letterSpacing: 1 }}>{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Kigali City Showcase ──────────────────── */}
      <section style={{ background: "#000", overflow: "hidden" }}>
        <div style={{ display: "flex", height: "480px" }} className="kigali-showcase">
          {[
            { src: "/kigali-city-1.jpg", headline: lang === "fr" ? "Propre &\nVerte" : "Clean &\nGreen", sub: lang === "fr" ? "Ville modèle d'Afrique" : "Model city of Africa" },
            { src: "/kigali-city-2.jpg", headline: lang === "fr" ? "Hub\nFinancier" : "Finance\nHub", sub: lang === "fr" ? "Kigali International Financial Centre" : "Kigali International Financial Centre" },
            { src: "/kigali-city-3.jpg", headline: lang === "fr" ? "Sûre &\nOuverte" : "Safe &\nOpen", sub: lang === "fr" ? "Top 3 des villes les plus sûres" : "Top 3 safest cities in Africa" },
            { src: "/kigali-city-4.jpg", headline: lang === "fr" ? "Capitale\nTech" : "Tech\nCapital", sub: lang === "fr" ? "Écosystème numérique de premier plan" : "Africa's leading digital ecosystem" },
            { src: "/kigali-city-5.jpg", headline: lang === "fr" ? "Cœur\nd'Afrique" : "Heart of\nAfrica", sub: lang === "fr" ? "Carrefour continental" : "Continental crossroads" },
          ].map((item) => (
            <div key={item.src} style={{ flex: 1, position: "relative", overflow: "hidden", cursor: "default" }} className="kigali-panel">
              <Image src={item.src} alt={item.headline} fill style={{ objectFit: "cover", objectPosition: "center", transition: "transform .6s ease" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,25,47,.92) 0%, rgba(10,25,47,.3) 55%, transparent 100%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px 20px" }}>
                <h3 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(18px,1.8vw,26px)", fontWeight: 900, color: "var(--white)", lineHeight: 1.1, marginBottom: 8, whiteSpace: "pre-line" }}>{item.headline}</h3>
                <p style={{ fontSize: 11, color: "var(--gold)", fontFamily: "var(--font-poppins),sans-serif", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", lineHeight: 1.4 }}>{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Past Editions ─────────────────────────── */}
      <section style={{ padding: "80px 0", background: "var(--light)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px" }}>
          <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 10 }}>
            {lang === "fr" ? "Éditions Passées" : "Past Editions"}
          </p>
          <h2 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(22px,3vw,32px)", fontWeight: 700, color: "var(--navy)", marginBottom: 18 }}>
            {lang === "fr" ? "Plus d'une décennie à connecter PME & banques africaines" : "Over a Decade of Connecting African SMEs & Banks"}
          </h2>
          <div style={{ width: 60, height: 3, background: "var(--gold)", marginBottom: 40 }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }} className="past-editions-grid">
            {[
              { src: "/events/gallery-audience.jpg", caption: lang === "fr" ? "200+ délégués, Guinée-Bissau 2024" : "200+ delegates, Guinée-Bissau 2024" },
              { src: "/events/exhibition-booth.jpg", caption: lang === "fr" ? "Espace exposition, SBPME-UEMOA" : "Exhibition floor, SBPME-UEMOA" },
              { src: "/events/networking-side.jpg",  caption: lang === "fr" ? "Networking & opportunités d'affaires" : "Networking & deal-making" },
            ].map((item) => (
              <div key={item.src} style={{ position: "relative", height: 260, overflow: "hidden" }} className="past-edition-card">
                <Image src={item.src} alt={item.caption} fill style={{ objectFit: "cover", objectPosition: "center" }} />
                <div className="past-edition-overlay" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,25,47,.75) 0%, transparent 55%)", display: "flex", alignItems: "flex-end", padding: "16px" }}>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,.9)", fontFamily: "var(--font-poppins),sans-serif", fontWeight: 600, letterSpacing: 0.5 }}>{item.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Three Days of Impact ──────────────────── */}
      <section style={{ padding: "80px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image src="/banner1.jpg" alt="" fill style={{ objectFit: "cover", objectPosition: "center" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,.94)" }} />
        </div>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 10 }}>{T.threeDaysLabel}</p>
          <h2 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(22px,3vw,32px)", fontWeight: 700, color: "var(--navy)", marginBottom: 18 }}>{T.threeDaysTitle}</h2>
          <div style={{ width: 60, height: 3, background: "var(--gold)", marginBottom: 40 }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }} className="three-days-grid">
            {T.threeDays.map((day) => (
              <div key={day.label} style={{ border: "1px solid var(--border)", borderTop: "3px solid var(--gold)", padding: "28px 24px", background: "var(--light)" }}>
                <div style={{ display: "inline-block", background: "var(--gold)", color: "var(--white)", fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", padding: "4px 12px", marginBottom: 14 }}>{day.label}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <Calendar size={14} color="var(--muted)" />
                  <span style={{ fontSize: 13, color: "var(--muted)" }}>{day.date}</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 16, lineHeight: 1.3 }}>{day.theme}</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {day.bullets.map((bullet) => (
                    <li key={bullet} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <CheckCircle size={14} color="var(--gold)" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.5 }}>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Deal Room 2026 ─────────────────────────── */}
      <section style={{ padding: "80px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image src="/53831513627_c4fcc73361_b.jpg" alt="" fill style={{ objectFit: "cover", objectPosition: "center" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(244,247,251,.95)" }} />
        </div>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center", position: "relative", zIndex: 1 }} className="deal-room-grid">
          <div>
            <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 10 }}>{T.dealRoomLabel}</p>
            <h2 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(22px,3vw,32px)", fontWeight: 700, color: "var(--navy)", marginBottom: 18 }}>{T.dealRoomTitle}</h2>
            <div style={{ width: 60, height: 3, background: "var(--gold)", marginBottom: 24 }} />
            <p style={{ fontSize: 15, color: "var(--text)", lineHeight: 1.8, marginBottom: 20 }}>{T.dealRoomBody}</p>
            <p style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.7, marginBottom: 32, borderLeft: "3px solid var(--gold)", paddingLeft: 16 }}>{T.dealRoomNote}</p>
            <Link href="/registration" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 32px", fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", borderRadius: 2, background: "var(--gold)", color: "var(--white)", textDecoration: "none" }}>
              {T.dealRoomCTA} <ArrowRight size={14} />
            </Link>
          </div>
          <div style={{ background: "var(--navy2)", border: "1px solid var(--gold)", padding: "36px 32px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
              <Building2 size={20} color="var(--gold)" />
              <span style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, fontWeight: 700, color: "var(--gold)", letterSpacing: 2, textTransform: "uppercase" }}>{T.dealRoomTitle}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {T.dealRoomStats.map((stat) => (
                <div key={stat.num} style={{ borderBottom: "1px solid rgba(255,255,255,.1)", paddingBottom: 20 }}>
                  <div style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(22px,3vw,32px)", fontWeight: 800, color: "var(--gold)", lineHeight: 1, marginBottom: 6 }}>{stat.num}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,.65)" }}>{stat.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Women & Youth Entrepreneurship Accelerator ── */}
      <section style={{ padding: "80px 0", background: "var(--navy)", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "flex-start" }} className="wy-grid">
            {/* Left column */}
            <div>
              <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 10 }}>{T.womenYouthEyebrow}</p>
              <h2 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(22px,3vw,32px)", fontWeight: 800, color: "var(--white)", lineHeight: 1.25, marginBottom: 18 }}>{T.womenYouthTitle}</h2>
              <div style={{ width: 60, height: 3, background: "var(--gold)", marginBottom: 24 }} />
              <p style={{ fontSize: 15, color: "rgba(255,255,255,.75)", lineHeight: 1.8, marginBottom: 32 }}>{T.womenYouthLead}</p>
              {/* 40% stat */}
              <div style={{ background: "rgba(201,151,43,.12)", border: "1px solid rgba(201,151,43,.5)", borderLeft: "4px solid var(--gold)", padding: "18px 22px", marginBottom: 32 }}>
                <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, fontWeight: 700, color: "var(--gold)", lineHeight: 1.5, margin: 0 }}>{T.womenYouthStat}</p>
              </div>
              <Link href="/registration?interest=women-youth" style={{ display: "inline-block", padding: "12px 28px", fontFamily: "var(--font-poppins),sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", borderRadius: 2, background: "var(--gold)", color: "var(--white)", textDecoration: "none" }}>
                {T.womenYouthCTA}
              </Link>
            </div>
            {/* Right column — activities */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {T.womenYouthActivities.map((act, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderLeft: "3px solid var(--gold)", padding: "18px 20px", display: "flex", gap: 14 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(201,151,43,.2)", border: "1px solid rgba(201,151,43,.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <span style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, fontWeight: 800, color: "var(--gold)" }}>{i + 1}</span>
                  </div>
                  <div>
                    <h4 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, fontWeight: 700, color: "var(--white)", marginBottom: 4 }}>{act.title}</h4>
                    <p style={{ fontSize: 12.5, color: "rgba(255,255,255,.6)", lineHeight: 1.6, margin: 0 }}>{act.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Partners carousel ──────────────────────── */}
      <section style={{ padding: "80px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image src="/banner3.jpeg" alt="" fill style={{ objectFit: "cover", objectPosition: "center" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(244,247,251,.95)" }} />
        </div>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 10 }}>
            {lang === "fr" ? "Partenaires" : "Partners"}
          </p>
          <h2 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(22px,3vw,32px)", fontWeight: 700, color: "var(--navy)", marginBottom: 18 }}>
            {lang === "fr" ? "Nos Partenaires" : "Our Partners"}
          </h2>
          <div style={{ width: 60, height: 3, background: "var(--gold)", marginBottom: 40 }} />
        </div>
        <div style={{ background: "var(--navy)", padding: "48px 0", position: "relative", zIndex: 2, overflow: "hidden" }}>
          <div
            className={partners.length >= 4 ? "animate-ticker" : ""}
            style={{ display: "flex", width: partners.length >= 4 ? "max-content" : "100%", justifyContent: partners.length >= 4 ? "flex-start" : "center", flexWrap: partners.length >= 4 ? "nowrap" : "wrap" }}
          >
            {(partners.length >= 4 ? [...partners, ...partners] : partners).map((p, idx) => (
              <div key={idx} style={{ border: "1px solid rgba(255,255,255,.15)", padding: "22px 16px", textAlign: "center", width: 220, flexShrink: 0, marginRight: 16 }}>
                <div style={{ width: 96, height: 56, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", overflow: "hidden" }}>
                  <div style={{ background: "#fff", borderRadius: 4, padding: "4px 6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Image src={p.logo} alt={p.name} width={76} height={44} style={{ objectFit: "contain", maxWidth: "100%", maxHeight: "100%" }} />
                  </div>
                </div>
                <h4 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 14, color: "var(--white)", fontWeight: 700, marginBottom: 4 }}>{p.name}</h4>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,.55)" }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sponsor CTA ────────────────────────────── */}
      <section style={{ background: "var(--navy)", padding: "56px 24px", borderTop: "1px solid rgba(201,151,43,.25)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 28 }}>
          <div style={{ maxWidth: 640 }}>
            <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 10 }}>
              {lang === "fr" ? "Parrainage" : "Sponsorship"}
            </p>
            <h2 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 800, color: "var(--white)", marginBottom: 10 }}>
              {lang === "fr" ? "Devenez Sponsor du CBFF-SME 2026" : "Become a CBFF-SME 2026 Sponsor"}
            </h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,.65)", lineHeight: 1.7, margin: 0 }}>
              {lang === "fr"
                ? "Positionnez votre institution devant 500+ décideurs, banquiers et investisseurs venus de plus de 30 pays."
                : "Position your institution in front of 500+ decision-makers, bankers, and investors from 30+ countries."}
            </p>
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link href="/sponsors" style={{ display: "inline-block", padding: "13px 28px", fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", borderRadius: 2, background: "var(--gold)", color: "var(--white)", textDecoration: "none" }}>
              {lang === "fr" ? "Voir les Offres" : "View Sponsorship Offers"}
            </Link>
            <a href="https://wa.me/250788991551" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "13px 28px", fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", borderRadius: 2, border: "2px solid var(--white)", color: "var(--white)", textDecoration: "none" }}>
              {lang === "fr" ? "Nous Contacter sur WhatsApp" : "Chat with Us on WhatsApp"}
            </a>
          </div>
        </div>
      </section>

      {/* ── Venue & Date Banner ────────────────────── */}
      <section style={{ background: "var(--navy2)", borderBottom: "3px solid var(--gold)", padding: "64px 0" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 32 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <MapPin size={18} color="var(--gold)" />
              <h2 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 800, color: "var(--white)", margin: 0 }}>{T.venueTitle}</h2>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <Calendar size={14} color="var(--gold)" />
              <span style={{ fontSize: 14, color: "var(--gold)", fontFamily: "var(--font-poppins),sans-serif", fontWeight: 600 }}>{T.venueAddress}</span>
            </div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,.65)", maxWidth: 520, lineHeight: 1.7, margin: 0 }}>{T.venueTagline}</p>
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link href="/registration" style={{ display: "inline-block", padding: "13px 28px", fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", borderRadius: 2, background: "var(--gold)", color: "var(--white)", textDecoration: "none" }}>
              {lang === "fr" ? "S'inscrire" : "Register Now"}
            </Link>
            <Link href="/program" style={{ display: "inline-block", padding: "13px 28px", fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", borderRadius: 2, border: "2px solid var(--white)", color: "var(--white)", textDecoration: "none" }}>
              {lang === "fr" ? "Voir le Programme" : "View Program"}
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 640px) {
          .kigali-grid { grid-template-columns: repeat(2,1fr) !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr !important; }
          .consortium-cards { grid-template-columns: 1fr !important; }
          .explore-grid { grid-template-columns: 1fr !important; }
          .themes-grid { grid-template-columns: 1fr !important; }
          .three-days-grid { grid-template-columns: 1fr !important; }
          .deal-room-grid { grid-template-columns: 1fr !important; }
          .past-editions-grid { grid-template-columns: 1fr !important; }
          .wy-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 641px) and (max-width: 900px) {
          .consortium-cards { grid-template-columns: repeat(2,1fr) !important; }
          .explore-grid { grid-template-columns: repeat(2,1fr) !important; }
          .themes-grid { grid-template-columns: repeat(2,1fr) !important; }
          .three-days-grid { grid-template-columns: 1fr !important; }
          .deal-room-grid { grid-template-columns: 1fr !important; }
          .past-editions-grid { grid-template-columns: repeat(2,1fr) !important; }
          .wy-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
