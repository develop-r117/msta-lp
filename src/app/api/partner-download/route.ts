import { NextResponse } from "next/server";
import { partnerFormSchema } from "@/lib/partner-form-schema";
import { getServerEnv } from "@/lib/env";
import { isEmailConfigured, sendEmail } from "@/lib/email";

export const runtime = "edge";

const interestLabels: Record<string, string> = {
  create: "制作パートナー",
  intro: "紹介パートナー",
  template: "テンプレート販売",
  official: "オフィシャル制作連携",
  other: "その他",
};

// 申込者に案内するパートナー資料のダウンロードURL。
// 環境変数 PARTNER_DOC_URL が設定されていればそちらを優先する。
const DEFAULT_DOC_URL =
  "https://drive.google.com/file/d/1yINb53olehb9_QQBRstc36gxyuhTDZM7/view?usp=drive_link";

// 申込通知の送信先（管理者）。環境変数 NOTIFY_TO で上書き可能。
const DEFAULT_ADMIN_EMAIL = "info@r117.co.jp";

// 送信元。SendGridで認証済み(Sender Authentication)のアドレスを SENDGRID_FROM に設定すること。
const DEFAULT_FROM = "エムスタ <noreply@msta.app>";

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json(
      { error: "リクエストの形式が不正です" },
      { status: 400 },
    );
  }

  const parsed = partnerFormSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "入力内容を再度ご確認ください", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // Honeypot check — bots typically fill hidden fields
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  try {
    const env = getServerEnv();

    const interestList = data.interests
      .map((i) => interestLabels[i] ?? i)
      .join(" / ");
    const consultText = data.consult === "yes" ? "希望する" : "希望しない";

    // SendGrid APIキー未設定時は送信せず正常終了（フロントは動作させる）
    if (!isEmailConfigured()) {
      console.warn(
        "[partner-download] SendGrid not configured; submission accepted without email send.",
      );
      return NextResponse.json({ ok: true, emailed: false });
    }

    const fromAddress = env.SENDGRID_FROM ?? DEFAULT_FROM;
    const docUrl = env.PARTNER_DOC_URL ?? DEFAULT_DOC_URL;
    const adminTo = env.NOTIFY_TO ?? DEFAULT_ADMIN_EMAIL;

    // 1) 申込者へダウンロードリンクを送信
    // 2) 管理者へ申込内容を通知
    // 両方を並行送信し、SendGridが返すerrorも個別に検知する。
    const [userResult, adminResult] = await Promise.all([
      sendEmail({
        from: fromAddress,
        to: data.email,
        subject: "【エムスタ】パートナー資料のダウンロードリンク",
        html: renderUserEmail({
          name: data.name,
          company: data.company || "",
          docUrl,
        }),
      }),
      sendEmail({
        from: fromAddress,
        to: adminTo,
        replyTo: data.email,
        subject: `[エムスタ] パートナー資料DL: ${data.company || data.name}`,
        html: renderNotifyEmail({
          ...data,
          interestText: interestList,
          consultText,
        }),
      }),
    ]);

    if (!userResult.ok) {
      console.error("[partner-download] user email failed", userResult.error);
    }
    if (!adminResult.ok) {
      console.error("[partner-download] admin email failed", adminResult.error);
    }

    // 申込者宛が失敗した場合のみエラーを返す。
    // （管理者通知のみの失敗ではユーザー体験を止めないが、ログには残す）
    if (!userResult.ok) {
      return NextResponse.json(
        {
          error:
            "メール送信中にエラーが発生しました。時間をおいて再度お試しいただくか、お問い合わせください。",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      emailed: true,
      adminNotified: adminResult.ok,
    });
  } catch (e) {
    console.error("[partner-download] email send threw", e);
    return NextResponse.json(
      {
        error:
          "メール送信中にエラーが発生しました。時間をおいて再度お試しください。",
      },
      { status: 500 },
    );
  }
}

function renderUserEmail({
  name,
  company,
  docUrl,
}: {
  name: string;
  company: string;
  docUrl: string;
}) {
  return `<!doctype html><html lang="ja"><body style="font-family:'Noto Sans JP','Hiragino Sans','Yu Gothic',sans-serif;background:#f8fafc;margin:0;padding:24px;color:#0f172a;">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;padding:32px;">
    <h1 style="font-size:18px;margin:0 0 16px 0;">${escapeHtml(company || name)}様</h1>
    <p style="font-size:14px;line-height:1.8;margin:0 0 16px 0;">この度はエムスタのパートナー資料請求をいただきありがとうございます。</p>
    <p style="font-size:14px;line-height:1.8;margin:0 0 16px 0;">下記リンクから資料をダウンロードしてください。</p>
    <p style="margin:24px 0;">
      <a href="${docUrl}" style="display:inline-block;background:#0f766e;color:#ffffff;font-weight:700;text-decoration:none;padding:12px 20px;border-radius:9999px;">パートナー資料をダウンロード</a>
    </p>
    <p style="font-size:12px;color:#64748b;margin:0;">本メールに心当たりがない場合はお手数ですが破棄してください。</p>
  </div>
</body></html>`;
}

function renderNotifyEmail(data: {
  company?: string | "";
  name: string;
  email: string;
  phone?: string | "";
  industry?: string | "";
  websiteUrl?: string | "";
  interestText: string;
  consultText: string;
}) {
  const row = (k: string, v: string | undefined) =>
    `<tr><th align="left" style="padding:6px 12px;background:#f1f5f9;font-weight:600;">${k}</th><td style="padding:6px 12px;">${escapeHtml(v || "-")}</td></tr>`;
  return `<!doctype html><html lang="ja"><body style="font-family:'Noto Sans JP','Hiragino Sans','Yu Gothic',sans-serif;color:#0f172a;">
  <h2 style="margin:0 0 12px 0;">パートナー資料DL申し込み</h2>
  <table style="border-collapse:collapse;font-size:14px;width:100%;max-width:600px;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
    ${row("会社名 / 屋号", data.company)}
    ${row("担当者名", data.name)}
    ${row("メール", data.email)}
    ${row("電話", data.phone)}
    ${row("業種", data.industry)}
    ${row("WebサイトURL", data.websiteUrl)}
    ${row("興味のある内容", data.interestText)}
    ${row("オンライン相談", data.consultText)}
  </table>
</body></html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
