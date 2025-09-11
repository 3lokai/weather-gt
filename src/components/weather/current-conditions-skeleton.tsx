'use client';

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton, SkeletonContainer } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface CurrentConditionsSkeletonProps {
  /** Additional CSS classes */
  className?: string;
  /** Size variant for the skeleton */
  size?: 'sm' | 'md' | 'lg';
  /** Show apparent temperature skeleton */
  showApparentTemp?: boolean;
  /** Show precipitation probability skeleton */
  showPrecipitation?: boolean;
  /** Enable weather hero background skeleton */
  showHeroBackground?: boolean;
}

export function CurrentConditionsSkeleton({
  className,
  size = 'md',
  showApparentTemp = true,
  showPrecipitation = true,
  showHeroBackground = false
}: CurrentConditionsSkeletonProps) {
  // Size-based styling matching the original component
  const sizeStyles = {
    sm: {
      card: "py-4 aspect-square md:aspect-[16/9]",
      icon: 64,
      tempSize: "text-4xl",
      locationSize: "text-sm",
      conditionSize: "text-xs"
    },
    md: {
      card: "py-6 aspect-square md:aspect-[16/9]", 
      icon: 96,
      tempSize: "text-6xl",
      locationSize: "text-base",
      conditionSize: "text-sm"
    },
    lg: {
      card: "py-8 aspect-square md:aspect-[16/9]",
      icon: 128,
      tempSize: "text-8xl",
      locationSize: "text-lg", 
      conditionSize: "text-base"
    }
  };

  const styles = sizeStyles[size];

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-300 flex flex-col",
        styles.card,
        className
      )}
      role="region"
      aria-label="Loading current weather conditions"
    >
      {/* Weather Hero Background Skeleton */}
      {showHeroBackground && (
        <div className="absolute inset-0 pointer-events-none">
          <Skeleton 
            className="w-full h-full opacity-20" 
            rounded="none"
            aria-hidden="true"
          />
        </div>
      )}

      <CardHeader className="relative z-10 text-center space-y-1 md:space-y-2">
        {/* Location Skeleton */}
        <SkeletonContainer className="flex justify-center">
          <Skeleton
            className={cn(
              "h-4 w-32",
              styles.locationSize
            )}
            aria-label="Loading location"
          />
        </SkeletonContainer>
      </CardHeader>

      <CardContent className="relative z-10 text-center space-y-2 md:space-y-4 flex-1 flex flex-col justify-center">
        {/* Weather Icon Skeleton */}
        <div className="flex justify-center">
          <SkeletonContainer>
            <Skeleton
              width={styles.icon}
              height={styles.icon}
              rounded="full"
              className="opacity-60"
              aria-label="Loading weather icon"
            />
          </SkeletonContainer>
        </div>

        {/* Current Temperature Skeleton */}
        <div className="flex justify-center">
          <SkeletonContainer>
            <Skeleton
              className={cn(
                "h-16 w-24",
                styles.tempSize
              )}
              aria-label="Loading temperature"
            />
          </SkeletonContainer>
        </div>

        {/* Weather Condition Skeleton */}
        <div className="flex justify-center">
          <SkeletonContainer>
            <Skeleton
              className={cn(
                "h-4 w-20",
                styles.conditionSize
              )}
              aria-label="Loading weather condition"
            />
          </SkeletonContainer>
        </div>

        {/* Apparent Temperature Skeleton */}
        {showApparentTemp && (
          <div className="flex justify-center">
            <SkeletonContainer>
              <Skeleton
                className={cn(
                  "h-3 w-24",
                  size === 'sm' ? 'text-xs' : 'text-sm'
                )}
                aria-label="Loading apparent temperature"
              />
            </SkeletonContainer>
          </div>
        )}

        {/* Precipitation Probability Skeleton */}
        {showPrecipitation && (
          <div className="flex justify-center">
            <SkeletonContainer>
              <Skeleton
                className={cn(
                  "h-3 w-28",
                  size === 'sm' ? 'text-xs' : 'text-sm'
                )}
                aria-label="Loading precipitation probability"
              />
            </SkeletonContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
