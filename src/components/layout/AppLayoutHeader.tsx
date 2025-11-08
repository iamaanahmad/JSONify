"use client";

import * as React from "react"
import { cn } from "@/lib/utils";

const AppLayoutHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(className)}
      data-layout="header"
      {...props}
    />
  )
})
AppLayoutHeader.displayName = "AppLayoutHeader"

export { AppLayoutHeader };
