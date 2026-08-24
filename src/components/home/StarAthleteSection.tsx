"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/shared/FadeIn";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSiteMedia } from "@/components/providers/SiteMediaProvider";

export function StarAthleteSection() {
  const { star } = useSiteMedia();

  return (
    <section
      data-analytics-section="star-athlete"
      className="relative overflow-hidden bg-cream py-24 lg:py-32"
    >
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-[0.12]"
        style={{
          backgroundImage: "url(/images/brand/court-frag-diagonal.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="max-w-3xl">
          <Badge className="mb-4 border-court/20 bg-court-soft text-court">
            Junior Star Athlete
          </Badge>
          <h2 className="font-display text-4xl font-bold text-ink md:text-5xl">
            Built for junior champions
          </h2>
          <p className="mt-4 text-lg text-ink-muted">
            Ea este starul sistemului — apare în demonstrațiile din Video Exercise
            Library™. Rezultate reale, pe teren, la nivel de turneu junior.
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-5 md:grid-cols-12">
          <FadeIn className="md:col-span-5">
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-surface-muted shadow-soft">
              <Image
                src={star.portraitBlue}
                alt="Junior star athlete with Junior Tour trophy"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
              />
            </div>
          </FadeIn>

          <div className="flex flex-col gap-5 md:col-span-7">
            <FadeIn delay={0.1}>
              <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-surface-muted shadow-soft">
                <Image
                  src={star.goldTrophy}
                  alt="Junior star athlete with gold trophy at Bradfield"
                  fill
                  className="object-cover object-[center_20%]"
                  sizes="(max-width: 768px) 100vw, 55vw"
                />
              </div>
            </FadeIn>

            <div className="grid gap-5 sm:grid-cols-2">
              <FadeIn delay={0.15}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-surface-muted shadow-soft">
                  <Image
                    src={star.portraitWinner}
                    alt="Junior Tour winner — Girls U14"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-surface-muted shadow-soft">
                  <Image
                    src={star.duo}
                    alt="Junior star athlete tournament moments"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>

        <FadeIn delay={0.25} className="mt-10 flex flex-wrap items-center gap-4">
          <Button size="lg" asChild>
            <Link href="/video-library">Vezi exercițiile cu starul nostru</Link>
          </Button>
          <p className="text-sm text-ink-muted">
            Sample video-uri din bibliotecă — Speed, Agility, Conditioning.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
