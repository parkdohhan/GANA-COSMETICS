/* ── Shared product data + design tokens ─────────────────────────────────────
 * Single source of truth used by both Home (catalogue grid) and ProductDetail.
 * Prices are USD Retail (단가표 기준). Dealer/volume pricing = inquiry only.
 * Excluded ranges (fillers / clinic care / R&D) are intentionally NOT listed here.
 * ------------------------------------------------------------------------- */

/* Product imagery — local files in client/public/products (from GANA catalogues).
 * DMP+/PHV/EYE BOOSTER from 2024-25 catalogues; the rest extracted from the
 * 2021 web catalogue (white-bg studio shots, resized to max 1400px). */
export const PROD_DMP  = "/products/dmp-plus.png";     // GANA DMP+ — 2025 catalogue
export const SYRINGE_B = "/products/phv.png";          // GANA PHV — vial on marble
export const SYRINGE_G = "/products/eye-booster.png";  // GANA EYE BOOSTER — labeled box

/* Colour tokens — kept here so every page shares one palette.
 * Cool gold/blue/white scheme: ink and neutrals are blue-tinted,
 * `deep` is the dark teal used by the hero / science / footer. */
export const C = {
  white:   "#FFFFFF",
  off:     "#F5F8FA",
  light:   "#E9EFF3",
  ink:     "#16222C",
  ink70:   "rgba(22,34,44,0.70)",
  ink45:   "rgba(22,34,44,0.45)",
  gold:    "#A8905A",
  goldH:   "#BFA570",
  border:  "#D4DCE2",
  borderL: "#E3E9EE",
  deep:    "#13262E",
};

export type Product = {
  id: string;
  cat: string;
  name: string;
  tag: string;
  desc: string;
  ings: string[];
  vol: string;
  price: string;          // USD retail
  img: string | null;
  badge: string;
};

