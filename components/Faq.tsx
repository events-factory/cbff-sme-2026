"use client";
import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";

export interface FaqItem {
  q: string;
  a: string;
}

interface FaqProps {
  eyebrow: string;
  title: string;
  items: FaqItem[];
  dark?: boolean;
}

export default function Faq({ eyebrow, title, items, dark }: FaqProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section style={{ padding: "80px 0", background: dark ? "var(--navy)" : "var(--light)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
        <SectionHeader eyebrow={eyebrow} title={title} dark={dark} />
        <div>
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} style={{ borderBottom: `1px solid ${dark ? "rgba(255,255,255,.15)" : "var(--border)"}` }}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                    gap: 16, padding: "20px 0", background: "none", border: "none", cursor: "pointer",
                    textAlign: "left", fontFamily: "var(--font-poppins),sans-serif", fontSize: 15, fontWeight: 700,
                    color: dark ? "var(--white)" : "var(--navy)",
                  }}
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <span style={{ fontSize: 20, color: "var(--gold)", flexShrink: 0, lineHeight: 1 }}>{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && (
                  <p style={{ margin: 0, padding: "0 0 20px", fontSize: 14, lineHeight: 1.8, color: dark ? "rgba(255,255,255,.7)" : "var(--muted)" }}>
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
