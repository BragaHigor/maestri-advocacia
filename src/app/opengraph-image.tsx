import { ImageResponse } from "next/og";

export const alt =
  "Maestri Advocacia — Direito do Consumidor e fraudes bancárias";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "76px 84px",
        color: "#f5f0e6",
        background:
          "radial-gradient(circle at 80% 15%, rgba(217,174,60,.25), transparent 32%), #0d0b09",
        border: "2px solid rgba(217,174,60,.3)",
      }}
    >
      <div
        style={{
          display: "flex",
          color: "#ecc667",
          fontSize: 26,
          letterSpacing: 8,
          textTransform: "uppercase",
        }}
      >
        Maestri Advocacia
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", maxWidth: 900, fontSize: 70, lineHeight: 1.05 }}>
          Fraude bancária tem solução jurídica.
        </div>
        <div style={{ display: "flex", color: "#d9ae3c", fontSize: 27 }}>
          Direito do Consumidor · Atendimento em todo o Brasil
        </div>
      </div>
    </div>,
    size,
  );
}
