"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Play, Lock, X } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/FadeIn";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BRAND } from "@/lib/utils";
import { videoCategories } from "@/data/content";
import {
  useVideoCategoryMedia,
  useSiteMedia,
} from "@/components/providers/SiteMediaProvider";
import { PageHeroBanner } from "@/components/shared/PageHeroBanner";

const sampleExercises = [
  {
    title: "Court Movement Flow — Star Demo",
    category: "Speed",
    duration: "1:30",
    preview: true,
    videoKey: "speed",
  },
  {
    title: "Agility Patterns — Star Demo",
    category: "Agility",
    duration: "1:45",
    preview: true,
    videoKey: "agility",
  },
  {
    title: "Tennis Conditioning Circuit",
    category: "Tennis Conditioning",
    duration: "2:10",
    preview: true,
    videoKey: "tennis-conditioning",
  },
  {
    title: "Medicine Ball Rotational Throw",
    category: "Strength",
    duration: "3:15",
    preview: false,
  },
  {
    title: "Single Leg Balance Series",
    category: "Coordination",
    duration: "5:10",
    preview: false,
  },
  {
    title: "Court Movement Patterns",
    category: "Movement Skills",
    duration: "6:22",
    preview: false,
  },
  {
    title: "Dynamic Warm-Up Protocol",
    category: "Warm-Up",
    duration: "7:30",
    preview: false,
  },
  {
    title: "Reactive Agility Ladder",
    category: "Agility",
    duration: "3:55",
    preview: false,
  },
];

function CategoryShowcase({
  id,
  title,
  count,
  description,
  onPlay,
}: {
  id: string;
  title: string;
  count: number;
  description: string;
  onPlay: (url: string, title: string) => void;
}) {
  const { image, videoUrl } = useVideoCategoryMedia(id);
  return (
    <button
      type="button"
      onClick={() => {
        if (videoUrl) onPlay(videoUrl, title);
      }}
      className="group relative aspect-video w-full overflow-hidden rounded-sm border border-surface-muted text-left"
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="rounded-full bg-tennis-brand/90 p-3 opacity-80 transition-all group-hover:scale-110 group-hover:opacity-100">
          <Play className="h-5 w-5 text-ink" fill="currentColor" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <Badge className="mb-2 text-[10px]">
          {videoUrl ? "Star demo" : `${count} exercises`}
        </Badge>
        <h3 className="font-display text-lg font-bold text-white">{title}</h3>
        <p className="mt-1 text-xs text-white/70">{description}</p>
      </div>
    </button>
  );
}

