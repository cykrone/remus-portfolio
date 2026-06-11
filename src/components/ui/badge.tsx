import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full font-mono text-[0.7rem] uppercase tracking-[0.16em] transition-colors",
  {
    variants: {
      variant: {
        solid: "bg-ink text-cream px-3 py-1",
        soft: "bg-ember text-flame-deep px-3 py-1",
        outline: "border border-line-strong text-ink-soft px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  }
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
