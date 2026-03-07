# Manvendra Singh — About Me

A personal about-me site styled like **Windows 7**, with a desktop and a **Windows 7–style window manager**. Content is presented in draggable, resizable windows that mimic the classic Aero look and behavior.

## Features

- **Windows 7 visual style** — UI inspired by the Windows 7 desktop and window chrome
- **Window manager** — Open, stack, and manage multiple windows (minimize, maximize, restore, move, resize)
- **App types** — Windows can host different content: browser (URLs), PDFs, images, or custom React components
- **Zustand + Immer** — Window state is managed with [Zustand](https://github.com/pmndrs/zustand) and [Immer](https://github.com/immerjs/immer) for predictable updates and devtools support

## Tech Stack

- **Next.js 16** (App Router) with **React 19**
- **TypeScript**
- **Zustand** (state) + **Immer** (immutable updates)
- **Biome** (lint & format)

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

- **`src/app/`** — Next.js app (layout, pages, global styles)
- **`src/desktop/`** — Desktop & window manager
  - **`stores/windowManager.ts`** — Zustand store for windows (open, close, focus, minimize, maximize, move, resize)
  - **`types/window.ts`** — Window and app types (`AppType`, `WindowInstance`, `OpenWindowConfig`, etc.)

## Window Manager API

The window manager (`useWindowManager`) supports:

- **`openWindow(config)`** — Open a new window; returns window id. Config includes `appType`, `title`, `payload`, and optional `initialSize` / `initialPosition`.
- **`closeWindow(id)`** — Close a window *(planned)*
- **`minimizeWindow(id)`** / **`maximizeWindow(id)`** / **`restoreWindow(id)`** — Window state *(planned)*
- **`moveWindow(id, pos)`** / **`resizeWindow(id, size)`** — Position and size *(planned)*

App types: `browser` (URL), `pdf` (URL + page), `image` (src), `custom` (component + props).

## License

Private project.
