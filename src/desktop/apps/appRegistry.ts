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
    title: "My Blog",
    appType: "browser",
    payload: { url: "https://manvendrask.com", title: "Manvendra Singh" },
  },
  {
    id: "chatgpt",
    title: "OpenAI",
    appType: "browser",
    payload: { url: "https://openai.com/", title: "OpenAI" },
  },
  {
    id: "imageViewer",
    title: "Image Viewer",
    appType: "image",
    payload: { src: "https://picsum.photos/200/300" },
  },
];
