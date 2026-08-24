"use client";

import Link from "next/link";
import Image from "next/image";
import { Users, Building2, MessageCircle, Check } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/FadeIn";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { programTypes } from "@/data/content";
import { useSiteMedia } from "@/components/providers/SiteMediaProvider";

const icons = [Users, Building2, MessageCircle];

export function ProgramsSection() {
  const { programs: programImages } = useSiteMedia();

  return (
    <section id="programs" data-analytics-section="programs" className="relative bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="border-charcoal/20">
            Personalized Programs™
          </Badge>
          <h2 className="mt-4 font-display text-4xl font-bold text-charcoal md:text-5xl">
            Tailored to Your Development Path
          </h2>
          <p className="mt-6 text-lg text-charcoal/60">
            The system adapts to individual players, academy structures, and
            coaching environments — delivering personalized implementation at
            every level.
          </p>
        </FadeIn>

        <StaggerContainer className="mt-16 grid gap-8 lg:grid-cols-3">
          {programTypes.map((program, i) => {
            const Icon = icons[i];
            return (
              <StaggerItem key={program.title}>
                <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-charcoal/10 bg-white transition-all duration-300 hover:border-court/30 hover:shadow-xl">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={programImages[i]}
                      alt={program.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
                    <div className="absolute left-4 top-4 rounded-lg bg-white/95 p-3 shadow-soft">
                      <Icon className="h-6 w-6 text-court" />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-8">
                    <h3 className="font-display text-2xl font-bold text-charcoal">
                      {program.title}
                    </h3>
                    <p className="mt-3 flex-1 text-charcoal/60">
                      {program.description}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {program.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-sm text-charcoal/70"
                        >
                          <Check className="h-4 w-4 shrink-0 text-tennis-dark" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" className="mt-8 w-full" asChild>
                      <Link href="/system">{program.cta}</Link>
                    </Button>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
