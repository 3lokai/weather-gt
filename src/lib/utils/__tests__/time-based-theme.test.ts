import { getTimeBasedTheme, getRecommendedTheme } from '../time-based-theme';

// Mock suncalc to control sunrise/sunset times
jest.mock('suncalc', () => ({
  getTimes: jest.fn()
}));

import * as SunCalc from 'suncalc';

describe('time-based-theme', () => {
  const mockLocation = {
    latitude: 40.7128,
    longitude: -74.0060,
    timezone: 'America/New_York'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getTimeBasedTheme', () => {
    it('should return light theme during day time', () => {
      const mockSunTimes = {
        sunrise: new Date('2024-01-01T06:00:00Z'),
        sunset: new Date('2024-01-01T18:00:00Z')
      };
      
      (SunCalc.getTimes as jest.Mock).mockReturnValue(mockSunTimes);
      
      // Mock current time to be during day (10 AM)
      jest.spyOn(global, 'Date').mockImplementation(() => new Date('2024-01-01T10:00:00Z') as any);
      
      const result = getTimeBasedTheme(mockLocation);
      expect(result).toBe('light');
    });

    it('should return dark theme during night time', () => {
      const mockSunTimes = {
        sunrise: new Date('2024-01-01T06:00:00Z'),
        sunset: new Date('2024-01-01T18:00:00Z')
      };
      
      (SunCalc.getTimes as jest.Mock).mockReturnValue(mockSunTimes);
      
      // Mock current time to be during night (10 PM)
      jest.spyOn(global, 'Date').mockImplementation(() => new Date('2024-01-01T22:00:00Z') as any);
      
      const result = getTimeBasedTheme(mockLocation);
      expect(result).toBe('dark');
    });

    it('should return light theme as fallback on error', () => {
      (SunCalc.getTimes as jest.Mock).mockImplementation(() => {
        throw new Error('Calculation failed');
      });
      
      const result = getTimeBasedTheme(mockLocation);
      expect(result).toBe('light');
    });
  });

  describe('getRecommendedTheme', () => {
    it('should use time-based theme when location is available', () => {
      const mockSunTimes = {
        sunrise: new Date('2024-01-01T06:00:00Z'),
        sunset: new Date('2024-01-01T18:00:00Z')
      };
      
      (SunCalc.getTimes as jest.Mock).mockReturnValue(mockSunTimes);
      jest.spyOn(global, 'Date').mockImplementation(() => new Date('2024-01-01T22:00:00Z') as any);
      
      const result = getRecommendedTheme(mockLocation, 'light');
      expect(result).toBe('dark');
    });

    it('should fallback to system theme when location is not available', () => {
      const result = getRecommendedTheme(null, 'dark');
      expect(result).toBe('dark');
    });

    it('should fallback to light when no system theme is available', () => {
      const result = getRecommendedTheme(null, undefined);
      expect(result).toBe('light');
    });
  });
});
