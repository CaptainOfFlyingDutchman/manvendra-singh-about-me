import { useWindowManager } from "@/desktop/stores/windowManager";

export function TestButton() {
  const openWindow = useWindowManager((s) => s.openWindow);

  const handleClick = () => {
    openWindow({
      appType: "browser",
      title: "Google Window",
      payload: {
        url: "https://www.google.com",
      },
    });
  };
  return (
    <button type="button" onClick={handleClick}>
      OpenTestWindow
    </button>
  );
}
