import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-base border-2 border-border text-sm font-heading gap-2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-white text-main border-black",
                noShadow:
                    "bg-main text-main-foreground border-border transition-colors hover:bg-main hover:text-main-foreground hover:border-border focus:bg-main focus:text-main-foreground focus:border-border",
                neutral:
                    "bg-secondary-background text-foreground border-border transition-colors hover:bg-main hover:text-main-foreground hover:border-border",
                reverse:
                    "bg-main text-main-foreground border-border transition-colors hover:bg-secondary-background hover:text-foreground hover:border-border",
            },
            size: {
                default: "h-10 px-4 py-2",
                xs: "h-8 gap-1.5 px-2.5 text-xs [&_svg]:size-3.5",
                sm: "h-9 px-3",
                lg: "h-11 px-8",
                icon: "size-10",
                "icon-xs": "size-8 [&_svg]:size-3.5",
                "icon-sm": "size-9",
                "icon-lg": "size-11",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

function Button({
    className,
    variant,
    size,
    ...props
}: React.ComponentProps<typeof ButtonPrimitive> &
    VariantProps<typeof buttonVariants>) {
    return (
        <ButtonPrimitive
            data-slot="button"
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
}

export { Button, buttonVariants };
