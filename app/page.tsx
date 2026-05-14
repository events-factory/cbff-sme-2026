"use client";
import Link from "next/link";
import Image from "next/image";
import CountdownTimer from "@/components/CountdownTimer";
import { MapPin, Calendar, Users, CheckCircle, Building2, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { t } from "@/locales/translations";

const consortiumLogos = ["/net-kigali.webp", "/rebird_logo.png", "/logos/sbpme-uemoa.png", "/logos/congruence-consulting.jpeg"];
const consortiumInitials = [null, null, null, null];
const consortiumInvert = [true, true, false, false];

export default function Home() {
  const { lang } = useLanguage();
  const T = t[lang].home;
  const C = t[lang].common;

  const heroInfo = [
    { Icon: MapPin,   strong: "Kigali Serena Hotel",      sub: "Venue" },
    { Icon: Calendar, strong: lang === "fr" ? "10 – 11 août 2026" : "August 10 – 11, 2026", sub: T.twoDaysForum },
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
            {lang === "fr" ? "Voir les Intervenants" : "Meet the Speakers"}
          </Link>
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
          <CountdownTimer />
        </div>
      </section>

      {/* ── Partners & Hosts bar ───────────────────── */}
      <div style={{ background: "var(--navy2)", borderBottom: "2px solid var(--gold)" }}>

        {/* Partners row */}
        <div style={{ borderBottom: "1px solid rgba(255,255,255,.08)", padding: "28px 24px" }}>
          <div style={{ maxWidth: 1160, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
              <span style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 9, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", flexShrink: 0, whiteSpace: "nowrap" }}>
                {lang === "fr" ? "Partenaires" : "Partners"}
              </span>
              <span style={{ width: 1, height: 28, background: "rgba(201,151,43,.4)", flexShrink: 0 }} />
              {[
                { src: "/logos/bnr.png",         alt: "Banque Nationale du Rwanda", bg: "#0a192f" },
                { src: "/logos/minecofin.svg",   alt: "MINECOFIN",                  bg: "#fff" },
                { src: "/logos/rdb.png",         alt: "Rwanda Development Board",   bg: "#fff" },
                { src: "/logos/brd.svg",         alt: "BRD",                        bg: "#0a192f" },
                { src: "/logos/bok.png",         alt: "Bank of Kigali",             bg: "#fff" },
                { src: "/logos/boa.png",         alt: "Bank of Africa",             bg: "#fff" },
                { src: "/logos/imbank.png",      alt: "I&M Bank",                   bg: "#fff" },
                { src: "/logos/fagace.png",      alt: "FAGACE",                     bg: "#fff" },
                { src: "/logos/smart-africa.png",alt: "Smart Africa",               bg: "#fff" },
              ].map((logo) => (
                <div key={logo.alt} style={{ background: logo.bg, borderRadius: 4, padding: "5px 12px", display: "flex", alignItems: "center", justifyContent: "center", height: 40, overflow: "hidden" }}>
                  <Image src={logo.src} alt={logo.alt} width={72} height={28} style={{ objectFit: "contain", maxWidth: 72, maxHeight: 28 }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hosts row */}
        <div style={{ padding: "24px 24px" }}>
          <div style={{ maxWidth: 1160, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
              <span style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 9, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", flexShrink: 0, whiteSpace: "nowrap" }}>
                {lang === "fr" ? "Hôtes" : "Hosts"}
              </span>
              <span style={{ width: 1, height: 28, background: "rgba(201,151,43,.4)", flexShrink: 0 }} />
              {/* MINICOM gets a slightly taller tile as the government host */}
              <div style={{ background: "#fff", borderRadius: 4, padding: "5px 10px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 52, gap: 3 }}>
                <Image src="/logos/minicom.svg" alt="MINICOM" width={52} height={30} style={{ objectFit: "contain" }} />
                <span style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 7, fontWeight: 800, color: "#0a192f", letterSpacing: 1, textTransform: "uppercase" }}>MINICOM</span>
              </div>
              <span style={{ width: 1, height: 36, background: "rgba(255,255,255,.12)", flexShrink: 0 }} />
              {[
                { src: "/net-kigali.webp",               alt: "Netkigali",           bg: "#0a192f" },
                { src: "/rebird_logo.png",               alt: "Re-bird Belgium",     bg: "#fff" },
                { src: "/logos/sbpme-uemoa.png",         alt: "SBPME-UEMOA",        bg: "#fff" },
                { src: "/logos/congruence-consulting.jpeg", alt: "Congruence Consulting", bg: "#fff" },
              ].map((logo) => (
                <div key={logo.alt} style={{ background: logo.bg, borderRadius: 4, padding: "5px 14px", display: "flex", alignItems: "center", justifyContent: "center", height: 44 }}>
                  <Image src={logo.src} alt={logo.alt} width={88} height={32} style={{ objectFit: "contain", maxWidth: 88, maxHeight: 32 }} />
                </div>
              ))}
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

      {/* ── Executive Message ──────────────────────── */}
      <section style={{ padding: "80px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image src="/bg-2.jpg" alt="" fill style={{ objectFit: "cover", objectPosition: "center" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,.93)" }} />
        </div>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 10 }}>{T.executiveMessage}</p>
          <h2 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(22px,3vw,32px)", fontWeight: 700, color: "var(--navy)", marginBottom: 18 }}>{T.africaLacksPipelines}</h2>
          <div style={{ width: 60, height: 3, background: "var(--gold)", marginBottom: 28 }} />
          <div style={{ borderLeft: "4px solid var(--gold)", padding: "20px 28px", background: "var(--light)", marginBottom: 40 }}>
            <p style={{ fontStyle: "italic", fontSize: 16, lineHeight: 1.8, color: "var(--navy)" }}>
              {T.quote1}<br />
              {T.quote2}<br />
              <strong style={{ fontStyle: "normal", fontWeight: 700 }}>{T.quote3}</strong>
            </p>
          </div>
          <p style={{ fontSize: 15, color: "var(--muted)", maxWidth: 780, lineHeight: 1.8, marginBottom: 36 }}>{T.body}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }} className="grid-2">
            {T.capabilities.map((c) => (
              <div key={c.title} style={{ background: "var(--white)", border: "1px solid var(--border)", borderTop: "3px solid var(--gold)", padding: "22px 24px" }}>
                <h4 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 14, fontWeight: 700, color: "var(--navy)", marginBottom: 6 }}>{c.title}</h4>
                <p style={{ fontSize: 13.5, color: "var(--muted)" }}>{c.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 40, textAlign: "center" }}>
            <Link href="/about" style={{ display: "inline-block", padding: "13px 32px", fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", borderRadius: 2, background: "var(--navy)", color: "var(--white)", textDecoration: "none" }}>
              {C.learnMore}
            </Link>
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

      {/* ── Kigali in Motion (Video) ───────────────── */}
      <section style={{ background: "#000", position: "relative", overflow: "hidden" }}>
        {/* Top label bar */}
        <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 40px", borderBottom: "1px solid rgba(201,151,43,.25)", background: "rgba(10,25,47,.95)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", boxShadow: "0 0 8px var(--gold)" }} />
            <span style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 10, fontWeight: 800, letterSpacing: 4, textTransform: "uppercase", color: "var(--gold)" }}>
              {lang === "fr" ? "Kigali en Mouvement" : "Kigali in Motion"}
            </span>
          </div>
          <span style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,.35)" }}>
            Rwanda · {lang === "fr" ? "Août" : "August"} 2026
          </span>
        </div>

        {/* Video */}
        <div style={{ position: "relative", width: "100%", paddingBottom: "52%" }}>
          <iframe
            src="https://www.youtube.com/embed/v1SIZoSfoIc?autoplay=1&mute=1&loop=1&playlist=v1SIZoSfoIc&controls=0&rel=0&modestbranding=1&showinfo=0"
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Kigali, Rwanda"
          />
          {/* Bottom gradient overlay with text */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 1, background: "linear-gradient(to top, rgba(10,25,47,.85) 0%, transparent 50%)", padding: "40px 48px 32px", pointerEvents: "none" }}>
            <h2 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(22px,4vw,48px)", fontWeight: 900, color: "var(--white)", lineHeight: 1, margin: "0 0 8px" }}>
              KIGALI<span style={{ color: "var(--gold)" }}>.</span>
            </h2>
            <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(11px,1.2vw,14px)", fontWeight: 600, color: "rgba(255,255,255,.6)", letterSpacing: 3, textTransform: "uppercase", margin: 0 }}>
              {lang === "fr" ? "Rwanda · Ville Hôte 2026" : "Rwanda · Host City 2026"}
            </p>
          </div>
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

      {/* ── Consortium cards ───────────────────────── */}
      <section style={{ padding: "80px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image src="/banner3.jpeg" alt="" fill style={{ objectFit: "cover", objectPosition: "center" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(244,247,251,.95)" }} />
        </div>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 10 }}>{T.consortium}</p>
          <h2 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(22px,3vw,32px)", fontWeight: 700, color: "var(--navy)", marginBottom: 18 }}>{T.ourOrganisingConsortium}</h2>
          <div style={{ width: 60, height: 3, background: "var(--gold)", marginBottom: 40 }} />
        </div>
        <div style={{ background: "var(--navy)", padding: "48px 24px", position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }} className="consortium-cards">
            {T.consortiumMembers.map((c, idx) => (
              <div key={c.name} style={{ border: "1px solid rgba(255,255,255,.15)", padding: "22px 16px", textAlign: "center" }}>
                <div style={{ width: 96, height: 56, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", overflow: "hidden" }}>
                  {consortiumLogos[idx] ? (
                    consortiumInvert[idx] ? (
                      <Image src={consortiumLogos[idx]!} alt={c.name} width={80} height={44} style={{ objectFit: "contain", maxWidth: "100%", maxHeight: "100%", filter: "brightness(0) invert(1)" }} />
                    ) : (
                      <div style={{ background: "#fff", borderRadius: 4, padding: "4px 6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Image src={consortiumLogos[idx]!} alt={c.name} width={76} height={44} style={{ objectFit: "contain", maxWidth: "100%", maxHeight: "100%" }} />
                      </div>
                    )
                  ) : (
                    <span style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, fontWeight: 800, color: "var(--gold)", letterSpacing: 1, textAlign: "center", lineHeight: 1.3 }}>{consortiumInitials[idx]}</span>
                  )}
                </div>
                <h4 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 14, color: "var(--white)", fontWeight: 700, marginBottom: 4 }}>{c.name}</h4>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,.55)" }}>{c.desc}</p>
              </div>
            ))}
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
