/* ── i18n dictionaries ───────────────────────────────────────────────────────
 * Four languages: English (default), Chinese (Simplified), Thai, Vietnamese.
 *
 * Conventions
 *  - Brand names (GANA …, Dr. PARK, Rejuran) and INCI / actives / acronyms
 *    (PDRN, PLLA, HA, FDA, EU CPNP, GMP, ISO, TCA, SPF, ODM, KST) stay in
 *    English — industry standard across all markets.
 *  - Placeholders: "{n}" (item count), "{product}" (prefill), "{cat}" (related).
 *
 *  ⚠ The medical / regulatory lines (stats.notice, footer.disclaimer, product
 *    descs for REGEN PEEL / GANA KA) are machine-translated — have a native
 *    speaker review them before going live.
 * ------------------------------------------------------------------------- */

export type Lang = "en" | "zh" | "th" | "vi";

export const LANGS: { code: Lang; label: string; short: string }[] = [
  { code: "en", label: "English",     short: "EN" },
  { code: "zh", label: "中文",         short: "中文" },
  { code: "th", label: "ไทย",         short: "ไทย" },
  { code: "vi", label: "Tiếng Việt",  short: "VI" },
];

export const DEFAULT_LANG: Lang = "en";

type ProductCopy = { tag: string; desc: string };

export interface Dict {
  hero: {
    eyebrow: string; title1: string; titleEm: string; body: string;
    ctaScience: string; ctaInquiry: string; badges: [string, string, string];
  };
  features: { title: string; text: string }[];
  stats: {
    eyebrow: string; heading: string;
    certs: { title: string; body: string }[];
    noticeLabel: string; notice: string;
  };
  products: {
    label: string; allLabel: string; items: string;
    ctaEyebrow: string; ctaTitle1: string; ctaTitleEm: string; ctaButton: string;
  };
  contact: {
    eyebrow: string; h2pre: string; h2em: string; body: string;
    list: [string, string, string, string];
    thankTitle: string; thankBody: string;
    labels: { name: string; company: string; email: string; phone: string; country: string; type: string; message: string };
    selectPlaceholder: string;
    typeOptions: { distributor: string; clinic: string; odm: string; general: string };
    messagePlaceholder: string; error: string; submit: string; submitting: string;
    prefill: string;
  };
  group: {
    eyebrow: string; h2pre: string; h2em: string; body: string;
    brands: { tag: string; desc: string }[];
  };
  footer: {
    tagline: string; contactHeading: string; companyHeading: string;
    labelAddress: string; labelTel: string; labelEmail: string;
    labelManufacturer: string; labelFdaNo: string; labelGroup: string; labelHours: string;
    hoursValue: string; disclaimer: string;
  };
  detail: {
    allProducts: string; home: string; productsCrumb: string;
    notFound: string; backToCatalogue: string;
    retailNote: string; inquireBtn: string;
    keyActives: string; specifications: string;
    specCategory: string; specVolume: string; specRetail: string; specLabel: string;
    specNote: string; relatedIn: string;
  };
  cats: Record<string, string>;
  badges: Record<string, string>;
  prod: Record<string, ProductCopy>;
}

