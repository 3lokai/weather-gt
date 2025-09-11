// Pollen utilities for severity mapping, formatting, and color coding
import { PollenSeverity, POLLEN_THRESHOLDS } from '@/lib/types/pollen';

// Pollen severity mapping based on common allergy guidelines
export function getPollenSeverity(value: number): PollenSeverity {
  if (value <= POLLEN_THRESHOLDS.veryLow.max) return 'very-low';
  if (value <= POLLEN_THRESHOLDS.low.max) return 'low';
  if (value <= POLLEN_THRESHOLDS.moderate.max) return 'moderate';
  if (value <= POLLEN_THRESHOLDS.high.max) return 'high';
  if (value <= POLLEN_THRESHOLDS.veryHigh.max) return 'very-high';
  return 'extreme';
}

// Get severity description
export function getPollenSeverityDescription(severity: PollenSeverity): string {
  const descriptions = {
    'very-low': 'Very Low',
    'low': 'Low',
    'moderate': 'Moderate',
    'high': 'High',
    'very-high': 'Very High',
    'extreme': 'Extreme',
  };
  return descriptions[severity];
}

// Get severity color classes for Tailwind CSS
export function getPollenSeverityColorClasses(severity: PollenSeverity): {
  background: string;
  text: string;
  border: string;
} {
  const colorMap = {
    'very-low': {
      background: 'bg-green-100 dark:bg-green-900/20',
      text: 'text-green-800 dark:text-green-200',
      border: 'border-green-200 dark:border-green-800',
    },
    'low': {
      background: 'bg-blue-100 dark:bg-blue-900/20',
      text: 'text-blue-800 dark:text-blue-200',
      border: 'border-blue-200 dark:border-blue-800',
    },
    'moderate': {
      background: 'bg-yellow-100 dark:bg-yellow-900/20',
      text: 'text-yellow-800 dark:text-yellow-200',
      border: 'border-yellow-200 dark:border-yellow-800',
    },
    'high': {
      background: 'bg-orange-100 dark:bg-orange-900/20',
      text: 'text-orange-800 dark:text-orange-200',
      border: 'border-orange-200 dark:border-orange-800',
    },
    'very-high': {
      background: 'bg-red-100 dark:bg-red-900/20',
      text: 'text-red-800 dark:text-red-200',
      border: 'border-red-200 dark:border-red-800',
    },
    'extreme': {
      background: 'bg-red-200 dark:bg-red-800/30',
      text: 'text-red-900 dark:text-red-100',
      border: 'border-red-300 dark:border-red-700',
    },
  };
  return colorMap[severity];
}

// Format pollen values with appropriate units
export function formatPollenValue(value: number, unit: string): string {
  if (unit === 'grains/m³') {
    return `${Math.round(value)} ${unit}`;
  }
  return `${Math.round(value)} ${unit}`;
}

// Get health implications for each severity level
export function getPollenHealthImplications(severity: PollenSeverity): string {
  const implications = {
    'very-low': 'Pollen levels are very low. Most people will not experience allergy symptoms.',
    'low': 'Pollen levels are low. People with severe allergies may experience mild symptoms.',
    'moderate': 'Pollen levels are moderate. People with allergies may experience symptoms.',
    'high': 'Pollen levels are high. Most people with allergies will experience symptoms.',
    'very-high': 'Pollen levels are very high. Most people with allergies will experience significant symptoms.',
    'extreme': 'Pollen levels are extreme. Everyone with allergies will experience severe symptoms.',
  };
  return implications[severity];
}

// Get pollen type descriptions and health implications
export function getPollenTypeInfo(pollenType: 'grass' | 'tree' | 'weed'): {
  description: string;
  healthImplications: string;
  icon: string;
} {
  const typeInfo = {
    grass: {
      description: 'Grass pollen - common allergen from various grass species',
      healthImplications: 'Can cause hay fever, sneezing, runny nose, and itchy eyes.',
      icon: '🌾',
    },
    tree: {
      description: 'Tree pollen - allergen from various tree species',
      healthImplications: 'Can cause seasonal allergies, particularly in spring.',
      icon: '🌳',
    },
    weed: {
      description: 'Weed pollen - allergen from various weed species including ragweed',
      healthImplications: 'Can cause severe allergic reactions, especially ragweed in late summer.',
      icon: '🌿',
    },
  };
  return typeInfo[pollenType];
}

// Map Open-Meteo pollen types to our internal types
export function mapPollenType(openMeteoType: string): 'grass' | 'tree' | 'weed' | null {
  const typeMap: Record<string, 'grass' | 'tree' | 'weed'> = {
    'grass_pollen': 'grass',
    'alder_pollen': 'tree',
    'birch_pollen': 'tree',
    'olive_pollen': 'tree',
    'mugwort_pollen': 'weed',
    'ragweed_pollen': 'weed',
  };
  
  return typeMap[openMeteoType] || null;
}

// Get the highest severity from multiple pollen types
export function getHighestPollenSeverity(severities: PollenSeverity[]): PollenSeverity {
  const severityOrder: PollenSeverity[] = ['very-low', 'low', 'moderate', 'high', 'very-high', 'extreme'];
  
  let highestIndex = 0;
  for (const severity of severities) {
    const index = severityOrder.indexOf(severity);
    if (index > highestIndex) {
      highestIndex = index;
    }
  }
  
  return severityOrder[highestIndex];
}
