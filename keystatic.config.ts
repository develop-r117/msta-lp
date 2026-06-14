import { config, fields, collection, singleton } from "@keystatic/core";

const useGitHub =
  process.env.NODE_ENV !== "development" &&
  !!process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
  !!process.env.KEYSTATIC_SECRET;

export default config({
  storage: useGitHub
    ? {
        kind: "github",
        repo: {
          owner: process.env.KEYSTATIC_GITHUB_REPO_OWNER ?? "your-org",
          name: process.env.KEYSTATIC_GITHUB_REPO_NAME ?? "msta-lp",
        },
      }
    : { kind: "local" },

  collections: {
    cases: collection({
      label: "導入事例",
      slugField: "slug",
      path: "content/cases/*",
      format: { contentField: "body" },
      schema: {
        title: fields.text({ label: "タイトル", validation: { isRequired: true } }),
        slug: fields.text({ label: "スラッグ", validation: { isRequired: true } }),
        category: fields.text({ label: "カテゴリ", validation: { isRequired: true } }),
        summary: fields.text({ label: "概要", multiline: true, validation: { isRequired: true } }),
        intro: fields.text({ label: "リード文（詳細冒頭）", multiline: true }),
        cover: fields.image({
          label: "カバー画像",
          directory: "public/screenshots",
          publicPath: "/screenshots",
        }),
        activeFeatures: fields.array(fields.text({ label: "機能名" }), {
          label: "利用機能",
          itemLabel: (props) => props.value,
        }),
        result: fields.text({ label: "導入成果", multiline: true, validation: { isRequired: true } }),
        customerVoice: fields.text({ label: "お客様の声", multiline: true }),
        body: fields.markdoc({ label: "本文" }),
      },
    }),

    usecases: collection({
      label: "ユースケース",
      slugField: "industry",
      path: "content/usecases/*",
      format: { contentField: "body" },
      schema: {
        industry: fields.text({ label: "業種キー", validation: { isRequired: true } }),
        title: fields.text({ label: "タイトル", validation: { isRequired: true } }),
        description: fields.text({ label: "説明", multiline: true, validation: { isRequired: true } }),
        scenarios: fields.array(fields.text({ label: "シナリオ" }), {
          label: "活用シナリオ",
          itemLabel: (props) => props.value,
        }),
        activeFeatures: fields.array(fields.text({ label: "機能名" }), {
          label: "利用機能",
          itemLabel: (props) => props.value,
        }),
        cover: fields.image({
          label: "カバー画像",
          directory: "public/screenshots",
          publicPath: "/screenshots",
        }),
        body: fields.markdoc({ label: "本文" }),
      },
    }),

    helpCategories: collection({
      label: "ヘルプカテゴリ",
      slugField: "slug",
      path: "content/help-categories/*",
      format: { data: "json" },
      schema: {
        slug: fields.text({ label: "スラッグ", validation: { isRequired: true } }),
        title: fields.text({ label: "タイトル", validation: { isRequired: true } }),
        description: fields.text({ label: "説明", multiline: true, validation: { isRequired: true } }),
        iconKey: fields.text({ label: "アイコンキー" }),
        order: fields.integer({ label: "表示順", defaultValue: 99 }),
      },
    }),

    helpArticles: collection({
      label: "ヘルプ記事",
      slugField: "slug",
      path: "content/help-articles/*",
      format: { contentField: "body" },
      schema: {
        slug: fields.text({ label: "スラッグ", validation: { isRequired: true } }),
        title: fields.text({ label: "タイトル", validation: { isRequired: true } }),
        summary: fields.text({ label: "概要", multiline: true, validation: { isRequired: true } }),
        categorySlug: fields.text({ label: "カテゴリスラッグ", validation: { isRequired: true } }),
        tags: fields.array(fields.text({ label: "タグ" }), {
          label: "タグ",
          itemLabel: (props) => props.value,
        }),
        relatedArticleSlugs: fields.array(fields.text({ label: "スラッグ" }), {
          label: "関連記事スラッグ",
          itemLabel: (props) => props.value,
        }),
        body: fields.markdoc({ label: "本文" }),
      },
    }),
  },

  singletons: {
    faq: singleton({
      label: "よくある質問",
      path: "content/faq",
      format: { data: "json" },
      schema: {
        categories: fields.array(
          fields.object({
            id: fields.text({ label: "カテゴリID", validation: { isRequired: true } }),
            label: fields.text({ label: "カテゴリ名", validation: { isRequired: true } }),
            items: fields.array(
              fields.object({
                id: fields.text({ label: "質問ID", validation: { isRequired: true } }),
                question: fields.text({ label: "質問", validation: { isRequired: true } }),
                answer: fields.text({ label: "回答", multiline: true, validation: { isRequired: true } }),
              }),
              { label: "質問一覧", itemLabel: (props) => props.fields.question.value },
            ),
          }),
          { label: "カテゴリ", itemLabel: (props) => props.fields.label.value },
        ),
      },
    }),
  },
});
