/**
 * エムスタ Partner Program 営業資料 V2 PPTX 自動生成スクリプト
 *
 * V2方針: 「制作会社向け資料」ではなく「エムスタ経済圏への参加資料」。
 * 作る人も、紹介する人も、届ける人も参加できることを伝える。
 *
 * 実行: npx tsx scripts/generate-partner-deck.ts
 * 出力: ms-studio-partner-deck.pptx
 */

import PptxGenJS from "pptxgenjs";

// ─── Design Tokens（濃紺 × シアン × 白） ──────────────────────
const C = {
  // 濃紺ベース
  navy: "0A1A33",
  navyCard: "12284A",
  navyMid: "1E3A5F",
  navyLine: "2A4A73",
  // シアン
  cyan: "06B6D4",
  cyanLight: "22D3EE",
  cyanPale: "CFFAFE",
  cyanDeep: "0E7490",
  // サブカラー
  blue: "2563EB",
  blueLight: "60A5FA",
  bluePale: "DBEAFE",
  blueDeep: "1E40AF",
  purple: "8B5CF6",
  purplePale: "EDE9FE",
  // テキスト・背景
  text: "0F1E36",
  textSub: "44556E",
  textMuted: "8DA0B8",
  white: "FFFFFF",
  offWhite: "F7FAFC",
  bg: "EEF4F9",
  border: "DCE6F0",
  // 状態色
  gold: "F59E0B",
  silver: "64748B",
  platinum: "0EA5E9",
  legend: "A855F7",
  bronze: "B45309",
  green: "10B981",
  gray: "9AA8BA",
  grayDark: "5C6B7E",
  red: "E15566",
} as const;

