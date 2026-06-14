import { z } from "zod";

// 値の有無のみを検証する。URL/メール形式の厳密チェックはここでは行わない。
// (運用者が設定する値に多少の不備があっても、APIルート全体をクラッシュさせず
//  既定値へフォールバックさせるため。形式不正は送信時にSendGrid側で検知される)
const serverEnvSchema = z.object({
  SENDGRID_API_KEY: z.string().optional(),
  SENDGRID_FROM: z.string().optional(),
  PARTNER_DOC_URL: z.string().optional(),
  NOTIFY_TO: z.string().optional(),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

/** 空文字・空白のみは undefined として扱う */
function clean(v: string | undefined): string | undefined {
  if (typeof v !== "string") return undefined;
  const t = v.trim();
  return t.length > 0 ? t : undefined;
}

/**
 * SendGrid関連の環境変数を取り出す。
 * 例外を投げない（safeParse + フォールバック）。未設定/不正時はAPIルート側で既定値を使う。
 */
export function getServerEnv(): ServerEnv {
  const raw = {
    SENDGRID_API_KEY: clean(process.env.SENDGRID_API_KEY),
    SENDGRID_FROM: clean(process.env.SENDGRID_FROM),
    PARTNER_DOC_URL: clean(process.env.PARTNER_DOC_URL),
    NOTIFY_TO: clean(process.env.NOTIFY_TO),
  };
  const result = serverEnvSchema.safeParse(raw);
  return result.success ? result.data : raw;
}
