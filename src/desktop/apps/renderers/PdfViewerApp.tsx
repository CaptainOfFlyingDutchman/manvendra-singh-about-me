import type { AppPayloadMap } from "@/desktop/types/window";

type PdfViewerAppProps = {
  payload: AppPayloadMap["pdf"];
};

export function PdfViewerApp({ payload }: PdfViewerAppProps) {
  return (
    <iframe
      title={payload.url}
      src={payload.url}
      style={{ width: "100%", height: "100%", border: "none" }}
    />
  );
}
