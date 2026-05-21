/**
 * FAQ用のカテゴリ定義。
 * クライアントコンポーネント / サーバーコンポーネント両方から参照されるため、
 * `use client`境界を持たない通常の TS モジュールとして提供する。
 */

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

export type FAQCategory = {
  id: string;
  label: string;
  items: FAQItem[];
};

export const FAQ_CATEGORIES: FAQCategory[] = [
  {
    id: "general",
    label: "プロダクト全般",
    items: [
      {
        id: "no-code",
        question: "プログラミングができなくても使えますか?",
        answer:
          "はい。かんたんモードでは専門知識がなくてもアプリ制作・運用ができる設計を目指しています。プロモードでは、自由度を高めた編集も可能です。",
      },
      {
        id: "platforms",
        question: "iOS / Androidの両方に対応できますか?",
        answer:
          "はい。Webアプリ、iOS、Androidに対応可能です。デスクトップファーストの設定にも対応していきます。",
      },
      {
        id: "modes-diff",
        question: "かんたんモードとプロモードの違いは?",
        answer:
          "かんたんモードはノーコードでの制作に特化したモード、プロモードはより自由度の高い編集・コード差し込み・テンプレート制作に対応するモードです。アカウント単位で切り替えできます。",
      },
    ],
  },
  {
    id: "publish",
    label: "公開・運用",
    items: [
      {
        id: "publish",
        question: "公開にはデベロッパー登録が必要ですか?",
        answer:
          "ネイティブアプリの公開には、Apple Developer / Google Play Consoleの登録が必要です。登録代行を含むサポートメニューもご用意しています。",
      },
      {
        id: "operation",
        question: "リリース後の運用は誰が行うのですか?",
        answer:
          "管理ダッシュボード(CMS)でお客様自身による運用が可能です。継続的な運用支援が必要な場合は、オフィシャル制作・エムスタFullでも承ります。",
      },
      {
        id: "team-roles",
        question: "チームで運用できますか?",
        answer:
          "はい。管理者・編集者・投稿者・閲覧者・外部パートナーなど、複数の権限ロールに対応しています。アプリごとに権限を分けることも可能です。",
      },
    ],
  },
  {
    id: "pricing",
    label: "料金",
    items: [
      {
        id: "trial",
        question: "無料トライアルはありますか?",
        answer: "はい。登録から2週間、無料でご利用いただけます。クレジットカード登録は不要です。",
      },
      {
        id: "fee",
        question: "料金はどのように発生しますか?",
        answer:
          "アカウント基本利用料(月額3,000円)に加え、Webアプリ公開(2,000円/URL)、iOS / Android公開(各5,000円/月)が加算されます。詳細は料金ページをご覧ください。",
      },
      {
        id: "extra",
        question: "オフィシャル制作・3hパックの料金は?",
        answer:
          "オフィシャル制作は¥100,000〜、3hパックはローンチ記念半額の¥35,000(通常¥70,000)です。エムスタFullは要件に応じて個別お見積りです。",
      },
    ],
  },
  {
    id: "production",
    label: "制作・サポート",
    items: [
      {
        id: "production",
        question: "制作を依頼できますか?",
        answer:
          "はい。オフィシャル制作、3hパック(ローンチ記念半額)、エムスタFull(スクラッチ受託)の3パターンをご用意しています。",
      },
      {
        id: "custom",
        question: "独自機能の開発はできますか?",
        answer:
          "はい。エムスタFullにて個別要件に対応可能です。要件の規模感に応じて個別にお見積りします。",
      },
      {
        id: "ai",
        question: "AIによる制作支援はありますか?",
        answer:
          "エムスタではAIによる制作・運用支援機能を順次搭載していきます。完全自動化ではなく、現場の工数削減を支援する現実的な活用を提案します。",
      },
    ],
  },
  {
    id: "partner",
    label: "パートナー制度",
    items: [
      {
        id: "agency",
        question: "代理店・制作会社として利用できますか?",
        answer:
          "はい。レベニューシェア型のパートナー制度をご用意しています。Bronze(15%)からLegend(35%)までのランク構成です。詳細はパートナー資料をご確認ください。",
      },
      {
        id: "template-sales",
        question: "テンプレートやコンポーネントを販売できますか?",
        answer:
          "はい。マーケットプレイス構想のもと、テンプレート・コンポーネントの販売を予定しています。クリエイターパートナー向けの仕組みも提供します。",
      },
    ],
  },
];
