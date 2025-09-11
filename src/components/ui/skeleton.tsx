'use client';

import { cn } from "@/lib/utils";

export interface SkeletonProps {
  /** Additional CSS classes */
  className?: string;
  /** Width of the skeleton */
  width?: string | number;
  /** Height of the skeleton */
  height?: string | number;
  /** Whether to show shimmer animation */
  animate?: boolean;
  /** Border radius */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Variant for different skeleton types */
  variant?: 'default' | 'text' | 'circular' | 'rectangular';
}

export function Skeleton({
  className,
  width,
  height,
  animate = true,
  rounded = 'md',
  variant = 'default'
}: SkeletonProps) {
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full'
  };

  const variantClasses = {
    default: 'bg-muted',
    text: 'bg-muted h-4',
    circular: 'bg-muted rounded-full',
    rectangular: 'bg-muted rounded-none'
  };

  const style = {
    ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
    ...(height && { height: typeof height === 'number' ? `${height}px` : height })
  };

  return (
    <div
      className={cn(
        // Base styles
        variantClasses[variant],
        roundedClasses[rounded],
        // Animation
        animate && "animate-pulse",
        // Accessibility
        "aria-hidden='true'",
        className
      )}
      style={style}
      role="img"
      aria-label="Loading content"
    />
  );
}

/**
 * Shimmer effect for enhanced skeleton animation
 */
export function SkeletonShimmer({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite]",
        "bg-gradient-to-r from-transparent via-white/10 to-transparent",
        "dark:via-white/5",
        className
      )}
      aria-hidden="true"
    />
  );
}

/**
 * Container for skeleton with shimmer effect
 */
export function SkeletonContainer({ 
  children, 
  className,
  showShimmer = true 
}: { 
  children: React.ReactNode;
  className?: string;
  showShimmer?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {children}
      {showShimmer && <SkeletonShimmer />}
    </div>
  );
}

/**
 * Text skeleton with multiple lines
 */
export function SkeletonText({ 
  lines = 1, 
  className,
  lineHeight = 'h-4'
}: { 
  lines?: number;
  className?: string;
  lineHeight?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          className={cn(
            lineHeight,
            index === lines - 1 && lines > 1 ? "w-3/4" : "w-full"
          )}
        />
      ))}
    </div>
  );
}

/**
 * Card skeleton matching the design system
 */
export function SkeletonCard({ 
  className,
  showHeader = true,
  showContent = true
}: { 
  className?: string;
  showHeader?: boolean;
  showContent?: boolean;
}) {
  return (
    <div className={cn("glass-subtle p-4 space-y-4", className)}>
      {showHeader && (
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      )}
      {showContent && (
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-3/5" />
        </div>
      )}
    </div>
  );
}
