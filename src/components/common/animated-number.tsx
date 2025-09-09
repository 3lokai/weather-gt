'use client';

import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface AnimatedNumberProps {
  /** The numeric value to display */
  value: number;
  /** Duration of the animation in milliseconds (default: 180ms) */
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
}

export function AnimatedNumber({
  value,
  duration = 180,
  precision = 0,
  className,
  easing = 'ease-out',
  animateOnMount = false,
  formatter,
  'aria-label': ariaLabel,
  ...props
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(animateOnMount ? 0 : value);
  const [isAnimating, setIsAnimating] = useState(false);
  const previousValue = useRef(value);
  const animationRef = useRef<number | undefined>(undefined);

  // Easing functions
  const easingFunctions = {
    'ease-out': (t: number) => 1 - Math.pow(1 - t, 3),
    'ease-in': (t: number) => Math.pow(t, 3),
    'ease-in-out': (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
    'linear': (t: number) => t
  };

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
    <span
      className={cn(
        "inline-block transition-all duration-150",
        isAnimating && "transform scale-105",
        className
      )}
      aria-label={ariaLabel}
      {...props}
    >
      {formatValue(displayValue)}
    </span>
  );
}

/**
 * Animated temperature component with unit formatting
 */
export interface AnimatedTemperatureProps {
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
}

export function AnimatedTemperature({
  value,
  unit,
  duration = 180,
  className,
  'aria-label': ariaLabel,
  ...props
}: AnimatedTemperatureProps) {
  const symbol = unit === 'fahrenheit' ? '°F' : '°C';
  
  return (
    <AnimatedNumber
      value={value}
      duration={duration}
      precision={0}
      className={className}
      formatter={(val) => `${Math.round(val)}${symbol}`}
      aria-label={ariaLabel}
      {...props}
    />
  );
}

/**
 * Animated wind speed component with unit formatting
 */
export interface AnimatedWindSpeedProps {
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
}

export function AnimatedWindSpeed({
  value,
  unit,
  duration = 180,
  className,
  'aria-label': ariaLabel,
  ...props
}: AnimatedWindSpeedProps) {
  const unitLabel = unit === 'mph' ? 'mph' : 'km/h';
  
  return (
    <AnimatedNumber
      value={value}
      duration={duration}
      precision={0}
      className={className}
      formatter={(val) => `${Math.round(val)} ${unitLabel}`}
      aria-label={ariaLabel}
      {...props}
    />
  );
}

/**
 * Animated precipitation component with unit formatting
 */
export interface AnimatedPrecipitationProps {
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
}

export function AnimatedPrecipitation({
  value,
  unit,
  duration = 180,
  className,
  'aria-label': ariaLabel,
  ...props
}: AnimatedPrecipitationProps) {
  const unitLabel = unit === 'in' ? 'in' : 'mm';
  
  return (
    <AnimatedNumber
      value={value}
      duration={duration}
      precision={1}
      className={className}
      formatter={(val) => `${(Math.round(val * 10) / 10).toFixed(1)} ${unitLabel}`}
      aria-label={ariaLabel}
      {...props}
    />
  );
}

/**
 * Animated pressure component with unit formatting
 */
export interface AnimatedPressureProps {
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
}

export function AnimatedPressure({
  value,
  unit,
  duration = 180,
  className,
  'aria-label': ariaLabel,
  ...props
}: AnimatedPressureProps) {
  const unitLabel = unit === 'inHg' ? 'inHg' : 'hPa';
  
  return (
    <AnimatedNumber
      value={value}
      duration={duration}
      precision={0}
      className={className}
      formatter={(val) => `${Math.round(val)} ${unitLabel}`}
      aria-label={ariaLabel}
      {...props}
    />
  );
}
