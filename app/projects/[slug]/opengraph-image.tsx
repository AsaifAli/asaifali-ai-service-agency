
import { ImageResponse } from "next/og";
import { getProject } from "@/lib/projects";

export const alt =
  "AI Engineering Studio independent project reference";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const accents: Record<string, string> = {
  coral: "#ff735f",
  violet: "#a895ff",
  amber: "#ffca72",
  blue: "#7ea7ff",
  cyan: "#7ee0dc",
  green: "#c7ec73",
  lime: "#c7ec73",
};

export default async function ProjectOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  const accent = project
    ? accents[project.accent] || "#ff735f"
    : "#ff735f";

  const name = project?.name || "Independent AI build";
  const eyebrow =
    project?.eyebrow || "Applied AI engineering";
  const description =
    project?.short ||
    "Human-led, agent-powered engineering for real workflows.";
  const number = project?.number || "—";

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
            INDEPENDENT ENGINEERING BUILD
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "22px",
            maxWidth: "950px",
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
              fontSize: "88px",
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-4px",
            }}
          >
            {name}
          </div>

          <div
            style={{
              display: "flex",
              maxWidth: "880px",
              color: "#bbc1cc",
              fontSize: "27px",
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
