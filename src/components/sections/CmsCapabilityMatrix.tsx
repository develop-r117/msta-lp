import SectionHeading from "@/components/ui/SectionHeading";

type Row = {
  topic: string;
  description: string;
  appOnly: string;
  msta: string;
};

const rows: Row[] = [
  {
    topic: "情報更新",
    description: "ストアの審査を待たずに、即日反映できるか",
    appOnly: "コード修正→ビルド→ストア審査が必要",
    msta: "管理画面から即時反映（ノーコード）",
  },
  {
    topic: "プッシュ通知",
    description: "セグメント・予約・誕生日プッシュへの対応",
    appOnly: "外部SaaSやSDKを別契約で組み込み",
    msta: "標準搭載 / 即時 + 予約 + 誕生日",
  },
  {
    topic: "会員管理",
    description: "登録フロー・規約・ログイン後コンテンツの設定",
    appOnly: "認証基盤を自前実装、運用は工数大",
    msta: "管理画面で会員登録〜ログイン後制御まで一元化",
  },
  {
    topic: "データ収集",
    description: "アンケート・問い合わせ・チャットでの声集め",
    appOnly: "別ツール導入と画面遷移が増える",
    msta: "アンケート / 問い合わせ / チャットを統合",
  },
  {
    topic: "運用コスト",
    description: "更新時の総工数（社内 + 外注）",
    appOnly: "毎回ベンダー依頼で時間と費用がかかる",
    msta: "運用コストを大幅圧縮（標準で実施可能）",
  },
  {
    topic: "社内権限",
    description: "管理画面の権限分離・複数アカウント運用",
    appOnly: "アカウント設計が後回しになりがち",
    msta: "管理アカウント / 権限・複数アプリ管理に対応",
  },
];

export default function CmsCapabilityMatrix() {
  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Capability comparison"
          title={<>「アプリだけ」と<span className="text-gradient">「エムスタCMS同梱」</span>の違い。</>}
          description="リリース後の運用にどれだけ違いが出るのか。代表的な6つの観点で比較しました。"
        />

        <div className="mt-10 overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-neutral-900 text-xs font-bold uppercase tracking-widest text-white">
                <th scope="col" className="px-4 py-4 md:px-6">観点</th>
                <th scope="col" className="px-4 py-4 md:px-6">アプリだけ</th>
                <th scope="col" className="px-4 py-4 md:px-6">
                  <span className="inline-flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-accent-400" />
                    エムスタCMS同梱
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={r.topic}
                  className={i % 2 === 0 ? "bg-white" : "bg-neutral-50"}
                >
                  <th scope="row" className="px-4 py-4 align-top text-xs font-bold text-neutral-900 md:px-6 md:text-sm">
                    {r.topic}
                    <p className="mt-1 text-[11px] font-normal text-neutral-500">{r.description}</p>
                  </th>
                  <td className="px-4 py-4 align-top text-xs leading-relaxed text-neutral-600 md:px-6 md:text-sm">
                    {r.appOnly}
                  </td>
                  <td className="px-4 py-4 align-top text-xs leading-relaxed text-neutral-800 md:px-6 md:text-sm">
                    <span className="inline-flex items-start gap-2">
                      <span className="mt-0.5 inline-grid h-4 w-4 shrink-0 place-items-center rounded-full bg-primary-500 text-white">
                        <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      {r.msta}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
