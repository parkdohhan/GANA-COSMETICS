/*
 * GANA Cosmetic — "Clinical Luxury" layout
 * Inspired by: Lumivion Laboratories reference
 * Structure:
 *   1. Navbar — white bg, gold CTA
 *   2. Hero — split: text left / full-bleed lab photo right
 *   3. Feature strip — 4 cards (icon + title + text + photo)
 *   4. Stats bar — horizontal divider
 *   5. Products — clean grid with filter
 *   6. Science — dark section
 *   7. Certifications — white with gold top-border cards
 *   8. About — split layout
 *   9. Contact — form
 *  10. Footer
 */

import { Award, Globe, Leaf, Microscope, ShieldCheck, FlaskConical } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { C, PRODUCTS, PROD_DMP } from "@/data/products";

/* ── Assets — local files in client/public/images ────────────────────────── */
const FT_PURE     = "/images/feature-pure.webp";
const FT_TESTED   = "/images/feature-tested.webp";
const FT_CELLS    = "/images/feature-cells.webp";
const FT_CLEAN    = "/images/feature-clean.webp";
const ABOUT_LAB   = "/images/about-lab.webp";

/* ── SVG Icons ───────────────────────────────────────────────────────────── */
const IconFlask = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 3h6M9 3v7l-4 8a1 1 0 0 0 .9 1.5h12.2A1 1 0 0 0 19 18l-4-8V3"/>
    <path d="M6.5 15h11"/>
  </svg>
);
const IconShield = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);
const IconCell = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <circle cx="12" cy="4" r="1.5"/>
    <circle cx="12" cy="20" r="1.5"/>
    <circle cx="4" cy="12" r="1.5"/>
    <circle cx="20" cy="12" r="1.5"/>
    <circle cx="6.3" cy="6.3" r="1.5"/>
    <circle cx="17.7" cy="17.7" r="1.5"/>
    <circle cx="17.7" cy="6.3" r="1.5"/>
    <circle cx="6.3" cy="17.7" r="1.5"/>
  </svg>
);
const IconLeaf = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
  </svg>
);

/* ── Data ────────────────────────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: <IconFlask />,
    title: "Clinical-Grade Actives",
    text: "High-purity PDRN, PLLA, HA, and peptides at verified concentrations. No unnecessary additives.",
    img: FT_PURE,
  },
  {
    icon: <IconShield />,
    title: "Clinically Tested",
    text: "FDA registered and EU CPNP compliant. Tested for efficacy and safety in professional aesthetic settings.",
    img: FT_TESTED,
  },
  {
    icon: <IconCell />,
    title: "Cellular Regeneration",
    text: "PDRN and Sodium DNA formulations that support DNA repair, cellular turnover, and microbiome balance.",
    img: FT_CELLS,
  },
  {
    icon: <IconLeaf />,
    title: "Clean Formulation",
    text: "Full INCI disclosure on every product. No hidden blends. Transparent ingredient sourcing.",
    img: FT_CLEAN,
  },
];

const STATS = [
  { icon: <Microscope size={20} color={C.gold} strokeWidth={1.5} />, label: "Developed with\nDermatologists" },
  { icon: <ShieldCheck size={20} color={C.gold} strokeWidth={1.5} />, label: "Clinically\nProven" },
  { icon: "97%", label: "Showed improvement\nin skin quality*", big: true },
  { icon: <Leaf size={20} color={C.gold} strokeWidth={1.5} />, label: "Clean &\nConscious" },
  { icon: <Award size={20} color={C.gold} strokeWidth={1.5} />, label: "GMP & ISO 13485\nCertified" },
];

/* PRODUCTS data is imported from @/data/products (shared with ProductDetail) */

const CERTS = [
  { code:"FDA", title:"FDA Registration", icon:<ShieldCheck size={28} color={C.gold} strokeWidth={1.5} />,
    body:"GANA TOX registered under U.S. FDA cosmetic product notification." },
  { code:"EU CPNP", title:"EU CPNP Compliant", icon:<Globe size={28} color={C.gold} strokeWidth={1.5} />,
    body:"Selected products notified under EU Cosmetic Products Notification Portal." },
  { code:"GMP", title:"GMP Certified", icon:<FlaskConical size={28} color={C.gold} strokeWidth={1.5} />,
    body:"Manufacturing facility operates under Good Manufacturing Practice standards." },
  { code:"ISO 13485", title:"ISO 13485", icon:<Award size={28} color={C.gold} strokeWidth={1.5} />,
    body:"Quality management system certified for medical device design and production." },
];

/* ── Intersection hooks ──────────────────────────────────────────────────── */

// 섹션 내 .fade-up 자식 요소들을 일괄 트리거
function useFadeUp() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.querySelectorAll(".fade-up").forEach(c => c.classList.add("visible"));
          obs.unobserve(el);
        }
      },
      { threshold: 0.07, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// 섹션 자체를 fade-in (섹션 전체 opacity 트랜지션)
function useSectionReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // 초기 상태 설정
    el.style.opacity = "0";
    el.style.transform = "translateY(32px)";
    el.style.transition = "opacity 0.75s cubic-bezier(0.23,1,0.32,1), transform 0.75s cubic-bezier(0.23,1,0.32,1)";
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          // 섹션 내 .fade-up 자식도 함께 트리거
          el.querySelectorAll(".fade-up").forEach(c => c.classList.add("visible"));
          obs.unobserve(el);
        }
      },
      { threshold: 0.06, rootMargin: "0px 0px -30px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref as React.RefObject<HTMLElement>;
}

