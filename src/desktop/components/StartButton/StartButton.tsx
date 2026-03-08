import { useStartMenuStore } from "@/desktop/stores/startMenuStore";
import styles from "./StartButton.module.css";

export function StartButton() {
  const toggle = useStartMenuStore((s) => s.toggle);

  return (
    <button type="button" className={styles.startButton} onClick={toggle}>
      Start
    </button>
  );
}
