import {
  type PointerEvent as ReactPointerEvent,
  type RefObject,
  useRef,
} from "react";
import type { SnapResult } from "@/desktop/core/snapWindow";
import { detectSnap, getSnapGeometry } from "@/desktop/core/snapWindow";
import { useSnapPreviewStore } from "@/desktop/stores/snapPreviewStore";
import {
  TASKBAR_HEIGHT,
  useWindowManager,
} from "@/desktop/stores/windowManager";

export function useWindowDrag(
  windowId: string,
  frameRef: RefObject<HTMLDivElement | null>,
) {
  const moveWindow = useWindowManager((s) => s.moveWindow);
  const focusWindow = useWindowManager((s) => s.focusWindow);
  const resizeWindow = useWindowManager((s) => s.resizeWindow);
  const getState = useWindowManager.getState;

  const showSnap = useSnapPreviewStore((s) => s.show);
  const hideSnap = useSnapPreviewStore((s) => s.hide);

  const draggingRef = useRef(false);
  const didMoveRef = useRef(false);
  const offsetRef = useRef({ x: 0, y: 0 });
  const currentPositionRef = useRef({ x: 0, y: 0 });
  const pointerRef = useRef({ x: 0, y: 0 });
  const lastSnapRef = useRef<SnapResult>(null);

  const handlePointerDown = (e: ReactPointerEvent) => {
    const state = getState();

    const win = state.windows[windowId];
    if (!win || win.isMaximized || !frameRef.current) {
      return;
    }

    draggingRef.current = true;
    didMoveRef.current = false;

    focusWindow(windowId);

    offsetRef.current = {
      x: e.clientX - win.position.x,
      y: e.clientY - win.position.y,
    };

    currentPositionRef.current = { x: win.position.x, y: win.position.y };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!draggingRef.current || !frameRef.current) {
      return;
    }

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight - TASKBAR_HEIGHT;

    // Stop movement if the cursor reaches horizontal screen edges
    if (e.clientX <= 0 || e.clientX >= viewportWidth) {
      return;
    }

    // Stop movement if the cursor reaches vertical screen edges
    if (e.clientY <= 0 || e.clientY >= viewportHeight) {
      return;
    }

    didMoveRef.current = true;

    const x = e.clientX - offsetRef.current.x;
    const y = e.clientY - offsetRef.current.y;

    currentPositionRef.current = { x, y };

    pointerRef.current = { x: e.clientX, y: e.clientY };

    const snap = detectSnap(e.clientX, e.clientY);

    if (snap !== lastSnapRef.current) {
      lastSnapRef.current = snap;
      if (snap) {
        showSnap(snap);
      } else {
        hideSnap();
      }
    }

    frameRef.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handlePointerUp = () => {
    if (!draggingRef.current) {
      return;
    }

    draggingRef.current = false;
    lastSnapRef.current = null;

    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerup", handlePointerUp);

    // Only commit position to store when we actually dragged; a simple focus
    // click must not overwrite or clear the position (avoids window jumping).
    if (didMoveRef.current && frameRef.current) {
      const { x, y } = pointerRef.current;

      const snap = detectSnap(x, y);

      if (snap) {
        const geometry = getSnapGeometry(snap);

        if (geometry) {
          resizeWindow(windowId, geometry.size);
          moveWindow(windowId, geometry.position);

          frameRef.current.style.transform = "";

          hideSnap();

          return;
        }
      }

      // Normal drag commit
      moveWindow(windowId, currentPositionRef.current);

      frameRef.current.style.transform = "";
    }
  };

  return { handlePointerDown };
}
