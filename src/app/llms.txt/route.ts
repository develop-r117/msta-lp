import { SITE_URL, SITE_NAME, ORGANIZATION } from "@/lib/site";
import { FEATURE_CATEGORIES, FEATURES } from "@/lib/features";
import { getAllCases } from "@/lib/cms-data";

export const runtime = "edge";
export const dynamic = "force-dynamic";

/**
 * LLMO: 大規模言語モデル向けのサイト要約（llms.txt 仕様準拠）。
 * https://llmstxt.org/
 */
export async function GET() {
  const u = (path: string) => `${SITE_URL}${path}`;

  const lines: string[] = [];

  lines.push(`# ${SITE_NAME}（MS Studio）`);
  lines.push("");
  lines.push(
    "> エムスタは、Webアプリ・iOS・Androidに対応した次世代型アプリ制作プラットフォーム。CMS（管理ダッシュボード）を標準搭載し、アプリの制作・公開・運用・改善・収益化までを一つの場所で完結できます。初期費用0円・月額制で、2週間の無料トライアルから始められます。",
  );
  lines.push("");
  lines.push(
    [
      `運営会社: ${ORGANIZATION.legalName}（${ORGANIZATION.url}）`,
      `所在地: 〒${ORGANIZATION.address.postalCode} ${ORGANIZATION.address.region}${ORGANIZATION.address.locality}${ORGANIZATION.address.street}`,
      `お問い合わせ: ${ORGANIZATION.email}`,
    ].join(" / "),
  );
  lines.push("");

  lines.push("## 特長");
  lines.push(
    "- 真のノーコード: コードを書かずに本格的なネイティブ/Webアプリを制作できる",
  );
  lines.push(
    "- 最強CMS: リリース後の運用・更新・分析・収益化までを管理ダッシュボードでカバー",
  );
  lines.push(
    "- マルチプラットフォーム: 1つのプロジェクトからWeb・iOS・Androidに対応",
  );
  lines.push(
    "- かんたんモード / プロモード: 初心者にもプロにも適した2つの制作モード",
  );
  lines.push("- AI / エージェント: 制作と運用を支援するAI機能を搭載");
  lines.push("- 料金: 初期費用0円・月額制・2週間無料トライアル");
  lines.push("");

  lines.push("## プロダクト");
  lines.push(`- [エムスタとは](${u("/product")}): 真のノーコード × 最強CMS`);
  lines.push(
    `- [CMS / 管理ダッシュボード](${u("/product/cms")}): リリース後の運用までカバー`,
  );
  lines.push(
    `- [かんたん / プロモード](${u("/product/modes")}): 初心者にもプロにも対応する制作モード`,
  );
  lines.push(
    `- [全機能一覧](${u("/product/features")}): 情報発信から拡張機能まで網羅`,
  );
  lines.push(
    `- [AI / エージェント](${u("/product/ai")}): 制作・運用を支援するAI`,
  );
  lines.push(
    `- [チーム運用 / 権限](${u("/product/team")}): 組織でも安全に運用`,
  );
  lines.push("");

  lines.push("## 機能カテゴリ");
  for (const cat of FEATURE_CATEGORIES) {
    lines.push(`- ${cat.label}: ${cat.description}`);
  }
  lines.push("");

  lines.push("## 主な機能");
  for (const f of FEATURES) {
    lines.push(
      `- [${f.name}](${u(`/product/features/${f.slug}`)}): ${f.summary}`,
    );
  }
  lines.push("");

  lines.push("## サービス / 制作支援");
  lines.push(
    `- [オフィシャル制作](${u("/services/official")}): 公式チームによる制作代行（¥100,000〜）`,
  );
  lines.push(
    `- [3hパック](${u("/services/3h-pack")}): 当日3時間でリアルタイム制作（ローンチ記念 ¥35,000）`,
  );
  lines.push(
    `- [エムスタFull](${u("/services/full")}): 独自要件・スクラッチ受託開発`,
  );
  lines.push("");

  lines.push("## パートナー");
  lines.push(
    `- [パートナープログラム](${u("/partners")}): アプリビジネスを始めるための制度`,
  );
  lines.push(
    `- [資料ダウンロード](${u("/partners/document")}): パートナー制度の概要資料`,
  );
  lines.push("");

  lines.push("## 料金・導入");
  lines.push(`- [料金](${u("/pricing")}): 初期費用0円・月額制のシンプルな料金`);
  lines.push(`- [導入までの流れ](${u("/flow")}): 申し込みから公開までのステップ`);
  lines.push(`- [よくある質問](${u("/faq")}): プロダクト・料金・運用などのFAQ`);
  lines.push(`- [お問い合わせ](${u("/contact")}): ご相談・ご質問の窓口`);
  lines.push("");

  try {
    const cases = (await getAllCases())
      .filter((c) => !c.cardOnly)
      .slice(0, 20);
    if (cases.length) {
      lines.push("## 導入事例");
      for (const c of cases) {
        lines.push(`- [${c.title}](${u(`/cases/${c.slug}`)}): ${c.summary}`);
      }
      lines.push("");
    }
  } catch {
    // CMS未接続時は事例セクションを省略
  }

  lines.push("## 会社情報");
  lines.push(`- [運営会社（${ORGANIZATION.legalName}）](${ORGANIZATION.url})`);
  lines.push(`- [プライバシーポリシー](${u("/privacy")})`);
  lines.push(`- [特定商取引法に基づく表記](${u("/commercial")})`);
  lines.push("");

  const body = lines.join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