/* ── English (canonical / default) ───────────────────────────────────────── */
const en: Dict = {
  hero: {
    eyebrow: "Cosmeceutical Solutions for Professionals",
    title1: "Clinical Beauty,",
    titleEm: "Refined by Science",
    body: "A U.S. FDA-registered manufacturer with EU CPNP-notified formulations — GANA Cosmetic supplies PDRN, PLLA, and HA cosmeceuticals to distributors and aesthetic clinics worldwide.",
    ctaScience: "Discover Our Science →",
    ctaInquiry: "B2B Inquiry",
    badges: ["FDA Registered", "EU CPNP Compliant", "GMP Certified"],
  },
  features: [
    { title: "Clinical-Grade Actives", text: "High-purity PDRN, PLLA, HA, and peptides at verified concentrations. No unnecessary additives." },
    { title: "Clinically Tested", text: "FDA registered and EU CPNP compliant. Tested for efficacy and safety in professional aesthetic settings." },
    { title: "Cellular Regeneration", text: "PDRN and Sodium DNA formulations that support DNA repair, cellular turnover, and microbiome balance." },
    { title: "Clean Formulation", text: "Full INCI disclosure on every product. No hidden blends. Transparent ingredient sourcing." },
  ],
  stats: {
    eyebrow: "Regulatory Standing",
    heading: "Certified for Global Distribution",
    certs: [
      { title: "FDA Registration", body: "GANA TOX registered under U.S. FDA cosmetic product notification." },
      { title: "EU CPNP Compliant", body: "Selected products notified under EU Cosmetic Products Notification Portal." },
      { title: "GMP Certified", body: "Manufacturing facility operates under Good Manufacturing Practice standards." },
      { title: "ISO 13485", body: "Quality management system certified for medical device design and production." },
    ],
    noticeLabel: "Regulatory Notice:",
    notice: "REGEN PEEL (TCA 30%) is for licensed medical professionals only. GANA KA (Kojic Acid 4%) exceeds EU Cosmetic Regulation 1223/2009 limits — EU distribution requires reformulation. Certificates available upon request.",
  },
  products: {
    label: "Cosmeceuticals",
    allLabel: "All",
    items: "{n} items",
    ctaEyebrow: "From Seoul to Your Clinic",
    ctaTitle1: "Global B2B supply,",
    ctaTitleEm: "direct from the manufacturer.",
    ctaButton: "Start a Conversation →",
  },
  contact: {
    eyebrow: "Get in Touch",
    h2pre: "Partner with",
    h2em: "GANA Cosmetic",
    body: "Whether you are a distributor seeking exclusive territory rights, a clinic looking for reliable supply, or an ODM partner — we respond to every inquiry within 48 hours.",
    list: ["Distributor Partnership", "Clinic Supply", "ODM / Private Label", "General Inquiry"],
    thankTitle: "Thank You",
    thankBody: "Your inquiry has been received. We will respond within 48 hours.",
    labels: { name: "Name", company: "Company / Clinic", email: "Email", phone: "Phone", country: "Country", type: "Inquiry Type", message: "Message" },
    selectPlaceholder: "Select type",
    typeOptions: { distributor: "Distributor Partnership", clinic: "Clinic Supply", odm: "ODM / Private Label", general: "General Inquiry" },
    messagePlaceholder: "Describe your business and requirements...",
    error: "Something went wrong. Please try again or email us directly at contact@gana-cosmetics.com.",
    submit: "Send Inquiry →",
    submitting: "Sending…",
    prefill: "I'm interested in {product}. Please send pricing and details.",
  },
  group: {
    eyebrow: "Our Group",
    h2pre: "The",
    h2em: "GANA Group",
    body: "Three companies, one mission — combining cosmeceutical, medical-device, and gene-therapy expertise under a single Korean corporate group.",
    brands: [
      { tag: "Medical Devices", desc: "Dermal fillers, mesotherapy devices, and ODM development for medical aesthetics." },
      { tag: "Cosmeceuticals", desc: "Clinical-grade cosmetic formulations distributed to clinics and partners worldwide." },
      { tag: "Gene Therapy R&D", desc: "Advanced gene therapy research and next-generation medical innovation." },
    ],
  },
  footer: {
    tagline: "U.S. FDA-registered cosmeceutical manufacturer within the GANA Group. Supplying distributors and aesthetic clinics worldwide.",
    contactHeading: "Contact",
    companyHeading: "Company",
    labelAddress: "Address", labelTel: "Tel", labelEmail: "Email",
    labelManufacturer: "Manufacturer", labelFdaNo: "FDA Reg. No.", labelGroup: "Group", labelHours: "Hours",
    hoursValue: "Mon–Fri 09:00–18:00 KST",
    disclaimer: "For professional use only. Products may not be available in all markets. REGEN PEEL is for licensed medical professionals only. GANA KA (Kojic Acid 4%) may not comply with EU cosmetic regulations. Product images sourced from official GANA Cosmetic catalogues.",
  },
  detail: {
    allProducts: "← All Products",
    home: "Home", productsCrumb: "Products",
    notFound: "Product not found", backToCatalogue: "← Back to catalogue",
    retailNote: "Retail price shown. Dealer & distributor pricing available separately upon inquiry.",
    inquireBtn: "Inquire about this product →",
    keyActives: "Key Actives", specifications: "Specifications",
    specCategory: "Category", specVolume: "Volume / Packaging", specRetail: "Retail (USD)", specLabel: "Label",
    specNote: "Full INCI disclosure, regulatory documentation, and wholesale pricing available upon inquiry.",
    relatedIn: "Related in {cat}",
  },
  cats: {
    "Skin Booster": "Skin Booster",
    "Meso Solution": "Meso Solution",
    "Chemical Peel": "Chemical Peel",
    "Topical": "Topical",
    "Intimate Care": "Intimate Care",
  },
  badges: {
    "2024 NEW": "2024 NEW", "2025 NEW": "2025 NEW", "FDA + CPNP": "FDA + CPNP",
    "vs Rejuran": "vs Rejuran", "Hair Specialist": "Hair Specialist", "PDRN": "PDRN",
    "Eye Care": "Eye Care", "Whitening": "Whitening", "4× Conc.": "4× Conc.",
    "Recovery": "Recovery", "Brightening": "Brightening", "Coverage": "Coverage",
    "Acne Specialist": "Acne Specialist", "Rx Only": "Rx Only", "Body Care": "Body Care",
    "Sensitive Skin": "Sensitive Skin", "Intimate Care": "Intimate Care",
  },
  prod: {
    "dmp-plus": { tag: "High End Skin Booster", desc: "PLLA + HA + PDRN + Glutathione. Multi-active booster in a ready-to-use prefilled vial." },
    "phv": { tag: "2-Year Lasting Hydration", desc: "High-molecular HA + PLLA biostimulator. Hyaluronidase-correctable for precise control." },
    "eye-booster": { tag: "Full-Face PDRN Revitalizer", desc: "PDRN + Sodium DNA + Glutathione. Targets cellular regeneration across the full face." },
    "tox": { tag: "Topical Neuromodulator", desc: "Argireline 100ppm + PDRN + HA. Spray-applied — no injection required. FDA & EU CPNP." },
    "pnv-plus": { tag: "High-Concentration PDRN", desc: "PDRN 2% — direct clinical alternative to Rejuran. With Glutathione and HA 10mg/cc." },
    "scalp": { tag: "Scalp Regeneration", desc: "PDRN + GHK-Cu targeting hair follicle regeneration and scalp microenvironment." },
    "pnv": { tag: "Low-Concentration PDRN", desc: "Low-concentration PDRN (0.5%) mesotherapy solution with glutathione and cross-linked HA for skin regeneration, whitening, and hydration." },
    "eye": { tag: "Eye Bag & Dark Circle Solution", desc: "Targeted meso solution for under-eye bags and dark circles, formulated with carnitine and acetyl tetrapeptide-5." },
    "cocktail": { tag: "Whitening Meso Cocktail", desc: "Dual-vial whitening program — glutathione and vitamin C (ascorbic acid), applied on alternating weeks. Never mixed together." },
    "tc-plus": { tag: "Post-Procedure Recovery", desc: "4× concentrated PDRN topical with PHA + peptides. Premium post-treatment care." },
    "tc": { tag: "Daily Recovery Ointment", desc: "Daily PDRN + PHA + peptide ointment for skin rejuvenation, gentle exfoliation, and hydration. Standard strength (TC+ is the 4× version)." },
    "ka": { tag: "Brightening Ointment", desc: "Kojic acid 4% brightening ointment targeting melanin production and uneven tone. Exceeds EU cosmetic limit — non-EU markets only." },
    "bb": { tag: "Treatment BB Cream (SPF 35)", desc: "Post-procedure BB cream with PDRN and SPF 35 — coverage, sun protection, and skin recovery. Shades tuned for European skin." },
    "gino-face": { tag: "Natural Microneedling Peel", desc: "Spongilla spicule-based exfoliation. Globally rare natural micro-needling mechanism." },
    "regen-peel": { tag: "Medical-Grade TCA Peel", desc: "TCA 30% with bicarbonate neutralizer. For licensed medical professionals only." },
    "gino-body": { tag: "Body Microneedling Peel", desc: "Freshwater sponge spicule exfoliation formulated for the body — keratosis pilaris, rough texture, and tone." },
    "pha": { tag: "Gentle PHA Peel", desc: "Polyhydroxy acid peel (PHA 10%) with alpha arbutin — gentle, low-irritation exfoliation and brightening for sensitive, rosacea, and atopic skin." },
    "gyno": { tag: "Intimate Brightening & pH Care", desc: "Intimate area brightening and pH-balance care with glutathione and soy isoflavone. Also soothes dryness." },
  },
};

