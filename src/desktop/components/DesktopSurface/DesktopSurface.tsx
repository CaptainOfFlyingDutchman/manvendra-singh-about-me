"use client";

import { DesktopIcons } from "@/desktop/components/DesktopIcons/DesktopIcons";
import { Taskbar } from "@/desktop/components/Taskbar/Taskbar";
import { WindowLayer } from "@/desktop/components/WindowLayer/WindowLayer";
import styles from "./DesktopSurface.module.css";

export function DesktopSurface() {
  return (
    <div className={styles.desktop}>
      <DesktopIcons />
      <WindowLayer />
      <Taskbar />
    </div>
  );
}
