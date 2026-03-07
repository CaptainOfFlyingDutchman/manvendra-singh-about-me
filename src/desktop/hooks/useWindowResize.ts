import { type PointerEvent as ReactPointerEvent, useRef } from "react";
import { useWindowManager } from "@/desktop/stores/windowManager";

export function useWindowResize(windowId: string) {
  const resizeWindow = useWindowManager((s) => s.resizeWindow);
  const getState = useWindowManager.getState;

  const resizingRef = useRef(false);
  const startRef = useRef({ x: 0, y: 0, width: 0, height: 0 });

  const handlePointerDown = (e: ReactPointerEvent) => {
    e.stopPropagation();

    const state = getState();
    const win = state.windows[windowId];
    if (!win || win.isMaximized) {
      return;
    }

    resizingRef.current = true;

    startRef.current = {
      x: e.clientX,
      y: e.clientY,
      width: win.size.width,
      height: win.size.height,
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!resizingRef.current) {
      return;
    }

    const dx = e.clientX - startRef.current.x;
    const dy = e.clientY - startRef.current.y;

    resizeWindow(windowId, {
      width: startRef.current.width + dx,
      height: startRef.current.height + dy,
    });
  };

  const handlePointerUp = () => {
    resizingRef.current = false;

    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerup", handlePointerUp);
  };

  return {
    handlePointerDown,
  };
}
