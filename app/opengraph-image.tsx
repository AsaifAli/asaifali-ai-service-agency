import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AI Engineering Studio — applied AI for real workflows";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "68px", background: "#0b0e14", color: "#f3f6fc", fontFamily: "Arial, sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "18px", fontSize: 20, letterSpacing: 4, fontWeight: 700 }}><div style={{ width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #35425a", background: "#141b29", color: "#91adff", fontSize: 17 }}>AE</div> AI ENGINEERING STUDIO</div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 930 }}><div style={{ color: "#91adff", fontSize: 19, letterSpacing: 5, marginBottom: 22 }}>DOCUMENTS / KNOWLEDGE / WORKFLOWS</div><div style={{ fontSize: 76, lineHeight: 1.02, fontWeight: 700, letterSpacing: -4 }}>Make complex work <span style={{ color: "#91adff" }}>move.</span></div><div style={{ marginTop: 28, fontSize: 25, color: "#aeb8c9" }}>Practical AI systems, engineered around real business workflows.</div></div>
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "2px solid #303b4e", paddingTop: 20, fontSize: 16, letterSpacing: 2, color: "#aeb8c9" }}><span>FOUNDER-LED ENGINEERING</span><span>INDIA / REMOTE</span></div>
      </div>
    ),
    { ...size },
  );
}
