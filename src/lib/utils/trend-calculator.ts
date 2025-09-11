/**
 * Trend calculation utilities for weather metrics
 * Used for calculating pressure trends and other directional changes
 */

export type TrendDirection = 'up' | 'down' | 'stable';

export interface TrendResult {
  direction: TrendDirection;
  arrow: string;
  description: string;
  change: number;
}

/**
 * Calculate pressure trend by comparing current pressure to historical values
 * @param currentPressure Current pressure value
 * @param historicalPressures Array of historical pressure values (most recent first)
 * @param timeWindowHours Number of hours to look back (default: 4)
 * @returns Trend result with direction, arrow, and description
 */
export function calculatePressureTrend(
  currentPressure: number,
  historicalPressures: number[],
  timeWindowHours: number = 4
): TrendResult {
  if (historicalPressures.length === 0) {
    return {
      direction: 'stable',
      arrow: '→',
      description: 'No trend data',
      change: 0
    };
  }

  // Use the pressure value from the specified time window
  // For simplicity, we'll use the first available historical value
  // In a real implementation, you'd interpolate based on exact time
  const historicalPressure = historicalPressures[0];
  const change = currentPressure - historicalPressure;
  
  // Define thresholds for trend determination
  const threshold = 0.5; // hPa threshold for significant change
  
  let direction: TrendDirection;
  let arrow: string;
  let description: string;

  if (Math.abs(change) < threshold) {
    direction = 'stable';
    arrow = '→';
    description = 'Stable';
  } else if (change > 0) {
    direction = 'up';
    arrow = '↑';
    description = 'Rising';
  } else {
    direction = 'down';
    arrow = '↓';
    description = 'Falling';
  }

  return {
    direction,
    arrow,
    description,
    change: Math.round(change * 10) / 10 // Round to 1 decimal place
  };
}

/**
 * Calculate wind gusts trend by comparing current gusts to base wind speed
 * @param windGusts Current wind gusts value
 * @param windSpeed Base wind speed value
 * @param threshold Minimum difference to show gusts (default: 5 units)
 * @returns Object indicating if gusts should be shown and the difference
 */
export function calculateWindGustsTrend(
  windGusts: number,
  windSpeed: number,
  threshold: number = 5
): { shouldShow: boolean; difference: number; isSignificant: boolean } {
  const difference = windGusts - windSpeed;
  const isSignificant = difference >= threshold;
  
  return {
    shouldShow: isSignificant,
    difference: Math.round(difference * 10) / 10,
    isSignificant
  };
}

/**
 * Format trend display with arrow and change value
 * @param trend Trend result from calculatePressureTrend
 * @param unit Pressure unit (hPa or inHg)
 * @returns Formatted string for display
 */
export function formatTrendDisplay(trend: TrendResult, unit: 'hPa' | 'inHg' = 'hPa'): string {
  if (trend.direction === 'stable') {
    return `${trend.arrow} ${trend.description}`;
  }
  
  const unitLabel = unit === 'inHg' ? 'inHg' : 'hPa';
  return `${trend.arrow} ${trend.description} ${Math.abs(trend.change)} ${unitLabel}`;
}

/**
 * Get trend color class based on direction
 * @param direction Trend direction
 * @returns CSS class for trend color using custom properties
 */
export function getTrendColorClass(direction: TrendDirection): string {
  switch (direction) {
    case 'up':
      return 'text-[var(--success)]';
    case 'down':
      return 'text-[var(--destructive)]';
    case 'stable':
    default:
      return 'text-[var(--muted-foreground)]';
  }
}
