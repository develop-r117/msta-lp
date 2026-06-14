import { getServerEnv } from "./env";

export type SendEmailParams = {
  /** "Name <email>" 形式、または email のみ */
  from: string;
  to: string;
  subject: string;
  html: string;
  /** 返信先アドレス（任意） */
  replyTo?: string;
};

export type SendEmailResult = { ok: true } | { ok: false; error: string };

/** メール送信が設定済み（SendGrid APIキーあり）かどうか */
export function isEmailConfigured(): boolean {
  return !!getServerEnv().SENDGRID_API_KEY;
}

/**
 * SendGrid v3 REST API でメールを送信する。
 * Cloudflare Pages の edge runtime で動作させるため、Node依存の
 * @sendgrid/mail ではなく fetch ベースで実装している。
 */
export async function sendEmail(params: SendEmailParams): Promise<SendEmailResult> {
  const env = getServerEnv();
  if (!env.SENDGRID_API_KEY) {
    return { ok: false, error: "SENDGRID_API_KEY が設定されていません" };
  }

  const from = parseAddress(params.from);

  const body = {
    personalizations: [{ to: [{ email: params.to }] }],
    from: from.name ? { email: from.email, name: from.name } : { email: from.email },
    subject: params.subject,
    content: [{ type: "text/html", value: params.html }],
    ...(params.replyTo ? { reply_to: { email: params.replyTo } } : {}),
  };

  try {
    const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // 成功時は 202 Accepted (ボディなし)
    if (res.ok) return { ok: true };

    const detail = await res.text().catch(() => "");
    return { ok: false, error: `SendGrid ${res.status}: ${detail || res.statusText}` };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "不明なエラー" };
  }
}

/** "エムスタ <noreply@msta.app>" を { name, email } に分解する */
function parseAddress(input: string): { email: string; name?: string } {
  const match = input.match(/^\s*(.*?)\s*<([^>]+)>\s*$/);
  if (match) {
    return { name: match[1] || undefined, email: match[2].trim() };
  }
  return { email: input.trim() };
}
