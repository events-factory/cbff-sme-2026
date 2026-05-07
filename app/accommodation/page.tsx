"use client";
import { useLanguage } from "@/lib/LanguageContext";
import { Building2, MapPin, Wifi, Coffee, Car, Star } from "lucide-react";

const BOOKING_URL = "https://smartbookings.rw/Event-Hotels/664eb499dcbed";

const amenities = [
  { icon: Wifi,     en: "High-Speed Wi-Fi",       fr: "Wi-Fi Haut Débit" },
  { icon: Coffee,   en: "On-site Dining",          fr: "Restauration sur Place" },
  { icon: Car,      en: "Airport Transfers",       fr: "Navettes Aéroport" },
  { icon: MapPin,   en: "Central Location",        fr: "Emplacement Central" },
  { icon: Building2,en: "Conference Facilities",   fr: "Salles de Conférence" },
  { icon: Star,     en: "Negotiated Event Rates",  fr: "Tarifs Événement Négociés" },
];

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

      {/* Main CTA */}
      <section style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }} className="acc-grid">

            {/* Left — info */}
            <div>
              <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 12 }}>
                {lang === "fr" ? "Hôtels Partenaires" : "Partner Hotels"}
              </p>
              <h2 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(22px,2.5vw,32px)", fontWeight: 800, color: "var(--navy)", marginBottom: 16, lineHeight: 1.2 }}>
                {lang === "fr" ? "Hôtels Officiels de l'Événement" : "Official Event Hotels"}
              </h2>
              <div style={{ width: 48, height: 3, background: "var(--gold)", marginBottom: 24 }} />
              <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.8, marginBottom: 32 }}>
                {lang === "fr"
                  ? "Les hôtels officiels du CBFF-PME 2026 ont été soigneusement sélectionnés pour leur proximité avec le Kigali Serena Hotel et la qualité de leurs services. Des tarifs préférentiels sont disponibles pour les participants inscrits jusqu'à épuisement des disponibilités."
                  : "The official CBFF-SME 2026 hotels have been carefully selected for their proximity to the Kigali Serena Hotel and quality of service. Preferential rates are available for registered participants, subject to availability."}
              </p>

              {/* Amenities */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {amenities.map(({ icon: Icon, en, fr }) => (
                  <div key={en} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 36, height: 36, background: "var(--light)", border: "1px solid var(--border)", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={16} color="var(--gold)" />
                    </div>
                    <span style={{ fontSize: 13.5, color: "var(--text)", fontWeight: 500 }}>{lang === "fr" ? fr : en}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — booking card */}
            <div style={{ background: "var(--navy)", padding: 40, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 24 }}>
              <div style={{ width: 64, height: 64, background: "rgba(201,151,43,.15)", border: "2px solid var(--gold)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Building2 size={28} color="var(--gold)" />
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 10 }}>
                  {lang === "fr" ? "Plateforme Officielle" : "Official Platform"}
                </p>
                <h3 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 22, fontWeight: 800, color: "var(--white)", marginBottom: 12 }}>
                  SmartBookings Rwanda
                </h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,.65)", lineHeight: 1.7 }}>
                  {lang === "fr"
                    ? "Réservez en ligne en quelques clics. Sélectionnez votre hôtel, vos dates et confirmez votre séjour pour le CBFF-PME 2026."
                    : "Book online in a few clicks. Select your hotel, dates, and confirm your stay for CBFF-SME 2026."}
                </p>
              </div>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block", width: "100%",
                  padding: "15px 32px",
                  fontFamily: "var(--font-poppins),sans-serif",
                  fontSize: 13, fontWeight: 700, letterSpacing: 1,
                  textTransform: "uppercase", borderRadius: 2,
                  background: "var(--gold)", color: "var(--white)",
                  textDecoration: "none", textAlign: "center",
                }}
              >
                {lang === "fr" ? "Réserver Maintenant →" : "Book Now →"}
              </a>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,.4)" }}>
                {lang === "fr" ? "Tarifs préférentiels jusqu'à épuisement des places" : "Preferential rates subject to availability"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) { .acc-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}
