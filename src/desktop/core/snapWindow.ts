import { TASKBAR_HEIGHT } from "@/desktop/stores/windowManager";

export type SnapResult = "left" | "right" | "top" | null;

export function detectSnap(x: number, y: number): SnapResult {
  const threshold = 20;

  const screenWidth = window.innerWidth;
  // const screenHeight = window.innerHeight;

  if (y <= threshold) {
    return "top";
  }

  if (x <= threshold) {
    return "left";
  }

  if (x >= screenWidth - threshold) {
    return "right";
  }

  return null;
}

export function getSnapGeometry(type: SnapResult) {
  const width = window.innerWidth;
  const height = window.innerHeight - TASKBAR_HEIGHT;

  switch (type) {
    case "left": {
      return {
        position: { x: 0, y: 0 },
        size: { width: width / 2, height },
      };
    }
    case "right": {
      return {
        position: { x: width / 2, y: 0 },
        size: { width: width / 2, height },
      };
    }
    case "top":
      return {
        position: { x: 0, y: 0 },
        size: { width, height },
      };

    default:
      return null;
  }
}
