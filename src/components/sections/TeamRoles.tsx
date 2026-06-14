"use client";

import SectionHeading from "@/components/ui/SectionHeading";

type Permission = "管" | "編" | "投" | "閲" | "外";
type Row = {
  feature: string;
  values: Record<Permission, boolean>;
};

const headers: { key: Permission; label: string; color: string }[] = [
  { key: "管", label: "管理者", color: "bg-primary-600" },
  { key: "編", label: "編集者", color: "bg-primary-500" },
  { key: "投", label: "投稿者", color: "bg-accent-500" },
  { key: "閲", label: "閲覧者", color: "bg-neutral-700" },
  { key: "外", label: "外部パートナー", color: "bg-neutral-500" },
];

const rows: Row[] = [
  {
    feature: "アカウント全体管理",
    values: { 管: true, 編: false, 投: false, 閲: false, 外: false },
  },
  {
    feature: "アプリの追加 / 削除",
    values: { 管: true, 編: false, 投: false, 閲: false, 外: false },
  },
  {
    feature: "画面構成・機能追加",
    values: { 管: true, 編: true, 投: false, 閲: false, 外: false },
  },
  {
    feature: "投稿・コンテンツ更新",
    values: { 管: true, 編: true, 投: true, 閲: false, 外: false },
  },
  {
    feature: "プッシュ通知配信",
    values: { 管: true, 編: true, 投: true, 閲: false, 外: false },
  },
  {
    feature: "ダッシュボード閲覧",
    values: { 管: true, 編: true, 投: true, 閲: true, 外: false },
  },
  {
    feature: "外部パートナー権限付与",
    values: { 管: true, 編: false, 投: false, 閲: false, 外: true },
  },
];

export default function TeamRoles() {
  return (
    <section id="team" className="section-padding relative bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Team & roles"
          title={
            <>
              チームでも、組織でも、
              <span className="text-gradient">安全に運用</span>できる。
            </>
          }
          description="役割に応じて権限を分けられるため、セキュリティを担保しながら運用できます。アカウント内に複数のアプリを作成でき、アプリごとに権限を付与することも可能です。"
        />

        <div className="mt-12 overflow-x-auto rounded-3xl border border-neutral-200 bg-white shadow-sm">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="bg-neutral-50">
                <th className="sticky left-0 z-10 w-1/3 border-b border-neutral-200 bg-neutral-50 px-5 py-4 text-left text-xs font-bold uppercase tracking-widest text-neutral-700">
                  権限ロール
                </th>
                {headers.map((h) => (
                  <th
                    key={h.key}
                    className="border-b border-neutral-200 px-3 py-4 text-center"
                  >
                    <div className="flex flex-col items-center gap-1.5">
                      <span
                        className={`grid h-7 w-7 place-items-center rounded-full ${h.color} text-[10px] font-bold text-white`}
                      >
                        {h.key}
                      </span>
                      <span className="text-[11px] font-semibold text-neutral-700">
                        {h.label}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.feature} className="border-t border-neutral-100">
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-white px-5 py-4 text-left text-sm font-semibold text-neutral-900"
                  >
                    {r.feature}
                  </th>
                  {headers.map((h) => (
                    <td key={h.key} className="px-3 py-4 text-center">
                      {r.values[h.key] ? (
                        <span className="grid h-6 w-6 place-items-center rounded-full bg-primary-100 text-primary-700 ring-1 ring-primary-200 mx-auto">
                          <svg
                            className="h-3.5 w-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </span>
                      ) : (
                        <span className="inline-block h-1.5 w-3 rounded-full bg-neutral-200" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-xs text-neutral-500">
          ※ 表は代表的な例です。アプリごと /
          機能ごとに、実際の権限はより細かく設定可能です。
        </p>
      </div>
    </section>
  );
}
