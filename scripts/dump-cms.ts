/**
 * Keystatic の content/ を JSON にダンプして src/data/cms.generated.json に書き出す。
 *
 * Cloudflare Pages (next-on-pages / edge runtime) では Keystatic reader
 * (fs/promises 依存) や generateStaticParams + edge を併用できないため、
 * ビルド前に静的データを生成し、各動的ページは edge runtime + 同期 import で取得する。
 *
 * Keystatic v0.5.50 の reader は `format: { contentField }` を使うコレクションを
 * 安定して読めないケースがあるため、`.mdoc` ファイルは自前で fs + yaml で parse し、
 * 本文は @markdoc/markdoc で HTML に render する。
 */
import Markdoc from "@markdoc/markdoc";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { parse as parseYaml } from "yaml";
import type {
  CaseEntry,
  UsecaseEntry,
  HelpCategory,
  HelpArticle,
  FAQCategory,
  ContactSettings,
} from "../src/lib/content-types";

type Frontmatter = Record<string, unknown>;

function listDirNames(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

function readMdoc(filepath: string): { data: Frontmatter; body: string } | null {
  if (!existsSync(filepath)) return null;
  const raw = readFileSync(filepath, "utf-8");
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    return { data: {}, body: raw.trim() };
  }
  const [, frontmatter, body] = match;
  const data = (parseYaml(frontmatter) as Frontmatter) ?? {};
  return { data, body: body.trim() };
}

function readJson<T>(filepath: string): T | null {
  if (!existsSync(filepath)) return null;
  return JSON.parse(readFileSync(filepath, "utf-8")) as T;
}

function renderMdocBody(body: string): string | undefined {
  if (!body) return undefined;
  const ast = Markdoc.parse(body);
  const transformed = Markdoc.transform(ast);
  return Markdoc.renderers.html(transformed);
}

function asString(v: unknown, fallback = ""): string {
  return typeof v === "string" ? v : fallback;
}

function asStringArray(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
}

function asNumber(v: unknown, fallback = 0): number {
  return typeof v === "number" ? v : fallback;
}

function dumpCases(): CaseEntry[] {
  const dir = "content/cases";
  const out: CaseEntry[] = [];
  for (const dirSlug of listDirNames(dir)) {
    const parsed = readMdoc(join(dir, dirSlug, "index.mdoc"));
    if (!parsed) continue;
    const { data, body } = parsed;
    const cover = asString(data.cover);
    out.push({
      id: dirSlug,
      slug: asString(data.slug, dirSlug),
      title: asString(data.title),
      category: asString(data.category),
      summary: asString(data.summary),
      intro: asString(data.intro) || undefined,
      cover: cover ? { url: cover } : undefined,
      activeFeatures: asStringArray(data.activeFeatures),
      result: asString(data.result),
      customerVoice: asString(data.customerVoice) || undefined,
      body: renderMdocBody(body),
      bodySource: body || undefined,
    });
  }
  return out;
}

function dumpUsecases(): UsecaseEntry[] {
  const dir = "content/usecases";
  const out: UsecaseEntry[] = [];
  for (const dirSlug of listDirNames(dir)) {
    const parsed = readMdoc(join(dir, dirSlug, "index.mdoc"));
    if (!parsed) continue;
    const { data, body } = parsed;
    const cover = asString(data.cover);
    out.push({
      id: dirSlug,
      industry: asString(data.industry, dirSlug),
      title: asString(data.title),
      description: asString(data.description),
      scenarios: asStringArray(data.scenarios),
      activeFeatures: asStringArray(data.activeFeatures),
      cover: cover ? { url: cover } : undefined,
      body: renderMdocBody(body),
      bodySource: body || undefined,
    });
  }
  return out;
}

function dumpHelpCategories(): HelpCategory[] {
  const dir = "content/help-categories";
  if (!existsSync(dir)) return [];
  const out: HelpCategory[] = [];
  for (const name of readdirSync(dir)) {
    if (!name.endsWith(".json")) continue;
    const data = readJson<Frontmatter>(join(dir, name));
    if (!data) continue;
    const id = name.replace(/\.json$/, "");
    out.push({
      id,
      slug: asString(data.slug, id),
      title: asString(data.title),
      description: asString(data.description),
      iconKey: asString(data.iconKey) || undefined,
      order: asNumber(data.order, 99),
    });
  }
  return out.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

function dumpHelpArticles(categories: HelpCategory[]): HelpArticle[] {
  const dir = "content/help-articles";
  const catMap = new Map(categories.map((c) => [c.slug, c.title]));
  const out: HelpArticle[] = [];
  for (const dirSlug of listDirNames(dir)) {
    const parsed = readMdoc(join(dir, dirSlug, "index.mdoc"));
    if (!parsed) continue;
    const { data, body } = parsed;
    const catSlug = asString(data.categorySlug);
    out.push({
      id: dirSlug,
      slug: asString(data.slug, dirSlug),
      title: asString(data.title),
      summary: asString(data.summary),
      category: {
        slug: catSlug,
        title: catMap.get(catSlug) ?? catSlug,
      },
      body: renderMdocBody(body),
      bodySource: body || undefined,
      tags: asStringArray(data.tags),
      relatedArticles: asStringArray(data.relatedArticleSlugs).map((s) => ({
        slug: s,
        title: s,
      })),
    });
  }
  return out;
}

function dumpFAQ(): FAQCategory[] {
  const data = readJson<{ categories?: Array<Record<string, unknown>> }>(
    "content/faq.json",
  );
  if (!data) return [];
  return (data.categories ?? []).map((cat) => ({
    id: asString(cat.id),
    label: asString(cat.label),
    items: (cat.items as Array<Record<string, unknown>> | undefined ?? []).map(
      (item) => ({
        id: asString(item.id),
        question: asString(item.question),
        answer: asString(item.answer),
      }),
    ),
  }));
}

function dumpContact(): ContactSettings {
  const data = readJson<Frontmatter>("content/contact.json") ?? {};
  return {
    signupUrl: asString(data.signupUrl),
    spirGeneral: asString(data.spirGeneral),
    spirOfficial: asString(data.spirOfficial),
    spirThreeHour: asString(data.spirThreeHour),
    spirFull: asString(data.spirFull),
    spirPartner: asString(data.spirPartner),
    generalCalendarEmbed: asString(data.generalCalendarEmbed),
  };
}

function main() {
  const cases = dumpCases();
  const usecases = dumpUsecases();
  const helpCategories = dumpHelpCategories();
  const helpArticles = dumpHelpArticles(helpCategories);
  const faqCategories = dumpFAQ();
  const contact = dumpContact();

  const out = {
    generatedAt: new Date().toISOString(),
    cases,
    usecases,
    helpCategories,
    helpArticles,
    faqCategories,
  };

  const outPath = "src/data/cms.generated.json";
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, JSON.stringify(out, null, 2));

  // CTAリンク等はクライアントコンポーネントからも参照するため、
  // 巨大な cms.generated.json とは分け、軽量な専用ファイルに書き出す。
  const contactPath = "src/data/contact.generated.json";
  writeFileSync(contactPath, JSON.stringify(contact, null, 2));

  console.log(
    `✓ CMS dumped: ${cases.length} cases, ${usecases.length} usecases, ${helpCategories.length} help categories, ${helpArticles.length} help articles, ${faqCategories.length} FAQ groups → ${outPath}`,
  );
  console.log(`✓ Contact settings dumped → ${contactPath}`);
}

try {
  main();
} catch (err) {
  console.error("CMS dump failed:", err);
  process.exit(1);
}
