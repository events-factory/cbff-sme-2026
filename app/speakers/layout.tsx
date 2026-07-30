import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel — CBFF-SME 2026",
  description:
    "Meet the panel and keynote presenters at CBFF-SME 2026 — policymakers, financiers, and SME leaders shaping Africa's cross-border finance landscape in Kigali, Rwanda.",
  alternates: { canonical: "https://cbffsme.com/speakers" },
  openGraph: {
    title: "Panel | CBFF-SME 2026",
    description:
      "Keynote panellists and thought leaders at the Continental Business & Finance Forum for SMEs — Kigali, Rwanda, November 19–20, 2026.",
    url: "https://cbffsme.com/speakers",
  },
};

export default function SpeakersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
