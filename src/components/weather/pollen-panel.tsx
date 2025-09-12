'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PollenData } from "@/lib/types/pollen";
import {
  getPollenSeverityColorClasses,
  formatPollenValue,
  getPollenTypeInfo,
} from "@/lib/utils/pollen";

export interface PollenPanelProps {
  /** Pollen data containing all metrics */
  pollen: PollenData | null;
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: string | null;
  /** Additional CSS classes */
  className?: string;
  /** Size variant for the panel */
  size?: 'sm' | 'lg';
  /** Show tooltips for metrics */
  showTooltips?: boolean;
  /** Layout variant */
  layout?: 'grid' | 'list';
}

interface PollenMetricConfig {
  key: keyof PollenData;
  label: string;
  icon: string;
  getInfo: () => { description: string; healthImplications: string; icon: string };
}

const metricConfigs: PollenMetricConfig[] = [
  {
    key: 'grass',
    label: 'Grass',
    icon: '🌾',
    getInfo: () => getPollenTypeInfo('grass'),
  },
  {
    key: 'tree',
    label: 'Tree',
    icon: '🌳',
    getInfo: () => getPollenTypeInfo('tree'),
  },
  {
    key: 'weed',
    label: 'Weed',
    icon: '🌿',
    getInfo: () => getPollenTypeInfo('weed'),
  },
];

