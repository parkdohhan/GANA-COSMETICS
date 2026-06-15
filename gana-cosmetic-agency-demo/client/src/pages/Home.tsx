/*
 * GANA Cosmetic — "Clinical Luxury" layout
 * Inspired by: Lumivion Laboratories reference
 * Structure:
 *   1. (no navbar — single-page flow, hero video starts at the very top)
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

import { Award, Globe, ShieldCheck, FlaskConical } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { C, PRODUCTS, PROD_DMP } from "@/data/products";
import { useT } from "@/i18n/LanguageContext";
import { fmt } from "@/i18n/translations";
import LanguageSwitcher from "@/i18n/LanguageSwitcher";

/* ── Assets — local files in client/public/images ────────────────────────── */
const FT_PURE     = "/images/feature-pure.webp";
const FT_TESTED   = "/images/feature-tested.webp";
const FT_CELLS    = "/images/feature-cells.webp";
const FT_CLEAN    = "/images/feature-clean.webp";

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

/* ── Data ──────────────────────────────────────────────────────────────────
 * Only icons / imagery / codes live here; all copy is pulled from the active
 * translation (t.features / t.stats.certs) by matching array index. */
const FEATURES = [
  { icon: <IconFlask />,  img: FT_PURE },
  { icon: <IconShield />, img: FT_TESTED },
  { icon: <IconCell />,   img: FT_CELLS },
  { icon: <IconLeaf />,   img: FT_CLEAN },
];

/* PRODUCTS data is imported from @/data/products (shared with ProductDetail) */

const CERTS = [
  { code: "FDA",       icon: <ShieldCheck size={28} color={C.gold} strokeWidth={1.5} /> },
  { code: "EU CPNP",   icon: <Globe size={28} color={C.gold} strokeWidth={1.5} /> },
  { code: "GMP",       icon: <FlaskConical size={28} color={C.gold} strokeWidth={1.5} /> },
  { code: "ISO 13485", icon: <Award size={28} color={C.gold} strokeWidth={1.5} /> },
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

/* ── Logo bar — full logo centered, language switcher pinned right ───────── */
function LogoBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center"
      style={{
        height: "76px",
        background: "rgba(255,253,246,0.96)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderBottom: `1px solid ${C.borderL}`,
      }}>
      <a href="#" aria-label="GANA Cosmetics" className="select-none" style={{ textDecoration: "none" }}>
        <img src="/images/logo-wordmark.png" alt="GANA Cosmetics" style={{ height: "46px", width: "auto", display: "block" }}/>
      </a>
      {/* absolute → logo stays optically centered regardless of switcher width */}
      <div style={{ position: "absolute", right: "clamp(1rem, 3vw, 2rem)", top: "50%", transform: "translateY(-50%)" }}>
        <LanguageSwitcher />
      </div>
    </div>
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
  const t = useT();
  const vidRef = useRef<HTMLVideoElement>(null);
  // no poster: a mismatched still would flash before the first frame paints.
  // instead the video stays invisible over the brand background and fades in
  // once it can actually play, so there's no static-image → video swap.
  const [vidReady, setVidReady] = useState(false);
  useEffect(() => {
    if (vidRef.current) vidRef.current.playbackRate = 0.5;
  }, []);
  return (
    <header className="relative flex items-center overflow-hidden"
      // height follows the video's aspect ratio so nothing gets cropped;
      // on narrow screens content stretches it and cover-crop returns gracefully
      style={{ aspectRatio: "1920 / 1077", background: C.off }}>
      {/* mirrored so the video's empty area sits behind the left-side copy;
          no loop — playback ends frozen on the final frame */}
      <video ref={vidRef} autoPlay muted playsInline
        src="/images/hero-seq.mp4"
        onCanPlay={() => setVidReady(true)}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: "scaleX(-1)", opacity: vidReady ? 1 : 0, transition: "opacity 0.6s ease" }}/>
      {/* left gradient for headline legibility — scrolls away with the hero */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(100deg, rgba(245,248,250,0.9) 0%, rgba(245,248,250,0.5) 45%, rgba(245,248,250,0) 100%)",
      }}/>
      {/* full-width wrapper (no centered container) hugs the copy to the left edge,
          into the calmer area of the mirrored video */}
      <div className="relative z-10 w-full pl-6 md:pl-12 lg:pl-20 pr-6 pt-[110px] pb-[18vh]">
        <p className="eyebrow mb-6">{t.hero.eyebrow}</p>
        <h1 style={{
          fontFamily: "'Playfair Display', serif", fontWeight: 700,
          fontSize: "clamp(2.75rem, 6vw, 4.5rem)", color: C.ink,
          lineHeight: 1.08, marginBottom: "1.5rem", maxWidth: "820px",
        }}>
          {t.hero.title1}<br/>
          <em style={{ fontStyle: "italic", color: C.gold }}>{t.hero.titleEm}</em>
        </h1>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: "1rem",
          color: C.ink70, lineHeight: 1.75, maxWidth: "520px", marginBottom: "2.25rem",
        }}>
          {t.hero.body}
        </p>
        <div className="flex flex-wrap gap-3 mb-10">
          <a href="#products" className="btn-gold">{t.hero.ctaScience}</a>
          <a href="#contact" className="btn-outline-gold">{t.hero.ctaInquiry}</a>
        </div>
        <div className="flex flex-wrap gap-5">
          {t.hero.badges.map(b => (
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


/* ── Feature Strip ───────────────────────────────────────────────────────── */
function FeatureStrip() {
  const t = useT();
  const ref = useSectionReveal();
  return (
    <section id="science" style={{ background: "rgba(255,255,255,0.72)", borderTop: `1px solid ${C.borderL}` }} ref={ref}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f, i) => {
          const copy = t.features[i];
          return (
          <div key={i}
            className={`feature-card fade-up d${i + 1}`}
            style={{ borderRadius: 0, borderTop: "none", borderBottom: "none",
              borderLeft: i === 0 ? "none" : `1px solid ${C.borderL}`,
              borderRight: "none" }}>
            {/* Photo */}
            <div className="overflow-hidden" style={{ height: "160px" }}>
              <img src={f.img} alt={copy.title} className="card-img w-full h-full object-cover"/>
            </div>
            {/* Text */}
            <div className="p-6">
              <div className="mb-3">{f.icon}</div>
              <h3 style={{
                fontFamily:"'DM Sans',sans-serif", fontWeight:700,
                fontSize:"0.875rem", color:C.ink,
                letterSpacing:"0.05em", textTransform:"uppercase",
                marginBottom:"0.5rem",
              }}>{copy.title}</h3>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.8125rem", color:C.ink70, lineHeight:1.65 }}>{copy.text}</p>
            </div>
          </div>
          );
        })}
      </div>

    </section>
  );
}

