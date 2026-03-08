import type { DesktopApp } from "@/desktop/apps/appRegistry";
import { useWindowManager } from "@/desktop/stores/windowManager";
import styles from "./DesktopIcon.module.css";

type DesktopIconProps = {
  app: DesktopApp;
};

export function DesktopIcon({ app }: DesktopIconProps) {
  const openWindow = useWindowManager((s) => s.openWindow);

  const handleDoubleClick = () => {
    openWindow({
      appType: app.appType,
      title: app.title,
      payload: app.payload,
    });
  };

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: need a box for style purposes
    <div className={styles.icon} onDoubleClick={handleDoubleClick}>
      <div className={styles.image}>📄</div>
      <div className={styles.label}>{app.title}</div>
    </div>
  );
}
