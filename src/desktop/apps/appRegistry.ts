import type { AppPayloadMap, AppType } from "@/desktop/types/window";

export type DesktopApp<T extends AppType = AppType> = {
  id: string;
  title: string;
  appType: T;
  payload: AppPayloadMap[T];

  icon?: string;
  defaultSize?: { width: number; height: number };
};

export const apps: DesktopApp[] = [
  {
    id: "browser",
    title: "Browser",
    appType: "browser",
    payload: { url: "https://www.google.com" },
  },
  {
    id: "chatgpt",
    title: "ChatGPT",
    appType: "browser",
    payload: { url: "https://chat.openai.com" },
  },
  {
    id: "imageViewer",
    title: "Image Viewer",
    appType: "image",
    payload: { src: "https://picsum.photos/200/300" },
  },
];
