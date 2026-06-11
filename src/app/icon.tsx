import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 22,
          background: "#0c0c0c",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#a3e635",
          fontFamily: "Georgia, serif",
          fontWeight: "bold",
          fontStyle: "italic",
          borderRadius: 6,
          border: "1px solid rgba(255, 255, 255, 0.15)",
        }}
      >
        A
      </div>
    ),
    {
      ...size,
    }
  );
}
