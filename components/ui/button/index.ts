import { cva, type VariantProps } from "class-variance-authority";

export { default as Button } from "./Button.vue";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-green-600 text-primary-foreground shadow hover:bg-green-700",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-red-700",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:bg-slate-300/90",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-slate-300/90",
        ghost: "hover:bg-slate-300/90 hover:text-accent-foreground",
        link: "text-green-600 underline-offset-4 hover:underline",
        tertiary: "bg-amber-400 shadow hover:bg-yellow-600",
      },
      size: {
        default: "h-10 px-4 py-2",
        xs: "h-7 rounded px-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
