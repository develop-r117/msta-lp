"use client";

import Image from "next/image";

/**
 * KV / プレビュー用の差し替え容易なメディアスロット。
 *
 * - `video` を渡すと軽量ループ動画（autoplay / muted / loop / playsInline）を再生し、
 *   読み込み前・非対応時は `poster`（= 静止画）を表示する。
 * - `video` 未指定（素材未到着）の場合は `image` 静止画のみを表示する。
 *
 * 動画素材が用意でき次第、呼び出し側で `video` を渡すだけで差し替えられる。
 */
export type KvMediaProps = {
  /** 静止画（必須）。動画のposterとしても利用される */
  image: string;
  alt: string;
  /** 軽量ループ動画のソース（任意）。WebM優先・MP4フォールバック */
  video?: { webm?: string; mp4?: string };
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  /** Imageをfillで描画する場合true（親にaspect/relativeが必要） */
  fill?: boolean;
  width?: number;
  height?: number;
};

export default function KvMedia({
  image,
  alt,
  video,
  className,
  imageClassName,
  priority,
  sizes,
  fill = true,
  width,
  height,
}: KvMediaProps) {
  const hasVideo = Boolean(video?.webm || video?.mp4);

  if (hasVideo) {
    return (
      <video
        className={className}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={image}
        aria-label={alt}
      >
        {video?.webm ? <source src={video.webm} type="video/webm" /> : null}
        {video?.mp4 ? <source src={video.mp4} type="video/mp4" /> : null}
      </video>
    );
  }

  return (
    <Image
      src={image}
      alt={alt}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      className={imageClassName ?? className}
      sizes={sizes}
      priority={priority}
    />
  );
}
