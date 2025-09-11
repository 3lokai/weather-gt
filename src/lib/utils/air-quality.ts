// Air Quality utilities for severity mapping, formatting, and color coding
import { AirQualitySeverity, AQI_THRESHOLDS, EUROPEAN_AQI_THRESHOLDS } from '@/lib/types/air-quality';

// Air Quality Index (AQI) severity mapping
export function getAQISeverity(aqiValue: number, region: 'us' | 'european' = 'us'): AirQualitySeverity {
  const thresholds = region === 'us' ? AQI_THRESHOLDS : EUROPEAN_AQI_THRESHOLDS;
  
  if (aqiValue <= thresholds.good.max) return 'good';
  if (aqiValue <= thresholds.moderate.max) return 'moderate';
  if (aqiValue <= thresholds.unhealthySensitive.max) return 'unhealthy-sensitive';
  if (aqiValue <= thresholds.unhealthy.max) return 'unhealthy';
  if (aqiValue <= thresholds.veryUnhealthy.max) return 'very-unhealthy';
  return 'hazardous';
}

// PM2.5 severity mapping (based on EPA standards)
export function getPM25Severity(value: number): AirQualitySeverity {
  if (value <= 12) return 'good';
  if (value <= 35.4) return 'moderate';
  if (value <= 55.4) return 'unhealthy-sensitive';
  if (value <= 150.4) return 'unhealthy';
  if (value <= 250.4) return 'very-unhealthy';
  return 'hazardous';
}

// PM10 severity mapping (based on EPA standards)
export function getPM10Severity(value: number): AirQualitySeverity {
  if (value <= 54) return 'good';
  if (value <= 154) return 'moderate';
  if (value <= 254) return 'unhealthy-sensitive';
  if (value <= 354) return 'unhealthy';
  if (value <= 424) return 'very-unhealthy';
  return 'hazardous';
}

// O3 (Ozone) severity mapping (based on EPA standards)
export function getO3Severity(value: number): AirQualitySeverity {
  if (value <= 54) return 'good';
  if (value <= 70) return 'moderate';
  if (value <= 85) return 'unhealthy-sensitive';
  if (value <= 105) return 'unhealthy';
  if (value <= 200) return 'very-unhealthy';
  return 'hazardous';
}

// NO2 (Nitrogen Dioxide) severity mapping (based on EPA standards)
export function getNO2Severity(value: number): AirQualitySeverity {
  if (value <= 53) return 'good';
  if (value <= 100) return 'moderate';
  if (value <= 360) return 'unhealthy-sensitive';
  if (value <= 649) return 'unhealthy';
  if (value <= 1249) return 'very-unhealthy';
  return 'hazardous';
}

// SO2 (Sulfur Dioxide) severity mapping (based on EPA standards)
export function getSO2Severity(value: number): AirQualitySeverity {
  if (value <= 35) return 'good';
  if (value <= 75) return 'moderate';
  if (value <= 185) return 'unhealthy-sensitive';
  if (value <= 304) return 'unhealthy';
  if (value <= 604) return 'very-unhealthy';
  return 'hazardous';
}

// CO (Carbon Monoxide) severity mapping (based on EPA standards)
export function getCOSeverity(value: number): AirQualitySeverity {
  if (value <= 4.4) return 'good';
  if (value <= 9.4) return 'moderate';
  if (value <= 12.4) return 'unhealthy-sensitive';
  if (value <= 15.4) return 'unhealthy';
  if (value <= 30.4) return 'very-unhealthy';
  return 'hazardous';
}

// Get severity description
export function getSeverityDescription(severity: AirQualitySeverity): string {
  const descriptions = {
    good: 'Good',
    moderate: 'Moderate',
    'unhealthy-sensitive': 'Sensitive',
    unhealthy: 'Unhealthy',
    'very-unhealthy': 'Very Unhealthy',
    hazardous: 'Hazardous',
  };
  return descriptions[severity];
}

// Get severity color classes using the design system colors
export function getSeverityColorClasses(severity: AirQualitySeverity): {
  background: string;
  text: string;
  border: string;
} {
  const colorMap = {
    good: {
      background: 'bg-success/10',
      text: 'text-success',
      border: 'border-success/20',
    },
    moderate: {
      background: 'bg-warning/10',
      text: 'text-warning',
      border: 'border-warning/20',
    },
    'unhealthy-sensitive': {
      background: 'bg-accent/10',
      text: 'text-accent',
      border: 'border-accent/20',
    },
    unhealthy: {
      background: 'bg-destructive/10',
      text: 'text-destructive',
      border: 'border-destructive/20',
    },
    'very-unhealthy': {
      background: 'bg-secondary/10',
      text: 'text-secondary',
      border: 'border-secondary/20',
    },
    hazardous: {
      background: 'bg-destructive/20',
      text: 'text-destructive',
      border: 'border-destructive/30',
    },
  };
  return colorMap[severity];
}

// Format air quality values with appropriate units
export function formatAirQualityValue(value: number, unit: string): string {
  if (unit === 'μg/m³') {
    return `${Math.round(value * 10) / 10} μg/m³`;
  }
  if (unit === 'mg/m³') {
    return `${Math.round(value * 100) / 100} mg/m³`;
  }
  return `${Math.round(value)} ${unit}`;
}

// Get health implications for each severity level
export function getHealthImplications(severity: AirQualitySeverity): string {
  const implications = {
    good: 'Air quality is satisfactory, and air pollution poses little or no risk.',
    moderate: 'Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.',
    'unhealthy-sensitive': 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.',
    unhealthy: 'Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.',
    'very-unhealthy': 'Health alert: The risk of health effects is increased for everyone.',
    hazardous: 'Health warning of emergency conditions. The entire population is more likely to be affected.',
  };
  return implications[severity];
}

// Get metric descriptions and health implications
export function getMetricInfo(metric: string): {
  description: string;
  healthImplications: string;
} {
  const metricInfo = {
    pm2_5: {
      description: 'Fine particulate matter (PM2.5) - particles smaller than 2.5 micrometers that can penetrate deep into the lungs.',
      healthImplications: 'Can cause respiratory and cardiovascular problems, especially in children, elderly, and those with existing conditions.',
    },
    pm10: {
      description: 'Coarse particulate matter (PM10) - particles smaller than 10 micrometers that can be inhaled.',
      healthImplications: 'Can irritate the respiratory system and worsen existing respiratory conditions.',
    },
    o3: {
      description: 'Ground-level ozone (O₃) - a gas formed when pollutants react in sunlight.',
      healthImplications: 'Can cause breathing problems, trigger asthma, and reduce lung function.',
    },
    no2: {
      description: 'Nitrogen dioxide (NO₂) - a gas produced by combustion processes.',
      healthImplications: 'Can irritate airways and worsen respiratory conditions, especially in children.',
    },
    so2: {
      description: 'Sulfur dioxide (SO₂) - a gas produced by burning fossil fuels containing sulfur.',
      healthImplications: 'Can cause respiratory irritation and worsen asthma and other respiratory conditions.',
    },
    co: {
      description: 'Carbon monoxide (CO) - a colorless, odorless gas produced by incomplete combustion.',
      healthImplications: 'Can reduce oxygen delivery to the body and cause headaches, dizziness, and fatigue.',
    },
  };
  return metricInfo[metric as keyof typeof metricInfo] || {
    description: 'Air quality metric',
    healthImplications: 'May affect air quality and health.',
  };
}
