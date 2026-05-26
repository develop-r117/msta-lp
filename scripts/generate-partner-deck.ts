/**
 * MS Studio パートナー向け営業資料 PPTX 自動生成スクリプト
 *
 * 実行: npx tsx scripts/generate-partner-deck.ts
 * 出力: ms-studio-partner-deck.pptx
 */

import PptxGenJS from "pptxgenjs";

// ─── Design Tokens ────────────────────────────────────────────
const C = {
  primary: "2563EB",
  primaryLight: "3B82F6",
  primaryPale: "DBEAFE",
  primaryDeep: "1E40AF",
  accent: "8B5CF6",
  accentLight: "A78BFA",
  accentPale: "EDE9FE",
  dark: "0F172A",
  darkCard: "1E293B",
  darkMid: "334155",
  text: "0F172A",
  textSub: "475569",
  textMuted: "94A3B8",
  white: "FFFFFF",
  offWhite: "F8FAFC",
  bg: "F1F5F9",
  cardBg: "FFFFFF",
  border: "E2E8F0",
  borderLight: "F1F5F9",
  gold: "F59E0B",
  goldDark: "B45309",
  silver: "64748B",
  platinum: "0EA5E9",
  legend: "A855F7",
  bronze: "92400E",
  green: "10B981",
  greenDark: "059669",
  red: "EF4444",
  rose: "F43F5E",
} as const;

const FONT = "Meiryo";
const SW = 13.333;
const SH = 7.5;

type Slide = ReturnType<PptxGenJS["addSlide"]>;
type ST = PptxGenJS.ShapeType;
const RECT = "rect" as ST;
const RRECT = "roundRect" as ST;
const ELLIPSE = "ellipse" as ST;

// ─── Decorative Helpers ────────────────────────────────────────

/** transparency: 0=opaque, 100=invisible */
function decoCircle(s: Slide, x: number, y: number, size: number, color: string, transparency = 88) {
  s.addShape(ELLIPSE, {
    x, y, w: size, h: size,
    fill: { color, transparency },
  });
}

function decoLine(s: Slide, x: number, y: number, w: number, color: string, transparency?: number) {
  s.addShape(RECT, { x, y, w, h: 0.02, fill: { color, transparency } });
}

function decoGradientBar(s: Slide, x: number, y: number, w: number, h: number, color1: string, color2: string) {
  s.addShape(RECT, { x, y, w: w / 2, h, fill: { color: color1 } });
  s.addShape(RECT, { x: x + w / 2, y, w: w / 2, h, fill: { color: color2 } });
}

function topAccentStrip(s: Slide) {
  decoGradientBar(s, 0, 0, SW, 0.05, C.primary, C.accent);
}

function darkTopAccentStrip(s: Slide) {
  decoGradientBar(s, 0, 0, SW, 0.05, C.primaryLight, C.accentLight);
}

function addSlideNumber(s: Slide, num: number, dark = false) {
  s.addText(String(num).padStart(2, "0"), {
    x: 12.2, y: 7.05, w: 0.9, h: 0.3,
    fontSize: 8, fontFace: FONT, color: dark ? C.darkMid : C.textMuted,
    align: "right",
  });
}

function bgDecoLight(s: Slide) {
  decoCircle(s, -1.5, -1.5, 5, C.primary, 94);
  decoCircle(s, 10.5, 5.5, 4, C.accent, 95);
}

function bgDecoDark(s: Slide) {
  decoCircle(s, -2, -2, 6, C.primaryLight, 92);
  decoCircle(s, 11, 5, 5, C.accentLight, 94);
  decoCircle(s, 8, -1, 3, C.primaryLight, 96);
}

// ─── Slide Builders ────────────────────────────────────────

function whiteBg(pptx: PptxGenJS): Slide {
  const s = pptx.addSlide();
  s.background = { color: C.white };
  topAccentStrip(s);
  bgDecoLight(s);
  return s;
}

function lightBg(pptx: PptxGenJS): Slide {
  const s = pptx.addSlide();
  s.background = { color: C.offWhite };
  topAccentStrip(s);
  bgDecoLight(s);
  return s;
}

function darkBg(pptx: PptxGenJS): Slide {
  const s = pptx.addSlide();
  s.background = { color: C.dark };
  darkTopAccentStrip(s);
  bgDecoDark(s);
  return s;
}

function primaryBg(pptx: PptxGenJS): Slide {
  const s = pptx.addSlide();
  s.background = { color: C.primary };
  decoCircle(s, -2, -2, 7, C.white, 92);
  decoCircle(s, 10, 4, 6, C.white, 94);
  decoCircle(s, 6, -1, 3, C.white, 96);
  return s;
}

// ─── Typography ────────────────────────────────────────

function eyebrow(s: Slide, text: string, opts: { x?: number; y?: number; color?: string } = {}) {
  const x = opts.x ?? 0.8;
  const y = opts.y ?? 0.45;
  s.addShape(RRECT, {
    x, y, w: text.length * 0.14 + 0.6, h: 0.32,
    fill: { color: opts.color ?? C.primary, transparency: 92 },
    rectRadius: 0.16,
  });
  s.addText(text.toUpperCase(), {
    x: x + 0.08, y, w: text.length * 0.14 + 0.5, h: 0.32,
    fontSize: 8, fontFace: FONT, bold: true,
    color: opts.color ?? C.primary,
    charSpacing: 4, align: "center",
  });
}

function heading(s: Slide, text: string, opts: { x?: number; y?: number; w?: number; fontSize?: number; color?: string } = {}) {
  s.addText(text, {
    x: opts.x ?? 0.8, y: opts.y ?? 0.9, w: opts.w ?? 11, h: 0.75,
    fontSize: opts.fontSize ?? 30, fontFace: FONT, bold: true,
    color: opts.color ?? C.text,
    lineSpacingMultiple: 1.15,
  });
}

function subtitle(s: Slide, text: string, opts: { x?: number; y?: number; w?: number; color?: string; fontSize?: number } = {}) {
  s.addText(text, {
    x: opts.x ?? 0.8, y: opts.y ?? 1.75, w: opts.w ?? 10, h: 0.7,
    fontSize: opts.fontSize ?? 12, fontFace: FONT,
    color: opts.color ?? C.textSub,
    lineSpacingMultiple: 1.75,
  });
}

// ─── Card Primitives ────────────────────────────────────────

function elegantCard(s: Slide, x: number, y: number, w: number, h: number, opts?: { fill?: string; radius?: number; shadow?: boolean; border?: string }) {
  if (opts?.shadow !== false) {
    s.addShape(RRECT, {
      x: x + 0.03, y: y + 0.04, w, h,
      fill: { color: "000000", transparency: 95 },
      rectRadius: opts?.radius ?? 0.18,
    });
  }
  s.addShape(RRECT, {
    x, y, w, h,
    fill: { color: opts?.fill ?? C.cardBg },
    rectRadius: opts?.radius ?? 0.18,
    line: opts?.border ? { color: opts.border, width: 0.5 } : undefined,
  });
}

function glassCard(s: Slide, x: number, y: number, w: number, h: number, color: string) {
  s.addShape(RRECT, {
    x, y, w, h,
    fill: { color, transparency: 90 },
    rectRadius: 0.18,
    line: { color, width: 0.7 },
  });
}

function darkCard(s: Slide, x: number, y: number, w: number, h: number) {
  s.addShape(RRECT, {
    x: x + 0.02, y: y + 0.03, w, h,
    fill: { color: "000000", transparency: 85 },
    rectRadius: 0.18,
  });
  s.addShape(RRECT, {
    x, y, w, h,
    fill: { color: C.darkCard },
    rectRadius: 0.18,
    line: { color: C.darkMid, width: 0.5 },
  });
}

function colorTopCard(s: Slide, x: number, y: number, w: number, h: number, topColor: string) {
  elegantCard(s, x, y, w, h);
  s.addShape(RECT, {
    x: x + 0.01, y: y + 0.01, w: w - 0.02, h: 0.07,
    fill: { color: topColor },
    rectRadius: 0,
  });
}

function pillBadge(s: Slide, x: number, y: number, text: string, color: string, textColor?: string) {
  const w = text.length * 0.12 + 0.5;
  s.addShape(RRECT, { x, y, w, h: 0.3, fill: { color }, rectRadius: 0.15 });
  s.addText(text, { x, y, w, h: 0.3, fontSize: 8, fontFace: FONT, bold: true, color: textColor ?? C.white, align: "center" });
}

function numberCircle(s: Slide, x: number, y: number, num: string, color: string) {
  s.addShape(ELLIPSE, { x, y, w: 0.55, h: 0.55, fill: { color } });
  s.addText(num, { x, y, w: 0.55, h: 0.55, fontSize: 13, fontFace: FONT, bold: true, color: C.white, align: "center", valign: "middle" });
}

