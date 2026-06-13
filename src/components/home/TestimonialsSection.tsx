"use client";

import { Quote } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/FadeIn";
import { Badge } from "@/components/ui/badge";
import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  return (
    <section className="relative bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="border-charcoal/20">
            Results & Testimonials
          </Badge>
          <h2 className="mt-4 font-display text-4xl font-bold text-charcoal md:text-5xl">
            Trusted by Elite Programs Worldwide
          </h2>
          <p className="mt-6 text-lg text-charcoal/60">
            Coaches, academies, parents and players who implemented the
            complete system — not just individual resources.
          </p>
        </FadeIn>

        <StaggerContainer className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.author}>
              <div className="flex h-full flex-col rounded-sm border border-charcoal/10 bg-white p-8 transition-all hover:border-tennis/20 hover:shadow-lg">
                <Quote className="mb-4 h-8 w-8 text-tennis/30" />
                <p className="flex-1 text-charcoal/70 italic leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="mt-6 border-t border-charcoal/5 pt-6">
                  <p className="font-semibold text-charcoal">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-charcoal/50">
                    {testimonial.role}, {testimonial.organization}
                  </p>
                  <Badge
                    variant="outline"
                    className="mt-3 border-charcoal/10 text-[10px]"
                  >
                    {testimonial.type}
                  </Badge>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
