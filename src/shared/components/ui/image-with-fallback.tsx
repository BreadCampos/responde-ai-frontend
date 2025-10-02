// src/shared/components/image-with-fallback.tsx

"use client";

import { cn } from "@/shared/lib/utils";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as React from "react";

const ImageRoot = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn("relative flex size-10 shrink-0 overflow-hidden", className)}
    {...props}
  />
));
ImageRoot.displayName = "ImageRoot";

const Image = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image ref={ref} className={cn(className)} {...props} />
));
Image.displayName = "Image";

const ImageFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex size-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
));
ImageFallback.displayName = "ImageFallback";

export { Image, ImageFallback, ImageRoot };
