"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/FadeIn";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { blogPosts, blogCategories } from "@/data/blog";

export function BlogSection() {
  return (
    <section className="relative bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Badge variant="outline" className="border-charcoal/20">
              Blog & Resources
            </Badge>
            <h2 className="mt-4 font-display text-4xl font-bold text-charcoal md:text-5xl">
              Expert Insights & Education
            </h2>
            <p className="mt-4 max-w-xl text-charcoal/60">
              Science-backed articles on junior tennis development, coaching
              methodology and system implementation.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/blog">View All Resources</Link>
          </Button>
        </FadeIn>

        {/* Categories */}
        <FadeIn delay={0.1} className="mt-8 flex flex-wrap gap-2">
          {blogCategories.map((category) => (
            <Link
              key={category}
              href={`/blog?category=${encodeURIComponent(category)}`}
              className="rounded-sm border border-charcoal/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-charcoal/60 transition-all hover:border-tennis hover:text-tennis-dark"
            >
              {category}
            </Link>
          ))}
        </FadeIn>

        {/* Featured posts */}
        <StaggerContainer className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(0, 3).map((post) => (
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
                  <h3 className="mt-3 font-display text-xl font-bold text-charcoal group-hover:text-tennis-dark">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-charcoal/60">
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
      </div>
    </section>
  );
}
