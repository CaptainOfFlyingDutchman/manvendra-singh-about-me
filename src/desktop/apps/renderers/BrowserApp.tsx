"use client";

import type { AppPayloadMap } from "@/desktop/types/window";

type BrowserAppProps = {
  payload: AppPayloadMap["browser"];
};

export function BrowserApp({ payload }: BrowserAppProps) {
  return (
    <iframe
      title={payload.title}
      src={payload.url}
      style={{ width: "100%", height: "100%", border: "none" }}
    />
  );
}
