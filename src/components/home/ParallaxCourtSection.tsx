"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useSiteMedia } from "@/components/providers/SiteMediaProvider";

export function ParallaxCourtSection() {
  const { parallaxBand } = useSiteMedia();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-18%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.05, 1.12]);

  return (
    <section ref={ref} data-analytics-section="parallax" className="relative h-[42vh] min-h-[280px] overflow-hidden md:h-[52vh]">
      <motion.div style={{ y, scale }} className="absolute inset-0 will-change-transform">
        <Image
          src={parallaxBand}
          alt="Blue tennis court viewed from above"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-court-dark/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-court-dark/70 via-transparent to-court-dark/70" />
      </motion.div>

      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-tennis-brand">
            On-Court Development
          </p>
          <p className="mt-3 font-display text-2xl font-bold text-white md:text-4xl">
            Built for junior tennis athletes — not generic gym training
          </p>
        </div>
      </div>
    </section>
  );
}
