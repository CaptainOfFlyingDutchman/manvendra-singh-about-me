export type AppType = "browser" | "pdf" | "image" | "custom";

export type AppPayloadMap = {
  browser: { url: string };
  pdf: { url: string; page?: number };
  image: { src: string; alt?: string };
  custom: {
    componentId: string;
    props?: Record<string, unknown>;
  };
};

export type WindowInstance<T extends AppType = AppType> = {
  id: string;
  appType: T;
  title: string;

  // lifecycle
  isMinimized: boolean;
  isMaximized: boolean;
  isFocused: boolean;

  // stacking
  zIndex: number;

  // geometry
  position: { x: number; y: number };
  size: { width: number; height: number };

  // app data
  paylod: AppPayloadMap[T];

  // metadata
  createdAt: number;
};

export type OpenWindowConfig<T extends AppType> = {
  appType: T;
  title: string;
  payload: AppPayloadMap[T];

  initialSize?: { width: number; height: number };
  initialPosotion?: { x: number; y: number };
};
