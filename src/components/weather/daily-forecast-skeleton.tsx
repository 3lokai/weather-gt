'use client';

import { Skeleton, SkeletonContainer } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface DailyForecastSkeletonProps {
  /** Additional CSS classes */
  className?: string;
  /** Number of days to show */
  dayCount?: number;
  /** Whether to show scroll indicators */
  showScrollIndicators?: boolean;
}

export function DailyForecastSkeleton({
  className,
  dayCount = 7,
  showScrollIndicators = true
}: DailyForecastSkeletonProps) {
  // Daily forecast chip skeleton component
  const DailyChipSkeleton = () => (
    <div className="flex flex-col items-center space-y-2 p-3 min-w-[80px]">
      {/* Day name skeleton */}
      <SkeletonContainer>
        <Skeleton
          className="h-3 w-8"
          aria-label="Loading day name"
        />
      </SkeletonContainer>

      {/* Weather icon skeleton */}
      <SkeletonContainer>
        <Skeleton
          width={32}
          height={32}
          rounded="full"
          className="opacity-60"
          aria-label="Loading weather icon"
        />
      </SkeletonContainer>

      {/* Temperature range skeleton */}
      <div className="flex flex-col items-center space-y-1">
        <SkeletonContainer>
          <Skeleton
            className="h-3 w-8"
            aria-label="Loading high temperature"
          />
        </SkeletonContainer>
        <SkeletonContainer>
          <Skeleton
            className="h-3 w-6"
            aria-label="Loading low temperature"
          />
        </SkeletonContainer>
      </div>

      {/* Precipitation probability skeleton */}
      <SkeletonContainer>
        <Skeleton
          className="h-2 w-6"
          aria-label="Loading precipitation probability"
        />
      </SkeletonContainer>
    </div>
  );

  return (
    <div className={cn("w-full", className)}>
      {/* Scrollable container */}
      <div className="relative">
        <div 
          className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          role="tablist"
          aria-label="Loading 7-day weather forecast"
        >
          {Array.from({ length: dayCount }).map((_, index) => (
            <DailyChipSkeleton key={index} />
          ))}
        </div>

        {/* Scroll indicators */}
        {showScrollIndicators && (
          <>
            {/* Left gradient fade */}
            <div className="absolute left-0 top-0 bottom-2 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none" />
            
            {/* Right gradient fade */}
            <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
          </>
        )}
      </div>

      {/* Scroll hint for mobile */}
      <div className="text-xs text-muted-foreground text-center mt-2 md:hidden">
        ← Scroll to see more days →
      </div>
    </div>
  );
}
