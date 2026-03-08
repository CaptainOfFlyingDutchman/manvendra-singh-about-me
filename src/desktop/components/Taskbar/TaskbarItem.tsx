import { useWindowManager } from "@/desktop/stores/windowManager";
import type { WindowInstanceVariant } from "@/desktop/types/window";
import styles from "./TaskbarItem.module.css";

type TaskbarItemProps = {
  window: WindowInstanceVariant;
};

export function TaskbarItem({ window }: TaskbarItemProps) {
  const minimizeWindow = useWindowManager((s) => s.minimizeWindow);
  const restoreWindow = useWindowManager((s) => s.restoreWindow);
  const focusWindow = useWindowManager((s) => s.focusWindow);

  const handleClick = () => {
    if (window.isMinimized) {
      restoreWindow(window.id);

      return;
    }

    if (window.isFocused) {
      minimizeWindow(window.id);

      return;
    }

    focusWindow(window.id);
  };

  return (
    <button
      type="button"
      className={`${styles.item} ${window.isFocused ? styles.active : ""}`}
      onClick={handleClick}
    >
      {window.title}
    </button>
  );
}
