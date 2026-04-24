import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#00ff88",
              marginRight: "12px",
            }}
          />
          <span style={{ color: "#00ff88", fontSize: "18px", letterSpacing: "4px" }}>
            G-STACK
          </span>
        </div>
        <div
          style={{
            color: "#ffffff",
            fontSize: "72px",
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: "24px",
          }}
        >
          G-Stack App
        </div>
        <div
          style={{
            color: "#888888",
            fontSize: "28px",
            maxWidth: "800px",
          }}
        >
          Built with Next.js · Supabase · Tailwind CSS
        </div>
      </div>
    ),
    { ...size }
  );
}
