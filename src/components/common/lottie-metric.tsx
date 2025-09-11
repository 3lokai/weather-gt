'use client';

import { useEffect, useState, useRef } from 'react';
import Lottie from 'lottie-react';
import { cn } from '@/lib/utils';

export interface LottieMetricProps {
  /** The numeric value to display */
  value: number;
  /** Duration of the number animation in milliseconds (default: 180ms) */
  duration?: number;
  /** Number of decimal places to show */
  precision?: number;
  /** Additional CSS classes */
  className?: string;
  /** Animation easing function */
  easing?: 'ease-out' | 'ease-in' | 'ease-in-out' | 'linear';
  /** Whether to animate on mount */
  animateOnMount?: boolean;
  /** Custom formatter function */
  formatter?: (value: number) => string;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** Lottie animation type */
  lottieType: 'temperature' | 'wind' | 'precipitation' | 'pressure' | 'humidity' | 'uv' | 'pollen' | 'air-quality' | 'pm25' | 'pm10' | 'o3' | 'no2' | 'so2' | 'co' | 'visibility';
  /** Lottie animation size */
  lottieSize?: number;
  /** Whether to show the Lottie animation */
  showLottie?: boolean;
  /** Whether to show the text value */
  showText?: boolean;
  /** Animation speed multiplier */
  lottieSpeed?: number;
  /** Whether to loop the Lottie animation */
  lottieLoop?: boolean;
}

// Mapping from metric types to appropriate Lottie animations
const getLottieAnimation = (type: string, value: number): string => {
  switch (type) {
    case 'temperature':
      if (value > 30) return 'thermometer-warmer';
      if (value < 10) return 'thermometer-colder';
      return 'thermometer';
    
    case 'wind':
      // Map wind speed to Beaufort scale (0-12)
      const beaufort = Math.min(Math.floor(value / 2.5), 12);
      return `wind-beaufort-${beaufort}`;
    
    case 'precipitation':
      if (value > 10) return 'raindrops';
      return 'raindrop';
    
    case 'pressure':
      // High pressure > 1013 hPa, Low pressure < 1013 hPa
      return value > 1013 ? 'pressure-high' : 'pressure-low';
    
    case 'humidity':
      return 'humidity';
    
    case 'uv':
      // Map UV index to appropriate level (1-11)
      const uvLevel = Math.min(Math.max(Math.floor(value), 1), 11);
      return `uv-index-${uvLevel}`;
    
    case 'pollen':
      return 'pollen';
    
    case 'air-quality':
      return 'smoke';
    
    case 'pm25':
      return 'smoke-particles'; // Fine particles
    case 'pm10':
      return 'dust'; // Coarse particles
    case 'o3':
      return 'sun-hot'; // Ozone related to sun/UV
    case 'no2':
      return 'smoke'; // Nitrogen dioxide
    case 'so2':
      return 'smoke'; // Sulfur dioxide
    case 'co':
      return 'smoke'; // Carbon monoxide
    
    case 'visibility':
      return 'horizon'; // Visibility/distance
    
    default:
      return 'thermometer'; // fallback
  }
};

