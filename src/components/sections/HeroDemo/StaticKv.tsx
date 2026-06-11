"use client";

import KvMedia from "@/components/ui/KvMedia";
import { INITIAL_STATE } from "./scenario";
import { AiPanel, BrowserChrome, CmsPanel, ModePill } from "./panels";
import PhoneMock from "./PhoneMock";

/**
 * reduced-motion 時の静的フォールバック。
 * 従来の静止画コンポジション（スクショ + フローティングパネル + スマホモック）を表示する。
 */
export default function StaticKv() {
  return (
    <div className="relative">
      <BrowserChrome>
        <div className="relative aspect-[16/10] w-full bg-neutral-100">
          <KvMedia
            image="/screenshots/2.png"
            alt="エムスタ 管理ダッシュボード / エディタ画面"
            className="absolute inset-0 h-full w-full object-cover"
            imageClassName="object-cover"
            sizes="(max-width: 1024px) 90vw, 50vw"
            priority
          />
        </div>
      </BrowserChrome>

      <ModePill />
      <AiPanel />
      <CmsPanel />

      <div className="absolute -bottom-10 -right-1 hidden w-[36%] max-w-[180px] sm:block lg:-bottom-12">
        <PhoneMock state={INITIAL_STATE} />
      </div>
    </div>
  );
}
