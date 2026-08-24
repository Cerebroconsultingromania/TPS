"use client";

import { createContext, useContext } from "react";
import type { SiteMedia } from "@/lib/media-types";

const SiteMediaContext = createContext<SiteMedia | null>(null);

export function SiteMediaProvider({
  media,
  children,
}: {
  media: SiteMedia;
  children: React.ReactNode;
}) {
  return (
    <SiteMediaContext.Provider value={media}>{children}</SiteMediaContext.Provider>
  );
}

export function useSiteMedia(): SiteMedia {
  const ctx = useContext(SiteMediaContext);
  if (!ctx) {
    throw new Error("useSiteMedia must be used within SiteMediaProvider");
  }
  return ctx;
}

export function useBlogImage(slug: string): string {
  const media = useSiteMedia();
  return media.blog.find((b) => b.slug === slug)?.image ?? media.hero.main;
}

export function useVideoCategoryImage(id: string): string {
  const media = useSiteMedia();
  return media.videoCategories.find((c) => c.id === id)?.image ?? media.hero.main;
}

export function useVideoCategoryMedia(id: string): { image: string; videoUrl: string } {
  const media = useSiteMedia();
  const cat = media.videoCategories.find((c) => c.id === id);
  return {
    image: cat?.image ?? media.hero.main,
    videoUrl: cat?.videoUrl ?? "",
  };
}
