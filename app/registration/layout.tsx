import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register — Africa SME Finance Forum 2026, Kigali",
  description:
    "Register for CBFF-SME 2026, the Rwanda investment conference and Africa SME finance forum at Kigali Serena Hotel, November 19–20, 2026. Physical and virtual attendance, delegate categories, and secure online payment.",
  keywords: [
    "Rwanda investment conference 2026",
    "Africa SME finance forum 2026 registration",
    "CBFF-SME registration",
    "Kigali business conference registration",
  ],
  alternates: { canonical: "https://cbffsme.com/registration" },
  openGraph: {
    title: "Register | CBFF-SME 2026 — Africa SME Finance Forum",
    description:
      "Secure your place at the Cross-Border Finance Forum for SMEs — Kigali Serena Hotel, Rwanda, November 19–20, 2026.",
    url: "https://cbffsme.com/registration",
  },
};

export default function RegistrationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
