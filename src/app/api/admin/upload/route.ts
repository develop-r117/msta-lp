/**
 * /admin 用 画像アップロード API。
 *
 * - POST: multipart/form-data の "file" を受け取り、メディアストレージ
 *   (R2 優先 / CMS_KV フォールバック) に保存して公開 URL を返す。
 * - 認証は管理セッション Cookie を検証する。
 * - 配信は /api/media/<key> 経由 (media ルート) で行う。
 */
import { isAuthorized } from "@/lib/admin-auth";
import { isMediaStorageAvailable, putMedia } from "@/lib/media-storage";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const MAX_BYTES = 5 * 1024 * 1024; // 5MB

const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
};

function randomId(): string {
  if (typeof crypto.randomUUID === "function") {
    return crypto.randomUUID().replace(/-/g, "");
  }
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function POST(req: Request) {
  if (!(await isAuthorized(req))) {
    return Response.json({ error: "認証が必要です。" }, { status: 401 });
  }

  if (!isMediaStorageAvailable()) {
    return Response.json(
      {
        error:
          "画像ストレージが利用できない環境です (ローカル開発では preview:cf もしくは本番環境をご利用ください)。",
      },
      { status: 500 },
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return Response.json(
      { error: "不正なリクエストです。" },
      { status: 400 },
    );
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return Response.json(
      { error: "ファイルが指定されていません。" },
      { status: 400 },
    );
  }

  const ext = EXT_BY_TYPE[file.type];
  if (!ext) {
    return Response.json(
      {
        error:
          "対応していない形式です。JPEG / PNG / GIF / WebP の画像をアップロードしてください。",
      },
      { status: 400 },
    );
  }

  if (file.size > MAX_BYTES) {
    return Response.json(
      { error: "ファイルサイズは 5MB 以下にしてください。" },
      { status: 400 },
    );
  }

  const now = new Date();
  const yyyy = now.getUTCFullYear();
  const mm = String(now.getUTCMonth() + 1).padStart(2, "0");
  const key = `uploads/${yyyy}/${mm}/${randomId()}.${ext}`;

  const buffer = await file.arrayBuffer();
  const ok = await putMedia(key, buffer, file.type);
  if (!ok) {
    return Response.json(
      { error: "保存に失敗しました。" },
      { status: 500 },
    );
  }

  return Response.json({ ok: true, key, url: `/api/media/${key}` });
}