export const PRODUCTS: Product[] = [
  { id:"dmp-plus", cat:"Skin Booster", name:"GANA DMP+", tag:"High End Skin Booster",
    desc:"PLLA + HA + PDRN + Glutathione. Multi-active booster in a ready-to-use prefilled vial.",
    ings:["PLLA 1mg/ml","HA 3mg/ml","PDRN 2mg/ml","Glutathione 0.5mg"], vol:"3ml × 2 vials", price:"150", img:PROD_DMP, badge:"2024 NEW" },
  { id:"phv", cat:"Skin Booster", name:"GANA PHV", tag:"2-Year Lasting Hydration",
    desc:"High-molecular HA + PLLA biostimulator. Hyaluronidase-correctable for precise control.",
    ings:["HA 20mg/ml","PLLA 1mg/ml"], vol:"10ml vial", price:"150", img:SYRINGE_B, badge:"2024 NEW" },
  { id:"eye-booster", cat:"Skin Booster", name:"GANA EYE BOOSTER", tag:"Full-Face PDRN Revitalizer",
    desc:"PDRN + Sodium DNA + Glutathione. Targets cellular regeneration across the full face.",
    ings:["PDRN","HA","Glutathione","Sodium DNA"], vol:"1.2ml syringe", price:"30", img:SYRINGE_G, badge:"2025 NEW" },
  { id:"tox", cat:"Meso Solution", name:"GANA TOX", tag:"Topical Neuromodulator",
    desc:"Argireline 100ppm + PDRN + HA. Spray-applied — no injection required. FDA & EU CPNP.",
    ings:["Argireline 100ppm","PDRN","Adenosine","Glutathione"], vol:"5ml × 10ea", price:"150", img:"/products/tox.jpg", badge:"FDA + CPNP" },
  { id:"pnv-plus", cat:"Meso Solution", name:"GANA PNV+", tag:"High-Concentration PDRN",
    desc:"PDRN 2% — direct clinical alternative to Rejuran. With Glutathione and HA 10mg/cc.",
    ings:["PDRN 2%","Glutathione","HA 10mg/cc"], vol:"3ml × 5ea", price:"150", img:"/products/pnv-plus.jpg", badge:"vs Rejuran" },
  { id:"scalp", cat:"Meso Solution", name:"GANA SCALP", tag:"Scalp Regeneration",
    desc:"PDRN + GHK-Cu targeting hair follicle regeneration and scalp microenvironment.",
    ings:["PDRN","GHK-Cu"], vol:"3ml × 10ea", price:"150", img:"/products/scalp.jpg", badge:"Hair Specialist" },
  { id:"pnv", cat:"Meso Solution", name:"GANA PNV", tag:"Low-Concentration PDRN",
    desc:"Low-concentration PDRN (0.5%) mesotherapy solution with glutathione and cross-linked HA for skin regeneration, whitening, and hydration.",
    ings:["PDRN 0.5%","Glutathione","HA 5mg/cc"], vol:"3ml × 5ea", price:"90", img:"/products/pnv.jpg", badge:"PDRN" },
  { id:"eye", cat:"Meso Solution", name:"GANA EYE", tag:"Eye Bag & Dark Circle Solution",
    desc:"Targeted meso solution for under-eye bags and dark circles, formulated with carnitine and acetyl tetrapeptide-5.",
    ings:["Carnitine 2%","Acetyl Tetrapeptide-5"], vol:"2ml × 5ea", price:"150", img:"/products/eye.jpg", badge:"Eye Care" },
  { id:"cocktail", cat:"Meso Solution", name:"GANA Cocktail", tag:"Whitening Meso Cocktail",
    desc:"Dual-vial whitening program — glutathione and vitamin C (ascorbic acid), applied on alternating weeks. Never mixed together.",
    ings:["Glutathione","Vitamin C"], vol:"4ml × 5+5ea", price:"90", img:"/products/cocktail.jpg", badge:"Whitening" },
  { id:"tc-plus", cat:"Topical", name:"GANA TC+", tag:"Post-Procedure Recovery",
    desc:"4× concentrated PDRN topical with PHA + peptides. Premium post-treatment care.",
    ings:["PDRN 2%","PHA 2%","Acetyl Hexapeptide-8"], vol:"45g tube", price:"90", img:"/products/tc-plus.jpg", badge:"4× Conc." },
  { id:"tc", cat:"Topical", name:"GANA TC", tag:"Daily Recovery Ointment",
    desc:"Daily PDRN + PHA + peptide ointment for skin rejuvenation, gentle exfoliation, and hydration. Standard strength (TC+ is the 4× version).",
    ings:["PDRN 0.5%","PHA (Lactobionic Acid)","Acetyl Hexapeptide-8"], vol:"45g tube", price:"45", img:"/products/tc.jpg", badge:"Recovery" },
  { id:"ka", cat:"Topical", name:"GANA KA", tag:"Brightening Ointment",
    desc:"Kojic acid 4% brightening ointment targeting melanin production and uneven tone. Exceeds EU cosmetic limit — non-EU markets only.",
    ings:["Kojic Acid 4%"], vol:"45g tube", price:"30", img:"/products/ka.jpg", badge:"Brightening" },
  { id:"bb", cat:"Topical", name:"GANA BB", tag:"Treatment BB Cream (SPF 35)",
    desc:"Post-procedure BB cream with PDRN and SPF 35 — coverage, sun protection, and skin recovery. Shades tuned for European skin.",
    ings:["PDRN","SPF 35"], vol:"45g tube", price:"30", img:"/products/bb.jpg", badge:"Coverage" },
  { id:"gino-face", cat:"Chemical Peel", name:"GINO FACE", tag:"Natural Microneedling Peel",
    desc:"Spongilla spicule-based exfoliation. Globally rare natural micro-needling mechanism.",
    ings:["Sponge Spicules","Salicylic Acid","Alpha Arbutin"], vol:"45g tube", price:"90", img:"/products/gino-face.jpg", badge:"Acne Specialist" },
  { id:"regen-peel", cat:"Chemical Peel", name:"REGEN PEEL", tag:"Medical-Grade TCA Peel",
    desc:"TCA 30% with bicarbonate neutralizer. For licensed medical professionals only.",
    ings:["TCA 30%","Bicarbonate"], vol:"30ml / 50ml", price:"60", img:"/products/regen-peel.jpg", badge:"Rx Only" },
  { id:"gino-body", cat:"Chemical Peel", name:"GINO BODY", tag:"Body Microneedling Peel",
    desc:"Freshwater sponge spicule exfoliation formulated for the body — keratosis pilaris, rough texture, and tone.",
    ings:["Sponge Spicules","Glycolic Acid","Urea"], vol:"45g tube", price:"90", img:"/products/gino-body.jpg", badge:"Body Care" },
  { id:"pha", cat:"Chemical Peel", name:"GANA PHA", tag:"Gentle PHA Peel",
    desc:"Polyhydroxy acid peel (PHA 10%) with alpha arbutin — gentle, low-irritation exfoliation and brightening for sensitive, rosacea, and atopic skin.",
    ings:["Polyhydroxy Acid 10%","Alpha Arbutin 1%"], vol:"40ml", price:"60", img:"/products/pha.jpg", badge:"Sensitive Skin" },
  { id:"gyno", cat:"Intimate Care", name:"GANA GYNO", tag:"Intimate Brightening & pH Care",
    desc:"Intimate area brightening and pH-balance care with glutathione and soy isoflavone. Also soothes dryness.",
    ings:["Glutathione","Soy Isoflavone","Lactic Acid"], vol:"50ml", price:"60", img:"/products/gyno.jpg", badge:"Intimate Care" },
];

export function getProduct(id: string | undefined): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

/** Up to `limit` other products in the same category. */
export function getRelated(product: Product, limit = 3): Product[] {
  return PRODUCTS.filter((p) => p.cat === product.cat && p.id !== product.id).slice(0, limit);
}
