# Manvendra Singh — About Me

A personal about-me site styled like **Windows 7**, with a desktop and a **Windows 7–style window manager**. Content is presented in draggable, resizable windows that mimic the classic Aero look and behavior. This README is intended for developers and AI reviewers (e.g. ChatGPT) to understand the codebase and suggest future improvements.

## Features

- **Windows 7–style desktop** — Taskbar, Start menu, and desktop icons. Apps are launched from the Start menu or by double-clicking desktop icons.
- **Full window manager** — Open, close, focus, minimize, maximize, restore, move, and resize are all implemented. Cascade positioning when opening new windows.
- **Edge snap** — Drag a window to the left, right, or top edge to snap; a preview overlay shows the target region. Snap geometry is applied on release; dragging away restores the previous size/position.
- **App types** — Browser (iframe), PDF viewer, and image viewer. The app registry drives both the Start menu and desktop icons.
- **State** — Zustand + Immer with multiple stores: `windowManager` (windows), `startMenuStore` (menu open/close), `snapPreviewStore` (which edge preview is shown).

## Tech Stack

- **Next.js 16** (App Router) with **React 19**
- **TypeScript**
- **Zustand** (state) + **Immer** (immutable updates)
- **Biome** (lint & format)
- **React Compiler** (Babel plugin, from package.json)

## Getting Started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Scripts

| Command       | Description              |
|--------------|--------------------------|
| `npm run dev`   | Start development server |
| `npm run build` | Production build        |
| `npm run start` | Start production server  |
| `npm run lint`  | Run Biome check          |
| `npm run format`| Format with Biome        |

## Project Structure

- **`src/app/`** — Next.js app (layout, page, globals).
- **`src/desktop/`** — Desktop and window manager:
  - **`apps/`** — `appRegistry.ts` (DesktopApp list); `renderers/` (AppRenderer, BrowserApp, PdfViewerApp, ImageViewerApp).
  - **`components/`** — DesktopSurface, DesktopIcons/DesktopIcon, WindowLayer, WindowFrame/WindowControls, Taskbar/TaskbarItem, StartButton, StartMenu, SnapOverlay (CSS modules where present).
  - **`core/`** — `windowUtils.ts` (getTopWindow), `snapWindow.ts` (detectSnap, getSnapGeometry).
  - **`hooks/`** — useWindowDrag (drag + snap), useWindowResize (8-direction resize).
  - **`stores/`** — windowManager, startMenuStore, snapPreviewStore.
  - **`types/`** — window.ts (AppType, AppPayloadMap, WindowInstance, OpenWindowConfig, WindowInstanceVariant, etc.).

## Architecture / Data Flow

- **Entry**: `src/app/page.tsx` renders `<DesktopSurface />`.
- **Desktop**: DesktopSurface composes DesktopIcons, WindowLayer (one WindowFrame per window), SnapOverlay, and Taskbar. The Taskbar includes StartButton, a list of TaskbarItems (one per open window), and the StartMenu.
- **Stores**: `windowManager` is the single source of truth for all windows (position, size, focus, minimized, maximized). `startMenuStore` holds menu open state. `snapPreviewStore` holds which edge (left/right/top) preview is active during drag.
- **Window interaction**: WindowFrame uses `useWindowDrag` and `useWindowResize`. Drag integrates with snap: `detectSnap` and `getSnapGeometry` (from `core/snapWindow.ts`) plus `snapPreviewStore` for the overlay. Resize respects `MIN_WINDOW_WIDTH` and `MIN_WINDOW_HEIGHT`.

## Window Manager API

The store is `useWindowManager` (from `src/desktop/stores/windowManager.ts`).

- **`openWindow(config)`** — Implemented; cascade positioning; returns window id. Config: `appType`, `title`, `payload`, optional `initialSize`, `initialPosition`.
- **`closeWindow(id)`**, **`focusWindow(id)`**, **`minimizeWindow(id)`**, **`maximizeWindow(id)`**, **`restoreWindow(id)`**, **`moveWindow(id, pos)`**, **`resizeWindow(id, size)`** — All implemented.
- **Internal** — `setPreviousGeometry(id, geometry)`, `clearPreviousGeometry(id)` (used for maximize/restore and snap).
- **Constants** — `MIN_WINDOW_WIDTH`, `MIN_WINDOW_HEIGHT`, `TASKBAR_HEIGHT` (exported).
- **App types and payloads** — `browser`: `{ url, title }`; `pdf`: `{ url, page? }`; `image`: `{ src, alt? }`; `custom`: `{ componentId, props? }` (custom is not yet rendered in AppRenderer).

## Adding New Apps

1. Add an entry to the `apps` array in `src/desktop/apps/appRegistry.ts` (id, title, appType, payload).
2. If introducing a new app type: extend `AppType` and `AppPayloadMap` in `src/desktop/types/window.ts`, add a case in `AppRenderer` and implement a new renderer component in `src/desktop/apps/renderers/`.

## Future Improvement Ideas

- Taskbar window grouping or overflow when many windows are open.
- Keyboard shortcuts (e.g. close, minimize, switch window).
- Persist window positions/sizes (e.g. localStorage or backend).
- Implement and wire up the `custom` app type in AppRenderer.
- Accessibility: focus trap in windows, ARIA roles, keyboard navigation.
- Unit or integration tests for stores, hooks, and core utilities.

## License

Private project.
