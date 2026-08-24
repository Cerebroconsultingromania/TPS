"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Play, X } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/FadeIn";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { videoCategories } from "@/data/content";
import { useVideoCategoryMedia } from "@/components/providers/SiteMediaProvider";

function CategoryCard({
  id,
  title,
  count,
  onPlay,
}: {
  id: string;
  title: string;
  count: number;
  onPlay: (url: string, title: string) => void;
}) {
  const { image, videoUrl } = useVideoCategoryMedia(id);
  return (
    <button
      type="button"
      onClick={() => {
        if (videoUrl) onPlay(videoUrl, title);
        else window.location.href = `/video-library#${id}`;
      }}
      className="group block w-72 text-left md:w-80"
    >
      <div className="relative aspect-video overflow-hidden rounded-sm">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-court-dark/90 via-court/20 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
          <div className="rounded-full bg-tennis-brand p-4">
            <Play className="h-6 w-6 text-ink" fill="currentColor" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-tennis-brand">
            {videoUrl ? "Star demo" : `${count} exercises`}
          </span>
          <h3 className="font-display text-xl font-bold text-white">{title}</h3>
        </div>
      </div>
    </button>
  );
}

export function VideoLibrarySection() {
  const [player, setPlayer] = useState<{ url: string; title: string } | null>(null);

  return (
    <section
      data-analytics-section="video-library"
      className="relative overflow-hidden bg-court-gradient py-24 lg:py-32"
    >
      <div className="absolute inset-0 bg-gradient-radial from-tennis-brand/10 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Badge className="mb-4 border-white/20 bg-white/10 text-white">
              Video Exercise Library™
            </Badge>
            <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
              300+ Professional Exercise Demonstrations
            </h2>
            <p className="mt-4 max-w-xl text-white/80">
              Demonstrații cu starul junior al sistemului — plus progresii pe
              categorii, integrate în pachetul complet.
            </p>
          </div>
          <Button
            size="lg"
            className="bg-tennis-brand text-ink hover:bg-tennis-light"
            variant="secondary"
            asChild
          >
            <Link href="/video-library">Browse Full Library</Link>
          </Button>
        </FadeIn>

        <div className="mt-12 space-y-8">
          <StaggerContainer className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {videoCategories.map((category) => (
              <StaggerItem key={category.id} className="shrink-0">
                <CategoryCard
                  id={category.id}
                  title={category.title}
                  count={category.count}
                  onPlay={(url, title) => setPlayer({ url, title })}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        <FadeIn delay={0.2} className="mt-8 text-center">
          <p className="text-sm text-white/40">
            Included with the complete system — not sold separately
          </p>
        </FadeIn>
      </div>

      {player ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-charcoal/90 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-sm border border-white/15 bg-charcoal shadow-card">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <p className="font-display text-sm font-bold text-white">{player.title}</p>
              <button
                type="button"
                onClick={() => setPlayer(null)}
                className="rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white"
                aria-label="Close video"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <video
              key={player.url}
              src={player.url}
              controls
              autoPlay
              playsInline
              className="aspect-video w-full bg-black"
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
