import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Link } from "react-router";

// 定義樣式變體
const tagVariants = cva("cursor-pointer inline-block flex-shrink-0 rounded-full text-sm font-medium   ", {
	variants: {
		variant: {
			default: "bg-muted text-gray-800  hover:bg-muted-hover",
		},
		size: {
			sm: "text-xs px-2 py-0.5",
			md: "text-sm px-3 py-2",
			lg: "text-base px-4 py-2.5",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "md",
	},
});

// 定義 props 類型
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof tagVariants> {
	asChild?: boolean;
	href?: string;
}

// 主組件
export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
	({ className, variant, size, asChild = false, href, ...props }, ref) => {
		const Comp = asChild ? Slot : href ? Link : "a";

		return <Comp ref={ref as any} to={href} className={cn(tagVariants({ variant, size }), className)} {...props} />;
	}
);

Tag.displayName = "Tag";