export function PollenPanel({
  pollen,
  isLoading = false,
  error = null,
  className,
  size = 'sm',
  showTooltips = true,
  layout = 'grid',
}: PollenPanelProps) {
  // Size-based styling using consistent typography and spacing classes
  const sizeStyles = {
    sm: {
      card: "p-4", // 16px - consistent with design system
      icon: "text-lg",
      label: "text-caption", // 14px line-height: 18px
      value: "text-body-s font-semibold", // 16px line-height: 22px
      gap: "gap-3", // 12px - consistent spacing
      title: "text-body-s", // 16px line-height: 22px
    },
    lg: {
      card: "p-6", // 24px - consistent with design system
      icon: "text-2xl",
      label: "text-body-s", // 16px line-height: 22px
      value: "text-body-m font-semibold", // 18px line-height: 26px
      gap: "gap-3", // 12px - consistent spacing
      title: "text-body-m", // 18px line-height: 26px
    }
  };

  const styles = sizeStyles[size];

  // Layout classes
  const layoutClasses = layout === 'grid' 
    ? `grid grid-cols-1 md:grid-cols-3 ${styles.gap}`
    : `flex flex-col ${styles.gap}`;

  // Loading skeleton component
  const MetricSkeleton = ({ metric }: { metric: PollenMetricConfig }) => (
    <Card
      className={cn(
        "glass-subtle animate-pulse",
        styles.card
      )}
      role="group"
      aria-label={`Loading ${metric.label} pollen`}
    >
      <CardContent className="flex items-center justify-between space-x-3">
        <div 
          className={cn(styles.icon, "opacity-50 flex-shrink-0")}
          aria-hidden="true"
        >
          {metric.icon}
        </div>
        <div className="flex flex-col items-end text-right flex-1 space-y-1">
          <div 
            className={cn(
              "bg-muted rounded w-12 h-4",
              styles.value
            )}
            aria-hidden="true"
          />
          <div 
            className={cn(
              "text-muted-foreground font-medium",
              styles.label
            )}
          >
            {metric.label}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Error state component
  const ErrorState = () => (
    <Card className="glass-subtle col-span-full">
      <CardContent className="flex flex-col items-center text-center space-y-2 p-6">
        <div className="text-2xl" aria-hidden="true">⚠️</div>
        <div className="text-body-s text-muted-foreground font-medium">
          Unable to load pollen data
        </div>
        <div className="text-caption text-muted-foreground">
          {error || 'Pollen data may not be available for this region'}
        </div>
      </CardContent>
    </Card>
  );

  // Empty state component
  const EmptyState = () => (
    <Card className="glass-subtle col-span-full">
      <CardContent className="flex flex-col items-center text-center space-y-2 p-6">
        <div className="text-2xl" aria-hidden="true">🌱</div>
        <div className="text-body-s text-muted-foreground font-medium">
          No pollen data available
        </div>
        <div className="text-caption text-muted-foreground">
          Pollen information is not available for this region
        </div>
      </CardContent>
    </Card>
  );

  // Handle error state
  if (error) {
    return (
      <div 
        className={cn(layoutClasses, className)}
        role="region"
        aria-label="Pollen data - Error"
      >
        <ErrorState />
      </div>
    );
  }

  // Handle loading state
  if (isLoading) {
    return (
      <div 
        className={cn(layoutClasses, className)}
        role="region"
        aria-label="Pollen data - Loading"
      >
        {metricConfigs.map((metric) => (
          <MetricSkeleton key={metric.key} metric={metric} />
        ))}
      </div>
    );
  }

  // Handle empty state (no pollen data)
  if (!pollen) {
    return (
      <div 
        className={cn(layoutClasses, className)}
        role="region"
        aria-label="Pollen data - Empty"
      >
        <EmptyState />
      </div>
    );
  }

  return (
    <div 
      className={cn(layoutClasses, className)}
      role="region"
      aria-label="Pollen levels"
    >
      {/* Individual Metrics */}
      {metricConfigs.map((metric) => {
        const metricData = pollen[metric.key];
        const colorClasses = getPollenSeverityColorClasses(metricData.severity);
        const typeInfo = metric.getInfo();
        
        return (
          <Card
            key={metric.key}
            className={cn(
              "glass-subtle transition-all duration-200 hover:glass-hover",
              styles.card
            )}
            role="group"
            aria-label={`${metric.label} pollen: ${formatPollenValue(metricData.value, metricData.unit)} - ${metricData.description}`}
            tabIndex={0}
          >
            <CardContent className="flex items-center justify-between space-x-3">
              {/* Icon on the left */}
              <div 
                className={cn(styles.icon, "flex-shrink-0")}
                aria-hidden="true"
              >
                {metric.icon}
              </div>

              {/* Value and label on the right */}
              <div className="flex flex-col items-end text-right flex-1">
                {/* Value */}
                <div 
                  className={cn(
                    "text-foreground font-semibold",
                    styles.value
                  )}
                  aria-label={`Value: ${formatPollenValue(metricData.value, metricData.unit)}`}
                >
                  {formatPollenValue(metricData.value, metricData.unit)}
                </div>

                {/* Severity Badge */}
                <Badge
                  className={cn(
                    "text-caption font-medium mt-1",
                    colorClasses.background,
                    colorClasses.text,
                    colorClasses.border
                  )}
                  variant="outline"
                >
                  {metricData.description}
                </Badge>

                {/* Label below the value */}
                <div 
                  className={cn(
                    "text-muted-foreground font-medium mt-1",
                    styles.label
                  )}
                  aria-label={`Pollen type: ${metric.label}`}
                >
                  {metric.label}
                </div>
              </div>

              {/* Tooltip */}
              {showTooltips && (
                <div 
                  className="sr-only"
                  role="tooltip"
                  aria-describedby={`${metric.key}-tooltip`}
                >
                  <div id={`${metric.key}-tooltip`}>
                    <strong>{metric.label} Pollen:</strong> {typeInfo.description}
                    <br />
                    <strong>Health Implications:</strong> {typeInfo.healthImplications}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

/**
 * Hook to get formatted pollen data
 * This integrates with the pollen API data structure
 */
export function usePollenData(pollenData: any) {
  if (!pollenData) return null;

  // Transform API data to our internal format
  const transformMetric = (value: number, severity: any, unit: string, description: string, healthImplications: string) => ({
    value,
    unit,
    severity,
    description,
    healthImplications,
  });

  return {
    grass: transformMetric(pollenData.grass.value, pollenData.grass.severity, pollenData.grass.unit, pollenData.grass.description, pollenData.grass.healthImplications),
    tree: transformMetric(pollenData.tree.value, pollenData.tree.severity, pollenData.tree.unit, pollenData.tree.description, pollenData.tree.healthImplications),
    weed: transformMetric(pollenData.weed.value, pollenData.weed.severity, pollenData.weed.unit, pollenData.weed.description, pollenData.weed.healthImplications),
  };
}
