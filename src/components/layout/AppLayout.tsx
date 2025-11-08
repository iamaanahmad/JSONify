
"use client"

import * as React from "react"
import {
  Sidebar,
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar"

type AppLayoutContext = {}
const AppLayoutContext = React.createContext<AppLayoutContext | null>(null)

function useAppLayout() {
  const context = React.useContext(AppLayoutContext)
  if (!context) {
    throw new Error("useAppLayout must be used within an AppLayout.")
  }

  return context
}

type AppLayoutProps = React.ComponentProps<typeof SidebarProvider>
function AppLayout({ children, ...props }: AppLayoutProps) {
  const contextValue = React.useMemo<AppLayoutContext>(() => ({}), [])

  return (
    <AppLayoutContext.Provider value={contextValue}>
      <SidebarProvider {...props}>{children}</SidebarProvider>
    </AppLayoutContext.Provider>
  )
}

const AppLayoutHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={className}
      data-layout="header"
      {...props}
    />
  )
})
AppLayoutHeader.displayName = "AppLayoutHeader"

const AppLayoutMain = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ ...props }, ref) => {
  return (
    <SidebarInset
      ref={ref}
      data-layout="main"
      {...props}
    />
  )
})
AppLayoutMain.displayName = "AppLayoutMain"

const AppLayoutSidebar = React.forwardRef<
  React.ElementRef<typeof Sidebar>,
  React.ComponentProps<typeof Sidebar>
>(({ className, side = "right", ...props }, ref) => {
  return (
    <Sidebar
      ref={ref}
      data-layout="sidebar"
      side={side}
      className={className}
      {...props}
    />
  )
})
AppLayoutSidebar.displayName = "AppLayoutSidebar"

AppLayout.Header = AppLayoutHeader
AppLayout.Main = AppLayoutMain
AppLayout.Sidebar = AppLayoutSidebar

export { AppLayout, useAppLayout }
