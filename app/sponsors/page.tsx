"use client";
import SectionHeader from "@/components/SectionHeader";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";
import { t } from "@/locales/translations";
import Faq, { faqJsonLd } from "@/components/Faq";
import { waLink } from "@/components/WhatsAppButton";
import { Megaphone, Mic, Handshake, Landmark, Users, Building2, Factory, Truck, Globe2, Search, Network, Layers, TrendingUp, BarChart3, Target, CalendarClock, CheckCircle2 } from "lucide-react";

const tierBgs = ["#0f6b5c", "var(--gold)", "#7d8794", "#9a6b3f"];
const levelIcons = [Megaphone, Mic, Handshake, Landmark];
const whoMeetIcons = [Landmark, Building2, Factory, Truck, Globe2];
const enableIcons = [Search, Network, Layers, TrendingUp, BarChart3];
const roiIcons = [Users, Globe2, Target, Handshake, CalendarClock, CheckCircle2];

export default function SponsorsPage() {
  const { lang } = useLanguage();
  const T = t[lang].sponsors;
  const C = t[lang].common;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(T.faq)) }}
      />
      <div style={{ position: "relative", padding: "120px 24px 60px", overflow: "hidden" }}>
        <Image src="/events/panel-discussion.jpg" alt="" fill priority style={{ objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(10,25,47,.94) 0%, rgba(10,25,47,.86) 45%, rgba(30,77,123,.88) 100%)" }} />
        <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative" }}>
          <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 12 }}>{T.eyebrow}</p>
          <h1 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, color: "var(--white)", lineHeight: 1.2, maxWidth: 700 }}>
            {T.title}
          </h1>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 28 }}>
            <Link href="/registration" style={{ display: "inline-block", padding: "13px 28px", fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", borderRadius: 2, background: "var(--gold)", color: "var(--white)", textDecoration: "none" }}>
              {C.becomeASponsor}
            </Link>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "13px 28px", fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", borderRadius: 2, border: "2px solid var(--white)", color: "var(--white)", textDecoration: "none" }}>
              {T.contactCta}
            </a>
          </div>
        </div>
      </div>

      {/* Institutional support */}
      <section style={{ padding: "32px 0", background: "var(--navy)", borderTop: "1px solid rgba(255,255,255,.1)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <span style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,.55)" }}>
            {T.partnersLabel}
          </span>
          <div style={{ background: "#fff", borderRadius: 4, padding: "5px 12px", display: "flex", alignItems: "center", height: 40 }}>
            <Image src="/logos/boa.png" alt="Bank of Africa" width={72} height={28} style={{ objectFit: "contain", maxWidth: 72, maxHeight: 28 }} />
          </div>
        </div>
      </section>

      {/* Why partner */}
      <section style={{ padding: "80px 0", background: "var(--light)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 56, alignItems: "center" }} className="grid-2">
          <div>
            <SectionHeader eyebrow={T.whyPartnerEyebrow} title={T.whyPartnerTitle} lead={T.whyPartnerBody} />
          </div>
          <div style={{ position: "relative", height: 340, overflow: "hidden", borderTop: "4px solid var(--gold)" }}>
            <Image src="/events/gallery-dignitaries.jpg" alt="" fill style={{ objectFit: "cover", objectPosition: "center" }} />
          </div>
        </div>
      </section>

      {/* Four levels of partnership value */}
      <section style={{ padding: "80px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image src="/bg-4.jpeg" alt="" fill style={{ objectFit: "cover", objectPosition: "center" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(10,25,47,.9)" }} />
        </div>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <SectionHeader eyebrow={T.levelsEyebrow} title={T.levelsTitle} dark />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }} className="grid-4">
            {T.levels.map((lvl, i) => {
              const Icon = levelIcons[i];
              return (
                <div key={lvl.label} style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.12)", borderTop: "3px solid var(--gold)", padding: "26px 22px" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 6, background: "rgba(201,151,43,.15)", border: "1px solid rgba(201,151,43,.35)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <Icon size={20} color="var(--gold)" />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 14, fontWeight: 700, color: "var(--gold)", marginBottom: 8 }}>{lvl.label}</h3>
                  <p style={{ fontSize: 13.5, color: "rgba(255,255,255,.68)", lineHeight: 1.7 }}>{lvl.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why sponsor — stats */}
      <section style={{ padding: "0 0 80px", background: "var(--light)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px" }}>
          <SectionHeader eyebrow={T.statsEyebrow} title={T.statsTitle} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }} className="grid-4">
            {T.stats.map((stat) => (
              <div key={stat.desc} style={{ borderLeft: "3px solid var(--gold)", paddingLeft: 16 }}>
                <div style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(22px,3vw,32px)", fontWeight: 800, color: "var(--navy)", lineHeight: 1, marginBottom: 6 }}>{stat.num}</div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who will you meet */}
      <section style={{ padding: "80px 0", background: "var(--white)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 56, alignItems: "center" }} className="grid-2">
          <div style={{ position: "relative", height: 420, overflow: "hidden", borderTop: "4px solid var(--gold)" }}>
            <Image src="/events/gallery-networking.jpg" alt="" fill style={{ objectFit: "cover", objectPosition: "center" }} />
          </div>
          <div>
            <SectionHeader eyebrow={T.whoMeetEyebrow} title={T.whoMeetTitle} />
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
              {T.whoMeet.map((item, i) => {
                const Icon = whoMeetIcons[i] ?? Users;
                return (
                  <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 14, borderBottom: "1px solid var(--border)", paddingBottom: 14 }}>
                    <span style={{ width: 38, height: 38, flexShrink: 0, borderRadius: 6, background: "var(--light)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={18} color="var(--gold)" />
                    </span>
                    <span style={{ fontSize: 14.5, color: "var(--text)", lineHeight: 1.6 }}>{item}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* What your strategic investment enables */}
      <section style={{ padding: "80px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image src="/banner2.jpg" alt="" fill style={{ objectFit: "cover", objectPosition: "center" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(10,25,47,.92)" }} />
        </div>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <SectionHeader eyebrow={T.enablesEyebrow} title={T.enablesTitle} dark />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 16 }} className="grid-5">
            {T.enables.map((e, i) => {
              const Icon = enableIcons[i] ?? Search;
              return (
                <div key={e.verb} style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.12)", padding: "24px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Icon size={20} color="var(--gold)" />
                    <span style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--gold)" }}>{e.verb}</span>
                  </div>
                  <p style={{ fontSize: 13.5, color: "rgba(255,255,255,.7)", lineHeight: 1.65 }}>{e.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section style={{ padding: "80px 0", background: "var(--navy)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px" }}>
          <SectionHeader eyebrow={T.tiersEyebrow} title={T.tiersTitle} dark lead={T.tiersLead} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }} className="grid-4">
            {T.tiers.map((tier, i) => (
              <div key={tier.label} style={{ border: "1px solid var(--border)", overflow: "hidden", background: "var(--white)", display: "flex", flexDirection: "column" }}>
                <div style={{ padding: "14px 16px", background: tierBgs[i], fontFamily: "var(--font-poppins),sans-serif", fontSize: 14, fontWeight: 700, color: "var(--white)" }}>{tier.label}</div>
                <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 19, fontWeight: 800, color: "var(--navy)" }}>{tier.amount}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)", borderTop: "1px solid var(--border)", paddingTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
                    <div>{T.statusLabel}: <strong style={{ color: "var(--navy)" }}>{tier.status}</strong></div>
                    <div>{T.networkLabel}: <strong style={{ color: "var(--navy)" }}>{tier.network}</strong></div>
                    <div>{T.activationLabel}: <strong style={{ color: "var(--navy)" }}>{tier.activation}</strong></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed package benefits */}
      <section style={{ padding: "80px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image src="/53831513627_c4fcc73361_b.jpg" alt="" fill style={{ objectFit: "cover", objectPosition: "center" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(10,25,47,.93)" }} />
        </div>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <SectionHeader eyebrow={T.detailedEyebrow} title={T.detailedTitle} dark />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }} className="grid-2">
            {T.detailedPackages.map((pkg, i) => (
              <div key={pkg.tier} style={{ border: "1px solid var(--border)", overflow: "hidden", background: "var(--white)" }}>
                <div style={{ padding: "16px 20px", background: tierBgs[i] }}>
                  <div style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 16, fontWeight: 700, color: "var(--white)" }}>{pkg.tier} — {pkg.amount}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,.75)", marginTop: 2 }}>{pkg.subtitle}</div>
                </div>
                <ul style={{ padding: "18px 20px", margin: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                  {pkg.bullets.map((b) => (
                    <li key={b} style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, paddingLeft: 14, position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, color: "var(--gold)" }}>•</span>{b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional partnership opportunities */}
      <section style={{ padding: "80px 0", background: "var(--light)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px" }}>
          <SectionHeader eyebrow={T.additionalEyebrow} title={T.additionalTitle} lead={T.additionalLead} />
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700, background: "var(--white)" }}>
              <thead>
                <tr style={{ background: "var(--navy2)" }}>
                  {T.additionalColumns.map((col) => (
                    <th key={col} style={{ textAlign: "left", padding: "14px 16px", fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, color: "var(--white)", fontWeight: 700 }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {T.additionalOpportunities.map((op, i) => (
                  <tr key={op.opportunity} style={{ background: i % 2 === 0 ? "var(--white)" : "var(--light)" }}>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: "var(--navy)", fontWeight: 700, borderBottom: "1px solid var(--border)" }}>{op.opportunity}</td>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: "var(--gold)", fontWeight: 700, borderBottom: "1px solid var(--border)", whiteSpace: "nowrap" }}>{op.investment}</td>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: "var(--muted)", borderBottom: "1px solid var(--border)" }}>{op.benefits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* From Forum to permanent network */}
      <section style={{ position: "relative", overflow: "hidden", padding: "72px 0" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image src="/kcc-night.png" alt="" fill style={{ objectFit: "cover", objectPosition: "center" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(10,25,47,.95) 0%, rgba(10,25,47,.82) 55%, rgba(10,25,47,.55) 100%)" }} />
        </div>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 620 }}>
            <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 12 }}>{T.networkEyebrow}</p>
            <h2 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: "clamp(20px,2.6vw,30px)", fontWeight: 800, color: "var(--white)", lineHeight: 1.25, marginBottom: 16 }}>{T.networkTitle}</h2>
            <div style={{ width: 56, height: 3, background: "var(--gold)", marginBottom: 20 }} />
            <p style={{ fontSize: 15, color: "rgba(255,255,255,.75)", lineHeight: 1.85 }}>{T.networkBody}</p>
          </div>
        </div>
      </section>

      {/* ROI */}
      <section style={{ padding: "80px 0", background: "var(--navy)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px" }}>
          <SectionHeader eyebrow={T.roiEyebrow} title={T.roiTitle} dark lead={T.roiLead} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }} className="grid-3">
            {T.roi.map((r, i) => {
              const Icon = roiIcons[i] ?? Target;
              return (
                <div key={r.title} style={{ border: "1px solid rgba(255,255,255,.15)", borderLeft: "3px solid var(--gold)", padding: "22px 20px", background: "rgba(255,255,255,.03)", display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <Icon size={20} color="var(--gold)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 14, fontWeight: 700, color: "var(--gold)", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>{r.title}</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,.68)", lineHeight: 1.6 }}>{r.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Opportunities / institutional partner targets */}
      <section style={{ padding: "80px 0", background: "var(--light)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px" }}>
          <SectionHeader eyebrow={T.opportunitiesEyebrow} title={T.opportunitiesTitle} lead={T.opportunitiesLead} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }} className="grid-2">
            {T.opportunities.map((op) => (
              <div key={op.num} style={{ border: "1px solid var(--border)", padding: 24, background: "var(--white)" }}>
                <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 8 }}>{op.tag}</p>
                <h4 style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 6 }}>{op.title}</h4>
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.7, marginBottom: 14 }}>{op.rationale}</p>
                <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}><strong style={{ color: "var(--gold)" }}>{T.roiLabel}:</strong> {op.roi}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Faq eyebrow={T.faqEyebrow} title={T.faqTitle} items={T.faq} />

      {/* Contact */}
      <section style={{ padding: "80px 0", background: "var(--navy)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <SectionHeader eyebrow={T.contactEyebrow} title={T.contactTitle} dark center />
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 32 }}>
            <a href={`mailto:${T.contactEmail}`} style={{ color: "var(--gold)", fontFamily: "var(--font-poppins),sans-serif", fontSize: 15, fontWeight: 600, textDecoration: "none" }}>{T.contactEmail}</a>
            <span style={{ color: "rgba(255,255,255,.65)", fontSize: 14 }}>{T.contactKigali}</span>
            <span style={{ color: "rgba(255,255,255,.65)", fontSize: 14 }}>{T.contactBrussels}</span>
          </div>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/registration" style={{ display: "inline-block", padding: "13px 32px", fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", borderRadius: 2, background: "var(--gold)", color: "var(--white)", textDecoration: "none" }}>
              {C.becomeASponsor}
            </Link>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "13px 32px", fontFamily: "var(--font-poppins),sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", borderRadius: 2, border: "2px solid var(--white)", color: "var(--white)", textDecoration: "none" }}>
              {T.contactCta}
            </a>
          </div>
        </div>
      </section>

<style>{`
        @media (max-width: 1024px) { .grid-5 { grid-template-columns: repeat(3,1fr) !important; } }
        @media (max-width: 900px) { .grid-5 { grid-template-columns: repeat(2,1fr) !important; } .grid-3 { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 768px) { .grid-2 { grid-template-columns: 1fr !important; } .grid-4 { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 640px) { .grid-3, .grid-4, .grid-5 { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}
