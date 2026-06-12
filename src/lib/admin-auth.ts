/**
 * /admin 用の軽量セッション認証 (edge runtime / Web Crypto)。
 *
 * - パスワードは Cloudflare Pages の環境変数 ADMIN_PASSWORD に設定する。
 * - ログイン成功時に `${有効期限}.${HMAC署名}` 形式のトークンを
 *   HttpOnly Cookie として発行し、各 API でリクエストごとに検証する。
 */
import { getRequestContext } from "@cloudflare/next-on-pages";

export const ADMIN_COOKIE = "msta_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7日

export function getAdminPassword(): string | null {
  try {
    const env = getRequestContext().env as { ADMIN_PASSWORD?: string };
    if (env.ADMIN_PASSWORD) return env.ADMIN_PASSWORD;
  } catch {
    // next dev など Cloudflare 外
  }
  return process.env.ADMIN_PASSWORD ?? null;
}

async function hmacHex(message: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function createSessionToken(secret: string): Promise<string> {
  const exp = Date.now() + SESSION_TTL_MS;
  const sig = await hmacHex(String(exp), secret);
  return `${exp}.${sig}`;
}

export async function verifySessionToken(
  token: string | undefined,
  secret: string,
): Promise<boolean> {
  if (!token) return false;
  const [expStr, sig] = token.split(".");
  if (!expStr || !sig) return false;
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Date.now()) return false;
  const expected = await hmacHex(expStr, secret);
  return sig === expected;
}

function readCookie(req: Request, name: string): string | undefined {
  const header = req.headers.get("cookie") ?? "";
  for (const part of header.split(";")) {
    const [k, ...rest] = part.trim().split("=");
    if (k === name) return rest.join("=");
  }
  return undefined;
}

/** リクエストが認証済みかを検証する。未設定/未認証なら false。 */
export async function isAuthorized(req: Request): Promise<boolean> {
  const password = getAdminPassword();
  if (!password) return false;
  return verifySessionToken(readCookie(req, ADMIN_COOKIE), password);
}

export function sessionCookieHeader(token: string): string {
  const maxAge = Math.floor(SESSION_TTL_MS / 1000);
  return `${ADMIN_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;
}

export function clearCookieHeader(): string {
  return `${ADMIN_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}