/* ── Navbar ──────────────────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.88)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderBottom: `1px solid ${C.borderL}`,
        boxShadow: scrolled ? "0 2px 16px rgba(20,24,30,0.06)" : "none",
      }}>
      <div className="container">
        {/* Top row — logo (center) + contact (right) */}
        <div className="grid grid-cols-3 items-center"
          style={{ height: scrolled ? "60px" : "72px", transition: "height 0.3s ease" }}>

          {/* Left spacer */}
          <div></div>

          {/* Logo — centered */}
          <a href="#" className="select-none flex items-center gap-3 justify-self-center">
            {/* Hexagon logo mark — script G */}
            <svg width="44" height="44" viewBox="0 0 36 36" fill="none">
              {/* Outer hexagon */}
              <path d="M18 2.5 L31 9.75 L31 26.25 L18 33.5 L5 26.25 L5 9.75 Z"
                stroke={C.gold} strokeWidth="1.25" fill="none"/>
              {/* Inner hex fill */}
              <path d="M18 8 L25 12 L25 20 L18 24 L11 20 L11 12 Z"
                fill={C.gold} opacity="0.08"/>
              {/* Script G — drawn as SVG path for italic/cursive feel */}
              <text
                x="18" y="22"
                textAnchor="middle"
                fill={C.gold}
                fontSize="14"
                fontFamily="'Playfair Display', 'Cormorant Garamond', serif"
                fontWeight="700"
                fontStyle="italic"
              >G</text>
            </svg>
            <div className="flex flex-col leading-none gap-1">
              <span style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"1.625rem", color:C.ink, letterSpacing:"0.06em" }}>GANA</span>
              <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.7rem", fontWeight:600, letterSpacing:"0.3em", textTransform:"uppercase", color:C.gold }}>Cosmetic</span>
            </div>
          </a>

          {/* Right slot — empty on desktop (contact moved to category row), hamburger on mobile */}
          <div className="hidden lg:block"></div>

          {/* Mobile hamburger */}
          <button className="lg:hidden p-2 flex flex-col gap-1.5 justify-self-end" onClick={() => setOpen(!open)} aria-label="Menu">
            {[0,1,2].map(i => (
              <span key={i} className="block w-5 h-px transition-all duration-300"
                style={{
                  background: C.ink,
                  transform: open ? (i===0?"rotate(45deg) translateY(8px)":i===2?"rotate(-45deg) translateY(-8px)":"none") : "none",
                  opacity: open && i===1 ? 0 : 1,
                }}/>
            ))}
          </button>
        </div>

        {/* Bottom row — categories (center) + Contact Us (right). Desktop only */}
        <div className="hidden lg:grid grid-cols-3 items-center"
          style={{
            paddingTop: scrolled ? "0.625rem" : "1rem",
            paddingBottom: scrolled ? "0.75rem" : "1.125rem",
            borderTop: `1px solid ${C.borderL}`,
            transition: "padding 0.3s ease",
          }}>
          {/* Left spacer */}
          <div></div>

          {/* Categories — centered */}
          <div className="flex items-center justify-center" style={{ gap: "5.5rem" }}>
            {[["Products","#products"],["Science","#science"],["Certifications","#certifications"],["About","#about"]].map(([l,h]) => (
              <a key={l} href={h} className="nav-link"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.1875rem",
                  fontWeight: 600,
                  letterSpacing: "0.03em",
                  textTransform: "none",
                  color: C.ink,
                }}>{l}</a>
            ))}
          </div>

          {/* Contact Us — right */}
          <div className="justify-self-end">
            <a href="#contact" className="btn-gold"
              style={{
                padding: "0.5rem 1.125rem",
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
                gap: "0.35rem",
              }}>Contact Us →</a>
          </div>
        </div>
      </div>

      {open && (
        <div style={{ background: C.white, borderTop: `1px solid ${C.borderL}` }}>
          <div className="container py-6 flex flex-col gap-5">
            {["Products","Science","Certifications","About","Contact"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="nav-link" onClick={() => setOpen(false)}>{item}</a>
            ))}
            <a href="#contact" className="btn-gold text-center mt-2">Contact Us →</a>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ── Scroll backdrop — fixed full-screen brand imagery, crossfades as the
 * marker sections ([data-backdrop]) scroll into view. Solid sections in
 * between simply cover it; transparent bands reveal the current image. ──── */
const BACKDROPS = [
  "/images/brand-cells.jpg",    // 1 — cell macro (catalogue zone, continuity with hero)
  "/images/brand-serum.jpg",    // 2 — serum dropper
  "/images/brand-pipette.jpg",  // 3 — pipette bubbles
];

function ScrollBackdrop() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const els = document.querySelectorAll("[data-backdrop]");
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.backdrop));
        });
      },
      // low threshold: tall sections (product grid) never reach high visibility ratios
      { threshold: 0.12 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
      {BACKDROPS.map((src, i) => (
        <div key={src} className="absolute inset-0" style={{
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: active === i ? 1 : 0,
          transition: "opacity 1s ease",
        }}/>
      ))}
      {/* constant light veil — keeps the page bright and text readable */}
      <div className="absolute inset-0" style={{ background: "rgba(245,248,250,0.45)" }}/>
    </div>
  );
}

