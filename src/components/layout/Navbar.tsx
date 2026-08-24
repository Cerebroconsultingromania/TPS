"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/system", label: "The System" },
  { href: "/video-library", label: "Video Library" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Resources" },
  { href: "/affiliate", label: "Partners" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-surface-muted bg-white/95 py-3 shadow-soft backdrop-blur-md"
            : "bg-white/10 py-5 backdrop-blur-sm"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link href="/" className="group flex flex-col">
            <span className="font-display text-xl font-extrabold tracking-tight text-ink lg:text-2xl">
              TPDS<span className="text-tennis-dark">™</span>
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-ink-light sm:block">
              Performance Development System
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold uppercase tracking-wider text-ink-muted transition-colors hover:text-court"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <Button variant="secondary" size="sm" asChild>
              <Link href="/video-library">Sample Exercises</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/system">Get the System</Link>
            </Button>
          </div>

          <button
            className="text-ink lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-white lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-surface-muted p-6">
              <span className="font-display text-xl font-extrabold text-ink">
                TPDS<span className="text-tennis-dark">™</span>
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6 text-ink" />
              </button>
            </div>
            <nav className="flex flex-col gap-6 px-6 pt-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-display text-3xl font-bold text-ink hover:text-court"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-8 flex flex-col gap-4">
                <Button asChild>
                  <Link href="/system" onClick={() => setMobileOpen(false)}>
                    Get the System
                  </Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link
                    href="/video-library"
                    onClick={() => setMobileOpen(false)}
                  >
                    Sample Exercises
                  </Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
