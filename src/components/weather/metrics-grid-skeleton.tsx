'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton, SkeletonContainer } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface MetricsGridSkeletonProps {
  /** Additional CSS classes */
  className?: string;
  /** Size variant for the grid */
  size?: 'sm' | 'md' | 'lg';
  /** Layout variant */
  layout?: 'grid' | 'list';
  /** Number of metrics to show */
  metricCount?: number;
  /** Show extended metrics */
  showExtendedMetrics?: boolean;
}

export function MetricsGridSkeleton({
  className,
  size = 'md',
  layout = 'grid',
  metricCount = 6,
  showExtendedMetrics = false
}: MetricsGridSkeletonProps) {
  // Size-based styling matching the original component
  const sizeStyles = {
    sm: {
      card: "p-3",
      icon: "text-lg",
      label: "text-xs",
      value: "text-sm font-semibold",
      gap: "gap-2"
    },
    md: {
      card: "p-4",
      icon: "text-xl",
      label: "text-sm",
      value: "text-base font-semibold",
      gap: "gap-3"
    },
    lg: {
      card: "p-6",
      icon: "text-2xl",
      label: "text-base",
      value: "text-lg font-semibold",
      gap: "gap-4"
    }
  };

  const styles = sizeStyles[size];

  // Adjust metric count based on extended metrics setting
  const actualMetricCount = showExtendedMetrics ? Math.min(metricCount, 9) : Math.min(metricCount, 6);

  // Dynamic grid columns based on number of metrics
  const getGridCols = (count: number) => {
    if (count <= 3) return 'grid-cols-2 md:grid-cols-3';
    if (count <= 5) return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5';
    if (count <= 7) return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7';
    return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8';
  };

  // Layout classes
  const layoutClasses = layout === 'grid' 
    ? `grid ${getGridCols(actualMetricCount)} ${styles.gap}`
    : `flex flex-col ${styles.gap}`;

  // Metric skeleton component
  const MetricSkeleton = () => (
    <Card
      className={cn(
        "glass-subtle transition-all duration-200",
        styles.card
      )}
      role="group"
      aria-label="Loading weather metric"
    >
      <CardContent className="flex items-center justify-between space-x-3">
        {/* Icon skeleton on the left */}
        <SkeletonContainer>
          <Skeleton
            className={cn(
              "w-6 h-6 rounded-full",
              styles.icon
            )}
            aria-hidden="true"
          />
        </SkeletonContainer>

        {/* Value and label on the right */}
        <div className="flex flex-col items-end text-right flex-1 space-y-1">
          {/* Value skeleton */}
          <SkeletonContainer>
            <Skeleton
              className={cn(
                "h-4 w-12",
                styles.value
              )}
              aria-label="Loading metric value"
            />
          </SkeletonContainer>

          {/* Label skeleton */}
          <SkeletonContainer>
            <Skeleton
              className={cn(
                "h-3 w-16",
                styles.label
              )}
              aria-label="Loading metric label"
            />
          </SkeletonContainer>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div 
      className={cn(layoutClasses, className)}
      role="region"
      aria-label="Loading weather metrics"
    >
      {Array.from({ length: actualMetricCount }).map((_, index) => (
        <MetricSkeleton key={index} />
      ))}
    </div>
  );
}
