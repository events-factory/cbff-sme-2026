import type { Metadata } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/lib/LanguageContext";
import JsonLd from "@/components/JsonLd";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-open-sans",
  display: "swap",
});

const BASE_URL = "https://cbffsme.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "CBFF-SME 2026 | Cross-Border Finance Forum for SMEs — Kigali, Rwanda",
    template: "%s | CBFF-SME 2026",
  },
  description:
    "Building Africa's Trust, Finance and Market Access Infrastructure for SMEs. Join 500+ leaders, investors, and policymakers at Kigali Serena Hotel, Rwanda — August 10–11, 2026.",
  keywords: [
    "CBFF SME 2026",
    "Cross-Border Finance Forum",
    "SME Africa",
    "Kigali conference 2026",
    "Africa SME finance",
    "Rwanda business forum",
    "African SME investment",
    "trade finance Africa",
    "MINICOM Rwanda",
    "African entrepreneurship",
  ],
  authors: [{ name: "CBFF-SME Consortium" }],
  creator: "CBFF-SME Consortium",
  publisher: "CBFF-SME Consortium",
  alternates: {
    canonical: BASE_URL,
    languages: {
      "en": `${BASE_URL}`,
      "fr": `${BASE_URL}?lang=fr`,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "fr_FR",
    url: BASE_URL,
    siteName: "CBFF-SME 2026",
    title: "CBFF-SME 2026 | Cross-Border Finance Forum — Kigali, Rwanda",
    description:
      "Building Africa's Trust, Finance and Market Access Infrastructure for SMEs. Kigali Serena Hotel, August 10–11, 2026.",
    images: [
      {
        url: "/CBFF_logo_original_transparent.png",
        width: 1200,
        height: 630,
        alt: "CBFF-SME 2026 — Cross-Border Finance Forum for SMEs, Kigali Rwanda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CBFF-SME 2026 | Cross-Border Finance Forum — Kigali, Rwanda",
    description:
      "Building Africa's Trust, Finance and Market Access Infrastructure for SMEs. August 10–11, 2026.",
    images: ["/CBFF_logo_original_transparent.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/icon.png", type: "image/png", sizes: "512x512" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${openSans.variable}`}>
      <head>
        <JsonLd />
      </head>
      <body style={{ fontFamily: "var(--font-open-sans), sans-serif" }}>
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
