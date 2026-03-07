import { type PointerEvent as ReactPointerEvent, useRef } from "react";
import { useWindowManager } from "@/desktop/stores/windowManager";

export function useWindowDrag(windowId: string) {
  const moveWindow = useWindowManager((s) => s.moveWindow);
  const focusWindow = useWindowManager((s) => s.focusWindow);
  const getState = useWindowManager.getState;

  const draggingRef = useRef(false);
  const offsetRef = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e: ReactPointerEvent) => {
    const state = getState();

    const win = state.windows[windowId];
    if (!win) {
      return;
    }

    if (win.isMaximized) {
      return;
    }

    draggingRef.current = true;

    focusWindow(windowId);

    offsetRef.current = {
      x: e.clientX - win.position.x,
      y: e.clientY - win.position.y,
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!draggingRef.current) {
      return;
    }

    const x = e.clientX - offsetRef.current.x;
    const y = e.clientY - offsetRef.current.y;

    moveWindow(windowId, { x, y });
  };

  const handlePointerUp = () => {
    draggingRef.current = false;

    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerup", handlePointerUp);
  };

  return { handlePointerDown };
}
