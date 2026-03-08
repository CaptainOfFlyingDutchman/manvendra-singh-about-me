import type { AppPayloadMap } from "@/desktop/types/window";

export type ImageViewerAppProps = {
  payload: AppPayloadMap["image"];
};

export function ImageViewerApp({ payload }: ImageViewerAppProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#111",
      }}
    >
      {/** biome-ignore lint/performance/noImgElement: need to show an image */}
      <img
        src={payload.src}
        alt={payload.alt ?? ""}
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
    </div>
  );
}
