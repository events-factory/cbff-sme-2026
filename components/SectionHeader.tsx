interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  lead?: string;
  dark?: boolean;
  center?: boolean;
}

export default function SectionHeader({ eyebrow, title, lead, dark, center }: SectionHeaderProps) {
  return (
    <div style={{ marginBottom: lead ? 0 : 40, textAlign: center ? "center" : "left" }}>
      <p style={{
        fontFamily: "var(--font-poppins),sans-serif",
        fontSize: 13, letterSpacing: 3, textTransform: "uppercase",
        color: "var(--gold)", fontWeight: 700, marginBottom: 10,
      }}>
        {eyebrow}
      </p>
      <h2 style={{
        fontFamily: "var(--font-poppins),sans-serif",
        fontSize: "clamp(22px,3vw,32px)", fontWeight: 700,
        color: dark ? "var(--white)" : "var(--navy)", marginBottom: 18,
      }}>
        {title}
      </h2>
      <div style={{
        width: 60, height: 3, background: "var(--gold)",
        margin: center ? "0 auto 28px" : "0 0 28px",
      }} />
      {lead && (
        <p style={{
          fontSize: 16, color: dark ? "rgba(255,255,255,.75)" : "var(--muted)",
          maxWidth: 700, marginBottom: 48, lineHeight: 1.8,
        }}>
          {lead}
        </p>
      )}
    </div>
  );
}
