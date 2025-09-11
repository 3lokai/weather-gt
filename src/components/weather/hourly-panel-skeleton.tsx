'use client';

import { Card } from "@/components/ui/card";
import { Skeleton, SkeletonContainer } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface HourlyPanelSkeletonProps {
  /** Additional CSS classes */
  className?: string;
  /** Whether to show in list view mode */
  viewMode?: 'chart' | 'list';
  /** Number of hourly items to show */
  itemCount?: number;
}

export function HourlyPanelSkeleton({
  className,
  viewMode = 'chart',
  itemCount = 24
}: HourlyPanelSkeletonProps) {
  // Chart view skeleton
  const ChartSkeleton = () => (
    <div className="h-64 w-full">
      <SkeletonContainer className="w-full h-full">
        <Skeleton
          className="w-full h-full"
          rounded="lg"
          aria-label="Loading hourly weather chart"
        />
      </SkeletonContainer>
    </div>
  );

  // List view skeleton
  const ListSkeleton = () => (
    <div className="space-y-1 max-h-80 overflow-y-auto">
      {Array.from({ length: Math.min(itemCount, 12) }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-4 p-4 rounded-lg"
          role="listitem"
          aria-label={`Loading hourly weather data for hour ${index + 1}`}
        >
          {/* Time skeleton */}
          <SkeletonContainer>
            <Skeleton
              className="w-16 h-4"
              aria-label="Loading time"
            />
          </SkeletonContainer>
          
          {/* Weather Icon skeleton */}
          <SkeletonContainer>
            <Skeleton
              width={40}
              height={40}
              rounded="full"
              className="opacity-60"
              aria-label="Loading weather icon"
            />
          </SkeletonContainer>
          
          {/* Temperature and condition skeleton */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-3">
              <SkeletonContainer>
                <Skeleton
                  className="h-6 w-12"
                  aria-label="Loading temperature"
                />
              </SkeletonContainer>
              <SkeletonContainer>
                <Skeleton
                  className="h-5 w-16"
                  aria-label="Loading comfort level"
                />
              </SkeletonContainer>
            </div>
            <SkeletonContainer>
              <Skeleton
                className="h-4 w-20"
                aria-label="Loading weather condition"
              />
            </SkeletonContainer>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <Card className={cn("p-6", className)}>
      <div className="mb-4">
        {/* Header skeleton */}
        <SkeletonContainer className="mb-2">
          <Skeleton
            className="h-6 w-40"
            aria-label="Loading hourly forecast header"
          />
        </SkeletonContainer>
        
        {/* View mode toggle skeleton */}
        <div className="flex gap-2">
          <SkeletonContainer>
            <Skeleton
              className="h-8 w-20"
              aria-label="Loading chart view button"
            />
          </SkeletonContainer>
          <SkeletonContainer>
            <Skeleton
              className="h-8 w-20"
              aria-label="Loading list view button"
            />
          </SkeletonContainer>
        </div>
      </div>
      
      {/* Main content skeleton */}
      {viewMode === 'chart' ? <ChartSkeleton /> : <ListSkeleton />}
      
      {/* Legend skeleton */}
      <div className="mt-4 flex items-center justify-center gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex items-center gap-2">
            <SkeletonContainer>
              <Skeleton
                width={12}
                height={12}
                rounded="full"
                aria-hidden="true"
              />
            </SkeletonContainer>
            <SkeletonContainer>
              <Skeleton
                className="h-4 w-16"
                aria-label="Loading legend item"
              />
            </SkeletonContainer>
          </div>
        ))}
      </div>
    </Card>
  );
}
