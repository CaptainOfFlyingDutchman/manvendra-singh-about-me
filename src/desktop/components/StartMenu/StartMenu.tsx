import { apps } from "@/desktop/apps/appRegistry";
import { useStartMenuStore } from "@/desktop/stores/startMenuStore";
import { useWindowManager } from "@/desktop/stores/windowManager";
import styles from "./StartMenu.module.css";

export function StartMenu() {
  const isOpen = useStartMenuStore((s) => s.isOpen);
  const close = useStartMenuStore((s) => s.close);

  const openWindow = useWindowManager((s) => s.openWindow);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.menu}>
      {apps.map((app) => {
        return (
          <button
            type="button"
            className={styles.item}
            key={app.id}
            onClick={() => {
              openWindow({
                appType: app.appType,
                title: app.title,
                payload: app.payload,
              });

              close();
            }}
          >
            {app.title}
          </button>
        );
      })}
    </div>
  );
}
