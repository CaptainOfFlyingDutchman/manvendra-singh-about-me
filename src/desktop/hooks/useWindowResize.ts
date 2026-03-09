import type { RefObject } from "react";
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

type ResizeDirection = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

export function useWindowResize(
  windowId: string,
  direction: ResizeDirection,
  frameRef: RefObject<HTMLDivElement | null>,
) {
  const resizeWindow = useWindowManager((s) => s.resizeWindow);
  const moveWindow = useWindowManager((s) => s.moveWindow);
  const getState = useWindowManager.getState;
  const resizingRef = useRef(false);
  const startRef = useRef({ x: 0, y: 0, width: 0, height: 0, left: 0, top: 0 });

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
      left: win.position.x,
      top: win.position.y,
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

    let width = startRef.current.width;
    let height = startRef.current.height;
    let left = startRef.current.left;
    let top = startRef.current.top;

    if (direction.includes("e")) {
      width = startRef.current.width + dx;
    }

    if (direction.includes("s")) {
      height = startRef.current.height + dy;
    }

    if (direction.includes("w")) {
      width = startRef.current.width - dx;
      left = startRef.current.left + dx;
    }

    if (direction.includes("n")) {
      height = startRef.current.height - dy;
      top = startRef.current.top + dy;
    }

    const size = clampSize(width, height);

    // adjust position when clamped
    if (direction.includes("w")) {
      left = startRef.current.left + (startRef.current.width - size.width);
    }

    if (direction.includes("n")) {
      top = startRef.current.top + (startRef.current.height - size.height);
    }

    frameRef.current.style.width = `${size.width}px`;
    frameRef.current.style.height = `${size.height}px`;

    frameRef.current.style.transform = `translate(${left}px, ${top}px)`;
  };

  const handlePointerUp = () => {
    if (!resizingRef.current) {
      return;
    }

    resizingRef.current = false;

    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerup", handlePointerUp);

    if (!frameRef.current) {
      return;
    }

    const w = frameRef.current.offsetWidth;
    const h = frameRef.current.offsetHeight;

    let x = startRef.current.left;
    let y = startRef.current.top;

    const transform = frameRef.current.style.transform;

    if (transform) {
      const match = transform.match(/translate\((.*)px,\s*(.*)px\)/);

      if (match) {
        x = parseFloat(match[1]);
        y = parseFloat(match[2]);
      }
    }

    const { width, height } = clampSize(w, h);

    resizeWindow(windowId, { width, height });
    moveWindow(windowId, { x, y });

    // Don't clear inline styles; the next render will apply store values and avoid a visual jump
    // frameRef.current.style.transform = "";
  };

  return {
    handlePointerDown,
  };
}