export function LottieMetric({
  value,
  duration = 180,
  precision = 0,
  className,
  easing = 'ease-out',
  animateOnMount = false,
  formatter,
  'aria-label': ariaLabel,
  lottieType,
  lottieSize = 24,
  showLottie = true,
  showText = true,
  lottieSpeed = 1,
  lottieLoop = true,
  ...props
}: LottieMetricProps) {
  const [displayValue, setDisplayValue] = useState(animateOnMount ? 0 : value);
  const [isAnimating, setIsAnimating] = useState(false);
  const [lottieData, setLottieData] = useState<any>(null);
  const [lottieLoading, setLottieLoading] = useState(true);
  const [lottieError, setLottieError] = useState<string | null>(null);
  const previousValue = useRef(value);
  const animationRef = useRef<number | undefined>(undefined);
  const lottieRef = useRef<any>(null);

  // Easing functions
  const easingFunctions = {
    'ease-out': (t: number) => 1 - Math.pow(1 - t, 3),
    'ease-in': (t: number) => Math.pow(t, 3),
    'ease-in-out': (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
    'linear': (t: number) => t
  };

  // Load Lottie animation
  useEffect(() => {
    if (!showLottie) return;

    const loadLottieAnimation = async () => {
      try {
        setLottieLoading(true);
        setLottieError(null);
        
        const animationName = getLottieAnimation(lottieType, value);
        const lottiePath = `/icons/meteocons/fill/lottie/${animationName}.json`;
        
        const response = await fetch(lottiePath);
        if (!response.ok) {
          throw new Error(`Failed to load Lottie animation: ${animationName}`);
        }
        
        const animationData = await response.json();
        setLottieData(animationData);
      } catch (err) {
        console.warn(`Failed to load Lottie animation for ${lottieType}`, err);
        setLottieError(err instanceof Error ? err.message : 'Failed to load animation');
      } finally {
        setLottieLoading(false);
      }
    };

    loadLottieAnimation();
  }, [lottieType, value, showLottie]);

  // Set Lottie animation speed
  useEffect(() => {
    if (lottieRef.current && lottieSpeed !== 1) {
      lottieRef.current.setSpeed(lottieSpeed);
    }
  }, [lottieSpeed, lottieData]);

  // Number animation logic (same as AnimatedNumber)
  useEffect(() => {
    // Skip animation if values are the same
    if (value === previousValue.current) return;

    // Skip animation on mount if animateOnMount is false
    if (!animateOnMount && previousValue.current === 0 && value !== 0) {
      setDisplayValue(value);
      previousValue.current = value;
      return;
    }

    setIsAnimating(true);
    const startValue = previousValue.current;
    const endValue = value;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easedProgress = easingFunctions[easing](progress);
      const currentValue = startValue + (endValue - startValue) * easedProgress;
      
      setDisplayValue(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(endValue);
        setIsAnimating(false);
        previousValue.current = endValue;
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value, duration, easing, animateOnMount]);

  // Format the display value
  const formatValue = (val: number) => {
    if (formatter) {
      return formatter(val);
    }
    
    if (precision === 0) {
      return Math.round(val).toString();
    }
    
    return val.toFixed(precision);
  };

  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      {/* Lottie Animation */}
      {showLottie && (
        <div 
          className="flex-shrink-0"
          style={{ width: lottieSize, height: lottieSize }}
          aria-hidden="true"
        >
          {lottieLoading && (
            <div 
              className="animate-pulse bg-muted rounded-md"
              style={{ width: lottieSize, height: lottieSize }}
            />
          )}
          
          {lottieError && (
            <div 
              className="bg-muted rounded-md flex items-center justify-center text-muted-foreground text-xs"
              style={{ width: lottieSize, height: lottieSize }}
            >
              ?
            </div>
          )}
          
          {lottieData && !lottieError && (
            <Lottie
              lottieRef={lottieRef}
              animationData={lottieData}
              loop={lottieLoop}
              autoplay={true}
              style={{ width: '100%', height: '100%' }}
            />
          )}
        </div>
      )}

      {/* Animated Number */}
      {showText && (
        <span
          className={cn(
            "inline-block transition-all duration-150",
            isAnimating && "transform scale-105"
          )}
          aria-label={ariaLabel}
        >
          {formatValue(displayValue)}
        </span>
      )}
    </div>
  );
}

/**
 * Lottie-based temperature component with unit formatting
 */
export interface LottieTemperatureProps {
  /** Temperature value in the current unit */
  value: number;
  /** Temperature unit */
  unit: 'celsius' | 'fahrenheit';
  /** Duration of the animation in milliseconds */
  duration?: number;
  /** Additional CSS classes */
  className?: string;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** Lottie animation size */
  lottieSize?: number;
  /** Whether to show the Lottie animation */
  showLottie?: boolean;
}

export function LottieTemperature({
  value,
  unit,
  duration = 180,
  className,
  'aria-label': ariaLabel,
  lottieSize = 24,
  showLottie = true,
  ...props
}: LottieTemperatureProps) {
  const symbol = unit === 'fahrenheit' ? '°F' : '°C';
  
  return (
    <LottieMetric
      value={value}
      duration={duration}
      precision={0}
      className={className}
      formatter={(val) => `${Math.round(val)}${symbol}`}
      aria-label={ariaLabel}
      lottieType="temperature"
      lottieSize={lottieSize}
      showLottie={showLottie}
      {...props}
    />
  );
}

/**
 * Lottie-based wind speed component with unit formatting
 */
export interface LottieWindSpeedProps {
  /** Wind speed value in the current unit */
  value: number;
  /** Wind speed unit */
  unit: 'kmh' | 'mph';
  /** Duration of the animation in milliseconds */
  duration?: number;
  /** Additional CSS classes */
  className?: string;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** Lottie animation size */
  lottieSize?: number;
  /** Whether to show the Lottie animation */
  showLottie?: boolean;
}

export function LottieWindSpeed({
  value,
  unit,
  duration = 180,
  className,
  'aria-label': ariaLabel,
  lottieSize = 24,
  showLottie = true,
  ...props
}: LottieWindSpeedProps) {
  const unitLabel = unit === 'mph' ? 'mph' : 'km/h';
  
  return (
    <LottieMetric
      value={value}
      duration={duration}
      precision={0}
      className={className}
      formatter={(val) => `${Math.round(val)} ${unitLabel}`}
      aria-label={ariaLabel}
      lottieType="wind"
      lottieSize={lottieSize}
      showLottie={showLottie}
      {...props}
    />
  );
}

/**
 * Lottie-based precipitation component with unit formatting
 */
export interface LottiePrecipitationProps {
  /** Precipitation value in the current unit */
  value: number;
  /** Precipitation unit */
  unit: 'mm' | 'in';
  /** Duration of the animation in milliseconds */
  duration?: number;
  /** Additional CSS classes */
  className?: string;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** Lottie animation size */
  lottieSize?: number;
  /** Whether to show the Lottie animation */
  showLottie?: boolean;
}

export function LottiePrecipitation({
  value,
  unit,
  duration = 180,
  className,
  'aria-label': ariaLabel,
  lottieSize = 24,
  showLottie = true,
  ...props
}: LottiePrecipitationProps) {
  const unitLabel = unit === 'in' ? 'in' : 'mm';
  
  return (
    <LottieMetric
      value={value}
      duration={duration}
      precision={1}
      className={className}
      formatter={(val) => `${(Math.round(val * 10) / 10).toFixed(1)} ${unitLabel}`}
      aria-label={ariaLabel}
      lottieType="precipitation"
      lottieSize={lottieSize}
      showLottie={showLottie}
      {...props}
    />
  );
}

/**
 * Lottie-based pressure component with unit formatting
 */
export interface LottiePressureProps {
  /** Pressure value in the current unit */
  value: number;
  /** Pressure unit */
  unit: 'hPa' | 'inHg';
  /** Duration of the animation in milliseconds */
  duration?: number;
  /** Additional CSS classes */
  className?: string;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** Lottie animation size */
  lottieSize?: number;
  /** Whether to show the Lottie animation */
  showLottie?: boolean;
}

export function LottiePressure({
  value,
  unit,
  duration = 180,
  className,
  'aria-label': ariaLabel,
  lottieSize = 24,
  showLottie = true,
  ...props
}: LottiePressureProps) {
  const unitLabel = unit === 'inHg' ? 'inHg' : 'hPa';
  
  return (
    <LottieMetric
      value={value}
      duration={duration}
      precision={0}
      className={className}
      formatter={(val) => `${Math.round(val)} ${unitLabel}`}
      aria-label={ariaLabel}
      lottieType="pressure"
      lottieSize={lottieSize}
      showLottie={showLottie}
      {...props}
    />
  );
}

/**
 * Lottie-based humidity component with percentage formatting
 */
export interface LottieHumidityProps {
  /** Humidity percentage value */
  value: number;
  /** Duration of the animation in milliseconds */
  duration?: number;
  /** Additional CSS classes */
  className?: string;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** Lottie animation size */
  lottieSize?: number;
  /** Whether to show the Lottie animation */
  showLottie?: boolean;
}

export function LottieHumidity({
  value,
  duration = 180,
  className,
  'aria-label': ariaLabel,
  lottieSize = 24,
  showLottie = true,
  ...props
}: LottieHumidityProps) {
  return (
    <LottieMetric
      value={value}
      duration={duration}
      precision={0}
      className={className}
      formatter={(val) => `${Math.round(val)}%`}
      aria-label={ariaLabel}
      lottieType="humidity"
      lottieSize={lottieSize}
      showLottie={showLottie}
      {...props}
    />
  );
}

/**
 * Lottie-based UV index component
 */
export interface LottieUVIndexProps {
  /** UV index value */
  value: number;
  /** Duration of the animation in milliseconds */
  duration?: number;
  /** Additional CSS classes */
  className?: string;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** Lottie animation size */
  lottieSize?: number;
  /** Whether to show the Lottie animation */
  showLottie?: boolean;
}

export function LottieUVIndex({
  value,
  duration = 180,
  className,
  'aria-label': ariaLabel,
  lottieSize = 24,
  showLottie = true,
  ...props
}: LottieUVIndexProps) {
  return (
    <LottieMetric
      value={value}
      duration={duration}
      precision={0}
      className={className}
      formatter={(val) => `UV ${Math.round(val)}`}
      aria-label={ariaLabel}
      lottieType="uv"
      lottieSize={lottieSize}
      showLottie={showLottie}
      {...props}
    />
  );
}

/**
 * Lottie-based pollen component
 */
export interface LottiePollenProps {
  /** Pollen value */
  value: number;
  /** Duration of the animation in milliseconds */
  duration?: number;
  /** Additional CSS classes */
  className?: string;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** Lottie animation size */
  lottieSize?: number;
  /** Whether to show the Lottie animation */
  showLottie?: boolean;
}

export function LottiePollen({
  value,
  duration = 180,
  className,
  'aria-label': ariaLabel,
  lottieSize = 24,
  showLottie = true,
  ...props
}: LottiePollenProps) {
  return (
    <LottieMetric
      value={value}
      duration={duration}
      precision={0}
      className={className}
      formatter={(val) => `${Math.round(val)}`}
      aria-label={ariaLabel}
      lottieType="pollen"
      lottieSize={lottieSize}
      showLottie={showLottie}
      {...props}
    />
  );
}

/**
 * Lottie-based precipitation probability component with percentage formatting
 */
export interface LottiePrecipitationProbabilityProps {
  /** Precipitation probability percentage value */
  value: number;
  /** Duration of the animation in milliseconds */
  duration?: number;
  /** Additional CSS classes */
  className?: string;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** Lottie animation size */
  lottieSize?: number;
  /** Whether to show the Lottie animation */
  showLottie?: boolean;
}

export function LottiePrecipitationProbability({
  value,
  duration = 180,
  className,
  'aria-label': ariaLabel,
  lottieSize = 24,
  showLottie = true,
  ...props
}: LottiePrecipitationProbabilityProps) {
  return (
    <LottieMetric
      value={value}
      duration={duration}
      precision={0}
      className={className}
      formatter={(val) => `${Math.round(val)}%`}
      aria-label={ariaLabel}
      lottieType="precipitation"
      lottieSize={lottieSize}
      showLottie={showLottie}
      {...props}
    />
  );
}

/**
 * Lottie-based cloud cover component with percentage formatting
 */
export interface LottieCloudCoverProps {
  /** Cloud cover percentage value */
  value: number;
  /** Duration of the animation in milliseconds */
  duration?: number;
  /** Additional CSS classes */
  className?: string;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** Lottie animation size */
  lottieSize?: number;
  /** Whether to show the Lottie animation */
  showLottie?: boolean;
}

export function LottieCloudCover({
  value,
  duration = 180,
  className,
  'aria-label': ariaLabel,
  lottieSize = 24,
  showLottie = true,
  ...props
}: LottieCloudCoverProps) {
  return (
    <LottieMetric
      value={value}
      duration={duration}
      precision={0}
      className={className}
      formatter={(val) => `${Math.round(val)}%`}
      aria-label={ariaLabel}
      lottieType="humidity"
      lottieSize={lottieSize}
      showLottie={showLottie}
      {...props}
    />
  );
}

/**
 * Lottie-based dew point component with temperature unit formatting
 */
export interface LottieDewPointProps {
  /** Dew point temperature value in the current unit */
  value: number;
  /** Temperature unit */
  unit: 'celsius' | 'fahrenheit';
  /** Duration of the animation in milliseconds */
  duration?: number;
  /** Additional CSS classes */
  className?: string;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** Lottie animation size */
  lottieSize?: number;
  /** Whether to show the Lottie animation */
  showLottie?: boolean;
}

export function LottieDewPoint({
  value,
  unit,
  duration = 180,
  className,
  'aria-label': ariaLabel,
  lottieSize = 24,
  showLottie = true,
  ...props
}: LottieDewPointProps) {
  const symbol = unit === 'fahrenheit' ? '°F' : '°C';
  
  return (
    <LottieMetric
      value={value}
      duration={duration}
      precision={0}
      className={className}
      formatter={(val) => `${Math.round(val)}${symbol}`}
      aria-label={ariaLabel}
      lottieType="temperature"
      lottieSize={lottieSize}
      showLottie={showLottie}
      {...props}
    />
  );
}

/**
 * Lottie-based wind gusts component with unit formatting
 */
export interface LottieWindGustsProps {
  /** Wind gusts value in the current unit */
  value: number;
  /** Wind speed unit */
  unit: 'kmh' | 'mph';
  /** Duration of the animation in milliseconds */
  duration?: number;
  /** Additional CSS classes */
  className?: string;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** Lottie animation size */
  lottieSize?: number;
  /** Whether to show the Lottie animation */
  showLottie?: boolean;
}

export function LottieWindGusts({
  value,
  unit,
  duration = 180,
  className,
  'aria-label': ariaLabel,
  lottieSize = 24,
  showLottie = true,
  ...props
}: LottieWindGustsProps) {
  const unitLabel = unit === 'mph' ? 'mph' : 'km/h';
  
  return (
    <LottieMetric
      value={value}
      duration={duration}
      precision={0}
      className={className}
      formatter={(val) => `${Math.round(val)} ${unitLabel}`}
      aria-label={ariaLabel}
      lottieType="wind"
      lottieSize={lottieSize}
      showLottie={showLottie}
      {...props}
    />
  );
}

/**
 * Lottie-based PM2.5 component (fine particles)
 */
export interface LottiePM25Props {
  /** PM2.5 value */
  value: number;
  /** Duration of the animation in milliseconds */
  duration?: number;
  /** Additional CSS classes */
  className?: string;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** Lottie animation size */
  lottieSize?: number;
  /** Whether to show the Lottie animation */
  showLottie?: boolean;
}

export function LottiePM25({
  value,
  duration = 180,
  className,
  'aria-label': ariaLabel,
  lottieSize = 24,
  showLottie = true,
  ...props
}: LottiePM25Props) {
  return (
    <LottieMetric
      value={value}
      duration={duration}
      precision={0}
      className={className}
      formatter={(val) => `${Math.round(val)}`}
      aria-label={ariaLabel}
      lottieType="pm25"
      lottieSize={lottieSize}
      showLottie={showLottie}
      {...props}
    />
  );
}

/**
 * Lottie-based PM10 component (coarse particles)
 */
export interface LottiePM10Props {
  /** PM10 value */
  value: number;
  /** Duration of the animation in milliseconds */
  duration?: number;
  /** Additional CSS classes */
  className?: string;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** Lottie animation size */
  lottieSize?: number;
  /** Whether to show the Lottie animation */
  showLottie?: boolean;
}

export function LottiePM10({
  value,
  duration = 180,
  className,
  'aria-label': ariaLabel,
  lottieSize = 24,
  showLottie = true,
  ...props
}: LottiePM10Props) {
  return (
    <LottieMetric
      value={value}
      duration={duration}
      precision={0}
      className={className}
      formatter={(val) => `${Math.round(val)}`}
      aria-label={ariaLabel}
      lottieType="pm10"
      lottieSize={lottieSize}
      showLottie={showLottie}
      {...props}
    />
  );
}

/**
 * Lottie-based O3 (Ozone) component
 */
export interface LottieO3Props {
  /** O3 value */
  value: number;
  /** Duration of the animation in milliseconds */
  duration?: number;
  /** Additional CSS classes */
  className?: string;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** Lottie animation size */
  lottieSize?: number;
  /** Whether to show the Lottie animation */
  showLottie?: boolean;
}

export function LottieO3({
  value,
  duration = 180,
  className,
  'aria-label': ariaLabel,
  lottieSize = 24,
  showLottie = true,
  ...props
}: LottieO3Props) {
  return (
    <LottieMetric
      value={value}
      duration={duration}
      precision={0}
      className={className}
      formatter={(val) => `${Math.round(val)}`}
      aria-label={ariaLabel}
      lottieType="o3"
      lottieSize={lottieSize}
      showLottie={showLottie}
      {...props}
    />
  );
}

/**
 * Lottie-based NO2 component
 */
export interface LottieNO2Props {
  /** NO2 value */
  value: number;
  /** Duration of the animation in milliseconds */
  duration?: number;
  /** Additional CSS classes */
  className?: string;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** Lottie animation size */
  lottieSize?: number;
  /** Whether to show the Lottie animation */
  showLottie?: boolean;
}

export function LottieNO2({
  value,
  duration = 180,
  className,
  'aria-label': ariaLabel,
  lottieSize = 24,
  showLottie = true,
  ...props
}: LottieNO2Props) {
  return (
    <LottieMetric
      value={value}
      duration={duration}
      precision={0}
      className={className}
      formatter={(val) => `${Math.round(val)}`}
      aria-label={ariaLabel}
      lottieType="no2"
      lottieSize={lottieSize}
      showLottie={showLottie}
      {...props}
    />
  );
}

/**
 * Lottie-based SO2 component
 */
export interface LottieSO2Props {
  /** SO2 value */
  value: number;
  /** Duration of the animation in milliseconds */
  duration?: number;
  /** Additional CSS classes */
  className?: string;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** Lottie animation size */
  lottieSize?: number;
  /** Whether to show the Lottie animation */
  showLottie?: boolean;
}

export function LottieSO2({
  value,
  duration = 180,
  className,
  'aria-label': ariaLabel,
  lottieSize = 24,
  showLottie = true,
  ...props
}: LottieSO2Props) {
  return (
    <LottieMetric
      value={value}
      duration={duration}
      precision={0}
      className={className}
      formatter={(val) => `${Math.round(val)}`}
      aria-label={ariaLabel}
      lottieType="so2"
      lottieSize={lottieSize}
      showLottie={showLottie}
      {...props}
    />
  );
}

/**
 * Lottie-based CO component
 */
export interface LottieCOProps {
  /** CO value */
  value: number;
  /** Duration of the animation in milliseconds */
  duration?: number;
  /** Additional CSS classes */
  className?: string;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** Lottie animation size */
  lottieSize?: number;
  /** Whether to show the Lottie animation */
  showLottie?: boolean;
}

export function LottieCO({
  value,
  duration = 180,
  className,
  'aria-label': ariaLabel,
  lottieSize = 24,
  showLottie = true,
  ...props
}: LottieCOProps) {
  return (
    <LottieMetric
      value={value}
      duration={duration}
      precision={0}
      className={className}
      formatter={(val) => `${Math.round(val)}`}
      aria-label={ariaLabel}
      lottieType="co"
      lottieSize={lottieSize}
      showLottie={showLottie}
      {...props}
    />
  );
}

/**
 * Lottie-based visibility component
 */
export interface LottieVisibilityProps {
  /** Visibility value */
  value: number;
  /** Duration of the animation in milliseconds */
  duration?: number;
  /** Additional CSS classes */
  className?: string;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** Lottie animation size */
  lottieSize?: number;
  /** Whether to show the Lottie animation */
  showLottie?: boolean;
}

export function LottieVisibility({
  value,
  duration = 180,
  className,
  'aria-label': ariaLabel,
  lottieSize = 24,
  showLottie = true,
  ...props
}: LottieVisibilityProps) {
  return (
    <LottieMetric
      value={value}
      duration={duration}
      precision={0}
      className={className}
      formatter={(val) => `${Math.round(val)}`}
      aria-label={ariaLabel}
      lottieType="visibility"
      lottieSize={lottieSize}
      showLottie={showLottie}
      {...props}
    />
  );
}

/**
 * Lottie-based air quality component (generic fallback)
 */
export interface LottieAirQualityProps {
  /** Air quality value */
  value: number;
  /** Duration of the animation in milliseconds */
  duration?: number;
  /** Additional CSS classes */
  className?: string;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** Lottie animation size */
  lottieSize?: number;
  /** Whether to show the Lottie animation */
  showLottie?: boolean;
}

export function LottieAirQuality({
  value,
  duration = 180,
  className,
  'aria-label': ariaLabel,
  lottieSize = 24,
  showLottie = true,
  ...props
}: LottieAirQualityProps) {
  return (
    <LottieMetric
      value={value}
      duration={duration}
      precision={0}
      className={className}
      formatter={(val) => `${Math.round(val)}`}
      aria-label={ariaLabel}
      lottieType="air-quality"
      lottieSize={lottieSize}
      showLottie={showLottie}
      {...props}
    />
  );
}
