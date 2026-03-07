import { useWindowManager } from "@/desktop/stores/windowManager";
import type { WindowInstance } from "@/desktop/types/window";

import styles from "./WindowFrame.module.css";

type WindowFrameProps = {
  window: WindowInstance;
};

export function WindowFrame({ window }: WindowFrameProps) {
  const focusWindow = useWindowManager((s) => s.focusWindow);

  const style = {
    zIndex: window.zIndex,
    width: window.size.width,
    height: window.size.height,
    transform: `translate(${window.position.x}px, ${window.position.y}px)`,
  };

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: a box is required
    <div
      className={styles.window}
      style={style}
      onMouseDown={() => focusWindow(window.id)}
    >
      <div className={styles.titleBar}>{window.title}</div>

      <div className={styles.content}>Window Content</div>
    </div>
  );
}
