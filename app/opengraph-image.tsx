import { ImageResponse } from "next/og";

export const alt = "Ryan Martin Design & Print";
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
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#fffaf2",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 140,
            height: 140,
            borderRadius: 32,
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(135deg, #7c3aed 0%, #d946ef 55%, #f59e0b 100%)",
            color: "white",
            fontSize: 56,
            fontWeight: 700,
            boxShadow: "0 20px 60px rgba(124,58,237,0.35)",
          }}
        >
          RM
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 64,
            fontWeight: 700,
            color: "#201a2e",
          }}
        >
          Ryan Martin
        </div>
        <div
          style={{
            marginTop: 12,
            fontSize: 30,
            color: "#5a5270",
          }}
        >
          Freelance Design &amp; Print · Northern Illinois &amp; Southern Wisconsin
        </div>
      </div>
    ),
    { ...size }
  );
}
