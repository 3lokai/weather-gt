'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LottiePM25, LottiePM10, LottieO3, LottieNO2, LottieSO2, LottieCO } from "@/components/common/lottie-metric";
import { cn } from "@/lib/utils";
import { AirQualityData, AirQualitySeverity } from "@/lib/types/air-quality";
import {
  getPM25Severity,
  getPM10Severity,
  getO3Severity,
  getNO2Severity,
  getSO2Severity,
  getCOSeverity,
  getSeverityDescription,
  getSeverityColorClasses,
  formatAirQualityValue,
  getHealthImplications,
  getMetricInfo,
  getAQISeverity,
} from "@/lib/utils/air-quality";

export interface AirQualityPanelProps {
  /** Air quality data containing all metrics */
  airQuality: AirQualityData | null;
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: string | null;
  /** Additional CSS classes */
  className?: string;
  /** Size variant for the panel */
  size?: 'sm' | 'md' | 'lg';
  /** Show tooltips for metrics */
  showTooltips?: boolean;
  /** Layout variant */
  layout?: 'grid' | 'list';
  /** Show AQI when available */
  showAQI?: boolean;
}

interface AirQualityMetricConfig {
  key: keyof Omit<AirQualityData, 'aqi'>;
  label: string;
  getSeverity: (value: number) => AirQualitySeverity;
  unit: string;
  lottieComponent: React.ComponentType<any>;
}

const metricConfigs: AirQualityMetricConfig[] = [
  {
    key: 'pm2_5',
    label: 'PM2.5',
    getSeverity: getPM25Severity,
    unit: 'μg/m³',
    lottieComponent: LottiePM25,
  },
  {
    key: 'pm10',
    label: 'PM10',
    getSeverity: getPM10Severity,
    unit: 'μg/m³',
    lottieComponent: LottiePM10,
  },
  {
    key: 'o3',
    label: 'O₃',
    getSeverity: getO3Severity,
    unit: 'μg/m³',
    lottieComponent: LottieO3,
  },
  {
    key: 'no2',
    label: 'NO₂',
    getSeverity: getNO2Severity,
    unit: 'μg/m³',
    lottieComponent: LottieNO2,
  },
  {
    key: 'so2',
    label: 'SO₂',
    getSeverity: getSO2Severity,
    unit: 'μg/m³',
    lottieComponent: LottieSO2,
  },
  {
    key: 'co',
    label: 'CO',
    getSeverity: getCOSeverity,
    unit: 'mg/m³',
    lottieComponent: LottieCO,
  },
];

