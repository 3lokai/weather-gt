// Air Quality data types and interfaces
// Based on Open-Meteo Air Quality API specifications

export interface AirQualityMetric {
  value: number;
  unit: string;
  severity: AirQualitySeverity;
  description: string;
  healthImplications: string;
}

export type AirQualitySeverity = 
  | 'good'
  | 'moderate' 
  | 'unhealthy-sensitive'
  | 'unhealthy'
  | 'very-unhealthy'
  | 'hazardous';

export interface AirQualityData {
  pm2_5: AirQualityMetric;
  pm10: AirQualityMetric;
  o3: AirQualityMetric;
  no2: AirQualityMetric;
  so2: AirQualityMetric;
  co: AirQualityMetric;
  aqi?: {
    value: number;
    severity: AirQualitySeverity;
    description: string;
    region: 'us' | 'european';
  };
}

export interface AirQualityConfig {
  pm2_5: {
    unit: 'μg/m³';
    thresholds: {
      good: number;
      moderate: number;
      unhealthySensitive: number;
      unhealthy: number;
      veryUnhealthy: number;
      hazardous: number;
    };
    description: string;
    healthImplications: string;
  };
  pm10: {
    unit: 'μg/m³';
    thresholds: {
      good: number;
      moderate: number;
      unhealthySensitive: number;
      unhealthy: number;
      veryUnhealthy: number;
      hazardous: number;
    };
    description: string;
    healthImplications: string;
  };
  o3: {
    unit: 'μg/m³';
    thresholds: {
      good: number;
      moderate: number;
      unhealthySensitive: number;
      unhealthy: number;
      veryUnhealthy: number;
      hazardous: number;
    };
    description: string;
    healthImplications: string;
  };
  no2: {
    unit: 'μg/m³';
    thresholds: {
      good: number;
      moderate: number;
      unhealthySensitive: number;
      unhealthy: number;
      veryUnhealthy: number;
      hazardous: number;
    };
    description: string;
    healthImplications: string;
  };
  so2: {
    unit: 'μg/m³';
    thresholds: {
      good: number;
      moderate: number;
      unhealthySensitive: number;
      unhealthy: number;
      veryUnhealthy: number;
      hazardous: number;
    };
    description: string;
    healthImplications: string;
  };
  co: {
    unit: 'mg/m³';
    thresholds: {
      good: number;
      moderate: number;
      unhealthySensitive: number;
      unhealthy: number;
      veryUnhealthy: number;
      hazardous: number;
    };
    description: string;
    healthImplications: string;
  };
}

// Air Quality Index (AQI) thresholds based on EPA standards
export const AQI_THRESHOLDS = {
  good: { min: 0, max: 50 },
  moderate: { min: 51, max: 100 },
  unhealthySensitive: { min: 101, max: 150 },
  unhealthy: { min: 151, max: 200 },
  veryUnhealthy: { min: 201, max: 300 },
  hazardous: { min: 301, max: 500 },
} as const;

// European AQI thresholds (different scale)
export const EUROPEAN_AQI_THRESHOLDS = {
  good: { min: 0, max: 25 },
  moderate: { min: 26, max: 50 },
  unhealthySensitive: { min: 51, max: 75 },
  unhealthy: { min: 76, max: 100 },
  veryUnhealthy: { min: 101, max: 150 },
  hazardous: { min: 151, max: 200 },
} as const;
