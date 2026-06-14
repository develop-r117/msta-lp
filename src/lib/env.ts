import { z } from "zod";

const serverEnvSchema = z.object({
  SENDGRID_API_KEY: z.string().optional(),
  SENDGRID_FROM: z.string().optional(),
  PARTNER_DOC_URL: z.string().url().optional(),
  NOTIFY_TO: z.string().email().optional(),
});

/**
 * SendGrid関連の環境変数を取り出す。未設定時はAPIルート側で適切にfallbackする。
 */
export function getServerEnv() {
  return serverEnvSchema.parse({
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    SENDGRID_FROM: process.env.SENDGRID_FROM,
    PARTNER_DOC_URL: process.env.PARTNER_DOC_URL,
    NOTIFY_TO: process.env.NOTIFY_TO,
  });
}