export function AirQualityPanel({
  airQuality,
  isLoading = false,
  error = null,
  className,
  size = 'md',
  showTooltips = true,
  layout = 'grid',
  showAQI = true,
}: AirQualityPanelProps) {
  // Size-based styling
  const sizeStyles = {
    sm: {
      card: "p-3",
      icon: "text-lg",
      label: "text-xs",
      value: "text-sm font-semibold",
      gap: "gap-2",
      title: "text-sm",
    },
    md: {
      card: "p-4",
      icon: "text-xl",
      label: "text-sm",
      value: "text-base font-semibold",
      gap: "gap-3",
      title: "text-base",
    },
    lg: {
      card: "p-6",
      icon: "text-2xl",
      label: "text-base",
      value: "text-lg font-semibold",
      gap: "gap-4",
      title: "text-lg",
    }
  };

  const styles = sizeStyles[size];

  // Layout classes
  const layoutClasses = layout === 'grid' 
    ? `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 ${styles.gap}`
    : `flex flex-col ${styles.gap}`;

  // Loading skeleton component
  const MetricSkeleton = ({ metric }: { metric: AirQualityMetricConfig }) => (
    <Card
      className={cn(
        "glass-subtle animate-pulse",
        styles.card
      )}
      role="group"
      aria-label={`Loading ${metric.label}`}
    >
      <CardContent className="flex items-center justify-between space-x-3">
        {/* Loading placeholder for Lottie */}
        <div className="flex-shrink-0">
          <div 
            className="animate-pulse bg-muted rounded-md"
            style={{ width: 40, height: 40 }}
          />
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
        <div className="text-muted-foreground font-medium">
          Unable to load air quality data
        </div>
        <div className="text-sm text-muted-foreground">
          {error || 'Please try again later'}
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
        aria-label="Air quality - Error"
      >
        <ErrorState />
      </div>
    );
  }

  // Handle loading state
  if (isLoading || !airQuality) {
    return (
      <div 
        className={cn(layoutClasses, className)}
        role="region"
        aria-label="Air quality - Loading"
      >
        {metricConfigs.map((metric) => (
          <MetricSkeleton key={metric.key} metric={metric} />
        ))}
      </div>
    );
  }

  return (
    <div 
      className={cn(layoutClasses, className)}
      role="region"
      aria-label="Air quality metrics"
    >
      {/* AQI Display (if available and enabled) */}
      {showAQI && airQuality.aqi && (
        <Card className="glass-subtle col-span-full">
          <CardHeader className="pb-3">
            <CardTitle className={cn("flex items-center gap-2", styles.title)}>
              <span aria-hidden="true">🌍</span>
              Air Quality Index ({airQuality.aqi.region.toUpperCase()})
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <div className={cn("font-bold", styles.value)}>
                  {airQuality.aqi.value}
                </div>
                <div className={cn("text-muted-foreground", styles.label)}>
                  {airQuality.aqi.description}
                </div>
              </div>
              <Badge
                className={cn(
                  "text-xs font-medium",
                  getSeverityColorClasses(airQuality.aqi.severity).background,
                  getSeverityColorClasses(airQuality.aqi.severity).text,
                  getSeverityColorClasses(airQuality.aqi.severity).border
                )}
                variant="outline"
              >
                {getSeverityDescription(airQuality.aqi.severity)}
              </Badge>
            </div>
            {showTooltips && (
              <div className="mt-2 text-xs text-muted-foreground">
                {getHealthImplications(airQuality.aqi.severity)}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Individual Metrics */}
      {metricConfigs.map((metric) => {
        const metricData = airQuality[metric.key];
        const severity = metric.getSeverity(metricData.value);
        const colorClasses = getSeverityColorClasses(severity);
        const metricInfo = getMetricInfo(metric.key);
        
        return (
          <Card
            key={metric.key}
            className={cn(
              "glass-subtle transition-all duration-200 hover:glass-hover",
              styles.card
            )}
            role="group"
            aria-label={`${metric.label}: ${formatAirQualityValue(metricData.value, metric.unit)} - ${getSeverityDescription(severity)}`}
            tabIndex={0}
          >
            <CardContent className="flex items-center justify-between space-x-3">
              {/* Lottie Animation as Icon */}
              <div className="flex-shrink-0">
                <metric.lottieComponent
                  value={metricData.value}
                  duration={180}
                  className="inline-block"
                  showLottie={true}
                  lottieSize={40}
                  showText={false}
                />
              </div>

              {/* Value and label on the right */}
              <div className="flex flex-col items-end text-right flex-1">
                {/* Value with unit */}
                <div 
                  className={cn(
                    "text-foreground font-semibold",
                    styles.value
                  )}
                  aria-label={`Value: ${formatAirQualityValue(metricData.value, metric.unit)}`}
                >
                  {formatAirQualityValue(metricData.value, metric.unit)}
                </div>

                {/* Metric Type (PM2.5, O3, etc.) */}
                <div 
                  className={cn(
                    "text-muted-foreground font-medium",
                    styles.label
                  )}
                  aria-label={`Metric: ${metric.label}`}
                >
                  {metric.label}
                </div>

                {/* Severity Badge */}
                <Badge
                  className={cn(
                    "text-xs font-medium mt-1",
                    colorClasses.background,
                    colorClasses.text,
                    colorClasses.border
                  )}
                  variant="outline"
                >
                  {getSeverityDescription(severity)}
                </Badge>
              </div>

              {/* Tooltip */}
              {showTooltips && (
                <div 
                  className="sr-only"
                  role="tooltip"
                  aria-describedby={`${metric.key}-tooltip`}
                >
                  <div id={`${metric.key}-tooltip`}>
                    <strong>{metric.label}:</strong> {metricInfo.description}
                    <br />
                    <strong>Health Implications:</strong> {metricInfo.healthImplications}
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
 * Hook to get formatted air quality data
 * This integrates with the air quality API data structure
 */
export function useAirQualityData(airQualityData: any) {
  if (!airQualityData) return null;

  // Transform API data to our internal format
  const transformMetric = (value: number, getSeverity: (value: number) => AirQualitySeverity, unit: string) => ({
    value,
    unit,
    severity: getSeverity(value),
    description: getSeverityDescription(getSeverity(value)),
    healthImplications: getHealthImplications(getSeverity(value)),
  });

  return {
    pm2_5: transformMetric(airQualityData.pm2_5, getPM25Severity, 'μg/m³'),
    pm10: transformMetric(airQualityData.pm10, getPM10Severity, 'μg/m³'),
    o3: transformMetric(airQualityData.o3, getO3Severity, 'μg/m³'),
    no2: transformMetric(airQualityData.no2, getNO2Severity, 'μg/m³'),
    so2: transformMetric(airQualityData.so2, getSO2Severity, 'μg/m³'),
    co: transformMetric(airQualityData.co, getCOSeverity, 'mg/m³'),
    aqi: airQualityData.us_aqi ? {
      value: airQualityData.us_aqi,
      severity: getAQISeverity(airQualityData.us_aqi, 'us'),
      description: getSeverityDescription(getAQISeverity(airQualityData.us_aqi, 'us')),
      region: 'us' as const,
    } : airQualityData.european_aqi ? {
      value: airQualityData.european_aqi,
      severity: getAQISeverity(airQualityData.european_aqi, 'european'),
      description: getSeverityDescription(getAQISeverity(airQualityData.european_aqi, 'european')),
      region: 'european' as const,
    } : undefined,
  };
}
