"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { t } from "@/locales/translations";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function RegistrationForm() {
  const [submitted, setSubmitted] = useState(false);
  const { lang } = useLanguage();
  const T = t[lang].register;
  const searchParams = useSearchParams();
  const interest = searchParams.get("interest");

  const [selectedProfile, setSelectedProfile] = useState("");
  const [boothPref, setBoothPref] = useState("");

  useEffect(() => {
    if (interest === "exhibition") {
      setSelectedProfile(T.profiles[4]);
    }
  }, [interest, T.profiles]);

  const isExhibitor = selectedProfile === T.profiles[4];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <div style={{ background: "linear-gradient(135deg, var(--navy2) 0%, var(--navy) 100%)", padding: "120px 24px 60px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 12 }}>{T.eyebrow}</p>
          <h1 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, color: "var(--white)", lineHeight: 1.2, maxWidth: 700 }}>
            {T.title}
          </h1>
        </div>
      </div>

      <section style={{ padding: "80px 0", background: "var(--navy)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }} className="contact-grid">

            {/* Contact info */}
            <div>
              <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 10 }}>{T.contactUs}</p>
              <h3 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 22, fontWeight: 700, color: "var(--white)", marginBottom: 20 }}>{T.contactTitle}</h3>
              <p style={{ color: "rgba(255,255,255,.7)", marginBottom: 32, lineHeight: 1.8 }}>{T.contactBody}</p>

              {[
                { icon: "✉️", label: T.emailLabel,   value: "info@netkigali.com" },
                { icon: "📞", label: T.kigaliLabel,  value: "+250 788 991 551" },
                { icon: "📞", label: T.brusselsLabel, value: "+32 487 568 199" },
              ].map((c) => (
                <div key={c.label} style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 18 }}>
                  <div style={{ width: 40, height: 40, background: "rgba(201,151,43,.2)", border: "1px solid var(--gold)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <strong style={{ display: "block", color: "var(--white)", fontSize: 13, marginBottom: 2 }}>{c.label}</strong>
                    <span style={{ color: "rgba(255,255,255,.65)", fontSize: 14 }}>{c.value}</span>
                  </div>
                </div>
              ))}

              <div style={{ marginTop: 24, padding: 20, border: "1px solid rgba(201,151,43,.3)", background: "rgba(201,151,43,.08)" }}>
                <p style={{ fontSize: 12, fontFamily: "var(--font-poppins),sans-serif", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--gold)", marginBottom: 10 }}>
                  {lang === "fr" ? "Tarifs d'Inscription" : "Registration Fees"}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 14, color: "rgba(255,255,255,.8)" }}>{lang === "fr" ? "Participation entreprise" : "Company participation"}</span>
                    <span style={{ fontFamily: "var(--font-poppins),sans-serif", fontWeight: 800, fontSize: 16, color: "var(--gold)" }}>USD 200</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 14, color: "rgba(255,255,255,.8)" }}>{lang === "fr" ? "Stand exposition" : "Exhibition stand"}</span>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,.55)", fontStyle: "italic" }}>{lang === "fr" ? "Selon l'espace choisi" : "Depends on space"}</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 16, padding: 20, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.04)" }}>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,.7)", lineHeight: 1.8 }}>
                  <strong style={{ color: "var(--gold)" }}>NETKigali · Re-bird Belgium · SBPME-UEMOA · Congruence Consulting</strong>
                </p>
              </div>
            </div>

            {/* Form */}
            <div style={{ background: "var(--white)", padding: 36 }}>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                  <h3 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 22, fontWeight: 700, color: "var(--navy)", marginBottom: 12 }}>{T.successTitle}</h3>
                  <p style={{ color: "var(--muted)", fontSize: 15 }}>{T.successBody}</p>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 20, fontWeight: 700, color: "var(--navy)", marginBottom: 24 }}>{T.formTitle}</h3>
                  <form onSubmit={handleSubmit}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                      {[{ label: T.firstName, placeholder: T.firstNamePlaceholder }, { label: T.lastName, placeholder: T.lastNamePlaceholder }].map((f) => (
                        <div key={f.label}>
                          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: .5 }}>{f.label}</label>
                          <input required type="text" placeholder={f.placeholder} style={{ width: "100%", padding: "11px 14px", border: "1px solid var(--border)", fontFamily: "inherit", fontSize: 14, color: "var(--text)", outline: "none" }} />
                        </div>
                      ))}
                    </div>
                    {[
                      { label: T.emailField, type: "email", placeholder: T.emailPlaceholder, required: true },
                      { label: T.organisation, type: "text", placeholder: T.organisationPlaceholder, required: false },
                    ].map((f) => (
                      <div key={f.label} style={{ marginBottom: 16 }}>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: .5 }}>{f.label}</label>
                        <input required={f.required} type={f.type} placeholder={f.placeholder} style={{ width: "100%", padding: "11px 14px", border: "1px solid var(--border)", fontFamily: "inherit", fontSize: 14, color: "var(--text)", outline: "none" }} />
                      </div>
                    ))}
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: .5 }}>{T.interestedAs}</label>
                      <select
                        value={selectedProfile}
                        onChange={(e) => setSelectedProfile(e.target.value)}
                        style={{ width: "100%", padding: "11px 14px", border: "1px solid var(--border)", fontFamily: "inherit", fontSize: 14, color: "var(--text)", outline: "none", background: "var(--white)" }}
                      >
                        <option value="">{T.selectProfile}</option>
                        {T.profiles.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    </div>

                    {isExhibitor && (
                      <div style={{ marginBottom: 16 }}>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: .5 }}>{T.boothPreference}</label>
                        <select
                          value={boothPref}
                          onChange={(e) => setBoothPref(e.target.value)}
                          style={{ width: "100%", padding: "11px 14px", border: "1px solid var(--border)", fontFamily: "inherit", fontSize: 14, color: "var(--text)", outline: "none", background: "var(--white)" }}
                        >
                          <option value="">{T.boothNone}</option>
                          {T.boothOptions.map((o) => (
                            <option key={o} value={o}>{o}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div style={{ marginBottom: 16 }}>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: .5 }}>{T.messageLabel}</label>
                      <textarea placeholder={T.messagePlaceholder} style={{ width: "100%", padding: "11px 14px", border: "1px solid var(--border)", fontFamily: "inherit", fontSize: 14, color: "var(--text)", outline: "none", minHeight: 90, resize: "vertical" }} />
                    </div>
                    <button type="submit" style={{ width: "100%", padding: "13px 32px", fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", background: "var(--gold)", color: "var(--white)", border: "none", cursor: "pointer", borderRadius: 2 }}>
                      {t[lang].common.submitRegistration}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}

export default function RegistrationPage() {
  return (
    <Suspense>
      <RegistrationForm />
    </Suspense>
  );
}
