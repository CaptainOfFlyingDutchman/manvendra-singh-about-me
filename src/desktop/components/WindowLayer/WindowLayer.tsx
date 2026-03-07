import { WindowFrame } from "@/desktop/components/WindowFrame/WindowFrame";
import { useWindowManager } from "@/desktop/stores/windowManager";

export function WindowLayer() {
  const windows = useWindowManager((s) => s.windows);

  const visibleWindows = Object.values(windows).filter(
    (win) => !win.isMinimized,
  );

  return (
    <>
      {visibleWindows.map((win) => (
        <WindowFrame key={win.id} window={win} />
      ))}
    </>
  );
}
