import { apps } from "@/desktop/apps/appRegistry";
import { DesktopIcon } from "@/desktop/components/DesktopIcons/DesktopIcon";

import styles from "./DesktopIcons.module.css";

export function DesktopIcons() {
  return (
    <div className={styles.container}>
      {apps.map((app) => (
        <DesktopIcon key={app.id} app={app} />
      ))}
    </div>
  );
}
