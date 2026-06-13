"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const heroImages = {
  main: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1920&q=80",
  leftTop: "https://images.unsplash.com/photo-1595435934249-5df7ed4e1c0e?w=600&q=80",
  leftBottom: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=600&q=80",
  rightTop: "https://images.unsplash.com/photo-1534152226879-3798736f0702?w=600&q=80",
  rightBottom: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=600&q=80",
};

const galleryStrip = [
  {
    src: "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?w=400&q=80",
    label: "Agility",
  },
  {
    src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",
    label: "Strength",
  },
  {
    src: "https://images.unsplash.com/photo-1517649763962-0c62306601b7?w=400&q=80",
    label: "Speed",
  },
  {
    src: "https://images.unsplash.com/photo-1622163642999-9584746ecc23?w=400&q=80",
    label: "Movement",
  },
];

export function HeroSection() {
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
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Layered tennis imagery */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
        <Image
          src={heroImages.main}
          alt="Junior tennis training on court"
          fill
          priority
          className="object-cover"
        />
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-70 mix-blend-luminosity"
          poster={heroImages.main}
        >
          <source
            src="https://videos.pexels.com/video-files/5752729/5752729-uhd_2560_1440_25fps.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-hero-pattern" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/75 to-charcoal/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/60" />
      </motion.div>

      {/* Floating tennis photo panels — visible on desktop, space for 3D ball/racket */}
      <motion.div
        style={{ y: leftY }}
        className="pointer-events-none absolute left-6 top-28 z-[4] hidden w-44 flex-col gap-4 xl:flex 2xl:left-12 2xl:w-52"
      >
        <div className="overflow-hidden rounded-sm border border-white/15 shadow-2xl">
          <div className="relative aspect-[4/5]">
            <Image
              src={heroImages.leftTop}
              alt="Junior tennis player training"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
            <span className="absolute bottom-3 left-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-tennis">
              On-Court Performance
            </span>
          </div>
        </div>
        <div className="overflow-hidden rounded-sm border border-white/15 shadow-2xl">
          <div className="relative aspect-square">
            <Image
              src={heroImages.leftBottom}
              alt="Tennis speed and agility training"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
            <span className="absolute bottom-3 left-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80">
              Speed Development
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div
        style={{ y: rightY }}
        className="pointer-events-none absolute right-6 top-32 z-[4] hidden w-44 flex-col gap-4 xl:flex 2xl:right-12 2xl:w-52"
      >
        <div className="overflow-hidden rounded-sm border border-white/15 shadow-2xl">
          <div className="relative aspect-square">
            <Image
              src={heroImages.rightTop}
              alt="Tennis conditioning exercises"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
            <span className="absolute bottom-3 left-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80">
              Conditioning
            </span>
          </div>
        </div>
        <div className="overflow-hidden rounded-sm border border-white/15 shadow-2xl">
          <div className="relative aspect-[4/5]">
            <Image
              src={heroImages.rightBottom}
              alt="Competitive junior tennis athlete"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
            <span className="absolute bottom-3 left-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-tennis">
              Elite Juniors
            </span>
          </div>
        </div>
      </motion.div>

      {/* Mobile / tablet tennis image strip */}
      <div className="pointer-events-none absolute bottom-28 left-0 right-0 z-[4] px-4 lg:hidden">
        <div className="mx-auto flex max-w-lg gap-3 overflow-x-auto scrollbar-hide">
          {[heroImages.leftTop, heroImages.rightTop, heroImages.leftBottom].map(
            (src) => (
              <div
                key={src}
                className="relative h-20 w-28 shrink-0 overflow-hidden rounded-sm border border-white/15"
              >
                <Image src={src} alt="Tennis training" fill className="object-cover" />
              </div>
            )
          )}
        </div>
      </div>

      {/* Content — above 3D layer */}
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
            Elite Tennis Performance Institute
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          The Complete Physical Development{" "}
          <span className="text-tennis">System</span> for Junior Tennis
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

      {/* Bottom training gallery */}
      <div className="absolute bottom-0 left-0 right-0 z-[4] hidden border-t border-white/10 bg-charcoal/50 backdrop-blur-sm lg:block">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-8 py-4">
          <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40">
            System Training
          </span>
          <div className="flex flex-1 gap-3 overflow-hidden">
            {galleryStrip.map((item) => (
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

      {/* Scroll indicator */}
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