function iconCircle(s: Slide, x: number, y: number, text: string, color: string, size = 0.7) {
  s.addShape(ELLIPSE, {
    x, y, w: size, h: size,
    fill: { color, transparency: 88 },
  });
  s.addText(text, {
    x, y, w: size, h: size,
    fontSize: size * 22, align: "center", valign: "middle",
  });
}

function statBlock(s: Slide, x: number, y: number, value: string, label: string, color: string) {
  s.addText(value, { x, y, w: 2.5, h: 0.5, fontSize: 26, fontFace: FONT, bold: true, color });
  s.addText(label, { x, y: y + 0.45, w: 2.5, h: 0.3, fontSize: 9, fontFace: FONT, color: C.textMuted });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Build
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function build() {
  const pptx = new PptxGenJS();
  pptx.layout = "LAYOUT_WIDE";
  pptx.author = "R117 Inc.";
  pptx.company = "R117 Inc.";
  pptx.subject = "MS Studio Partner Program";
  pptx.title = "MS Studio パートナー向け資料";

  slide01(pptx); slide02(pptx); slide03(pptx); slide04(pptx);
  slide05(pptx); slide06(pptx); slide07(pptx); slide08(pptx);
  slide09(pptx); slide10(pptx); slide11(pptx); slide12(pptx);
  slide13(pptx); slide14(pptx); slide15(pptx); slide16(pptx);
  slide17(pptx); slide18(pptx); slide19(pptx); slide20(pptx);
  slide21(pptx); slide22(pptx); slide23(pptx); slide24(pptx);

  return pptx;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 01 COVER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide01(pptx: PptxGenJS) {
  const s = darkBg(pptx);

  // Large decorative circles
  decoCircle(s, -3, -3, 9, C.primary, 90);
  decoCircle(s, 9, 3, 8, C.accent, 92);
  decoCircle(s, 5, -2, 4, C.primaryLight, 95);

  // Subtle grid pattern
  for (let i = 0; i < 14; i++) {
    s.addShape(RECT, { x: i, y: 0, w: 0.003, h: SH, fill: { color: C.white, transparency: 96 } });
  }
  for (let i = 0; i < 8; i++) {
    s.addShape(RECT, { x: 0, y: i, w: SW, h: 0.003, fill: { color: C.white, transparency: 96 } });
  }

  // Top gradient strip
  decoGradientBar(s, 0, 0, SW, 0.06, C.primary, C.accent);

  // Brand label
  pillBadge(s, 0.8, 1.8, "MS STUDIO", C.primary);

  // Main title
  s.addText("Partner\nProgram", {
    x: 0.8, y: 2.3, w: 8, h: 2.0,
    fontSize: 54, fontFace: FONT, bold: true, color: C.white,
    lineSpacingMultiple: 1.05,
  });

  // Subtitle
  s.addText("アプリ制作を、あなたの新しいビジネスに。", {
    x: 0.8, y: 4.4, w: 8, h: 0.5,
    fontSize: 16, fontFace: FONT, color: C.textMuted,
  });

  // Stat badges
  const badges = [
    { label: "レベニューシェア", value: "最大 35%", color: C.primary },
    { label: "登録費用", value: "¥0 無料", color: C.green },
    { label: "対応プラットフォーム", value: "Web / iOS / Android", color: C.accent },
  ];
  badges.forEach((b, i) => {
    const x = 0.8 + i * 3.6;
    darkCard(s, x, 5.3, 3.3, 1.2);
    s.addShape(RECT, { x: x + 0.01, y: 5.3, w: 3.28, h: 0.05, fill: { color: b.color } });
    s.addText(b.label, { x: x + 0.3, y: 5.5, w: 2.7, h: 0.25, fontSize: 8, fontFace: FONT, color: C.textMuted });
    s.addText(b.value, { x: x + 0.3, y: 5.8, w: 2.7, h: 0.4, fontSize: 16, fontFace: FONT, bold: true, color: C.white });
  });

  // Footer
  s.addText("Confidential  ·  R117 Inc.  ·  2026", {
    x: 0.8, y: 6.9, w: 5, h: 0.3,
    fontSize: 8, fontFace: FONT, color: C.darkMid,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 02 EXECUTIVE SUMMARY
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide02(pptx: PptxGenJS) {
  const s = whiteBg(pptx);
  addSlideNumber(s, 2);
  eyebrow(s, "Executive Summary");
  heading(s, "この資料で分かること");

  const items = [
    { icon: "📱", text: "MS Studioの製品概要と、他にはないCMSの強み" },
    { icon: "🤝", text: "パートナー制度の全体像（制作 / 紹介 / テンプレート販売）" },
    { icon: "💰", text: "レベニューシェア制度と5段階ランク（最大35%還元）" },
    { icon: "📊", text: "3つのペルソナ別・収益シミュレーション" },
    { icon: "🚀", text: "マーケットプレイスやAI支援で広がる追加収益の機会" },
    { icon: "✅", text: "パートナー登録までの流れと、今すぐ始める方法" },
  ];

  items.forEach((item, i) => {
    const y = 2.1 + i * 0.85;
    elegantCard(s, 0.8, y, 11.7, 0.7);
    s.addShape(RRECT, {
      x: 1.0, y: y + 0.1, w: 0.5, h: 0.5,
      fill: { color: C.primaryPale },
      rectRadius: 0.12,
    });
    s.addText(item.icon, {
      x: 1.0, y: y + 0.1, w: 0.5, h: 0.5,
      fontSize: 16, align: "center", valign: "middle",
    });
    s.addText(item.text, {
      x: 1.7, y, w: 10.5, h: 0.7,
      fontSize: 13, fontFace: FONT, color: C.text, valign: "middle",
    });
    // Number
    s.addText(String(i + 1), {
      x: 11.6, y, w: 0.7, h: 0.7,
      fontSize: 18, fontFace: FONT, bold: true, color: C.primaryPale, align: "center", valign: "middle",
    });
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 03 MARKET CHALLENGE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide03(pptx: PptxGenJS) {
  const s = lightBg(pptx);
  addSlideNumber(s, 3);
  eyebrow(s, "Market Challenge");
  heading(s, "アプリ制作市場の課題");

  const items = [
    { icon: "💰", title: "高コスト・長期間", desc: "スクラッチ開発は数百万〜数千万円、半年以上。\n中小企業や個人には手が届かない。", color: C.rose },
    { icon: "🔒", title: "作って終わり問題", desc: "リリース後の運用・更新が属人化し、\nコンテンツが止まる。追加費用も膨らむ。", color: C.gold },
    { icon: "🔄", title: "ビジネスモデル変革", desc: "AI時代に受注→制作→納品のフロー型だけ\nでは生き残れない。継続収益が必須に。", color: C.primary },
  ];

  items.forEach((c, i) => {
    const x = 0.8 + i * 4.15;
    elegantCard(s, x, 2.2, 3.85, 4.2);

    iconCircle(s, x + 1.45, 2.55, c.icon, c.color, 0.95);

    s.addText(c.title, {
      x: x + 0.3, y: 3.65, w: 3.25, h: 0.45,
      fontSize: 16, fontFace: FONT, bold: true, color: C.text, align: "center",
    });

    decoLine(s, x + 1.2, 4.15, 1.45, c.color, 75);

    s.addText(c.desc, {
      x: x + 0.35, y: 4.3, w: 3.15, h: 1.8,
      fontSize: 11, fontFace: FONT, color: C.textSub, lineSpacingMultiple: 1.8, align: "center",
    });
  });

  // Bottom CTA bar
  s.addShape(RRECT, { x: 1.5, y: 6.7, w: 10.3, h: 0.5, fill: { color: C.dark }, rectRadius: 0.25 });
  s.addText("→ MS Studioは、これらすべてを解決するプラットフォームです", {
    x: 1.5, y: 6.7, w: 10.3, h: 0.5,
    fontSize: 12, fontFace: FONT, bold: true, color: C.white, align: "center",
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 04 WHAT IS MS STUDIO
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide04(pptx: PptxGenJS) {
  const s = whiteBg(pptx);
  addSlideNumber(s, 4);
  eyebrow(s, "Product Overview");
  heading(s, "MS Studioとは？");
  subtitle(s, "真のノーコード × 最強CMS を備えた、次世代型アプリ制作プラットフォーム。\nWebアプリ・iOSアプリ・Androidアプリを、CMS付きで構築・運用できます。");

  const pillars = [
    { icon: "🛠", title: "アプリを作る", desc: "Web / iOS / Androidに対応。\n標準機能を組み合わせて\n低コスト・短納期で制作。", color: C.primary },
    { icon: "⚙️", title: "アプリを運用する", desc: "CMS標準搭載。投稿、通知、\n会員管理、予約、チャット等を\n管理画面から誰でも更新可能。", color: C.accent },
    { icon: "💼", title: "アプリビジネスを作る", desc: "パートナー制度で制作会社・\n代理店・クリエイターが\n継続収益を得られる。", color: C.green },
  ];

  pillars.forEach((p, i) => {
    const x = 0.8 + i * 4.15;
    colorTopCard(s, x, 3.1, 3.85, 3.8, p.color);

    iconCircle(s, x + 1.45, 3.4, p.icon, p.color, 0.95);

    s.addText(p.title, {
      x: x + 0.3, y: 4.5, w: 3.25, h: 0.45,
      fontSize: 16, fontFace: FONT, bold: true, color: C.text, align: "center",
    });
    s.addText(p.desc, {
      x: x + 0.35, y: 5.05, w: 3.15, h: 1.6,
      fontSize: 11, fontFace: FONT, color: C.textSub, lineSpacingMultiple: 1.75, align: "center",
    });
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 05 CMS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide05(pptx: PptxGenJS) {
  const s = whiteBg(pptx);
  addSlideNumber(s, 5);
  eyebrow(s, "CMS / Dashboard");
  heading(s, "アプリは、リリースしてからが本番。");
  subtitle(s, "リリース後の更新・運用まで管理できるCMSを標準提供。プログラミング不要。");

  const features = [
    "投稿コンテンツの追加・編集", "固定ページの管理", "プッシュ通知の配信",
    "会員管理・セグメント", "予約管理", "チャット対応",
    "アンケート配信", "クーポン発行", "ファイル管理",
    "アプリ画面プレビュー", "分析ダッシュボード", "権限ロール設定",
  ];

  features.forEach((f, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const x = 0.8 + col * 3.1;
    const y = 2.8 + row * 1.35;

    elegantCard(s, x, y, 2.85, 1.1);

    s.addShape(RRECT, {
      x: x + 0.2, y: y + 0.25, w: 0.4, h: 0.4,
      fill: { color: C.primaryPale },
      rectRadius: 0.1,
    });
    s.addText("✓", {
      x: x + 0.2, y: y + 0.25, w: 0.4, h: 0.4,
      fontSize: 14, fontFace: FONT, bold: true, color: C.primary, align: "center", valign: "middle",
    });
    s.addText(f, {
      x: x + 0.75, y: y + 0.15, w: 1.9, h: 0.6,
      fontSize: 10.5, fontFace: FONT, color: C.text, valign: "middle",
    });
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 06 FEATURES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide06(pptx: PptxGenJS) {
  const s = lightBg(pptx);
  addSlideNumber(s, 6);
  eyebrow(s, "All-in-one Features");
  heading(s, "アプリ運用に必要な機能を、標準搭載。");

  const groups = [
    { label: "情報発信", items: "投稿 / 固定コンテンツ / プッシュ通知\nポップアップ / Webビュー / SNSリンク", color: C.primary, icon: "📢" },
    { label: "会員・ユーザー管理", items: "会員管理 / ログイン\n権限管理 / セグメント配信", color: C.accent, icon: "👥" },
    { label: "コミュニケーション", items: "チャット / 問い合わせ\nアンケート / スタンプ / クーポン", color: C.green, icon: "💬" },
    { label: "コンテンツ管理", items: "カタログ / フォトギャラリー\nムービー / ファイル管理", color: "EA580C", icon: "📁" },
    { label: "業務支援", items: "シンプル予約 / 予約機能\nマップコンテンツ / 分析", color: C.platinum, icon: "📋" },
    { label: "拡張機能", items: "EC / AI画像生成 / 有償アドオン\nカスタム機能 / API連携", color: C.dark, icon: "🔌" },
  ];

  groups.forEach((g, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.8 + col * 4.15;
    const y = 1.9 + row * 2.85;

    colorTopCard(s, x, y, 3.85, 2.55, g.color);

    iconCircle(s, x + 0.2, y + 0.25, g.icon, g.color, 0.6);

    s.addText(g.label, {
      x: x + 0.95, y: y + 0.3, w: 2.7, h: 0.35,
      fontSize: 13, fontFace: FONT, bold: true, color: C.text,
    });
    s.addText(g.items, {
      x: x + 0.3, y: y + 0.9, w: 3.25, h: 1.4,
      fontSize: 10.5, fontFace: FONT, color: C.textSub, lineSpacingMultiple: 1.7,
    });
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 07 MODES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide07(pptx: PptxGenJS) {
  const s = whiteBg(pptx);
  addSlideNumber(s, 7);
  eyebrow(s, "Two Modes");
  heading(s, "初心者にも、プロにも。2つのモード。");

  // Easy
  colorTopCard(s, 0.8, 2.2, 5.75, 4.3, C.primary);
  pillBadge(s, 1.1, 2.5, "EASY MODE", C.primary);
  s.addText("かんたんモード", { x: 1.1, y: 2.95, w: 5, h: 0.5, fontSize: 20, fontFace: FONT, bold: true, color: C.text });
  s.addText("事業者 / 店舗担当者 / 非エンジニア / 一般の方", { x: 1.1, y: 3.5, w: 5, h: 0.3, fontSize: 9, fontFace: FONT, color: C.textMuted });

  const easyItems = ["テンプレートを選んで、ガイドに沿って入力", "専門知識不要でアプリ制作・運用が可能", "リテラシーの壁を撤廃し、誰でも直感的に"];
  easyItems.forEach((t, i) => {
    glassCard(s, 1.1, 4.1 + i * 0.65, 5.1, 0.55, C.primary);
    s.addText(`✓  ${t}`, { x: 1.3, y: 4.1 + i * 0.65, w: 4.7, h: 0.55, fontSize: 10.5, fontFace: FONT, color: C.text, valign: "middle" });
  });

  // Pro
  colorTopCard(s, 6.8, 2.2, 5.75, 4.3, C.accent);
  pillBadge(s, 7.1, 2.5, "PRO MODE", C.accent);
  s.addText("プロモード", { x: 7.1, y: 2.95, w: 5, h: 0.5, fontSize: 20, fontFace: FONT, bold: true, color: C.text });
  s.addText("制作会社 / 開発会社 / デザイナー / 代理店", { x: 7.1, y: 3.5, w: 5, h: 0.3, fontSize: 9, fontFace: FONT, color: C.textMuted });

  const proItems = ["詳細な画面設計・カスタムCSS・コード差し込み", "テンプレート / コンポーネントの内製・販売", "クライアント案件に最適な自由度の高い編集環境"];
  proItems.forEach((t, i) => {
    glassCard(s, 7.1, 4.1 + i * 0.65, 5.1, 0.55, C.accent);
    s.addText(`✓  ${t}`, { x: 7.3, y: 4.1 + i * 0.65, w: 4.7, h: 0.55, fontSize: 10.5, fontFace: FONT, color: C.text, valign: "middle" });
  });

  // Bottom highlight
  glassCard(s, 3.2, 6.75, 6.9, 0.45, C.accent);
  s.addText("パートナーの皆さまは「プロモード」でビジネスを展開いただけます", {
    x: 3.2, y: 6.75, w: 6.9, h: 0.45,
    fontSize: 10, fontFace: FONT, bold: true, color: C.accent, align: "center", valign: "middle",
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 08 PARTNER OVERVIEW
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide08(pptx: PptxGenJS) {
  const s = darkBg(pptx);
  addSlideNumber(s, 8, true);
  eyebrow(s, "Partner Program", { color: C.primaryLight });
  heading(s, "MS Studio上で、\nアプリビジネスを始める。", { color: C.white, fontSize: 28 });
  subtitle(s, "制作会社、開発会社、デザイン会社、個人クリエイター、代理店は、\nMS Studioを活用してアプリ制作サービスを展開できます。", { color: C.textMuted });

  const points = [
    { text: "自社クライアント向けにアプリ制作ができる", icon: "🛠" },
    { text: "ライセンス利用料のレベニューシェアを受けられる", icon: "💰" },
    { text: "テンプレートやコンポーネントを販売できる", icon: "🏪" },
    { text: "パートナーランクに応じて還元率が上がる", icon: "📈" },
    { text: "エムスタ経済圏内で認知・信用力を獲得できる", icon: "🌐" },
    { text: "AI時代の新しい制作ビジネス環境として活用できる", icon: "🤖" },
  ];

  points.forEach((p, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.8 + col * 6.15;
    const y = 3.3 + row * 1.2;

    darkCard(s, x, y, 5.85, 1.0);
    s.addShape(RRECT, {
      x: x + 0.2, y: y + 0.2, w: 0.55, h: 0.55,
      fill: { color: C.primary, transparency: 85 },
      rectRadius: 0.14,
    });
    s.addText(p.icon, {
      x: x + 0.2, y: y + 0.2, w: 0.55, h: 0.55,
      fontSize: 18, align: "center", valign: "middle",
    });
    s.addText(p.text, {
      x: x + 0.9, y, w: 4.7, h: 1.0,
      fontSize: 12, fontFace: FONT, color: C.white, valign: "middle",
    });
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 09 PARTNER TYPES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide09(pptx: PptxGenJS) {
  const s = whiteBg(pptx);
  addSlideNumber(s, 9);
  eyebrow(s, "Partner Types");
  heading(s, "3つのパートナー種別");

  const types = [
    {
      title: "制作パートナー", target: "制作会社 / 開発会社 / デザイナー",
      desc: "プロモードでクライアント向けアプリを制作。自社メニューに「アプリ制作」を追加。",
      bullets: ["自社クライアント向けにアプリ制作", "プロモードで自由度の高い設計", "完成後はクライアントがCMSで自走"],
      color: C.primary, icon: "🛠",
    },
    {
      title: "紹介パートナー", target: "広告代理店 / 営業会社",
      desc: "紹介・販売・アフィリエイトプログラムとして参加。",
      bullets: ["紹介経由のアカウントから継続収益", "代理店としてレベニューシェア獲得", "アフィリエイト経由の獲得も対応"],
      color: C.accent, icon: "🤝",
    },
    {
      title: "テンプレート販売", target: "デザイナー / クリエイター",
      desc: "デザインパッケージ、コンポーネント、コンテンツの型を販売。",
      bullets: ["テンプレート / コンポーネント販売", "業界特化テンプレートも展開可能", "マーケットプレイス上での流通"],
      color: C.dark, icon: "🎨",
    },
  ];

  types.forEach((t, i) => {
    const x = 0.8 + i * 4.15;
    colorTopCard(s, x, 2.1, 3.85, 5.0, t.color);

    iconCircle(s, x + 1.45, 2.4, t.icon, t.color, 0.95);

    s.addText(t.title, { x: x + 0.3, y: 3.5, w: 3.25, h: 0.4, fontSize: 15, fontFace: FONT, bold: true, color: C.text, align: "center" });
    s.addText(t.target, { x: x + 0.3, y: 3.95, w: 3.25, h: 0.25, fontSize: 9, fontFace: FONT, color: C.textMuted, align: "center" });

    decoLine(s, x + 0.8, 4.3, 2.25, C.border);

    s.addText(t.desc, { x: x + 0.35, y: 4.4, w: 3.15, h: 0.7, fontSize: 10, fontFace: FONT, color: C.textSub, lineSpacingMultiple: 1.6 });

    t.bullets.forEach((b, bi) => {
      glassCard(s, x + 0.25, 5.2 + bi * 0.55, 3.35, 0.45, t.color);
      s.addText(`✓  ${b}`, { x: x + 0.4, y: 5.2 + bi * 0.55, w: 3.05, h: 0.45, fontSize: 9.5, fontFace: FONT, color: C.text, valign: "middle" });
    });
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 10 WHY STOCK REVENUE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide10(pptx: PptxGenJS) {
  const s = primaryBg(pptx);
  addSlideNumber(s, 10, true);
  eyebrow(s, "Revenue Model", { color: C.white });
  heading(s, "なぜ「ストック収益」が重要なのか", { color: C.white });

  // Left: old model
  elegantCard(s, 0.8, 2.3, 5.75, 4.6, { fill: C.white });

  pillBadge(s, 1.1, 2.55, "従来モデル", C.rose);
  s.addText("フロー型（売り切り）", { x: 1.1, y: 3.0, w: 5, h: 0.45, fontSize: 16, fontFace: FONT, bold: true, color: C.text });

  const flow = ["受注", "制作", "納品", "終了"];
  flow.forEach((f, i) => {
    const fx = 1.3 + i * 1.2;
    s.addShape(RRECT, { x: fx, y: 3.65, w: 0.9, h: 0.4, fill: { color: C.bg }, rectRadius: 0.1 });
    s.addText(f, { x: fx, y: 3.65, w: 0.9, h: 0.4, fontSize: 10, fontFace: FONT, bold: true, color: C.textSub, align: "center", valign: "middle" });
    if (i < 3) s.addText("→", { x: fx + 0.85, y: 3.65, w: 0.35, h: 0.4, fontSize: 12, color: C.textMuted, align: "center", valign: "middle" });
  });

  const problems = ["案件が途切れると売上がゼロ", "毎月ゼロからの営業が必要", "運用フェーズの収益機会を逃す"];
  problems.forEach((p, i) => {
    s.addText(`✗  ${p}`, { x: 1.3, y: 4.35 + i * 0.5, w: 4.8, h: 0.4, fontSize: 11, fontFace: FONT, color: C.rose });
  });

  // Right: new model
  elegantCard(s, 6.8, 2.3, 5.75, 4.6, { fill: C.white });

  pillBadge(s, 7.1, 2.55, "MS STUDIO モデル", C.primary);
  s.addText("フロー + ストックの二段構え", { x: 7.1, y: 3.0, w: 5, h: 0.45, fontSize: 16, fontFace: FONT, bold: true, color: C.text });

  const revenues = [
    { label: "制作費（フロー収入）", color: C.text },
    { label: "月額レベニューシェア（ストック収入）", color: C.primary },
    { label: "テンプレート販売（販売収入）", color: C.accent },
  ];
  revenues.forEach((r, i) => {
    const ry = 3.6 + i * 0.75;
    glassCard(s, 7.1, ry, 5.1, 0.6, r.color);
    if (i > 0) s.addText("+", { x: 7.3, y: ry - 0.2, w: 0.3, h: 0.2, fontSize: 12, fontFace: FONT, bold: true, color: C.primary });
    s.addText(r.label, { x: 7.3, y: ry, w: 4.7, h: 0.6, fontSize: 12, fontFace: FONT, bold: true, color: r.color, valign: "middle" });
  });

  // Highlight box
  s.addShape(RRECT, { x: 7.1, y: 5.85, w: 5.1, h: 0.8, fill: { color: C.primaryPale }, rectRadius: 0.12 });
  s.addText("案件を納品するたびに、\n毎月の収益基盤が積み上がる", {
    x: 7.1, y: 5.85, w: 5.1, h: 0.8,
    fontSize: 11, fontFace: FONT, bold: true, color: C.primaryDeep, align: "center", lineSpacingMultiple: 1.5,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 11 REVENUE RANKS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide11(pptx: PptxGenJS) {
  const s = darkBg(pptx);
  addSlideNumber(s, 11, true);
  eyebrow(s, "Revenue Share", { color: C.primaryLight });
  heading(s, "レベニューシェア ランク制度", { color: C.white });
  subtitle(s, "公開アプリ数や貢献度に応じてランクと還元率が自動向上。やればやるほど、還元率が上がります。", { color: C.textMuted });

  const ranks = [
    { name: "Bronze", rate: "15%", color: C.bronze, bg: "451A03" },
    { name: "Silver", rate: "20%", color: C.silver, bg: "1E293B" },
    { name: "Gold", rate: "25%", color: C.gold, bg: "451A03" },
    { name: "Platinum", rate: "30%", color: C.platinum, bg: "0C4A6E" },
    { name: "Legend", rate: "35%", color: C.legend, bg: "3B0764" },
  ];

  ranks.forEach((r, i) => {
    const x = 0.6 + i * 2.55;

    // Card
    darkCard(s, x, 3.3, 2.25, 3.2);

    // Top color bar
    s.addShape(RECT, { x: x + 0.01, y: 3.31, w: 2.23, h: 0.06, fill: { color: r.color } });

    // Star icon
    s.addShape(ELLIPSE, { x: x + 0.75, y: 3.65, w: 0.75, h: 0.75, fill: { color: r.color, transparency: 85 } });
    s.addText("★", { x: x + 0.75, y: 3.65, w: 0.75, h: 0.75, fontSize: 22, color: r.color, align: "center", valign: "middle" });

    s.addText(r.name, { x, y: 4.5, w: 2.25, h: 0.35, fontSize: 12, fontFace: FONT, bold: true, color: C.white, align: "center" });

    // Big percentage
    s.addText(r.rate, { x, y: 4.9, w: 2.25, h: 0.75, fontSize: 36, fontFace: FONT, bold: true, color: r.color, align: "center" });

    s.addText("還元", { x, y: 5.65, w: 2.25, h: 0.25, fontSize: 9, fontFace: FONT, color: C.textMuted, align: "center" });

    // Arrow
    if (i < 4) {
      s.addText("→", { x: x + 2.1, y: 4.85, w: 0.5, h: 0.5, fontSize: 16, color: C.darkMid, align: "center", valign: "middle" });
    }
  });

  // Bottom note
  s.addShape(RRECT, { x: 1.5, y: 6.75, w: 10.3, h: 0.45, fill: { color: C.darkCard }, rectRadius: 0.22, line: { color: C.darkMid, width: 0.5 } });
  s.addText("エンドクライアントの月額課金に対して、上記の還元率が毎月パートナーに支払われます", {
    x: 1.5, y: 6.75, w: 10.3, h: 0.45,
    fontSize: 10, fontFace: FONT, color: C.textMuted, align: "center",
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 12 REVENUE CALC
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide12(pptx: PptxGenJS) {
  const s = whiteBg(pptx);
  addSlideNumber(s, 12);
  eyebrow(s, "Revenue Calculation");
  heading(s, "レベニューシェア 計算の仕組み");

  // Left: fee table
  elegantCard(s, 0.8, 2.0, 7.3, 4.0);
  s.addText("1アプリあたりの月額課金構造", { x: 1.1, y: 2.2, w: 6, h: 0.35, fontSize: 13, fontFace: FONT, bold: true, color: C.text });

  const rows = [
    { label: "アカウント基本利用料", price: "¥3,000 / 月", tag: "必須", tagColor: C.primary },
    { label: "Webアプリ公開", price: "¥2,000 / URL", tag: "Web", tagColor: C.green },
    { label: "iOSアプリ公開", price: "¥5,000 / 月", tag: "iOS", tagColor: C.dark },
    { label: "Androidアプリ公開", price: "¥5,000 / 月", tag: "Android", tagColor: C.green },
  ];

  rows.forEach((r, i) => {
    const y = 2.75 + i * 0.7;
    s.addShape(RRECT, { x: 1.1, y, w: 6.7, h: 0.58, fill: { color: i % 2 === 0 ? C.offWhite : C.white }, rectRadius: 0.08 });

    pillBadge(s, 1.25, y + 0.15, r.tag, r.tagColor);
    s.addText(r.label, { x: 2.4, y, w: 2.8, h: 0.58, fontSize: 11, fontFace: FONT, color: C.text, valign: "middle" });
    s.addText(r.price, { x: 5.3, y, w: 2.3, h: 0.58, fontSize: 13, fontFace: FONT, bold: true, color: C.text, align: "right", valign: "middle" });
  });

  // Example totals
  glassCard(s, 1.1, 5.55, 6.7, 0.35, C.primary);
  s.addText("例: Web + iOS → 月額 ¥10,000 / アプリ     Web + iOS + Android → 月額 ¥15,000", {
    x: 1.3, y: 5.55, w: 6.3, h: 0.35, fontSize: 9.5, fontFace: FONT, bold: true, color: C.primary, valign: "middle",
  });

  // Right: formula
  elegantCard(s, 8.4, 2.0, 4.2, 4.0, { fill: C.dark, border: C.darkMid });
  s.addText("計算式", { x: 8.7, y: 2.25, w: 3.6, h: 0.25, fontSize: 9, fontFace: FONT, bold: true, color: C.textMuted });

  const formula = [
    { text: "月間レベニュー", size: 16, color: C.white, bold: true },
    { text: "＝", size: 18, color: C.primaryLight, bold: false },
    { text: "公開アプリ数", size: 14, color: C.primaryLight, bold: true },
    { text: "×", size: 18, color: C.primaryLight, bold: false },
    { text: "月額単価", size: 14, color: C.primaryLight, bold: true },
    { text: "×", size: 18, color: C.primaryLight, bold: false },
    { text: "還元率 %", size: 14, color: C.primaryLight, bold: true },
  ];

  formula.forEach((f, i) => {
    s.addText(f.text, {
      x: 8.7, y: 2.7 + i * 0.42, w: 3.6, h: 0.38,
      fontSize: f.size, fontFace: FONT, bold: f.bold, color: f.color,
    });
  });

  // Bottom note
  glassCard(s, 0.8, 6.3, 11.7, 0.55, C.primary);
  s.addText("💡  この月額課金に対して、パートナーランクの還元率%がレベニューシェアとして毎月支払われます", {
    x: 1.0, y: 6.3, w: 11.3, h: 0.55, fontSize: 10.5, fontFace: FONT, bold: true, color: C.primaryDeep, valign: "middle",
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Revenue Example Template
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function revenueSlide(
  pptx: PptxGenJS, num: number,
  d: {
    persona: string; rank: string; rankColor: string; scenario: string;
    numbers: { label: string; value: string; highlight?: boolean }[];
    message: string;
    projection: { year: string; monthly: string; annual: string }[];
  },
) {
  const s = lightBg(pptx);
  addSlideNumber(s, num);
  eyebrow(s, "Revenue Simulation");
  heading(s, `収益例 :  ${d.persona}`, { fontSize: 26 });

  // Rank badge
  pillBadge(s, 0.8, 1.6, d.rank, d.rankColor);

  // Scenario
  s.addText(d.scenario, { x: 0.8, y: 1.95, w: 11.7, h: 0.5, fontSize: 11, fontFace: FONT, color: C.textSub, lineSpacingMultiple: 1.6 });

  // Left: numbers
  elegantCard(s, 0.8, 2.7, 7.3, 2.6);
  s.addText("収益内訳", { x: 1.1, y: 2.85, w: 3, h: 0.25, fontSize: 9, fontFace: FONT, bold: true, color: C.textMuted });

  d.numbers.forEach((n, i) => {
    const y = 3.2 + i * 0.65;
    const hl = n.highlight;
    s.addShape(RRECT, {
      x: 1.1, y, w: 6.7, h: 0.55,
      fill: { color: hl ? C.primaryPale : (i % 2 === 0 ? C.offWhite : C.white) },
      rectRadius: 0.08,
    });
    s.addText(n.label, { x: 1.3, y, w: 4, h: 0.55, fontSize: 11, fontFace: FONT, color: hl ? C.primaryDeep : C.textSub, valign: "middle" });
    s.addText(n.value, { x: 5.3, y, w: 2.3, h: 0.55, fontSize: 16, fontFace: FONT, bold: true, color: hl ? C.primaryDeep : C.text, align: "right", valign: "middle" });
  });

  // Right: projection
  elegantCard(s, 8.4, 2.7, 4.2, 2.6, { fill: C.dark, border: C.darkMid });
  s.addText("ストック収益の積み上がり", { x: 8.7, y: 2.85, w: 3.6, h: 0.25, fontSize: 9, fontFace: FONT, bold: true, color: C.textMuted });

  // Header
  s.addText("期間", { x: 8.7, y: 3.2, w: 1.0, h: 0.3, fontSize: 8, fontFace: FONT, color: C.textMuted });
  s.addText("月額", { x: 9.7, y: 3.2, w: 1.3, h: 0.3, fontSize: 8, fontFace: FONT, color: C.textMuted, align: "right" });
  s.addText("年間累計", { x: 11.0, y: 3.2, w: 1.3, h: 0.3, fontSize: 8, fontFace: FONT, color: C.textMuted, align: "right" });

  d.projection.forEach((p, i) => {
    const y = 3.55 + i * 0.55;
    s.addShape(RECT, { x: 8.7, y: y + 0.45, w: 3.6, h: 0.01, fill: { color: C.darkMid } });
    s.addText(p.year, { x: 8.7, y, w: 1.0, h: 0.45, fontSize: 10, fontFace: FONT, color: C.textMuted, valign: "middle" });
    s.addText(p.monthly, { x: 9.7, y, w: 1.3, h: 0.45, fontSize: 10, fontFace: FONT, color: C.primaryLight, align: "right", valign: "middle" });
    s.addText(p.annual, { x: 11.0, y, w: 1.3, h: 0.45, fontSize: 13, fontFace: FONT, bold: true, color: C.white, align: "right", valign: "middle" });
  });

  // Bar chart
  const maxVal = parseInt(d.projection[d.projection.length - 1].annual.replace(/[^0-9]/g, "")) || 1;
  d.projection.forEach((p, i) => {
    const val = parseInt(p.annual.replace(/[^0-9]/g, "")) || 0;
    const barW = Math.max((val / maxVal) * 10, 0.2);
    const y = 5.65 + i * 0.4;
    s.addText(p.year, { x: 0.8, y, w: 1.0, h: 0.3, fontSize: 8, fontFace: FONT, color: C.textMuted });
    s.addShape(RRECT, {
      x: 1.9, y: y + 0.04, w: barW, h: 0.22,
      fill: { color: d.rankColor },
      rectRadius: 0.05,
    });
    s.addText(p.annual, { x: 1.9 + barW + 0.15, y, w: 2, h: 0.3, fontSize: 9, fontFace: FONT, bold: true, color: C.text });
  });

  // Highlight message
  s.addShape(RRECT, { x: 0.8, y: 6.9, w: 11.7, h: 0.45, fill: { color: C.primaryPale }, rectRadius: 0.22 });
  s.addText(`💡  ${d.message}`, {
    x: 1.0, y: 6.9, w: 11.3, h: 0.45,
    fontSize: 10.5, fontFace: FONT, bold: true, color: C.primaryDeep, valign: "middle",
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 13-15 REVENUE EXAMPLES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide13(pptx: PptxGenJS) {
  revenueSlide(pptx, 13, {
    persona: "Web制作会社 A社",
    rank: "Gold（25%還元）", rankColor: C.gold,
    scenario: "月5件のクライアント案件をMS Studioで制作。アカウント基本利用料+アプリ公開料が継続課金されるため、制作後も毎月レベニューシェアが発生。",
    numbers: [
      { label: "制作売上 / 件", value: "¥150,000" },
      { label: "継続レベニュー / 月（5件）", value: "約 ¥18,750" },
      { label: "年間継続収益", value: "約 ¥225,000", highlight: true },
    ],
    message: "制作単価に加えて、ストック型の継続収益が積み上がるモデル。1年後には月5万円超のストック収益に。",
    projection: [
      { year: "1年目", monthly: "¥18,750/月", annual: "¥225,000" },
      { year: "2年目", monthly: "¥37,500/月", annual: "¥675,000" },
      { year: "3年目", monthly: "¥56,250/月", annual: "¥1,350,000" },
    ],
  });
}

function slide14(pptx: PptxGenJS) {
  revenueSlide(pptx, 14, {
    persona: "フリーランスデザイナー Bさん",
    rank: "Silver（20%還元）", rankColor: C.silver,
    scenario: "月2件のミニアプリ制作を受注。セルフ構築+3hパックを活用してスピード納品。テンプレートも2点販売中。",
    numbers: [
      { label: "制作売上 / 月", value: "¥100,000" },
      { label: "テンプレート販売 / 月", value: "約 ¥30,000" },
      { label: "継続レベニュー / 月", value: "約 ¥6,000", highlight: true },
    ],
    message: "テンプレート販売 × 継続シェアで、固定費をカバーする副収入源に。制作+販売+ストックの三本柱。",
    projection: [
      { year: "1年目", monthly: "¥6,000/月", annual: "¥72,000" },
      { year: "2年目", monthly: "¥12,000/月", annual: "¥216,000" },
      { year: "3年目", monthly: "¥18,000/月", annual: "¥432,000" },
    ],
  });
}

function slide15(pptx: PptxGenJS) {
  revenueSlide(pptx, 15, {
    persona: "アプリ開発会社 C社",
    rank: "Platinum（30%還元）", rankColor: C.platinum,
    scenario: "オフィシャル制作パートナーとして月10件以上を継続納品。エムスタFullでの大型案件も対応し、既存クライアントの運用も一括管理。",
    numbers: [
      { label: "制作売上 / 月", value: "¥1,500,000+" },
      { label: "継続レベニュー / 月（30件）", value: "約 ¥135,000" },
      { label: "年間継続収益", value: "約 ¥1,620,000", highlight: true },
    ],
    message: "制作実績の積み上げに比例して、ストック収益が事業の安定基盤に。3年目には月40万円超の安定収入。",
    projection: [
      { year: "1年目", monthly: "¥135,000/月", annual: "¥1,620,000" },
      { year: "2年目", monthly: "¥270,000/月", annual: "¥4,860,000" },
      { year: "3年目", monthly: "¥405,000/月", annual: "¥9,720,000" },
    ],
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 16 MARKETPLACE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide16(pptx: PptxGenJS) {
  const s = whiteBg(pptx);
  addSlideNumber(s, 16);
  eyebrow(s, "Marketplace");
  heading(s, "テンプレート販売で、さらなる収益機会。");
  subtitle(s, "制作費 + ストック + 販売収入の3つの収益源を実現。");

  const items = [
    { text: "有償アドオン機能", icon: "🔌" }, { text: "UIテンプレート", icon: "🎨" },
    { text: "デザインテンプレート", icon: "✨" }, { text: "コンテンツテンプレート", icon: "📝" },
    { text: "業界特化テンプレート", icon: "🏢" }, { text: "パートナー独自機能", icon: "🛠" },
    { text: "API連携", icon: "🔗" },
  ];

  items.forEach((it, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const x = 0.8 + col * 3.1;
    const y = 3.0 + row * 1.2;

    elegantCard(s, x, y, 2.85, 0.95);
    s.addText(it.icon, { x: x + 0.15, y: y + 0.15, w: 0.5, h: 0.65, fontSize: 18, valign: "middle" });
    s.addText(it.text, { x: x + 0.65, y, w: 2.0, h: 0.95, fontSize: 11, fontFace: FONT, bold: true, color: C.text, valign: "middle" });
  });

  // Two benefits
  const bens = [
    { role: "ユーザー", desc: "必要な機能を、必要なタイミングで追加できる。", color: C.primary, icon: "👤" },
    { role: "パートナー", desc: "自社の技術やデザインを、エムスタ上で販売できる。", color: C.accent, icon: "🤝" },
  ];
  bens.forEach((b, i) => {
    const x = 0.8 + i * 6.15;
    colorTopCard(s, x, 5.6, 5.85, 1.2, b.color);
    s.addText(b.icon, { x: x + 0.25, y: 5.75, w: 0.5, h: 0.85, fontSize: 20, valign: "middle" });
    s.addText(b.role, { x: x + 0.8, y: 5.7, w: 4.5, h: 0.35, fontSize: 9, fontFace: FONT, bold: true, color: C.textMuted });
    s.addText(b.desc, { x: x + 0.8, y: 6.05, w: 4.5, h: 0.5, fontSize: 13, fontFace: FONT, bold: true, color: C.text });
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 17 AI
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide17(pptx: PptxGenJS) {
  const s = whiteBg(pptx);
  addSlideNumber(s, 17);
  eyebrow(s, "AI Support");
  heading(s, "AIが、制作と運用を支援する。");
  subtitle(s, "制作効率を上げる = 同じ時間でより多くの案件を回せる = 収益増に直結。");

  const cats = [
    { title: "制作支援", items: ["企画整理", "画面構成提案", "コンテンツ構成提案", "UI生成支援"], color: C.primary, icon: "🛠" },
    { title: "運用支援", items: ["投稿内容の整理", "プッシュ通知文面作成", "FAQ生成", "運用改善提案"], color: C.accent, icon: "⚙️" },
    { title: "サポート支援", items: ["運用・操作マニュアル", "申請準備サポート", "初期設定ガイド", "AIエージェント（予定）"], color: C.green, icon: "🎧" },
  ];

  cats.forEach((cat, i) => {
    const x = 0.8 + i * 4.15;
    colorTopCard(s, x, 3.0, 3.85, 4.0, cat.color);

    iconCircle(s, x + 1.45, 3.3, cat.icon, cat.color, 0.9);

    s.addText(cat.title, { x: x + 0.3, y: 4.3, w: 3.25, h: 0.4, fontSize: 15, fontFace: FONT, bold: true, color: C.text, align: "center" });

    cat.items.forEach((item, j) => {
      glassCard(s, x + 0.25, 4.85 + j * 0.5, 3.35, 0.42, cat.color);
      s.addText(`✓  ${item}`, { x: x + 0.4, y: 4.85 + j * 0.5, w: 3.05, h: 0.42, fontSize: 10, fontFace: FONT, color: C.text, valign: "middle" });
    });
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 18 TEAM ROLES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide18(pptx: PptxGenJS) {
  const s = lightBg(pptx);
  addSlideNumber(s, 18);
  eyebrow(s, "Team Management");
  heading(s, "チームでも、組織でも、安全に運用できる。");
  subtitle(s, "クライアント納品後も安全に運用委譲。外部パートナーを巻き込んだ運用にも対応。");

  const roles = [
    { role: "管理者", desc: "すべての機能に\nアクセス可能", color: C.primary, icon: "👑" },
    { role: "編集者", desc: "コンテンツ・画面の\n編集が可能", color: C.accent, icon: "✏️" },
    { role: "投稿者", desc: "投稿のみ可能", color: C.green, icon: "📝" },
    { role: "閲覧者", desc: "閲覧のみ", color: C.silver, icon: "👁" },
    { role: "外部パートナー", desc: "制作パートナー\n向け権限", color: C.gold, icon: "🤝" },
  ];

  roles.forEach((r, i) => {
    const x = 0.5 + i * 2.55;
    elegantCard(s, x, 3.2, 2.25, 2.8);

    s.addShape(ELLIPSE, { x: x + 0.7, y: 3.4, w: 0.85, h: 0.85, fill: { color: r.color, transparency: 88 } });
    s.addText(r.icon, { x: x + 0.7, y: 3.4, w: 0.85, h: 0.85, fontSize: 24, align: "center", valign: "middle" });

    s.addText(r.role, { x, y: 4.4, w: 2.25, h: 0.35, fontSize: 12, fontFace: FONT, bold: true, color: C.text, align: "center" });
    s.addText(r.desc, { x: x + 0.15, y: 4.8, w: 1.95, h: 0.8, fontSize: 9, fontFace: FONT, color: C.textSub, align: "center", lineSpacingMultiple: 1.5 });
  });

  glassCard(s, 2.5, 6.3, 8.3, 0.45, C.primary);
  s.addText("アカウント内に複数アプリを作成でき、アプリごとに権限を付与することも可能です", {
    x: 2.5, y: 6.3, w: 8.3, h: 0.45, fontSize: 10, fontFace: FONT, color: C.primaryDeep, align: "center", valign: "middle",
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 19 USECASES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide19(pptx: PptxGenJS) {
  const s = whiteBg(pptx);
  addSlideNumber(s, 19);
  eyebrow(s, "Use Cases");
  heading(s, "パートナーが提案できる案件例");

  const cases = [
    { industry: "店舗・施設", items: "会員アプリ / 予約 / クーポン / 来店管理", pitch: "会員アプリで来店促進したい店舗に最適", color: C.primary, icon: "🏪" },
    { industry: "教育・スクール", items: "学習アプリ / お知らせ / 資料共有 / 出欠管理", pitch: "保護者への情報発信を効率化", color: C.accent, icon: "🎓" },
    { industry: "医療・団体", items: "情報インフラ / 災害時連絡 / アンケート", pitch: "会員への確実な情報伝達手段として", color: C.green, icon: "🏥" },
    { industry: "クリエイター", items: "ファンコミュニティ / 限定情報 / イベント告知", pitch: "ファンとの接点をアプリで構築", color: C.gold, icon: "🎨" },
    { industry: "企業・社内", items: "社内ポータル / ナレッジ共有 / 業務連絡", pitch: "社内情報の集約と効率化", color: C.dark, icon: "🏢" },
  ];

  cases.forEach((c, i) => {
    const y = 2.0 + i * 1.05;
    elegantCard(s, 0.8, y, 11.7, 0.88);

    // Left color indicator
    s.addShape(RECT, { x: 0.81, y: y + 0.01, w: 0.06, h: 0.86, fill: { color: c.color } });

    s.addText(c.icon, { x: 1.1, y, w: 0.5, h: 0.88, fontSize: 18, valign: "middle" });
    s.addText(c.industry, { x: 1.7, y, w: 1.8, h: 0.88, fontSize: 13, fontFace: FONT, bold: true, color: C.text, valign: "middle" });
    s.addText(c.items, { x: 3.6, y, w: 4.5, h: 0.88, fontSize: 10, fontFace: FONT, color: C.textSub, valign: "middle" });

    glassCard(s, 8.3, y + 0.18, 3.9, 0.52, c.color);
    s.addText(`💡 ${c.pitch}`, { x: 8.5, y: y + 0.18, w: 3.5, h: 0.52, fontSize: 9.5, fontFace: FONT, color: C.text, valign: "middle" });
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 20 CASES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide20(pptx: PptxGenJS) {
  const s = lightBg(pptx);
  addSlideNumber(s, 20);
  eyebrow(s, "Customer Cases");
  heading(s, "導入事例");

  const cases = [
    { name: "鳥取県歯科医師会\nApp歯っ鳥くん", cat: "医療", feat: "会員管理 / 通知 / ファイル共有", result: "情報共有スピード・到達率向上" },
    { name: "パンチョ\n診断コンテンツ", cat: "店舗", feat: "ポップアップ / アンケート / クーポン", result: "来店動機創出・ファン層の見える化" },
    { name: "天天中文", cat: "教育", feat: "会員管理 / コンテンツ配信 / 通知", result: "学習継続率向上" },
    { name: "トラスポMAP", cat: "業務", feat: "マップ / 投稿 / 通知", result: "現場情報共有スピード改善" },
    { name: "FBスカウト\n公式アプリ", cat: "企業", feat: "会員管理 / 通知 / コンテンツ", result: "案件流通の透明性向上" },
    { name: "たるファミ\n公式アプリ", cat: "コミュニティ", feat: "会員限定 / 投稿 / 通知", result: "コアファン満足度向上" },
  ];

  cases.forEach((c, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.8 + col * 4.15;
    const y = 2.0 + row * 2.7;

    elegantCard(s, x, y, 3.85, 2.45);

    pillBadge(s, x + 0.2, y + 0.2, c.cat, C.dark);
    s.addText(c.name, { x: x + 0.25, y: y + 0.55, w: 3.35, h: 0.65, fontSize: 12, fontFace: FONT, bold: true, color: C.text, lineSpacingMultiple: 1.3 });

    decoLine(s, x + 0.25, y + 1.25, 3.35, C.border);

    s.addText("活用機能", { x: x + 0.25, y: y + 1.35, w: 3.35, h: 0.2, fontSize: 8, fontFace: FONT, bold: true, color: C.textMuted });
    s.addText(c.feat, { x: x + 0.25, y: y + 1.55, w: 3.35, h: 0.3, fontSize: 9, fontFace: FONT, color: C.textSub });

    s.addText("効果", { x: x + 0.25, y: y + 1.9, w: 3.35, h: 0.2, fontSize: 8, fontFace: FONT, bold: true, color: C.textMuted });
    s.addText(c.result, { x: x + 0.25, y: y + 2.1, w: 3.35, h: 0.3, fontSize: 10, fontFace: FONT, bold: true, color: C.primary });
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 21 PRICING
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide21(pptx: PptxGenJS) {
  const s = whiteBg(pptx);
  addSlideNumber(s, 21);
  eyebrow(s, "Pricing");
  heading(s, "エンドクライアントへの提案価格");

  // Left
  elegantCard(s, 0.8, 2.1, 5.85, 4.5);
  s.addText("利用料金", { x: 1.1, y: 2.3, w: 5, h: 0.35, fontSize: 14, fontFace: FONT, bold: true, color: C.text });

  const prices = [
    { item: "2週間無料トライアル", price: "¥0", color: C.primary },
    { item: "アカウント基本利用料", price: "¥3,000/月", color: C.text },
    { item: "Webアプリ公開", price: "¥2,000/URL", color: C.text },
    { item: "iOSアプリ公開", price: "¥5,000/月", color: C.text },
    { item: "Androidアプリ公開", price: "¥5,000/月", color: C.text },
  ];

  prices.forEach((p, i) => {
    const y = 2.85 + i * 0.68;
    s.addShape(RRECT, { x: 1.1, y, w: 5.25, h: 0.56, fill: { color: i % 2 === 0 ? C.offWhite : C.white }, rectRadius: 0.08 });
    s.addText(p.item, { x: 1.3, y, w: 3, h: 0.56, fontSize: 11, fontFace: FONT, color: C.text, valign: "middle" });
    s.addText(p.price, { x: 4.3, y, w: 1.9, h: 0.56, fontSize: 14, fontFace: FONT, bold: true, color: p.color, align: "right", valign: "middle" });
  });

  // Right
  elegantCard(s, 6.9, 2.1, 5.85, 4.5);
  s.addText("制作サービス", { x: 7.2, y: 2.3, w: 5, h: 0.35, fontSize: 14, fontFace: FONT, bold: true, color: C.text });

  const services = [
    { name: "オフィシャル制作", price: "¥100,000〜", desc: "企画〜構築を公式チームが代行", color: C.primary },
    { name: "3hパック", price: "¥35,000/回", desc: "ローンチ記念半額（通常¥70,000）\nオンライン3時間リアルタイム制作", color: C.accent },
    { name: "エムスタFull", price: "個別見積り", desc: "独自機能開発・高度UI/UX\n既存アプリリプレイスに対応", color: C.dark },
  ];

  services.forEach((sv, i) => {
    const y = 2.85 + i * 1.35;
    colorTopCard(s, 7.2, y, 5.25, 1.15, sv.color);
    s.addText(sv.name, { x: 7.4, y: y + 0.15, w: 2.8, h: 0.3, fontSize: 12, fontFace: FONT, bold: true, color: C.text });
    s.addText(sv.price, { x: 10.2, y: y + 0.15, w: 2, h: 0.3, fontSize: 14, fontFace: FONT, bold: true, color: sv.color, align: "right" });
    s.addText(sv.desc, { x: 7.4, y: y + 0.5, w: 4.8, h: 0.55, fontSize: 9, fontFace: FONT, color: C.textSub, lineSpacingMultiple: 1.5 });
  });

  // Bottom
  s.addShape(RRECT, { x: 0.8, y: 6.85, w: 11.7, h: 0.45, fill: { color: C.primaryPale }, rectRadius: 0.22 });
  s.addText("💡  この月額課金に対してレベニューシェアが発生 → パートナーの継続収益に", {
    x: 1.0, y: 6.85, w: 11.3, h: 0.45,
    fontSize: 10.5, fontFace: FONT, bold: true, color: C.primaryDeep, align: "center", valign: "middle",
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 22 FLOW
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide22(pptx: PptxGenJS) {
  const s = whiteBg(pptx);
  addSlideNumber(s, 22);
  eyebrow(s, "Getting Started");
  heading(s, "パートナー導入の流れ");
  subtitle(s, "最短即日でパートナー登録し、すぐに制作を開始できます。");

  const steps = [
    { num: "01", title: "お問い合わせ", desc: "資料DLまたは\nオンライン相談", icon: "💬", color: C.primary },
    { num: "02", title: "ヒアリング", desc: "事業内容と\n活用方針を確認", icon: "🎯", color: C.accent },
    { num: "03", title: "契約", desc: "パートナー契約の\n締結", icon: "📋", color: C.green },
    { num: "04", title: "アカウント発行", desc: "プロモード\nアカウント発行", icon: "🔑", color: C.gold },
    { num: "05", title: "制作開始", desc: "クライアント案件の\n制作スタート", icon: "🛠", color: C.platinum },
    { num: "06", title: "収益化", desc: "レベニューシェアで\n継続収益を獲得", icon: "💰", color: C.primary },
  ];

  steps.forEach((st, i) => {
    const x = 0.4 + i * 2.12;
    elegantCard(s, x, 3.0, 1.9, 3.5);

    s.addShape(ELLIPSE, { x: x + 0.55, y: 3.2, w: 0.8, h: 0.8, fill: { color: st.color, transparency: 88 } });
    s.addText(st.icon, { x: x + 0.55, y: 3.2, w: 0.8, h: 0.8, fontSize: 22, align: "center", valign: "middle" });

    s.addText(st.num, { x, y: 4.15, w: 1.9, h: 0.3, fontSize: 10, fontFace: FONT, bold: true, color: st.color, align: "center" });
    s.addText(st.title, { x, y: 4.45, w: 1.9, h: 0.35, fontSize: 12, fontFace: FONT, bold: true, color: C.text, align: "center" });
    s.addText(st.desc, { x: x + 0.1, y: 4.85, w: 1.7, h: 0.8, fontSize: 9, fontFace: FONT, color: C.textSub, align: "center", lineSpacingMultiple: 1.5 });

    if (i < 5) {
      s.addText("→", { x: x + 1.75, y: 3.45, w: 0.4, h: 0.4, fontSize: 14, color: C.textMuted, align: "center", valign: "middle" });
    }
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 23 FAQ
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide23(pptx: PptxGenJS) {
  const s = lightBg(pptx);
  addSlideNumber(s, 23);
  eyebrow(s, "FAQ");
  heading(s, "よくある質問");

  const faqs = [
    { q: "代理店として利用できますか？", a: "はい。パートナー制度およびレベニューシェア制度をご用意しています。紹介パートナーとしての参加も可能です。" },
    { q: "パートナー登録に費用はかかりますか？", a: "パートナー登録は無料です。まずはオンライン相談で詳細をご確認ください。" },
    { q: "制作を依頼することもできますか？", a: "はい。オフィシャル制作（¥100,000〜）、即日3hパック（¥35,000）、エムスタFullをご用意しています。" },
    { q: "独自機能の開発はできますか？", a: "はい。エムスタFullにて個別要件に対応可能です。既存アプリのリプレイスにも対応します。" },
    { q: "クライアントへの請求はどうなりますか？", a: "利用料金はエンドクライアントに直接請求。パートナーには月額課金に対するレベニューシェアが還元されます。" },
  ];

  faqs.forEach((faq, i) => {
    const y = 2.0 + i * 1.05;
    elegantCard(s, 0.8, y, 11.7, 0.88);

    s.addShape(RRECT, { x: 1.05, y: y + 0.15, w: 0.4, h: 0.4, fill: { color: C.primaryPale }, rectRadius: 0.1 });
    s.addText("Q", { x: 1.05, y: y + 0.15, w: 0.4, h: 0.4, fontSize: 14, fontFace: FONT, bold: true, color: C.primary, align: "center", valign: "middle" });

    s.addText(faq.q, { x: 1.65, y: y + 0.05, w: 10.5, h: 0.35, fontSize: 12, fontFace: FONT, bold: true, color: C.text });
    s.addText(faq.a, { x: 1.65, y: y + 0.42, w: 10.5, h: 0.4, fontSize: 10, fontFace: FONT, color: C.textSub });
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 24 CTA
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide24(pptx: PptxGenJS) {
  const s = darkBg(pptx);

  decoCircle(s, -3, -3, 10, C.primary, 90);
  decoCircle(s, 9, 3, 9, C.accent, 92);

  decoGradientBar(s, 0, 0, SW, 0.06, C.primary, C.accent);

  s.addText("まずは、\nお気軽にご相談ください。", {
    x: 0.8, y: 1.2, w: 10, h: 1.5,
    fontSize: 36, fontFace: FONT, bold: true, color: C.white,
    lineSpacingMultiple: 1.2,
  });

  s.addText("パートナーになる最初のステップは、オンライン相談から。\n制度の詳細、収益モデル、貴社での活用方法など、何でもお気軽にご質問ください。", {
    x: 0.8, y: 2.9, w: 10, h: 0.8,
    fontSize: 12, fontFace: FONT, color: C.textMuted, lineSpacingMultiple: 1.8,
  });

  const ctas = [
    { label: "オンライン相談", desc: "Spirカレンダーから\n日程を選んで予約", color: C.primary, icon: "💬" },
    { label: "パートナー資料DL", desc: "制度概要・収益モデルを\nまとめたPDF資料", color: C.accent, icon: "📄" },
    { label: "無料トライアル", desc: "2週間無料で\nMS Studioを体験", color: C.green, icon: "🚀" },
  ];

  ctas.forEach((cta, i) => {
    const x = 0.8 + i * 4.15;
    darkCard(s, x, 4.1, 3.85, 2.1);
    s.addShape(RECT, { x: x + 0.01, y: 4.11, w: 3.83, h: 0.06, fill: { color: cta.color } });

    s.addShape(ELLIPSE, { x: x + 0.3, y: 4.4, w: 0.6, h: 0.6, fill: { color: cta.color, transparency: 82 } });
    s.addText(cta.icon, { x: x + 0.3, y: 4.4, w: 0.6, h: 0.6, fontSize: 18, align: "center", valign: "middle" });

    s.addText(cta.label, { x: x + 1.05, y: 4.4, w: 2.5, h: 0.35, fontSize: 15, fontFace: FONT, bold: true, color: C.white });
    s.addText(cta.desc, { x: x + 1.05, y: 4.8, w: 2.5, h: 0.7, fontSize: 10, fontFace: FONT, color: C.textMuted, lineSpacingMultiple: 1.5 });
  });

  // Footer
  s.addText("https://msta.app", { x: 0.8, y: 6.4, w: 5, h: 0.3, fontSize: 10, fontFace: FONT, color: C.darkMid });
  s.addText("https://msta.app/partners", { x: 0.8, y: 6.7, w: 5, h: 0.3, fontSize: 10, fontFace: FONT, color: C.darkMid });
  s.addText("R117 Inc.", { x: 0.8, y: 7.0, w: 3, h: 0.3, fontSize: 11, fontFace: FONT, bold: true, color: C.textMuted });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Main
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

async function main() {
  console.log("Generating MS Studio Partner Deck (v2 - Designable)...");
  const pptx = build();
  const outPath = "ms-studio-partner-deck.pptx";
  await pptx.writeFile({ fileName: outPath });
  console.log(`Done! → ${outPath}`);
}

main().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
