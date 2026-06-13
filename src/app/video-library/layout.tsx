import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video Exercise Library",
  description:
    "300+ professional exercise demonstrations included in the Tennis Performance Development System™.",
};

export default function VideoLibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
