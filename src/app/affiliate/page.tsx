"use client";

import { useState } from "react";
import Link from "next/link";
import { Handshake, BarChart3, Building2, GraduationCap, Check, ArrowRight } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/FadeIn";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BRAND } from "@/lib/utils";
import { affiliateBenefits } from "@/data/testimonials";
import { useSiteMedia } from "@/components/providers/SiteMediaProvider";
import { PageHeroBanner } from "@/components/shared/PageHeroBanner";

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
    description: "Receive $30 (33.7%) on every $89 system sale tracked through your affiliate link.",
  },
];

const partnerTypes = [
  {
    title: "Individual Coach Partners",
    features: [
      "$30 commission per sale (33.7%)",
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

type FormState = {
  fullName: string;
  email: string;
  partnerType: string;
  message: string;
  password: string;
  confirmPassword: string;
};

const initialForm: FormState = {
  fullName: "",
  email: "",
  partnerType: "coach",
  message: "",
  password: "",
  confirmPassword: "",
};

export default function AffiliatePage() {
  const { pages } = useSiteMedia();
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (form.password.length < 8) {
      setError("Parola trebuie să aibă minim 8 caractere.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Parolele nu coincid.");
      return;
    }

    setStatus("loading");
    const res = await fetch("/api/affiliate/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: form.fullName,
        email: form.email,
        partnerType: form.partnerType,
        message: form.message,
        password: form.password,
      }),
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setStatus("error");
      setError(data.error || "A apărut o eroare. Încearcă din nou.");
      return;
    }

    setStatus("success");
    setForm(initialForm);
  }

  return (
    <>
      <PageHeroBanner image={pages.affiliate.hero} overlay="court">
        <FadeIn>
          <Badge className="mb-4 border-white/20 bg-white/10 text-white">
            Partner Program
          </Badge>
          <h1 className="font-display text-5xl font-bold text-white md:text-6xl">
            Become a Partner
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/80">
            Help coaches and academies discover the {BRAND.systemName} while
            earning competitive commissions through our professional affiliate
            program.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link href="#apply">
                <Handshake className="mr-2 h-4 w-4" />
                Join Affiliate Program
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/10" asChild>
              <Link href="/affiliate/login">
                Already a partner? Log in
              </Link>
            </Button>
          </div>
        </FadeIn>
      </PageHeroBanner>

      {/* Benefits */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn className="text-center">
            <h2 className="font-display text-4xl font-bold text-ink">
              Partner Benefits
            </h2>
          </FadeIn>
          <StaggerContainer className="mt-12 grid gap-8 md:grid-cols-2">
            {affiliateBenefits.map((benefit, i) => {
              const Icon = icons[i];
              return (
                <StaggerItem key={benefit.title}>
                  <div className="flex gap-6 rounded-sm border border-surface-muted bg-white p-8">
                    <div className="shrink-0 rounded-sm bg-court-soft p-4">
                      <Icon className="h-6 w-6 text-court" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-ink">
                        {benefit.title}
                      </h3>
                      <p className="mt-2 text-ink-muted">{benefit.description}</p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-court-gradient py-24">
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
                  <span className="font-display text-5xl font-bold text-white/20">
                    {step.step}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/70">{step.description}</p>
                  {i < steps.length - 1 && (
                    <ArrowRight className="absolute -right-4 top-8 hidden h-5 w-5 text-tennis-brand/30 lg:block" />
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="bg-court-soft py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn className="text-center">
            <h2 className="font-display text-4xl font-bold text-ink">
              Partnership Options
            </h2>
          </FadeIn>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {partnerTypes.map((type, i) => (
              <FadeIn key={type.title} delay={i * 0.1}>
                <div className="rounded-sm border-2 border-surface-muted bg-white p-8">
                  <h3 className="font-display text-2xl font-bold text-ink">
                    {type.title}
                  </h3>
                  <ul className="mt-6 space-y-3">
                    {type.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-court" />
                        <span className="text-ink-muted">{feature}</span>
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
      <section id="apply" className="bg-court-gradient py-24">
        <div className="mx-auto max-w-xl px-6 lg:px-8">
          <FadeIn className="text-center">
            <h2 className="font-display text-4xl font-bold text-white">
              Apply to Become a Partner
            </h2>
            <p className="mt-4 text-white/80">
              Fill out the form below and our team will review your application
              within 48 hours.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            {status === "success" ? (
              <div className="mt-12 rounded-sm border border-tennis-brand/30 bg-white/10 p-8 text-center">
                <Check className="mx-auto h-10 w-10 text-tennis-brand" />
                <h3 className="mt-4 font-display text-2xl font-bold text-white">
                  Application Received
                </h3>
                <p className="mt-2 text-white/80">
                  Our team will review your application and you&apos;ll be notified once it&apos;s
                  approved. You&apos;ll then be able to{" "}
                  <Link href="/affiliate/login" className="font-semibold text-tennis-brand underline">
                    log in
                  </Link>{" "}
                  with the email and password you just chose.
                </p>
              </div>
            ) : (
              <form className="mt-12 space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/70">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    className="w-full rounded-sm border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-tennis-brand focus:outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/70">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="w-full rounded-sm border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-tennis-brand focus:outline-none"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/70">
                    Partner Type
                  </label>
                  <select
                    value={form.partnerType}
                    onChange={(e) => update("partnerType", e.target.value)}
                    className="w-full rounded-sm border border-white/20 bg-white/10 px-4 py-3 text-white focus:border-tennis-brand focus:outline-none"
                  >
                    <option value="coach" className="text-ink">Individual Coach</option>
                    <option value="academy" className="text-ink">Tennis Academy</option>
                    <option value="influencer" className="text-ink">Content Creator / Influencer</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/70">
                    Tell Us About Yourself
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    className="w-full rounded-sm border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-tennis-brand focus:outline-none"
                    placeholder="Your coaching background, academy details, or audience..."
                  />
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/70">
                      Choose a Password
                    </label>
                    <input
                      type="password"
                      required
                      minLength={8}
                      value={form.password}
                      onChange={(e) => update("password", e.target.value)}
                      className="w-full rounded-sm border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-tennis-brand focus:outline-none"
                      placeholder="Min. 8 characters"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/70">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      required
                      minLength={8}
                      value={form.confirmPassword}
                      onChange={(e) => update("confirmPassword", e.target.value)}
                      className="w-full rounded-sm border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-tennis-brand focus:outline-none"
                      placeholder="Repeat password"
                    />
                  </div>
                </div>
                <p className="text-xs text-white/60">
                  You&apos;ll use this email and password to log into your affiliate dashboard
                  once your application is approved.
                </p>
                {error && <p className="text-sm text-red-300">{error}</p>}
                <Button size="lg" className="w-full" type="submit" disabled={status === "loading"}>
                  {status === "loading" ? "Submitting…" : "Submit Application"}
                </Button>
              </form>
            )}
          </FadeIn>
        </div>
      </section>
    </>
  );
}
