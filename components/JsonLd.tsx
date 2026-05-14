export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "CBFF-SME 2026 — Cross-Border Finance Forum for SMEs",
    description:
      "Building Africa's Trust, Finance and Market Access Infrastructure for SMEs. A premier two-day conference connecting African SMEs with banks, investors, and policymakers.",
    startDate: "2026-08-10",
    endDate: "2026-08-11",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Kigali Serena Hotel",
      address: {
        "@type": "PostalAddress",
        streetAddress: "KN 3 Avenue",
        addressLocality: "Kigali",
        addressCountry: "RW",
      },
    },
    organizer: [
      { "@type": "Organization", name: "MINICOM Rwanda", url: "https://minicom.gov.rw" },
      { "@type": "Organization", name: "Netkigali" },
      { "@type": "Organization", name: "Re-bird Belgium" },
      { "@type": "Organization", name: "SBPME-UEMOA" },
      { "@type": "Organization", name: "Congruence Consulting" },
    ],
    url: "https://cbffsme.com",
    image: "https://cbffsme.com/CBFF_logo_original_transparent.png",
    inLanguage: ["en", "fr"],
    audience: {
      "@type": "Audience",
      audienceType: "SME owners, investors, financiers, policymakers, development finance institutions",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
