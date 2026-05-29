import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        sky: "border-sky-200 bg-sky-100 text-sky-800",
        sunshine: "border-amber-200 bg-amber-100 text-amber-800",
        green: "border-green-200 bg-green-100 text-green-800",
        rose: "border-pink-200 bg-pink-100 text-pink-800",
        purple: "border-purple-200 bg-purple-100 text-purple-800",
        outline: "border-blue-200 bg-white text-primary"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
