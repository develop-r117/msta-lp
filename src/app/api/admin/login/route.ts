import {
  createSessionToken,
  clearCookieHeader,
  getAdminPassword,
  sessionCookieHeader,
} from "@/lib/admin-auth";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const password = getAdminPassword();
  if (!password) {
    return Response.json(
      { error: "ADMIN_PASSWORD が未設定です。Cloudflare Pages の環境変数を設定してください。" },
      { status: 500 },
    );
  }

  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "不正なリクエストです。" }, { status: 400 });
  }

  if (body.password !== password) {
    return Response.json({ error: "パスワードが違います。" }, { status: 401 });
  }

  const token = await createSessionToken(password);
  return Response.json(
    { ok: true },
    { headers: { "Set-Cookie": sessionCookieHeader(token) } },
  );
}

export async function DELETE() {
  return Response.json(
    { ok: true },
    { headers: { "Set-Cookie": clearCookieHeader() } },
  );
}
