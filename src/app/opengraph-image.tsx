import { ImageResponse } from "next/og";

export const alt = "Shrey Patel — Front-End Focused Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Branded Open Graph card, generated at build time — no binary asset to maintain. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0908",
          padding: "64px 72px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -260,
            right: -220,
            width: 800,
            height: 800,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(244,85,29,0.55) 0%, rgba(191,66,27,0.16) 45%, rgba(10,9,8,0) 70%)",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            letterSpacing: 5,
            color: "#a99c8a",
            textTransform: "uppercase",
          }}
        >
          <span>Portfolio — 2026</span>
          <span>Gandhinagar, India</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 22,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "#bf421b",
            }}
          >
            Front-end focused full stack developer
          </span>
          <span
            style={{
              marginTop: 18,
              fontSize: 148,
              lineHeight: 0.92,
              letterSpacing: -8,
              color: "#f4eee3",
              fontWeight: 600,
            }}
          >
            Shrey Patel
          </span>
          <span
            style={{
              marginTop: 20,
              fontSize: 30,
              color: "rgba(244,238,227,0.62)",
              maxWidth: 780,
              lineHeight: 1.35,
            }}
          >
            React · Next.js · TypeScript — dashboards, design systems and products that ship.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(244,238,227,0.18)",
            paddingTop: 26,
            fontSize: 22,
            color: "#a99c8a",
          }}
        >
          <span>3+ years · 11 projects · 250+ bugs resolved</span>
          <span style={{ color: "#f4551d" }}>shreypatel.dev</span>
        </div>
      </div>
    ),
    size
  );
}
