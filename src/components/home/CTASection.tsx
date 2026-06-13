"use client";

import Link from "next/link";
import { FadeIn } from "@/components/shared/FadeIn";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/utils";

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-radial from-tennis/10 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
        <FadeIn>
          <h2 className="font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Ready to Implement the Complete System?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
            Join coaches, academies and ambitious players worldwide who stopped
            collecting exercises and started building elite junior athletes with
            the {BRAND.systemName}.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/system">Get the Complete System</Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/video-library">View Sample Exercises</Link>
            </Button>
          </div>
          <p className="mt-8 text-xs uppercase tracking-widest text-white/30">
            {BRAND.tagline}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
