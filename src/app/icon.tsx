import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 44,
          fontWeight: 800,
          color: "#ffffff",
          background:
            "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
          borderRadius: 14,
        }}
      >
        M
      </div>
    ),
    { ...size },
  );
}
