"use client";

import { AlertTriangle, TrendingDown, Clock } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/FadeIn";
import { problemPoints } from "@/data/content";

const icons = [TrendingDown, AlertTriangle, Clock];

export function ProblemSection() {
  return (
    <section className="relative bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-charcoal/40">
            The Problem
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold text-charcoal md:text-5xl lg:text-6xl">
            Most Junior Players Train{" "}
            <span className="text-red-600">Randomly</span>
          </h2>
          <p className="mt-6 text-lg text-charcoal/60">
            Without a complete development system, young athletes accumulate
            exercises but never build the physical foundation required for
            elite performance.
          </p>
        </FadeIn>

        <StaggerContainer className="mt-16 grid gap-8 md:grid-cols-3">
          {problemPoints.map((point, i) => {
            const Icon = icons[i];
            return (
              <StaggerItem key={point.title}>
                <div className="group relative overflow-hidden rounded-sm border border-charcoal/10 bg-white p-8 transition-all duration-500 hover:border-red-200 hover:shadow-xl">
                  <div className="absolute -right-4 -top-4 font-display text-8xl font-bold text-charcoal/[0.03]">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  <div className="mb-6 inline-flex rounded-sm bg-red-50 p-3">
                    <Icon className="h-6 w-6 text-red-500" />
                  </div>

                  <div className="mb-4">
                    <span className="font-display text-5xl font-bold text-red-500">
                      {point.stat}
                    </span>
                    <p className="mt-1 text-xs uppercase tracking-wider text-charcoal/40">
                      {point.statLabel}
                    </p>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-charcoal">
                    {point.title}
                  </h3>
                  <p className="mt-3 text-charcoal/60">{point.description}</p>

                  <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-charcoal/5">
                    <div
                      className="h-full rounded-full bg-red-400 transition-all duration-1000 group-hover:w-full"
                      style={{ width: point.stat }}
                    />
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <FadeIn delay={0.3} className="mt-16 text-center">
          <p className="font-display text-2xl font-bold text-charcoal md:text-3xl">
            Stop collecting random exercises.{" "}
            <span className="text-tennis-dark">
              Implement a complete development system.
            </span>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
