"use client";

import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Video,
  Brain,
  ClipboardList,
  GraduationCap,
  Plus,
  Equal,
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/FadeIn";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { systemComponents } from "@/data/content";
import { useSiteMedia } from "@/components/providers/SiteMediaProvider";

const icons = [BookOpen, Video, Brain, ClipboardList, GraduationCap];

export function SolutionSection() {
  const { solution: solutionImages } = useSiteMedia();

  return (
    <section data-analytics-section="solution" className="relative overflow-hidden bg-court-gradient py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-radial from-tennis-brand/10 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <Badge className="mb-4 border-white/20 bg-white/10 text-white">
            The Solution
          </Badge>
          <h2 className="font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Tennis Performance Development System™
          </h2>
          <p className="mt-6 text-lg text-white/80">
            A complete physical development framework — not isolated
            resources. Every component works together to build elite junior
            tennis athletes.
          </p>
        </FadeIn>

        <StaggerContainer className="mt-16">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {systemComponents.map((component, i) => {
              const Icon = icons[i];
              return (
                <StaggerItem key={component.title} className="flex items-center gap-3 md:gap-4">
                  <div className="group flex w-36 flex-col items-center overflow-hidden rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-300 hover:border-tennis-brand/40 md:w-44">
                    <div className="relative h-20 w-full">
                      <Image
                        src={solutionImages[i]}
                        alt={component.title}
                        fill
                        className="object-cover opacity-90"
                      />
                      <div className="absolute inset-0 bg-court/30" />
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-md bg-white/95 p-2 shadow-soft">
                        <Icon className="h-5 w-5 text-court" />
                      </div>
                    </div>
                    <h4 className="p-3 text-center text-xs font-semibold text-white md:text-sm">
                      {component.title}
                    </h4>
                  </div>
                  {i < systemComponents.length - 1 && (
                    <Plus className="hidden h-5 w-5 text-tennis-brand/60 sm:block" />
                  )}
                </StaggerItem>
              );
            })}
          </div>

          <FadeIn delay={0.4} className="mt-8 flex flex-col items-center">
            <Equal className="h-6 w-6 text-tennis-brand" />
            <div className="mt-4 rounded-xl border-2 border-tennis-brand/50 bg-white/10 px-8 py-4 backdrop-blur-sm">
              <p className="font-display text-lg font-bold text-tennis-brand md:text-xl">
                Complete Development System
              </p>
            </div>
          </FadeIn>
        </StaggerContainer>

        <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {systemComponents.map((component, i) => {
            const Icon = icons[i];
            return (
              <FadeIn key={component.title} delay={i * 0.1}>
                <div className="group h-full overflow-hidden rounded-xl border border-white/15 bg-white shadow-card transition-all hover:shadow-lg">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={solutionImages[i]}
                      alt={component.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-md bg-white/95 px-2 py-1 shadow-soft">
                      <Icon className="h-4 w-4 text-court" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-court">
                        Component
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold text-ink">
                      {component.title}
                    </h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-court">
                      {component.subtitle}
                    </p>
                    <p className="mt-3 text-sm text-ink-muted">
                      {component.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.3} className="mt-16 text-center">
          <Button
            size="lg"
            className="bg-tennis-brand text-ink hover:bg-tennis-light"
            asChild
          >
            <Link href="/system">Invest in the Complete System</Link>
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
