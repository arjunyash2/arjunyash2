import { ImageResponse } from "next/og";
export const alt = "Arjun S.D. — AI Developer & Python Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#101419",
        color: "#edf3f6",
        display: "flex",
        flexDirection: "column",
        padding: "65px 80px",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 25,
        }}
      >
        <span>arjunsd.</span>
        <span style={{ color: "#9aa8b4", fontSize: 19 }}>
          AI DEVELOPER & PYTHON ENGINEER
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 94,
          letterSpacing: -5,
          lineHeight: 1.05,
        }}
      >
        <span>AI systems.</span>
        <span style={{ color: "#68d6df" }}>Built for reality.</span>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 22,
          borderTop: "1px solid #2b353f",
          paddingTop: 25,
          color: "#9aa8b4",
        }}
      >
        Applied AI. Resilient data systems. Software that works.
      </div>
    </div>,
    size,
  );
}