/* ── Certifications strip (absorbed regulatory standing) ─────────────────── */
function StatsBar() {
  const t = useT();
  const ref = useSectionReveal();
  return (
    <section id="certifications" ref={ref}
      style={{ background: "rgba(245,248,250,0.7)", borderTop: `1px solid ${C.borderL}`, borderBottom: `1px solid ${C.borderL}` }}>
      <div className="container py-14 md:py-16">
        <div className="text-center mb-10">
          <p className="eyebrow mb-3 fade-up d1 justify-center">{t.stats.eyebrow}</p>
          <h3 className="fade-up d2" style={{
            fontFamily:"'Playfair Display',serif", fontWeight:700,
            fontSize:"clamp(1.4rem,2.6vw,2rem)", color:C.ink, lineHeight:1.15,
          }}>{t.stats.heading}</h3>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px fade-up d3"
          style={{ background:C.borderL, border:`1px solid ${C.borderL}` }}>
          {CERTS.map((c, i) => {
            const copy = t.stats.certs[i];
            return (
            <div key={c.code} className="flex flex-col items-center text-center"
              style={{ background:C.white, padding:"1.75rem 1.25rem" }}>
              <div className="mb-3">{c.icon}</div>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.68rem", fontWeight:500,
                letterSpacing:"0.12em", color:C.gold, textTransform:"uppercase", marginBottom:"0.35rem" }}>{c.code}</div>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.9rem",
                fontWeight:700, color:C.ink, marginBottom:"0.5rem" }}>{copy.title}</div>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.76rem", color:C.ink45, lineHeight:1.55 }}>{copy.body}</p>
            </div>
            );
          })}
        </div>

        <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.75rem", color:C.ink45,
          lineHeight:1.7, marginTop:"1.25rem", maxWidth:"760px" }}>
          <strong style={{ color:C.ink70 }}>{t.stats.noticeLabel}</strong> {t.stats.notice}
        </p>
      </div>
    </section>
  );
}

