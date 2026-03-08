import { type PointerEvent as ReactPointerEvent, useRef } from "react";
import {
  MIN_WINDOW_HEIGHT,
  MIN_WINDOW_WIDTH,
  useWindowManager,
} from "@/desktop/stores/windowManager";

function clampSize(width: number, height: number) {
  return {
    width: Math.max(MIN_WINDOW_WIDTH, width),
    height: Math.max(MIN_WINDOW_HEIGHT, height),
  };
}

export function useWindowResize(windowId: string) {
  const resizeWindow = useWindowManager((s) => s.resizeWindow);
  const getState = useWindowManager.getState;

  const frameRef = useRef<HTMLDivElement | null>(null);
  const resizingRef = useRef(false);
  const startRef = useRef({ x: 0, y: 0, width: 0, height: 0 });

  const handlePointerDown = (e: ReactPointerEvent) => {
    e.stopPropagation();

    const state = getState();
    const win = state.windows[windowId];
    if (!win || win.isMaximized || !frameRef.current) {
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
    if (!resizingRef.current || !frameRef.current) {
      return;
    }

    const dx = e.clientX - startRef.current.x;
    const dy = e.clientY - startRef.current.y;

    const { width, height } = clampSize(
      startRef.current.width + dx,
      startRef.current.height + dy,
    );

    frameRef.current.style.width = `${width}px`;
    frameRef.current.style.height = `${height}px`;
  };

  const handlePointerUp = () => {
    if (!resizingRef.current) {
      return;
    }

    resizingRef.current = false;

    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerup", handlePointerUp);

    if (frameRef.current) {
      const w =
        parseFloat(frameRef.current.style.width) || startRef.current.width;
      const h =
        parseFloat(frameRef.current.style.height) || startRef.current.height;

      const { width, height } = clampSize(w, h);

      resizeWindow(windowId, { width, height });

      // Clear inline size so the store drives layout again
      frameRef.current.style.width = "";
      frameRef.current.style.height = "";
    }
  };

  return {
    handlePointerDown,
    frameRef,
  };
}
