import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partnership Opportunities — CBFF-SME 2026 Kigali",
  description:
    "Seven tailored partnership positions at CBFF-SME 2026, Kigali: institutional, investment & market access, Deal Room & financing, guarantees & SME preparation, cross-border trade & logistics, technology & NexoraPME, and inclusion & impact — each with profiles, positioning, benefits and expected return.",
  keywords: [
    "CBFF-SME partnership opportunities",
    "Africa SME forum partner 2026",
    "Deal Room financing partner Kigali",
    "institutional partner Africa business forum",
    "opportunités de partenariat CBFF-SME",
    "Rwanda 2026 strategic partnership",
  ],
  alternates: { canonical: "https://cbffsme.com/partnership-opportunities" },
  openGraph: {
    title: "Partnership Opportunities | CBFF-SME 2026 — Kigali, Rwanda",
    description:
      "Tailored positioning opportunities for institutions, financiers, corporations and technical partners at the Continental Business & Finance Forum for SMEs 2026.",
    url: "https://cbffsme.com/partnership-opportunities",
  },
};

export default function PartnershipOpportunitiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
