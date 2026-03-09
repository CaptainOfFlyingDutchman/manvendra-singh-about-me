import { useRef } from "react";
import { AppRenderer } from "@/desktop/apps/renderers/AppRenderer";
import { WindowControls } from "@/desktop/components/WindowFrame/WindowControls";
import { useWindowDrag } from "@/desktop/hooks/useWindowDrag";
import { useWindowResize } from "@/desktop/hooks/useWindowResize";
import { useWindowManager } from "@/desktop/stores/windowManager";
import type { WindowInstanceVariant } from "@/desktop/types/window";
import styles from "./WindowFrame.module.css";

type WindowFrameProps = {
  window: WindowInstanceVariant;
};

export function WindowFrame({ window }: WindowFrameProps) {
  const focusWindow = useWindowManager((s) => s.focusWindow);
  const frameRef = useRef<HTMLDivElement | null>(null);

  const resizeE = useWindowResize(window.id, "e", frameRef);
  const resizeS = useWindowResize(window.id, "s", frameRef);
  const resizeW = useWindowResize(window.id, "w", frameRef);
  const resizeN = useWindowResize(window.id, "n", frameRef);
  const resizeNE = useWindowResize(window.id, "ne", frameRef);
  const resizeNW = useWindowResize(window.id, "nw", frameRef);
  const resizeSW = useWindowResize(window.id, "sw", frameRef);
  const resizeSE = useWindowResize(window.id, "se", frameRef);

  const { handlePointerDown } = useWindowDrag(window.id, frameRef);

  const style = {
    zIndex: window.zIndex,
    width: window.size.width,
    height: window.size.height,
    transform: `translate(${window.position.x}px, ${window.position.y}px)`,
  };

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: a box is required
    <div
      ref={frameRef}
      className={styles.window}
      style={style}
      onMouseDown={() => focusWindow(window.id)}
      onPointerDown={handlePointerDown}
    >
      <div className={styles.titleBar}>
        <div className={styles.title}>{window.title}</div>

        <WindowControls windowId={window.id} />
      </div>

      <div className={styles.content}>
        <AppRenderer window={window} />
      </div>

      <div
        className={styles.resizeE}
        onPointerDown={resizeE.handlePointerDown}
      />
      <div
        className={styles.resizeS}
        onPointerDown={resizeS.handlePointerDown}
      />
      <div
        className={styles.resizeW}
        onPointerDown={resizeW.handlePointerDown}
      />
      <div
        className={styles.resizeN}
        onPointerDown={resizeN.handlePointerDown}
      />

      <div
        className={styles.resizeNE}
        onPointerDown={resizeNE.handlePointerDown}
      />
      <div
        className={styles.resizeNW}
        onPointerDown={resizeNW.handlePointerDown}
      />
      <div
        className={styles.resizeSE}
        onPointerDown={resizeSE.handlePointerDown}
      />
      <div
        className={styles.resizeSW}
        onPointerDown={resizeSW.handlePointerDown}
      />
    </div>
  );
}
