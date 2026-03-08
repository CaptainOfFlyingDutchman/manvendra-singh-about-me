import { useSnapPreviewStore } from "@/desktop/stores/snapPreviewStore";
import styles from "./SnapOverlay.module.css";

export function SnapOverlay() {
  const snap = useSnapPreviewStore((s) => s.snap);

  if (!snap) {
    return null;
  }

  return <div className={`${styles.overlay} ${styles[snap]}`} />;
}