// 3軸の色分け: 制作=ブルー / 紹介=シアン / 販売=パープル
const ROUTE = {
  build: C.blue,
  share: C.cyan,
  sell: C.purple,
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
function decoCircle(s: Slide, x: number, y: number, size: number, color: string, transparency = 90) {
  s.addShape(ELLIPSE, { x, y, w: size, h: size, fill: { color, transparency } });
}

function decoLine(s: Slide, x: number, y: number, w: number, color: string, transparency?: number) {
  s.addShape(RECT, { x, y, w, h: 0.02, fill: { color, transparency } });
}

function gradStrip(s: Slide, x: number, y: number, w: number, h: number, c1: string, c2: string) {
  s.addShape(RECT, { x, y, w: w / 2, h, fill: { color: c1 } });
  s.addShape(RECT, { x: x + w / 2, y, w: w / 2, h, fill: { color: c2 } });
}

function slideNum(s: Slide, num: number, dark = false) {
  s.addText(String(num).padStart(2, "0"), {
    x: 12.2, y: 7.05, w: 0.9, h: 0.3,
    fontSize: 8, fontFace: FONT, color: dark ? C.navyLine : C.textMuted,
    align: "right",
  });
}

// ─── Slide Backgrounds ────────────────────────────────────────

function whiteBg(pptx: PptxGenJS): Slide {
  const s = pptx.addSlide();
  s.background = { color: C.white };
  gradStrip(s, 0, 0, SW, 0.05, C.navy, C.cyan);
  decoCircle(s, -1.5, -1.5, 5, C.cyan, 94);
  decoCircle(s, 10.5, 5.5, 4, C.blue, 95);
  return s;
}

function lightBg(pptx: PptxGenJS): Slide {
  const s = pptx.addSlide();
  s.background = { color: C.offWhite };
  gradStrip(s, 0, 0, SW, 0.05, C.navy, C.cyan);
  decoCircle(s, -1.5, -1.5, 5, C.cyan, 94);
  decoCircle(s, 10.5, 5.5, 4, C.blue, 95);
  return s;
}

function navyBg(pptx: PptxGenJS): Slide {
  const s = pptx.addSlide();
  s.background = { color: C.navy };
  gradStrip(s, 0, 0, SW, 0.05, C.cyan, C.cyanLight);
  decoCircle(s, -2, -2, 6, C.cyan, 92);
  decoCircle(s, 11, 5, 5, C.blue, 92);
  decoCircle(s, 8, -1, 3, C.cyanLight, 95);
  return s;
}

// ─── Typography ────────────────────────────────────────

function eyebrow(s: Slide, text: string, opts: { x?: number; y?: number; color?: string } = {}) {
  const x = opts.x ?? 0.8;
  const y = opts.y ?? 0.45;
  s.addShape(RRECT, {
    x, y, w: text.length * 0.14 + 0.6, h: 0.32,
    fill: { color: opts.color ?? C.cyan, transparency: 90 },
    rectRadius: 0.16,
  });
  s.addText(text.toUpperCase(), {
    x: x + 0.08, y, w: text.length * 0.14 + 0.5, h: 0.32,
    fontSize: 8, fontFace: FONT, bold: true,
    color: opts.color ?? C.cyanDeep,
    charSpacing: 4, align: "center",
  });
}

function heading(s: Slide, text: string, opts: { x?: number; y?: number; w?: number; fontSize?: number; color?: string } = {}) {
  s.addText(text, {
    x: opts.x ?? 0.8, y: opts.y ?? 0.9, w: opts.w ?? 11.7, h: 0.75,
    fontSize: opts.fontSize ?? 27, fontFace: FONT, bold: true,
    color: opts.color ?? C.text,
    lineSpacingMultiple: 1.2,
  });
}

function lead(s: Slide, text: string, opts: { x?: number; y?: number; w?: number; color?: string; fontSize?: number } = {}) {
  s.addText(text, {
    x: opts.x ?? 0.8, y: opts.y ?? 1.7, w: opts.w ?? 11.5, h: 0.7,
    fontSize: opts.fontSize ?? 11.5, fontFace: FONT,
    color: opts.color ?? C.textSub,
    lineSpacingMultiple: 1.7,
  });
}

// ─── Card Primitives ────────────────────────────────────────

function card(s: Slide, x: number, y: number, w: number, h: number, opts?: { fill?: string; radius?: number; shadow?: boolean; border?: string }) {
  if (opts?.shadow !== false) {
    s.addShape(RRECT, {
      x: x + 0.03, y: y + 0.04, w, h,
      fill: { color: "0A1A33", transparency: 94 },
      rectRadius: opts?.radius ?? 0.16,
    });
  }
  s.addShape(RRECT, {
    x, y, w, h,
    fill: { color: opts?.fill ?? C.white },
    rectRadius: opts?.radius ?? 0.16,
    line: opts?.border ? { color: opts.border, width: 0.5 } : { color: C.border, width: 0.5 },
  });
}

function glass(s: Slide, x: number, y: number, w: number, h: number, color: string) {
  s.addShape(RRECT, {
    x, y, w, h,
    fill: { color, transparency: 91 },
    rectRadius: 0.14,
    line: { color, width: 0.6 },
  });
}

function navyCard(s: Slide, x: number, y: number, w: number, h: number) {
  s.addShape(RRECT, {
    x: x + 0.02, y: y + 0.03, w, h,
    fill: { color: "000000", transparency: 84 },
    rectRadius: 0.16,
  });
  s.addShape(RRECT, {
    x, y, w, h,
    fill: { color: C.navyCard },
    rectRadius: 0.16,
    line: { color: C.navyLine, width: 0.5 },
  });
}

function topBarCard(s: Slide, x: number, y: number, w: number, h: number, topColor: string, fill?: string) {
  card(s, x, y, w, h, { fill });
  s.addShape(RECT, { x: x + 0.01, y: y + 0.01, w: w - 0.02, h: 0.07, fill: { color: topColor } });
}

function pill(s: Slide, x: number, y: number, text: string, color: string, textColor?: string) {
  const w = text.length * 0.13 + 0.45;
  s.addShape(RRECT, { x, y, w, h: 0.3, fill: { color }, rectRadius: 0.15 });
  s.addText(text, { x, y, w, h: 0.3, fontSize: 8.5, fontFace: FONT, bold: true, color: textColor ?? C.white, align: "center" });
  return w;
}

function iconBubble(s: Slide, x: number, y: number, icon: string, color: string, size = 0.7) {
  s.addShape(ELLIPSE, { x, y, w: size, h: size, fill: { color, transparency: 88 } });
  s.addText(icon, { x, y, w: size, h: size, fontSize: size * 22, align: "center", valign: "middle" });
}

function arrowText(s: Slide, x: number, y: number, w: number, h: number, dark = false, char = "→") {
  s.addText(char, { x, y, w, h, fontSize: 14, fontFace: FONT, color: dark ? C.navyLine : C.textMuted, align: "center", valign: "middle" });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Build
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function build() {
  const pptx = new PptxGenJS();
  pptx.layout = "LAYOUT_WIDE";
  pptx.author = "R117 Inc.";
  pptx.company = "R117 Inc.";
  pptx.subject = "エムスタ Partner Program";
  pptx.title = "エムスタ Partner Program 営業資料 V2";

  slide01(pptx); slide02(pptx); slide03(pptx); slide04(pptx);
  slide05(pptx); slide06(pptx); slide07(pptx); slide08(pptx);
  slide09(pptx); slide10(pptx); slide11(pptx); slide12(pptx);
  slide13(pptx); slide14(pptx); slide15(pptx); slide16(pptx);
  slide17(pptx); slide18(pptx); slide19(pptx); slide20(pptx);
  slide21(pptx); slide22(pptx);

  return pptx;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 01 表紙
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide01(pptx: PptxGenJS) {
  const s = navyBg(pptx);

  decoCircle(s, -3, -3, 9, C.cyan, 90);
  decoCircle(s, 9.5, 3.5, 8, C.blue, 91);
  decoCircle(s, 5, -2, 4, C.cyanLight, 95);

  // Subtle grid
  for (let i = 1; i < 14; i++) {
    s.addShape(RECT, { x: i, y: 0, w: 0.003, h: SH, fill: { color: C.white, transparency: 97 } });
  }
  for (let i = 1; i < 8; i++) {
    s.addShape(RECT, { x: 0, y: i, w: SW, h: 0.003, fill: { color: C.white, transparency: 97 } });
  }

  gradStrip(s, 0, 0, SW, 0.06, C.cyan, C.blue);

  pill(s, 0.8, 1.15, "エムスタ Partner Program", C.cyan, C.navy);

  // Main title
  s.addText("作る人も、届ける人も。", {
    x: 0.8, y: 1.6, w: 11.5, h: 1.0,
    fontSize: 44, fontFace: FONT, bold: true, color: C.white,
  });
  s.addText("エムスタ上で、新しい収益事業を始める。", {
    x: 0.8, y: 2.6, w: 11.5, h: 0.7,
    fontSize: 28, fontFace: FONT, bold: true, color: C.cyanLight,
  });

  // Subcopy
  s.addText(
    "アプリ制作・紹介・テンプレート販売を通じて、継続収益を生み出すためのパートナープログラムです。\n制作会社・開発会社・デザイナーだけでなく、営業会社、業界メディア運営者、個人クリエイター、副業で新しい収益機会を探す方まで参加できます。",
    {
      x: 0.8, y: 3.5, w: 11.0, h: 0.9,
      fontSize: 11.5, fontFace: FONT, color: C.textMuted, lineSpacingMultiple: 1.7,
    },
  );

  // 3軸（制作 / 紹介 / 販売）
  const axes = [
    { label: "作る", sub: "アプリ制作", icon: "🛠", color: ROUTE.build },
    { label: "紹介する", sub: "紹介コード送客", icon: "📣", color: ROUTE.share },
    { label: "売る", sub: "テンプレート販売", icon: "🏪", color: ROUTE.sell },
  ];
  axes.forEach((a, i) => {
    const x = 0.8 + i * 2.7;
    navyCard(s, x, 4.6, 2.45, 1.05);
    s.addShape(RECT, { x: x + 0.01, y: 4.61, w: 2.43, h: 0.05, fill: { color: a.color } });
    s.addText(a.icon, { x: x + 0.2, y: 4.75, w: 0.5, h: 0.75, fontSize: 19, valign: "middle" });
    s.addText(a.label, { x: x + 0.75, y: 4.78, w: 1.6, h: 0.35, fontSize: 14, fontFace: FONT, bold: true, color: C.white });
    s.addText(a.sub, { x: x + 0.75, y: 5.15, w: 1.6, h: 0.3, fontSize: 8.5, fontFace: FONT, color: C.textMuted });
  });

  // 訴求バッジ
  const badges = ["登録費用 ¥0", "最大レベニューシェア 35%", "制作 / 紹介 / テンプレート販売に対応", "Web / iOS / Android 対応"];
  badges.forEach((b, i) => {
    const x = 0.8 + i * 3.0;
    s.addShape(RRECT, {
      x, y: 6.0, w: 2.8, h: 0.42,
      fill: { color: C.navyCard },
      rectRadius: 0.21,
      line: { color: C.cyan, width: 0.6 },
    });
    s.addText(b, { x, y: 6.0, w: 2.8, h: 0.42, fontSize: 8.5, fontFace: FONT, bold: true, color: C.cyanLight, align: "center", valign: "middle" });
  });

  s.addText("Confidential  ·  R117 Inc.  ·  2026", {
    x: 0.8, y: 6.95, w: 5, h: 0.3,
    fontSize: 8, fontFace: FONT, color: C.navyLine,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 02 この資料で分かること
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide02(pptx: PptxGenJS) {
  const s = whiteBg(pptx);
  slideNum(s, 2);
  eyebrow(s, "Overview");
  heading(s, "この資料で分かること");
  lead(s, "エムスタを活用して、アプリ制作・紹介・テンプレート販売を収益化するための全体像をまとめています。");

  const items = [
    { icon: "🗺", tag: "全体像", text: "エムスタで始められる\nアプリビジネスの全体像" },
    { icon: "🧭", tag: "参加方法", text: "パートナー制度の種類と\n自分に合う参加方法" },
    { icon: "💰", tag: "収益", text: "レベニューシェアと\n収益シミュレーション" },
    { icon: "🔗", tag: "組み込み方", text: "既存事業・自社媒体への\n組み込み方" },
    { icon: "📅", tag: "初月行動", text: "登録後30日で\nやるべきアクション" },
    { icon: "🚀", tag: "次のステップ", text: "パートナー登録・\nオンライン相談までの流れ" },
  ];

  items.forEach((item, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.8 + col * 4.15;
    const y = 2.6 + row * 2.2;

    card(s, x, y, 3.85, 1.95);
    iconBubble(s, x + 0.25, y + 0.25, item.icon, C.cyan, 0.65);
    s.addText(String(i + 1), {
      x: x + 3.1, y: y + 0.15, w: 0.6, h: 0.5,
      fontSize: 22, fontFace: FONT, bold: true, color: C.bluePale, align: "right",
    });
    pill(s, x + 1.05, y + 0.4, item.tag, C.cyan, C.white);
    s.addText(item.text, {
      x: x + 0.3, y: y + 1.05, w: 3.3, h: 0.8,
      fontSize: 12, fontFace: FONT, bold: true, color: C.text, lineSpacingMultiple: 1.45,
    });
  });

  s.addText("資料を読み終えたとき、「自分はどう動けばよいか」が判断できる状態を目指しています。", {
    x: 0.8, y: 7.05, w: 11.7, h: 0.35,
    fontSize: 9.5, fontFace: FONT, color: C.textMuted, align: "center",
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 03 なぜ今、エムスタなのか
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide03(pptx: PptxGenJS) {
  const s = lightBg(pptx);
  slideNum(s, 3);
  eyebrow(s, "Why MS Studio, Why Now");
  heading(s, "AI時代に、新しい仕事場と収益源をつくる。");
  lead(s, "これから重要になるのは、単に作業を請け負うことではなく、自分の強みを活かして、継続的な収益機会を持てる場所に参加することです。");

  // 左: AI時代の変化
  card(s, 0.8, 2.6, 5.7, 3.7);
  pill(s, 1.1, 2.85, "AI時代の変化", C.grayDark);
  const changes = [
    "AIにより、制作業務の単価や役割が変化している",
    "Web制作や単発案件だけでは、継続収益を作りにくい",
    "副業・リモートで始められる収益機会への需要が拡大",
    "制作できる人だけでなく、紹介できる人・届けられる人にも価値がある",
    "業界知識や顧客接点を持つ人が、アプリビジネスに参加できる時代に",
  ];
  changes.forEach((c, i) => {
    s.addText(`•  ${c}`, {
      x: 1.1, y: 3.35 + i * 0.55, w: 5.1, h: 0.5,
      fontSize: 10.5, fontFace: FONT, color: C.textSub, lineSpacingMultiple: 1.4,
    });
  });

  // 右: 強み → エムスタ → 収益の図解
  card(s, 6.8, 2.6, 5.75, 3.7);
  pill(s, 7.1, 2.85, "強みが収益機会へ変わる", C.cyanDeep);

  const strengths = ["制作スキル", "営業力", "業界知識", "発信力"];
  strengths.forEach((t, i) => {
    const x = 7.1 + i * 1.32;
    s.addShape(RRECT, { x, y: 3.4, w: 1.2, h: 0.42, fill: { color: C.bluePale }, rectRadius: 0.1 });
    s.addText(t, { x, y: 3.4, w: 1.2, h: 0.42, fontSize: 9, fontFace: FONT, bold: true, color: C.blueDeep, align: "center", valign: "middle" });
  });

  arrowText(s, 9.45, 3.85, 0.5, 0.35, false, "↓");

  s.addShape(RRECT, { x: 7.6, y: 4.25, w: 4.2, h: 0.55, fill: { color: C.navy }, rectRadius: 0.12 });
  s.addText("エムスタ", { x: 7.6, y: 4.25, w: 4.2, h: 0.55, fontSize: 15, fontFace: FONT, bold: true, color: C.cyanLight, align: "center", valign: "middle" });

  arrowText(s, 9.45, 4.82, 0.5, 0.35, false, "↓");

  const incomes = ["制作収益", "紹介収益", "テンプレ販売", "継続レベニュー"];
  incomes.forEach((t, i) => {
    const x = 7.1 + i * 1.32;
    s.addShape(RRECT, { x, y: 5.2, w: 1.2, h: 0.42, fill: { color: C.cyan, transparency: 85 }, rectRadius: 0.1, line: { color: C.cyan, width: 0.6 } });
    s.addText(t, { x, y: 5.2, w: 1.2, h: 0.42, fontSize: 8.5, fontFace: FONT, bold: true, color: C.cyanDeep, align: "center", valign: "middle" });
  });

  s.addText("制作スキル、営業力、業界知識、発信力を、アプリビジネスの収益機会へ。", {
    x: 7.1, y: 5.8, w: 5.2, h: 0.4, fontSize: 9, fontFace: FONT, color: C.textMuted,
  });

  // 締めコピー
  s.addShape(RRECT, { x: 1.5, y: 6.65, w: 10.3, h: 0.5, fill: { color: C.navy }, rectRadius: 0.25 });
  s.addText("エムスタは、AI時代に自分の強みを収益機会へ変えるための、アプリビジネス基盤です。", {
    x: 1.5, y: 6.65, w: 10.3, h: 0.5,
    fontSize: 11.5, fontFace: FONT, bold: true, color: C.white, align: "center", valign: "middle",
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 04 これまでの働き方・収益構造の課題
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide04(pptx: PptxGenJS) {
  const s = whiteBg(pptx);
  slideNum(s, 4);
  eyebrow(s, "The Challenge");
  heading(s, "単発の仕事だけでは、収益が積み上がりにくい。");
  lead(s, "制作会社、営業会社、個人クリエイター、副業ワーカー。立場は違っても、多くの人が「一度きりの仕事」や「毎月ゼロからの獲得」に課題を感じています。");

  // 4ペルソナアイコン
  const personas = [
    { icon: "🏢", label: "制作会社" },
    { icon: "📞", label: "営業会社" },
    { icon: "🎨", label: "個人クリエイター" },
    { icon: "🌙", label: "副業ワーカー" },
  ];
  personas.forEach((p, i) => {
    const x = 4.0 + i * 1.45;
    s.addText(p.icon, { x, y: 2.45, w: 0.6, h: 0.45, fontSize: 17, align: "center" });
    s.addText(p.label, { x: x - 0.35, y: 2.9, w: 1.3, h: 0.25, fontSize: 7.5, fontFace: FONT, color: C.textMuted, align: "center" });
  });

  // 左: 従来モデル（グレー基調）
  topBarCard(s, 0.8, 3.3, 5.7, 3.3, C.gray);
  pill(s, 1.1, 3.55, "従来モデル", C.grayDark);
  s.addText("単発型 / 労働集約型", { x: 1.1, y: 3.95, w: 5, h: 0.4, fontSize: 15, fontFace: FONT, bold: true, color: C.grayDark });

  const olds = [
    "案件が終わると売上も止まる",
    "毎月、新しい案件や顧客を探す必要がある",
    "自分の稼働時間に収益が依存しやすい",
    "制作や営業の成果が資産化しにくい",
    "副業でも、単価の低い作業に寄りやすい",
  ];
  olds.forEach((t, i) => {
    s.addText(`✗  ${t}`, { x: 1.1, y: 4.45 + i * 0.42, w: 5.1, h: 0.38, fontSize: 10, fontFace: FONT, color: C.grayDark });
  });

  // 右: エムスタモデル（シアン基調）
  topBarCard(s, 6.8, 3.3, 5.75, 3.3, C.cyan);
  pill(s, 7.1, 3.55, "エムスタモデル", C.cyanDeep);
  s.addText("参加型 / 積み上げ型", { x: 7.1, y: 3.95, w: 5, h: 0.4, fontSize: 15, fontFace: FONT, bold: true, color: C.cyanDeep });

  const news = [
    "制作費を得る",
    "月額レベニューシェアを得る",
    "紹介コード経由の利用から継続収益を得る",
    "テンプレートや業界特化UIを販売する",
    "成功事例や紹介導線が次の信用になる",
  ];
  news.forEach((t, i) => {
    s.addText(`✓  ${t}`, { x: 7.1, y: 4.45 + i * 0.42, w: 5.2, h: 0.38, fontSize: 10, fontFace: FONT, bold: true, color: C.cyanDeep });
  });

  // 締めコピー
  s.addShape(RRECT, { x: 1.5, y: 6.85, w: 10.3, h: 0.45, fill: { color: C.cyan, transparency: 88 }, rectRadius: 0.22, line: { color: C.cyan, width: 0.6 } });
  s.addText("一度きりの仕事を、継続収益と信用が積み上がる活動へ。", {
    x: 1.5, y: 6.85, w: 10.3, h: 0.45,
    fontSize: 11.5, fontFace: FONT, bold: true, color: C.cyanDeep, align: "center", valign: "middle",
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 05 エムスタが提供する新しい選択肢
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide05(pptx: PptxGenJS) {
  const s = lightBg(pptx);
  slideNum(s, 5);
  eyebrow(s, "New Options");
  heading(s, "アプリを「作る・紹介する・売る」を収益化できるプラットフォーム。", { fontSize: 24 });
  lead(s, "エムスタは、Web / iOS / Androidに対応したアプリをCMS付きで構築・運用できるプラットフォームです。パートナーは、自社の強みに合わせて、制作・紹介・テンプレート販売のいずれからでも参加できます。");

  const opts = [
    {
      title: "作る", icon: "🛠", color: ROUTE.build,
      head: "アプリ制作を提案できる",
      desc: "クライアント向けに、会員アプリ、予約アプリ、情報発信アプリ、診断コンテンツなどを提案できます。",
    },
    {
      title: "紹介する", icon: "📣", color: ROUTE.share,
      head: "紹介コード経由で収益化できる",
      desc: "紹介コード経由で登録・利用開始されたアカウントの月額利用に応じて、レベニューシェアが発生します。",
    },
    {
      title: "売る", icon: "🏪", color: ROUTE.sell,
      head: "テンプレート販売にも展開できる",
      desc: "業界特化UI、デザインテンプレート、コンテンツ構成などを資産化し、販売できます。",
    },
  ];

  opts.forEach((o, i) => {
    const x = 0.8 + i * 4.15;
    topBarCard(s, x, 2.8, 3.85, 3.5, o.color);
    iconBubble(s, x + 1.45, 3.05, o.icon, o.color, 0.95);
    s.addText(o.title, {
      x: x + 0.3, y: 4.15, w: 3.25, h: 0.45,
      fontSize: 19, fontFace: FONT, bold: true, color: o.color, align: "center",
    });
    s.addText(o.head, {
      x: x + 0.3, y: 4.65, w: 3.25, h: 0.4,
      fontSize: 12, fontFace: FONT, bold: true, color: C.text, align: "center",
    });
    s.addText(o.desc, {
      x: x + 0.35, y: 5.15, w: 3.15, h: 1.1,
      fontSize: 10, fontFace: FONT, color: C.textSub, lineSpacingMultiple: 1.6, align: "center",
    });
  });

  s.addShape(RRECT, { x: 1.5, y: 6.7, w: 10.3, h: 0.48, fill: { color: C.navy }, rectRadius: 0.24 });
  s.addText("制作力だけでなく、営業力・発信力・業界理解も、エムスタ上では収益機会になります。", {
    x: 1.5, y: 6.7, w: 10.3, h: 0.48,
    fontSize: 11, fontFace: FONT, bold: true, color: C.white, align: "center", valign: "middle",
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 06 エムスタ経済圏とは
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide06(pptx: PptxGenJS) {
  const s = navyBg(pptx);
  slideNum(s, 6, true);
  eyebrow(s, "Ecosystem", { color: C.cyanLight });
  heading(s, "クライアント、パートナー、エンドユーザーが\n共に価値を広げる仕組み。", { color: C.white, fontSize: 24 });

  s.addText("エムスタは、アプリを作る人だけが得をする仕組みではありません。クライアントの事業が伸び、エンドユーザーとの接点が増え、\nパートナーには制作収益と継続収益が積み上がる。その成功事例がまた次の案件や信用を生み、エムスタ経済圏として広がっていきます。", {
    x: 0.8, y: 2.1, w: 11.7, h: 0.8,
    fontSize: 10.5, fontFace: FONT, color: C.textMuted, lineSpacingMultiple: 1.7,
  });

  // 左: 循環図
  const cx = 3.4, cy = 4.95, r = 1.45;
  // 中央
  s.addShape(ELLIPSE, { x: cx - 0.95, y: cy - 0.95, w: 1.9, h: 1.9, fill: { color: C.cyan, transparency: 80 }, line: { color: C.cyan, width: 1 } });
  s.addText("エムスタ\n経済圏", { x: cx - 0.95, y: cy - 0.95, w: 1.9, h: 1.9, fontSize: 13, fontFace: FONT, bold: true, color: C.white, align: "center", valign: "middle", lineSpacingMultiple: 1.3 });

  // 周囲4ノード
  const nodes = [
    { label: "クライアント", icon: "🏢", dx: 0, dy: -r - 0.45 },
    { label: "パートナー", icon: "🤝", dx: r + 0.85, dy: 0 },
    { label: "エンドユーザー", icon: "👥", dx: 0, dy: r + 0.45 },
    { label: "エムスタ", icon: "⚙️", dx: -r - 0.85, dy: 0 },
  ];
  nodes.forEach((n) => {
    const nx = cx + n.dx - 0.85;
    const ny = cy + n.dy - 0.32;
    s.addShape(RRECT, { x: nx, y: ny, w: 1.7, h: 0.64, fill: { color: C.navyCard }, rectRadius: 0.12, line: { color: C.navyLine, width: 0.6 } });
    s.addText(`${n.icon} ${n.label}`, { x: nx, y: ny, w: 1.7, h: 0.64, fontSize: 9.5, fontFace: FONT, bold: true, color: C.white, align: "center", valign: "middle" });
  });

  // キーワード
  s.addText("共創 / 収益 / 信用 / 接点 / 事例", {
    x: 0.9, y: 6.95, w: 5, h: 0.3, fontSize: 9, fontFace: FONT, bold: true, color: C.cyanLight, charSpacing: 2,
  });

  // 右: 循環ステップ
  const steps = ["クライアントの成功", "パートナーの収益化", "エンドユーザーとの接点拡大", "事例・信用の蓄積", "次の案件創出"];
  steps.forEach((t, i) => {
    const y = 3.25 + i * 0.74;
    navyCard(s, 7.3, y, 5.2, 0.58);
    s.addShape(ELLIPSE, { x: 7.5, y: y + 0.13, w: 0.32, h: 0.32, fill: { color: C.cyan } });
    s.addText(String(i + 1), { x: 7.5, y: y + 0.13, w: 0.32, h: 0.32, fontSize: 10, fontFace: FONT, bold: true, color: C.navy, align: "center", valign: "middle" });
    s.addText(t, { x: 7.95, y, w: 4.4, h: 0.58, fontSize: 11.5, fontFace: FONT, bold: true, color: C.white, valign: "middle" });
    if (i < 4) {
      s.addText("↓", { x: 7.45, y: y + 0.5, w: 0.4, h: 0.3, fontSize: 11, color: C.cyan, align: "center" });
    }
  });

  s.addText("エムスタは、共に作り、共に広げ、共に潤うためのアプリビジネス基盤です。", {
    x: 7.3, y: 7.0, w: 5.2, h: 0.35, fontSize: 9.5, fontFace: FONT, bold: true, color: C.cyanLight,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 07 パートナー制度の全体像
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide07(pptx: PptxGenJS) {
  const s = whiteBg(pptx);
  slideNum(s, 7);
  eyebrow(s, "Partner Program");
  heading(s, "制作できる人も、紹介できる人も、届けられる人も参加できる。", { fontSize: 24 });
  lead(s, "エムスタ Partner Programでは、制作リソースだけでなく、顧客接点・営業ネットワーク・業界媒体・専門知識も価値になります。");

  const types = [
    {
      title: "制作パートナー", icon: "💻", color: ROUTE.build,
      desc: "クライアント向けにアプリを制作し、制作費と継続レベニューを得る。",
      tags: ["制作会社", "開発会社", "デザイナー"],
    },
    {
      title: "セールス / 紹介パートナー", icon: "📣", color: ROUTE.share,
      desc: "紹介コード・営業活動・自社媒体を通じてエムスタへ送客し、利用開始後の月額利用に応じてレベニューシェアを得る。",
      tags: ["営業会社", "メディア運営", "SNS発信者"],
    },
    {
      title: "テンプレート / コンポーネント販売", icon: "🏪", color: ROUTE.sell,
      desc: "業界特化UI・テンプレート・コンテンツ資産を販売し、制作工数を商品化する。",
      tags: ["デザイナー", "クリエイター"],
    },
  ];

  types.forEach((t, i) => {
    const x = 0.8 + i * 4.15;
    topBarCard(s, x, 2.7, 3.85, 3.6, t.color);
    iconBubble(s, x + 0.3, 2.95, t.icon, t.color, 0.8);
    s.addText(t.title, {
      x: x + 0.3, y: 3.9, w: 3.25, h: 0.6,
      fontSize: 14, fontFace: FONT, bold: true, color: C.text, lineSpacingMultiple: 1.25,
    });
    s.addText(t.desc, {
      x: x + 0.3, y: 4.6, w: 3.25, h: 1.1,
      fontSize: 10, fontFace: FONT, color: C.textSub, lineSpacingMultiple: 1.6,
    });
    t.tags.forEach((tag, ti) => {
      pill(s, x + 0.3 + ti * 1.12, 5.8, tag, t.color);
    });
  });

  s.addShape(RRECT, { x: 1.5, y: 6.7, w: 10.3, h: 0.48, fill: { color: C.navy }, rectRadius: 0.24 });
  s.addText("作る力、届ける力、業界に入り込む力。それぞれの強みが、エムスタ経済圏の価値になります。", {
    x: 1.5, y: 6.7, w: 10.3, h: 0.48,
    fontSize: 11, fontFace: FONT, bold: true, color: C.white, align: "center", valign: "middle",
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 08 あなたに合う参加方法
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide08(pptx: PptxGenJS) {
  const s = lightBg(pptx);
  slideNum(s, 8);
  eyebrow(s, "Find Your Route");
  heading(s, "あなたはどれに近いですか？");
  lead(s, "作る、紹介する、販売する。自分の強みから参加できます。");

  const routes = [
    {
      title: "制作パートナー", color: ROUTE.build, icon: "💻",
      checks: [
        "Web制作・デザイン・開発案件をすでに持っている",
        "既存顧客にアプリ制作を追加提案したい",
        "自社メニューにアプリ制作を加えたい",
        "フルスクラッチでは予算が合わない案件の選択肢を持ちたい",
      ],
    },
    {
      title: "セールス / 紹介パートナー", color: ROUTE.share, icon: "📣",
      checks: [
        "自社メディア、SNS、業界コミュニティを持っている",
        "特定業界への営業接点がある",
        "制作は担わず、紹介や送客で収益化したい",
        "業界向けの記事・LP・紹介コンテンツを作れる",
        "副業やリモートで始められる収益機会を探している",
        "営業代理店・紹介事業として新しい商材を探している",
      ],
    },
    {
      title: "テンプレート販売", color: ROUTE.sell, icon: "🏪",
      checks: [
        "業界特化のUIやデザイン資産を持っている",
        "テンプレートやコンポーネントを商品化したい",
        "制作工数をストック型の販売資産に変えたい",
        "デザインや構成ノウハウを、繰り返し売れる形にしたい",
      ],
    },
  ];

  routes.forEach((r, i) => {
    const x = 0.8 + i * 4.15;
    topBarCard(s, x, 2.5, 3.85, 4.5, r.color);
    s.addText(`${r.icon}  ${r.title}`, {
      x: x + 0.25, y: 2.7, w: 3.4, h: 0.4,
      fontSize: 12.5, fontFace: FONT, bold: true, color: r.color,
    });
    r.checks.forEach((c, ci) => {
      const y = 3.2 + ci * 0.62;
      s.addShape(RRECT, { x: x + 0.22, y: y + 0.04, w: 0.26, h: 0.26, fill: { color: r.color, transparency: 86 }, rectRadius: 0.06 });
      s.addText("✓", { x: x + 0.22, y: y + 0.04, w: 0.26, h: 0.26, fontSize: 10, fontFace: FONT, bold: true, color: r.color, align: "center", valign: "middle" });
      s.addText(c, {
        x: x + 0.58, y, w: 3.1, h: 0.6,
        fontSize: 9, fontFace: FONT, color: C.textSub, lineSpacingMultiple: 1.3, valign: "top",
      });
    });
  });

  s.addText("複数のルートを組み合わせることも可能です。迷う場合はオンライン相談で整理できます。", {
    x: 0.8, y: 7.1, w: 11.7, h: 0.3,
    fontSize: 9, fontFace: FONT, color: C.textMuted, align: "center",
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 09 制作不要で始めるセールスパートナー
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide09(pptx: PptxGenJS) {
  const s = navyBg(pptx);
  slideNum(s, 9, true);
  eyebrow(s, "Sales Partner", { color: C.cyanLight });
  heading(s, "制作不要。紹介から始めるアプリビジネス。", { color: C.white });
  s.addText("エムスタのセールス / 紹介パートナーは、自社でアプリを制作しなくても参加できます。\n紹介コードや自社媒体、営業ネットワークを活用してエムスタへ送客し、登録・利用開始されたアカウントの月額利用に応じてレベニューシェアを得られます。", {
    x: 0.8, y: 1.75, w: 11.7, h: 0.85,
    fontSize: 11, fontFace: FONT, color: C.textMuted, lineSpacingMultiple: 1.7,
  });

  // フロー図
  const flow = [
    { label: "自社媒体 / SNS\n営業接点", icon: "🌐" },
    { label: "紹介コード", icon: "🔑" },
    { label: "エムスタ登録", icon: "📝" },
    { label: "利用開始", icon: "🚀" },
    { label: "月額利用に応じて\nレベニューシェア", icon: "💰" },
  ];
  flow.forEach((f, i) => {
    const x = 0.7 + i * 2.55;
    const isLast = i === flow.length - 1;
    navyCard(s, x, 2.95, 2.2, 1.5);
    if (isLast) {
      s.addShape(RECT, { x: x + 0.01, y: 2.96, w: 2.18, h: 0.06, fill: { color: C.cyan } });
    }
    s.addText(f.icon, { x, y: 3.15, w: 2.2, h: 0.5, fontSize: 20, align: "center" });
    s.addText(f.label, {
      x: x + 0.1, y: 3.65, w: 2.0, h: 0.7,
      fontSize: 9.5, fontFace: FONT, bold: true, color: isLast ? C.cyanLight : C.white, align: "center", lineSpacingMultiple: 1.35,
    });
    if (!isLast) {
      s.addText("→", { x: x + 2.13, y: 3.5, w: 0.45, h: 0.4, fontSize: 15, color: C.cyan, align: "center", valign: "middle" });
    }
  });

  // 活用例
  s.addText("活用例", { x: 0.8, y: 4.85, w: 3, h: 0.3, fontSize: 11, fontFace: FONT, bold: true, color: C.cyanLight });
  const examples = [
    "自社サイトにエムスタ紹介記事を掲載",
    "業界特化メディアで導入メリットを発信",
    "SNSやメルマガで紹介コードを案内",
    "既存クライアントにエムスタを紹介",
    "業界特化テンプレートと合わせて送客",
  ];
  examples.forEach((e, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.8 + col * 4.15;
    const y = 5.25 + row * 0.62;
    navyCard(s, x, y, 3.85, 0.5);
    s.addText(`✓  ${e}`, { x: x + 0.2, y, w: 3.5, h: 0.5, fontSize: 9.5, fontFace: FONT, color: C.white, valign: "middle" });
  });

  // 締めコピー
  s.addShape(RRECT, { x: 1.5, y: 6.75, w: 10.3, h: 0.5, fill: { color: C.cyan }, rectRadius: 0.25 });
  s.addText("制作リソースがなくても、業界理解・発信力・顧客接点があれば、エムスタ経済圏に参加できます。", {
    x: 1.5, y: 6.75, w: 10.3, h: 0.5,
    fontSize: 11, fontFace: FONT, bold: true, color: C.navy, align: "center", valign: "middle",
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 10 業界特化で送客を仕組みにする
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide10(pptx: PptxGenJS) {
  const s = whiteBg(pptx);
  slideNum(s, 10);
  eyebrow(s, "Referral Strategy");
  heading(s, "紹介で終わらせない。業界特化で送客を仕組みにする。", { fontSize: 24 });
  lead(s, "セールスパートナーは、単なる紹介者ではありません。業界課題を見つけ、エムスタの活用文脈を作り、見込み顧客を流入させる事業開発パートナーです。");

  const strategies = [
    {
      title: "業界特化記事", icon: "📰", color: C.cyan,
      desc: "美容サロン向けに「予約・クーポン・会員アプリ」の活用記事を作成し、紹介コードを掲載。",
    },
    {
      title: "比較コンテンツ", icon: "⚖️", color: C.blue,
      desc: "「LINE公式だけでは足りない会員接点」などのテーマで、エムスタ活用を紹介。",
    },
    {
      title: "テンプレート連動", icon: "🧩", color: C.purple,
      desc: "業界特化UIやテンプレートを用意し、記事から導入相談へ誘導。",
    },
    {
      title: "営業資料連動", icon: "📊", color: C.green,
      desc: "既存顧客向けの提案資料にエムスタを組み込み、制作はオフィシャル制作やエムスタFullへ接続。",
    },
  ];

  strategies.forEach((st, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.8 + col * 6.05;
    const y = 2.7 + row * 1.85;

    topBarCard(s, x, y, 5.75, 1.6, st.color);
    iconBubble(s, x + 0.25, y + 0.3, st.icon, st.color, 0.7);
    s.addText(st.title, { x: x + 1.15, y: y + 0.25, w: 4.4, h: 0.4, fontSize: 13, fontFace: FONT, bold: true, color: C.text });
    s.addText(st.desc, {
      x: x + 1.15, y: y + 0.65, w: 4.4, h: 0.85,
      fontSize: 9.5, fontFace: FONT, color: C.textSub, lineSpacingMultiple: 1.5,
    });
  });

  // オンライン誘導CTA
  s.addShape(RRECT, { x: 2.8, y: 6.65, w: 7.7, h: 0.55, fill: { color: C.navy }, rectRadius: 0.27 });
  s.addText("具体的な紹介導線・業界特化コンテンツの作り方・紹介コード活用戦略は、オンラインにて個別にご説明します  →", {
    x: 2.8, y: 6.65, w: 7.7, h: 0.55,
    fontSize: 9.5, fontFace: FONT, bold: true, color: C.cyanLight, align: "center", valign: "middle",
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 11 パートナーが提案できる案件例
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide11(pptx: PptxGenJS) {
  const s = lightBg(pptx);
  slideNum(s, 11);
  eyebrow(s, "Use Cases");
  heading(s, "さまざまな業界に、アプリ活用の提案ができます。", { fontSize: 25 });

  const cases = [
    { industry: "店舗向け", icon: "🏪", color: C.cyan, items: "会員アプリ / クーポン / 予約 / 来店促進" },
    { industry: "スクール向け", icon: "🎓", color: C.blue, items: "生徒・保護者連絡 / 資料配布 / 学習コンテンツ" },
    { industry: "団体・協会向け", icon: "🏛", color: C.green, items: "会員管理 / 災害時連絡 / アンケート / 会報配信" },
    { industry: "美容・診断系", icon: "💄", color: C.purple, items: "診断コンテンツ / 会員専用ページ / PDF出力 / カウンセリング導線" },
    { industry: "企業向け", icon: "🏢", color: C.navy, items: "社内ポータル / 業務連絡 / ナレッジ共有" },
  ];

  cases.forEach((c, i) => {
    const y = 1.95 + i * 0.92;
    card(s, 0.8, y, 11.7, 0.78);
    s.addShape(RECT, { x: 0.81, y: y + 0.01, w: 0.07, h: 0.76, fill: { color: c.color } });
    iconBubble(s, 1.1, y + 0.12, c.icon, c.color, 0.55);
    s.addText(c.industry, { x: 1.85, y, w: 2.4, h: 0.78, fontSize: 13, fontFace: FONT, bold: true, color: C.text, valign: "middle" });
    s.addText(c.items, { x: 4.4, y, w: 7.9, h: 0.78, fontSize: 10.5, fontFace: FONT, color: C.textSub, valign: "middle" });
  });

  s.addShape(RRECT, { x: 1.5, y: 6.75, w: 10.3, h: 0.5, fill: { color: C.navy }, rectRadius: 0.25 });
  s.addText("エムスタは、業界ごとの「継続接点」をアプリで形にできます。", {
    x: 1.5, y: 6.75, w: 10.3, h: 0.5,
    fontSize: 11.5, fontFace: FONT, bold: true, color: C.white, align: "center", valign: "middle",
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 12 既存事業への組み込み方
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide12(pptx: PptxGenJS) {
  const s = whiteBg(pptx);
  slideNum(s, 12);
  eyebrow(s, "Integration");
  heading(s, "今の仕事や活動に、エムスタを組み込む。");

  // 上部矢印フロー
  const flowItems = ["既存活動", "エムスタを組み込む", "収益化"];
  flowItems.forEach((f, i) => {
    const x = 3.4 + i * 2.4;
    s.addShape(RRECT, { x, y: 1.7, w: 1.95, h: 0.45, fill: { color: i === 2 ? C.cyan : C.bluePale }, rectRadius: 0.1 });
    s.addText(f, { x, y: 1.7, w: 1.95, h: 0.45, fontSize: 10, fontFace: FONT, bold: true, color: i === 2 ? C.navy : C.blueDeep, align: "center", valign: "middle" });
    if (i < 2) arrowText(s, x + 1.92, 1.7, 0.5, 0.45);
  });

  const cases = [
    { who: "Web制作会社", icon: "🌐", color: ROUTE.build, how: "ホームページ制作後の追加提案として、会員アプリ・予約・通知を提案。" },
    { who: "デザイン会社", icon: "🎨", color: ROUTE.build, how: "ブランドサイトだけでなく、顧客接点を持つアプリUI/UXまで提案。" },
    { who: "開発会社", icon: "💻", color: ROUTE.build, how: "フルスクラッチでは予算が合わない案件に、低コスト・短納期の選択肢として提案。" },
    { who: "営業会社 / 代理店", icon: "📞", color: ROUTE.share, how: "既存クライアントへエムスタを紹介し、制作を持たずにレベニューシェアを得る。" },
    { who: "メディア運営者 / インフルエンサー", icon: "📣", color: ROUTE.share, how: "業界特化の記事やSNS発信から紹介コードへ誘導し、送客導線を収益化。" },
    { who: "個人クリエイター / 副業層", icon: "🌙", color: ROUTE.sell, how: "テンプレート販売、小規模アプリ制作、紹介活動から小さく始める。" },
  ];

  cases.forEach((c, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.8 + col * 4.15;
    const y = 2.5 + row * 2.25;

    topBarCard(s, x, y, 3.85, 2.0, c.color);
    iconBubble(s, x + 0.25, y + 0.25, c.icon, c.color, 0.6);
    s.addText(c.who, {
      x: x + 0.98, y: y + 0.28, w: 2.75, h: 0.55,
      fontSize: 11, fontFace: FONT, bold: true, color: C.text, lineSpacingMultiple: 1.2, valign: "top",
    });
    s.addText(c.how, {
      x: x + 0.28, y: y + 1.0, w: 3.3, h: 0.95,
      fontSize: 9.5, fontFace: FONT, color: C.textSub, lineSpacingMultiple: 1.5,
    });
  });

  s.addText("エムスタは、新規事業としてだけでなく、既存の顧客接点・営業活動・制作メニュー・発信媒体に組み込むことで収益化できます。", {
    x: 0.8, y: 7.05, w: 11.7, h: 0.3,
    fontSize: 9, fontFace: FONT, color: C.textMuted, align: "center",
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 13 収益モデル
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide13(pptx: PptxGenJS) {
  const s = navyBg(pptx);
  slideNum(s, 13, true);
  eyebrow(s, "Revenue Model", { color: C.cyanLight });
  heading(s, "作るだけではない、4つの収益機会。", { color: C.white });

  const pillars = [
    {
      en: "Build", jp: "制作費", icon: "🛠", color: ROUTE.build,
      desc: "クライアント向けアプリ制作の\n初期制作費。",
    },
    {
      en: "Share", jp: "月額レベニューシェア", icon: "📈", color: C.cyanLight,
      desc: "エンドクライアントの月額利用料に\n応じた継続収益。",
    },
    {
      en: "Sell", jp: "紹介 / 送客レベニュー", icon: "📣", color: ROUTE.share,
      desc: "紹介コード経由で登録・利用開始\nされたアカウントの月額利用に\n応じた収益。",
    },
    {
      en: "Support", jp: "テンプレート販売・追加支援", icon: "🏪", color: ROUTE.sell,
      desc: "業界特化UI、コンポーネント、\n追加制作、運用支援など。",
    },
  ];

  pillars.forEach((p, i) => {
    const x = 0.7 + i * 3.05;
    navyCard(s, x, 2.2, 2.8, 3.7);
    s.addShape(RECT, { x: x + 0.01, y: 2.21, w: 2.78, h: 0.07, fill: { color: p.color } });

    iconBubble(s, x + 1.0, 2.5, p.icon, p.color, 0.8);
    s.addText(String(i + 1), {
      x: x + 0.2, y: 2.4, w: 0.6, h: 0.5,
      fontSize: 22, fontFace: FONT, bold: true, color: C.navyLine,
    });
    s.addText(p.en, {
      x, y: 3.5, w: 2.8, h: 0.35,
      fontSize: 11, fontFace: FONT, bold: true, color: p.color, align: "center", charSpacing: 3,
    });
    s.addText(p.jp, {
      x: x + 0.1, y: 3.9, w: 2.6, h: 0.65,
      fontSize: 13, fontFace: FONT, bold: true, color: C.white, align: "center", lineSpacingMultiple: 1.25,
    });
    s.addText(p.desc, {
      x: x + 0.15, y: 4.6, w: 2.5, h: 1.2,
      fontSize: 9, fontFace: FONT, color: C.textMuted, align: "center", lineSpacingMultiple: 1.5,
    });
  });

  // 締めコピー
  s.addShape(RRECT, { x: 1.5, y: 6.3, w: 10.3, h: 0.85, fill: { color: C.navyCard }, rectRadius: 0.16, line: { color: C.cyan, width: 0.7 } });
  s.addText("制作できる人は制作で。紹介できる人は送客で。資産を持つ人は販売で。\nそれぞれの強みを収益化できます。", {
    x: 1.5, y: 6.3, w: 10.3, h: 0.85,
    fontSize: 11.5, fontFace: FONT, bold: true, color: C.cyanLight, align: "center", valign: "middle", lineSpacingMultiple: 1.5,
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 14 レベニューシェア制度
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide14(pptx: PptxGenJS) {
  const s = whiteBg(pptx);
  slideNum(s, 14);
  eyebrow(s, "Revenue Share");
  heading(s, "公開アプリ数や貢献度に応じて、還元率が上がります。", { fontSize: 25 });

  const ranks = [
    { name: "Bronze", rate: 15, color: C.bronze },
    { name: "Silver", rate: 20, color: C.silver },
    { name: "Gold", rate: 25, color: C.gold },
    { name: "Platinum", rate: 30, color: C.platinum },
    { name: "Legend", rate: 35, color: C.legend },
  ];

  // 階段状デザイン: バーの高さがランクに応じて上がる
  const baseY = 5.9; // バーの底辺
  const maxBarH = 3.0;
  ranks.forEach((r, i) => {
    const x = 1.1 + i * 2.35;
    const barH = (r.rate / 35) * maxBarH;
    const barY = baseY - barH;

    // バー
    s.addShape(RRECT, {
      x, y: barY, w: 2.0, h: barH,
      fill: { color: r.color, transparency: 12 },
      rectRadius: 0.08,
    });

    // パーセンテージ（バーの上）
    s.addText(`${r.rate}%`, {
      x, y: barY - 0.62, w: 2.0, h: 0.55,
      fontSize: 26, fontFace: FONT, bold: true, color: r.color, align: "center",
    });

    // ランク名（バー内上部）
    s.addText("★", { x, y: barY + 0.12, w: 2.0, h: 0.35, fontSize: 14, color: C.white, align: "center" });
    s.addText(r.name, {
      x, y: barY + 0.45, w: 2.0, h: 0.35,
      fontSize: 12, fontFace: FONT, bold: true, color: C.white, align: "center",
    });

    // ベースライン下ラベル
    s.addText(`RANK 0${i + 1}`, {
      x, y: baseY + 0.12, w: 2.0, h: 0.3,
      fontSize: 8, fontFace: FONT, bold: true, color: C.textMuted, align: "center", charSpacing: 2,
    });
  });

  // ベースライン
  s.addShape(RECT, { x: 0.9, y: baseY, w: 11.5, h: 0.02, fill: { color: C.border } });

  // 補足コピー
  glass(s, 0.8, 6.5, 7.6, 0.75, C.cyan);
  s.addText("継続案件が増えるほど、毎月の収益基盤が積み上がります。\n制作実績や紹介実績は、パートナーとしての信用にもつながります。", {
    x: 1.05, y: 6.5, w: 7.2, h: 0.75,
    fontSize: 10, fontFace: FONT, bold: true, color: C.cyanDeep, valign: "middle", lineSpacingMultiple: 1.45,
  });

  // 注記
  s.addText("※ 還元率・条件は契約内容やランク条件によって異なる場合があります。\n詳細はパートナー登録後またはオンライン相談時にご案内します。", {
    x: 8.6, y: 6.5, w: 4.0, h: 0.75,
    fontSize: 7.5, fontFace: FONT, color: C.textMuted, lineSpacingMultiple: 1.4, valign: "middle",
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 15 収益シミュレーション
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide15(pptx: PptxGenJS) {
  const s = lightBg(pptx);
  slideNum(s, 15);
  eyebrow(s, "Revenue Simulation");
  heading(s, "案件数とランクに応じた収益イメージ。");

  const cases = [
    {
      persona: "Web制作会社 A社", rank: "Gold / 25%", rankColor: C.gold, route: "制作型", routeColor: ROUTE.build,
      scenario: "既存顧客に月5件提案。制作費 + 継続レベニューを獲得。",
      numbers: [
        { label: "制作売上 / 件", value: "¥150,000" },
        { label: "継続レベニュー / 月（5件）", value: "約 ¥18,750" },
        { label: "年間継続収益", value: "約 ¥225,000" },
      ],
    },
    {
      persona: "フリーランス Bさん", rank: "Silver / 20%", rankColor: C.silver, route: "制作+販売型", routeColor: ROUTE.sell,
      scenario: "月2件の小規模アプリ制作 + テンプレート販売で副収益化。",
      numbers: [
        { label: "制作売上 / 月", value: "¥100,000" },
        { label: "テンプレート販売 / 月", value: "約 ¥30,000" },
        { label: "継続レベニュー / 月", value: "約 ¥6,000" },
      ],
    },
    {
      persona: "セールスパートナー Cさん", rank: "Silver / 20%", rankColor: C.silver, route: "紹介型", routeColor: ROUTE.share,
      scenario: "業界特化メディアやSNSから紹介コードへ送客。登録・利用開始されたアカウントの月額利用に応じて継続レベニューを獲得。",
      numbers: [
        { label: "紹介経由アカウント（累計）", value: "20件" },
        { label: "継続レベニュー / 月", value: "約 ¥20,000" },
        { label: "年間継続収益", value: "約 ¥240,000" },
      ],
    },
    {
      persona: "開発会社 D社", rank: "Platinum / 30%", rankColor: C.platinum, route: "制作型（大型）", routeColor: ROUTE.build,
      scenario: "大型案件やエムスタFull案件を含め、複数クライアントを継続運用。",
      numbers: [
        { label: "制作売上 / 月", value: "¥1,500,000+" },
        { label: "継続レベニュー / 月（30件）", value: "約 ¥135,000" },
        { label: "年間継続収益", value: "約 ¥1,620,000" },
      ],
    },
  ];

  cases.forEach((c, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.8 + col * 6.05;
    const y = 1.85 + row * 2.35;

    topBarCard(s, x, y, 5.75, 2.1, c.routeColor);

    s.addText(c.persona, { x: x + 0.25, y: y + 0.16, w: 3.4, h: 0.35, fontSize: 12.5, fontFace: FONT, bold: true, color: C.text });
    pill(s, x + 3.6, y + 0.18, c.route, c.routeColor);
    pill(s, x + 4.75, y + 0.18, c.rank, c.rankColor);

    s.addText(c.scenario, {
      x: x + 0.25, y: y + 0.52, w: 5.3, h: 0.5,
      fontSize: 8.5, fontFace: FONT, color: C.textSub, lineSpacingMultiple: 1.35,
    });

    c.numbers.forEach((n, ni) => {
      const ny = y + 1.1 + ni * 0.33;
      s.addShape(RRECT, { x: x + 0.25, y: ny, w: 5.25, h: 0.28, fill: { color: ni === c.numbers.length - 1 ? C.cyanPale : C.offWhite }, rectRadius: 0.05 });
      s.addText(n.label, { x: x + 0.4, y: ny, w: 3.4, h: 0.28, fontSize: 8.5, fontFace: FONT, color: C.textSub, valign: "middle" });
      s.addText(n.value, { x: x + 3.4, y: ny, w: 2.0, h: 0.28, fontSize: 10.5, fontFace: FONT, bold: true, color: ni === c.numbers.length - 1 ? C.cyanDeep : C.text, align: "right", valign: "middle" });
    });
  });

  // 締めコピー + 試算条件
  glass(s, 0.8, 6.6, 6.4, 0.6, C.cyan);
  s.addText("収益は、案件単価だけでなく、継続利用と紹介の積み上げで育ちます。", {
    x: 1.0, y: 6.6, w: 6.0, h: 0.6,
    fontSize: 10.5, fontFace: FONT, bold: true, color: C.cyanDeep, valign: "middle",
  });

  s.addText("【試算条件】1アプリあたりの月額利用料をもとに試算（Web / iOS / Android構成により変動）。還元率はパートナーランクに応じて変動。案件数・制作単価はモデルケースです。継続率は仮定であり、実際の収益を保証するものではありません。", {
    x: 7.4, y: 6.55, w: 5.2, h: 0.75,
    fontSize: 6.5, fontFace: FONT, color: C.textMuted, lineSpacingMultiple: 1.35, valign: "middle",
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 16 初月30日アクション
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide16(pptx: PptxGenJS) {
  const s = whiteBg(pptx);
  slideNum(s, 16);
  eyebrow(s, "First 30 Days");
  heading(s, "登録後30日で、最初の収益導線をつくる。", { fontSize: 25 });
  lead(s, "パートナー登録はゴールではありません。重要なのは、登録後に自分の強みに合った活動を開始することです。", { y: 1.62 });

  // 共通ステップ（1-2週目）
  const common = [
    { week: "1週目", title: "登録・理解", items: "パートナー登録 / かんたんモード・プロモード確認 / 紹介コード・制度条件の確認" },
    { week: "2週目", title: "参加ルートを決める", items: "制作する・紹介する・テンプレートを販売する / 自分に合う活動方針を整理" },
  ];
  common.forEach((c, i) => {
    const x = 0.8 + i * 6.05;
    card(s, x, 2.35, 5.75, 0.95, { fill: C.offWhite });
    pill(s, x + 0.2, 2.55, c.week, C.navy);
    s.addText(c.title, { x: x + 1.35, y: 2.45, w: 4.2, h: 0.3, fontSize: 11.5, fontFace: FONT, bold: true, color: C.text });
    s.addText(c.items, { x: x + 1.35, y: 2.78, w: 4.3, h: 0.45, fontSize: 8.5, fontFace: FONT, color: C.textSub, lineSpacingMultiple: 1.3 });
  });

  // ルート別 3-4週目
  const routes = [
    {
      title: "制作パートナー", icon: "💻", color: ROUTE.build,
      w3: ["既存顧客への追加提案", "サンプルアプリ作成", "見積りパターン整理"],
      w4: ["初回案件相談", "導入設計", "制作開始"],
    },
    {
      title: "セールス / 紹介パートナー", icon: "📣", color: ROUTE.share,
      w3: ["紹介記事・LP・SNS投稿を作成", "紹介コード設置", "既存顧客・業界コミュニティへ案内"],
      w4: ["流入状況の確認", "紹介導線の改善", "オンライン相談で業界特化戦略を整理"],
    },
    {
      title: "テンプレート販売", icon: "🏪", color: ROUTE.sell,
      w3: ["業界特化UI・テンプレート案を作成", "販売テーマを決定", "サンプル構成を準備"],
      w4: ["販売準備", "紹介記事や導入文脈と連動", "初回公開・改善"],
    },
  ];

  routes.forEach((r, i) => {
    const x = 0.8 + i * 4.15;
    topBarCard(s, x, 3.55, 3.85, 3.45, r.color);
    s.addText(`${r.icon}  ${r.title}`, {
      x: x + 0.25, y: 3.72, w: 3.4, h: 0.35,
      fontSize: 11.5, fontFace: FONT, bold: true, color: r.color,
    });

    pill(s, x + 0.25, 4.15, "3週目", r.color);
    r.w3.forEach((t, ti) => {
      s.addText(`•  ${t}`, { x: x + 0.3, y: 4.5 + ti * 0.34, w: 3.4, h: 0.32, fontSize: 8.5, fontFace: FONT, color: C.textSub });
    });

    pill(s, x + 0.25, 5.6, "4週目", r.color);
    r.w4.forEach((t, ti) => {
      s.addText(`•  ${t}`, { x: x + 0.3, y: 5.95 + ti * 0.34, w: 3.4, h: 0.32, fontSize: 8.5, fontFace: FONT, color: C.textSub });
    });
  });

  s.addText("どのルートでも、30日後には「最初の収益導線」が形になっている状態を目指します。", {
    x: 0.8, y: 7.1, w: 11.7, h: 0.3,
    fontSize: 9, fontFace: FONT, color: C.textMuted, align: "center",
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 17 導入事例
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide17(pptx: PptxGenJS) {
  const s = lightBg(pptx);
  slideNum(s, 17);
  eyebrow(s, "Customer Cases");
  heading(s, "実際の活用事例から、提案の可能性を広げる。", { fontSize: 25 });

  const cases = [
    {
      name: "鳥取県歯科医師会様 / App歯っ鳥くん",
      type: "団体・会員向けアプリ",
      typeColor: C.green,
      desc: "災害時の安否確認から、日常の会員連絡までを支える情報インフラ。",
      features: ["投稿", "プッシュ通知", "アンケート", "会員管理"],
      pitch: "公共性のある団体・協会向けアプリの参考事例。",
    },
    {
      name: "アデジョ薬膳®様 / 体質診断コンテンツ",
      type: "エムスタFull活用事例",
      typeColor: C.purple,
      desc: "独自の体質診断メソッドを、認定講師が使える診断コンテンツへ。",
      features: ["診断ロジック", "PDF出力", "会員管理", "独自コンテンツ"],
      pitch: "独自メソッドや講座ビジネスのコンテンツ化事例。",
    },
  ];

  cases.forEach((c, i) => {
    const x = 0.8 + i * 6.05;
    card(s, x, 1.95, 5.75, 4.6);

    // 画像プレースホルダ枠（大きめ）
    s.addShape(RRECT, {
      x: x + 0.25, y: 2.2, w: 5.25, h: 1.85,
      fill: { color: C.bg },
      rectRadius: 0.1,
      line: { color: C.border, width: 0.7, dashType: "dash" },
    });
    s.addText("画面イメージ", {
      x: x + 0.25, y: 2.2, w: 5.25, h: 1.85,
      fontSize: 10, fontFace: FONT, color: C.textMuted, align: "center", valign: "middle",
    });

    pill(s, x + 0.25, 4.2, c.type, c.typeColor);
    s.addText(c.name, {
      x: x + 0.25, y: 4.55, w: 5.25, h: 0.35,
      fontSize: 12.5, fontFace: FONT, bold: true, color: C.text,
    });
    s.addText(c.desc, {
      x: x + 0.25, y: 4.95, w: 5.25, h: 0.45,
      fontSize: 9.5, fontFace: FONT, color: C.textSub, lineSpacingMultiple: 1.4,
    });

    // 活用機能タグ
    c.features.forEach((f, fi) => {
      const fw = f.length * 0.13 + 0.35;
      let fx = x + 0.25;
      for (let j = 0; j < fi; j++) {
        fx += c.features[j].length * 0.13 + 0.45;
      }
      s.addShape(RRECT, { x: fx, y: 5.5, w: fw, h: 0.28, fill: { color: C.cyanPale }, rectRadius: 0.14 });
      s.addText(f, { x: fx, y: 5.5, w: fw, h: 0.28, fontSize: 8, fontFace: FONT, bold: true, color: C.cyanDeep, align: "center", valign: "middle" });
    });

    // 一言訴求
    glass(s, x + 0.25, 5.95, 5.25, 0.42, C.cyan);
    s.addText(`💡 ${c.pitch}`, {
      x: x + 0.4, y: 5.95, w: 5.0, h: 0.42,
      fontSize: 9, fontFace: FONT, bold: true, color: C.cyanDeep, valign: "middle",
    });
  });

  s.addText("このような案件を提案できます", {
    x: 0.8, y: 6.65, w: 11.7, h: 0.3,
    fontSize: 9.5, fontFace: FONT, bold: true, color: C.textSub, align: "center",
  });

  s.addShape(RRECT, { x: 1.5, y: 7.0, w: 10.3, h: 0.42, fill: { color: C.navy }, rectRadius: 0.21 });
  s.addText("公共性のある団体案件から、独自メソッドのコンテンツ化まで。エムスタは、多様な事業課題に応用できます。", {
    x: 1.5, y: 7.0, w: 10.3, h: 0.42,
    fontSize: 9.5, fontFace: FONT, bold: true, color: C.white, align: "center", valign: "middle",
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 18 パートナー支援体制
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide18(pptx: PptxGenJS) {
  const s = whiteBg(pptx);
  slideNum(s, 18);
  eyebrow(s, "Support");
  heading(s, "自分で進められ、必要に応じて広げられる環境。", { fontSize: 25 });
  lead(s, "エムスタは、パートナーが自社の強みやリソースに合わせて活動できる環境を提供します。制作・紹介・販売、それぞれの参加方法に合わせて活用できます。");

  const items = [
    { title: "かんたんモード", icon: "🌱", color: C.green, desc: "初心者・副業層でも、ガイドに沿って小規模アプリ制作を始めやすいUI。" },
    { title: "プロモード", icon: "⚡", color: ROUTE.build, desc: "制作会社・開発会社・デザイナーが、より柔軟に案件へ対応できる編集環境。" },
    { title: "紹介コード / セールス導線", icon: "🔑", color: ROUTE.share, desc: "自社媒体・SNS・営業活動からエムスタへ送客し、紹介経由の収益化を目指せる仕組み。" },
    { title: "CMS標準搭載", icon: "⚙️", color: C.cyanDeep, desc: "納品後もクライアント自身が情報更新しやすく、継続運用しやすい設計。" },
    { title: "テンプレート活用", icon: "🧩", color: ROUTE.sell, desc: "業界特化の型を活用し、制作スピードと提案力を向上。" },
    { title: "オフィシャル制作 / エムスタFull", icon: "🏗", color: C.navy, desc: "自社制作工数を削減したい場合や、より高度な実装要件に対応したい場合の選択肢。" },
  ];

  items.forEach((it, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.8 + col * 4.15;
    const y = 2.65 + row * 1.95;

    topBarCard(s, x, y, 3.85, 1.7, it.color);
    iconBubble(s, x + 0.22, y + 0.22, it.icon, it.color, 0.55);
    s.addText(it.title, {
      x: x + 0.9, y: y + 0.25, w: 2.85, h: 0.5,
      fontSize: 11, fontFace: FONT, bold: true, color: C.text, lineSpacingMultiple: 1.2, valign: "top",
    });
    s.addText(it.desc, {
      x: x + 0.25, y: y + 0.85, w: 3.4, h: 0.8,
      fontSize: 8.5, fontFace: FONT, color: C.textSub, lineSpacingMultiple: 1.45,
    });
  });

  s.addShape(RRECT, { x: 1.0, y: 6.7, w: 11.3, h: 0.48, fill: { color: C.navy }, rectRadius: 0.24 });
  s.addText("自社で作る。紹介する。テンプレートを売る。必要に応じてオフィシャル制作を活用する。複数の関わり方を選べるパートナー基盤です。", {
    x: 1.0, y: 6.7, w: 11.3, h: 0.48,
    fontSize: 10, fontFace: FONT, bold: true, color: C.white, align: "center", valign: "middle",
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 19 料金・条件
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide19(pptx: PptxGenJS) {
  const s = lightBg(pptx);
  slideNum(s, 19);
  eyebrow(s, "Pricing Structure");
  heading(s, "料金構造とレベニューシェア対象。");
  lead(s, "エンドクライアントの月額利用料に応じて、パートナーランク別のレベニューシェアが発生します。");

  // 構造図: エンドクライアント月額利用料 → レベニューシェア → パートナー収益
  // Box 1: エンドクライアント月額利用料
  card(s, 0.8, 2.6, 4.0, 3.3);
  s.addShape(RECT, { x: 0.81, y: 2.61, w: 3.98, h: 0.07, fill: { color: C.blue } });
  s.addText("エンドクライアント\n月額利用料", {
    x: 1.0, y: 2.8, w: 3.6, h: 0.7,
    fontSize: 13, fontFace: FONT, bold: true, color: C.text, lineSpacingMultiple: 1.3,
  });
  const fees = ["アカウント基本利用料", "Webアプリ公開料", "iOSアプリ公開料", "Androidアプリ公開料", "有償アドオン / 個別制作"];
  fees.forEach((f, i) => {
    const y = 3.65 + i * 0.43;
    s.addShape(RRECT, { x: 1.0, y, w: 3.6, h: 0.36, fill: { color: C.bluePale }, rectRadius: 0.08 });
    s.addText(f, { x: 1.15, y, w: 3.3, h: 0.36, fontSize: 9, fontFace: FONT, bold: true, color: C.blueDeep, valign: "middle" });
  });

  // Arrow 1
  s.addShape(RRECT, { x: 4.95, y: 3.95, w: 0.75, h: 0.5, fill: { color: C.cyan }, rectRadius: 0.1 });
  s.addText("→", { x: 4.95, y: 3.95, w: 0.75, h: 0.5, fontSize: 16, fontFace: FONT, bold: true, color: C.navy, align: "center", valign: "middle" });

  // Box 2: ランク別還元率
  card(s, 5.85, 2.6, 2.9, 3.3);
  s.addShape(RECT, { x: 5.86, y: 2.61, w: 2.88, h: 0.07, fill: { color: C.cyan } });
  s.addText("ランク別\nレベニューシェア", {
    x: 6.05, y: 2.8, w: 2.5, h: 0.7,
    fontSize: 13, fontFace: FONT, bold: true, color: C.text, lineSpacingMultiple: 1.3,
  });
  const rk = [
    { n: "Bronze", r: "15%", c: C.bronze },
    { n: "Silver", r: "20%", c: C.silver },
    { n: "Gold", r: "25%", c: C.gold },
    { n: "Platinum", r: "30%", c: C.platinum },
    { n: "Legend", r: "35%", c: C.legend },
  ];
  rk.forEach((r, i) => {
    const y = 3.65 + i * 0.43;
    s.addText(r.n, { x: 6.05, y, w: 1.4, h: 0.36, fontSize: 9.5, fontFace: FONT, bold: true, color: C.textSub, valign: "middle" });
    s.addText(r.r, { x: 7.3, y, w: 1.2, h: 0.36, fontSize: 11, fontFace: FONT, bold: true, color: r.c, align: "right", valign: "middle" });
  });

  // Arrow 2
  s.addShape(RRECT, { x: 8.9, y: 3.95, w: 0.75, h: 0.5, fill: { color: C.cyan }, rectRadius: 0.1 });
  s.addText("→", { x: 8.9, y: 3.95, w: 0.75, h: 0.5, fontSize: 16, fontFace: FONT, bold: true, color: C.navy, align: "center", valign: "middle" });

  // Box 3: パートナー収益
  card(s, 9.8, 2.6, 2.75, 3.3, { fill: C.navy });
  s.addShape(RECT, { x: 9.81, y: 2.61, w: 2.73, h: 0.07, fill: { color: C.cyanLight } });
  s.addText("パートナー収益", {
    x: 10.0, y: 2.85, w: 2.4, h: 0.4,
    fontSize: 13, fontFace: FONT, bold: true, color: C.white,
  });
  const incomes = ["制作費", "継続レベニュー", "紹介レベニュー", "テンプレ販売"];
  incomes.forEach((t, i) => {
    const y = 3.65 + i * 0.5;
    s.addShape(RRECT, { x: 10.0, y, w: 2.35, h: 0.42, fill: { color: C.navyCard }, rectRadius: 0.08, line: { color: C.cyan, width: 0.5 } });
    s.addText(t, { x: 10.15, y, w: 2.1, h: 0.42, fontSize: 9.5, fontFace: FONT, bold: true, color: C.cyanLight, valign: "middle" });
  });

  // パートナー側の収益設計
  s.addText("パートナー側の収益設計", { x: 0.8, y: 6.1, w: 4, h: 0.3, fontSize: 10.5, fontFace: FONT, bold: true, color: C.text });
  const designs = [
    "制作費はパートナー側で設計可能",
    "継続レベニューは月額利用に応じて発生",
    "紹介コード経由の登録・利用開始もレベニューシェア対象",
    "オフィシャル制作を活用し、営業・ディレクションに集中することも可能",
    "詳細条件はパートナー登録後またはオンライン相談時に案内",
  ];
  designs.forEach((d, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    s.addText(`✓  ${d}`, {
      x: 0.8 + col * 6.05, y: 6.45 + row * 0.32, w: 6.0, h: 0.3,
      fontSize: 8.5, fontFace: FONT, color: C.textSub,
    });
  });

  s.addText("※ 料金・還元条件は変更となる場合があります。最新条件は個別にご確認ください。", {
    x: 7.0, y: 7.15, w: 5.5, h: 0.25,
    fontSize: 7, fontFace: FONT, color: C.textMuted, align: "right",
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 20 よくある質問
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide20(pptx: PptxGenJS) {
  const s = whiteBg(pptx);
  slideNum(s, 20);
  eyebrow(s, "FAQ");
  heading(s, "よくある質問");

  const faqs = [
    { q: "制作経験がなくても参加できますか？", a: "はい。紹介パートナーとして、自社媒体・SNS・営業活動から送客する参加方法があります。", hot: true },
    { q: "Web制作しか経験がなくても参加できますか？", a: "はい。Web制作後の追加提案として、会員アプリ・予約・通知などを提案できます。" },
    { q: "既存クライアントへの提案に使えますか？", a: "はい。既存顧客へのアップセルや継続提案として活用できます。" },
    { q: "制作をすべて自社で行う必要がありますか？", a: "いいえ。自社制作だけでなく、紹介パートナーとしての参加や、オフィシャル制作の活用も可能です。" },
    { q: "初心者・副業でも始められますか？", a: "はい。かんたんモード、小規模アプリ制作、紹介活動、テンプレート販売などから始められます。", hot: true },
    { q: "テンプレート販売だけでも参加できますか？", a: "はい。業界特化UIやテンプレート資産を販売する参加方法もあります。" },
    { q: "エムスタFull案件はどう扱いますか？", a: "独自機能や高度な要件がある場合は、オフィシャル制作プランとして個別対応します。" },
    { q: "セールスパートナーとしての活動方法は相談できますか？", a: "はい。紹介コードの活用、業界特化記事、営業導線、媒体設計などはオンラインにて個別にご相談いただけます。", hot: true },
  ];

  faqs.forEach((f, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.8 + col * 6.05;
    const y = 1.85 + row * 1.3;

    card(s, x, y, 5.75, 1.12, f.hot ? { border: C.cyan } : undefined);
    s.addShape(RRECT, { x: x + 0.18, y: y + 0.15, w: 0.34, h: 0.34, fill: { color: f.hot ? C.cyan : C.bluePale }, rectRadius: 0.08 });
    s.addText("Q", { x: x + 0.18, y: y + 0.15, w: 0.34, h: 0.34, fontSize: 12, fontFace: FONT, bold: true, color: f.hot ? C.white : C.blueDeep, align: "center", valign: "middle" });

    s.addText(f.q, {
      x: x + 0.65, y: y + 0.1, w: 4.95, h: 0.4,
      fontSize: 10, fontFace: FONT, bold: true, color: C.text, valign: "top",
    });
    s.addText(f.a, {
      x: x + 0.65, y: y + 0.5, w: 4.95, h: 0.58,
      fontSize: 8.5, fontFace: FONT, color: C.textSub, lineSpacingMultiple: 1.35,
    });
  });

  s.addText("枠線付きの質問は、特にお問い合わせの多い項目です。", {
    x: 0.8, y: 7.15, w: 11.7, h: 0.25,
    fontSize: 8, fontFace: FONT, color: C.textMuted, align: "center",
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 21 次のステップ
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide21(pptx: PptxGenJS) {
  const s = lightBg(pptx);
  slideNum(s, 21);
  eyebrow(s, "Next Step");
  heading(s, "あなたに合う始め方を選んでください。");

  const choices = [
    {
      no: "選択肢 1", title: "まず登録して始める", icon: "🚀", color: C.cyan,
      desc: "パートナーアカウントを作成し、エムスタ上でアプリビジネスを開始できます。",
      fits: [
        "すぐに管理画面を触ってみたい",
        "既に提案先や紹介先がある",
        "小さく始めてみたい",
        "紹介コードを活用して送客を始めたい",
      ],
      cta: "パートナーアカウントを作成する",
    },
    {
      no: "選択肢 2", title: "自社に合う活用方法を相談する", icon: "💬", color: C.blue,
      desc: "制作・紹介・販売のどこから始めるべきか、個別に整理します。",
      fits: [
        "既存事業への組み込み方を相談したい",
        "業界特化の紹介戦略を作りたい",
        "セールスパートナーとしての導線設計を知りたい",
        "エムスタFullやオフィシャル制作の活用可否を相談したい",
      ],
      cta: "オンラインで相談する",
    },
  ];

  choices.forEach((c, i) => {
    const x = 0.8 + i * 6.05;
    topBarCard(s, x, 2.0, 5.75, 4.6, c.color);

    pill(s, x + 0.3, 2.25, c.no, c.color);
    iconBubble(s, x + 4.8, 2.25, c.icon, c.color, 0.65);
    s.addText(c.title, {
      x: x + 0.3, y: 2.65, w: 5.1, h: 0.45,
      fontSize: 16, fontFace: FONT, bold: true, color: C.text,
    });
    s.addText(c.desc, {
      x: x + 0.3, y: 3.15, w: 5.15, h: 0.5,
      fontSize: 10, fontFace: FONT, color: C.textSub, lineSpacingMultiple: 1.5,
    });

    s.addText("向いている人", { x: x + 0.3, y: 3.75, w: 3, h: 0.3, fontSize: 9, fontFace: FONT, bold: true, color: C.textMuted });
    c.fits.forEach((f, fi) => {
      const y = 4.1 + fi * 0.42;
      s.addText(`✓  ${f}`, { x: x + 0.3, y, w: 5.15, h: 0.4, fontSize: 9.5, fontFace: FONT, color: C.textSub });
    });

    // CTAボタン
    s.addShape(RRECT, { x: x + 0.3, y: 5.95, w: 5.15, h: 0.5, fill: { color: c.color }, rectRadius: 0.25 });
    s.addText(`${c.cta}  →`, {
      x: x + 0.3, y: 5.95, w: 5.15, h: 0.5,
      fontSize: 11, fontFace: FONT, bold: true, color: i === 0 ? C.navy : C.white, align: "center", valign: "middle",
    });
  });

  s.addText("迷ったらオンライン相談がおすすめです。", {
    x: 0.8, y: 6.85, w: 11.7, h: 0.35,
    fontSize: 9.5, fontFace: FONT, color: C.textMuted, align: "center",
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 22 最終CTA
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function slide22(pptx: PptxGenJS) {
  const s = navyBg(pptx);

  decoCircle(s, -3, -3, 10, C.cyan, 90);
  decoCircle(s, 9, 3.5, 9, C.blue, 91);

  gradStrip(s, 0, 0, SW, 0.06, C.cyan, C.blue);

  s.addText("あなたの強みを、\nエムスタ経済圏の収益機会へ。", {
    x: 0.8, y: 1.4, w: 11.7, h: 1.7,
    fontSize: 34, fontFace: FONT, bold: true, color: C.white,
    align: "center", lineSpacingMultiple: 1.3,
  });

  s.addText("エムスタ Partner Programは、アプリ制作だけでなく、紹介・送客・テンプレート販売を通じて、\nパートナー・クライアント・エンドユーザーが共に価値を広げていくための共創型プログラムです。", {
    x: 0.8, y: 3.3, w: 11.7, h: 0.8,
    fontSize: 11.5, fontFace: FONT, color: C.textMuted, align: "center", lineSpacingMultiple: 1.7,
  });

  // 2 CTAボタン
  const ctas = [
    { label: "パートナーアカウントを作成する", color: C.cyan, textColor: C.navy },
    { label: "オンラインで活用方法を相談する", color: C.navyCard, textColor: C.cyanLight, border: true },
  ];
  ctas.forEach((c, i) => {
    const x = 2.75 + i * 4.2;
    s.addShape(RRECT, {
      x, y: 4.45, w: 3.85, h: 0.65,
      fill: { color: c.color },
      rectRadius: 0.32,
      line: { color: c.border ? C.cyan : c.color, width: 1 },
    });
    s.addText(`${c.label}  →`, {
      x, y: 4.45, w: 3.85, h: 0.65,
      fontSize: 11.5, fontFace: FONT, bold: true, color: c.textColor, align: "center", valign: "middle",
    });
  });

  // 補足コピー
  s.addText("制作会社・開発会社・デザイナー・営業会社・業界メディア・個人クリエイター・副業で始めたい方まで。\n作る力、届ける力、業界に入り込む力を、エムスタ上で収益機会に変えていきましょう。", {
    x: 0.8, y: 5.45, w: 11.7, h: 0.75,
    fontSize: 10, fontFace: FONT, color: C.textMuted, align: "center", lineSpacingMultiple: 1.7,
  });

  // URL導線
  s.addShape(RRECT, { x: 4.2, y: 6.5, w: 5.0, h: 0.5, fill: { color: C.navyCard }, rectRadius: 0.1, line: { color: C.navyLine, width: 0.5 } });
  s.addText("https://msta-app.com/partners", {
    x: 4.2, y: 6.5, w: 5.0, h: 0.5,
    fontSize: 12, fontFace: FONT, bold: true, color: C.cyanLight, align: "center", valign: "middle",
  });

  s.addText("R117 Inc.", {
    x: 0.8, y: 7.05, w: 11.7, h: 0.3,
    fontSize: 9, fontFace: FONT, bold: true, color: C.navyLine, align: "center",
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Main
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

async function main() {
  console.log("Generating エムスタ Partner Program Deck V2...");
  const pptx = build();
  const outPath = "ms-studio-partner-deck.pptx";
  await pptx.writeFile({ fileName: outPath });
  console.log(`Done! → ${outPath}`);
}

main().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
