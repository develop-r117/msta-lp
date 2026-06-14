/**
 * アップロード済みメディア(画像)の公開配信 API。
 *
 * - GET /api/media/<key> : メディアストレージ (R2 優先 / CMS_KV) から
 *   バイナリを読み出し、適切な Content-Type と長期キャッシュで返す。
 * - 公開ページ・管理画面の双方から参照されるため認証は不要。
 */
import { getMedia } from "@/lib/media-storage";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const key = (path ?? []).join("/");
  if (!key) {
    return new Response("Not found", { status: 404 });
  }

  const media = await getMedia(key);
  if (!media) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(media.data, {
    headers: {
      "Content-Type": media.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