/* ── Chinese (Simplified) ────────────────────────────────────────────────── */
const zh: Dict = {
  hero: {
    eyebrow: "面向专业人士的药妆解决方案",
    title1: "临床之美，",
    titleEm: "以科学精炼",
    body: "GANA Cosmetic 是通过美国 FDA 注册、配方完成 EU CPNP 备案的制造商，向全球经销商与医美诊所供应 PDRN、PLLA 与 HA 药妆产品。",
    ctaScience: "了解我们的科学 →",
    ctaInquiry: "B2B 咨询",
    badges: ["FDA 注册", "EU CPNP 合规", "GMP 认证"],
  },
  features: [
    { title: "临床级活性成分", text: "高纯度 PDRN、PLLA、HA 与多肽，浓度经过验证，绝无多余添加。" },
    { title: "临床验证", text: "通过 FDA 注册并符合 EU CPNP，在专业医美场景中验证功效与安全性。" },
    { title: "细胞再生", text: "PDRN 与 Sodium DNA 配方，支持 DNA 修复、细胞更新与微生态平衡。" },
    { title: "纯净配方", text: "每款产品全成分（INCI）公开，绝无隐藏混合，原料来源透明。" },
  ],
  stats: {
    eyebrow: "法规资质",
    heading: "通过全球分销认证",
    certs: [
      { title: "FDA 注册", body: "GANA TOX 已完成美国 FDA 化妆品产品备案。" },
      { title: "EU CPNP 合规", body: "部分产品已通过欧盟化妆品备案门户（CPNP）备案。" },
      { title: "GMP 认证", body: "生产工厂依照 GMP（良好生产规范）标准运营。" },
      { title: "ISO 13485", body: "质量管理体系通过医疗器械设计与生产认证。" },
    ],
    noticeLabel: "法规提示：",
    notice: "REGEN PEEL（TCA 30%）仅供持证医疗专业人员使用。GANA KA（Kojic Acid 4%）超出欧盟化妆品法规 1223/2009 限值 —— 在欧盟分销需重新调配。证书可应要求提供。",
  },
  products: {
    label: "药妆系列",
    allLabel: "全部",
    items: "{n} 件",
    ctaEyebrow: "从首尔直达您的诊所",
    ctaTitle1: "全球 B2B 供应，",
    ctaTitleEm: "由制造商直供。",
    ctaButton: "开始洽谈 →",
  },
  contact: {
    eyebrow: "联系我们",
    h2pre: "携手",
    h2em: "GANA Cosmetic",
    body: "无论您是寻求独家区域代理的经销商、寻找稳定供货的诊所，还是 ODM 合作伙伴 —— 我们都会在 48 小时内回复每一封咨询。",
    list: ["经销代理合作", "诊所供货", "ODM / 贴牌代工", "一般咨询"],
    thankTitle: "感谢您",
    thankBody: "我们已收到您的咨询，将在 48 小时内回复。",
    labels: { name: "姓名", company: "公司 / 诊所", email: "邮箱", phone: "电话", country: "国家", type: "咨询类型", message: "留言" },
    selectPlaceholder: "请选择类型",
    typeOptions: { distributor: "经销代理合作", clinic: "诊所供货", odm: "ODM / 贴牌代工", general: "一般咨询" },
    messagePlaceholder: "请描述您的业务与需求…",
    error: "提交出错，请重试或直接发送邮件至 contact@gana-cosmetics.com。",
    submit: "发送咨询 →",
    submitting: "发送中…",
    prefill: "我对 {product} 感兴趣，请提供报价与详情。",
  },
  group: {
    eyebrow: "我们的集团",
    h2pre: "",
    h2em: "GANA Group",
    body: "三家公司，一个使命 —— 将药妆、医疗器械与基因治疗的专长汇聚于同一家韩国企业集团之下。",
    brands: [
      { tag: "医疗器械", desc: "面向医疗美容的真皮填充剂、美塑器械与 ODM 开发。" },
      { tag: "药妆", desc: "临床级化妆品配方，分销至全球诊所与合作伙伴。" },
      { tag: "基因治疗研发", desc: "前沿基因治疗研究与新一代医疗创新。" },
    ],
  },
  footer: {
    tagline: "隶属 GANA Group 的美国 FDA 注册药妆制造商，为全球经销商与医美诊所供货。",
    contactHeading: "联系方式",
    companyHeading: "公司信息",
    labelAddress: "地址", labelTel: "电话", labelEmail: "邮箱",
    labelManufacturer: "制造商", labelFdaNo: "FDA 注册号", labelGroup: "集团", labelHours: "营业时间",
    hoursValue: "周一至周五 09:00–18:00（KST）",
    disclaimer: "仅供专业用途。部分产品可能并非在所有市场供应。REGEN PEEL 仅供持证医疗专业人员使用。GANA KA（Kojic Acid 4%）可能不符合欧盟化妆品法规。产品图片来自 GANA Cosmetic 官方目录。",
  },
  detail: {
    allProducts: "← 全部产品",
    home: "首页", productsCrumb: "产品",
    notFound: "未找到该产品", backToCatalogue: "← 返回目录",
    retailNote: "所示为零售价。经销商与代理价格可另行咨询。",
    inquireBtn: "咨询此产品 →",
    keyActives: "核心活性成分", specifications: "规格参数",
    specCategory: "类别", specVolume: "容量 / 包装", specRetail: "零售价（USD）", specLabel: "标签",
    specNote: "完整成分（INCI）公开、法规文件及批发价格可应要求提供。",
    relatedIn: "{cat} 同类产品",
  },
  cats: {
    "Skin Booster": "皮肤水光",
    "Meso Solution": "美塑（Meso）",
    "Chemical Peel": "化学焕肤",
    "Topical": "外用产品",
    "Intimate Care": "私密护理",
  },
  badges: {
    "2024 NEW": "2024 新品", "2025 NEW": "2025 新品", "FDA + CPNP": "FDA + CPNP",
    "vs Rejuran": "对标 Rejuran", "Hair Specialist": "头皮专研", "PDRN": "PDRN",
    "Eye Care": "眼部护理", "Whitening": "美白", "4× Conc.": "4 倍浓缩",
    "Recovery": "修复", "Brightening": "提亮", "Coverage": "遮瑕",
    "Acne Specialist": "痘肌专研", "Rx Only": "处方专用", "Body Care": "身体护理",
    "Sensitive Skin": "敏感肌", "Intimate Care": "私密护理",
  },
  prod: {
    "dmp-plus": { tag: "高端皮肤水光", desc: "PLLA + HA + PDRN + 谷胱甘肽。预填充即用安瓶，多重活性水光。" },
    "phv": { tag: "长达两年的持久保湿", desc: "高分子 HA + PLLA 生物刺激剂。可用透明质酸酶溶解修正，精准可控。" },
    "eye-booster": { tag: "全脸 PDRN 焕活", desc: "PDRN + Sodium DNA + 谷胱甘肽。针对全脸的细胞再生。" },
    "tox": { tag: "外用神经调节剂", desc: "Argireline 100ppm + PDRN + HA。喷涂使用 —— 无需注射。FDA 与 EU CPNP。" },
    "pnv-plus": { tag: "高浓度 PDRN", desc: "PDRN 2% —— 可直接替代 Rejuran 的临床方案。含谷胱甘肽与 HA 10mg/cc。" },
    "scalp": { tag: "头皮再生", desc: "PDRN + GHK-Cu，针对毛囊再生与头皮微环境。" },
    "pnv": { tag: "低浓度 PDRN", desc: "低浓度 PDRN（0.5%）美塑精华，含谷胱甘肽与交联 HA，用于肌肤再生、美白与保湿。" },
    "eye": { tag: "眼袋与黑眼圈方案", desc: "针对眼袋与黑眼圈的专研美塑精华，含 Carnitine 与 Acetyl Tetrapeptide-5。" },
    "cocktail": { tag: "美白美塑鸡尾酒", desc: "双安瓶美白方案 —— 谷胱甘肽与维生素 C（抗坏血酸）按周交替使用，切勿混合。" },
    "tc-plus": { tag: "术后修复", desc: "4 倍浓缩 PDRN 外用，搭配 PHA + 多肽。高端术后护理。" },
    "tc": { tag: "日常修复软膏", desc: "日常 PDRN + PHA + 多肽软膏，用于肌肤焕活、温和去角质与保湿。标准浓度（TC+ 为 4 倍版本）。" },
    "ka": { tag: "提亮软膏", desc: "Kojic Acid 4% 提亮软膏，针对黑色素生成与肤色不均。超出欧盟化妆品限值 —— 仅限非欧盟市场。" },
    "bb": { tag: "修护 BB 霜（SPF 35）", desc: "术后 BB 霜，含 PDRN 与 SPF 35 —— 遮瑕、防晒与肌肤修护。色号为欧洲肤色调校。" },
    "gino-face": { tag: "天然微针焕肤", desc: "基于淡水海绵骨针的去角质，全球罕见的天然微针机制。" },
    "regen-peel": { tag: "医疗级 TCA 焕肤", desc: "TCA 30% 配碳酸氢盐中和剂。仅供持证医疗专业人员使用。" },
    "gino-body": { tag: "身体微针焕肤", desc: "淡水海绵骨针去角质，专为身体配方 —— 改善毛周角化、粗糙肤质与肤色。" },
    "pha": { tag: "温和 PHA 焕肤", desc: "多羟基酸焕肤（PHA 10%）搭配 Alpha Arbutin —— 温和低刺激去角质与提亮，适合敏感、玫瑰痤疮及特应性肌肤。" },
    "gyno": { tag: "私密提亮与 pH 护理", desc: "私密部位提亮与 pH 平衡护理，含谷胱甘肽与大豆异黄酮，亦可舒缓干燥。" },
  },
};

