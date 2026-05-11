"use client";
import SectionHeader from "@/components/SectionHeader";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";
import { t } from "@/locales/translations";

export default function AboutPage() {
  const { lang } = useLanguage();
  const T = t[lang].about;
  const C = t[lang].common;

  return (
    <>
      {/* Page hero */}
      <div style={{ position: "relative", padding: "120px 24px 60px", marginBottom: 0, overflow: "hidden" }}>
        <Image src="/events/gallery-hall.jpg" alt="" fill style={{ objectFit: "cover", objectPosition: "center top" }} priority />
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,25,47,.88)" }} />
        <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 12 }}>{T.eyebrow}</p>
          <h1 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, color: "var(--white)", lineHeight: 1.2, maxWidth: 700 }}>
            {T.title}
          </h1>
        </div>
      </div>

      {/* Background & Origins */}
      <section style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px" }}>
          <SectionHeader eyebrow={T.originsEyebrow} title={T.originsTitle} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }} className="two-col">
            <div>
              <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.8, marginBottom: 20 }}>{T.body1}</p>
              <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.8 }}>{T.body2}</p>
            </div>
            <div>
              <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.8, marginBottom: 20 }}>{T.body3}</p>
              <div style={{ background: "var(--light)", border: "1px solid var(--border)", borderLeft: "4px solid var(--gold)", padding: "16px 20px" }}>
                <p style={{ fontSize: 14, color: "var(--navy)", fontWeight: 600 }}>{T.quote}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Historical Partners of SBPME-UEMOA */}
      <section style={{ padding: "80px 0", background: "var(--light)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px" }}>
          <SectionHeader eyebrow={T.sbpmeEyebrow} title={T.historicalTitle} />
          <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.8, marginBottom: 32, maxWidth: 780 }}>{T.historicalBody}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 64 }} className="grid-3">
            <div style={{ border: "1px solid var(--border)", padding: "24px" }}>
              <h4 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, fontWeight: 700, color: "var(--navy)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16, borderBottom: "2px solid var(--gold)", paddingBottom: 10 }}>
                {T.publicInstitutions}
              </h4>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {[
                  "Commission de l'UEMOA",
                  "CCR UEMOA — Chambre Consulaire Régionale",
                  "Ministères des États membres de l'UEMOA",
                  "FAPEBF UEMOA (Fédération des Banques)",
                  "FAPSFD UEMOA (Fédération des Microfinances)",
                  "BADEA",
                  "OAPI",
                  "Universités et Écoles de Commerce",
                  "BCEAO — Banque Centrale des États de l'Afrique de l'Ouest",
                  "BRVM (Bourse)",
                  "FAGACE",
                  "BOAD — Banque Ouest Africaine de Développement",
                  "FSA — Fonds Africain de Solidarité",
                  "AGF Group — African Guarantee Fund West Africa S.A.",
                  "AUF — Agence Universitaire de la Francophonie",
                ].map((item) => (
                  <li key={item} style={{ fontSize: 13, color: "var(--muted)", padding: "5px 0", borderBottom: "1px solid var(--border)" }}>
                    <span style={{ color: "var(--gold)", marginRight: 6 }}>•</span>{item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ border: "1px solid var(--border)", padding: "24px" }}>
              <h4 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, fontWeight: 700, color: "var(--navy)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16, borderBottom: "2px solid var(--gold)", paddingBottom: 10 }}>
                {T.bankingSector}
              </h4>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {[
                  "BIS — Banque Islamique du Sénégal",
                  "CBI — Coris Bank International",
                  "BOA — Bank Of Africa",
                  "ECOBANK",
                  "ORABANK",
                  "VISTA Bank",
                  "BNDA — Banque Nationale de Développement Agricole",
                  "BADF — Banque Agricole Du Faso",
                  "Banque Atlantique",
                  "WBI — Wendkuni Bank International",
                  "BDU — Banque De l'Union",
                  "IB Bank — International Business Bank",
                  "BCB — Banque Commerciale du Burkina",
                  "UBA — United Bank for Africa",
                  "BAO-GB",
                  "BSIC",
                  "SUNU Bank",
                  "COFINA",
                  "FCPB — Fédération des Caisses Populaires du Burkina",
                  "Institutions de Microfinance",
                ].map((item) => (
                  <li key={item} style={{ fontSize: 13, color: "var(--muted)", padding: "5px 0", borderBottom: "1px solid var(--border)" }}>
                    <span style={{ color: "var(--gold)", marginRight: 6 }}>•</span>{item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ border: "1px solid var(--border)", padding: "24px" }}>
              <h4 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, fontWeight: 700, color: "var(--navy)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16, borderBottom: "2px solid var(--gold)", paddingBottom: 10 }}>
                {T.privateSector}
              </h4>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {[
                  "Chambres Consulaires et Associations de PME de l'UEMOA",
                  "Partenaires techniques internationaux",
                  "Opérateurs économiques régionaux",
                  "ASKY Airlines",
                  "Air Burkina",
                  "Air Côte d'Ivoire",
                  "Air Sénégal",
                  "Royal Air Maroc",
                ].map((item) => (
                  <li key={item} style={{ fontSize: 13, color: "var(--muted)", padding: "5px 0", borderBottom: "1px solid var(--border)" }}>
                    <span style={{ color: "var(--gold)", marginRight: 6 }}>•</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Past Editions Gallery */}
      <section style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px" }}>
          <SectionHeader eyebrow={lang === "fr" ? "Éditions Passées" : "Past Editions"} title={lang === "fr" ? "Un bilan éprouvé" : "A Proven Track Record"} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }} className="gallery-grid">
            {[
              { src: "/events/gallery-dignitaries.jpg", alt: "VIP delegates applauding" },
              { src: "/events/speaker-podium.jpg",      alt: "Speaker at SBPME podium" },
              { src: "/events/gallery-networking.jpg",  alt: "Delegates networking" },
              { src: "/events/speaker-female.jpg",      alt: "Speaker address" },
            ].map((img) => (
              <div key={img.src} style={{ position: "relative", height: 240, overflow: "hidden" }}>
                <Image src={img.src} alt={img.alt} fill style={{ objectFit: "cover", objectPosition: "center" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Lessons */}
      <section style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px" }}>
          <SectionHeader eyebrow={T.sbpmeEyebrow} title={T.lessonsTitle} />
          <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 32, alignItems: "start" }} className="lessons-layout">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }} className="grid-2">
              {T.lessons.map((l, i) => (
                <div key={i} style={{ background: "var(--white)", border: "1px solid var(--border)", padding: "24px" }}>
                  <h4 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 14, fontWeight: 700, color: "var(--navy)", marginBottom: 6 }}>
                    {i + 1}. {l.title}
                  </h4>
                  <p style={{ fontSize: 13.5, color: "var(--muted)" }}>{l.desc}</p>
                </div>
              ))}
            </div>
            <div style={{ position: "relative", minHeight: 420, overflow: "hidden" }}>
              <Image src="/events/panel-discussion.jpg" alt="Panel discussion at SBPME-UEMOA" fill style={{ objectFit: "cover", objectPosition: "center" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Vision */}
      <section style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px" }}>
          <SectionHeader eyebrow={T.visionEyebrow} title={T.visionTitle} lead={T.visionLead} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }} className="grid-2">
            {T.objectives.map((o, i) => (
              <div key={i} style={{ display: "flex", gap: 16, border: "1px solid var(--border)", padding: "24px" }}>
                <div style={{ minWidth: 44, height: 44, background: "var(--gold)", color: "var(--white)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-poppins),sans-serif", fontSize: 18, fontWeight: 800, flexShrink: 0 }}>{i + 1}</div>
                <div>
                  <h4 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 14, fontWeight: 700, color: "var(--navy)", marginBottom: 6 }}>{o.title}</h4>
                  <p style={{ fontSize: 13.5, color: "var(--muted)" }}>{o.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Rwanda */}
      <section style={{ padding: "80px 0", background: "var(--navy)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px" }}>

          {/* Title + image row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: 56, alignItems: "center", marginBottom: 48 }} className="why-rwanda-layout">
            <div>
              <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 10 }}>{T.rwandaEyebrow}</p>
              <h2 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(22px,3vw,32px)", fontWeight: 700, color: "var(--white)", marginBottom: 18 }}>{T.rwandaTitle}</h2>
              <div style={{ width: 60, height: 3, background: "var(--gold)", marginBottom: 28 }} />
              <p style={{ fontSize: 16, color: "rgba(255,255,255,.75)", lineHeight: 1.8 }}>{T.rwandaLead}</p>
            </div>
            <div style={{ position: "relative", height: 340, borderRadius: 4, overflow: "hidden" }}>
              <Image src="/kigali-city-1.jpg" alt="Kigali, Rwanda" fill style={{ objectFit: "cover", objectPosition: "center" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,25,47,.55) 0%, transparent 55%)" }} />
              <div style={{ position: "absolute", bottom: 18, left: 18 }}>
                <p style={{ color: "var(--gold)", fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 3 }}>Kigali, Rwanda</p>
                <p style={{ color: "rgba(255,255,255,.75)", fontSize: 13 }}>Africa&apos;s innovation capital</p>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }} className="grid-2">
            {T.rwandaReasons.map((r) => (
              <div key={r.title} style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)", borderTop: "3px solid var(--gold)", padding: "24px" }}>
                <h4 style={{ color: "var(--gold)", fontSize: 14, fontFamily: "var(--font-poppins),sans-serif", fontWeight: 700, marginBottom: 8 }}>{r.title}</h4>
                <p style={{ color: "rgba(255,255,255,.75)", fontSize: 13.5 }}>{r.desc}</p>
              </div>
            ))}
          </div>

          {/* Expected Impact */}
          <div style={{ marginTop: 48 }}>
            <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,.5)", marginBottom: 16 }}>{T.impactLabel}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "rgba(255,255,255,.15)" }} className="impact-grid">
              {T.impact.map((s) => (
                <div key={s.num} style={{ textAlign: "center", padding: "28px 20px", background: "rgba(255,255,255,.06)" }}>
                  <div style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(18px,2.5vw,28px)", fontWeight: 800, color: "var(--gold)", lineHeight: 1, marginBottom: 8 }}>{s.num}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,.7)" }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "60px 0", textAlign: "center", background: "var(--light)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px" }}>
          <p style={{ fontSize: 16, color: "var(--muted)", marginBottom: 24 }}>{T.ctaText}</p>
          <Link href="/speakers" style={{ display: "inline-block", padding: "13px 32px", fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", borderRadius: 2, background: "var(--gold)", color: "var(--white)", textDecoration: "none" }}>
            {lang === "fr" ? "Voir les Intervenants →" : "Meet the Speakers →"}
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .two-col       { grid-template-columns: 1fr !important; }
          .grid-2        { grid-template-columns: 1fr !important; }
          .grid-3        { grid-template-columns: 1fr !important; }
          .impact-grid   { grid-template-columns: 1fr !important; }
          .gallery-grid  { grid-template-columns: 1fr !important; }
          .lessons-layout { grid-template-columns: 1fr !important; }
          .lessons-layout > div:last-child { min-height: 260px !important; }
          .why-rwanda-layout { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 641px) and (max-width: 900px) {
          .grid-3 { grid-template-columns: repeat(2,1fr) !important; }
          .lessons-layout { grid-template-columns: 1fr !important; }
          .lessons-layout > div:last-child { min-height: 300px !important; }
        }
      `}</style>
    </>
  );
}
