import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { getTopWindow } from "@/desktop/core/windowUtils";

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
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  moveWindow: (id: string, pos: { x: number; y: number }) => void;
  resizeWindow: (id: string, size: { width: number; height: number }) => void;
};

export const useWindowManager = create<
  WindowManagerState & WindowManagerActions
>()(
  devtools(
    immer((set, get) => {
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

          set(
            (state) => {
              Object.values(state.windows).forEach((win) => {
                win.isFocused = false;
              });

              state.windows[id] = newWindow;
              state.zCounter = zIndex;
              state.focusedWindowId = id;
            },
            false,
            "window/open",
          );

          return id;
        },

        closeWindow: (id) => {
          set(
            (state) => {
              const wasFocused = state.focusedWindowId === id;

              delete state.windows[id];

              if (!wasFocused) {
                return;
              }

              const next = getTopWindow(state.windows);

              if (!next) {
                state.focusedWindowId = null;

                return;
              }

              next.isFocused = true;
              state.focusedWindowId = next.id;
            },
            false,
            "window/close",
          );
        },

        focusWindow: (id) => {
          const state = get();

          if (state.focusedWindowId === id) {
            return;
          }

          const newZ = state.zCounter + 1;

          set(
            (state) => {
              const target = state.windows[id];

              if (!target) {
                return;
              }

              Object.values(state.windows).forEach((win) => {
                win.isFocused = false;
              });

              target.isFocused = true;
              target.zIndex = newZ;

              state.focusedWindowId = id;
              state.zCounter = newZ;
            },
            false,
            "window/focus",
          );
        },

        minimizeWindow: (id) => {
          set(
            (state) => {
              const target = state.windows[id];

              if (!target) {
                return;
              }

              const wasFocused = state.focusedWindowId === id;

              target.isMinimized = true;
              target.isFocused = false;

              // If the minimized window wasn't focused,
              // we don't need to change focus.
              if (!wasFocused) {
                return;
              }

              // Find windows that are still visible
              const candidates: Record<string, WindowInstance> = {};

              Object.values(state.windows).forEach((win) => {
                if (!win.isMinimized && win.id !== id) {
                  candidates[win.id] = win;
                }
              });

              const next = getTopWindow(candidates);

              if (!next) {
                state.focusedWindowId = null;

                return;
              }

              next.isFocused = true;
              state.focusedWindowId = next.id;
            },
            false,
            "window/minimize",
          );
        },

        maximizeWindow: () => {
          throw new Error("maximizeWindow not implemented");
        },

        restoreWindow: (id) => {
          const state = get();

          const newZ = state.zCounter + 1;

          set(
            (state) => {
              const target = state.windows[id];

              if (!target) {
                return;
              }

              Object.values(state.windows).forEach((win) => {
                win.isFocused = false;
              });

              target.isMinimized = false;
              target.isFocused = true;
              target.zIndex = newZ;

              state.focusedWindowId = id;
              state.zCounter = newZ;
            },
            false,
            "window/restore",
          );
        },

        moveWindow: () => {
          throw new Error("moveWindow not implemented");
        },

        resizeWindow: () => {
          throw new Error("resizeWindow not implemented");
        },
      };
    }),
    { name: "windowManager" },
  ),
);
