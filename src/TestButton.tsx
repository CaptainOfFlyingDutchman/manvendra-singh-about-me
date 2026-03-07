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
    <div>
      <button type="button" onClick={handleClick}>
        OpenTestWindow
      </button>

      <button
        type="button"
        onClick={() => {
          const focus = useWindowManager.getState().focusWindow;
          focus("win_617abbf1-3640-4043-ae43-c91c52c43ab0");
        }}
      >
        Focus window
      </button>

      <button
        type="button"
        onClick={() => {
          const close = useWindowManager.getState().closeWindow;
          close("win_2cf13304-89d0-44c6-9313-43a05363b528");
        }}
      >
        Close window
      </button>
    </div>
  );
}