export default function VideoLibraryPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [player, setPlayer] = useState<{ url: string; title: string } | null>(null);
  const { pages, videoCategories: mediaCats, star } = useSiteMedia();

  const videoByCategory = useMemo(() => {
    const map: Record<string, string> = {};
    for (const c of mediaCats) {
      if (c.videoUrl) map[c.id] = c.videoUrl;
    }
    return map;
  }, [mediaCats]);

  const filtered = activeCategory
    ? sampleExercises.filter(
        (e) =>
          e.category.toLowerCase().replace(/\s+/g, "-") === activeCategory ||
          e.category.toLowerCase().includes(activeCategory.replace(/-/g, " "))
      )
    : sampleExercises;

  return (
    <>
      <PageHeroBanner image={pages.videoLibrary.hero}>
        <FadeIn>
          <Badge className="mb-4 border-white/20 bg-white/10 text-white">
            Video Exercise Library™
          </Badge>
          <h1 className="font-display text-5xl font-bold text-white md:text-6xl">
            300+ Professional Exercise Demonstrations
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/80">
            Part of the {BRAND.systemName} — featuring our junior star athlete in
            sample demos. Browse below, then invest in the complete system for full
            access.
          </p>
        </FadeIn>
      </PageHeroBanner>

      <section className="bg-cream py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Badge className="mb-3 border-court/20 bg-court-soft text-court">
                Star Athlete Demos
              </Badge>
              <h2 className="font-display text-3xl font-bold text-ink">
                Exerciții cu starul nostru
              </h2>
              <p className="mt-2 max-w-xl text-ink-muted">
                Demonstrații reale din bibliotecă — aceeași sportivă pe care o vezi
                pe homepage.
              </p>
            </div>
            <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-court/30 shadow-soft">
              <Image
                src={star.portraitBlue}
                alt="Star athlete"
                fill
                className="object-cover object-top"
              />
            </div>
          </FadeIn>

          <div className="grid gap-6 lg:grid-cols-2">
            {[
              {
                url: "/videos/star-exercise-01.mp4",
                title: "Court Movement Flow",
                poster: star.goldTrophy,
              },
              {
                url: "/videos/star-exercise-02.mp4",
                title: "Agility & Conditioning",
                poster: star.portraitWinner,
              },
            ].map((v) => (
              <FadeIn key={v.url}>
                <button
                  type="button"
                  onClick={() => setPlayer({ url: v.url, title: v.title })}
                  className="group relative aspect-video w-full overflow-hidden rounded-sm border border-surface-muted bg-charcoal text-left shadow-soft"
                >
                  <Image
                    src={v.poster}
                    alt={v.title}
                    fill
                    className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-charcoal/35" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-tennis-brand p-5 shadow-card transition-transform group-hover:scale-110">
                      <Play className="h-7 w-7 text-ink" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="font-display text-xl font-bold text-white">{v.title}</p>
                    <p className="text-sm text-white/70">Free preview · Star athlete</p>
                  </div>
                </button>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="sticky top-[72px] z-40 border-b border-white/10 bg-charcoal/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveCategory(null)}
              className={`shrink-0 rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                !activeCategory
                  ? "bg-tennis-brand text-ink"
                  : "text-white/70 hover:text-white"
              }`}
            >
              All
            </button>
            {videoCategories.map((cat) => (
              <button
                key={cat.id}
                id={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeCategory === cat.id
                    ? "bg-tennis-brand text-ink"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {(activeCategory
              ? videoCategories.filter((c) => c.id === activeCategory)
              : videoCategories
            ).map((category) => (
              <StaggerItem key={category.id}>
                <CategoryShowcase
                  id={category.id}
                  title={category.title}
                  count={category.count}
                  description={category.description}
                  onPlay={(url, title) => setPlayer({ url, title })}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-display text-3xl font-bold text-ink">
              Sample Exercises
            </h2>
            <p className="mt-2 text-ink-muted">
              Preview a selection of exercises. Full library access included with
              the complete system.
            </p>
          </FadeIn>

          <div className="mt-12 grid gap-4">
            {filtered.map((exercise, i) => {
              const videoUrl =
                exercise.videoKey && videoByCategory[exercise.videoKey]
                  ? videoByCategory[exercise.videoKey]
                  : "";
              const unlocked = exercise.preview && Boolean(videoUrl);
              return (
                <FadeIn key={exercise.title} delay={i * 0.05}>
                  <button
                    type="button"
                    disabled={!unlocked}
                    onClick={() => {
                      if (unlocked && videoUrl) {
                        setPlayer({ url: videoUrl, title: exercise.title });
                      }
                    }}
                    className="flex w-full items-center gap-4 rounded-sm border border-surface-muted bg-white p-4 text-left transition-all hover:border-court/20 disabled:cursor-default"
                  >
                    <div className="relative flex h-16 w-24 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-court-dark">
                      {unlocked ? (
                        <Image
                          src={star.portraitBlue}
                          alt=""
                          fill
                          className="object-cover opacity-70"
                        />
                      ) : null}
                      <Play className="relative z-10 h-5 w-5 text-tennis-brand" />
                      {!unlocked && (
                        <div className="absolute inset-0 flex items-center justify-center rounded-sm bg-court-dark/80">
                          <Lock className="h-4 w-4 text-white/70" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-ink">{exercise.title}</h3>
                      <p className="text-sm text-ink-muted">
                        {exercise.category} · {exercise.duration}
                      </p>
                    </div>
                    {unlocked ? (
                      <Badge variant="outline" className="border-court/30 text-court">
                        Free Preview
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-surface-muted">
                        System Access
                      </Badge>
                    )}
                  </button>
                </FadeIn>
              );
            })}
          </div>

          <FadeIn delay={0.3} className="mt-16 text-center">
            <p className="text-ink-muted">
              Unlock all 300+ exercises with the complete system
            </p>
            <Button size="lg" className="mt-6" asChild>
              <Link href="/system">Get the Complete System</Link>
            </Button>
          </FadeIn>
        </div>
      </section>

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
    </>
  );
}
