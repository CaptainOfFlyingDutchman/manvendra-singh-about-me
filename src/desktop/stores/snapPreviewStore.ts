import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type SnapPreviewState = {
  snap: "left" | "right" | "top" | null;

  show: (snap: SnapPreviewState["snap"]) => void;
  hide: () => void;
};

export const useSnapPreviewStore = create<SnapPreviewState>()(
  devtools(
    immer((set) => {
      return {
        snap: null,

        show: (snap) => set({ snap }, false, "snapPreview/show"),
        hide: () => set({ snap: null }, false, "snapPreview/hide"),
      };
    }),
    { name: "snapPreviewStore" },
  ),
);
