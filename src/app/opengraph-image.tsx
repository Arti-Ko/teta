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
        <div style={{ display: "flex", alignItems: "center", marginBottom: "32px" }}>
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#FF3B2E", marginRight: "12px" }} />
          <span style={{ color: "#FF3B2E", fontSize: "14px", letterSpacing: "6px", fontFamily: "monospace" }}>
            SENIOR BUSINESS ANALYST
          </span>
        </div>
        <div style={{ color: "#ffffff", fontSize: "80px", fontWeight: 700, lineHeight: 1.05, marginBottom: "24px", letterSpacing: "-2px" }}>
          Артем<br />Козыренко
        </div>
        <div style={{ color: "#888888", fontSize: "24px", maxWidth: "800px", lineHeight: 1.5 }}>
          Финтех · Ретейл · Данные · 6+ лет · 34 проекта
        </div>
      </div>
    ),
    { ...size }
  );
}