/* ── Thai ────────────────────────────────────────────────────────────────── */
const th: Dict = {
  hero: {
    eyebrow: "โซลูชันเวชสำอางสำหรับมืออาชีพ",
    title1: "ความงามเชิงคลินิก",
    titleEm: "กลั่นกรองด้วยวิทยาศาสตร์",
    body: "GANA Cosmetic เป็นผู้ผลิตที่จดทะเบียนกับ FDA สหรัฐฯ และมีสูตรที่แจ้ง EU CPNP — จัดส่งเวชสำอาง PDRN, PLLA และ HA ให้แก่ผู้จัดจำหน่ายและคลินิกความงามทั่วโลก",
    ctaScience: "ค้นพบวิทยาศาสตร์ของเรา →",
    ctaInquiry: "สอบถาม B2B",
    badges: ["จดทะเบียน FDA", "เป็นไปตาม EU CPNP", "ได้รับรอง GMP"],
  },
  features: [
    { title: "สารออกฤทธิ์เกรดคลินิก", text: "PDRN, PLLA, HA และเปปไทด์บริสุทธิ์สูงในความเข้มข้นที่ผ่านการตรวจสอบ ไม่มีสารปรุงแต่งที่ไม่จำเป็น" },
    { title: "ผ่านการทดสอบทางคลินิก", text: "จดทะเบียน FDA และเป็นไปตาม EU CPNP ทดสอบประสิทธิภาพและความปลอดภัยในสภาพแวดล้อมความงามระดับมืออาชีพ" },
    { title: "การฟื้นฟูระดับเซลล์", text: "สูตร PDRN และ Sodium DNA ที่ช่วยซ่อมแซม DNA การผลัดเซลล์ และสมดุลไมโครไบโอม" },
    { title: "สูตรสะอาดบริสุทธิ์", text: "เปิดเผยส่วนผสม (INCI) ครบถ้วนในทุกผลิตภัณฑ์ ไม่มีส่วนผสมที่ซ่อนเร้น แหล่งที่มาของวัตถุดิบโปร่งใส" },
  ],
  stats: {
    eyebrow: "สถานะด้านกฎระเบียบ",
    heading: "ได้รับการรับรองเพื่อการจัดจำหน่ายทั่วโลก",
    certs: [
      { title: "การจดทะเบียน FDA", body: "GANA TOX จดทะเบียนภายใต้การแจ้งผลิตภัณฑ์เครื่องสำอางของ FDA สหรัฐฯ" },
      { title: "เป็นไปตาม EU CPNP", body: "ผลิตภัณฑ์ที่เลือกได้แจ้งผ่านพอร์ทัลแจ้งผลิตภัณฑ์เครื่องสำอางของสหภาพยุโรป (CPNP)" },
      { title: "ได้รับรอง GMP", body: "โรงงานผลิตดำเนินงานภายใต้มาตรฐาน GMP (หลักเกณฑ์วิธีการที่ดีในการผลิต)" },
      { title: "ISO 13485", body: "ระบบบริหารคุณภาพได้รับการรับรองสำหรับการออกแบบและผลิตเครื่องมือแพทย์" },
    ],
    noticeLabel: "ประกาศด้านกฎระเบียบ:",
    notice: "REGEN PEEL (TCA 30%) สำหรับบุคลากรทางการแพทย์ที่มีใบอนุญาตเท่านั้น GANA KA (Kojic Acid 4%) เกินขีดจำกัดของกฎระเบียบเครื่องสำอางสหภาพยุโรป 1223/2009 — การจัดจำหน่ายใน EU ต้องปรับสูตรใหม่ มีใบรับรองให้เมื่อร้องขอ",
  },
  products: {
    label: "เวชสำอาง",
    allLabel: "ทั้งหมด",
    items: "{n} รายการ",
    ctaEyebrow: "จากโซลถึงคลินิกของคุณ",
    ctaTitle1: "การจัดส่ง B2B ทั่วโลก",
    ctaTitleEm: "ตรงจากผู้ผลิต",
    ctaButton: "เริ่มพูดคุย →",
  },
  contact: {
    eyebrow: "ติดต่อเรา",
    h2pre: "ร่วมเป็นพันธมิตรกับ",
    h2em: "GANA Cosmetic",
    body: "ไม่ว่าคุณจะเป็นผู้จัดจำหน่ายที่มองหาสิทธิ์ในพื้นที่แต่เพียงผู้เดียว คลินิกที่ต้องการแหล่งจัดหาที่เชื่อถือได้ หรือพันธมิตร ODM — เราตอบทุกคำถามภายใน 48 ชั่วโมง",
    list: ["พันธมิตรผู้จัดจำหน่าย", "จัดส่งให้คลินิก", "ODM / Private Label", "สอบถามทั่วไป"],
    thankTitle: "ขอบคุณ",
    thankBody: "เราได้รับคำถามของคุณแล้ว และจะตอบกลับภายใน 48 ชั่วโมง",
    labels: { name: "ชื่อ", company: "บริษัท / คลินิก", email: "อีเมล", phone: "โทรศัพท์", country: "ประเทศ", type: "ประเภทการสอบถาม", message: "ข้อความ" },
    selectPlaceholder: "เลือกประเภท",
    typeOptions: { distributor: "พันธมิตรผู้จัดจำหน่าย", clinic: "จัดส่งให้คลินิก", odm: "ODM / Private Label", general: "สอบถามทั่วไป" },
    messagePlaceholder: "อธิบายธุรกิจและความต้องการของคุณ…",
    error: "เกิดข้อผิดพลาด กรุณาลองใหม่ หรือส่งอีเมลถึงเราโดยตรงที่ contact@gana-cosmetics.com",
    submit: "ส่งคำถาม →",
    submitting: "กำลังส่ง…",
    prefill: "ฉันสนใจ {product} กรุณาส่งราคาและรายละเอียด",
  },
  group: {
    eyebrow: "กลุ่มบริษัทของเรา",
    h2pre: "",
    h2em: "GANA Group",
    body: "สามบริษัท หนึ่งพันธกิจ — ผสานความเชี่ยวชาญด้านเวชสำอาง เครื่องมือแพทย์ และยีนบำบัด ไว้ภายใต้กลุ่มบริษัทเกาหลีเดียวกัน",
    brands: [
      { tag: "เครื่องมือแพทย์", desc: "ฟิลเลอร์ผิวหนัง อุปกรณ์เมโสเทอราพี และการพัฒนา ODM สำหรับเวชศาสตร์ความงาม" },
      { tag: "เวชสำอาง", desc: "สูตรเครื่องสำอางเกรดคลินิก จัดจำหน่ายสู่คลินิกและพันธมิตรทั่วโลก" },
      { tag: "วิจัยและพัฒนายีนบำบัด", desc: "การวิจัยยีนบำบัดล้ำสมัยและนวัตกรรมการแพทย์ยุคใหม่" },
    ],
  },
  footer: {
    tagline: "ผู้ผลิตเวชสำอางที่จดทะเบียน FDA สหรัฐฯ ภายในกลุ่ม GANA Group จัดส่งให้ผู้จัดจำหน่ายและคลินิกความงามทั่วโลก",
    contactHeading: "ติดต่อ",
    companyHeading: "ข้อมูลบริษัท",
    labelAddress: "ที่อยู่", labelTel: "โทรศัพท์", labelEmail: "อีเมล",
    labelManufacturer: "ผู้ผลิต", labelFdaNo: "เลขจดทะเบียน FDA", labelGroup: "กลุ่มบริษัท", labelHours: "เวลาทำการ",
    hoursValue: "จันทร์–ศุกร์ 09:00–18:00 (KST)",
    disclaimer: "สำหรับใช้งานโดยมืออาชีพเท่านั้น ผลิตภัณฑ์อาจไม่มีจำหน่ายในทุกตลาด REGEN PEEL สำหรับบุคลากรทางการแพทย์ที่มีใบอนุญาตเท่านั้น GANA KA (Kojic Acid 4%) อาจไม่เป็นไปตามกฎระเบียบเครื่องสำอางของสหภาพยุโรป ภาพผลิตภัณฑ์มาจากแคตตาล็อกอย่างเป็นทางการของ GANA Cosmetic",
  },
  detail: {
    allProducts: "← ผลิตภัณฑ์ทั้งหมด",
    home: "หน้าแรก", productsCrumb: "ผลิตภัณฑ์",
    notFound: "ไม่พบผลิตภัณฑ์", backToCatalogue: "← กลับไปที่แคตตาล็อก",
    retailNote: "ราคาที่แสดงเป็นราคาขายปลีก ราคาสำหรับตัวแทนจำหน่ายและผู้จัดจำหน่ายสอบถามแยกต่างหาก",
    inquireBtn: "สอบถามผลิตภัณฑ์นี้ →",
    keyActives: "สารออกฤทธิ์หลัก", specifications: "ข้อมูลจำเพาะ",
    specCategory: "หมวดหมู่", specVolume: "ปริมาตร / บรรจุภัณฑ์", specRetail: "ขายปลีก (USD)", specLabel: "ป้ายกำกับ",
    specNote: "การเปิดเผยส่วนผสม (INCI) ครบถ้วน เอกสารด้านกฎระเบียบ และราคาขายส่ง มีให้เมื่อร้องขอ",
    relatedIn: "ผลิตภัณฑ์ที่เกี่ยวข้องใน {cat}",
  },
  cats: {
    "Skin Booster": "สกินบูสเตอร์",
    "Meso Solution": "เมโสเทอราพี",
    "Chemical Peel": "เคมิคอลพีล",
    "Topical": "ผลิตภัณฑ์ทาภายนอก",
    "Intimate Care": "ดูแลจุดซ่อนเร้น",
  },
  badges: {
    "2024 NEW": "ใหม่ 2024", "2025 NEW": "ใหม่ 2025", "FDA + CPNP": "FDA + CPNP",
    "vs Rejuran": "เทียบ Rejuran", "Hair Specialist": "ผู้เชี่ยวชาญเส้นผม", "PDRN": "PDRN",
    "Eye Care": "ดูแลรอบดวงตา", "Whitening": "ผิวกระจ่างใส", "4× Conc.": "เข้มข้น 4 เท่า",
    "Recovery": "ฟื้นฟู", "Brightening": "กระจ่างใส", "Coverage": "ปกปิด",
    "Acne Specialist": "ผู้เชี่ยวชาญสิว", "Rx Only": "ตามใบสั่งแพทย์", "Body Care": "ดูแลผิวกาย",
    "Sensitive Skin": "ผิวแพ้ง่าย", "Intimate Care": "ดูแลจุดซ่อนเร้น",
  },
  prod: {
    "dmp-plus": { tag: "สกินบูสเตอร์ระดับไฮเอนด์", desc: "PLLA + HA + PDRN + Glutathione บูสเตอร์มัลติแอคทีฟในไวอัลพร้อมใช้แบบเติมสำเร็จ" },
    "phv": { tag: "ความชุ่มชื้นยาวนาน 2 ปี", desc: "ไบโอสติมูเลเตอร์ HA โมเลกุลสูง + PLLA แก้ไขได้ด้วยไฮยาลูโรนิเดสเพื่อการควบคุมที่แม่นยำ" },
    "eye-booster": { tag: "ฟื้นฟูทั้งใบหน้าด้วย PDRN", desc: "PDRN + Sodium DNA + Glutathione มุ่งเป้าการฟื้นฟูระดับเซลล์ทั่วทั้งใบหน้า" },
    "tox": { tag: "นิวโรโมดูเลเตอร์แบบทาภายนอก", desc: "Argireline 100ppm + PDRN + HA ใช้แบบสเปรย์ — ไม่ต้องฉีด FDA และ EU CPNP" },
    "pnv-plus": { tag: "PDRN ความเข้มข้นสูง", desc: "PDRN 2% — ทางเลือกเชิงคลินิกที่ทดแทน Rejuran ได้โดยตรง พร้อม Glutathione และ HA 10mg/cc" },
    "scalp": { tag: "ฟื้นฟูหนังศีรษะ", desc: "PDRN + GHK-Cu มุ่งเป้าการฟื้นฟูรูขุมขนและสภาพแวดล้อมของหนังศีรษะ" },
    "pnv": { tag: "PDRN ความเข้มข้นต่ำ", desc: "เมโสโซลูชัน PDRN ความเข้มข้นต่ำ (0.5%) พร้อม Glutathione และ HA แบบครอสลิงก์ เพื่อการฟื้นฟูผิว กระจ่างใส และชุ่มชื้น" },
    "eye": { tag: "โซลูชันถุงใต้ตาและรอยคล้ำ", desc: "เมโสโซลูชันเฉพาะจุดสำหรับถุงใต้ตาและรอยคล้ำ ด้วย Carnitine และ Acetyl Tetrapeptide-5" },
    "cocktail": { tag: "เมโสค็อกเทลเพื่อความกระจ่างใส", desc: "โปรแกรมความกระจ่างใสแบบสองไวอัล — Glutathione และวิตามินซี (Ascorbic Acid) ใช้สลับสัปดาห์ ห้ามผสมรวมกัน" },
    "tc-plus": { tag: "ฟื้นฟูหลังหัตถการ", desc: "PDRN เข้มข้น 4 เท่าแบบทาภายนอก พร้อม PHA + เปปไทด์ การดูแลหลังการรักษาระดับพรีเมียม" },
    "tc": { tag: "ขี้ผึ้งฟื้นฟูประจำวัน", desc: "ขี้ผึ้ง PDRN + PHA + เปปไทด์สำหรับใช้ประจำวัน เพื่อฟื้นฟูผิว ผลัดเซลล์อย่างอ่อนโยน และเพิ่มความชุ่มชื้น ความเข้มข้นมาตรฐาน (TC+ คือรุ่น 4 เท่า)" },
    "ka": { tag: "ขี้ผึ้งเพื่อผิวกระจ่างใส", desc: "ขี้ผึ้ง Kojic Acid 4% มุ่งเป้าการผลิตเมลานินและสีผิวไม่สม่ำเสมอ เกินขีดจำกัดเครื่องสำอาง EU — เฉพาะตลาดนอก EU เท่านั้น" },
    "bb": { tag: "BB ครีมบำรุง (SPF 35)", desc: "BB ครีมหลังหัตถการ พร้อม PDRN และ SPF 35 — ปกปิด ป้องกันแดด และฟื้นฟูผิว เฉดสีปรับสำหรับผิวยุโรป" },
    "gino-face": { tag: "ไมโครนีดดลิงพีลจากธรรมชาติ", desc: "การผลัดเซลล์ด้วยสปิคูลจากฟองน้ำ กลไกไมโครนีดดลิงจากธรรมชาติที่หาได้ยากทั่วโลก" },
    "regen-peel": { tag: "TCA พีลเกรดการแพทย์", desc: "TCA 30% พร้อมตัวทำให้เป็นกลางไบคาร์บอเนต สำหรับบุคลากรทางการแพทย์ที่มีใบอนุญาตเท่านั้น" },
    "gino-body": { tag: "ไมโครนีดดลิงพีลสำหรับร่างกาย", desc: "การผลัดเซลล์ด้วยสปิคูลฟองน้ำน้ำจืด สูตรสำหรับร่างกาย — ขนคุด ผิวหยาบกร้าน และสีผิว" },
    "pha": { tag: "PHA พีลอ่อนโยน", desc: "พีลกรดโพลีไฮดรอกซี (PHA 10%) พร้อม Alpha Arbutin — ผลัดเซลล์อย่างอ่อนโยน ระคายเคืองต่ำ และเพิ่มความกระจ่างใส สำหรับผิวแพ้ง่าย โรซาเชีย และภูมิแพ้" },
    "gyno": { tag: "ความกระจ่างใสจุดซ่อนเร้นและดูแลค่า pH", desc: "ความกระจ่างใสบริเวณจุดซ่อนเร้นและดูแลสมดุล pH ด้วย Glutathione และ Soy Isoflavone ช่วยลดความแห้งกร้านด้วย" },
  },
};

