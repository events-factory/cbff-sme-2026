import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Become a Panelist — CBFF-SME 2026 Kigali | Panels & Speakers",
  description:
    "Panels at CBFF-SME 2026 are decision workshops, not conferences. Discover the 3C methodology (Concrete, Costed, Contract-ready), panellist commitments, the 60-minute format, and the seven 2026 themes — then register your interest to become a panelist.",
  keywords: [
    "CBFF-SME panelist",
    "become a speaker Africa SME forum",
    "Africa SME finance panel 2026",
    "Kigali forum speakers 2026",
    "panéliste CBFF-SME Kigali",
    "SME finance speaking opportunity Rwanda",
  ],
  alternates: { canonical: "https://cbffsme.com/panelists" },
  openGraph: {
    title: "Panels & Speakers | CBFF-SME 2026 — Kigali, Rwanda",
    description:
      "The 3C methodology, panellist commitments and the seven 2026 themes of the Continental Business & Finance Forum for SMEs — Kigali, 19–20 November 2026.",
    url: "https://cbffsme.com/panelists",
  },
};

export default function PanelistsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
