import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sponsors & Partners — CBFF-SME 2026",
  description:
    "Partner with CBFF-SME 2026 and gain unparalleled visibility among 500+ African SME leaders, financiers, and policymakers gathering in Kigali, Rwanda.",
  alternates: { canonical: "https://cbffsme.com/sponsors" },
  openGraph: {
    title: "Sponsors & Partners | CBFF-SME 2026",
    description:
      "Sponsorship and partnership opportunities at the Cross-Border Finance Forum for SMEs 2026 — Kigali, Rwanda.",
    url: "https://cbffsme.com/sponsors",
  },
};

export default function SponsorsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
