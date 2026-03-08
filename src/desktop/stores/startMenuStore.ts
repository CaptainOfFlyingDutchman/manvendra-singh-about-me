import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type StartMenuState = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
};

export const useStartMenuStore = create<StartMenuState>()(
  devtools(
    immer((set) => {
      return {
        isOpen: false,
        toggle: () => {
          set(
            (state) => {
              state.isOpen = !state.isOpen;
            },
            false,
            "startMenu/toggle",
          );
        },
        close: () => {
          set({ isOpen: false }, false, "startMenu/close");
        },
      };
    }),
    {
      name: "startMenuStore",
    },
  ),
);
