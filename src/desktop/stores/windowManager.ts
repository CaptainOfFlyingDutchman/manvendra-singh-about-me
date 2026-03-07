import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {
  AppType,
  OpenWindowConfig,
  WindowInstance,
} from "../types/window";

function generateWindowId() {
  return `win_${crypto.randomUUID()}`;
}

type WindowManagerState = {
  windows: Record<string, WindowInstance>;
  zCounter: number;
  focusedWindowId: string | null;
};

type WindowManagerActions = {
  openWindow: <T extends AppType>(config: OpenWindowConfig<T>) => string;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  moveWindow: (id: string, pos: { x: number; y: number }) => void;
  resizeWindow: (id: string, size: { width: number; height: number }) => void;
};

export const useWindowManager = create<
  WindowManagerState & WindowManagerActions
>()(
  devtools(() => {
    return {
      windows: {},
      zCounter: 1,
      focusedWindowId: null,

      // actions
      openWindow: (config) => {
        const id = generateWindowId();

        const state = useWindowManager.getState();

        const zIndex = state.zCounter + 1;

        const newWindow: WindowInstance = {
          id,
          appType: config.appType,
          title: config.title,

          isMinimized: false,
          isMaximized: false,
          isFocused: true,

          zIndex,

          position: config.initialPosition ?? { x: 120, y: 120 },

          size: config.initialSize ?? { width: 800, height: 500 },

          payload: config.payload,

          createdAt: Date.now(),
        };

        useWindowManager.setState((prev) => {
          const updatedWindows: Record<string, WindowInstance> = {};

          for (const win of Object.values(prev.windows)) {
            updatedWindows[win.id] = {
              ...win,
              isFocused: false,
            };
          }

          updatedWindows[id] = newWindow;

          return {
            windows: updatedWindows,
            zCounter: zIndex,
            focusedWindowId: id,
          };
        });
        return id;
      },

      closeWindow: () => {
        throw new Error("closeWindow not implemented");
      },

      focusWindow: () => {
        throw new Error("focusWindow not implemented");
      },

      minimizeWindow: () => {
        throw new Error("minimizeWindow not implemented");
      },

      maximizeWindow: () => {
        throw new Error("maximizeWindow not implemented");
      },

      restoreWindow: () => {
        throw new Error("restoreWindow not implemented");
      },

      moveWindow: () => {
        throw new Error("moveWindow not implemented");
      },

      resizeWindow: () => {
        throw new Error("resizeWindow not implemented");
      },
    };
  }),
);
