"use client";

import Link from "next/link";
import { Handshake, BarChart3, Building2, GraduationCap, Check, ArrowRight } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/FadeIn";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BRAND } from "@/lib/utils";
import { affiliateBenefits } from "@/data/testimonials";

const icons = [BarChart3, BarChart3, Building2, GraduationCap];

const steps = [
  {
    step: "01",
    title: "Apply",
    description: "Submit your application with details about your coaching background or academy.",
  },
  {
    step: "02",
    title: "Get Approved",
    description: "Our team reviews your application and provides your unique affiliate dashboard access.",
  },
  {
    step: "03",
    title: "Share the System",
    description: "Use your custom links and marketing assets to introduce coaches and academies to the complete system.",
  },
  {
    step: "04",
    title: "Earn Commissions",
    description: "Receive up to 30% commission on every system sale tracked through your affiliate link.",
  },
];

const partnerTypes = [
  {
    title: "Individual Coach Partners",
    features: [
      "30% commission per sale",
      "Custom affiliate link",
      "Marketing asset library",
      "Monthly payout",
    ],
  },
  {
    title: "Academy Partners",
    features: [
      "Bulk licensing options",
      "Revenue sharing model",
      "Co-branded materials",
      "Implementation support",
      "Staff training workshops",
    ],
  },
];

export default function AffiliatePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-charcoal pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-radial from-tennis/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <Badge className="mb-4">Partner Program</Badge>
            <h1 className="font-display text-5xl font-bold text-white md:text-6xl">
              Become a Partner
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/60">
              Help coaches and academies discover the {BRAND.systemName} while
              earning competitive commissions through our professional affiliate
              program.
            </p>
            <Button size="lg" className="mt-8" asChild>
              <Link href="#apply">
                <Handshake className="mr-2 h-4 w-4" />
                Join Affiliate Program
              </Link>
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-cream py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn className="text-center">
            <h2 className="font-display text-4xl font-bold text-charcoal">
              Partner Benefits
            </h2>
          </FadeIn>
          <StaggerContainer className="mt-12 grid gap-8 md:grid-cols-2">
            {affiliateBenefits.map((benefit, i) => {
              const Icon = icons[i];
              return (
                <StaggerItem key={benefit.title}>
                  <div className="flex gap-6 rounded-sm border border-charcoal/10 bg-white p-8">
                    <div className="shrink-0 rounded-sm bg-tennis/10 p-4">
                      <Icon className="h-6 w-6 text-tennis-dark" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-charcoal">
                        {benefit.title}
                      </h3>
                      <p className="mt-2 text-charcoal/60">{benefit.description}</p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-charcoal py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn className="text-center">
            <h2 className="font-display text-4xl font-bold text-white">
              How It Works
            </h2>
          </FadeIn>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <FadeIn key={step.step} delay={i * 0.1}>
                <div className="relative">
                  <span className="font-display text-5xl font-bold text-tennis/20">
                    {step.step}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/50">{step.description}</p>
                  {i < steps.length - 1 && (
                    <ArrowRight className="absolute -right-4 top-8 hidden h-5 w-5 text-tennis/30 lg:block" />
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="bg-cream py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn className="text-center">
            <h2 className="font-display text-4xl font-bold text-charcoal">
              Partnership Options
            </h2>
          </FadeIn>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {partnerTypes.map((type, i) => (
              <FadeIn key={type.title} delay={i * 0.1}>
                <div className="rounded-sm border-2 border-charcoal/10 bg-white p-8">
                  <h3 className="font-display text-2xl font-bold text-charcoal">
                    {type.title}
                  </h3>
                  <ul className="mt-6 space-y-3">
                    {type.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-tennis-dark" />
                        <span className="text-charcoal/70">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Apply Form */}
      <section id="apply" className="bg-charcoal py-24">
        <div className="mx-auto max-w-xl px-6 lg:px-8">
          <FadeIn className="text-center">
            <h2 className="font-display text-4xl font-bold text-white">
              Apply to Become a Partner
            </h2>
            <p className="mt-4 text-white/60">
              Fill out the form below and our team will review your application
              within 48 hours.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <form className="mt-12 space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/40">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-sm border border-white/10 bg-charcoal-100 px-4 py-3 text-white placeholder:text-white/30 focus:border-tennis focus:outline-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/40">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full rounded-sm border border-white/10 bg-charcoal-100 px-4 py-3 text-white placeholder:text-white/30 focus:border-tennis focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/40">
                  Partner Type
                </label>
                <select className="w-full rounded-sm border border-white/10 bg-charcoal-100 px-4 py-3 text-white focus:border-tennis focus:outline-none">
                  <option value="coach">Individual Coach</option>
                  <option value="academy">Tennis Academy</option>
                  <option value="influencer">Content Creator / Influencer</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/40">
                  Tell Us About Yourself
                </label>
                <textarea
                  rows={4}
                  className="w-full rounded-sm border border-white/10 bg-charcoal-100 px-4 py-3 text-white placeholder:text-white/30 focus:border-tennis focus:outline-none"
                  placeholder="Your coaching background, academy details, or audience..."
                />
              </div>
              <Button size="lg" className="w-full" type="submit">
                Submit Application
              </Button>
            </form>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
