"use client";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { t } from "@/locales/translations";

export default function SpeakersPage() {
  const { lang } = useLanguage();
  const T = t[lang].speakers;

  return (
    <>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, var(--navy2) 0%, var(--navy) 100%)", padding: "120px 24px 60px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 12 }}>{T.eyebrow}</p>
          <h1 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, color: "var(--white)", lineHeight: 1.2, maxWidth: 700 }}>
            {T.title}
          </h1>
        </div>
      </div>

      {/* Coming Soon */}
      <section style={{ padding: "120px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div style={{ width: 72, height: 72, background: "var(--light)", border: "2px solid var(--gold)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 16 }}>
            {lang === "fr" ? "Bientôt Disponible" : "Coming Soon"}
          </p>
          <h2 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(24px,3vw,36px)", fontWeight: 800, color: "var(--navy)", marginBottom: 16, lineHeight: 1.2 }}>
            {lang === "fr" ? "Les Intervenants Seront Annoncés" : "Speakers Will Be Announced"}
          </h2>
          <div style={{ width: 48, height: 3, background: "var(--gold)", margin: "0 auto 24px" }} />
          <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.8, marginBottom: 40 }}>
            {lang === "fr"
              ? "Nous finalisons un programme exceptionnel d'intervenants de haut niveau. Revenez bientôt pour découvrir les leaders, experts et décideurs qui façonneront les discussions du CBFF-PME 2026."
              : "We are finalising an exceptional line-up of high-level speakers. Check back soon to discover the leaders, experts, and policymakers who will shape the conversations at CBFF-SME 2026."}
          </p>
          <Link
            href="/registration"
            style={{
              display: "inline-block", padding: "13px 32px",
              fontFamily: "var(--font-poppins),sans-serif",
              fontSize: 13, fontWeight: 700, letterSpacing: 1,
              textTransform: "uppercase", borderRadius: 2,
              background: "var(--navy)", color: "var(--white)",
              textDecoration: "none",
            }}
          >
            {lang === "fr" ? "S'inscrire au Forum →" : "Register for the Forum →"}
          </Link>
        </div>
      </section>
    </>
  );
}
