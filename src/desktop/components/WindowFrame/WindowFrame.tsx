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

  const { handlePointerDown: handleResizePointerDown, frameRef } =
    useWindowResize(window.id);

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
        className={styles.resizeHandle}
        onPointerDown={handleResizePointerDown}
      />
    </div>
  );
}
