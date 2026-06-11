import { Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { C } from "@/data/products";
import { useLang } from "./LanguageContext";
import { LANGS, type Lang } from "./translations";

/* Compact language dropdown — sits at the right edge of the logo bar.
 * Trigger shows a globe + the active language's short label; the menu lists
 * each language by its native name. Closes on outside click or Escape. */
export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = LANGS.find(l => l.code === lang) ?? LANGS[0];

  const choose = (code: Lang) => { setLang(code); setOpen(false); };

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        type="button"
        aria-label="Select language"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        style={{
          display: "flex", alignItems: "center", gap: "0.4rem",
          fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", fontWeight: 500,
          color: C.ink, background: "none", border: `1px solid ${C.border}`,
          borderRadius: "999px", padding: "0.34rem 0.7rem", cursor: "pointer",
          lineHeight: 1, transition: "border-color 0.18s ease, color 0.18s ease",
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.color = C.gold; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.ink; }}
      >
        <Globe size={14} strokeWidth={1.6} />
        <span>{current.short}</span>
        <span style={{ fontSize: "0.6rem", opacity: 0.6 }}>▾</span>
      </button>

      {open && (
        <ul
          role="listbox"
          style={{
            position: "absolute", top: "calc(100% + 8px)", right: 0,
            minWidth: "148px", margin: 0, padding: "0.35rem",
            listStyle: "none", background: C.white,
            border: `1px solid ${C.borderL}`, borderRadius: "10px",
            boxShadow: "0 10px 30px rgba(19,38,46,0.14)", zIndex: 60,
          }}
        >
          {LANGS.map(l => {
            const active = l.code === lang;
            return (
              <li key={l.code} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => choose(l.code)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    width: "100%", gap: "0.75rem",
                    fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem",
                    fontWeight: active ? 700 : 400,
                    color: active ? C.gold : C.ink,
                    background: active ? "rgba(168,144,90,0.08)" : "transparent",
                    border: "none", borderRadius: "7px",
                    padding: "0.5rem 0.65rem", cursor: "pointer", textAlign: "left",
                    transition: "background 0.15s ease",
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.background = "rgba(19,38,46,0.05)"; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
                >
                  <span>{l.label}</span>
                  {active && <span style={{ fontSize: "0.7rem" }}>✓</span>}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
