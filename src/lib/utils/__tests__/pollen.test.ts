import {
  getPollenSeverity,
  getPollenSeverityDescription,
  getPollenSeverityColorClasses,
  formatPollenValue,
  getPollenHealthImplications,
  getPollenTypeInfo,
  mapPollenType,
  getHighestPollenSeverity,
} from '../pollen';
import { PollenSeverity } from '@/lib/types/pollen';

describe('Pollen Utilities', () => {
  describe('getPollenSeverity', () => {
    it('should return very-low for values 0-9', () => {
      expect(getPollenSeverity(0)).toBe('very-low');
      expect(getPollenSeverity(5)).toBe('very-low');
      expect(getPollenSeverity(9)).toBe('very-low');
    });

    it('should return low for values 10-29', () => {
      expect(getPollenSeverity(10)).toBe('low');
      expect(getPollenSeverity(20)).toBe('low');
      expect(getPollenSeverity(29)).toBe('low');
    });

    it('should return moderate for values 30-49', () => {
      expect(getPollenSeverity(30)).toBe('moderate');
      expect(getPollenSeverity(40)).toBe('moderate');
      expect(getPollenSeverity(49)).toBe('moderate');
    });

    it('should return high for values 50-149', () => {
      expect(getPollenSeverity(50)).toBe('high');
      expect(getPollenSeverity(100)).toBe('high');
      expect(getPollenSeverity(149)).toBe('high');
    });

    it('should return very-high for values 150-499', () => {
      expect(getPollenSeverity(150)).toBe('very-high');
      expect(getPollenSeverity(300)).toBe('very-high');
      expect(getPollenSeverity(499)).toBe('very-high');
    });

    it('should return extreme for values 500+', () => {
      expect(getPollenSeverity(500)).toBe('extreme');
      expect(getPollenSeverity(1000)).toBe('extreme');
    });
  });

  describe('getPollenSeverityDescription', () => {
    it('should return correct descriptions for all severity levels', () => {
      expect(getPollenSeverityDescription('very-low')).toBe('Very Low');
      expect(getPollenSeverityDescription('low')).toBe('Low');
      expect(getPollenSeverityDescription('moderate')).toBe('Moderate');
      expect(getPollenSeverityDescription('high')).toBe('High');
      expect(getPollenSeverityDescription('very-high')).toBe('Very High');
      expect(getPollenSeverityDescription('extreme')).toBe('Extreme');
    });
  });

  describe('getPollenSeverityColorClasses', () => {
    it('should return correct color classes for very-low severity', () => {
      const colors = getPollenSeverityColorClasses('very-low');
      expect(colors.background).toContain('bg-green-100');
      expect(colors.text).toContain('text-green-800');
      expect(colors.border).toContain('border-green-200');
    });

    it('should return correct color classes for extreme severity', () => {
      const colors = getPollenSeverityColorClasses('extreme');
      expect(colors.background).toContain('bg-red-200');
      expect(colors.text).toContain('text-red-900');
      expect(colors.border).toContain('border-red-300');
    });
  });

  describe('formatPollenValue', () => {
    it('should format pollen values with grains/m³ unit', () => {
      expect(formatPollenValue(45.7, 'grains/m³')).toBe('46 grains/m³');
      expect(formatPollenValue(0, 'grains/m³')).toBe('0 grains/m³');
      expect(formatPollenValue(123.4, 'grains/m³')).toBe('123 grains/m³');
    });

    it('should handle other units', () => {
      expect(formatPollenValue(45.7, 'count/m³')).toBe('46 count/m³');
    });
  });

  describe('getPollenHealthImplications', () => {
    it('should return appropriate health implications for each severity', () => {
      expect(getPollenHealthImplications('very-low')).toContain('Most people will not experience');
      expect(getPollenHealthImplications('extreme')).toContain('Everyone with allergies will experience severe');
    });
  });

  describe('getPollenTypeInfo', () => {
    it('should return correct info for grass pollen', () => {
      const info = getPollenTypeInfo('grass');
      expect(info.icon).toBe('🌾');
      expect(info.description).toContain('Grass pollen');
      expect(info.healthImplications).toContain('hay fever');
    });

    it('should return correct info for tree pollen', () => {
      const info = getPollenTypeInfo('tree');
      expect(info.icon).toBe('🌳');
      expect(info.description).toContain('Tree pollen');
      expect(info.healthImplications).toContain('seasonal allergies');
    });

    it('should return correct info for weed pollen', () => {
      const info = getPollenTypeInfo('weed');
      expect(info.icon).toBe('🌿');
      expect(info.description).toContain('Weed pollen');
      expect(info.healthImplications).toContain('ragweed');
    });
  });

  describe('mapPollenType', () => {
    it('should map Open-Meteo pollen types correctly', () => {
      expect(mapPollenType('grass_pollen')).toBe('grass');
      expect(mapPollenType('alder_pollen')).toBe('tree');
      expect(mapPollenType('birch_pollen')).toBe('tree');
      expect(mapPollenType('olive_pollen')).toBe('tree');
      expect(mapPollenType('mugwort_pollen')).toBe('weed');
      expect(mapPollenType('ragweed_pollen')).toBe('weed');
    });

    it('should return null for unknown types', () => {
      expect(mapPollenType('unknown_pollen')).toBe(null);
      expect(mapPollenType('')).toBe(null);
    });
  });

  describe('getHighestPollenSeverity', () => {
    it('should return the highest severity from an array', () => {
      expect(getHighestPollenSeverity(['very-low', 'low', 'moderate'])).toBe('moderate');
      expect(getHighestPollenSeverity(['high', 'very-high', 'extreme'])).toBe('extreme');
      expect(getHighestPollenSeverity(['very-low', 'extreme', 'low'])).toBe('extreme');
    });

    it('should handle single severity', () => {
      expect(getHighestPollenSeverity(['moderate'])).toBe('moderate');
    });

    it('should handle empty array', () => {
      expect(getHighestPollenSeverity([])).toBe('very-low');
    });
  });
});
