import { TaskbarItem } from "@/desktop/components/Taskbar/TaskbarItem";
import { useWindowManager } from "@/desktop/stores/windowManager";
import styles from "./Taskbar.module.css";

export function Taskbar() {
  const windows = useWindowManager((s) => s.windows);

  const items = Object.values(windows);

  return (
    <div className={styles.taskbar}>
      <div className={styles.items}>
        {items.map((win) => (
          <TaskbarItem key={win.id} window={win} />
        ))}
      </div>
    </div>
  );
}
