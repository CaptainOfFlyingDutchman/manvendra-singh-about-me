import type { WindowInstance } from "@/desktop/types/window";

export function getTopWindow(windows: Record<string, WindowInstance>) {
  const values = Object.values(windows);

  if (values.length === 0) {
    return null;
  }

  return values.reduce((top, win) => {
    return win.zIndex > top.zIndex ? win : top;
  });
}
