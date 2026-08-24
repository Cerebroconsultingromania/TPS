"use client";

import Link from "next/link";
import Image from "next/image";
import { Award, CheckCircle, Quote } from "lucide-react";
import { FadeIn } from "@/components/shared/FadeIn";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BRAND } from "@/lib/utils";
import { authorBio, testimonials } from "@/data/testimonials";
import { useSiteMedia } from "@/components/providers/SiteMediaProvider";
import { PageHeroBanner } from "@/components/shared/PageHeroBanner";

export default function AboutPage() {
  const { author, pages } = useSiteMedia();
  const portrait = pages.about.portrait || author;
  const coachTestimonials = testimonials.filter((t) => t.type === "Coach");

  return (
    <>
      <PageHeroBanner image={pages.about.hero}>
        <FadeIn>
          <Badge className="mb-4 border-white/20 bg-white/10 text-white">
            System Creator
          </Badge>
          <h1 className="font-display text-5xl font-bold text-white md:text-6xl">
            {authorBio.name}
          </h1>
          <p className="mt-4 text-xl text-tennis-brand">{authorBio.title}</p>
          <p className="mt-2 text-white/70">{authorBio.subtitle}</p>
        </FadeIn>
      </PageHeroBanner>

      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <FadeIn direction="left">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                <Image
                  src={portrait}
                  alt={authorBio.name}
                  fill
                  className="object-cover"
                />
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <h2 className="font-display text-3xl font-bold text-ink">
                Professional Biography
              </h2>
              <div className="mt-6 space-y-4">
                {authorBio.bio.map((paragraph) => (
                  <p key={paragraph.slice(0, 30)} className="text-ink-muted leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-10 rounded-sm border border-surface-muted bg-white p-6">
                <Award className="mb-3 h-6 w-6 text-court" />
                <p className="font-display text-lg font-bold text-ink">
                  Why This System Exists
                </p>
                <p className="mt-2 text-sm text-ink-muted">
                  After years of watching junior tennis programs rely on random
                  exercises and outdated methods, {authorBio.name.split(" ").slice(-1)[0]} created
                  the {BRAND.systemName} to give coaches and academies a complete,
                  science-based framework for building elite junior athletes.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn className="text-center">
            <h2 className="font-display text-4xl font-bold text-white">
              Achievements & Credentials
            </h2>
          </FadeIn>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {authorBio.achievements.map((achievement, i) => (
              <FadeIn key={achievement} delay={i * 0.05}>
                <div className="flex items-start gap-3 rounded-sm border border-white/20 bg-white/10 p-6">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-tennis-brand" />
                  <span className="text-white/90">{achievement}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-display text-3xl font-bold text-ink">
              What Coaches Say
            </h2>
          </FadeIn>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {coachTestimonials.map((t) => (
              <FadeIn key={t.author}>
                <div className="rounded-sm border border-surface-muted bg-white p-8">
                  <Quote className="mb-4 h-6 w-6 text-court/30" />
                  <p className="text-ink-muted italic">&ldquo;{t.quote}&rdquo;</p>
                  <p className="mt-4 font-semibold text-ink">{t.author}</p>
                  <p className="text-sm text-ink-muted">
                    {t.role}, {t.organization}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-24">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <FadeIn>
            <h2 className="font-display text-4xl font-bold text-white">
              Experience the Complete System
            </h2>
            <p className="mt-4 text-white/80">
              Built on 15+ years of elite coaching experience. Designed for coaches
              who demand more than random exercises.
            </p>
            <Button size="lg" className="mt-8" asChild>
              <Link href="/system">Explore the Complete System</Link>
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