/* ── Products ────────────────────────────────────────────────────────────── */
function ProductsSection() {
  const t = useT();
  const ref = useSectionReveal();
  const [filter, setFilter] = useState("All");
  // filter state holds the canonical English category key; labels are localized
  const filters = ["All","Skin Booster","Meso Solution","Chemical Peel","Intimate Care","Clinic Care","Peptide"];
  const filterLabel = (key: string) => (key === "All" ? t.products.allLabel : t.cats[key] ?? key);
  const list = filter === "All" ? PRODUCTS : PRODUCTS.filter(p => p.cat === filter);

  return (
    <section id="products" data-backdrop="0" style={{ background: C.white, borderTop: `1px solid ${C.borderL}` }} className="pt-6 pb-0 md:pt-8" ref={ref}>
      {/* full-bleed wrapper — the grid spans the whole viewport width */}
      <div className="w-full px-5 md:px-8">
        {/* parent category label */}
        <p className="fade-up d1" style={{
          fontFamily:"'DM Sans',sans-serif", fontSize:"0.8rem", fontWeight:700, color:C.ink,
          textDecoration:"underline", textUnderlineOffset:"5px", marginBottom:"1.1rem",
        }}>{t.products.label}</p>

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
            }}>{filterLabel(f)}</button>
          ))}
        </div>

        {/* item count — centered, Gucci-style */}
        <p style={{ textAlign:"center", fontFamily:"'DM Sans',sans-serif", fontSize:"0.78rem",
          color:C.ink45, margin:"1.4rem 0" }}>{fmt(t.products.items, { n: list.length })}</p>

        {/* Hairline grid — items float on plain white, name + price only */}
        <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap:"1px", background:C.borderL }}>
          {list.map(p => (
            <Link key={p.id} href={`/products/${p.id}`}
              className="cat-item block"
              style={{ background:C.white, textDecoration:"none", cursor:"pointer" }}>
              <div className="relative overflow-hidden flex items-center justify-center" style={{ height:"min(28vw, 420px)" }}>
                {p.certs && (
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    {p.certs.map(c => (
                      <div key={c} className="flex flex-col items-center justify-center"
                        style={{ width:"60px", height:"60px", borderRadius:"50%",
                          background:C.gold, border:"2px solid #fff",
                          boxShadow:"0 2px 10px rgba(19,38,46,0.28)" }}>
                        <span style={{ fontFamily:"'DM Mono',monospace", fontWeight:700,
                          fontSize: c==="FDA" ? "0.95rem" : "0.82rem", color:"#fff", lineHeight:1, letterSpacing:"0.01em" }}>
                          {c==="EU CPNP" ? "CPNP" : c}
                        </span>
                        <span style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:600,
                          fontSize:"0.38rem", letterSpacing:"0.12em", textTransform:"uppercase",
                          color:"rgba(255,255,255,0.92)", marginTop:"2px" }}>
                          {c==="FDA" ? "US Reg." : "EU"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
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
                  {p.price ? `USD ${p.price}` : t.detail.inquiryPrice}
                </p>
              </div>
            </Link>
          ))}

          {/* CTA tile — fills the catalogue's trailing empty cells */}
          <a href="#contact" className="col-span-2 relative flex flex-col justify-center overflow-hidden"
            style={{ textDecoration:"none", minHeight:"min(28vw, 420px)",
              backgroundImage:`linear-gradient(120deg, rgba(19,38,46,0.78) 0%, rgba(19,38,46,0.45) 100%), url(/images/brand-serum.jpg)`,
              backgroundSize:"cover", backgroundPosition:"center", padding:"clamp(2rem,4vw,3.5rem)" }}>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.68rem", fontWeight:600,
              letterSpacing:"0.22em", textTransform:"uppercase", color:C.goldH, marginBottom:"1rem" }}>{t.products.ctaEyebrow}</p>
            <h3 style={{ fontFamily:"'Playfair Display',serif", fontWeight:700,
              fontSize:"clamp(1.4rem,2.4vw,2rem)", color:"#fff", lineHeight:1.15, marginBottom:"1.5rem", maxWidth:"460px" }}>
              {t.products.ctaTitle1}<br/>
              <em style={{ fontStyle:"italic", color:C.goldH }}>{t.products.ctaTitleEm}</em>
            </h3>
            <span className="btn-gold" style={{ alignSelf:"flex-start" }}>{t.products.ctaButton}</span>
          </a>
        </div>

      </div>
    </section>
  );
}

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby5jPT8G_Mtl5b6nuy1Hh07RJA2cqkQBe3SRQqtjbB8bZ_8-kqBx7ZImgEu5AZdaZJH/exec";

