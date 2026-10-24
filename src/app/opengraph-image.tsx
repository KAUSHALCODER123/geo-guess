import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "FlagForge — Interactive World Atlas & Vexillology Arena";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0b0f19",
          backgroundImage:
            "radial-gradient(circle at 50% 20%, rgba(59, 130, 246, 0.18), transparent 70%), radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.15), transparent 60%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "#ffffff",
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Subtle grid pattern border */}
        <div
          style={{
            position: "absolute",
            inset: "24px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "24px",
          }}
        />

        {/* Brand Header with Flag Icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "72px",
              height: "72px",
              borderRadius: "20px",
              background: "linear-gradient(135deg, #3b82f6, #6366f1, #8b5cf6)",
              boxShadow: "0 12px 30px rgba(59, 130, 246, 0.4)",
            }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
              <line x1="4" y1="22" x2="4" y2="15" />
            </svg>
          </div>
          <span
            style={{
              fontSize: "64px",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              background: "linear-gradient(to right, #ffffff, #cbd5e1)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            FlagForge
          </span>
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "30px",
            fontWeight: 600,
            color: "#94a3b8",
            textAlign: "center",
            maxWidth: "900px",
            lineHeight: 1.35,
            marginBottom: "44px",
          }}
        >
          Interactive World Atlas, Vexillology Arena &amp; Demographic Comparison
        </p>

        {/* Pill Badges */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          {[
            "250+ Sovereign Nations",
            "4 Quiz Modes",
            "Daily Challenge",
            "Side-by-Side Comparison",
            "100% Offline PWA",
          ].map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 22px",
                borderRadius: "9999px",
                backgroundColor: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.14)",
                fontSize: "17px",
                fontWeight: 600,
                color: "#e2e8f0",
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Bottom URL Watermark */}
        <div
          style={{
            position: "absolute",
            bottom: "44px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "16px",
            color: "#64748b",
            fontWeight: 500,
          }}
        >
          <span>flagforge.app</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
