import { ImageResponse } from "next/og";

export const alt = "Ideal Solutions data centre infrastructure services";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background:
            "linear-gradient(145deg, #252B33 0%, #171B20 66%, #443717 100%)",
          color: "white",
          padding: "64px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
          background:
              "radial-gradient(circle at top left, rgba(242,169,0,0.24), transparent 32%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "32px",
            padding: "48px",
            background: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div
              style={{
                height: "72px",
                width: "72px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#F2A900",
                color: "#252B33",
                fontSize: "32px",
                fontWeight: 700,
              }}
            >
              IS
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "22px", letterSpacing: "0.32em", textTransform: "uppercase", color: "#F2A900" }}>
                Ideal Solutions
              </span>
              <span style={{ fontSize: "22px", color: "rgba(255,255,255,0.72)" }}>
                Local Execution. Enterprise Standards.
              </span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "780px" }}>
            <span style={{ fontSize: "20px", letterSpacing: "0.28em", textTransform: "uppercase", color: "#F2A900" }}>
              Data Centre Infrastructure Services in Nigeria
            </span>
            <h1 style={{ margin: 0, fontSize: "68px", lineHeight: 1, letterSpacing: "-0.06em" }}>
              The technical execution behind reliable data centres.
            </h1>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