/* ── Hero — looping video backdrop (not part of the crossfade) ────────────── */
function Hero() {
  const vidRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (vidRef.current) vidRef.current.playbackRate = 0.5;
  }, []);
  return (
    <header className="relative flex items-center overflow-hidden"
      style={{ minHeight: "100vh", background: C.off }}>
      {/* mirrored so the video's empty area sits behind the left-side copy;
          no loop — playback ends frozen on the final frame */}
      <video ref={vidRef} autoPlay muted playsInline
        src="/images/hero-seq.mp4"
        poster="/images/brand-cells.jpg"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: "scaleX(-1)" }}/>
      {/* left gradient for headline legibility — scrolls away with the hero */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(100deg, rgba(245,248,250,0.9) 0%, rgba(245,248,250,0.5) 45%, rgba(245,248,250,0) 100%)",
      }}/>
      {/* full-width wrapper (no centered container) hugs the copy to the left edge,
          into the calmer area of the mirrored video */}
      <div className="relative z-10 w-full pl-6 md:pl-12 lg:pl-20 pr-6 pt-[120px] pb-[18vh] lg:pt-[140px]">
        <p className="eyebrow mb-6">Cosmeceutical Solutions for Professionals</p>
        <h1 style={{
          fontFamily: "'Playfair Display', serif", fontWeight: 700,
          fontSize: "clamp(2.75rem, 6vw, 4.5rem)", color: C.ink,
          lineHeight: 1.08, marginBottom: "1.5rem", maxWidth: "820px",
        }}>
          Clinical Beauty,<br/>
          <em style={{ fontStyle: "italic", color: C.gold }}>Refined by Science</em>
        </h1>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: "1rem",
          color: C.ink70, lineHeight: 1.75, maxWidth: "520px", marginBottom: "2.25rem",
        }}>
          Precision cosmeceutical formulas powered by clinical research and clean
          actives — PDRN, PLLA, HA — to visibly transform skin health for
          distributors and aesthetic clinics worldwide.
        </p>
        <div className="flex flex-wrap gap-3 mb-10">
          <a href="#products" className="btn-gold">Discover Our Science →</a>
          <a href="#contact" className="btn-outline-gold">B2B Inquiry</a>
        </div>
        <div className="flex flex-wrap gap-5">
          {["FDA Registered", "EU CPNP Compliant", "GMP Certified"].map(b => (
            <div key={b} className="flex items-center gap-1.5">
              <span style={{ color: C.gold, fontSize: "0.75rem" }}>✓</span>
              <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.72rem", fontWeight:500,
                color:C.ink70, letterSpacing:"0.04em" }}>{b}</span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

/* ── Serum band — transparent over backdrop #2 (serum dropper) ───────────── */
function SerumBand() {
  return (
    <section data-backdrop="1" className="relative flex items-center" style={{ minHeight: "60vh" }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(95deg, rgba(245,248,250,0.85) 0%, rgba(245,248,250,0.35) 55%, rgba(245,248,250,0) 100%)",
      }}/>
      <div className="container relative z-10 py-24">
        <p className="eyebrow mb-5">Formulation Philosophy</p>
        <h2 style={{
          fontFamily:"'Playfair Display',serif", fontWeight:700,
          fontSize:"clamp(1.9rem,3.8vw,2.9rem)", color:C.ink, lineHeight:1.12, marginBottom:"1.25rem",
        }}>
          Pure actives.<br/>
          <em style={{ fontStyle:"italic", color:C.gold }}>Visible results.</em>
        </h2>
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.95rem",
          color:C.ink70, lineHeight:1.75, maxWidth:"460px" }}>
          Every GANA formula discloses exact active concentrations —
          no proprietary blends, no hidden fillers.
        </p>
      </div>
    </section>
  );
}

/* ── CTA band — transparent over backdrop #3 (pipette bubbles) ───────────── */
function CtaBand() {
  return (
    <section data-backdrop="2" className="relative flex items-center" style={{ minHeight: "55vh" }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(95deg, rgba(245,248,250,0.8) 0%, rgba(245,248,250,0.3) 55%, rgba(245,248,250,0) 100%)",
      }}/>
      <div className="container relative z-10 py-24">
        <p className="eyebrow mb-5">From Seoul to Your Clinic</p>
        <h2 style={{
          fontFamily:"'Playfair Display',serif", fontWeight:700,
          fontSize:"clamp(1.9rem,3.8vw,2.9rem)", color:C.ink, lineHeight:1.12, marginBottom:"1.75rem",
        }}>
          Global B2B supply,<br/>
          <em style={{ fontStyle:"italic", color:C.gold }}>direct from the manufacturer.</em>
        </h2>
        <a href="#contact" className="btn-gold">Start a Conversation →</a>
      </div>
    </section>
  );
}

