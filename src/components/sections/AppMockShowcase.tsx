import Image from "next/image";

/**
 * 「こんなアプリが作れる」SPモック陳列。
 *
 * KVから外したスマホモック表現をユースケース／完成イメージ訴求としてここに集約する。
 * 実アプリモック素材が未到着のため、当面は業種ラベル付きのスマホ枠プレースホルダを表示し、
 * 素材が用意でき次第 `screenshot` に画像パスを渡すだけで差し替えられる。
 */
type AppMock = {
  industry: string;
  label: string;
  accent: string;
  /** 完成アプリのSPスクショ（任意）。未指定時はプレースホルダ表示 */
  screenshot?: string;
};

const MOCKS: AppMock[] = [
  {
    industry: "店舗",
    label: "店舗アプリ",
    accent: "from-primary-400 to-primary-600",
  },
  {
    industry: "スクール / 教育",
    label: "教育アプリ",
    accent: "from-accent-400 to-accent-600",
  },
  {
    industry: "会員制サービス",
    label: "会員アプリ",
    accent: "from-emerald-400 to-emerald-600",
  },
  {
    industry: "コミュニティ",
    label: "コミュニティアプリ",
    accent: "from-violet-400 to-violet-600",
  },
  { industry: "予約", label: "予約アプリ", accent: "from-sky-400 to-sky-600" },
  {
    industry: "業界特化",
    label: "業界特化アプリ",
    accent: "from-rose-400 to-rose-600",
  },
];

function PhoneMock({ mock }: { mock: AppMock }) {
  return (
    <div className="flex shrink-0 flex-col items-center gap-3">
      <div className="relative w-[150px] rounded-[1.8rem] bg-neutral-900 p-1.5 shadow-xl sm:w-[168px]">
        {/* ノッチ */}
        <div className="absolute left-1/2 top-2 z-10 h-1.5 w-12 -translate-x-1/2 rounded-full bg-neutral-700" />
        <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[1.4rem] bg-white">
          {mock.screenshot ? (
            <Image
              src={mock.screenshot}
              alt={`${mock.label} の完成イメージ`}
              fill
              className="object-cover"
              sizes="168px"
            />
          ) : (
            // プレースホルダ（素材到着までの完成イメージ枠）
            <div className="flex h-full flex-col">
              <div
                className={`bg-gradient-to-br ${mock.accent} px-3 pb-6 pt-7`}
              >
                <div className="h-2.5 w-1/2 rounded-full bg-white/70" />
                <div className="mt-2 h-2 w-2/3 rounded-full bg-white/40" />
              </div>
              <div className="flex-1 space-y-2.5 p-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="aspect-square rounded-lg bg-neutral-100" />
                  <div className="aspect-square rounded-lg bg-neutral-100" />
                </div>
                <div className="h-2 w-3/4 rounded-full bg-neutral-200" />
                <div className="h-2 w-1/2 rounded-full bg-neutral-200" />
                <div className="h-8 rounded-xl bg-neutral-100" />
              </div>
              <div className="flex items-center justify-around border-t border-neutral-100 px-2 py-2.5">
                <span className="h-4 w-4 rounded bg-neutral-200" />
                <span className="h-4 w-4 rounded bg-neutral-200" />
                <span className="h-4 w-4 rounded bg-neutral-200" />
                <span className="h-4 w-4 rounded bg-neutral-200" />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-bold text-neutral-900">{mock.label}</p>
        <p className="text-[11px] text-neutral-500">{mock.industry}</p>
      </div>
    </div>
  );
}

export default function AppMockShowcase() {
  return (
    <section className="section-padding bg-section-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-primary-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-700">
            Apps you can build
          </span>
          <h2 className="mt-4 text-3xl font-bold leading-normal tracking-tight text-neutral-900 sm:text-4xl">
            こんな<span className="text-gradient">アプリが作れる</span>。
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
            エムスタは業種を選ばず、目的に合わせて自由に組み立てられます。実際に作れるアプリの完成イメージをご覧ください。
          </p>
        </div>

        {/* 横スクロール可能なスマホモック列 */}
        <div className="mt-12 -mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
          <div className="flex min-w-max justify-start gap-6 sm:justify-center sm:gap-8">
            {MOCKS.map((mock) => (
              <PhoneMock key={mock.industry} mock={mock} />
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-neutral-400">
          ※ 表示はイメージです。実際のアプリ画面は順次掲載予定です。
        </p>
      </div>
    </section>
  );
}
