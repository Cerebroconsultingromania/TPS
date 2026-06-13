import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { BRAND } from "@/lib/utils";

const footerLinks = {
  system: [
    { href: "/system", label: "The Complete System" },
    { href: "/video-library", label: "Video Exercise Library" },
    { href: "/system#manual", label: "Performance System Manual" },
    { href: "/system#programs", label: "Personalized Programs" },
  ],
  company: [
    { href: "/about", label: "About the Creator" },
    { href: "/blog", label: "Resources & Blog" },
    { href: "/affiliate", label: "Partner Program" },
  ],
  audiences: [
    { href: "/system", label: "For Coaches" },
    { href: "/system", label: "For Academies" },
    { href: "/system", label: "For Parents" },
    { href: "/system", label: "For Players" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-charcoal-900">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="font-display text-2xl font-bold text-white">
                TPDS<span className="text-tennis">™</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/50">
              {BRAND.systemName}. The complete physical development framework
              for building elite junior tennis athletes.
            </p>
            <p className="mt-4 text-xs uppercase tracking-widest text-tennis">
              {BRAND.tagline}
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
              The System
            </h4>
            <ul className="space-y-3">
              {footerLinks.system.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-tennis"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-tennis"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
              Built For
            </h4>
            <ul className="space-y-3">
              {footerLinks.audiences.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-tennis"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-12" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Tennis Performance Development
            System™. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-xs text-white/30 hover:text-white/60"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-xs text-white/30 hover:text-white/60"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