/* ── Vietnamese ──────────────────────────────────────────────────────────── */
const vi: Dict = {
  hero: {
    eyebrow: "Giải pháp dược mỹ phẩm cho chuyên gia",
    title1: "Vẻ đẹp lâm sàng,",
    titleEm: "tinh luyện bằng khoa học",
    body: "GANA Cosmetic là nhà sản xuất đã đăng ký FDA Hoa Kỳ với các công thức được thông báo EU CPNP — cung cấp dược mỹ phẩm PDRN, PLLA và HA cho các nhà phân phối và phòng khám thẩm mỹ trên toàn thế giới.",
    ctaScience: "Khám phá khoa học của chúng tôi →",
    ctaInquiry: "Liên hệ B2B",
    badges: ["Đã đăng ký FDA", "Tuân thủ EU CPNP", "Chứng nhận GMP"],
  },
  features: [
    { title: "Hoạt chất cấp lâm sàng", text: "PDRN, PLLA, HA và peptide độ tinh khiết cao ở nồng độ đã được kiểm chứng. Không phụ gia thừa." },
    { title: "Đã kiểm nghiệm lâm sàng", text: "Đăng ký FDA và tuân thủ EU CPNP. Được kiểm nghiệm về hiệu quả và độ an toàn trong môi trường thẩm mỹ chuyên nghiệp." },
    { title: "Tái tạo tế bào", text: "Công thức PDRN và Sodium DNA hỗ trợ sửa chữa DNA, tái tạo tế bào và cân bằng hệ vi sinh." },
    { title: "Công thức sạch", text: "Công bố đầy đủ thành phần (INCI) trên mọi sản phẩm. Không pha trộn ẩn. Nguồn nguyên liệu minh bạch." },
  ],
  stats: {
    eyebrow: "Vị thế pháp lý",
    heading: "Được chứng nhận để phân phối toàn cầu",
    certs: [
      { title: "Đăng ký FDA", body: "GANA TOX được đăng ký theo thông báo sản phẩm mỹ phẩm của FDA Hoa Kỳ." },
      { title: "Tuân thủ EU CPNP", body: "Các sản phẩm chọn lọc được thông báo qua Cổng thông báo sản phẩm mỹ phẩm EU (CPNP)." },
      { title: "Chứng nhận GMP", body: "Nhà máy sản xuất vận hành theo tiêu chuẩn GMP (Thực hành sản xuất tốt)." },
      { title: "ISO 13485", body: "Hệ thống quản lý chất lượng được chứng nhận cho thiết kế và sản xuất thiết bị y tế." },
    ],
    noticeLabel: "Lưu ý pháp lý:",
    notice: "REGEN PEEL (TCA 30%) chỉ dành cho chuyên gia y tế có giấy phép. GANA KA (Kojic Acid 4%) vượt giới hạn của Quy định Mỹ phẩm EU 1223/2009 — phân phối tại EU cần điều chỉnh công thức. Có thể cung cấp chứng nhận khi có yêu cầu.",
  },
  products: {
    label: "Dược mỹ phẩm",
    allLabel: "Tất cả",
    items: "{n} sản phẩm",
    ctaEyebrow: "Từ Seoul đến phòng khám của bạn",
    ctaTitle1: "Cung ứng B2B toàn cầu,",
    ctaTitleEm: "trực tiếp từ nhà sản xuất.",
    ctaButton: "Bắt đầu trao đổi →",
  },
  contact: {
    eyebrow: "Liên hệ",
    h2pre: "Hợp tác cùng",
    h2em: "GANA Cosmetic",
    body: "Dù bạn là nhà phân phối tìm kiếm quyền khu vực độc quyền, phòng khám cần nguồn cung đáng tin cậy, hay đối tác ODM — chúng tôi phản hồi mọi yêu cầu trong vòng 48 giờ.",
    list: ["Hợp tác phân phối", "Cung ứng phòng khám", "ODM / Nhãn hàng riêng", "Liên hệ chung"],
    thankTitle: "Cảm ơn bạn",
    thankBody: "Chúng tôi đã nhận được yêu cầu của bạn và sẽ phản hồi trong vòng 48 giờ.",
    labels: { name: "Họ tên", company: "Công ty / Phòng khám", email: "Email", phone: "Điện thoại", country: "Quốc gia", type: "Loại yêu cầu", message: "Lời nhắn" },
    selectPlaceholder: "Chọn loại",
    typeOptions: { distributor: "Hợp tác phân phối", clinic: "Cung ứng phòng khám", odm: "ODM / Nhãn hàng riêng", general: "Liên hệ chung" },
    messagePlaceholder: "Mô tả doanh nghiệp và nhu cầu của bạn…",
    error: "Đã xảy ra lỗi. Vui lòng thử lại hoặc gửi email trực tiếp cho chúng tôi tại contact@gana-cosmetics.com.",
    submit: "Gửi yêu cầu →",
    submitting: "Đang gửi…",
    prefill: "Tôi quan tâm đến {product}. Vui lòng gửi báo giá và chi tiết.",
  },
  group: {
    eyebrow: "Tập đoàn của chúng tôi",
    h2pre: "",
    h2em: "GANA Group",
    body: "Ba công ty, một sứ mệnh — kết hợp chuyên môn về dược mỹ phẩm, thiết bị y tế và liệu pháp gen trong một tập đoàn Hàn Quốc duy nhất.",
    brands: [
      { tag: "Thiết bị y tế", desc: "Chất làm đầy da, thiết bị meso và phát triển ODM cho thẩm mỹ y khoa." },
      { tag: "Dược mỹ phẩm", desc: "Công thức mỹ phẩm cấp lâm sàng, phân phối đến phòng khám và đối tác trên toàn thế giới." },
      { tag: "R&D liệu pháp gen", desc: "Nghiên cứu liệu pháp gen tiên tiến và đổi mới y tế thế hệ mới." },
    ],
  },
  footer: {
    tagline: "Nhà sản xuất dược mỹ phẩm đã đăng ký FDA Hoa Kỳ thuộc GANA Group. Cung ứng cho các nhà phân phối và phòng khám thẩm mỹ trên toàn thế giới.",
    contactHeading: "Liên hệ",
    companyHeading: "Công ty",
    labelAddress: "Địa chỉ", labelTel: "Điện thoại", labelEmail: "Email",
    labelManufacturer: "Nhà sản xuất", labelFdaNo: "Số đăng ký FDA", labelGroup: "Tập đoàn", labelHours: "Giờ làm việc",
    hoursValue: "Thứ Hai–Thứ Sáu 09:00–18:00 (KST)",
    disclaimer: "Chỉ dành cho mục đích chuyên nghiệp. Sản phẩm có thể không có sẵn ở mọi thị trường. REGEN PEEL chỉ dành cho chuyên gia y tế có giấy phép. GANA KA (Kojic Acid 4%) có thể không tuân thủ quy định mỹ phẩm EU. Hình ảnh sản phẩm lấy từ catalogue chính thức của GANA Cosmetic.",
  },
  detail: {
    allProducts: "← Tất cả sản phẩm",
    home: "Trang chủ", productsCrumb: "Sản phẩm",
    notFound: "Không tìm thấy sản phẩm", backToCatalogue: "← Quay lại danh mục",
    retailNote: "Giá hiển thị là giá bán lẻ. Giá cho đại lý và nhà phân phối được cung cấp riêng khi có yêu cầu.",
    inquireBtn: "Hỏi về sản phẩm này →",
    keyActives: "Hoạt chất chính", specifications: "Thông số kỹ thuật",
    specCategory: "Danh mục", specVolume: "Dung tích / Quy cách", specRetail: "Bán lẻ (USD)", specLabel: "Nhãn",
    specNote: "Công bố đầy đủ thành phần (INCI), hồ sơ pháp lý và giá bán sỉ được cung cấp khi có yêu cầu.",
    relatedIn: "Sản phẩm liên quan trong {cat}",
  },
  cats: {
    "Skin Booster": "Skin Booster",
    "Meso Solution": "Dung dịch Meso",
    "Chemical Peel": "Tẩy da hóa học",
    "Topical": "Sản phẩm bôi ngoài",
    "Intimate Care": "Chăm sóc vùng kín",
  },
  badges: {
    "2024 NEW": "MỚI 2024", "2025 NEW": "MỚI 2025", "FDA + CPNP": "FDA + CPNP",
    "vs Rejuran": "so với Rejuran", "Hair Specialist": "Chuyên gia tóc", "PDRN": "PDRN",
    "Eye Care": "Chăm sóc mắt", "Whitening": "Làm trắng", "4× Conc.": "Cô đặc 4×",
    "Recovery": "Phục hồi", "Brightening": "Làm sáng", "Coverage": "Che phủ",
    "Acne Specialist": "Chuyên gia mụn", "Rx Only": "Chỉ theo toa", "Body Care": "Chăm sóc cơ thể",
    "Sensitive Skin": "Da nhạy cảm", "Intimate Care": "Chăm sóc vùng kín",
  },
  prod: {
    "dmp-plus": { tag: "Skin Booster cao cấp", desc: "PLLA + HA + PDRN + Glutathione. Booster đa hoạt chất trong lọ nạp sẵn, dùng ngay." },
    "phv": { tag: "Cấp ẩm bền vững 2 năm", desc: "Chất kích thích sinh học HA phân tử cao + PLLA. Có thể điều chỉnh bằng hyaluronidase để kiểm soát chính xác." },
    "eye-booster": { tag: "Tái tạo toàn mặt bằng PDRN", desc: "PDRN + Sodium DNA + Glutathione. Nhắm đến tái tạo tế bào trên toàn khuôn mặt." },
    "tox": { tag: "Chất điều biến thần kinh bôi ngoài", desc: "Argireline 100ppm + PDRN + HA. Dạng xịt — không cần tiêm. FDA & EU CPNP." },
    "pnv-plus": { tag: "PDRN nồng độ cao", desc: "PDRN 2% — giải pháp lâm sàng thay thế trực tiếp cho Rejuran. Kèm Glutathione và HA 10mg/cc." },
    "scalp": { tag: "Tái tạo da đầu", desc: "PDRN + GHK-Cu nhắm đến tái tạo nang tóc và vi môi trường da đầu." },
    "pnv": { tag: "PDRN nồng độ thấp", desc: "Dung dịch meso PDRN nồng độ thấp (0.5%) với glutathione và HA liên kết chéo, giúp tái tạo da, làm sáng và cấp ẩm." },
    "eye": { tag: "Giải pháp bọng mắt & quầng thâm", desc: "Dung dịch meso chuyên biệt cho bọng mắt và quầng thâm, với carnitine và acetyl tetrapeptide-5." },
    "cocktail": { tag: "Cocktail meso làm sáng", desc: "Chương trình làm sáng hai lọ — glutathione và vitamin C (acid ascorbic), dùng xen kẽ theo tuần. Không bao giờ trộn chung." },
    "tc-plus": { tag: "Phục hồi sau thủ thuật", desc: "PDRN bôi ngoài cô đặc gấp 4 lần với PHA + peptide. Chăm sóc sau điều trị cao cấp." },
    "tc": { tag: "Thuốc mỡ phục hồi hằng ngày", desc: "Thuốc mỡ PDRN + PHA + peptide dùng hằng ngày để trẻ hóa da, tẩy tế bào chết nhẹ nhàng và cấp ẩm. Nồng độ tiêu chuẩn (TC+ là bản gấp 4 lần)." },
    "ka": { tag: "Thuốc mỡ làm sáng", desc: "Thuốc mỡ Kojic Acid 4% nhắm đến sản sinh melanin và tông da không đều. Vượt giới hạn mỹ phẩm EU — chỉ dành cho thị trường ngoài EU." },
    "bb": { tag: "Kem BB điều trị (SPF 35)", desc: "Kem BB sau thủ thuật với PDRN và SPF 35 — che phủ, chống nắng và phục hồi da. Tông màu điều chỉnh cho da châu Âu." },
    "gino-face": { tag: "Tẩy da vi kim tự nhiên", desc: "Tẩy tế bào chết bằng gai bọt biển (spicule). Cơ chế vi kim tự nhiên hiếm có trên thế giới." },
    "regen-peel": { tag: "Tẩy da TCA cấp y khoa", desc: "TCA 30% với chất trung hòa bicarbonate. Chỉ dành cho chuyên gia y tế có giấy phép." },
    "gino-body": { tag: "Tẩy da vi kim cho cơ thể", desc: "Tẩy tế bào chết bằng gai bọt biển nước ngọt, công thức cho cơ thể — dày sừng nang lông, da thô ráp và tông da." },
    "pha": { tag: "Tẩy da PHA dịu nhẹ", desc: "Tẩy da bằng acid polyhydroxy (PHA 10%) với alpha arbutin — tẩy tế bào chết dịu nhẹ, ít kích ứng và làm sáng cho da nhạy cảm, rosacea và da cơ địa." },
    "gyno": { tag: "Làm sáng vùng kín & chăm sóc pH", desc: "Làm sáng vùng kín và cân bằng pH với glutathione và soy isoflavone. Cũng làm dịu khô." },
  },
};

export const translations: Record<Lang, Dict> = { en, zh, th, vi };

/** Replace "{key}" placeholders in a translated string. */
export function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
}
