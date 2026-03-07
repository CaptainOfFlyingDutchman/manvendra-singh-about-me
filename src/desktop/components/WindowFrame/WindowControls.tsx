"use client";

import { useWindowManager } from "@/desktop/stores/windowManager";

import styles from "./WindowControls.module.css";

type WindowControlsProps = {
  windowId: string;
};

export function WindowControls({ windowId }: WindowControlsProps) {
  const closeWindow = useWindowManager((s) => s.closeWindow);
  const minimizeWindow = useWindowManager((s) => s.minimizeWindow);
  const maximizeWindow = useWindowManager((s) => s.maximizeWindow);

  return (
    <div className={styles.controls}>
      <button
        type="button"
        className={`${styles.button} ${styles.minimize}`}
        onClick={() => minimizeWindow(windowId)}
      >
        —
      </button>

      <button
        type="button"
        className={`${styles.button} ${styles.maximize}`}
        onClick={() => maximizeWindow(windowId)}
      >
        ▢
      </button>

      <button
        type="button"
        className={`${styles.button} ${styles.close}`}
        onClick={() => closeWindow(windowId)}
      >
        ✕
      </button>
    </div>
  );
}