function ContactSection() {
  const t = useT();
  const ref = useSectionReveal();
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [form, setForm] = useState({ name:"", company:"", email:"", phone:"", country:"", type:"", message:"" });
  const set = (k:string) => (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  // prefill from a product page's "Inquire about this product" link (/?product=…#contact)
  useEffect(() => {
    const product = new URLSearchParams(window.location.search).get("product");
    if (product) {
      setForm(f => ({
        ...f,
        type: f.type || "general",
        message: f.message || fmt(t.contact.prefill, { product }),
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const c = t.contact;

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
            <p className="eyebrow mb-5 fade-up d1">{c.eyebrow}</p>
            <h2 className="fade-up d2" style={{
              fontFamily:"'Playfair Display',serif", fontWeight:700,
              fontSize:"clamp(1.75rem,3.5vw,2.5rem)", color:C.ink,
              lineHeight:1.15, marginBottom:"1.25rem",
            }}>
              {c.h2pre}<br/>
              <em style={{ fontStyle:"italic", color:C.gold }}>{c.h2em}</em>
            </h2>
            <p className="fade-up d3" style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.9375rem",
              color:C.ink45, lineHeight:1.75, marginBottom:"2.5rem", maxWidth:"420px" }}>
              {c.body}
            </p>
            <div className="space-y-3 fade-up d4">
              {c.list.map(item => (
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
                  fontSize:"2rem", color:C.gold, marginBottom:"1rem" }}>{c.thankTitle}</div>
                <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.9rem", color:C.ink45 }}>
                  {c.thankBody}
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit}
                className="p-8 md:p-10 space-y-6"
                style={{ background:"rgba(141,150,158,0.14)", border:`1px solid ${C.border}`,
                  backdropFilter:"blur(2px)", WebkitBackdropFilter:"blur(2px)" }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {([["name",c.labels.name,"text"],["company",c.labels.company,"text"],
                    ["email",c.labels.email,"email"],["phone",c.labels.phone,"tel"]] as const).map(([k,l,type]) => (
                    <div key={k}>
                      <label className="form-label">{l} *</label>
                      <input type={type} required className="form-input"
                        value={(form as Record<string,string>)[k]} onChange={set(k)}/>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">{c.labels.country} *</label>
                    <input type="text" required className="form-input" value={form.country} onChange={set("country")}/>
                  </div>
                  <div>
                    <label className="form-label">{c.labels.type} *</label>
                    <select required className="form-input appearance-none"
                      value={form.type} onChange={set("type")}
                      style={{ color: form.type ? C.ink : C.border }}>
                      <option value="" disabled>{c.selectPlaceholder}</option>
                      <option value="distributor">{c.typeOptions.distributor}</option>
                      <option value="clinic">{c.typeOptions.clinic}</option>
                      <option value="odm">{c.typeOptions.odm}</option>
                      <option value="general">{c.typeOptions.general}</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="form-label">{c.labels.message}</label>
                  <textarea rows={4} className="form-input resize-none"
                    value={form.message} onChange={set("message")}
                    placeholder={c.messagePlaceholder}/>
                </div>
                {error && (
                  <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.8125rem", color:"#B23B3B", textAlign:"center" }}>
                    {c.error}
                  </p>
                )}
                <button type="submit" disabled={submitting}
                  className="btn-gold w-full justify-center"
                  style={{ opacity: submitting ? 0.6 : 1, cursor: submitting ? "wait" : "pointer" }}>
                  {submitting ? c.submitting : c.submit}
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
  const t = useT();
  const ref = useSectionReveal();

  // brand identity (names / colours / site) is static; tag + desc are localized
  // via t.group.brands by matching array index
  const BRANDS = [
    { part1: "GANA", c1: "#2A2A2A", part2: "R&D",      c2: "#1B3A6B", site: "www.ganarnd.co.kr" },
    { part1: "GANA", c1: "#2A2A2A", part2: "COSMETIC", c2: "#3FA34D", site: "" },
    { part1: "Dr.",  c1: "#2A2A2A", part2: "PARK",     c2: "#A8905A", site: "" },
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
            <p className="eyebrow mb-3 fade-up d1">{t.group.eyebrow}</p>
            <h2 className="fade-up d2" style={{
              fontFamily:"'Playfair Display',serif", fontWeight:700,
              fontSize:"clamp(1.75rem,3.5vw,2.5rem)", color:C.ink,
              lineHeight:1.15,
            }}>
              {t.group.h2pre && <>{t.group.h2pre} </>}<em style={{ fontStyle:"italic", color:C.gold }}>{t.group.h2em}</em>
            </h2>
            <p className="fade-up d3" style={{
              fontFamily:"'DM Sans',sans-serif", fontSize:"0.9rem",
              color:C.ink70, lineHeight:1.7, marginTop:"0.75rem", maxWidth:"420px",
            }}>
              {t.group.body}
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
          {BRANDS.map((b, i) => {
            const brand = t.group.brands[i];
            return (
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
              }}>{brand.tag}</p>

              <p style={{
                fontFamily:"'DM Sans',sans-serif", fontSize:"0.825rem",
                color: C.ink70, lineHeight: 1.7, marginBottom: b.site ? "1.125rem" : 0,
              }}>{brand.desc}</p>

              {b.site && (
                <a href={`https://${b.site}`} target="_blank" rel="noopener noreferrer" style={{
                  fontFamily:"'DM Mono',monospace", fontSize:"0.7rem", color: C.gold,
                  letterSpacing:"0.04em", textDecoration:"none",
                  borderBottom: `1px solid ${C.gold}`, paddingBottom: "1px",
                }}>{b.site} →</a>
              )}
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Footer ──────────────────────────────────────────────────────────────── */
function Footer() {
  const t = useT();
  return (
    <footer style={{ background:C.deep, borderTop:`1px solid rgba(255,255,255,0.06)` }}>
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr] gap-12 mb-12">
          {/* Brand + tagline — same wordmark as the top bar (inverted to white) */}
          <div>
            <img src="/images/logo-full.png" alt="GANA Cosmetics" className="mb-5"
              style={{ height:"72px", width:"auto", display:"block", filter:"invert(1) brightness(2)" }}/>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.8rem", lineHeight:1.7,
              color:"rgba(255,255,255,0.5)", maxWidth:"320px" }}>
              {t.footer.tagline}
            </p>
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.62rem", color:C.gold,
              letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:"1rem" }}>{t.footer.contactHeading}</div>
            <div className="space-y-3">
              {[
                [t.footer.labelAddress,"555 Dunchon-daero, Jungwon-gu,\nSeongnam-si, Gyeonggi-do, South Korea"],
                [t.footer.labelTel,"+82-31-732-0242"],
                [t.footer.labelEmail,"contact@gana-cosmetics.com"],
              ].map(([l,v]) => (
                <div key={l}>
                  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.56rem", color:"rgba(255,255,255,0.4)",
                    letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"0.2rem" }}>{l}</div>
                  <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.8rem",
                    color:"rgba(255,255,255,0.7)", lineHeight:1.55, whiteSpace:"pre-line" }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Company details */}
          <div>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.62rem", color:C.gold,
              letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:"1rem" }}>{t.footer.companyHeading}</div>
            <div className="space-y-3">
              {[
                [t.footer.labelManufacturer,"GANA Cosmetic Co., Ltd."],
                [t.footer.labelFdaNo,"1007236"],
                [t.footer.labelGroup,"GANA R&D · Dr. PARK Co., Ltd."],
                [t.footer.labelHours,t.footer.hoursValue],
              ].map(([l,v]) => (
                <div key={l}>
                  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.56rem", color:"rgba(255,255,255,0.4)",
                    letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"0.2rem" }}>{l}</div>
                  <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.8rem",
                    color:"rgba(255,255,255,0.7)", lineHeight:1.55 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop:"1px solid rgba(255,255,255,0.08)", paddingTop:"1.5rem" }}
          className="flex flex-col md:flex-row justify-between gap-4">
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.68rem",
            color:"rgba(255,255,255,0.22)", lineHeight:1.7, maxWidth:"680px" }}>
            {t.footer.disclaimer}
          </p>
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.68rem",
            color:"rgba(255,255,255,0.3)", whiteSpace:"nowrap" }}>
            © 2026 GANA Cosmetic Co., Ltd.
          </p>
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
      <LogoBar />
      {/* content sits above the fixed backdrop; solid sections cover it */}
      <div className="relative" style={{ zIndex: 1 }}>
        <Hero />
        <ProductsSection />
        <StatsBar />
        <FeatureStrip />
        <ContactSection />
        <GanaGroupSection />
        <Footer />
      </div>
    </div>
  );
}
