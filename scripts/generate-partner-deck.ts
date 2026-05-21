/**
 * MS Studio パートナー向け営業資料 PPTX 自動生成スクリプト
 *
 * 実行: npx tsx scripts/generate-partner-deck.ts
 * 出力: ms-studio-partner-deck.pptx
 */

import PptxGenJS from "pptxgenjs";

// ─── Design Tokens ────────────────────────────────────────────
const C = {
  primary: "2563EB",    // blue-600
  primaryDark: "1D4ED8", // blue-700
  accent: "8B5CF6",     // violet-500
  dark: "171717",        // neutral-900
  darkSub: "262626",     // neutral-800
  text: "171717",
  textSub: "525252",     // neutral-600
  textMuted: "737373",   // neutral-500
  white: "FFFFFF",
  bg: "F5F5F5",          // neutral-100
  bgCard: "FAFAFA",      // neutral-50
  border: "E5E5E5",      // neutral-200
  gold: "F59E0B",
  silver: "71717A",
  platinum: "06B6D4",
  legend: "A855F7",
  bronze: "92400E",
  green: "16A34A",
  red: "DC2626",
} as const;

const FONT = "Meiryo";
const FONT_BOLD = "Meiryo";
const SLIDE_W = 13.333;
const SLIDE_H = 7.5;

// ─── Helper ────────────────────────────────────────────────
function addDarkSlide(pptx: PptxGenJS) {
  const slide = pptx.addSlide();
  slide.background = { color: C.dark };
  return slide;
}

function addWhiteSlide(pptx: PptxGenJS) {
  const slide = pptx.addSlide();
  slide.background = { color: C.white };
  return slide;
}

function addLightSlide(pptx: PptxGenJS) {
  const slide = pptx.addSlide();
  slide.background = { color: C.bg };
  return slide;
}

function addPrimarySlide(pptx: PptxGenJS) {
  const slide = pptx.addSlide();
  slide.background = { color: C.primary };
  return slide;
}

type SlideObj = ReturnType<PptxGenJS["addSlide"]>;

function pageNumber(slide: SlideObj, num: number, light = false) {
  slide.addText(String(num).padStart(2, "0"), {
    x: 12.3, y: 7.0, w: 0.8, h: 0.35,
    fontSize: 8, fontFace: FONT, color: light ? "737373" : "A3A3A3",
    align: "right",
  });
}

function eyebrow(slide: SlideObj, text: string, opts: { x?: number; y?: number; color?: string } = {}) {
  slide.addText(text.toUpperCase(), {
    x: opts.x ?? 0.7, y: opts.y ?? 0.5, w: 5, h: 0.3,
    fontSize: 9, fontFace: FONT, bold: true,
    color: opts.color ?? C.primary,
    charSpacing: 3,
  });
}

function sectionTitle(slide: SlideObj, text: string, opts: { x?: number; y?: number; w?: number; color?: string; fontSize?: number } = {}) {
  slide.addText(text, {
    x: opts.x ?? 0.7, y: opts.y ?? 0.85, w: opts.w ?? 11, h: 0.7,
    fontSize: opts.fontSize ?? 28, fontFace: FONT_BOLD, bold: true,
    color: opts.color ?? C.text,
  });
}

function bodyText(slide: SlideObj, text: string, opts: { x?: number; y?: number; w?: number; h?: number; color?: string; fontSize?: number } = {}) {
  slide.addText(text, {
    x: opts.x ?? 0.7, y: opts.y ?? 1.7, w: opts.w ?? 11, h: opts.h ?? 0.8,
    fontSize: opts.fontSize ?? 12, fontFace: FONT,
    color: opts.color ?? C.textSub,
    lineSpacingMultiple: 1.6,
  });
}

function bulletList(slide: SlideObj, items: string[], opts: { x?: number; y?: number; w?: number; h?: number; color?: string; fontSize?: number; bulletColor?: string } = {}) {
  const textItems: PptxGenJS.TextProps[] = items.map((item) => ({
    text: item,
    options: {
      bullet: { type: "bullet" as const, color: opts.bulletColor ?? C.primary },
      fontSize: opts.fontSize ?? 11,
      fontFace: FONT,
      color: opts.color ?? C.text,
      lineSpacingMultiple: 1.8,
      paraSpaceAfter: 4,
    },
  }));
  slide.addText(textItems, {
    x: opts.x ?? 0.7, y: opts.y ?? 2.6, w: opts.w ?? 11, h: opts.h ?? 4,
    valign: "top",
  });
}

function card(slide: SlideObj, opts: { x: number; y: number; w: number; h: number; fill?: string; borderColor?: string }) {
  slide.addShape("rect" as PptxGenJS.ShapeType, {
    x: opts.x, y: opts.y, w: opts.w, h: opts.h,
    fill: { color: opts.fill ?? C.white },
    shadow: { type: "outer", blur: 6, offset: 2, color: "00000015" },
    rectRadius: 0.15,
    line: { color: opts.borderColor ?? C.border, width: 0.5 },
  });
}

function accentBar(slide: SlideObj, opts: { x: number; y: number; w: number; color?: string }) {
  slide.addShape("rect" as PptxGenJS.ShapeType, {
    x: opts.x, y: opts.y, w: opts.w, h: 0.06,
    fill: { color: opts.color ?? C.primary },
    rectRadius: 0.03,
  });
}

// ─── Build Deck ────────────────────────────────────────────

