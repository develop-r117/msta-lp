/**
 * メディア(画像)ストレージ抽象。
 *
 * - Cloudflare R2 (binding: MEDIA_R2) があれば優先して使用する。
 * - R2 が無い環境では既存の CMS_KV にプレフィックス付きで保存する
 *   フォールバックを行うため、追加設定なしでアップロードが機能する。
 * - next dev など Cloudflare 外ではバインディングを取得できず null を返す。
 *
 * 公開 URL は /api/media/<key> を返し、配信ルートがこのモジュール経由で読み出す。
 */
import { getRequestContext } from "@cloudflare/next-on-pages";

/** KV 内でメディアを区別するためのキープレフィックス。 */
export const MEDIA_KV_PREFIX = "media:";

type R2HttpMetadata = { contentType?: string };

type R2ObjectBody = {
  body: ReadableStream;
  httpMetadata?: R2HttpMetadata;
  size?: number;
};

type R2Like = {
  put(
    key: string,
    value: ArrayBuffer | ReadableStream,
    options?: { httpMetadata?: R2HttpMetadata },
  ): Promise<unknown>;
  get(key: string): Promise<R2ObjectBody | null>;
  delete(key: string): Promise<void>;
};

type KvMediaLike = {
  put(
    key: string,
    value: ArrayBuffer,
    options?: { metadata?: Record<string, string> },
  ): Promise<void>;
  getWithMetadata(
    key: string,
    type: "arrayBuffer",
  ): Promise<{
    value: ArrayBuffer | null;
    metadata: { contentType?: string } | null;
  }>;
  delete(key: string): Promise<void>;
};

type MediaBindings = {
  MEDIA_R2?: R2Like;
  CMS_KV?: KvMediaLike;
};

function getBindings(): MediaBindings {
  try {
    return getRequestContext().env as MediaBindings;
  } catch {
    return {};
  }
}

export type MediaPayload = {
  data: ArrayBuffer | ReadableStream;
  contentType: string;
};

/** ストレージが利用可能か(R2 か KV のいずれかがある)。 */
export function isMediaStorageAvailable(): boolean {
  const env = getBindings();
  return Boolean(env.MEDIA_R2 || env.CMS_KV);
}

/** メディアを保存する。成功すれば true。 */
export async function putMedia(
  key: string,
  data: ArrayBuffer,
  contentType: string,
): Promise<boolean> {
  const env = getBindings();
  if (env.MEDIA_R2) {
    await env.MEDIA_R2.put(key, data, { httpMetadata: { contentType } });
    return true;
  }
  if (env.CMS_KV) {
    await env.CMS_KV.put(MEDIA_KV_PREFIX + key, data, {
      metadata: { contentType },
    });
    return true;
  }
  return false;
}

/** メディアを読み出す。存在しなければ null。 */
export async function getMedia(key: string): Promise<MediaPayload | null> {
  const env = getBindings();
  if (env.MEDIA_R2) {
    const obj = await env.MEDIA_R2.get(key);
    if (!obj) return null;
    return {
      data: obj.body,
      contentType: obj.httpMetadata?.contentType ?? "application/octet-stream",
    };
  }
  if (env.CMS_KV) {
    const res = await env.CMS_KV.getWithMetadata(
      MEDIA_KV_PREFIX + key,
      "arrayBuffer",
    );
    if (!res.value) return null;
    return {
      data: res.value,
      contentType: res.metadata?.contentType ?? "application/octet-stream",
    };
  }
  return null;
}
