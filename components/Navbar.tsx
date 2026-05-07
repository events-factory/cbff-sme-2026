"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";
import { t } from "@/locales/translations";

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const T = t[lang].nav;

  const links = [
    { href: "/about",          label: T.about },
    { href: "/speakers",       label: T.speakers },
    { href: "/program",        label: T.program },
    { href: "/destination",    label: T.destination },
    { href: "/accommodation",  label: T.accommodation },
    { href: "/sponsors",       label: T.sponsor },
    { href: "/exhibition",     label: T.exhibition },
  ];

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: "rgba(15,37,64,.96)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(201,151,43,.2)",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,.4)" : "none",
        transition: "box-shadow .3s",
      }}
    >
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          {/* Brand */}
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <Image src="/CBFF_logo_gold.png" alt="CBFF-SME" width={120} height={60} style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }} />
          </Link>

          {/* Desktop links */}
          <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  fontFamily: "var(--font-poppins), sans-serif",
                  fontSize: 11.5, fontWeight: 600, letterSpacing: 1,
                  textTransform: "uppercase",
                  color: pathname === l.href ? "var(--gold2)" : "rgba(255,255,255,.8)",
                  padding: "8px 12px", borderRadius: 2,
                  transition: "color .2s", textDecoration: "none",
                  borderBottom: pathname === l.href ? "2px solid var(--gold)" : "2px solid transparent",
                }}
              >
                {l.label}
              </Link>
            ))}

            <Link
              href="/registration"
              style={{
                fontFamily: "var(--font-poppins), sans-serif",
                fontSize: 11.5, fontWeight: 700, letterSpacing: 1,
                textTransform: "uppercase",
                background: "var(--gold)", color: "var(--white)",
                padding: "9px 20px", borderRadius: 2,
                textDecoration: "none", marginLeft: 8,
                transition: "background .2s",
              }}
            >
              {T.register}
            </Link>

            {/* Language toggle */}
            <div style={{ display: "flex", alignItems: "center", marginLeft: 12, border: "1px solid rgba(201,151,43,.4)", borderRadius: 2, overflow: "hidden" }}>
              {(["en", "fr"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  style={{
                    fontFamily: "var(--font-poppins), sans-serif",
                    fontSize: 11, fontWeight: 700, letterSpacing: 1,
                    textTransform: "uppercase", padding: "7px 12px",
                    background: lang === l ? "var(--gold)" : "transparent",
                    color: lang === l ? "var(--white)" : "rgba(255,255,255,.6)",
                    border: "none", cursor: "pointer", transition: "all .2s",
                  }}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            style={{
              display: "none", flexDirection: "column", gap: 5,
              background: "none", border: "none", cursor: "pointer", padding: 4,
            }}
            className="nav-toggle"
            aria-label="Toggle menu"
          >
            {[0,1,2].map((i) => (
              <span key={i} style={{ display: "block", width: 24, height: 2, background: "var(--white)" }} />
            ))}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div style={{
            background: "var(--navy2)", borderBottom: "2px solid var(--gold)",
            padding: "16px 0",
          }}>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  display: "block", padding: "12px 24px",
                  fontFamily: "var(--font-poppins), sans-serif",
                  fontSize: 12, fontWeight: 600, letterSpacing: 1,
                  textTransform: "uppercase",
                  color: pathname === l.href ? "var(--gold2)" : "rgba(255,255,255,.8)",
                  textDecoration: "none",
                }}
              >
                {l.label}
              </Link>
            ))}

            <Link
              href="/registration"
              onClick={() => setOpen(false)}
              style={{
                display: "block", padding: "12px 24px",
                fontFamily: "var(--font-poppins), sans-serif",
                fontSize: 12, fontWeight: 600, letterSpacing: 1,
                textTransform: "uppercase",
                color: "var(--gold)", textDecoration: "none",
              }}
            >
              {T.register}
            </Link>

            {/* Mobile language toggle */}
            <div style={{ display: "flex", padding: "12px 24px", gap: 8 }}>
              {(["en", "fr"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  style={{
                    fontFamily: "var(--font-poppins), sans-serif",
                    fontSize: 11, fontWeight: 700, letterSpacing: 1,
                    textTransform: "uppercase", padding: "6px 16px",
                    background: lang === l ? "var(--gold)" : "transparent",
                    color: lang === l ? "var(--white)" : "rgba(255,255,255,.6)",
                    border: "1px solid rgba(201,151,43,.4)", cursor: "pointer",
                    borderRadius: 2,
                  }}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-toggle  { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
