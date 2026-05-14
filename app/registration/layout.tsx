import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register — CBFF-SME 2026",
  description:
    "Register now for CBFF-SME 2026 — the Cross-Border Finance Forum for SMEs in Kigali, Rwanda. Secure your place at Africa's premier SME finance and investment conference.",
  alternates: { canonical: "https://cbffsme.com/registration" },
  openGraph: {
    title: "Register | CBFF-SME 2026",
    description:
      "Secure your place at the Cross-Border Finance Forum for SMEs — Kigali Serena Hotel, Rwanda, August 10–11, 2026.",
    url: "https://cbffsme.com/registration",
  },
};

export default function RegistrationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
