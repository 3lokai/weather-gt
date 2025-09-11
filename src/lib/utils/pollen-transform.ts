// Utility function to transform raw pollen API data to our internal format
import { PollenData } from '@/lib/types/pollen';
import { PollenData as RawPollenData } from '@/lib/api/open-meteo';
import {
  getPollenSeverity,
  getPollenSeverityDescription,
  getPollenHealthImplications,
  mapPollenType,
} from './pollen';

export function transformPollenData(rawData: RawPollenData): PollenData | null {
  // Get the first (current) values from the hourly arrays
  const currentIndex = 0;
  
  // Map Open-Meteo pollen types to our internal structure
  const pollenMap: Record<string, number> = {
    grass: rawData.grass_pollen[currentIndex],
    tree: Math.max(
      rawData.alder_pollen[currentIndex] || 0,
      rawData.birch_pollen[currentIndex] || 0,
      rawData.olive_pollen[currentIndex] || 0
    ),
    weed: Math.max(
      rawData.mugwort_pollen[currentIndex] || 0,
      rawData.ragweed_pollen[currentIndex] || 0
    ),
  };

  // Check if we have any valid pollen data
  const hasValidData = Object.values(pollenMap).some(value => value > 0);
  if (!hasValidData) {
    return null;
  }

  return {
    grass: {
      value: pollenMap.grass,
      unit: 'grains/m³',
      severity: getPollenSeverity(pollenMap.grass),
      description: getPollenSeverityDescription(getPollenSeverity(pollenMap.grass)),
      healthImplications: getPollenHealthImplications(getPollenSeverity(pollenMap.grass)),
    },
    tree: {
      value: pollenMap.tree,
      unit: 'grains/m³',
      severity: getPollenSeverity(pollenMap.tree),
      description: getPollenSeverityDescription(getPollenSeverity(pollenMap.tree)),
      healthImplications: getPollenHealthImplications(getPollenSeverity(pollenMap.tree)),
    },
    weed: {
      value: pollenMap.weed,
      unit: 'grains/m³',
      severity: getPollenSeverity(pollenMap.weed),
      description: getPollenSeverityDescription(getPollenSeverity(pollenMap.weed)),
      healthImplications: getPollenHealthImplications(getPollenSeverity(pollenMap.weed)),
    },
  };
}
