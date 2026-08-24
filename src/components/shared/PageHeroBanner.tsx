"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export function PageHeroBanner({
  image,
  children,
  className,
  overlay = "charcoal",
}: {
  image?: string;
  children: React.ReactNode;
  className?: string;
  overlay?: "charcoal" | "court";
}) {
  return (
    <section className={cn("relative overflow-hidden pb-20 pt-32", className)}>
      {image ? (
        <>
          <Image src={image} alt="" fill priority className="object-cover" sizes="100vw" />
          <div
            className={cn(
              "absolute inset-0",
              overlay === "court"
                ? "bg-court-gradient/90"
                : "bg-gradient-to-b from-charcoal/90 via-charcoal/75 to-charcoal/85"
            )}
          />
        </>
      ) : null}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">{children}</div>
    </section>
  );
}
