import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

interface ExhibitionPackageProps {
  title: string;
  size: string;
  sqm: string;
  price?: string;
  includes: string[];
  image?: string;
  highlighted?: boolean;
  ctaLabel: string;
}

export default function ExhibitionPackage({ title, size, sqm, price, includes, image, highlighted, ctaLabel }: ExhibitionPackageProps) {
  return (
    <div style={{
      border: highlighted ? "2px solid var(--gold)" : "1px solid var(--border)",
      background: "var(--white)",
      position: "relative",
      overflow: "hidden",
    }}>
      {highlighted && (
        <div style={{
          position: "absolute", top: 0, right: 0,
          background: "var(--gold)", color: "var(--white)",
          fontFamily: "var(--font-poppins),sans-serif",
          fontSize: 10, fontWeight: 700, letterSpacing: 1,
          textTransform: "uppercase", padding: "5px 14px",
        }}>
          Popular
        </div>
      )}

      {/* Image placeholder */}
      <div style={{
        width: "100%", height: 200,
        background: "var(--light)",
        display: "flex", alignItems: "center", justifyContent: "center",
        borderBottom: "1px solid var(--border)",
        overflow: "hidden", position: "relative",
      }}>
        {image ? (
          <Image src={image} alt={title} fill style={{ objectFit: "cover" }} />
        ) : (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>🏢</div>
            <p style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, color: "var(--muted)", letterSpacing: 1, textTransform: "uppercase" }}>
              {size}
            </p>
          </div>
        )}
      </div>

      {/* Header */}
      <div style={{
        background: highlighted ? "var(--gold)" : "var(--navy)",
        padding: "16px 24px",
      }}>
        <h3 style={{
          fontFamily: "var(--font-poppins),sans-serif",
          fontSize: 16, fontWeight: 700,
          color: "var(--white)", marginBottom: 4,
        }}>
          {title}
        </h3>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ fontSize: 13, color: highlighted ? "rgba(255,255,255,.85)" : "var(--gold)", fontWeight: 600 }}>{size}</span>
          <span style={{ color: highlighted ? "rgba(255,255,255,.5)" : "rgba(255,255,255,.3)", fontSize: 12 }}>·</span>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,.7)" }}>{sqm}</span>
        </div>
      </div>

      {/* Inclusions */}
      <div style={{ padding: "24px" }}>
        <p style={{
          fontFamily: "var(--font-poppins),sans-serif",
          fontSize: 11, fontWeight: 700, letterSpacing: 1,
          textTransform: "uppercase", color: "var(--muted)",
          marginBottom: 14,
        }}>
          Includes
        </p>
        <ul style={{ listStyle: "none", padding: 0, marginBottom: 24 }}>
          {includes.map((item) => (
            <li key={item} style={{
              display: "flex", alignItems: "flex-start", gap: 10,
              padding: "6px 0", borderBottom: "1px solid var(--border)",
              fontSize: 13.5, color: "var(--text)",
            }}>
              <Check size={15} color="var(--gold)" style={{ flexShrink: 0, marginTop: 2 }} />
              {item}
            </li>
          ))}
        </ul>

        <div style={{
          padding: "12px 16px",
          background: highlighted ? "rgba(201,151,43,.08)" : "var(--light)",
          border: `1px solid ${highlighted ? "var(--gold)" : "var(--border)"}`,
          marginBottom: 20,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span style={{ fontSize: 12, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 1, fontFamily: "var(--font-poppins),sans-serif", fontWeight: 700 }}>
            Price
          </span>
          <span style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 18, fontWeight: 800, color: "var(--navy)" }}>
            {price ?? "On request"}
          </span>
        </div>

        <Link
          href="/registration?interest=exhibition"
          style={{
            display: "block", textAlign: "center",
            padding: "12px 24px",
            fontFamily: "var(--font-poppins),sans-serif",
            fontSize: 13, fontWeight: 700, letterSpacing: 1,
            textTransform: "uppercase", borderRadius: 2,
            background: highlighted ? "var(--gold)" : "var(--navy)",
            color: "var(--white)", textDecoration: "none",
          }}
        >
          {ctaLabel}
        </Link>
      </div>
    </div>
  );
}
