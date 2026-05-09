"use client";
import SectionHeader from "@/components/SectionHeader";
import Image from "next/image";
import Link from "next/link";
import { Plane, Wifi, Shield, TrendingUp, Sun, MapPin, Building2, DollarSign, Landmark, Clock, ShoppingBag, Zap, Phone, PhoneCall, Store } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { t } from "@/locales/translations";

const tipIcons = [DollarSign, Landmark, Clock, ShoppingBag, Zap, Phone, PhoneCall, Store];

const whyIcons = [Shield, Wifi, TrendingUp, Plane];

export default function DestinationPage() {
  const { lang } = useLanguage();
  const T = t[lang].destination;

  return (
    <>
      {/* Hero */}
      <div style={{ position: "relative", minHeight: 420, display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <Image src="/banner1.jpeg" alt="Kigali, Rwanda" fill style={{ objectFit: "cover", objectPosition: "center" }} priority />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,25,47,.95) 0%, rgba(10,25,47,.6) 60%, rgba(10,25,47,.3) 100%)" }} />
        <div style={{ position: "relative", maxWidth: 1160, margin: "0 auto", width: "100%", padding: "80px 24px 60px" }}>
          <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 12 }}>{T.eyebrow}</p>
          <h1 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(36px,5vw,64px)", fontWeight: 800, color: "var(--white)", lineHeight: 1.1, marginBottom: 8 }}>
            {T.title}
          </h1>
          <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(16px,2vw,22px)", color: "var(--gold)", fontWeight: 600, fontStyle: "italic" }}>
            {T.subtitle}
          </p>
        </div>
      </div>

      {/* Why Kigali */}
      <section style={{ padding: "80px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image src="/banner1.jpg" alt="" fill style={{ objectFit: "cover", objectPosition: "center" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,.93)" }} />
        </div>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <SectionHeader eyebrow={T.whyKigaliEyebrow} title={T.whyKigaliTitle} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }} className="why-grid">
            {T.whyKigaliReasons.map((r, i) => {
              const Icon = whyIcons[i];
              return (
                <div key={r.title} style={{ border: "1px solid var(--border)", borderTop: "3px solid var(--gold)", padding: "28px 20px" }}>
                  <div style={{ width: 48, height: 48, background: "var(--light)", border: "1px solid var(--border)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <Icon size={22} color="var(--gold)" />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 14, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{r.title}</h3>
                  <p style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.7 }}>{r.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Getting There */}
      <section style={{ padding: "80px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image src="/53831513627_c4fcc73361_b.jpg" alt="" fill style={{ objectFit: "cover", objectPosition: "center" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(244,247,251,.94)" }} />
        </div>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <SectionHeader eyebrow={T.gettingThereEyebrow} title={T.gettingThereTitle} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }} className="two-col">
            <div>
              <div style={{ display: "flex", gap: 16, marginBottom: 32 }}>
                <div style={{ width: 48, height: 48, background: "var(--gold)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <MapPin size={22} color="white" />
                </div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{T.visaTitle}</h3>
                  <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.8 }}>{T.visaBody}</p>
                </div>
              </div>
            </div>
            <div>
              <div style={{ display: "flex", gap: 16, marginBottom: 32 }}>
                <div style={{ width: 48, height: 48, background: "var(--gold)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Plane size={22} color="white" />
                </div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{T.airportTitle}</h3>
                  <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.8 }}>{T.airportBody}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accommodation */}
      <section style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 260 }}>
            <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 12 }}>
              {lang === "fr" ? "Hébergement" : "Accommodation"}
            </p>
            <h2 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(22px,2.5vw,32px)", fontWeight: 800, color: "var(--navy)", marginBottom: 16, lineHeight: 1.2 }}>
              {lang === "fr" ? "Réservez Votre Hôtel" : "Book Your Hotel"}
            </h2>
            <div style={{ width: 48, height: 3, background: "var(--gold)", marginBottom: 20 }} />
            <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.8, maxWidth: 520 }}>
              {lang === "fr"
                ? "Des hôtels partenaires ont été sélectionnés pour les participants du CBFF-PME 2026. Réservez directement via notre plateforme officielle pour bénéficier des tarifs négociés pour l'événement."
                : "Partner hotels have been selected for CBFF-SME 2026 participants. Book directly through our official platform to benefit from negotiated event rates."}
            </p>
          </div>
          <div style={{ flexShrink: 0 }}>
            <a
              href="https://smartbookings.rw/Event-Hotels/664eb499dcbed"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "14px 32px",
                fontFamily: "var(--font-poppins),sans-serif",
                fontSize: 13, fontWeight: 700, letterSpacing: 1,
                textTransform: "uppercase", borderRadius: 2,
                background: "var(--navy)", color: "var(--white)",
                textDecoration: "none",
              }}
            >
              {lang === "fr" ? "Réserver un Hôtel →" : "Book a Hotel →"}
            </a>
          </div>
        </div>
      </section>

      {/* Climate + Venue */}
      <section style={{ padding: "80px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image src="/bg-4.jpeg" alt="" fill style={{ objectFit: "cover", objectPosition: "center" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(10,25,47,.9)" }} />
        </div>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, position: "relative", zIndex: 1 }} className="two-col">
            <div>
              <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 12 }}>{T.climateEyebrow}</p>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 8 }}>
                <Sun size={28} color="var(--gold)" style={{ flexShrink: 0, marginTop: 2 }} />
                <h2 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 700, color: "var(--white)" }}>{T.climateTitle}</h2>
              </div>
              <div style={{ width: 60, height: 3, background: "var(--gold)", marginBottom: 24 }} />
              <p style={{ fontSize: 15, color: "rgba(255,255,255,.75)", lineHeight: 1.8 }}>{T.climateBody}</p>
              <div style={{ marginTop: 24, display: "flex", gap: 20 }}>
                {[
                  { val: "15–25°C", lbl: lang === "fr" ? "Température Diurne" : "Daytime Temp" },
                  { val: lang === "fr" ? "Saison Sèche" : "Dry Season", lbl: lang === "fr" ? "Conditions" : "Conditions" },
                ].map((s) => (
                  <div key={s.val} style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)", padding: "16px 20px", flex: 1, textAlign: "center" }}>
                    <div style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 18, fontWeight: 800, color: "var(--gold)", marginBottom: 4 }}>{s.val}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,.5)", textTransform: "uppercase", letterSpacing: 1 }}>{s.lbl}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 12 }}>{T.venueEyebrow}</p>
              <h2 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 700, color: "var(--white)", marginBottom: 8 }}>{T.venueTitle}</h2>
              <div style={{ width: 60, height: 3, background: "var(--gold)", marginBottom: 24 }} />
              <p style={{ fontSize: 15, color: "rgba(255,255,255,.75)", lineHeight: 1.8 }}>{T.venueBody}</p>
              <div style={{ marginTop: 28 }}>
                <Link
                  href="/registration"
                  style={{
                    display: "inline-block", padding: "13px 28px",
                    fontFamily: "var(--font-poppins),sans-serif",
                    fontSize: 13, fontWeight: 700, letterSpacing: 1,
                    textTransform: "uppercase", borderRadius: 2,
                    background: "var(--gold)", color: "var(--white)",
                    textDecoration: "none",
                  }}
                >
                  {lang === "fr" ? "S'inscrire Maintenant →" : "Register Now →"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Travel Tips */}
      <section style={{ padding: "80px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image src="/bg-2.jpg" alt="" fill style={{ objectFit: "cover", objectPosition: "center" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(244,247,251,.95)" }} />
        </div>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <SectionHeader eyebrow={T.travelTipsEyebrow} title={T.travelTipsTitle} lead={T.travelTipsLead} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }} className="tips-grid">
            {T.travelTips.map((tip, i) => {
              const Icon = tipIcons[i] ?? DollarSign;
              return (
                <div key={tip.title} style={{ background: "var(--white)", border: "1px solid var(--border)", borderTop: "3px solid var(--gold)", padding: "28px 24px", display: "flex", gap: 16 }}>
                  <div style={{ width: 44, height: 44, background: "var(--light)", border: "1px solid var(--border)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={20} color="var(--gold)" />
                  </div>
                  <div>
                    <h4 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 14, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{tip.title}</h4>
                    <p style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.75 }}>{tip.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tours */}
      <section style={{ padding: "80px 0", background: "var(--navy)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 260 }}>
            <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 12 }}>
              {lang === "fr" ? "Explorez le Rwanda" : "Explore Rwanda"}
            </p>
            <h2 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(22px,2.5vw,32px)", fontWeight: 800, color: "var(--white)", marginBottom: 16, lineHeight: 1.2 }}>
              {lang === "fr" ? "Découvrez Kigali & Au-delà" : "Discover Kigali & Beyond"}
            </h2>
            <div style={{ width: 48, height: 3, background: "var(--gold)", marginBottom: 20 }} />
            <p style={{ fontSize: 15, color: "rgba(255,255,255,.75)", lineHeight: 1.8, maxWidth: 520 }}>
              {lang === "fr"
                ? "Profitez de votre séjour au Rwanda pour explorer l'une des destinations les plus remarquables d'Afrique. Des safaris aux gorilles de montagne aux visites de la ville de Kigali, des expériences inoubliables vous attendent."
                : "Make the most of your time in Rwanda by exploring one of Africa's most remarkable destinations. From mountain gorilla safaris to Kigali city tours, unforgettable experiences await."}
            </p>
          </div>
          <div style={{ flexShrink: 0 }}>
            <a
              href="http://www.ktravo.net/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "14px 32px",
                fontFamily: "var(--font-poppins),sans-serif",
                fontSize: 13, fontWeight: 700, letterSpacing: 1,
                textTransform: "uppercase", borderRadius: 2,
                background: "var(--gold)", color: "var(--white)",
                textDecoration: "none",
              }}
            >
              {lang === "fr" ? "Explorer les Tours →" : "Explore Tours →"}
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 640px) {
          .why-grid  { grid-template-columns: 1fr !important; }
          .grid-2    { grid-template-columns: 1fr !important; }
          .two-col   { grid-template-columns: 1fr !important; }
          .tips-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 641px) and (max-width: 900px) {
          .why-grid  { grid-template-columns: repeat(2,1fr) !important; }
          .two-col   { grid-template-columns: 1fr !important; }
          .tips-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </>
  );
}
