"use client";
import { useEffect, useState } from "react";

const TARGET = new Date("2026-08-09T08:30:00").getTime();

function calc() {
  const diff = TARGET - Date.now();
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  };
}

function pad(n: number) { return String(n).padStart(2, "0"); }

export default function CountdownTimer() {
  const [t, setT] = useState(calc());

  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { num: pad(t.d), lbl: "Days" },
    { num: pad(t.h), lbl: "Hours" },
    { num: pad(t.m), lbl: "Minutes" },
    { num: pad(t.s), lbl: "Seconds" },
  ];

  return (
    <div style={{
      background: "rgba(0,0,0,.3)", borderTop: "1px solid rgba(201,151,43,.25)",
      padding: "20px 24px",
    }}>
      <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: 40, flexWrap: "wrap" }}>
        <span style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--gold)" }}>
          Starts in
        </span>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          {units.map((u, i) => (
            <div key={u.lbl} style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-poppins),sans-serif", fontSize: 30, fontWeight: 800, color: "var(--white)", lineHeight: 1 }}>
                  {u.num}
                </div>
                <div style={{ fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(255,255,255,.5)", marginTop: 4 }}>
                  {u.lbl}
                </div>
              </div>
              {i < 3 && <span style={{ fontSize: 24, color: "var(--gold)", alignSelf: "flex-start", paddingTop: 2 }}>:</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
