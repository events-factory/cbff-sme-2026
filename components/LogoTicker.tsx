import Image from "next/image";

const logos = [
  { code: "RDB",       name: "Rwanda Dev. Board",      img: "/logos/rdb.png" },
  { code: "BNR",       name: "National Bank of Rwanda", img: "/logos/bnr.png" },
  { code: "BOK",       name: "Bank of Kigali",          img: "/logos/bok.png" },
  { code: "I&M",       name: "I&M Bank",                img: "/logos/imbank.png" },
  { code: "BOA",       name: "Bank of Africa",          img: "/logos/boa.png" },
  { code: "SMART",     name: "Smart Africa",            img: "/logos/smart-africa.png" },
  { code: "MINECOFIN", name: "Ministry of Finance",     img: "/logos/minecofin.svg" },
  { code: "MINICOM",   name: "Ministry of Trade",       img: "/logos/minicom.svg" },
  { code: "FAGACE",    name: "FAGACE",                  img: "/logos/fagace.png" },
  { code: "BRD",       name: "BRD Rwanda",              img: "/logos/brd.svg" },
  { code: "WTIA",      name: "World Trade IA",          img: null },
];

const doubled = [...logos, ...logos];

export default function LogoTicker() {
  return (
    <div style={{
      overflow: "hidden", position: "relative",
      padding: "32px 0", marginTop: 40,
      borderTop: "1px solid var(--border)",
      borderBottom: "1px solid var(--border)",
    }}>
      <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 80, background: "linear-gradient(to right, var(--light), transparent)", zIndex: 2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: 80, background: "linear-gradient(to left, var(--light), transparent)", zIndex: 2, pointerEvents: "none" }} />

      <div className="animate-ticker" style={{ display: "flex", width: "max-content" }}>
        {doubled.map((l, i) => (
          <div
            key={i}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              justifyContent: "center", gap: 8,
              padding: "0 36px", minWidth: 160,
              borderRight: "1px solid var(--border)",
            }}
          >
            <div style={{
              width: 110, height: 52, background: "var(--white)",
              border: "1px solid var(--border)", display: "flex",
              alignItems: "center", justifyContent: "center",
              padding: "6px 10px",
            }}>
              {l.img ? (
                <Image
                  src={l.img}
                  alt={l.name}
                  width={90}
                  height={40}
                  style={{ objectFit: "contain", maxWidth: "100%", maxHeight: "100%" }}
                />
              ) : (
                <span style={{
                  fontFamily: "var(--font-poppins),sans-serif", fontSize: 11,
                  fontWeight: 700, color: "var(--navy)", letterSpacing: ".5px",
                }}>
                  {l.code}
                </span>
              )}
            </div>
            <span style={{ fontSize: 11, color: "var(--muted)", textAlign: "center", fontFamily: "var(--font-poppins),sans-serif", fontWeight: 500, whiteSpace: "nowrap" }}>
              {l.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
