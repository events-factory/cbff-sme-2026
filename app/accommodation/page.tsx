"use client";
import { useLanguage } from "@/lib/LanguageContext";

const BOOKING_URL = "https://mim.smartbookings.rw/Event-Hotels/664eb499dcbed";

export default function AccommodationPage() {
  const { lang } = useLanguage();

  return (
    <>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, var(--navy2) 0%, var(--navy) 100%)", padding: "120px 24px 60px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 12 }}>
            {lang === "fr" ? "Hébergement" : "Accommodation"}
          </p>
          <h1 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(28px,4vw,52px)", fontWeight: 800, color: "var(--white)", lineHeight: 1.1, marginBottom: 12, maxWidth: 700 }}>
            {lang === "fr" ? "Réservez Votre Hôtel" : "Book Your Hotel"}
          </h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.7)", maxWidth: 580, lineHeight: 1.8 }}>
            {lang === "fr"
              ? "Des hôtels partenaires ont été sélectionnés pour les participants du CBFF-PME 2026. Réservez via notre plateforme officielle pour bénéficier des tarifs négociés."
              : "Partner hotels have been selected for CBFF-SME 2026 participants. Book through our official platform to benefit from negotiated event rates."}
          </p>
        </div>
      </div>

      {/* Booking iframe */}
      <section style={{ padding: "48px 0 80px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ borderTop: "3px solid var(--gold)", overflow: "hidden", boxShadow: "0 4px 32px rgba(0,0,0,.1)" }}>
            <iframe
              src={BOOKING_URL}
              title="SmartBookings — CBFF-SME 2026 Hotels"
              width="100%"
              height="900"
              style={{ display: "block", border: "none" }}
              allow="payment"
            />
          </div>
          <p style={{ fontSize: 12, color: "var(--muted)", textAlign: "center", marginTop: 12 }}>
            {lang === "fr"
              ? "Si la page ne se charge pas, "
              : "If the page does not load, "}
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" style={{ color: "var(--gold)", fontWeight: 600 }}>
              {lang === "fr" ? "ouvrez la plateforme ici →" : "open the booking platform here →"}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
