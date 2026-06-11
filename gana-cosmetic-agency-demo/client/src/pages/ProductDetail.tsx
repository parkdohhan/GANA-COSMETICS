/* ── Product detail page  /products/:id ──────────────────────────────────── */
import { useEffect } from "react";
import { Link, useRoute } from "wouter";
import { C, getProduct, getRelated, type Product } from "@/data/products";
import { useT } from "@/i18n/LanguageContext";
import { fmt } from "@/i18n/translations";
import LanguageSwitcher from "@/i18n/LanguageSwitcher";

const serif = "'Playfair Display',serif";
const sans  = "'DM Sans',sans-serif";
const mono  = "'DM Mono',monospace";

function FlaskPlaceholder() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke={C.border} strokeWidth="1">
        <path d="M9 3h6M9 3v7l-4 8a1 1 0 0 0 .9 1.5h12.2A1 1 0 0 0 19 18l-4-8V3" />
      </svg>
    </div>
  );
}

function Header() {
  const t = useT();
  return (
    <header style={{ background: C.white, borderBottom: `1px solid ${C.borderL}` }}>
      <div className="container flex items-center justify-between" style={{ height: "68px" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <img src="/images/logo-full.png" alt="GANA Cosmetics" style={{ height: "52px", width: "auto", display: "block" }}/>
        </Link>
        <div className="flex items-center" style={{ gap: "1.25rem" }}>
          <Link href="/#products" style={{ fontFamily: sans, fontSize: "0.75rem", fontWeight: 600,
            letterSpacing: "0.1em", textTransform: "uppercase", color: C.gold, textDecoration: "none" }}>
            {t.detail.allProducts}
          </Link>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}

function RelatedCard({ p }: { p: Product }) {
  const t = useT();
  return (
    <Link href={`/products/${p.id}`} style={{ textDecoration: "none", display: "block" }}>
      <div style={{ background: C.white, border: `1px solid ${C.borderL}`, transition: "transform .18s ease" }}
        className="product-card">
        <div style={{ height: "150px", background: p.img ? C.white : C.light, overflow: "hidden" }}>
          {p.img
            ? <img src={p.img} alt={p.name} className="w-full h-full object-contain p-5" />
            : <FlaskPlaceholder />}
        </div>
        <div className="p-4">
          <p style={{ fontFamily: sans, fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.15em",
            textTransform: "uppercase", color: C.gold, marginBottom: "0.2rem" }}>{t.cats[p.cat] ?? p.cat}</p>
          <h4 style={{ fontFamily: serif, fontWeight: 700, fontSize: "1rem", color: C.ink }}>{p.name}</h4>
          <p style={{ fontFamily: mono, fontSize: "0.7rem", color: C.ink45, marginTop: "0.35rem" }}>USD {p.price}</p>
        </div>
      </div>
    </Link>
  );
}

export default function ProductDetail() {
  const t = useT();
  const [, params] = useRoute("/products/:id");
  const product = getProduct(params?.id);

  useEffect(() => { window.scrollTo(0, 0); }, [params?.id]);

  if (!product) {
    return (
      <div style={{ background: C.off, minHeight: "100vh" }}>
        <Header />
        <div className="container" style={{ padding: "6rem 0", textAlign: "center" }}>
          <h1 style={{ fontFamily: serif, fontSize: "2rem", color: C.ink, marginBottom: "1rem" }}>{t.detail.notFound}</h1>
          <Link href="/#products" style={{ fontFamily: sans, color: C.gold, textDecoration: "none" }}>
            {t.detail.backToCatalogue}
          </Link>
        </div>
      </div>
    );
  }

  const related = getRelated(product);
  const copy = t.prod[product.id] ?? { tag: product.tag, desc: product.desc };
  const catLabel = t.cats[product.cat] ?? product.cat;
  const badgeLabel = t.badges[product.badge] ?? product.badge;

  return (
    <div style={{ background: C.off, minHeight: "100vh" }}>
      <Header />

      <main className="container" style={{ paddingTop: "2.5rem", paddingBottom: "5rem" }}>
        {/* Breadcrumb */}
        <nav style={{ fontFamily: mono, fontSize: "0.7rem", color: C.ink45, marginBottom: "2.5rem" }}>
          <Link href="/" style={{ color: C.ink45, textDecoration: "none" }}>{t.detail.home}</Link>
          <span style={{ margin: "0 0.5rem" }}>/</span>
          <Link href="/#products" style={{ color: C.ink45, textDecoration: "none" }}>{t.detail.productsCrumb}</Link>
          <span style={{ margin: "0 0.5rem" }}>/</span>
          <span style={{ color: C.ink }}>{product.name}</span>
        </nav>

        {/* Hero */}
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "3.5rem", alignItems: "start" }}>
          {/* Image */}
          <div style={{ background: product.img ? C.white : C.light, border: `1px solid ${C.borderL}`, height: "440px", position: "relative" }}>
            {product.img
              ? <img src={product.img} alt={product.name} className="w-full h-full object-contain p-12" />
              : <FlaskPlaceholder />}
            <div style={{ position: "absolute", top: "1rem", right: "1rem", fontFamily: sans, fontSize: "0.6rem",
              fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.25rem 0.7rem",
              background: C.gold, color: C.white }}>{badgeLabel}</div>
          </div>

          {/* Info */}
          <div>
            <p style={{ fontFamily: sans, fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.18em",
              textTransform: "uppercase", color: C.gold, marginBottom: "0.6rem" }}>{catLabel}</p>
            <h1 style={{ fontFamily: serif, fontWeight: 700, fontSize: "clamp(2rem,4vw,2.9rem)", color: C.ink,
              lineHeight: 1.1, marginBottom: "0.5rem" }}>{product.name}</h1>
            <p style={{ fontFamily: sans, fontSize: "1.05rem", fontWeight: 500, color: C.ink70,
              marginBottom: "1.5rem" }}>{copy.tag}</p>

            <p style={{ fontFamily: sans, fontSize: "0.95rem", color: C.ink70, lineHeight: 1.7,
              marginBottom: "1.75rem" }}>{copy.desc}</p>

            {/* Price + volume */}
            <div className="flex items-end" style={{ gap: "1rem", paddingBottom: "1.5rem",
              borderBottom: `1px solid ${C.borderL}`, marginBottom: "1.5rem" }}>
              <span style={{ fontFamily: mono, fontSize: "1.9rem", fontWeight: 500, color: C.ink }}>
                USD {product.price}
              </span>
              <span style={{ fontFamily: mono, fontSize: "0.8rem", color: C.ink45, marginBottom: "0.35rem" }}>
                / {product.vol}
              </span>
            </div>
            <p style={{ fontFamily: sans, fontSize: "0.78rem", color: C.ink45, marginBottom: "1.75rem" }}>
              {t.detail.retailNote}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap" style={{ gap: "0.75rem" }}>
              <a href={`/?product=${encodeURIComponent(product.name)}#contact`} className="btn-gold"
                style={{ textDecoration: "none" }}>{t.detail.inquireBtn}</a>
            </div>
          </div>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "3.5rem", marginTop: "4.5rem" }}>
          {/* Key actives */}
          <div>
            <p style={{ fontFamily: sans, fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.18em",
              textTransform: "uppercase", color: C.gold, marginBottom: "1.25rem" }}>{t.detail.keyActives}</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {product.ings.map((ing) => (
                <li key={ing} style={{ fontFamily: mono, fontSize: "0.9rem", color: C.ink, padding: "0.7rem 0",
                  borderBottom: `1px solid ${C.borderL}`, display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ width: "6px", height: "6px", background: C.gold, borderRadius: "50%", flexShrink: 0 }} />
                  {ing}
                </li>
              ))}
            </ul>
          </div>

          {/* Specifications */}
          <div>
            <p style={{ fontFamily: sans, fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.18em",
              textTransform: "uppercase", color: C.gold, marginBottom: "1.25rem" }}>{t.detail.specifications}</p>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: sans }}>
              <tbody>
                {[[t.detail.specCategory, catLabel], [t.detail.specVolume, product.vol], [t.detail.specRetail, product.price], [t.detail.specLabel, badgeLabel]].map(([k, v]) => (
                  <tr key={k} style={{ borderBottom: `1px solid ${C.borderL}` }}>
                    <td style={{ padding: "0.7rem 0", fontSize: "0.82rem", color: C.ink45, width: "45%" }}>{k}</td>
                    <td style={{ padding: "0.7rem 0", fontSize: "0.88rem", color: C.ink, fontWeight: 500 }}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ fontFamily: sans, fontSize: "0.78rem", color: C.ink45, lineHeight: 1.6, marginTop: "1.25rem" }}>
              {t.detail.specNote}
            </p>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div style={{ marginTop: "5rem" }}>
            <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: "1.6rem", color: C.ink, marginBottom: "1.75rem" }}>
              {fmt(t.detail.relatedIn, { cat: catLabel })}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3" style={{ gap: "1.25rem" }}>
              {related.map((p) => <RelatedCard key={p.id} p={p} />)}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{ background: C.deep, padding: "2.5rem 0" }}>
        <div className="container flex flex-col md:flex-row items-center justify-between" style={{ gap: "1rem" }}>
          <span style={{ fontFamily: serif, fontWeight: 700, fontSize: "1.25rem", color: "#fff", letterSpacing: "0.08em" }}>
            GANA Cosmetic
          </span>
          <span style={{ fontFamily: sans, fontSize: "0.75rem", color: "rgba(255,255,255,0.45)" }}>
            © 2026 GANA Cosmetic Co., Ltd.
          </span>
        </div>
      </footer>
    </div>
  );
}
