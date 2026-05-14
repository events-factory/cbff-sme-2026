import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programme — CBFF-SME 2026",
  description:
    "Explore the full conference programme for CBFF-SME 2026 — panel discussions, workshops, Deal Room sessions, and networking events at Kigali Serena Hotel, August 10–11, 2026.",
  alternates: { canonical: "https://cbffsme.com/program" },
  openGraph: {
    title: "Programme | CBFF-SME 2026",
    description:
      "Full agenda for the Cross-Border Finance Forum for SMEs 2026 — panels, Deal Room, exhibitions, and networking in Kigali, Rwanda.",
    url: "https://cbffsme.com/program",
  },
};

export default function ProgramLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
