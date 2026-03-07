"use client";

import { DesktopSurface } from "@/desktop/components/DesktopSurface/DesktopSurface";
import { TestButton } from "@/TestButton";

export default function Home() {
  return (
    <div>
      <div>About Me — Manvendra Singh</div>
      <TestButton />
      <DesktopSurface />
    </div>
  );
}
