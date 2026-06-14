import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const runtime = "edge";

const SIZE = { width: 1200, height: 630 };

/**
 * Google Fonts から必要なグリフだけをサブセットして取得する。
 * OGタイトルは動的なため、描画テキストを `text` に渡して最小限のフォントを読み込む。
 */
async function loadGoogleFont(
  family: string,
  weight: number,
  text: string,
): Promise<ArrayBuffer | null> {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    family,
  )}:wght@${weight}&text=${encodeURIComponent(text)}`;
  try {
    const cssRes = await fetch(url, {
      headers: {
        // woff2 ではなく ttf/otf を得るために古めの UA を指定
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });
    if (!cssRes.ok) return null;
    const css = await cssRes.text();
    const match = css.match(
      /src: url\((.+?)\) format\('(?:opentype|truetype)'\)/,
    );
    if (!match) return null;
    const fontRes = await fetch(match[1]);
    if (!fontRes.ok) return null;
    return await fontRes.arrayBuffer();
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const rawTitle = searchParams.get("title")?.slice(0, 80) ?? "";
  const title =
    rawTitle.trim() || "真のノーコード × 最強CMS";
  const subtitle =
    searchParams.get("subtitle")?.slice(0, 100) ??
    "アプリ制作・運用・収益化を、ひとつの場所で。";

  // フォントに必要な文字を網羅
  const glyphText = `${SITE_NAME}${title}${subtitle}MS Studio・×/`;
  const [bold, regular] = await Promise.all([
    loadGoogleFont("Noto Sans JP", 700, glyphText),
    loadGoogleFont("Noto Sans JP", 400, glyphText),
  ]);

  const fonts: {
    name: string;
    data: ArrayBuffer;
    weight: 400 | 700;
    style: "normal";
  }[] = [];
  if (regular)
    fonts.push({
      name: "Noto Sans JP",
      data: regular,
      weight: 400,
      style: "normal",
    });
  if (bold)
    fonts.push({
      name: "Noto Sans JP",
      data: bold,
      weight: 700,
      style: "normal",
    });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #0b1020 0%, #131a35 45%, #1e2a5e 100%)",
          color: "#ffffff",
          fontFamily: "Noto Sans JP",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
            }}
          />
          <div style={{ fontSize: "40px", fontWeight: 700, letterSpacing: "0.04em" }}>
            {SITE_NAME}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              fontSize: title.length > 28 ? "60px" : "72px",
              fontWeight: 700,
              lineHeight: 1.25,
              maxWidth: "1000px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: "30px",
              fontWeight: 400,
              color: "#cbd5e1",
              maxWidth: "960px",
            }}
          >
            {subtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "26px",
            color: "#93c5fd",
            fontWeight: 700,
          }}
        >
          <div
            style={{
              display: "flex",
              height: "8px",
              width: "48px",
              borderRadius: "999px",
              background: "linear-gradient(90deg, #60a5fa, #a78bfa)",
            }}
          />
          msta-app.com
        </div>
      </div>
    ),
    {
      ...SIZE,
      fonts: fonts.length ? fonts : undefined,
    },
  );
}
