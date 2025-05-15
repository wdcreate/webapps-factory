import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@repo/ui/lib/utils"

const buttonVariants = cva(
  "ui-inline-flex ui-items-center ui-justify-center ui-gap-2 ui-whitespace-nowrap ui-rounded-md ui-text-sm ui-font-medium ui-transition-all disabled:ui-pointer-events-none disabled:ui-opacity-50 [&_svg]:ui-pointer-events-none [&_svg:not([class*=size-])]:ui-size-4 ui-shrink-0 [&_svg]:ui-shrink-0 ui-outline-none focus-visible:ui-border-slate-950 focus-visible:ui-ring-slate-950/50 focus-visible:ui-ring-[3px] aria-invalid:ui-ring-red-500/20 dark:aria-invalid:ui-ring-red-500/40 aria-invalid:ui-border-red-500 dark:focus-visible:ui-border-slate-300 dark:focus-visible:ui-ring-slate-300/50 dark:aria-invalid:ui-ring-red-900/20 dark:dark:aria-invalid:ui-ring-red-900/40 dark:aria-invalid:ui-border-red-900",
  {
    variants: {
      variant: {
        default:
          "ui-bg-slate-900 ui-text-slate-50 ui-shadow-xs hover:ui-bg-slate-900/90 dark:ui-bg-slate-50 dark:ui-text-slate-900 dark:hover:ui-bg-slate-50/90",
        destructive:
          "ui-bg-red-500 ui-text-white ui-shadow-xs hover:ui-bg-red-500/90 focus-visible:ui-ring-red-500/20 dark:focus-visible:ui-ring-red-500/40 dark:ui-bg-red-500/60 dark:ui-bg-red-900 dark:hover:ui-bg-red-900/90 dark:focus-visible:ui-ring-red-900/20 dark:dark:focus-visible:ui-ring-red-900/40 dark:dark:ui-bg-red-900/60",
        outline:
          "ui-border ui-bg-white ui-shadow-xs hover:ui-bg-slate-100 hover:ui-text-slate-900 dark:ui-bg-slate-200/30 dark:ui-border-slate-200 dark:hover:ui-bg-slate-200/50 dark:ui-bg-slate-950 dark:hover:ui-bg-slate-800 dark:hover:ui-text-slate-50 dark:dark:ui-bg-slate-800/30 dark:dark:ui-border-slate-800 dark:dark:hover:ui-bg-slate-800/50",
        secondary:
          "ui-bg-slate-100 ui-text-slate-900 ui-shadow-xs hover:ui-bg-slate-100/80 dark:ui-bg-slate-800 dark:ui-text-slate-50 dark:hover:ui-bg-slate-800/80",
        ghost:
          "hover:ui-bg-slate-100 hover:ui-text-slate-900 dark:hover:ui-bg-slate-100/50 dark:hover:ui-bg-slate-800 dark:hover:ui-text-slate-50 dark:dark:hover:ui-bg-slate-800/50",
        link: "ui-text-slate-900 ui-underline-offset-4 hover:ui-underline dark:ui-text-slate-50",
      },
      size: {
        default: "ui-h-9 ui-px-4 ui-py-2 has-[>svg]:ui-px-3",
        sm: "ui-h-8 ui-rounded-md ui-gap-1.5 ui-px-3 has-[>svg]:ui-px-2.5",
        lg: "ui-h-10 ui-rounded-md ui-px-6 has-[>svg]:ui-px-4",
        icon: "ui-size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
