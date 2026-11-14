
import { ImageResponse } from "next/og";
import { getService } from "@/lib/services";

export const alt =
  "AI Engineering Studio service overview";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const serviceAccents: Record<string, string> = {
  "01": "#ff735f",
  "02": "#a895ff",
  "03": "#7ea7ff",
  "04": "#ffca72",
  "05": "#c7ec73",
  "06": "#7ee0dc",
};

export default async function ServiceOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);

  const accent = service
    ? serviceAccents[service.number] || "#ff735f"
    : "#ff735f";

  const title = service?.title || "AI engineering services";
  const eyebrow =
    service?.eyebrow || "Applied AI engineering";
  const description =
    service?.summary ||
    "Human-led, agent-powered engineering for real workflows.";
  const number = service?.number || "—";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          backgroundColor: "#10131b",
          color: "#f5f1e9",
          fontFamily: "Arial, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-120px",
            top: "-180px",
            width: "620px",
            height: "620px",
            border: `2px solid ${accent}`,
            borderRadius: "50%",
            opacity: 0.23,
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #343947",
            paddingBottom: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              fontSize: "20px",
              fontWeight: 700,
              letterSpacing: "2px",
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                color: "#10131b",
                backgroundColor: accent,
                fontSize: "15px",
              }}
            >
              AE
            </div>
            AI ENGINEERING STUDIO
          </div>

          <div
            style={{
              color: "#9ca4b3",
              fontSize: "15px",
              letterSpacing: "2px",
            }}
          >
            ENGINEERING CAPABILITY
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "22px",
            maxWidth: "980px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
              color: accent,
              fontSize: "18px",
              letterSpacing: "3px",
            }}
          >
            <span>{number}</span>
            <span>{eyebrow.toUpperCase()}</span>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "76px",
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-3px",
            }}
          >
            {title}
          </div>

          <div
            style={{
              display: "flex",
              maxWidth: "880px",
              color: "#bbc1cc",
              fontSize: "26px",
              lineHeight: 1.4,
            }}
          >
            {description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "24px",
            borderTop: "1px solid #343947",
            color: "#a1a6b3",
            fontSize: "17px",
            letterSpacing: "1px",
          }}
        >
          <span>HUMAN-LED · AGENT-POWERED</span>
          <span>INDIA / REMOTE</span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
