import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programme — Africa SME Finance Forum 2026, Kigali",
  description:
    "Full programme for CBFF-SME 2026, the Africa SME finance forum and Rwanda investment conference — panel discussions, workshops, Deal Room sessions, and networking at Kigali Serena Hotel, November 19–20, 2026.",
  keywords: [
    "Africa SME finance forum 2026 programme",
    "Rwanda investment conference 2026 agenda",
    "financement PME Afrique événement programme",
    "CBFF-SME programme",
  ],
  alternates: { canonical: "https://cbffsme.com/program" },
  openGraph: {
    title: "Programme | CBFF-SME 2026 — Africa SME Finance Forum",
    description:
      "Full agenda for the Cross-Border Finance Forum for SMEs 2026 — panels, Deal Room, exhibitions, and networking in Kigali, Rwanda.",
    url: "https://cbffsme.com/program",
  },
};

export default function ProgramLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