function build() {
  const pptx = new PptxGenJS();
  pptx.layout = "LAYOUT_WIDE";
  pptx.author = "R117 Inc.";
  pptx.company = "R117 Inc.";
  pptx.subject = "MS Studio Partner Program";
  pptx.title = "MS Studio パートナー向け資料";

  slide01_cover(pptx);
  slide02_summary(pptx);
  slide03_market(pptx);
  slide04_whatIs(pptx);
  slide05_cms(pptx);
  slide06_features(pptx);
  slide07_modes(pptx);
  slide08_partnerOverview(pptx);
  slide09_partnerTypes(pptx);
  slide10_whyStock(pptx);
  slide11_revenueRanks(pptx);
  slide12_revenueCalc(pptx);
  slide13_exampleA(pptx);
  slide14_exampleB(pptx);
  slide15_exampleC(pptx);
  slide16_marketplace(pptx);
  slide17_ai(pptx);
  slide18_teamRoles(pptx);
  slide19_usecases(pptx);
  slide20_cases(pptx);
  slide21_pricing(pptx);
  slide22_flow(pptx);
  slide23_faq(pptx);
  slide24_cta(pptx);

  return pptx;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SLIDE 01: Cover
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide01_cover(pptx: PptxGenJS) {
  const slide = addDarkSlide(pptx);

  // Decorative accent bar at top
  slide.addShape("rect" as PptxGenJS.ShapeType, {
    x: 0, y: 0, w: SLIDE_W, h: 0.06,
    fill: { color: C.primary },
  });

  slide.addText("MS Studio", {
    x: 0.7, y: 1.6, w: 8, h: 0.6,
    fontSize: 16, fontFace: FONT, color: C.primary,
    charSpacing: 5, bold: true,
  });

  slide.addText("Partner Program", {
    x: 0.7, y: 2.2, w: 11, h: 1.2,
    fontSize: 44, fontFace: FONT_BOLD, bold: true,
    color: C.white,
  });

  slide.addText("アプリ制作を、あなたの新しいビジネスに。", {
    x: 0.7, y: 3.5, w: 10, h: 0.5,
    fontSize: 16, fontFace: FONT, color: "A3A3A3",
  });

  // Badges
  const badges = ["レベニューシェア最大35%", "登録無料", "CMS標準搭載", "Web / iOS / Android"];
  badges.forEach((b, i) => {
    slide.addShape("roundRect" as PptxGenJS.ShapeType, {
      x: 0.7 + i * 2.8, y: 4.5, w: 2.5, h: 0.4,
      fill: { color: "262626" },
      line: { color: "404040", width: 0.5 },
      rectRadius: 0.2,
    });
    slide.addText(b, {
      x: 0.7 + i * 2.8, y: 4.5, w: 2.5, h: 0.4,
      fontSize: 9, fontFace: FONT, color: C.white, align: "center", bold: true,
    });
  });

  slide.addText("Confidential", {
    x: 0.7, y: 6.5, w: 3, h: 0.3,
    fontSize: 8, fontFace: FONT, color: "525252",
  });

  slide.addText("R117 Inc. / 2026", {
    x: 0.7, y: 6.8, w: 3, h: 0.3,
    fontSize: 8, fontFace: FONT, color: "525252",
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SLIDE 02: Executive Summary
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide02_summary(pptx: PptxGenJS) {
  const slide = addWhiteSlide(pptx);
  pageNumber(slide, 2);
  eyebrow(slide, "Executive Summary");
  sectionTitle(slide, "この資料で分かること");

  const items = [
    "MS Studioの製品概要と、他にはないCMSの強み",
    "パートナー制度の全体像（制作 / 紹介 / テンプレート販売）",
    "レベニューシェア制度と5段階ランク（最大35%還元）",
    "3つのペルソナ別・収益シミュレーション",
    "マーケットプレイスやAI支援で広がる追加収益の機会",
    "パートナー登録までの流れと、今すぐ始める方法",
  ];

  items.forEach((item, i) => {
    const y = 2.0 + i * 0.75;
    slide.addShape("roundRect" as PptxGenJS.ShapeType, {
      x: 0.7, y, w: 11.9, h: 0.6,
      fill: { color: i % 2 === 0 ? C.bgCard : C.white },
      rectRadius: 0.1,
      line: { color: C.border, width: 0.5 },
    });
    slide.addText(String(i + 1), {
      x: 0.9, y, w: 0.5, h: 0.6,
      fontSize: 14, fontFace: FONT_BOLD, bold: true, color: C.primary, align: "center",
    });
    slide.addText(item, {
      x: 1.5, y, w: 10, h: 0.6,
      fontSize: 12, fontFace: FONT, color: C.text, valign: "middle",
    });
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SLIDE 03: Market Challenge
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide03_market(pptx: PptxGenJS) {
  const slide = addLightSlide(pptx);
  pageNumber(slide, 3);
  eyebrow(slide, "Market Challenge");
  sectionTitle(slide, "アプリ制作市場の課題");

  const challenges = [
    { title: "高コスト・長期間", desc: "スクラッチ開発は数百万〜数千万円、半年以上かかるのが当たり前。中小企業や個人には手が届かない。", icon: "💰" },
    { title: "作って終わり問題", desc: "リリース後の運用・更新が属人化し、コンテンツが止まる。制作会社への追加費用も膨らむ一方。", icon: "🔒" },
    { title: "制作会社のビジネスモデル変革", desc: "AI時代に、受注→制作→納品の「フロー型」だけでは生き残れない。継続収益モデルが必須に。", icon: "🔄" },
  ];

  challenges.forEach((c, i) => {
    const x = 0.7 + i * 4.1;
    card(slide, { x, y: 2.0, w: 3.8, h: 4.5 });
    slide.addText(c.icon, { x, y: 2.2, w: 3.8, h: 0.7, fontSize: 32, align: "center" });
    slide.addText(c.title, {
      x: x + 0.3, y: 3.0, w: 3.2, h: 0.5,
      fontSize: 15, fontFace: FONT_BOLD, bold: true, color: C.text, align: "center",
    });
    slide.addText(c.desc, {
      x: x + 0.3, y: 3.6, w: 3.2, h: 2.5,
      fontSize: 11, fontFace: FONT, color: C.textSub, lineSpacingMultiple: 1.7,
    });
  });

  slide.addShape("roundRect" as PptxGenJS.ShapeType, {
    x: 2.5, y: 6.7, w: 8.3, h: 0.5,
    fill: { color: C.primary },
    rectRadius: 0.25,
  });
  slide.addText("→ MS Studioは、これらすべてを解決するプラットフォームです", {
    x: 2.5, y: 6.7, w: 8.3, h: 0.5,
    fontSize: 12, fontFace: FONT_BOLD, bold: true, color: C.white, align: "center",
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SLIDE 04: What is MS Studio
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide04_whatIs(pptx: PptxGenJS) {
  const slide = addWhiteSlide(pptx);
  pageNumber(slide, 4);
  eyebrow(slide, "Product Overview");
  sectionTitle(slide, "MS Studioとは？");
  bodyText(slide, "真のノーコード × 最強CMS を備えた、次世代型アプリ制作プラットフォーム。\nWebアプリ・iOSアプリ・Androidアプリを、CMS付きで構築・運用できます。");

  const pillars = [
    { title: "アプリを作る", desc: "Web / iOS / Androidに対応。標準機能を組み合わせて、低コスト・短納期でアプリを制作。", color: C.primary },
    { title: "アプリを運用する", desc: "CMS標準搭載。投稿、通知、会員管理、予約、チャット等を管理画面から誰でも更新可能。", color: C.accent },
    { title: "アプリビジネスを作る", desc: "パートナー制度で制作会社・代理店・クリエイターがアプリビジネスを展開し継続収益を得られる。", color: C.green },
  ];

  pillars.forEach((p, i) => {
    const x = 0.7 + i * 4.1;
    card(slide, { x, y: 3.2, w: 3.8, h: 3.5 });
    accentBar(slide, { x: x + 0.3, y: 3.4, w: 3.2, color: p.color });
    slide.addText(p.title, {
      x: x + 0.3, y: 3.7, w: 3.2, h: 0.5,
      fontSize: 16, fontFace: FONT_BOLD, bold: true, color: C.text,
    });
    slide.addText(p.desc, {
      x: x + 0.3, y: 4.3, w: 3.2, h: 2,
      fontSize: 11, fontFace: FONT, color: C.textSub, lineSpacingMultiple: 1.7,
    });
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SLIDE 05: CMS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide05_cms(pptx: PptxGenJS) {
  const slide = addWhiteSlide(pptx);
  pageNumber(slide, 5);
  eyebrow(slide, "CMS / Dashboard");
  sectionTitle(slide, "アプリは、リリースしてからが本番。");
  bodyText(slide, "MS Studioは、アプリを作るだけでなく、リリース後の更新・運用まで管理できるCMSを標準提供。\nプログラミング不要で、管理画面から日々の情報更新や運用管理が可能です。");

  const cmsFeatures = [
    "投稿コンテンツの追加・編集", "固定ページの管理",
    "プッシュ通知の配信", "会員管理・セグメント",
    "予約管理", "チャット対応",
    "アンケート配信", "クーポン発行",
    "ファイル管理", "アプリ画面のプレビュー",
    "分析ダッシュボード", "権限ロール設定",
  ];

  cmsFeatures.forEach((f, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.7 + col * 4.1;
    const y = 3.2 + row * 0.8;
    slide.addText("✓", {
      x, y, w: 0.3, h: 0.5,
      fontSize: 12, fontFace: FONT, color: C.primary, bold: true,
    });
    slide.addText(f, {
      x: x + 0.35, y, w: 3.5, h: 0.5,
      fontSize: 11, fontFace: FONT, color: C.text, valign: "middle",
    });
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SLIDE 06: Features
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide06_features(pptx: PptxGenJS) {
  const slide = addLightSlide(pptx);
  pageNumber(slide, 6);
  eyebrow(slide, "All-in-one Features");
  sectionTitle(slide, "アプリ運用に必要な機能を、標準搭載。");

  const groups = [
    { label: "情報発信", items: ["投稿コンテンツ", "固定コンテンツ", "プッシュ通知", "ポップアップ", "Webビュー", "SNSリンク"], color: C.primary },
    { label: "会員・ユーザー管理", items: ["会員管理", "ログイン", "権限管理", "セグメント配信"], color: C.accent },
    { label: "コミュニケーション", items: ["チャット", "問い合わせ", "アンケート", "スタンプ", "クーポン"], color: C.green },
    { label: "コンテンツ管理", items: ["カタログ", "フォトギャラリー", "ムービー", "ファイル管理"], color: "EA580C" },
    { label: "業務支援", items: ["シンプル予約", "予約機能", "マップ", "分析"], color: "0891B2" },
    { label: "拡張機能", items: ["EC", "AI画像生成", "有償アドオン", "カスタム機能", "API連携"], color: C.dark },
  ];

  groups.forEach((g, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.7 + col * 4.1;
    const y = 1.9 + row * 2.8;

    card(slide, { x, y, w: 3.8, h: 2.5 });
    accentBar(slide, { x: x + 0.2, y: y + 0.15, w: 3.4, color: g.color });
    slide.addText(g.label, {
      x: x + 0.3, y: y + 0.35, w: 3.2, h: 0.4,
      fontSize: 12, fontFace: FONT_BOLD, bold: true, color: C.text,
    });
    slide.addText(g.items.join("  /  "), {
      x: x + 0.3, y: y + 0.8, w: 3.2, h: 1.5,
      fontSize: 10, fontFace: FONT, color: C.textSub, lineSpacingMultiple: 1.6,
    });
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SLIDE 07: Modes
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide07_modes(pptx: PptxGenJS) {
  const slide = addWhiteSlide(pptx);
  pageNumber(slide, 7);
  eyebrow(slide, "Two Modes");
  sectionTitle(slide, "初心者にも、プロにも。2つのモード。");

  // Easy mode
  card(slide, { x: 0.7, y: 2.0, w: 5.7, h: 4.8 });
  slide.addText("かんたんモード", {
    x: 1.0, y: 2.2, w: 5, h: 0.5,
    fontSize: 18, fontFace: FONT_BOLD, bold: true, color: C.primary,
  });
  slide.addText("対象: 事業者 / 店舗担当者 / 非エンジニア / 一般の方", {
    x: 1.0, y: 2.8, w: 5, h: 0.4,
    fontSize: 10, fontFace: FONT, color: C.textMuted,
  });
  bulletList(slide, [
    "テンプレートを選んで、ガイドに沿って入力",
    "専門知識不要でアプリ制作・運用が可能",
    "リテラシーの壁を撤廃し、誰でも直感的に",
  ], { x: 1.0, y: 3.4, w: 5, h: 3 });

  // Pro mode
  card(slide, { x: 6.9, y: 2.0, w: 5.7, h: 4.8 });
  slide.addText("プロモード", {
    x: 7.2, y: 2.2, w: 5, h: 0.5,
    fontSize: 18, fontFace: FONT_BOLD, bold: true, color: C.accent,
  });
  slide.addText("対象: 制作会社 / 開発会社 / デザイナー / 代理店", {
    x: 7.2, y: 2.8, w: 5, h: 0.4,
    fontSize: 10, fontFace: FONT, color: C.textMuted,
  });
  bulletList(slide, [
    "詳細な画面設計・カスタムCSS・コード差し込み",
    "テンプレート / コンポーネントの内製・販売",
    "クライアント案件に最適な自由度の高い編集環境",
  ], { x: 7.2, y: 3.4, w: 5, h: 3, bulletColor: C.accent });

  slide.addShape("roundRect" as PptxGenJS.ShapeType, {
    x: 3.5, y: 6.9, w: 6.3, h: 0.45,
    fill: { color: C.bgCard },
    rectRadius: 0.22,
    line: { color: C.border, width: 0.5 },
  });
  slide.addText("パートナーの皆さまは「プロモード」でビジネスを展開いただけます", {
    x: 3.5, y: 6.9, w: 6.3, h: 0.45,
    fontSize: 10, fontFace: FONT_BOLD, bold: true, color: C.accent, align: "center",
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SLIDE 08: Partner Overview
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide08_partnerOverview(pptx: PptxGenJS) {
  const slide = addDarkSlide(pptx);
  pageNumber(slide, 8, true);
  eyebrow(slide, "Partner Program", { color: "60A5FA" });
  sectionTitle(slide, "MS Studio上で、アプリビジネスを始める。", { color: C.white });
  bodyText(slide, "制作会社、開発会社、デザイン会社、個人クリエイター、代理店は、\nMS Studioを活用してアプリ制作サービスを展開できます。", { color: "A3A3A3" });

  const points = [
    "自社クライアント向けにアプリ制作ができる",
    "ライセンス利用料のレベニューシェアを受けられる",
    "テンプレートやコンポーネントを販売できる",
    "パートナーランクに応じて還元率が上がる",
    "エムスタ経済圏内で認知・信用力を獲得できる",
    "AI時代の新しい制作ビジネス環境として活用できる",
  ];

  points.forEach((p, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.7 + col * 6.2;
    const y = 3.2 + row * 1.2;

    slide.addShape("roundRect" as PptxGenJS.ShapeType, {
      x, y, w: 5.8, h: 0.9,
      fill: { color: "262626" },
      rectRadius: 0.1,
      line: { color: "404040", width: 0.5 },
    });
    slide.addText("✓", {
      x: x + 0.2, y, w: 0.4, h: 0.9,
      fontSize: 14, fontFace: FONT, color: "60A5FA", bold: true, valign: "middle",
    });
    slide.addText(p, {
      x: x + 0.6, y, w: 5, h: 0.9,
      fontSize: 12, fontFace: FONT, color: C.white, valign: "middle",
    });
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SLIDE 09: Partner Types
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide09_partnerTypes(pptx: PptxGenJS) {
  const slide = addWhiteSlide(pptx);
  pageNumber(slide, 9);
  eyebrow(slide, "Partner Types");
  sectionTitle(slide, "3つのパートナー種別");

  const types = [
    {
      title: "制作パートナー",
      target: "制作会社 / 開発会社 / デザイナー",
      desc: "プロモードを活用し、クライアント向けアプリを制作。自社の制作メニューに「アプリ制作」を追加できます。",
      bullets: ["自社クライアント向けにアプリ制作", "プロモードで自由度の高い設計", "完成後の運用はクライアントがCMSで自走"],
      color: C.primary,
    },
    {
      title: "紹介パートナー",
      target: "広告代理店 / 営業会社",
      desc: "紹介・販売・アフィリエイトプログラムとして参加できます。",
      bullets: ["紹介経由のアカウントから継続収益", "代理店としてのレベニューシェア獲得", "アフィリエイト経由の獲得も対応"],
      color: C.accent,
    },
    {
      title: "テンプレート/コンポーネント販売",
      target: "デザイナー / クリエイター",
      desc: "自社で制作したデザインパッケージ、コンポーネント、コンテンツの型を販売できます。",
      bullets: ["テンプレート / コンポーネント販売", "業界特化テンプレートも展開可能", "マーケットプレイス上での流通"],
      color: C.dark,
    },
  ];

  types.forEach((t, i) => {
    const x = 0.7 + i * 4.1;
    card(slide, { x, y: 2.0, w: 3.8, h: 5.0 });
    accentBar(slide, { x: x + 0.2, y: 2.15, w: 3.4, color: t.color });

    slide.addText(t.title, {
      x: x + 0.3, y: 2.4, w: 3.2, h: 0.4,
      fontSize: 14, fontFace: FONT_BOLD, bold: true, color: C.text,
    });
    slide.addText(t.target, {
      x: x + 0.3, y: 2.85, w: 3.2, h: 0.3,
      fontSize: 9, fontFace: FONT, color: C.textMuted,
    });
    slide.addText(t.desc, {
      x: x + 0.3, y: 3.25, w: 3.2, h: 1.0,
      fontSize: 10, fontFace: FONT, color: C.textSub, lineSpacingMultiple: 1.6,
    });

    t.bullets.forEach((b, bi) => {
      slide.addText(`• ${b}`, {
        x: x + 0.3, y: 4.4 + bi * 0.55, w: 3.2, h: 0.4,
        fontSize: 10, fontFace: FONT, color: C.text,
      });
    });
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SLIDE 10: Why Stock Revenue Matters
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide10_whyStock(pptx: PptxGenJS) {
  const slide = addPrimarySlide(pptx);
  pageNumber(slide, 10, true);
  eyebrow(slide, "Revenue Model", { color: "BFDBFE" });
  sectionTitle(slide, "なぜ「ストック収益」が重要なのか", { color: C.white });

  // Left: Flow model (problem)
  card(slide, { x: 0.7, y: 2.2, w: 5.7, h: 4.5, fill: "FFFFFF", borderColor: "FFFFFF" });
  slide.addText("従来の制作会社モデル", {
    x: 1.0, y: 2.4, w: 5, h: 0.4,
    fontSize: 14, fontFace: FONT_BOLD, bold: true, color: C.red,
  });
  slide.addText("フロー型（売り切り）", {
    x: 1.0, y: 2.85, w: 5, h: 0.3,
    fontSize: 10, fontFace: FONT, color: C.textMuted,
  });

  const flowSteps = ["受注", "→", "制作", "→", "納品", "→", "終了"];
  flowSteps.forEach((s, i) => {
    slide.addText(s, {
      x: 1.0 + i * 0.7, y: 3.5, w: 0.6, h: 0.4,
      fontSize: s === "→" ? 14 : 11, fontFace: FONT, bold: s !== "→",
      color: s === "→" ? C.textMuted : C.text, align: "center",
    });
  });

  const problems = ["案件が途切れると売上がゼロになる", "毎月ゼロからの営業が必要", "運用フェーズの収益機会を逃している"];
  problems.forEach((p, i) => {
    slide.addText(`✗ ${p}`, {
      x: 1.0, y: 4.3 + i * 0.55, w: 5, h: 0.4,
      fontSize: 10, fontFace: FONT, color: C.red,
    });
  });

  // Right: Stock model (solution)
  card(slide, { x: 6.9, y: 2.2, w: 5.7, h: 4.5, fill: "FFFFFF", borderColor: "FFFFFF" });
  slide.addText("MS Studio パートナーモデル", {
    x: 7.2, y: 2.4, w: 5, h: 0.4,
    fontSize: 14, fontFace: FONT_BOLD, bold: true, color: C.primaryDark,
  });
  slide.addText("フロー + ストックの二段構え", {
    x: 7.2, y: 2.85, w: 5, h: 0.3,
    fontSize: 10, fontFace: FONT, color: C.textMuted,
  });

  slide.addText("制作費（フロー収入）", {
    x: 7.2, y: 3.4, w: 5, h: 0.4,
    fontSize: 12, fontFace: FONT_BOLD, bold: true, color: C.text,
  });
  slide.addText("+", {
    x: 7.2, y: 3.8, w: 5, h: 0.3,
    fontSize: 14, fontFace: FONT_BOLD, bold: true, color: C.primary,
  });
  slide.addText("月額レベニューシェア（ストック収入）", {
    x: 7.2, y: 4.1, w: 5, h: 0.4,
    fontSize: 12, fontFace: FONT_BOLD, bold: true, color: C.primary,
  });
  slide.addText("+", {
    x: 7.2, y: 4.5, w: 5, h: 0.3,
    fontSize: 14, fontFace: FONT_BOLD, bold: true, color: C.accent,
  });
  slide.addText("テンプレート販売（販売収入）", {
    x: 7.2, y: 4.8, w: 5, h: 0.4,
    fontSize: 12, fontFace: FONT_BOLD, bold: true, color: C.accent,
  });

  slide.addShape("roundRect" as PptxGenJS.ShapeType, {
    x: 7.2, y: 5.5, w: 5, h: 0.8,
    fill: { color: C.bgCard },
    rectRadius: 0.1,
  });
  slide.addText("案件を納品するたびに、\n毎月の収益基盤が積み上がる", {
    x: 7.2, y: 5.5, w: 5, h: 0.8,
    fontSize: 11, fontFace: FONT_BOLD, bold: true, color: C.primaryDark, align: "center",
    lineSpacingMultiple: 1.5,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SLIDE 11: Revenue Share Ranks
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide11_revenueRanks(pptx: PptxGenJS) {
  const slide = addDarkSlide(pptx);
  pageNumber(slide, 11, true);
  eyebrow(slide, "Revenue Share", { color: "60A5FA" });
  sectionTitle(slide, "レベニューシェア ランク制度", { color: C.white });
  bodyText(slide, "公開アプリ数や貢献度に応じて、ランクと還元率が自動的に向上していきます。\nやればやるほど、還元率が上がる仕組みです。", { color: "A3A3A3" });

  const ranks = [
    { name: "Bronze", rate: "15%", color: C.bronze },
    { name: "Silver", rate: "20%", color: C.silver },
    { name: "Gold", rate: "25%", color: C.gold },
    { name: "Platinum", rate: "30%", color: C.platinum },
    { name: "Legend", rate: "35%", color: C.legend },
  ];

  ranks.forEach((r, i) => {
    const x = 0.7 + i * 2.5;
    slide.addShape("roundRect" as PptxGenJS.ShapeType, {
      x, y: 3.5, w: 2.2, h: 2.6,
      fill: { color: "262626" },
      rectRadius: 0.15,
      line: { color: "404040", width: 0.5 },
    });

    // Rank color bar top
    slide.addShape("rect" as PptxGenJS.ShapeType, {
      x, y: 3.5, w: 2.2, h: 0.08,
      fill: { color: r.color },
    });

    slide.addText("★", {
      x, y: 3.8, w: 2.2, h: 0.5,
      fontSize: 20, align: "center", color: r.color,
    });
    slide.addText(r.name, {
      x, y: 4.3, w: 2.2, h: 0.4,
      fontSize: 13, fontFace: FONT_BOLD, bold: true, color: C.white, align: "center",
    });
    slide.addText(r.rate, {
      x, y: 4.8, w: 2.2, h: 0.7,
      fontSize: 32, fontFace: FONT_BOLD, bold: true, color: r.color, align: "center",
    });
    slide.addText("還元", {
      x, y: 5.4, w: 2.2, h: 0.3,
      fontSize: 10, fontFace: FONT, color: "737373", align: "center",
    });
  });

  // Arrow progression
  for (let i = 0; i < 4; i++) {
    slide.addText("→", {
      x: 2.65 + i * 2.5, y: 4.6, w: 0.5, h: 0.5,
      fontSize: 16, fontFace: FONT, color: "525252", align: "center",
    });
  }

  slide.addText("エンドクライアントの月額課金に対して、上記の還元率が毎月パートナーに支払われます。", {
    x: 0.7, y: 6.5, w: 12, h: 0.4,
    fontSize: 10, fontFace: FONT, color: "737373", align: "center",
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SLIDE 12: Revenue Calculation
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide12_revenueCalc(pptx: PptxGenJS) {
  const slide = addWhiteSlide(pptx);
  pageNumber(slide, 12);
  eyebrow(slide, "Revenue Calculation");
  sectionTitle(slide, "レベニューシェア 計算の仕組み");

  // Monthly fee breakdown
  card(slide, { x: 0.7, y: 2.0, w: 7.2, h: 4.0 });
  slide.addText("1アプリあたりの月額課金構造", {
    x: 1.0, y: 2.2, w: 6, h: 0.4,
    fontSize: 14, fontFace: FONT_BOLD, bold: true, color: C.text,
  });

  const rows = [
    { label: "アカウント基本利用料", price: "¥3,000 / 月", note: "必須" },
    { label: "Web アプリ公開", price: "¥2,000 / URL", note: "Web公開時" },
    { label: "iOS アプリ公開", price: "¥5,000 / 月", note: "iOS公開時" },
    { label: "Android アプリ公開", price: "¥5,000 / 月", note: "Android公開時" },
  ];

  rows.forEach((r, i) => {
    const y = 2.85 + i * 0.65;
    slide.addShape("rect" as PptxGenJS.ShapeType, {
      x: 1.0, y, w: 6.6, h: 0.55,
      fill: { color: i % 2 === 0 ? C.bgCard : C.white },
    });
    slide.addText(r.label, { x: 1.2, y, w: 3, h: 0.55, fontSize: 11, fontFace: FONT, color: C.text, valign: "middle" });
    slide.addText(r.price, { x: 4.2, y, w: 1.8, h: 0.55, fontSize: 12, fontFace: FONT_BOLD, bold: true, color: C.text, valign: "middle", align: "right" });
    slide.addText(r.note, { x: 6.2, y, w: 1.2, h: 0.55, fontSize: 9, fontFace: FONT, color: C.textMuted, valign: "middle", align: "right" });
  });

  // Example totals
  slide.addText("例: Web + iOS の場合 → 月額 ¥10,000 / アプリ", {
    x: 1.0, y: 5.0, w: 6.6, h: 0.4,
    fontSize: 11, fontFace: FONT_BOLD, bold: true, color: C.primary,
  });
  slide.addText("例: Web + iOS + Android → 月額 ¥15,000 / アプリ", {
    x: 1.0, y: 5.4, w: 6.6, h: 0.4,
    fontSize: 11, fontFace: FONT_BOLD, bold: true, color: C.primary,
  });

  // Formula
  card(slide, { x: 8.4, y: 2.0, w: 4.2, h: 4.0, fill: C.dark, borderColor: C.dark });
  slide.addText("計算式", {
    x: 8.7, y: 2.3, w: 3.6, h: 0.3,
    fontSize: 10, fontFace: FONT, color: "737373", bold: true,
  });
  slide.addText("月間レベニュー", {
    x: 8.7, y: 2.8, w: 3.6, h: 0.35,
    fontSize: 14, fontFace: FONT_BOLD, bold: true, color: C.white,
  });
  slide.addText("＝", {
    x: 8.7, y: 3.2, w: 3.6, h: 0.35,
    fontSize: 16, fontFace: FONT, color: "60A5FA",
  });
  slide.addText("公開アプリ数", {
    x: 8.7, y: 3.6, w: 3.6, h: 0.35,
    fontSize: 13, fontFace: FONT_BOLD, bold: true, color: "60A5FA",
  });
  slide.addText("×", {
    x: 8.7, y: 3.95, w: 3.6, h: 0.35,
    fontSize: 16, fontFace: FONT, color: "60A5FA",
  });
  slide.addText("月額単価", {
    x: 8.7, y: 4.3, w: 3.6, h: 0.35,
    fontSize: 13, fontFace: FONT_BOLD, bold: true, color: "60A5FA",
  });
  slide.addText("×", {
    x: 8.7, y: 4.65, w: 3.6, h: 0.35,
    fontSize: 16, fontFace: FONT, color: "60A5FA",
  });
  slide.addText("還元率 %", {
    x: 8.7, y: 5.0, w: 3.6, h: 0.35,
    fontSize: 13, fontFace: FONT_BOLD, bold: true, color: "60A5FA",
  });

  // Bottom note
  slide.addText("この月額課金に対して、パートナーランクの還元率%がレベニューシェアとして毎月支払われます。", {
    x: 0.7, y: 6.5, w: 12, h: 0.4,
    fontSize: 10, fontFace: FONT, color: C.textMuted, align: "center",
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Revenue Example helper
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function revenueExampleSlide(
  pptx: PptxGenJS,
  pageNum: number,
  data: {
    persona: string;
    rank: string;
    rankColor: string;
    scenario: string;
    numbers: { label: string; value: string }[];
    highlight: string;
    yearProjection: { year: string; monthly: string; annual: string }[];
  },
) {
  const slide = addLightSlide(pptx);
  pageNumber(slide, pageNum);
  eyebrow(slide, "Revenue Simulation");
  sectionTitle(slide, `収益シミュレーション: ${data.persona}`);

  // Rank badge
  slide.addShape("roundRect" as PptxGenJS.ShapeType, {
    x: 0.7, y: 1.55, w: 2.2, h: 0.35,
    fill: { color: data.rankColor },
    rectRadius: 0.17,
  });
  slide.addText(data.rank, {
    x: 0.7, y: 1.55, w: 2.2, h: 0.35,
    fontSize: 10, fontFace: FONT_BOLD, bold: true, color: C.white, align: "center",
  });

  // Scenario
  bodyText(slide, data.scenario, { y: 2.0, w: 11.9, h: 0.6, fontSize: 11 });

  // Numbers cards
  card(slide, { x: 0.7, y: 2.9, w: 7.2, h: 2.2 });
  slide.addText("収益内訳", {
    x: 1.0, y: 3.05, w: 3, h: 0.3,
    fontSize: 10, fontFace: FONT, bold: true, color: C.textMuted,
  });

  data.numbers.forEach((n, i) => {
    const y = 3.45 + i * 0.55;
    slide.addShape("rect" as PptxGenJS.ShapeType, {
      x: 1.0, y, w: 6.6, h: 0.45,
      fill: { color: i % 2 === 0 ? C.bgCard : C.white },
      rectRadius: 0.05,
    });
    slide.addText(n.label, {
      x: 1.2, y, w: 4, h: 0.45,
      fontSize: 11, fontFace: FONT, color: C.textSub, valign: "middle",
    });
    slide.addText(n.value, {
      x: 5.2, y, w: 2.2, h: 0.45,
      fontSize: 14, fontFace: FONT_BOLD, bold: true, color: C.text, align: "right", valign: "middle",
    });
  });

  // Year projection
  card(slide, { x: 8.4, y: 2.9, w: 4.2, h: 2.2, fill: C.dark, borderColor: C.dark });
  slide.addText("ストック収益の積み上がり", {
    x: 8.6, y: 3.05, w: 3.8, h: 0.3,
    fontSize: 10, fontFace: FONT, bold: true, color: "737373",
  });

  data.yearProjection.forEach((yp, i) => {
    const y = 3.5 + i * 0.5;
    slide.addText(yp.year, {
      x: 8.8, y, w: 1.2, h: 0.4,
      fontSize: 10, fontFace: FONT, color: "A3A3A3", valign: "middle",
    });
    slide.addText(yp.monthly, {
      x: 10.0, y, w: 1.2, h: 0.4,
      fontSize: 10, fontFace: FONT, color: "60A5FA", valign: "middle", align: "right",
    });
    slide.addText(yp.annual, {
      x: 11.2, y, w: 1.2, h: 0.4,
      fontSize: 11, fontFace: FONT_BOLD, bold: true, color: C.white, valign: "middle", align: "right",
    });
  });

  // Highlight
  slide.addShape("roundRect" as PptxGenJS.ShapeType, {
    x: 0.7, y: 5.4, w: 11.9, h: 0.8,
    fill: { color: "EFF6FF" },
    rectRadius: 0.1,
    line: { color: "BFDBFE", width: 0.5 },
  });
  slide.addText(data.highlight, {
    x: 1.0, y: 5.4, w: 11.3, h: 0.8,
    fontSize: 12, fontFace: FONT_BOLD, bold: true, color: C.primaryDark, valign: "middle",
  });

  // Bar chart visualization
  card(slide, { x: 0.7, y: 6.3, w: 11.9, h: 0.9 });
  const maxVal = data.yearProjection.length > 0 ? parseInt(data.yearProjection[data.yearProjection.length - 1].annual.replace(/[^0-9]/g, "")) : 1;
  data.yearProjection.forEach((yp, i) => {
    const val = parseInt(yp.annual.replace(/[^0-9]/g, "")) || 0;
    const barW = (val / maxVal) * 8;
    const x = 2.0;
    const y = 6.4 + i * 0.25;
    slide.addText(yp.year, { x: 0.9, y, w: 1, h: 0.2, fontSize: 7, fontFace: FONT, color: C.textMuted });
    slide.addShape("rect" as PptxGenJS.ShapeType, {
      x, y: y + 0.02, w: barW > 0 ? barW : 0.1, h: 0.16,
      fill: { color: data.rankColor },
      rectRadius: 0.03,
    });
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SLIDES 13-15: Revenue Examples
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide13_exampleA(pptx: PptxGenJS) {
  revenueExampleSlide(pptx, 13, {
    persona: "Web制作会社 A社",
    rank: "Gold（25%還元）",
    rankColor: C.gold,
    scenario: "月5件のクライアント案件をMS Studioで制作。アカウント基本利用料 + アプリ公開料が継続課金されるため、制作後も毎月レベニューシェアが発生。",
    numbers: [
      { label: "制作売上 / 件", value: "¥150,000" },
      { label: "継続レベニュー / 月（5件）", value: "約 ¥18,750" },
      { label: "年間継続収益", value: "約 ¥225,000" },
    ],
    highlight: "制作単価に加えて、ストック型の継続収益が積み上がるモデル。1年後には月5万円超のストック収益に。",
    yearProjection: [
      { year: "1年目", monthly: "¥18,750/月", annual: "¥225,000" },
      { year: "2年目", monthly: "¥37,500/月", annual: "¥675,000" },
      { year: "3年目", monthly: "¥56,250/月", annual: "¥1,350,000" },
    ],
  });
}

function slide14_exampleB(pptx: PptxGenJS) {
  revenueExampleSlide(pptx, 14, {
    persona: "フリーランスデザイナー Bさん",
    rank: "Silver（20%還元）",
    rankColor: C.silver,
    scenario: "月2件のミニアプリ制作を受注。セルフ構築 + 3hパックを活用してスピード納品。テンプレートも2点販売中。",
    numbers: [
      { label: "制作売上 / 月", value: "¥100,000" },
      { label: "テンプレート販売 / 月", value: "約 ¥30,000" },
      { label: "継続レベニュー / 月", value: "約 ¥6,000" },
    ],
    highlight: "テンプレート販売 × 継続シェアで、固定費をカバーする副収入源に。制作+販売+ストックの三本柱。",
    yearProjection: [
      { year: "1年目", monthly: "¥6,000/月", annual: "¥72,000" },
      { year: "2年目", monthly: "¥12,000/月", annual: "¥216,000" },
      { year: "3年目", monthly: "¥18,000/月", annual: "¥432,000" },
    ],
  });
}

function slide15_exampleC(pptx: PptxGenJS) {
  revenueExampleSlide(pptx, 15, {
    persona: "アプリ開発会社 C社",
    rank: "Platinum（30%還元）",
    rankColor: C.platinum,
    scenario: "オフィシャル制作パートナーとして月10件以上を継続納品。エムスタFullでの大型案件も対応し、既存クライアントの運用も一括管理。",
    numbers: [
      { label: "制作売上 / 月", value: "¥1,500,000+" },
      { label: "継続レベニュー / 月（30件）", value: "約 ¥135,000" },
      { label: "年間継続収益", value: "約 ¥1,620,000" },
    ],
    highlight: "制作実績の積み上げに比例して、ストック収益が事業の安定基盤に。3年目には月40万円超の安定収入。",
    yearProjection: [
      { year: "1年目", monthly: "¥135,000/月", annual: "¥1,620,000" },
      { year: "2年目", monthly: "¥270,000/月", annual: "¥4,860,000" },
      { year: "3年目", monthly: "¥405,000/月", annual: "¥9,720,000" },
    ],
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SLIDE 16: Marketplace
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide16_marketplace(pptx: PptxGenJS) {
  const slide = addWhiteSlide(pptx);
  pageNumber(slide, 16);
  eyebrow(slide, "Marketplace");
  sectionTitle(slide, "テンプレート販売で、さらなる収益機会。");
  bodyText(slide, "パートナーが制作した機能・テンプレート・デザインアセットをマーケットプレイスで販売。\n制作費 + ストック + 販売収入の3つの収益源を実現できます。");

  const items = [
    "有償アドオン機能", "UIテンプレート", "デザインテンプレート",
    "コンテンツテンプレート", "業界特化テンプレート", "パートナー開発の独自機能", "API連携",
  ];

  items.forEach((it, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const x = 0.7 + col * 3.1;
    const y = 3.4 + row * 1.0;

    slide.addShape("roundRect" as PptxGenJS.ShapeType, {
      x, y, w: 2.8, h: 0.7,
      fill: { color: C.bgCard },
      rectRadius: 0.1,
      line: { color: C.border, width: 0.5 },
    });
    slide.addText(it, {
      x, y, w: 2.8, h: 0.7,
      fontSize: 11, fontFace: FONT_BOLD, bold: true, color: C.text, align: "center",
    });
  });

  // Two-column benefits
  const benefits = [
    { role: "ユーザー", desc: "必要な機能を、必要なタイミングで追加できる。" },
    { role: "パートナー", desc: "自社の技術やデザインを、エムスタ上で販売できる。" },
  ];

  benefits.forEach((b, i) => {
    const x = 0.7 + i * 6.2;
    card(slide, { x, y: 5.6, w: 5.8, h: 1.2 });
    slide.addText(b.role, {
      x: x + 0.3, y: 5.7, w: 5.2, h: 0.3,
      fontSize: 9, fontFace: FONT, bold: true, color: C.textMuted,
    });
    slide.addText(b.desc, {
      x: x + 0.3, y: 6.05, w: 5.2, h: 0.6,
      fontSize: 12, fontFace: FONT_BOLD, bold: true, color: C.text,
    });
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SLIDE 17: AI
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide17_ai(pptx: PptxGenJS) {
  const slide = addWhiteSlide(pptx);
  pageNumber(slide, 17);
  eyebrow(slide, "AI Support");
  sectionTitle(slide, "AIが、制作と運用を支援する。");
  bodyText(slide, "パートナーの制作効率を上げるAI支援機能を搭載。\n同じ時間でより多くの案件を回せる = 収益増に直結します。");

  const categories = [
    { title: "制作支援", items: ["企画整理", "画面構成提案", "コンテンツ構成提案", "UI生成支援"], color: C.primary },
    { title: "運用支援", items: ["投稿内容の整理", "プッシュ通知文面作成", "FAQ生成", "運用改善提案"], color: C.accent },
    { title: "サポート支援", items: ["運用・操作マニュアル", "申請準備サポート", "初期設定ガイド", "AIエージェント（予定）"], color: C.green },
  ];

  categories.forEach((cat, i) => {
    const x = 0.7 + i * 4.1;
    card(slide, { x, y: 3.2, w: 3.8, h: 3.8 });
    accentBar(slide, { x: x + 0.2, y: 3.35, w: 3.4, color: cat.color });
    slide.addText(cat.title, {
      x: x + 0.3, y: 3.6, w: 3.2, h: 0.4,
      fontSize: 14, fontFace: FONT_BOLD, bold: true, color: C.text,
    });
    cat.items.forEach((item, j) => {
      slide.addText(`• ${item}`, {
        x: x + 0.3, y: 4.2 + j * 0.55, w: 3.2, h: 0.4,
        fontSize: 11, fontFace: FONT, color: C.textSub,
      });
    });
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SLIDE 18: Team Roles
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide18_teamRoles(pptx: PptxGenJS) {
  const slide = addWhiteSlide(pptx);
  pageNumber(slide, 18);
  eyebrow(slide, "Team Management");
  sectionTitle(slide, "チームでも、組織でも、安全に運用できる。");
  bodyText(slide, "クライアント納品後も安全に運用委譲。パートナーを巻き込んだ運用にも対応可能です。");

  const roles = [
    { role: "管理者", desc: "すべての機能にアクセス可能", color: C.primary },
    { role: "編集者", desc: "コンテンツ・画面の編集が可能", color: C.accent },
    { role: "投稿者", desc: "投稿のみ可能", color: C.green },
    { role: "閲覧者", desc: "閲覧のみ", color: "737373" },
    { role: "外部パートナー", desc: "制作パートナー向け権限", color: C.gold },
  ];

  roles.forEach((r, i) => {
    const x = 0.7 + i * 2.5;
    card(slide, { x, y: 3.2, w: 2.2, h: 2.2 });
    slide.addShape("circle" as PptxGenJS.ShapeType, {
      x: x + 0.8, y: 3.4, w: 0.6, h: 0.6,
      fill: { color: r.color },
    });
    slide.addText(r.role, {
      x, y: 4.15, w: 2.2, h: 0.4,
      fontSize: 12, fontFace: FONT_BOLD, bold: true, color: C.text, align: "center",
    });
    slide.addText(r.desc, {
      x: x + 0.1, y: 4.55, w: 2.0, h: 0.6,
      fontSize: 9, fontFace: FONT, color: C.textSub, align: "center", lineSpacingMultiple: 1.4,
    });
  });

  slide.addText("アカウント内に複数アプリを作成でき、アプリごとに権限を付与することも可能です。", {
    x: 0.7, y: 5.8, w: 12, h: 0.4,
    fontSize: 10, fontFace: FONT, color: C.textMuted, align: "center",
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SLIDE 19: Use Cases
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide19_usecases(pptx: PptxGenJS) {
  const slide = addLightSlide(pptx);
  pageNumber(slide, 19);
  eyebrow(slide, "Use Cases");
  sectionTitle(slide, "パートナーが提案できる案件例");

  const cases = [
    { industry: "店舗・施設", items: "会員アプリ / 予約 / クーポン / 来店管理", pitch: "会員アプリで来店促進したい店舗に最適", color: C.primary },
    { industry: "教育・スクール", items: "学習アプリ / お知らせ / 資料共有 / 出欠管理", pitch: "保護者への情報発信を効率化", color: C.accent },
    { industry: "医療・団体", items: "情報インフラ / 災害時連絡 / アンケート", pitch: "会員への確実な情報伝達手段として", color: C.green },
    { industry: "クリエイター", items: "ファンコミュニティ / 限定情報 / イベント告知", pitch: "ファンとの接点をアプリで構築", color: C.gold },
    { industry: "企業・社内", items: "社内ポータル / ナレッジ共有 / 業務連絡", pitch: "社内情報の集約とコミュニケーション強化", color: C.dark },
  ];

  cases.forEach((c, i) => {
    const y = 2.0 + i * 1.05;
    card(slide, { x: 0.7, y, w: 11.9, h: 0.9 });
    accentBar(slide, { x: 0.7, y, w: 0.06, color: c.color });

    slide.addText(c.industry, {
      x: 1.1, y, w: 2, h: 0.9,
      fontSize: 13, fontFace: FONT_BOLD, bold: true, color: C.text, valign: "middle",
    });
    slide.addText(c.items, {
      x: 3.2, y, w: 5.5, h: 0.9,
      fontSize: 10, fontFace: FONT, color: C.textSub, valign: "middle",
    });
    slide.addText(`💡 ${c.pitch}`, {
      x: 8.8, y, w: 3.6, h: 0.9,
      fontSize: 10, fontFace: FONT, color: C.primary, valign: "middle",
    });
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SLIDE 20: Cases
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide20_cases(pptx: PptxGenJS) {
  const slide = addWhiteSlide(pptx);
  pageNumber(slide, 20);
  eyebrow(slide, "Customer Cases");
  sectionTitle(slide, "導入事例");

  const cases = [
    { name: "鳥取県歯科医師会 / App歯っ鳥くん", cat: "医療・団体", features: "会員管理 / 通知 / ファイル共有", result: "情報共有スピード・到達率向上" },
    { name: "パンチョ 診断コンテンツ", cat: "店舗・施設", features: "ポップアップ / アンケート / クーポン", result: "来店動機創出・ファン層の見える化" },
    { name: "天天中文", cat: "教育", features: "会員管理 / コンテンツ配信 / 通知", result: "学習継続率向上" },
    { name: "トラスポMAP", cat: "業務支援", features: "マップ / 投稿 / 通知", result: "現場情報共有スピード改善" },
    { name: "FBスカウト公式アプリ", cat: "企業", features: "会員管理 / 通知 / コンテンツ", result: "案件流通の透明性向上" },
    { name: "たるファミ公式アプリ", cat: "コミュニティ", features: "会員限定 / 投稿 / 通知", result: "コアファン満足度向上" },
  ];

  // Table header
  const headerY = 2.0;
  const cols = [
    { x: 0.7, w: 3.5, label: "クライアント" },
    { x: 4.2, w: 1.2, label: "業種" },
    { x: 5.4, w: 3.5, label: "活用機能" },
    { x: 8.9, w: 3.7, label: "導入効果" },
  ];

  cols.forEach((col) => {
    slide.addShape("rect" as PptxGenJS.ShapeType, {
      x: col.x, y: headerY, w: col.w, h: 0.45,
      fill: { color: C.dark },
    });
    slide.addText(col.label, {
      x: col.x + 0.15, y: headerY, w: col.w - 0.3, h: 0.45,
      fontSize: 9, fontFace: FONT_BOLD, bold: true, color: C.white, valign: "middle",
    });
  });

  cases.forEach((c, i) => {
    const y = 2.45 + i * 0.7;
    const bgColor = i % 2 === 0 ? C.bgCard : C.white;
    cols.forEach((col) => {
      slide.addShape("rect" as PptxGenJS.ShapeType, {
        x: col.x, y, w: col.w, h: 0.6,
        fill: { color: bgColor },
        line: { color: C.border, width: 0.3 },
      });
    });
    const values = [c.name, c.cat, c.features, c.result];
    cols.forEach((col, ci) => {
      slide.addText(values[ci], {
        x: col.x + 0.15, y, w: col.w - 0.3, h: 0.6,
        fontSize: ci === 0 ? 10 : 9, fontFace: ci === 0 ? FONT_BOLD : FONT,
        bold: ci === 0, color: C.text, valign: "middle",
      });
    });
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SLIDE 21: Pricing
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide21_pricing(pptx: PptxGenJS) {
  const slide = addLightSlide(pptx);
  pageNumber(slide, 21);
  eyebrow(slide, "Pricing");
  sectionTitle(slide, "エンドクライアントへの提案価格");

  // Main pricing
  card(slide, { x: 0.7, y: 2.0, w: 5.7, h: 4.5 });
  slide.addText("利用料金", {
    x: 1.0, y: 2.2, w: 5, h: 0.4,
    fontSize: 14, fontFace: FONT_BOLD, bold: true, color: C.text,
  });

  const prices = [
    { item: "2週間無料トライアル", price: "¥0", note: "クレジットカード不要" },
    { item: "アカウント基本利用料", price: "¥3,000/月", note: "複数アプリ管理可能" },
    { item: "Webアプリ公開", price: "¥2,000/URL", note: "独自ドメイン接続可" },
    { item: "iOSアプリ公開", price: "¥5,000/月", note: "App Store対応" },
    { item: "Androidアプリ公開", price: "¥5,000/月", note: "Google Play対応" },
  ];

  prices.forEach((p, i) => {
    const y = 2.8 + i * 0.65;
    slide.addShape("rect" as PptxGenJS.ShapeType, {
      x: 1.0, y, w: 5.1, h: 0.55,
      fill: { color: i % 2 === 0 ? C.bgCard : C.white },
    });
    slide.addText(p.item, { x: 1.2, y, w: 2.5, h: 0.55, fontSize: 10, fontFace: FONT, color: C.text, valign: "middle" });
    slide.addText(p.price, { x: 3.7, y, w: 1.2, h: 0.55, fontSize: 12, fontFace: FONT_BOLD, bold: true, color: i === 0 ? C.primary : C.text, valign: "middle", align: "right" });
    slide.addText(p.note, { x: 5.0, y, w: 1.0, h: 0.55, fontSize: 8, fontFace: FONT, color: C.textMuted, valign: "middle", align: "right" });
  });

  // Services
  card(slide, { x: 6.9, y: 2.0, w: 5.7, h: 4.5 });
  slide.addText("制作サービス", {
    x: 7.2, y: 2.2, w: 5, h: 0.4,
    fontSize: 14, fontFace: FONT_BOLD, bold: true, color: C.text,
  });

  const services = [
    { name: "オフィシャル制作", price: "¥100,000〜", desc: "公式チームが企画〜構築を代行" },
    { name: "3hパック", price: "¥35,000 / 回", desc: "ローンチ記念半額（通常¥70,000）\n当日オンラインで3時間リアルタイム制作" },
    { name: "エムスタFull", price: "個別お見積り", desc: "独自機能開発・高度UI/UX\n既存アプリリプレイスに対応" },
  ];

  services.forEach((s, i) => {
    const y = 2.9 + i * 1.35;
    slide.addText(s.name, {
      x: 7.2, y, w: 3, h: 0.35,
      fontSize: 12, fontFace: FONT_BOLD, bold: true, color: C.text,
    });
    slide.addText(s.price, {
      x: 10.2, y, w: 2, h: 0.35,
      fontSize: 13, fontFace: FONT_BOLD, bold: true, color: C.primary, align: "right",
    });
    slide.addText(s.desc, {
      x: 7.2, y: y + 0.4, w: 5, h: 0.7,
      fontSize: 9, fontFace: FONT, color: C.textSub, lineSpacingMultiple: 1.5,
    });
  });

  slide.addShape("roundRect" as PptxGenJS.ShapeType, {
    x: 0.7, y: 6.7, w: 11.9, h: 0.5,
    fill: { color: "EFF6FF" },
    rectRadius: 0.1,
  });
  slide.addText("この月額課金に対してレベニューシェアが発生 → パートナーの継続収益に", {
    x: 0.7, y: 6.7, w: 11.9, h: 0.5,
    fontSize: 11, fontFace: FONT_BOLD, bold: true, color: C.primaryDark, align: "center",
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SLIDE 22: Flow
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide22_flow(pptx: PptxGenJS) {
  const slide = addWhiteSlide(pptx);
  pageNumber(slide, 22);
  eyebrow(slide, "Getting Started");
  sectionTitle(slide, "パートナー導入の流れ");
  bodyText(slide, "最短即日でパートナー登録し、すぐに制作を開始できます。");

  const steps = [
    { num: "01", title: "お問い合わせ", desc: "資料DLまたは\nオンライン相談" },
    { num: "02", title: "ヒアリング", desc: "貴社の事業内容と\n活用方針をお伺い" },
    { num: "03", title: "契約", desc: "パートナー契約の\n締結" },
    { num: "04", title: "アカウント発行", desc: "プロモード対応の\nアカウントを発行" },
    { num: "05", title: "制作開始", desc: "クライアント案件の\n制作を開始" },
    { num: "06", title: "運用・収益化", desc: "レベニューシェアで\n継続収益を獲得" },
  ];

  steps.forEach((s, i) => {
    const x = 0.5 + i * 2.1;
    // Circle number
    slide.addShape("ellipse" as PptxGenJS.ShapeType, {
      x: x + 0.65, y: 3.2, w: 0.8, h: 0.8,
      fill: { color: i === 5 ? C.primary : C.dark },
    });
    slide.addText(s.num, {
      x: x + 0.65, y: 3.2, w: 0.8, h: 0.8,
      fontSize: 14, fontFace: FONT_BOLD, bold: true, color: C.white, align: "center", valign: "middle",
    });

    // Arrow
    if (i < 5) {
      slide.addText("→", {
        x: x + 1.55, y: 3.3, w: 0.4, h: 0.6,
        fontSize: 14, color: C.textMuted, align: "center",
      });
    }

    slide.addText(s.title, {
      x: x + 0.15, y: 4.2, w: 1.8, h: 0.4,
      fontSize: 11, fontFace: FONT_BOLD, bold: true, color: C.text, align: "center",
    });
    slide.addText(s.desc, {
      x: x + 0.15, y: 4.6, w: 1.8, h: 0.9,
      fontSize: 9, fontFace: FONT, color: C.textSub, align: "center", lineSpacingMultiple: 1.5,
    });
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SLIDE 23: FAQ
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide23_faq(pptx: PptxGenJS) {
  const slide = addWhiteSlide(pptx);
  pageNumber(slide, 23);
  eyebrow(slide, "FAQ");
  sectionTitle(slide, "よくある質問");

  const faqs = [
    { q: "代理店として利用できますか？", a: "はい。パートナー制度およびレベニューシェア制度をご用意しています。紹介パートナーとしての参加も可能です。" },
    { q: "パートナー登録に費用はかかりますか？", a: "パートナー登録は無料です。まずはオンライン相談で詳細をご確認ください。" },
    { q: "制作を依頼することもできますか？", a: "はい。オフィシャル制作（¥100,000〜）、即日3hパック（¥35,000）、スクラッチ対応のエムスタFullをご用意しています。" },
    { q: "独自機能の開発はできますか？", a: "はい。エムスタFullにて個別要件に対応可能です。既存アプリのリプレイスにも対応します。" },
    { q: "クライアントへの請求はどうなりますか？", a: "MS Studioの利用料金はエンドクライアントに直接請求されます。パートナーには月額課金に対するレベニューシェアが還元されます。" },
  ];

  faqs.forEach((faq, i) => {
    const y = 2.0 + i * 1.05;
    card(slide, { x: 0.7, y, w: 11.9, h: 0.9 });
    slide.addText(`Q. ${faq.q}`, {
      x: 1.0, y: y + 0.05, w: 11.3, h: 0.35,
      fontSize: 11, fontFace: FONT_BOLD, bold: true, color: C.text,
    });
    slide.addText(`A. ${faq.a}`, {
      x: 1.0, y: y + 0.4, w: 11.3, h: 0.45,
      fontSize: 10, fontFace: FONT, color: C.textSub,
    });
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SLIDE 24: CTA
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide24_cta(pptx: PptxGenJS) {
  const slide = addDarkSlide(pptx);

  slide.addShape("rect" as PptxGenJS.ShapeType, {
    x: 0, y: 0, w: SLIDE_W, h: 0.06,
    fill: { color: C.primary },
  });

  slide.addText("まずは、お気軽にご相談ください。", {
    x: 0.7, y: 1.5, w: 11, h: 0.8,
    fontSize: 32, fontFace: FONT_BOLD, bold: true, color: C.white,
  });

  slide.addText("パートナーになる最初のステップは、オンライン相談から。\n制度の詳細、収益モデル、貴社での活用方法など、何でもお気軽にご質問ください。", {
    x: 0.7, y: 2.5, w: 10, h: 0.8,
    fontSize: 13, fontFace: FONT, color: "A3A3A3", lineSpacingMultiple: 1.7,
  });

  const ctas = [
    { label: "オンライン相談", desc: "Spirカレンダーから\n日程を選んで予約", color: C.primary },
    { label: "パートナー資料DL", desc: "制度概要・収益モデルを\nまとめたPDF資料", color: C.accent },
    { label: "無料トライアル", desc: "2週間無料で\nMS Studioを体験", color: C.green },
  ];

  ctas.forEach((cta, i) => {
    const x = 0.7 + i * 4.1;
    slide.addShape("roundRect" as PptxGenJS.ShapeType, {
      x, y: 3.8, w: 3.8, h: 2.0,
      fill: { color: "262626" },
      rectRadius: 0.15,
      line: { color: "404040", width: 0.5 },
    });
    slide.addShape("rect" as PptxGenJS.ShapeType, {
      x, y: 3.8, w: 3.8, h: 0.06,
      fill: { color: cta.color },
    });
    slide.addText(cta.label, {
      x: x + 0.3, y: 4.1, w: 3.2, h: 0.4,
      fontSize: 15, fontFace: FONT_BOLD, bold: true, color: C.white,
    });
    slide.addText(cta.desc, {
      x: x + 0.3, y: 4.6, w: 3.2, h: 0.8,
      fontSize: 10, fontFace: FONT, color: "A3A3A3", lineSpacingMultiple: 1.5,
    });
  });

  slide.addText("サイト: https://msta.app", {
    x: 0.7, y: 6.2, w: 5, h: 0.3,
    fontSize: 10, fontFace: FONT, color: "525252",
  });
  slide.addText("パートナー向け: https://msta.app/partners", {
    x: 0.7, y: 6.5, w: 5, h: 0.3,
    fontSize: 10, fontFace: FONT, color: "525252",
  });

  slide.addText("R117 Inc.", {
    x: 0.7, y: 6.9, w: 5, h: 0.3,
    fontSize: 10, fontFace: FONT_BOLD, bold: true, color: "737373",
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Main
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

async function main() {
  console.log("Generating MS Studio Partner Deck...");
  const pptx = build();
  const outPath = "ms-studio-partner-deck.pptx";
  await pptx.writeFile({ fileName: outPath });
  console.log(`Done! → ${outPath}`);
}

main().catch((err) => {
  console.error("Failed to generate deck:", err);
  process.exit(1);
});
