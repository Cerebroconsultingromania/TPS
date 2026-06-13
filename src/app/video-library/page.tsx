"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Play, Lock } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/FadeIn";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BRAND } from "@/lib/utils";
import { videoCategories } from "@/data/content";

const sampleExercises = [
  { title: "Lateral Shuffle Progression", category: "Agility", duration: "4:32" },
  { title: "Medicine Ball Rotational Throw", category: "Strength", duration: "3:15" },
  { title: "A-Skip Speed Drill", category: "Speed", duration: "2:48" },
  { title: "Single Leg Balance Series", category: "Coordination", duration: "5:10" },
  { title: "Court Movement Patterns", category: "Movement Skills", duration: "6:22" },
  { title: "Tennis-Specific HIIT Circuit", category: "Tennis Conditioning", duration: "8:45" },
  { title: "Dynamic Warm-Up Protocol", category: "Warm-Up", duration: "7:30" },
  { title: "Reactive Agility Ladder", category: "Agility", duration: "3:55" },
];

export default function VideoLibraryPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered =
    activeCategory
      ? sampleExercises.filter(
          (e) =>
            e.category.toLowerCase().replace(/\s+/g, "-") === activeCategory ||
            e.category.toLowerCase().includes(activeCategory.replace(/-/g, " "))
        )
      : sampleExercises;

  return (
    <>
      <section className="relative bg-charcoal pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <Badge className="mb-4">Video Exercise Library™</Badge>
            <h1 className="font-display text-5xl font-bold text-white md:text-6xl">
              300+ Professional Exercise Demonstrations
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/60">
              Part of the {BRAND.systemName} — not sold separately. Browse sample
              exercises below, then invest in the complete system for full access.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Categories */}
      <section className="sticky top-[72px] z-40 border-b border-white/10 bg-charcoal/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveCategory(null)}
              className={`shrink-0 rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                !activeCategory
                  ? "bg-tennis text-charcoal"
                  : "text-white/60 hover:text-white"
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
                    ? "bg-tennis text-charcoal"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Category Showcase */}
      <section className="bg-charcoal py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {(activeCategory
              ? videoCategories.filter((c) => c.id === activeCategory)
              : videoCategories
            ).map((category) => (
              <StaggerItem key={category.id}>
                <div className="group relative aspect-video overflow-hidden rounded-sm">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-tennis/90 p-3 opacity-80 transition-all group-hover:scale-110 group-hover:opacity-100">
                      <Play className="h-5 w-5 text-charcoal" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <Badge className="mb-2 text-[10px]">
                      {category.count} exercises
                    </Badge>
                    <h3 className="font-display text-lg font-bold text-white">
                      {category.title}
                    </h3>
                    <p className="mt-1 text-xs text-white/50">
                      {category.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Sample Exercises */}
      <section className="bg-cream py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-display text-3xl font-bold text-charcoal">
              Sample Exercises
            </h2>
            <p className="mt-2 text-charcoal/60">
              Preview a selection of exercises. Full library access included with
              the complete system.
            </p>
          </FadeIn>

          <div className="mt-12 grid gap-4">
            {filtered.map((exercise, i) => (
              <FadeIn key={exercise.title} delay={i * 0.05}>
                <div className="flex items-center gap-4 rounded-sm border border-charcoal/10 bg-white p-4 transition-all hover:border-tennis/20">
                  <div className="relative flex h-16 w-24 shrink-0 items-center justify-center rounded-sm bg-charcoal">
                    <Play className="h-5 w-5 text-tennis" />
                    {i > 2 && (
                      <div className="absolute inset-0 flex items-center justify-center rounded-sm bg-charcoal/80">
                        <Lock className="h-4 w-4 text-white/60" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-charcoal">
                      {exercise.title}
                    </h3>
                    <p className="text-sm text-charcoal/50">
                      {exercise.category} · {exercise.duration}
                    </p>
                  </div>
                  {i <= 2 ? (
                    <Badge variant="outline" className="border-tennis/30 text-tennis-dark">
                      Free Preview
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="border-charcoal/10">
                      System Access
                    </Badge>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3} className="mt-16 text-center">
            <p className="text-charcoal/60">
              Unlock all 300+ exercises with the complete system
            </p>
            <Button size="lg" className="mt-6" asChild>
              <Link href="/system">Get the Complete System</Link>
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
