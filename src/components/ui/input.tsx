import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-xl border border-line bg-paper px-4 py-2 text-sm text-ink transition-colors duration-200 placeholder:text-ink-faint focus-visible:border-flame focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame/20 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Input };
