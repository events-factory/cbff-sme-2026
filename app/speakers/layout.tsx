import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Speakers — CBFF-SME 2026",
  description:
    "Meet the speakers and keynote presenters at CBFF-SME 2026 — policymakers, financiers, and SME leaders shaping Africa's cross-border finance landscape in Kigali, Rwanda.",
  alternates: { canonical: "https://cbffsme.com/speakers" },
  openGraph: {
    title: "Speakers | CBFF-SME 2026",
    description:
      "Keynote speakers, panellists, and thought leaders at the Cross-Border Finance Forum for SMEs — Kigali, Rwanda, August 10–11, 2026.",
    url: "https://cbffsme.com/speakers",
  },
};

export default function SpeakersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
