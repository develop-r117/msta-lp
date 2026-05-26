/**
 * Cloudflare Pages 向け Next.js ビルドラッパ。
 *
 * Keystatic Admin (`/keystatic`) と API ハンドラ (`/api/keystatic`) は
 * `@keystatic/next/route-handler` が Node.js fs/path 等に依存するため、
 * `@cloudflare/next-on-pages` の edge runtime 検査でビルド失敗となる。
 *
 * このスクリプトはビルド中だけ該当ディレクトリを `_disabled` 末尾にリネームし、
 * Next.js の app router からスキップさせる (アンダースコアプレフィックスは
 * Next.js が自動的にビルド対象外とする規約)。
 *
 * Cloudflare のビルドホストは clone した直後の環境なので、ビルド失敗時の
 * restore は最善努力で行う (ローカル実行時のみ意味あり)。
 */
import { execSync } from "node:child_process";
import { existsSync, renameSync } from "node:fs";

const MOVES = [
  { from: "src/app/keystatic", to: "src/app/_keystatic_disabled" },
  { from: "src/app/api/keystatic", to: "src/app/api/_keystatic_disabled" },
];

function disable() {
  for (const { from, to } of MOVES) {
    if (existsSync(from) && !existsSync(to)) {
      renameSync(from, to);
      console.log(`✓ disabled ${from}`);
    }
  }
}

function restore() {
  for (const { from, to } of MOVES) {
    if (existsSync(to)) {
      renameSync(to, from);
      console.log(`✓ restored ${from}`);
    }
  }
}

let buildError = null;
try {
  disable();
  execSync("npm run dump:cms && npx @cloudflare/next-on-pages@1", {
    stdio: "inherit",
  });
} catch (err) {
  buildError = err;
} finally {
  restore();
}

if (buildError) {
  console.error("\nCloudflare build failed.");
  process.exit(1);
}
