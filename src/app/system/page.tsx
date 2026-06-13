"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  BookOpen,
  Video,
  Brain,
  ClipboardList,
  GraduationCap,
  Check,
  Shield,
  Zap,
  Target,
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/FadeIn";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BRAND } from "@/lib/utils";
import { systemComponents } from "@/data/content";

const icons = [BookOpen, Video, Brain, ClipboardList, GraduationCap];

const systemIncludes = [
  "Performance System Manual™ (300+ pages)",
  "Video Exercise Library™ (300+ demonstrations)",
  "Age-specific training progressions",
  "Periodization and programming frameworks",
  "Assessment and monitoring protocols",
  "Coach education and implementation guides",
  "Long-term athlete development pathways",
  "Personalized program templates",
  "Lifetime system updates",
  "Priority coach support",
];

const audiences = [
  {
    icon: GraduationCap,
    title: "Tennis Coaches",
    description:
      "Implement a proven system instead of creating programs from scratch.",
  },
  {
    icon: Target,
    title: "Tennis Academies",
    description:
      "Standardize physical development across all age groups and coaches.",
  },
  {
    icon: Shield,
    title: "Parents",
    description:
      "Give your child a structured development pathway with expert guidance.",
  },
  {
    icon: Zap,
    title: "Junior Players",
    description:
      "Train with purpose using age-appropriate progressions designed for tennis.",
  },
];

export default function SystemPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-center bg-charcoal pt-24">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1595435934249-5df7ed4e1c0e?w=1920&q=80"
            alt="Junior tennis training"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/95 to-charcoal/80" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <FadeIn>
            <Badge className="mb-4">Complete Development System</Badge>
            <h1 className="max-w-4xl font-display text-5xl font-bold text-white md:text-6xl lg:text-7xl">
              {BRAND.systemName}
            </h1>
            <p className="mt-6 max-w-2xl text-xl text-white/60">
              {BRAND.usp}
            </p>
            <p className="mt-4 text-lg text-tennis">{BRAND.tagline}</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="#invest">Invest in the System — €497</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/video-library">Preview Sample Content</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* What You're Investing In */}
      <section className="bg-cream py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn className="text-center">
            <h2 className="font-display text-4xl font-bold text-charcoal md:text-5xl">
              What You&apos;re Investing In
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-charcoal/60">
              You&apos;re not buying a book, a video library, or individual
              exercises. You&apos;re investing in a complete physical development
              framework.
            </p>
          </FadeIn>

          <StaggerContainer className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {systemComponents.map((component, i) => {
              const Icon = icons[i];
              return (
                <StaggerItem key={component.title}>
                  <div
                    id={component.title.includes("Manual") ? "manual" : undefined}
                    className="h-full rounded-sm border border-charcoal/10 bg-white p-8"
                  >
                    <Icon className="mb-4 h-6 w-6 text-tennis-dark" />
                    <h3 className="font-display text-xl font-bold text-charcoal">
                      {component.title}
                    </h3>
                    <p className="mt-1 text-xs uppercase tracking-wider text-tennis-dark">
                      {component.subtitle}
                    </p>
                    <p className="mt-3 text-sm text-charcoal/60">
                      {component.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* System Includes */}
      <section className="bg-charcoal py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <FadeIn>
              <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
                Everything Included in the System
              </h2>
              <p className="mt-4 text-white/60">
                One investment. Complete access. Lifetime updates.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <ul className="space-y-4">
                {systemIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-tennis" />
                    <span className="text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Audiences */}
      <section className="bg-cream py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn className="text-center">
            <h2 className="font-display text-4xl font-bold text-charcoal">
              Built For Every Level
            </h2>
          </FadeIn>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((audience, i) => (
              <FadeIn key={audience.title} delay={i * 0.1}>
                <div className="rounded-sm border border-charcoal/10 bg-white p-6 text-center">
                  <audience.icon className="mx-auto mb-4 h-8 w-8 text-tennis-dark" />
                  <h3 className="font-display text-lg font-bold text-charcoal">
                    {audience.title}
                  </h3>
                  <p className="mt-2 text-sm text-charcoal/60">
                    {audience.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / CTA */}
      <section id="invest" className="bg-charcoal py-24">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <FadeIn>
            <Badge className="mb-4">Complete System Access</Badge>
            <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
              Invest in the Complete System
            </h2>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="mx-auto mt-12 max-w-md rounded-sm border-2 border-tennis bg-charcoal-100/50 p-8"
            >
              <p className="text-sm uppercase tracking-widest text-white/40">
                One-Time Investment
              </p>
              <p className="mt-2 font-display text-6xl font-bold text-tennis">
                €497
              </p>
              <p className="mt-2 text-white/50">
                Complete system access · Lifetime updates
              </p>

              <Separator className="my-8" />

              <ul className="space-y-3 text-left text-sm text-white/70">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-tennis" />
                  Full system — not individual components
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-tennis" />
                  30-day satisfaction guarantee
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-tennis" />
                  Instant digital access
                </li>
              </ul>

              <Button size="lg" className="mt-8 w-full">
                Get the Complete System
              </Button>

              <p className="mt-4 text-xs text-white/30">
                Academy bulk pricing available —{" "}
                <Link href="/affiliate" className="text-tennis hover:underline">
                  contact us
                </Link>
              </p>
            </motion.div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
