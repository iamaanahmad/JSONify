"use client";

import { Sparkles, Menu } from 'lucide-react';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';

export function Header() {
  const { isMobile } = useSidebar();
  return (
    <header className="border-b border-border/40 sticky top-0 bg-background/95 backdrop-blur z-10 h-16 flex items-center px-4 md:px-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Sparkles className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-2xl font-bold tracking-tighter text-foreground">
          JSONify
        </h1>
      </div>
      <div className="flex-grow" />
      <p className="text-sm text-muted-foreground hidden md:block">
        The ultimate JSON toolkit for developers.
      </p>
      <div className="md:w-16" />
      <div className="ml-auto">
        <SidebarTrigger className="md:hidden">
            <Menu />
        </SidebarTrigger>
      </div>
    </header>
  );
}