/* ── Feature Strip ───────────────────────────────────────────────────────── */
function FeatureStrip() {
  const ref = useSectionReveal();
  return (
    <section style={{ background: "rgba(255,255,255,0.72)", borderTop: `1px solid ${C.borderL}` }} ref={ref}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f, i) => (
          <div key={f.title}
            className={`feature-card fade-up d${i + 1}`}
            style={{ borderRadius: 0, borderTop: "none", borderBottom: "none",
              borderLeft: i === 0 ? "none" : `1px solid ${C.borderL}`,
              borderRight: "none" }}>
            {/* Photo */}
            <div className="overflow-hidden" style={{ height: "160px" }}>
              <img src={f.img} alt={f.title} className="card-img w-full h-full object-cover"/>
            </div>
            {/* Text */}
            <div className="p-6">
              <div className="mb-3">{f.icon}</div>
              <h3 style={{
                fontFamily:"'DM Sans',sans-serif", fontWeight:700,
                fontSize:"0.875rem", color:C.ink,
                letterSpacing:"0.05em", textTransform:"uppercase",
                marginBottom:"0.5rem",
              }}>{f.title}</h3>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.8125rem", color:C.ink70, lineHeight:1.65 }}>{f.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Stats Bar ───────────────────────────────────────────────────────────── */
function StatsBar() {
  const ref = useSectionReveal();
  return (
    <section ref={ref} style={{ background: "rgba(245,248,250,0.7)", borderTop: `1px solid ${C.borderL}`, borderBottom: `1px solid ${C.borderL}` }}>
      <div className="container py-5">
        <div className="flex flex-wrap justify-center items-center gap-0">
          {STATS.map((s, i) => (
            <div key={i} className="stat-item py-3 flex-1 min-w-[140px] justify-center"
              style={{ borderRight: i < STATS.length - 1 ? `1px solid ${C.borderL}` : "none" }}>
              {s.big ? (
                <div>
                  <span style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"2rem", color:C.gold }}>{s.icon}</span>
                  <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.7rem", color:C.ink70, lineHeight:1.4, whiteSpace:"pre-line", marginTop:"2px" }}>{s.label}</p>
                </div>
              ) : (
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center">{s.icon}</span>
                  <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.7rem", fontWeight:600, color:C.ink, lineHeight:1.4, whiteSpace:"pre-line" }}>{s.label}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <p style={{ textAlign:"center", fontFamily:"'DM Sans',sans-serif", fontSize:"0.6rem", color:C.ink45, marginTop:"0.5rem" }}>
          *Based on a 4-week clinical study with professional aesthetic practitioners.
        </p>
      </div>
    </section>
  );
}

/* ── Products ────────────────────────────────────────────────────────────── */
function ProductsSection() {
  const ref = useSectionReveal();
  const [filter, setFilter] = useState("All");
  const filters = ["All","Skin Booster","Meso Solution","Chemical Peel","Topical","Intimate Care"];
  const list = filter === "All" ? PRODUCTS : PRODUCTS.filter(p => p.cat === filter);

  return (
    <section id="products" data-backdrop="0" style={{ background: C.white, borderTop: `1px solid ${C.borderL}` }} className="py-12 md:py-16" ref={ref}>
      {/* full-bleed wrapper — the grid spans the whole viewport width */}
      <div className="w-full px-5 md:px-8">
        {/* parent category label */}
        <p className="fade-up d1" style={{
          fontFamily:"'DM Sans',sans-serif", fontSize:"0.8rem", fontWeight:700, color:C.ink,
          textDecoration:"underline", textUnderlineOffset:"5px", marginBottom:"1.1rem",
        }}>Cosmeceuticals</p>

        {/* Category tabs — plain text, active = bold + ink underline (Gucci-style) */}
        <div className="flex flex-wrap gap-x-8 gap-y-3 fade-up d1" style={{ borderBottom:`1px solid ${C.borderL}` }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              fontFamily:"'DM Sans',sans-serif", fontSize:"0.8125rem",
              fontWeight: filter===f ? 700 : 400,
              color: C.ink, background:"none", border:"none", cursor:"pointer",
              padding:"0 0 0.8rem 0", marginBottom:"-1px",
              borderBottom: filter===f ? `2px solid ${C.ink}` : "2px solid transparent",
              transition:"border-color 0.18s ease, font-weight 0.1s ease",
            }}>{f}</button>
          ))}
        </div>

        {/* item count — centered, Gucci-style */}
        <p style={{ textAlign:"center", fontFamily:"'DM Sans',sans-serif", fontSize:"0.78rem",
          color:C.ink45, margin:"1.4rem 0" }}>{list.length} items</p>

        {/* Hairline grid — items float on plain white, name + price only */}
        <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap:"1px", background:C.borderL }}>
          {list.map(p => (
            <Link key={p.id} href={`/products/${p.id}`}
              className="cat-item block"
              style={{ background:C.white, textDecoration:"none", cursor:"pointer" }}>
              <div className="overflow-hidden flex items-center justify-center" style={{ height:"min(28vw, 420px)" }}>
                {p.img
                  ? <img src={p.img} alt={p.name} className="card-img w-full h-full object-contain p-8"/>
                  : <div className="card-img w-full h-full flex items-center justify-center">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={C.border} strokeWidth="1">
                        <path d="M9 3h6M9 3v7l-4 8a1 1 0 0 0 .9 1.5h12.2A1 1 0 0 0 19 18l-4-8V3"/>
                      </svg>
                    </div>
                }
              </div>
              <div className="px-5 pb-7">
                <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.85rem", fontWeight:500,
                  color:C.ink, marginBottom:"0.3rem" }}>{p.name}</p>
                <p style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.75rem", color:C.ink70 }}>
                  USD {p.price}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-14 fade-up d4">
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.875rem", color:C.ink45, marginBottom:"1.25rem" }}>
            Retail prices shown. Dealer &amp; distributor pricing available separately upon inquiry,
            along with full specifications and regulatory documentation.
          </p>
          <a href="#contact" className="btn-gold">Request Full Catalogue →</a>
        </div>
      </div>
    </section>
  );
}

