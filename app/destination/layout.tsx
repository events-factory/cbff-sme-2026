import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Destination Kigali — CBFF-SME 2026",
  description:
    "Discover Kigali, Rwanda — Africa's cleanest, safest, and most innovative city hosting CBFF-SME 2026. Travel tips, visa information, and why Kigali is Africa's premier business hub.",
  alternates: { canonical: "https://cbffsme.com/destination" },
  openGraph: {
    title: "Destination Kigali | CBFF-SME 2026",
    description:
      "Kigali, Rwanda: Africa's Innovation Capital and host city for the Cross-Border Finance Forum for SMEs 2026. Discover why Kigali leads Africa.",
    url: "https://cbffsme.com/destination",
  },
};

export default function DestinationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
