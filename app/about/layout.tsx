import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About CBFF-SME 2026",
  description:
    "Learn about the Cross-Border Finance Forum for SMEs 2026 — its mission, organisers, and the consortium driving Africa's SME finance infrastructure in Kigali, Rwanda.",
  alternates: { canonical: "https://cbffsme.com/about" },
  openGraph: {
    title: "About CBFF-SME 2026 | Cross-Border Finance Forum",
    description:
      "Learn about the consortium and mission behind CBFF-SME 2026 — building Africa's Trust, Finance and Market Access Infrastructure for SMEs.",
    url: "https://cbffsme.com/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
