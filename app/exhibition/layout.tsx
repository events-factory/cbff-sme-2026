import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exhibition — CBFF-SME 2026",
  description:
    "Showcase your products and services at the CBFF-SME 2026 exhibition floor — connecting African SMEs with investors, banks, and strategic partners in Kigali, Rwanda.",
  alternates: { canonical: "https://cbffsme.com/exhibition" },
  openGraph: {
    title: "Exhibition | CBFF-SME 2026",
    description:
      "Exhibition booths and showcasing opportunities at the Cross-Border Finance Forum for SMEs — Kigali, Rwanda, August 2026.",
    url: "https://cbffsme.com/exhibition",
  },
};

export default function ExhibitionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
