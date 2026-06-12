/**
 * content/ の最新内容を CMS 用 KV (CMS_KV) へ投入する。
 *
 * 用途:
 * - 初回セットアップ時の投入
 * - ローカル (Keystatic / content ファイル) で編集した内容を公開へ反映したい場合
 *
 * 注意: KV は /admin での編集内容が正となるため、/admin で編集した後に
 * このスクリプトを実行すると content/ の内容で上書きされる。
 *
 * 実行: node scripts/seed-cms-kv.mjs  (wrangler login 済みであること)
 */
import { execSync } from "node:child_process";

const NAMESPACE_ID = "8f26118b07fe4928bc412dc18179049e";
const KEY = "cms:data";

execSync("npm run dump:cms", { stdio: "inherit" });

execSync(
  `npx wrangler kv key put ${KEY} --path src/data/cms.generated.json --namespace-id ${NAMESPACE_ID} --remote`,
  { stdio: "inherit" },
);

console.log("✓ KV seeded: cms:data");
