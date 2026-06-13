"use client";

import Link from "next/link";
import { Handshake, BarChart3, Building2, GraduationCap } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/FadeIn";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { affiliateBenefits } from "@/data/testimonials";

const icons = [BarChart3, BarChart3, Building2, GraduationCap];

export function AffiliateSection() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-radial from-tennis/5 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeIn direction="left">
            <Badge className="mb-4">Partner Program</Badge>
            <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
              Become a Partner
            </h2>
            <p className="mt-6 text-lg text-white/60">
              Join our affiliate and partnership program. Help coaches and
              academies discover the complete development system while earning
              competitive commissions.
            </p>

            <StaggerContainer className="mt-10 space-y-6">
              {affiliateBenefits.map((benefit, i) => {
                const Icon = icons[i];
                return (
                  <StaggerItem key={benefit.title}>
                    <div className="flex gap-4">
                      <div className="shrink-0 rounded-sm bg-tennis/10 p-3">
                        <Icon className="h-5 w-5 text-tennis" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">
                          {benefit.title}
                        </h4>
                        <p className="mt-1 text-sm text-white/50">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>

            <Button size="lg" className="mt-10" asChild>
              <Link href="/affiliate">
                <Handshake className="mr-2 h-4 w-4" />
                Join Affiliate Program
              </Link>
            </Button>
          </FadeIn>

          <FadeIn direction="right">
            <div className="rounded-sm border border-white/10 bg-charcoal-100/50 p-8 backdrop-blur-sm lg:p-12">
              <div className="text-center">
                <p className="text-xs uppercase tracking-widest text-white/40">
                  Partner Commission
                </p>
                <p className="mt-2 font-display text-6xl font-bold text-tennis">
                  30%
                </p>
                <p className="mt-2 text-white/50">on every system sale</p>
              </div>

              <div className="mt-10 space-y-4">
                {[
                  "Real-time affiliate dashboard",
                  "Custom tracking links",
                  "Marketing assets provided",
                  "Dedicated partner support",
                  "Academy bulk pricing available",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 border-b border-white/5 pb-4 last:border-0"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-tennis" />
                    <span className="text-sm text-white/70">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
