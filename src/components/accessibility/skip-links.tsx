'use client';

import { cn } from '@/lib/utils';

interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

function SkipLink({ href, children, className }: SkipLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4",
        "z-50 px-4 py-2 text-sm font-medium",
        "bg-primary text-primary-foreground rounded-md",
        "shadow-lg border-2 border-primary-foreground/20",
        "transition-all duration-200",
        "hover:bg-primary/90 focus:bg-primary/90",
        className
      )}
    >
      {children}
    </a>
  );
}

export function SkipLinks() {
  return (
    <div className="skip-links">
      <SkipLink href="#main-content">
        Skip to main content
      </SkipLink>
      <SkipLink href="#navigation">
        Skip to navigation
      </SkipLink>
      <SkipLink href="#search">
        Skip to search
      </SkipLink>
      <SkipLink href="#weather-data">
        Skip to weather data
      </SkipLink>
    </div>
  );
}
