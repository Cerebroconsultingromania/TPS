"use client";

import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/shared/FadeIn";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BRAND } from "@/lib/utils";

export function ManualSection() {
  return (
    <section className="relative overflow-hidden bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* 3D Book Mockup */}
          <FadeIn direction="left" className="relative">
            <div className="relative mx-auto aspect-[4/5] max-w-md perspective-[1000px]">
              {/* Main book */}
              <div
                className="relative h-full w-full transition-transform duration-700 hover:rotate-y-[-8deg]"
                style={{
                  transform: "rotateY(-12deg) rotateX(5deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="absolute inset-0 rounded-sm bg-charcoal shadow-2xl">
                  <div className="flex h-full flex-col justify-between p-8">
                    <div>
                      <Badge variant="outline" className="border-charcoal/20">
                        System Foundation
                      </Badge>
                      <h3 className="mt-4 font-display text-2xl font-bold text-white">
                        Performance System Manual™
                      </h3>
                      <p className="mt-2 text-sm text-white/50">
                        The Foundation of the Entire System
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-1 w-full rounded bg-tennis/30" />
                      <div className="h-1 w-3/4 rounded bg-tennis/20" />
                      <div className="h-1 w-1/2 rounded bg-tennis/10" />
                    </div>
                    <div className="flex items-end justify-between">
                      <span className="font-display text-4xl font-bold text-tennis">
                        TPDS
                      </span>
                      <span className="text-xs text-white/30">300+ pages</span>
                    </div>
                  </div>
                </div>

                {/* Book spine */}
                <div
                  className="absolute left-0 top-0 h-full w-8 rounded-l-sm bg-charcoal-50"
                  style={{ transform: "rotateY(90deg) translateZ(4px)" }}
                />

                {/* Pages edge */}
                <div className="absolute -right-2 top-2 h-[calc(100%-16px)] w-4 rounded-r-sm bg-white shadow-inner">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-[5%] border-b border-charcoal/5"
                    />
                  ))}
                </div>
              </div>

              {/* Floating preview cards */}
              <div className="absolute -right-8 top-1/4 hidden w-40 rounded-sm border border-charcoal/10 bg-white p-3 shadow-lg lg:block">
                <Image
                  src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=200&q=80"
                  alt="Exercise diagram"
                  width={160}
                  height={100}
                  className="rounded-sm object-cover"
                />
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-charcoal/60">
                  Progression Charts
                </p>
              </div>

              <div className="absolute -left-8 bottom-1/4 hidden w-40 rounded-sm border border-charcoal/10 bg-white p-3 shadow-lg lg:block">
                <Image
                  src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200&q=80"
                  alt="Training methodology"
                  width={160}
                  height={100}
                  className="rounded-sm object-cover"
                />
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-charcoal/60">
                  Methodology Framework
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Content */}
          <FadeIn direction="right">
            <Badge variant="outline" className="border-charcoal/20">
              System Foundation
            </Badge>
            <h2 className="mt-4 font-display text-4xl font-bold text-charcoal md:text-5xl">
              More Than a Manual.
              <br />A Complete Coaching Framework.
            </h2>
            <p className="mt-6 text-lg text-charcoal/60">
              The {BRAND.manualName} is the foundational guide that explains the
              methodology, principles, progressions and complete implementation
              of the {BRAND.systemName}.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Age-specific training progressions (U10 through U18+)",
                "Periodization models for competitive seasons",
                "Assessment protocols and monitoring systems",
                "Exercise selection and programming frameworks",
                "Long-term athlete development pathways",
                "Coach implementation guides and checklists",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-tennis" />
                  <p className="text-charcoal/70">{item}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 font-display text-lg font-semibold text-charcoal">
              The manual is one component. The system is the investment.
            </p>

            <Button className="mt-8" size="lg" asChild>
              <Link href="/system">Explore the Complete System</Link>
            </Button>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
