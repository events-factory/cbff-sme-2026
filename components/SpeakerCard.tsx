import Image from "next/image";

interface SpeakerCardProps {
  name: string;
  title: string;
  organisation: string;
  country: string;
  photo?: string;
  topic?: string;
}

export default function SpeakerCard({ name, title, organisation, country, photo, topic }: SpeakerCardProps) {
  return (
    <div style={{
      background: "var(--white)",
      border: "1px solid var(--border)",
      borderTop: "3px solid var(--gold)",
      overflow: "hidden",
    }}>
      {/* Photo area */}
      <div style={{
        width: "100%",
        aspectRatio: "1",
        background: "var(--light)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
      }}>
        {photo ? (
          <Image
            src={photo}
            alt={name}
            fill
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
          }}>
            <div style={{
              width: 72, height: 72, borderRadius: "50%",
              background: "var(--border)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontSize: 32, color: "var(--muted)" }}>👤</span>
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: "18px 20px" }}>
        <h3 style={{
          fontFamily: "var(--font-poppins),sans-serif",
          fontSize: 15, fontWeight: 700, color: "var(--navy)",
          marginBottom: 4, lineHeight: 1.3,
        }}>
          {name}
        </h3>
        <p style={{ fontSize: 12.5, color: "var(--gold)", fontWeight: 600, marginBottom: 2 }}>{title}</p>
        <p style={{ fontSize: 12.5, color: "var(--muted)", marginBottom: 8 }}>{organisation}</p>
        <p style={{ fontSize: 12, color: "var(--muted)" }}>{country}</p>
        {topic && (
          <div style={{
            marginTop: 12, padding: "6px 10px",
            border: "1px solid var(--gold)",
            fontSize: 11, color: "var(--gold)",
            fontFamily: "var(--font-poppins),sans-serif",
            fontWeight: 600, letterSpacing: .5,
          }}>
            {topic}
          </div>
        )}
      </div>
    </div>
  );
}
