"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/FadeIn";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blogPosts, blogCategories } from "@/data/blog";

function BlogContent() {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get("category");

  const filtered = categoryFilter
    ? blogPosts.filter((p) => p.category === categoryFilter)
    : blogPosts;

  return (
    <>
      <section className="relative bg-charcoal pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <Badge className="mb-4">Resources & Education</Badge>
            <h1 className="font-display text-5xl font-bold text-white md:text-6xl">
              Blog & Resources
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/60">
              Expert insights on junior tennis development, coaching methodology,
              and implementing a complete physical development system.
            </p>
          </FadeIn>

          <FadeIn delay={0.2} className="mt-8 flex flex-wrap gap-2">
            <Link
              href="/blog"
              className={`rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                !categoryFilter
                  ? "bg-tennis text-charcoal"
                  : "border border-white/10 text-white/60 hover:text-white"
              }`}
            >
              All
            </Link>
            {blogCategories.map((category) => (
              <Link
                key={category}
                href={`/blog?category=${encodeURIComponent(category)}`}
                className={`rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                  categoryFilter === category
                    ? "bg-tennis text-charcoal"
                    : "border border-white/10 text-white/60 hover:text-white"
                }`}
              >
                {category}
              </Link>
            ))}
          </FadeIn>
        </div>
      </section>

      <section className="bg-cream py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {filtered.length === 0 ? (
            <p className="text-center text-charcoal/60">
              No articles found in this category.
            </p>
          ) : (
            <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post) => (
                <StaggerItem key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block overflow-hidden rounded-sm border border-charcoal/10 bg-white transition-all hover:border-tennis/20 hover:shadow-lg"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-charcoal/40">
                        <span className="font-semibold uppercase tracking-wider text-tennis-dark">
                          {post.category}
                        </span>
                        <span>·</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h2 className="mt-3 font-display text-xl font-bold text-charcoal group-hover:text-tennis-dark">
                        {post.title}
                      </h2>
                      <p className="mt-2 line-clamp-3 text-sm text-charcoal/60">
                        {post.excerpt}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-charcoal group-hover:text-tennis-dark">
                        Read Article
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </section>

      <section className="bg-charcoal py-24">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <FadeIn>
            <h2 className="font-display text-3xl font-bold text-white">
              Ready to Go Beyond Articles?
            </h2>
            <p className="mt-4 text-white/60">
              Implement the complete system — not just read about it.
            </p>
            <Button size="lg" className="mt-8" asChild>
              <Link href="/system">Explore the Complete System</Link>
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-charcoal pt-32" />}>
      <BlogContent />
    </Suspense>
  );
}
