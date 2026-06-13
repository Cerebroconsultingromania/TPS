import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blog";
import { BRAND } from "@/lib/utils";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <>
      <article className="bg-charcoal pt-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-tennis"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Resources
          </Link>

          <div className="mt-8 flex items-center gap-3 text-xs text-white/40">
            <Badge>{post.category}</Badge>
            <span>{post.readTime}</span>
            <span>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <h1 className="mt-6 font-display text-4xl font-bold text-white md:text-5xl">
            {post.title}
          </h1>

          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-sm">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </article>

      <section className="bg-cream py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-charcoal/80">
            <p className="text-xl leading-relaxed">{post.excerpt}</p>

            <p className="mt-6">
              Junior tennis physical development requires more than isolated
              exercises. Coaches and academies need a complete system — one that
              provides structure, progression, and long-term planning aligned with
              the principles of Long-Term Athlete Development (LTAD).
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-charcoal">
              The Problem with Random Training
            </h2>
            <p>
              Most junior tennis programs suffer from the same fundamental issue:
              physical training is treated as an afterthought. Coaches copy exercises
              from social media, implement workouts without progression, and fail to
              connect physical development to on-court performance outcomes.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-charcoal">
              A System-Based Approach
            </h2>
            <p>
              The {BRAND.systemName} was designed to solve this problem. Rather
              than providing a collection of exercises, it delivers a complete
              framework — including the {BRAND.manualName}, Video Exercise Library™,
              training methodologies, and personalized program templates.
            </p>

            <blockquote className="my-8 border-l-4 border-tennis pl-6 italic text-charcoal/70">
              &ldquo;{BRAND.tagline}&rdquo;
            </blockquote>

            <h2 className="mt-10 font-display text-2xl font-bold text-charcoal">
              Key Takeaways
            </h2>
            <ul className="mt-4 space-y-2">
              <li>Structure beats randomness in junior athlete development</li>
              <li>Age-appropriate progressions are non-negotiable</li>
              <li>Physical training must connect to on-court performance</li>
              <li>Coaches need systems, not just exercise lists</li>
              <li>Long-term planning produces long-term results</li>
            </ul>
          </div>

          <div className="mt-16 rounded-sm border border-charcoal/10 bg-white p-8 text-center">
            <h3 className="font-display text-2xl font-bold text-charcoal">
              Ready to Implement the Complete System?
            </h3>
            <p className="mt-2 text-charcoal/60">
              Stop reading about it. Start building elite junior athletes.
            </p>
            <Button size="lg" className="mt-6" asChild>
              <Link href="/system">Get the Complete System</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
