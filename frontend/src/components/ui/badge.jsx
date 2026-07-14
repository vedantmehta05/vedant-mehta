import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary/10 text-primary",
        outline: "border-border text-foreground",
        emerald: "border-transparent bg-emerald/10 text-emerald",
        purple: "border-transparent bg-purple/10 text-purple",
        pink: "border-transparent bg-pink/10 text-pink",
        cyan: "border-transparent bg-cyan/10 text-cyan",
        orange: "border-transparent bg-orange/10 text-orange",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
