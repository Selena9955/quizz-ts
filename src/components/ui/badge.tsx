import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-muted text-secondary-foreground [a&]:hover:bg-muted-hover",
        primary:
          "border-transparent bg-primary/80 text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary/20 text-secondary-foreground [a&]:hover:bg-primary/90",

        outline:
          "text-primary border-primary [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
      size: {
        sm: "px-2 py-1 text-xs font-medium",
        md: "h-9 px-3 py-2 text-sm font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

function Badge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
