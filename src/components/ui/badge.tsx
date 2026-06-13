import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm border px-3 py-1 text-xs font-semibold uppercase tracking-widest transition-colors",
  {
    variants: {
      variant: {
        default: "border-tennis/30 bg-tennis/10 text-tennis",
        secondary: "border-white/20 bg-white/5 text-white/80",
        outline: "border-charcoal/20 text-charcoal",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
