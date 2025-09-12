// Utility function to transform raw air quality API data to our internal format
import { AirQualityData } from '@/lib/types/air-quality';
import { AirQualityData as RawAirQualityData } from '@/lib/api/open-meteo';
import {
  getPM25Severity,
  getPM10Severity,
  getO3Severity,
  getNO2Severity,
  getSO2Severity,
  getCOSeverity,
  getAQISeverity,
  getSeverityDescription,
  getHealthImplications,
} from './air-quality';

export function transformAirQualityData(rawData: RawAirQualityData): AirQualityData {
  // Get the first (current) values from the hourly arrays
  const currentIndex = 0;
  
  return {
    pm2_5: {
      value: rawData.pm2_5[currentIndex],
      unit: 'μg/m³',
      severity: getPM25Severity(rawData.pm2_5[currentIndex]),
      description: getSeverityDescription(getPM25Severity(rawData.pm2_5[currentIndex])),
      healthImplications: getHealthImplications(getPM25Severity(rawData.pm2_5[currentIndex])),
    },
    pm10: {
      value: rawData.pm10[currentIndex],
      unit: 'μg/m³',
      severity: getPM10Severity(rawData.pm10[currentIndex]),
      description: getSeverityDescription(getPM10Severity(rawData.pm10[currentIndex])),
      healthImplications: getHealthImplications(getPM10Severity(rawData.pm10[currentIndex])),
    },
    o3: {
      value: rawData.ozone[currentIndex],
      unit: 'μg/m³',
      severity: getO3Severity(rawData.ozone[currentIndex]),
      description: getSeverityDescription(getO3Severity(rawData.ozone[currentIndex])),
      healthImplications: getHealthImplications(getO3Severity(rawData.ozone[currentIndex])),
    },
    no2: {
      value: rawData.nitrogen_dioxide[currentIndex],
      unit: 'μg/m³',
      severity: getNO2Severity(rawData.nitrogen_dioxide[currentIndex]),
      description: getSeverityDescription(getNO2Severity(rawData.nitrogen_dioxide[currentIndex])),
      healthImplications: getHealthImplications(getNO2Severity(rawData.nitrogen_dioxide[currentIndex])),
    },
    so2: {
      value: rawData.sulphur_dioxide[currentIndex],
      unit: 'μg/m³',
      severity: getSO2Severity(rawData.sulphur_dioxide[currentIndex]),
      description: getSeverityDescription(getSO2Severity(rawData.sulphur_dioxide[currentIndex])),
      healthImplications: getHealthImplications(getSO2Severity(rawData.sulphur_dioxide[currentIndex])),
    },
    co: {
      value: rawData.carbon_monoxide[currentIndex],
      unit: 'mg/m³',
      severity: getCOSeverity(rawData.carbon_monoxide[currentIndex]),
      description: getSeverityDescription(getCOSeverity(rawData.carbon_monoxide[currentIndex])),
      healthImplications: getHealthImplications(getCOSeverity(rawData.carbon_monoxide[currentIndex])),
    },
    aqi: rawData.us_aqi ? {
      value: rawData.us_aqi[currentIndex],
      severity: getAQISeverity(rawData.us_aqi[currentIndex], 'us'),
      description: getSeverityDescription(getAQISeverity(rawData.us_aqi[currentIndex], 'us')),
      region: 'us' as const,
    } : rawData.european_aqi ? {
      value: rawData.european_aqi[currentIndex],
      severity: getAQISeverity(rawData.european_aqi[currentIndex], 'european'),
      description: getSeverityDescription(getAQISeverity(rawData.european_aqi[currentIndex], 'european')),
      region: 'european' as const,
    } : undefined,
  };
}
