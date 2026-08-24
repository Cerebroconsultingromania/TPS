"use client";

import Image from "next/image";
import { Award, CheckCircle } from "lucide-react";
import { FadeIn } from "@/components/shared/FadeIn";
import { Badge } from "@/components/ui/badge";
import { authorBio } from "@/data/testimonials";
import { useSiteMedia } from "@/components/providers/SiteMediaProvider";

export function AuthorSection() {
  const { author } = useSiteMedia();
  return (
    <section data-analytics-section="author" className="relative overflow-hidden bg-court-gradient py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-radial from-tennis-brand/10 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <FadeIn direction="left" className="relative">
            <div className="relative aspect-[3/4] max-w-md overflow-hidden rounded-xl border border-white/20 shadow-card">
              <Image
                src={author}
                alt={authorBio.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-court-dark/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <Badge className="mb-2 border-white/20 bg-white/10 text-white">
                  System Creator
                </Badge>
                <h3 className="font-display text-3xl font-bold text-white">
                  {authorBio.name}
                </h3>
                <p className="text-tennis-brand">{authorBio.title}</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 hidden rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm lg:block">
              <Award className="mb-2 h-8 w-8 text-tennis-brand" />
              <p className="font-display text-3xl font-bold text-white">15+</p>
              <p className="text-xs uppercase tracking-wider text-white/70">
                Years Experience
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="right">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
              About the Creator
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold text-white md:text-5xl">
              Elite Strength & Conditioning Coach
            </h2>
            <p className="mt-2 text-tennis-brand">{authorBio.subtitle}</p>

            <div className="mt-8 space-y-4">
              {authorBio.bio.map((paragraph) => (
                <p key={paragraph.slice(0, 30)} className="text-white/80">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-10">
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/70">
                Key Achievements
              </h4>
              <div className="grid gap-3 sm:grid-cols-2">
                {authorBio.achievements.map((achievement) => (
                  <div key={achievement} className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-tennis-brand" />
                    <span className="text-sm text-white/90">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/70">
                Athletes Coached
              </h4>
              <div className="flex flex-wrap gap-2">
                {authorBio.athletesCoached.map((athlete) => (
                  <span
                    key={athlete}
                    className="rounded-md border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/85"
                  >
                    {athlete}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
