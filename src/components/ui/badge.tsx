import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-3 py-1 text-xs font-semibold uppercase tracking-widest transition-colors",
  {
    variants: {
      variant: {
        default: "border-court/20 bg-court-soft text-court",
        secondary: "border-surface-muted bg-surface-alt text-ink-muted",
        outline: "border-ink/15 text-ink",
        lime: "border-tennis-dark/30 bg-tennis/20 text-tennis-dark",
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
