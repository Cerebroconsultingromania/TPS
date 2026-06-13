"use client";

import dynamic from "next/dynamic";

const ScrollScene = dynamic(
  () =>
    import("@/components/3d/ScrollScene").then((mod) => mod.ScrollScene),
  { ssr: false }
);

export function ScrollSceneWrapper() {
  return <ScrollScene />;
}
