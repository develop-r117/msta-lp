import { z } from "zod";

const serverEnvSchema = z.object({
  RESEND_API_KEY: z.string().optional(),
  RESEND_FROM: z.string().optional(),
  PARTNER_DOC_URL: z.string().url().optional(),
  NOTIFY_TO: z.string().email().optional(),
});

/**
 * Resend関連の環境変数を取り出す。未設定時はAPIルート側で適切にfallbackする。
 */
export function getServerEnv() {
  return serverEnvSchema.parse({
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM: process.env.RESEND_FROM,
    PARTNER_DOC_URL: process.env.PARTNER_DOC_URL,
    NOTIFY_TO: process.env.NOTIFY_TO,
  });
}
