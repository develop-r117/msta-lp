/**
 * 黒背景にフラット化されてしまった PNG の透過を復元する一回限りのユーティリティ。
 *
 * 添付画像が「透過 → 黒(#000)」に統合されていたため、画像の縁から連結する
 * 純黒に近い領域だけをフラッドフィルでアルファ 0 にする。
 * スマホモックの濃紺ベゼル([15,24,41]等)や内部の黒い要素は縁と連結していない/
 * 閾値より明るいため保持される。
 *
 * 実行: node scripts/restore-png-transparency.mjs
 */
import sharp from "sharp";

// しきい値: RGB の最大チャンネルがこの値未満なら「黒(=元透過)」とみなす。
// 低めにすることで、ベゼル(濃紺)やスーツ等のごく暗い前景を保持する。
// 透過マージンは [0,0,0] のため 8 でも確実に分離できる。
const THRESH = 8;

const ASSETS =
  "/Users/whiteboard/.cursor/projects/Users-whiteboard-projects-msta-lp/assets";

// 元アセット(黒フラット化・不透過) -> 出力(透過復元)
const JOBS = [
  [`${ASSETS}/______________-5e4b4c95-6060-4e09-8973-6458dbeed133.png`, "public/cases/tottori/team.png"],
  [`${ASSETS}/App_____TOP______-40742c64-40ff-439c-906b-cd7ca703c8e3.png`, "public/cases/tottori/home.png"],
  [`${ASSETS}/App___________________-242c74f0-6a19-4492-bf5a-57a8e5469ce9.png`, "public/cases/tottori/menu.png"],
  [`${ASSETS}/App_________________-451c0f10-c060-4ff7-ae31-bd2f7aea2633.png`, "public/cases/tottori/news.png"],
  [`${ASSETS}/__________-c459e9b5-cb3a-484f-8685-6e81d50042fe.png`, "public/cases/tottori/survey.png"],
  [`${ASSETS}/_____________________-be59deb4-1298-4735-b94b-257dcabc7a6b.png`, "public/cases/tottori/district.png"],
];

function isBlack(data, i) {
  return data[i] < THRESH && data[i + 1] < THRESH && data[i + 2] < THRESH;
}

async function processOne(src, out) {
  const { data, info } = await sharp(src)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels: ch } = info;
  const visited = new Uint8Array(width * height);
  const stack = [];

  const pushIfBlack = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const p = y * width + x;
    if (visited[p]) return;
    if (!isBlack(data, p * ch)) return;
    visited[p] = 1;
    stack.push(p);
  };

  // 全ての縁ピクセルを起点にする
  for (let x = 0; x < width; x++) {
    pushIfBlack(x, 0);
    pushIfBlack(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    pushIfBlack(0, y);
    pushIfBlack(width - 1, y);
  }

  let cleared = 0;
  while (stack.length) {
    const p = stack.pop();
    const x = p % width;
    const y = (p - x) / width;
    data[p * ch + 3] = 0; // alpha = 0
    cleared++;
    pushIfBlack(x + 1, y);
    pushIfBlack(x - 1, y);
    pushIfBlack(x, y + 1);
    pushIfBlack(x, y - 1);
  }

  await sharp(data, { raw: { width, height, channels: ch } })
    .png()
    .toFile(out + ".tmp");
  const { renameSync } = await import("node:fs");
  renameSync(out + ".tmp", out);

  const pct = ((cleared / (width * height)) * 100).toFixed(1);
  console.log(`✓ ${out}  透過化 ${cleared}px (${pct}%)`);
}

for (const [src, out] of JOBS) {
  await processOne(src, out);
}
console.log("done");
