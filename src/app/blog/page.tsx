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
import { useBlogImage, useSiteMedia } from "@/components/providers/SiteMediaProvider";
import { PageHeroBanner } from "@/components/shared/PageHeroBanner";

function BlogPostCard({
  slug,
  title,
  excerpt,
  category,
  readTime,
}: {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
}) {
  const image = useBlogImage(slug);
  return (
    <Link
      href={`/blog/${slug}`}
      className="group block overflow-hidden rounded-sm border border-surface-muted bg-white transition-all hover:border-court/20 hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 text-xs text-ink-muted">
          <span className="font-semibold uppercase tracking-wider text-court">
            {category}
          </span>
          <span>·</span>
          <span>{readTime}</span>
        </div>
        <h2 className="mt-3 font-display text-xl font-bold text-ink group-hover:text-court">
          {title}
        </h2>
        <p className="mt-2 line-clamp-3 text-sm text-ink-muted">{excerpt}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ink group-hover:text-court">
          Read Article
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

function BlogContent() {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get("category");
  const { pages } = useSiteMedia();

  const filtered = categoryFilter
    ? blogPosts.filter((p) => p.category === categoryFilter)
    : blogPosts;

  return (
    <>
      <PageHeroBanner image={pages.blog.hero}>
        <FadeIn>
          <Badge className="mb-4 border-white/20 bg-white/10 text-white">
            Resources & Education
          </Badge>
          <h1 className="font-display text-5xl font-bold text-white md:text-6xl">
            Blog & Resources
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/80">
            Expert insights on junior tennis development, coaching methodology,
            and implementing a complete physical development system.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="mt-8 flex flex-wrap gap-2">
          <Link
            href="/blog"
            className={`rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
              !categoryFilter
                ? "bg-tennis-brand text-ink"
                : "border border-white/20 text-white/70 hover:text-white"
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
                  ? "bg-tennis-brand text-ink"
                  : "border border-white/20 text-white/70 hover:text-white"
              }`}
            >
              {category}
            </Link>
          ))}
        </FadeIn>
      </PageHeroBanner>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {filtered.length === 0 ? (
            <p className="text-center text-ink-muted">
              No articles found in this category.
            </p>
          ) : (
            <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post) => (
                <StaggerItem key={post.slug}>
                  <BlogPostCard
                    slug={post.slug}
                    title={post.title}
                    excerpt={post.excerpt}
                    category={post.category}
                    readTime={post.readTime}
                  />
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
            <p className="mt-4 text-white/80">
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
