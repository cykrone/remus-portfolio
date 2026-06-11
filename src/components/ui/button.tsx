import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "rounded-full bg-ink text-cream hover:bg-flame hover:-translate-y-0.5 shadow-[0_1px_0_rgba(0,0,0,0.04)]",
        flame:
          "rounded-full bg-flame text-white hover:bg-flame-deep hover:-translate-y-0.5",
        outline:
          "rounded-full border border-line-strong bg-transparent text-ink hover:border-ink hover:-translate-y-0.5",
        ghost: "rounded-full text-ink hover:bg-sand",
        link: "text-ink underline-offset-4 hover:text-flame hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-[0.8rem]",
        md: "h-11 px-6",
        lg: "h-14 px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
