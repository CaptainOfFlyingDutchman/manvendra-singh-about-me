import { StartButton } from "@/desktop/components/StartButton/StartButton";
import { StartMenu } from "@/desktop/components/StartMenu/StartMenu";
import { TaskbarItem } from "@/desktop/components/Taskbar/TaskbarItem";
import { useWindowManager } from "@/desktop/stores/windowManager";
import styles from "./Taskbar.module.css";

export function Taskbar() {
  const windows = useWindowManager((s) => s.windows);

  const items = Object.values(windows);

  return (
    <div className={styles.taskbar}>
      <StartButton />

      <div className={styles.items}>
        {items.map((win) => (
          <TaskbarItem key={win.id} window={win} />
        ))}
      </div>

      <StartMenu />
    </div>
  );
}
