import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "flex min-h-32 w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink transition-colors duration-200 placeholder:text-ink-faint focus-visible:border-flame focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame/20 disabled:cursor-not-allowed disabled:opacity-50 resize-none",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
