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
        title: fields.text({
          label: "タイトル",
          validation: { isRequired: true },
        }),
        slug: fields.text({
          label: "スラッグ",
          validation: { isRequired: true },
        }),
        draft: fields.checkbox({
          label: "下書き (非公開)",
          description: "オンにすると公開ページには表示されません。",
          defaultValue: false,
        }),
        cardOnly: fields.checkbox({
          label: "カード表示のみ (詳細は Coming soon)",
          description:
            "オンにすると一覧には Coming soon タグ付きのカードで表示され、詳細ページは Coming soon 表示になります。",
          defaultValue: false,
        }),
        category: fields.text({
          label: "カテゴリ",
          validation: { isRequired: true },
        }),
        summary: fields.text({
          label: "概要",
          multiline: true,
          validation: { isRequired: true },
        }),
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
        result: fields.text({
          label: "導入成果",
          multiline: true,
          validation: { isRequired: true },
        }),
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
        industry: fields.text({
          label: "業種キー",
          validation: { isRequired: true },
        }),
        title: fields.text({
          label: "タイトル",
          validation: { isRequired: true },
        }),
        cardOnly: fields.checkbox({
          label: "カード表示のみ (詳細は Coming soon)",
          description:
            "オンにすると一覧には Coming soon タグ付きのカードで表示され、詳細ページは Coming soon 表示になります。",
          defaultValue: false,
        }),
        description: fields.text({
          label: "説明",
          multiline: true,
          validation: { isRequired: true },
        }),
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
        slug: fields.text({
          label: "スラッグ",
          validation: { isRequired: true },
        }),
        title: fields.text({
          label: "タイトル",
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: "説明",
          multiline: true,
          validation: { isRequired: true },
        }),
        iconKey: fields.text({ label: "アイコンキー" }),
        order: fields.integer({ label: "表示順", defaultValue: 99 }),
      },
    }),

    legal: collection({
      label: "規約・法務ページ",
      slugField: "slug",
      path: "content/legal/*",
      format: { contentField: "body" },
      schema: {
        slug: fields.text({
          label: "スラッグ (URL)",
          description: "commercial = 特定商取引法, privacy = プライバシーポリシー",
          validation: { isRequired: true },
        }),
        title: fields.text({ label: "タイトル", validation: { isRequired: true } }),
        effectiveDate: fields.text({
          label: "制定日・最終更新日 (任意・本文末尾に表示)",
          multiline: true,
        }),
        body: fields.markdoc({ label: "本文" }),
      },
    }),

    helpArticles: collection({
      label: "ヘルプ記事",
      slugField: "slug",
      path: "content/help-articles/*",
      format: { contentField: "body" },
      schema: {
        slug: fields.text({
          label: "スラッグ",
          validation: { isRequired: true },
        }),
        title: fields.text({
          label: "タイトル",
          validation: { isRequired: true },
        }),
        summary: fields.text({
          label: "概要",
          multiline: true,
          validation: { isRequired: true },
        }),
        categorySlug: fields.text({
          label: "カテゴリスラッグ",
          validation: { isRequired: true },
        }),
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
    contact: singleton({
      label: "お問い合わせ / 予約リンク",
      path: "content/contact",
      format: { data: "json" },
      schema: {
        signupUrl: fields.text({
          label: "2週間無料トライアル リンク先URL",
          description:
            "「2週間無料」系ボタンの遷移先。外部URL（https〜）の場合は自動で別タブで開きます。空欄の場合は環境変数 / 既定値を使用します。",
        }),
        spirGeneral: fields.text({
          label: "一般のご相談 予約リンクURL",
          description:
            "「オンラインで相談」など一般相談ボタンの遷移先。外部URLは別タブで開きます。",
        }),
        spirOfficial: fields.text({
          label: "オフィシャル制作 予約リンクURL",
          description:
            "オフィシャル制作相談ボタンの遷移先。外部URLは別タブで開きます。",
        }),
        spirThreeHour: fields.text({
          label: "3hパック 予約リンクURL",
          description:
            "3hパック予約・相談ボタンの遷移先。外部URLは別タブで開きます。",
        }),
        spirFull: fields.text({
          label: "エムスタFull 予約リンクURL",
          description:
            "エムスタFull相談ボタンの遷移先。外部URLは別タブで開きます。",
        }),
        spirPartner: fields.text({
          label: "パートナー制度 予約リンクURL",
          description:
            "パートナー相談ボタンの遷移先。外部URLは別タブで開きます。",
        }),
        generalCalendarEmbed: fields.text({
          label: "一般相談カレンダー Spir埋込コード",
          description:
            "Spirで発行した埋め込みコード（<iframe ...></iframe> 形式）をそのまま貼り付けてください。空欄の場合は「一般のご相談 予約リンクURL」からの簡易表示にフォールバックします。",
          multiline: true,
        }),
      },
    }),

    faq: singleton({
      label: "よくある質問",
      path: "content/faq",
      format: { data: "json" },
      schema: {
        categories: fields.array(
          fields.object({
            id: fields.text({
              label: "カテゴリID",
              validation: { isRequired: true },
            }),
            label: fields.text({
              label: "カテゴリ名",
              validation: { isRequired: true },
            }),
            items: fields.array(
              fields.object({
                id: fields.text({
                  label: "質問ID",
                  validation: { isRequired: true },
                }),
                question: fields.text({
                  label: "質問",
                  validation: { isRequired: true },
                }),
                answer: fields.text({
                  label: "回答",
                  multiline: true,
                  validation: { isRequired: true },
                }),
              }),
              {
                label: "質問一覧",
                itemLabel: (props) => props.fields.question.value,
              },
            ),
          }),
          { label: "カテゴリ", itemLabel: (props) => props.fields.label.value },
        ),
      },
    }),
  },
});
