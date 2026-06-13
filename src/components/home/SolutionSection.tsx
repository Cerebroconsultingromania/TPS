"use client";

import Link from "next/link";
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

const icons = [BookOpen, Video, Brain, ClipboardList, GraduationCap];

export function SolutionSection() {
  return (
    <section className="relative bg-charcoal py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <Badge className="mb-4">The Solution</Badge>
          <h2 className="font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Tennis Performance Development System™
          </h2>
          <p className="mt-6 text-lg text-white/60">
            A complete physical development framework — not isolated
            resources. Every component works together to build elite junior
            tennis athletes.
          </p>
        </FadeIn>

        {/* Visual Diagram */}
        <StaggerContainer className="mt-16">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {systemComponents.map((component, i) => {
              const Icon = icons[i];
              return (
                <StaggerItem key={component.title} className="flex items-center gap-3 md:gap-4">
                  <div className="group flex w-36 flex-col items-center rounded-sm border border-white/10 bg-charcoal-100/50 p-4 transition-all duration-300 hover:border-tennis/30 hover:bg-tennis/5 md:w-44 md:p-6">
                    <div className="mb-3 rounded-sm bg-tennis/10 p-3 transition-colors group-hover:bg-tennis/20">
                      <Icon className="h-6 w-6 text-tennis" />
                    </div>
                    <h4 className="text-center text-xs font-semibold text-white md:text-sm">
                      {component.title}
                    </h4>
                  </div>
                  {i < systemComponents.length - 1 && (
                    <Plus className="hidden h-5 w-5 text-tennis/40 sm:block" />
                  )}
                </StaggerItem>
              );
            })}
          </div>

          <FadeIn delay={0.4} className="mt-8 flex flex-col items-center">
            <Equal className="h-6 w-6 text-tennis" />
            <div className="mt-4 rounded-sm border-2 border-tennis bg-tennis/10 px-8 py-4">
              <p className="font-display text-lg font-bold text-tennis md:text-xl">
                Complete Development System
              </p>
            </div>
          </FadeIn>
        </StaggerContainer>

        {/* Component Details */}
        <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {systemComponents.map((component, i) => {
            const Icon = icons[i];
            return (
              <FadeIn key={component.title} delay={i * 0.1}>
                <div className="h-full rounded-sm border border-white/10 p-6 transition-all hover:border-tennis/20">
                  <Icon className="mb-4 h-5 w-5 text-tennis" />
                  <h3 className="font-display text-xl font-bold text-white">
                    {component.title}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-wider text-tennis/60">
                    {component.subtitle}
                  </p>
                  <p className="mt-3 text-sm text-white/50">
                    {component.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.3} className="mt-16 text-center">
          <Button size="lg" asChild>
            <Link href="/system">Invest in the Complete System</Link>
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
