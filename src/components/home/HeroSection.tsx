"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSiteMedia } from "@/components/providers/SiteMediaProvider";

export function HeroSection() {
  const { hero, gallery } = useSiteMedia();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const leftY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const rightY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <section
      ref={sectionRef}
      data-analytics-section="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
        <Image
          src={hero.main}
          alt="Junior tennis training on court"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/55 to-charcoal/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-charcoal/40" />
      </motion.div>

      <motion.div
        style={{ y: leftY }}
        className="pointer-events-none absolute left-6 top-28 z-[4] hidden w-44 flex-col gap-4 xl:flex 2xl:left-12 2xl:w-52"
      >
        {[
          { src: hero.leftTop, label: "On-Court Performance" },
          { src: hero.leftBottom, label: "Speed Development", aspect: "aspect-square" },
        ].map((item) => (
          <div
            key={item.label}
            className="overflow-hidden rounded-sm border border-white/15 shadow-2xl"
          >
            <div className={`relative ${item.aspect ?? "aspect-[4/5]"}`}>
              <Image src={item.src} alt={item.label} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
              <span className="absolute bottom-3 left-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-tennis">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div
        style={{ y: rightY }}
        className="pointer-events-none absolute right-6 top-32 z-[4] hidden w-44 flex-col gap-4 xl:flex 2xl:right-12 2xl:w-52"
      >
        {[
          { src: hero.rightTop, label: "Junior Star", aspect: "aspect-square" },
          { src: hero.rightBottom, label: "Tournament Ready" },
        ].map((item) => (
          <div
            key={item.label}
            className="overflow-hidden rounded-sm border border-white/15 shadow-2xl"
          >
            <div className={`relative ${item.aspect ?? "aspect-[4/5]"}`}>
              <Image src={item.src} alt={item.label} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
              <span className="absolute bottom-3 left-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-tennis">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </motion.div>

      <div className="pointer-events-none absolute bottom-28 left-0 right-0 z-[4] px-4 lg:hidden">
        <div className="mx-auto flex max-w-lg gap-3 overflow-x-auto scrollbar-hide">
          {[hero.leftTop, hero.rightTop, hero.leftBottom].map((src, i) => (
            <div
              key={src}
              className="relative h-20 w-28 shrink-0 overflow-hidden rounded-sm border border-white/15"
            >
              <Image src={src} alt={`Junior tennis ${i + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      <motion.div
        style={{ y: contentY }}
        className="relative z-[11] mx-auto max-w-5xl px-6 text-center lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Badge variant="default" className="mb-6">
            Elite Junior Tennis Performance
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          The Complete Physical Development{" "}
          <span className="text-tennis-brand">System</span> for Junior Tennis
          Performance
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-white/70 md:text-xl"
        >
          Helping coaches, academies and ambitious players build stronger,
          faster and more resilient tennis athletes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button size="lg" asChild>
            <Link href="/system">Explore the System</Link>
          </Button>
          <Button variant="secondary" size="lg" asChild>
            <Link href="/video-library" className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              View Sample Exercises
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-xs uppercase tracking-widest text-white/40"
        >
          <span>Trusted by Coaches</span>
          <span className="hidden h-4 w-px bg-white/20 sm:block" />
          <span>Academy Approved</span>
          <span className="hidden h-4 w-px bg-white/20 sm:block" />
          <span>Science-Based</span>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 z-[4] hidden border-t border-white/10 bg-charcoal/50 backdrop-blur-sm lg:block">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-8 py-4">
          <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40">
            Junior Tennis Training
          </span>
          <div className="flex flex-1 gap-3 overflow-hidden">
            {gallery.map((item) => (
              <div
                key={item.label}
                className="group relative h-16 min-w-[120px] flex-1 overflow-hidden rounded-sm border border-white/10"
              >
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-charcoal/40" />
                <span className="absolute bottom-2 left-2 text-[10px] font-semibold uppercase tracking-wider text-white">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-[11] -translate-x-1/2 lg:bottom-24"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="h-6 w-6 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
