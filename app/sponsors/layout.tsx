import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sponsor Africa's SME Finance Forum — CBFF-SME 2026 Kigali",
  description:
    "Sponsor CBFF-SME 2026, the Africa SME finance forum in Kigali, Rwanda (Nov 19–20). Reach 250+ bankers, investors, and policymakers from 30+ countries — Diamond, Platinum, Gold, and Silver packages with full benefits, audience data, and ROI.",
  keywords: [
    "sponsor Africa business forum",
    "Africa SME finance forum 2026",
    "financement PME Afrique événement",
    "CBFF-SME sponsorship",
    "Rwanda investment conference 2026",
    "SME finance conference sponsor Kigali",
  ],
  alternates: { canonical: "https://cbffsme.com/sponsors" },
  openGraph: {
    title: "Sponsor CBFF-SME 2026 | Africa SME Finance Forum — Kigali, Rwanda",
    description:
      "Sponsorship packages, audience data, and partnership opportunities at the Continental Business & Finance Forum for SMEs 2026 — Kigali, Rwanda.",
    url: "https://cbffsme.com/sponsors",
  },
};

export default function SponsorsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