/* ── Science ─────────────────────────────────────────────────────────────── */
function ScienceSection() {
  const ref = useSectionReveal();
  const ACTIVES = [
    { abbr:"PDRN",   full:"Polydeoxyribonucleotide",  role:"DNA repair · cellular regeneration · wound healing" },
    { abbr:"PLLA",   full:"Poly-L-Lactic Acid",        role:"Collagen biostimulation · long-term volumisation" },
    { abbr:"HA",     full:"Hyaluronic Acid",            role:"Deep hydration matrix · tissue scaffolding" },
    { abbr:"GSH",    full:"Glutathione",                role:"Master antioxidant · melanin inhibition · brightening" },
    { abbr:"GHK-Cu", full:"Copper Tripeptide-1",        role:"Wound contraction · angiogenesis · follicle activation" },
  ];

  return (
    <section id="science" className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: "rgba(245,248,250,0.6)" }} ref={ref}>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="eyebrow mb-5 fade-up d1">Key Actives</p>
            <h2 className="fade-up d2" style={{
              fontFamily:"'Playfair Display',serif", fontWeight:700,
              fontSize:"clamp(1.75rem,3.5vw,2.75rem)", color:C.ink,
              lineHeight:1.15, marginBottom:"1.25rem",
            }}>
              Clinical-Grade Ingredients<br/>
              <em style={{ fontStyle:"italic", color:C.gold }}>at Verified Concentrations</em>
            </h2>
            <p className="fade-up d3" style={{
              fontFamily:"'DM Sans',sans-serif", fontSize:"0.9375rem",
              color:C.ink70, lineHeight:1.75, marginBottom:"2.5rem", maxWidth:"460px",
            }}>
              Every GANA formulation discloses exact active concentrations — no proprietary blends,
              no hidden fillers. Clinicians can verify efficacy before recommending to patients.
            </p>

            <div className="fade-up d4">
              {ACTIVES.map((a, i) => (
                <div key={a.abbr} className="flex items-start gap-5 py-4"
                  style={{
                    borderBottom:`1px solid ${C.borderL}`,
                    borderTop: i===0 ? `1px solid ${C.borderL}` : "none",
                  }}>
                  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.75rem",
                    fontWeight:500, color:C.gold, minWidth:"56px", paddingTop:"2px" }}>{a.abbr}</div>
                  <div>
                    <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.8125rem",
                      fontWeight:600, color:C.ink, marginBottom:"0.15rem" }}>{a.full}</div>
                    <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.75rem",
                      color:C.ink45 }}>{a.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative fade-up d2">
            <img src={PROD_DMP} alt="GANA DMP+" className="w-full object-contain" style={{ maxHeight:"440px" }}/>
            <div className="absolute -bottom-4 -left-4 p-5 hidden md:block"
              style={{ background:C.white, border:`1px solid rgba(168,144,90,0.35)`, width:"200px",
                boxShadow:"0 8px 28px rgba(22,34,44,0.10)" }}>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.6rem", color:C.gold,
                letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:"0.5rem" }}>GANA DMP+</div>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.75rem",
                color:C.ink70, lineHeight:1.5 }}>
                PLLA + HA + PDRN + Glutathione<br/>3ml prefilled vial
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Certifications ──────────────────────────────────────────────────────── */
function CertificationsSection() {
  const ref = useSectionReveal();
  return (
    <section id="certifications" className="py-24 md:py-32"
      style={{ background: "rgba(255,255,255,0.72)", borderTop: `1px solid ${C.borderL}` }} ref={ref}>
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <p className="eyebrow mb-4 fade-up d1 justify-center">Regulatory Standing</p>
          <h2 className="fade-up d2" style={{
            fontFamily:"'Playfair Display',serif", fontWeight:700,
            fontSize:"clamp(1.75rem,3.5vw,2.5rem)", color:C.ink,
            lineHeight:1.15, marginBottom:"1rem",
          }}>Certified for Global Distribution</h2>
          <p className="fade-up d3" style={{
            fontFamily:"'DM Sans',sans-serif", fontSize:"0.9375rem", color:C.ink45, lineHeight:1.75,
          }}>
            GANA Cosmetic products meet international regulatory requirements for
            cosmeceutical and medical-aesthetic markets across the US, EU, and Asia-Pacific.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CERTS.map((c, i) => (
            <div key={c.code} className={`cert-card fade-up d${i+2}`}>
              <div style={{ fontSize:"1.75rem", marginBottom:"0.75rem" }}>{c.icon}</div>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.7rem", fontWeight:500,
                letterSpacing:"0.12em", color:C.gold, textTransform:"uppercase", marginBottom:"0.375rem" }}>{c.code}</div>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.9375rem",
                fontWeight:700, color:C.ink, marginBottom:"0.625rem" }}>{c.title}</div>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.8rem", color:C.ink45, lineHeight:1.6 }}>{c.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 p-5 fade-up d5"
          style={{ background:C.off, border:`1px solid ${C.borderL}` }}>
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.8rem", color:C.ink, lineHeight:1.7, opacity:0.7 }}>
            <strong>Regulatory Notice:</strong> REGEN PEEL (TCA 30%) is for licensed medical professionals only.
            GANA KA (Kojic Acid 4%) exceeds EU Cosmetic Regulation 1223/2009 limits — EU distribution requires reformulation.
            Certificates available upon request.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── About ───────────────────────────────────────────────────────────────── */
