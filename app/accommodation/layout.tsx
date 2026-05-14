import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accommodation — CBFF-SME 2026",
  description:
    "Find recommended hotels and accommodation options for CBFF-SME 2026 delegates near Kigali Serena Hotel, Rwanda — August 10–11, 2026.",
  alternates: { canonical: "https://cbffsme.com/accommodation" },
  openGraph: {
    title: "Accommodation | CBFF-SME 2026",
    description:
      "Hotel and accommodation recommendations for CBFF-SME 2026 delegates in Kigali, Rwanda.",
    url: "https://cbffsme.com/accommodation",
  },
};

export default function AccommodationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
