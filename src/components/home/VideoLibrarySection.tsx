"use client";

import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/FadeIn";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { videoCategories } from "@/data/content";

export function VideoLibrarySection() {
  return (
    <section className="relative bg-charcoal py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Badge className="mb-4">Video Exercise Library™</Badge>
            <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
              300+ Professional Exercise Demonstrations
            </h2>
            <p className="mt-4 max-w-xl text-white/60">
              A comprehensive video library integrated into the complete
              system — organized by category with coaching cues and
              age-specific progressions.
            </p>
          </div>
          <Button variant="secondary" asChild>
            <Link href="/video-library">Browse Full Library</Link>
          </Button>
        </FadeIn>

        {/* Netflix-style rows */}
        <div className="mt-12 space-y-8">
          <StaggerContainer className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {videoCategories.map((category) => (
              <StaggerItem key={category.id} className="shrink-0">
                <Link
                  href={`/video-library#${category.id}`}
                  className="group block w-72 md:w-80"
                >
                  <div className="relative aspect-video overflow-hidden rounded-sm">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="rounded-full bg-tennis/90 p-4">
                        <Play className="h-6 w-6 text-charcoal" fill="currentColor" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <span className="text-xs font-semibold uppercase tracking-wider text-tennis">
                        {category.count} exercises
                      </span>
                      <h3 className="font-display text-xl font-bold text-white">
                        {category.title}
                      </h3>
                    </div>
                  </div>
                </Link>
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
    </section>
  );
}