function AboutSection() {
  const ref = useSectionReveal();
  return (
    <section id="about" className="py-24 md:py-32 overflow-hidden"
      style={{ background: "rgba(245,248,250,0.6)", borderTop: `1px solid ${C.borderL}` }} ref={ref}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative fade-up d1 order-2 lg:order-1">
            <img src={ABOUT_LAB} alt="GANA Cosmetic laboratory"
              className="w-full object-cover" style={{ aspectRatio:"4/3" }}/>
            <div className="absolute -bottom-3 -right-3 w-full h-full pointer-events-none"
              style={{ border:`1px solid ${C.gold}30`, zIndex:-1 }}/>
          </div>

          <div className="order-1 lg:order-2">
            <p className="eyebrow mb-5 fade-up d1">About GANA Cosmetic</p>
            <h2 className="fade-up d2" style={{
              fontFamily:"'Playfair Display',serif", fontWeight:700,
              fontSize:"clamp(1.75rem,3.5vw,2.5rem)", color:C.ink,
              lineHeight:1.15, marginBottom:"1.5rem",
            }}>
              Korean Precision,<br/>
              <em style={{ fontStyle:"italic", color:C.gold }}>Global Distribution</em>
            </h2>
            <p className="fade-up d3" style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.9375rem",
              color:C.ink70, lineHeight:1.75, marginBottom:"1.25rem" }}>
              GANA Cosmetic Co., Ltd. is a Korean cosmeceutical manufacturer operating within
              the GANA Group — alongside GANA R&D (medical devices, dermal fillers) and
              Dr. PARK Co., Ltd. (gene therapy R&D). Our GMP-certified facility in Seongnam-si,
              Gyeonggi-do operates under ISO 13485 quality management.
            </p>
            <p className="fade-up d4" style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.9375rem",
              color:C.ink70, lineHeight:1.75, marginBottom:"2.5rem" }}>
              We partner with distributors, aesthetic clinics, and ODM clients across 30+ countries.
              Every product ships with full INCI disclosure, regulatory documentation, and dedicated export support.
            </p>

            <div className="fade-up d5 space-y-3" style={{ borderTop:`1px solid ${C.borderL}`, paddingTop:"1.5rem" }}>
              {[
                ["Address","555 Dunchon-daero, Jungwon-gu, Seongnam-si, Gyeonggi-do, South Korea"],
                ["Tel","+82-31-732-0242"],
                ["Email","contact@gana-cosmetics.com"],
              ].map(([l,v]) => (
                <div key={l} className="flex gap-4">
                  <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.625rem", color:C.gold,
                    minWidth:"52px", paddingTop:"2px", letterSpacing:"0.08em", textTransform:"uppercase" }}>{l}</span>
                  <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.8125rem", color:C.ink70, lineHeight:1.5 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby5jPT8G_Mtl5b6nuy1Hh07RJA2cqkQBe3SRQqtjbB8bZ_8-kqBx7ZImgEu5AZdaZJH/exec";

function ContactSection() {
  const ref = useSectionReveal();
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [form, setForm] = useState({ name:"", company:"", email:"", phone:"", country:"", type:"", message:"" });
  const set = (k:string) => (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(false);
    try {
      // Apps Script 웹앱은 CORS 응답 헤더를 주지 않으므로 no-cors 로 보낸다.
      // 응답 본문을 읽을 수 없어 성공 여부 확인이 불가 → 네트워크 전송 성공 시 낙관적으로 완료 처리.
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          subject: `[GANA B2B Inquiry] ${form.company || form.name}`,
          name: form.name,
          company: form.company,
          email: form.email,
          phone: form.phone,
          country: form.country,
          inquiry_type: form.type,
          message: form.message,
        }),
      });
      setDone(true);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32"
      style={{ background: "rgba(255,255,255,0.78)", borderTop: `1px solid ${C.borderL}` }} ref={ref}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <p className="eyebrow mb-5 fade-up d1">Get in Touch</p>
            <h2 className="fade-up d2" style={{
              fontFamily:"'Playfair Display',serif", fontWeight:700,
              fontSize:"clamp(1.75rem,3.5vw,2.5rem)", color:C.ink,
              lineHeight:1.15, marginBottom:"1.25rem",
            }}>
              Partner with<br/>
              <em style={{ fontStyle:"italic", color:C.gold }}>GANA Cosmetic</em>
            </h2>
            <p className="fade-up d3" style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.9375rem",
              color:C.ink45, lineHeight:1.75, marginBottom:"2.5rem", maxWidth:"420px" }}>
              Whether you are a distributor seeking exclusive territory rights, a clinic
              looking for reliable supply, or an ODM partner — we respond to every inquiry within 48 hours.
            </p>
            <div className="space-y-3 fade-up d4">
              {["Distributor Partnership","Clinic Supply","ODM / Private Label","General Inquiry"].map(item => (
                <div key={item} className="flex items-center gap-3">
                  <span style={{ color:C.gold, fontSize:"0.5rem" }}>◆</span>
                  <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.875rem", fontWeight:500, color:C.ink }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="fade-up d3">
            {done ? (
              <div className="p-12 text-center" style={{ background:C.off, border:`1px solid ${C.borderL}` }}>
                <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700,
                  fontSize:"2rem", color:C.gold, marginBottom:"1rem" }}>Thank You</div>
                <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.9rem", color:C.ink45 }}>
                  Your inquiry has been received. We will respond within 48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit}
                className="p-8 md:p-10 space-y-6"
                style={{ background:C.off, border:`1px solid ${C.borderL}` }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[["name","Name","text"],["company","Company / Clinic","text"],
                    ["email","Email","email"],["phone","Phone","tel"]].map(([k,l,t]) => (
                    <div key={k}>
                      <label className="form-label">{l} *</label>
                      <input type={t} required className="form-input"
                        value={(form as Record<string,string>)[k]} onChange={set(k)}/>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">Country *</label>
                    <input type="text" required className="form-input" value={form.country} onChange={set("country")}/>
                  </div>
                  <div>
                    <label className="form-label">Inquiry Type *</label>
                    <select required className="form-input appearance-none"
                      value={form.type} onChange={set("type")}
                      style={{ color: form.type ? C.ink : C.border }}>
                      <option value="" disabled>Select type</option>
                      <option value="distributor">Distributor Partnership</option>
                      <option value="clinic">Clinic Supply</option>
                      <option value="odm">ODM / Private Label</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="form-label">Message</label>
                  <textarea rows={4} className="form-input resize-none"
                    value={form.message} onChange={set("message")}
                    placeholder="Describe your business and requirements..."/>
                </div>
                {error && (
                  <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.8125rem", color:"#B23B3B", textAlign:"center" }}>
                    Something went wrong. Please try again or email us directly at contact@gana-cosmetics.com.
                  </p>
                )}
                <button type="submit" disabled={submitting}
                  className="btn-gold w-full justify-center"
                  style={{ opacity: submitting ? 0.6 : 1, cursor: submitting ? "wait" : "pointer" }}>
                  {submitting ? "Sending…" : "Send Inquiry →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Certification badge SVGs (visual approximations of regulatory marks) ── */
const CertFDA = () => (
  <svg width="76" height="64" viewBox="0 0 76 64" aria-label="FDA">
    <rect x="2" y="6" width="72" height="52" rx="3" fill="#1B3A6B"/>
    <text x="38" y="33" textAnchor="middle" fill="#fff"
      fontFamily="'Playfair Display', serif" fontWeight="700" fontSize="20" letterSpacing="2">FDA</text>
    <text x="38" y="44" textAnchor="middle" fill="#fff"
      fontFamily="'DM Sans', sans-serif" fontWeight="600" fontSize="4.5" letterSpacing="0.6">USA · COMPOUND</text>
    <text x="38" y="51" textAnchor="middle" fill="#fff" opacity="0.85"
      fontFamily="'DM Sans', sans-serif" fontSize="3.4" letterSpacing="0.3">Food and Drug Administration</text>
  </svg>
);

const CertGMP = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" aria-label="GMP">
    <circle cx="32" cy="32" r="29" fill="#C9A24E"/>
    <circle cx="32" cy="32" r="29" fill="none" stroke="#8A6F2C" strokeWidth="1"/>
    <circle cx="32" cy="32" r="22" fill="none" stroke="#fff" strokeWidth="0.8" opacity="0.55"/>
    <text x="32" y="38" textAnchor="middle" fill="#fff"
      fontFamily="'Playfair Display', serif" fontWeight="700" fontSize="14" letterSpacing="1.5">GMP</text>
    {/* tiny stars/dots */}
    {[0, 60, 120, 180, 240, 300].map(deg => {
      const rad = (deg * Math.PI) / 180;
      const x = 32 + Math.cos(rad) * 25;
      const y = 32 + Math.sin(rad) * 25;
      return <circle key={deg} cx={x} cy={y} r="0.9" fill="#fff" opacity="0.7"/>;
    })}
  </svg>
);

const CertIGC = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" aria-label="IGC">
    <circle cx="32" cy="32" r="29" fill="#1B7AB3"/>
    {/* Globe meridians */}
    <ellipse cx="32" cy="32" rx="11" ry="22" fill="none" stroke="#fff" strokeWidth="0.9" opacity="0.45"/>
    <ellipse cx="32" cy="32" rx="22" ry="11" fill="none" stroke="#fff" strokeWidth="0.9" opacity="0.45"/>
    <circle cx="32" cy="32" r="22" fill="none" stroke="#fff" strokeWidth="1.1" opacity="0.6"/>
    <rect x="14" y="29" width="36" height="9" fill="#1B7AB3" opacity="0.85"/>
    <text x="32" y="36" textAnchor="middle" fill="#fff"
      fontFamily="'Playfair Display', serif" fontWeight="700" fontSize="11" letterSpacing="1.5">IGC</text>
  </svg>
);

const CertISO = () => (
  <svg width="86" height="64" viewBox="0 0 86 64" aria-label="ISO 13485">
    <rect x="2" y="6" width="82" height="52" rx="2" fill="#fff" stroke="#1C1C1C" strokeWidth="1.5"/>
    <rect x="2" y="6" width="82" height="16" fill="#1C1C1C"/>
    <text x="43" y="17" textAnchor="middle" fill="#fff"
      fontFamily="'DM Sans', sans-serif" fontWeight="700" fontSize="8" letterSpacing="2.5">CERTIFIED</text>
    <text x="43" y="40" textAnchor="middle" fill="#1C1C1C"
      fontFamily="'Playfair Display', serif" fontWeight="700" fontSize="13" letterSpacing="1">ISO 13485</text>
    <line x1="22" y1="48" x2="64" y2="48" stroke="#1C1C1C" strokeWidth="0.6" opacity="0.4"/>
    <text x="43" y="55" textAnchor="middle" fill="#1C1C1C" opacity="0.6"
      fontFamily="'DM Sans', sans-serif" fontSize="4" letterSpacing="1">QUALITY MANAGEMENT</text>
  </svg>
);

const CertAccredited = () => (
  <svg width="68" height="64" viewBox="0 0 68 64" aria-label="Accredited">
    <circle cx="34" cy="32" r="29" fill="#2E7D5F"/>
    <circle cx="34" cy="32" r="24" fill="none" stroke="#fff" strokeWidth="0.9" opacity="0.5"/>
    <text x="34" y="29" textAnchor="middle" fill="#fff"
      fontFamily="'Playfair Display', serif" fontWeight="700" fontSize="7" letterSpacing="1.4">ACCREDITED</text>
    <line x1="20" y1="33" x2="48" y2="33" stroke="#fff" strokeWidth="0.6" opacity="0.4"/>
    <text x="34" y="40" textAnchor="middle" fill="#fff" opacity="0.92"
      fontFamily="'DM Sans', sans-serif" fontWeight="600" fontSize="4.2" letterSpacing="0.7">Recognized</text>
    <text x="34" y="46" textAnchor="middle" fill="#fff" opacity="0.85"
      fontFamily="'DM Sans', sans-serif" fontSize="3.5" letterSpacing="0.3">Quality Mark</text>
  </svg>
);

/* ── GANA Group banner (horizontal) ──────────────────────────────────────── */
function GanaGroupSection() {
  const ref = useSectionReveal();

  const BRANDS = [
    {
      part1: "GANA",  c1: "#2A2A2A",
      part2: "R&D",   c2: "#1B3A6B",
      tag: "Medical Devices",
      desc: "Dermal fillers, mesotherapy devices, and ODM development for medical aesthetics.",
      site: "www.ganarnd.co.kr",
    },
    {
      part1: "GANA",     c1: "#2A2A2A",
      part2: "COSMETIC", c2: "#3FA34D",
      tag: "Cosmeceuticals",
      desc: "Clinical-grade cosmetic formulations distributed to clinics and partners worldwide.",
      site: "",
    },
    {
      part1: "Dr.",  c1: "#2A2A2A",
      part2: "PARK", c2: "#A8905A",
      tag: "Gene Therapy R&D",
      desc: "Advanced gene therapy research and next-generation medical innovation.",
      site: "",
    },
  ];

  const CERT_BADGES = [
    { label: "FDA",        Icon: CertFDA },
    { label: "GMP",        Icon: CertGMP },
    { label: "IGC",        Icon: CertIGC },
    { label: "ISO 13485",  Icon: CertISO },
    { label: "Accredited", Icon: CertAccredited },
  ];

  return (
    // fades the fixed backdrop back to the brand cell photo for the closing zone
    <section ref={ref} data-backdrop="0" className="py-20 md:py-28 relative overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.72)",
        borderTop: `1px solid ${C.borderL}`,
      }}>
      <div className="container relative z-10">
        {/* Top row — heading (left) + certification badges (right) */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-14">
          <div>
            <p className="eyebrow mb-3 fade-up d1">Our Group</p>
            <h2 className="fade-up d2" style={{
              fontFamily:"'Playfair Display',serif", fontWeight:700,
              fontSize:"clamp(1.75rem,3.5vw,2.5rem)", color:C.ink,
              lineHeight:1.15,
            }}>
              The <em style={{ fontStyle:"italic", color:C.gold }}>GANA Group</em>
            </h2>
            <p className="fade-up d3" style={{
              fontFamily:"'DM Sans',sans-serif", fontSize:"0.9rem",
              color:C.ink70, lineHeight:1.7, marginTop:"0.75rem", maxWidth:"420px",
            }}>
              Three companies, one mission — combining cosmeceutical, medical-device,
              and gene-therapy expertise under a single Korean corporate group.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 fade-up d3">
            {CERT_BADGES.map(({ label, Icon }) => (
              <div key={label} title={label} className="flex items-center justify-center">
                <Icon />
              </div>
            ))}
          </div>
        </div>

        {/* 3 brand cards — horizontal row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {BRANDS.map((b, i) => (
            <div key={b.part1 + b.part2} className={`fade-up d${i+2}`}
              style={{
                background: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(10px)",
                border: `1px solid ${C.borderL}`,
                padding: "2.25rem 1.75rem",
                textAlign: "center",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(30,28,26,0.08)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}>
              {/* Logo (two-tone text) */}
              <div style={{ marginBottom: "1rem" }}>
                <span style={{
                  fontFamily:"'Playfair Display',serif", fontWeight:700,
                  fontSize:"1.625rem", color: b.c1, letterSpacing:"0.04em",
                }}>{b.part1} </span>
                <span style={{
                  fontFamily:"'Playfair Display',serif", fontWeight:700,
                  fontSize:"1.625rem", color: b.c2, letterSpacing:"0.04em",
                }}>{b.part2}</span>
              </div>

              <p style={{
                fontFamily:"'DM Sans',sans-serif", fontSize:"0.7rem", fontWeight:600,
                letterSpacing:"0.15em", textTransform:"uppercase", color: b.c2,
                marginBottom:"1rem",
              }}>{b.tag}</p>

              <p style={{
                fontFamily:"'DM Sans',sans-serif", fontSize:"0.825rem",
                color: C.ink70, lineHeight: 1.7, marginBottom: b.site ? "1.125rem" : 0,
              }}>{b.desc}</p>

              {b.site && (
                <a href={`https://${b.site}`} target="_blank" rel="noopener noreferrer" style={{
                  fontFamily:"'DM Mono',monospace", fontSize:"0.7rem", color: C.gold,
                  letterSpacing:"0.04em", textDecoration:"none",
                  borderBottom: `1px solid ${C.gold}`, paddingBottom: "1px",
                }}>{b.site} →</a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Footer ──────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background:C.deep, borderTop:`1px solid rgba(255,255,255,0.06)` }}>
      <div className="container py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
          <div className="flex items-center gap-3">
            <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
              <path d="M18 2.5 L31 9.75 L31 26.25 L18 33.5 L5 26.25 L5 9.75 Z"
                stroke={C.gold} strokeWidth="1.25" fill="none"/>
              <path d="M18 8 L25 12 L25 20 L18 24 L11 20 L11 12 Z"
                fill={C.gold} opacity="0.08"/>
              <text x="18" y="22" textAnchor="middle" fill={C.gold}
                fontSize="14" fontFamily="'Playfair Display','Cormorant Garamond',serif"
                fontWeight="700" fontStyle="italic">G</text>
            </svg>
            <div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"1rem",
                letterSpacing:"0.08em", color:"#fff" }}>GANA Cosmetic</div>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.5rem", fontWeight:600,
                letterSpacing:"0.25em", textTransform:"uppercase", color:C.gold }}>Co., Ltd.</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            {["Products","Science","Certifications","About","Contact"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`}
                style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.7rem", fontWeight:500,
                  letterSpacing:"0.08em", textTransform:"uppercase",
                  color:"rgba(255,255,255,0.40)", textDecoration:"none", transition:"color 0.2s" }}
                onMouseEnter={e=>(e.currentTarget.style.color="#fff")}
                onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.40)")}>{item}</a>
            ))}
          </div>

          <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.7rem",
            color:"rgba(255,255,255,0.30)", textAlign:"right" }}>
            © 2026 GANA Cosmetic Co., Ltd.<br/>All rights reserved.
          </div>
        </div>

        <div style={{ borderTop:"1px solid rgba(255,255,255,0.08)", paddingTop:"1.5rem",
          fontFamily:"'DM Sans',sans-serif", fontSize:"0.7rem",
          color:"rgba(255,255,255,0.20)", lineHeight:1.7 }}>
          For professional use only. Products may not be available in all markets.
          REGEN PEEL is for licensed medical professionals only.
          GANA KA (Kojic Acid 4%) may not comply with EU cosmetic regulations.
          Product images sourced from official GANA Cosmetic catalogues.
        </div>
      </div>
    </footer>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */
export default function Home() {
  // honor /#section deep-links (e.g. product page → Inquire): the browser's
  // native anchor jump fires before the SPA finishes layout (video, images,
  // reveal animations shift content), so re-scroll manually once settled
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const scroll = () => document.getElementById(hash)?.scrollIntoView();
    const t1 = setTimeout(scroll, 150);
    const t2 = setTimeout(scroll, 700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div style={{ background: C.white }}>
      <ScrollBackdrop />
      <Navbar />
      {/* content sits above the fixed backdrop; solid sections cover it */}
      <div className="relative" style={{ zIndex: 1 }}>
        <Hero />
        <ProductsSection />
        <FeatureStrip />
        <StatsBar />
        <SerumBand />
        <ScienceSection />
        <CertificationsSection />
        <AboutSection />
        <CtaBand />
        <ContactSection />
        <GanaGroupSection />
        <Footer />
      </div>
    </div>
  );
}
