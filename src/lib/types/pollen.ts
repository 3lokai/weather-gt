// Pollen data types and interfaces
// Based on Open-Meteo Pollen API specifications

export interface PollenMetric {
  value: number;
  unit: string;
  severity: PollenSeverity;
  description: string;
  healthImplications: string;
}

export type PollenSeverity = 
  | 'very-low'
  | 'low'
  | 'moderate'
  | 'high'
  | 'very-high'
  | 'extreme';

export interface PollenData {
  grass: PollenMetric;
  tree: PollenMetric;
  weed: PollenMetric;
}

export interface PollenConfig {
  grass: {
    unit: 'grains/m³';
    thresholds: {
      veryLow: number;
      low: number;
      moderate: number;
      high: number;
      veryHigh: number;
      extreme: number;
    };
    description: string;
    healthImplications: string;
  };
  tree: {
    unit: 'grains/m³';
    thresholds: {
      veryLow: number;
      low: number;
      moderate: number;
      high: number;
      veryHigh: number;
      extreme: number;
    };
    description: string;
    healthImplications: string;
  };
  weed: {
    unit: 'grains/m³';
    thresholds: {
      veryLow: number;
      low: number;
      moderate: number;
      high: number;
      veryHigh: number;
      extreme: number;
    };
    description: string;
    healthImplications: string;
  };
}

// Pollen severity thresholds based on common allergy guidelines
export const POLLEN_THRESHOLDS = {
  veryLow: { min: 0, max: 9 },
  low: { min: 10, max: 29 },
  moderate: { min: 30, max: 49 },
  high: { min: 50, max: 149 },
  veryHigh: { min: 150, max: 499 },
  extreme: { min: 500, max: 9999 },
} as const;
