import { Resend } from "resend";
import { getServerEnv } from "./env";

let cached: Resend | null = null;

export function getResend(): Resend | null {
  const env = getServerEnv();
  if (!env.RESEND_API_KEY) return null;
  if (cached) return cached;
  cached = new Resend(env.RESEND_API_KEY);
  return cached;
}
