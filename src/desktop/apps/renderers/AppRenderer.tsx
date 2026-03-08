import { BrowserApp } from "@/desktop/apps/renderers/BrowserApp";
import { ImageViewerApp } from "@/desktop/apps/renderers/ImageViewerApp";
import { PdfViewerApp } from "@/desktop/apps/renderers/PdfViewerApp";
import type { WindowInstanceVariant } from "@/desktop/types/window";

type AppRendererProps = { window: WindowInstanceVariant };

export function AppRenderer({ window }: AppRendererProps) {
  switch (window.appType) {
    case "browser":
      return <BrowserApp payload={window.payload} />;
    case "pdf":
      return <PdfViewerApp payload={window.payload} />;
    case "image":
      return <ImageViewerApp payload={window.payload} />;

    default:
      return <div>Unknown App</div>;
  }
}
