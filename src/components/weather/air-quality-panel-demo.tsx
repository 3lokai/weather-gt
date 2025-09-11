'use client';

import { AirQualityPanel } from './air-quality-panel';
import { AirQualityData } from '@/lib/types/air-quality';

// Sample air quality data for demonstration
const sampleAirQualityData: AirQualityData = {
  pm2_5: {
    value: 15.2,
    unit: 'μg/m³',
    severity: 'moderate',
    description: 'Moderate',
    healthImplications: 'Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.',
  },
  pm10: {
    value: 25.8,
    unit: 'μg/m³',
    severity: 'good',
    description: 'Good',
    healthImplications: 'Air quality is satisfactory, and air pollution poses little or no risk.',
  },
  o3: {
    value: 45.3,
    unit: 'μg/m³',
    severity: 'good',
    description: 'Good',
    healthImplications: 'Air quality is satisfactory, and air pollution poses little or no risk.',
  },
  no2: {
    value: 28.7,
    unit: 'μg/m³',
    severity: 'good',
    description: 'Good',
    healthImplications: 'Air quality is satisfactory, and air pollution poses little or no risk.',
  },
  so2: {
    value: 12.4,
    unit: 'μg/m³',
    severity: 'good',
    description: 'Good',
    healthImplications: 'Air quality is satisfactory, and air pollution poses little or no risk.',
  },
  co: {
    value: 1.2,
    unit: 'mg/m³',
    severity: 'good',
    description: 'Good',
    healthImplications: 'Air quality is satisfactory, and air pollution poses little or no risk.',
  },
  aqi: {
    value: 65,
    severity: 'moderate',
    description: 'Moderate',
    region: 'us',
  },
};

// Sample data for different severity levels
const unhealthyAirQualityData: AirQualityData = {
  pm2_5: {
    value: 85.4,
    unit: 'μg/m³',
    severity: 'unhealthy',
    description: 'Unhealthy',
    healthImplications: 'Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.',
  },
  pm10: {
    value: 120.2,
    unit: 'μg/m³',
    severity: 'unhealthy-sensitive',
    description: 'Unhealthy for Sensitive Groups',
    healthImplications: 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.',
  },
  o3: {
    value: 95.8,
    unit: 'μg/m³',
    severity: 'unhealthy',
    description: 'Unhealthy',
    healthImplications: 'Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.',
  },
  no2: {
    value: 180.3,
    unit: 'μg/m³',
    severity: 'unhealthy-sensitive',
    description: 'Unhealthy for Sensitive Groups',
    healthImplications: 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.',
  },
  so2: {
    value: 45.7,
    unit: 'μg/m³',
    severity: 'moderate',
    description: 'Moderate',
    healthImplications: 'Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.',
  },
  co: {
    value: 8.2,
    unit: 'mg/m³',
    severity: 'moderate',
    description: 'Moderate',
    healthImplications: 'Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.',
  },
  aqi: {
    value: 165,
    severity: 'unhealthy',
    description: 'Unhealthy',
    region: 'us',
  },
};

export function AirQualityPanelDemo() {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Air Quality Panel Demo</h2>
        <p className="text-muted-foreground mb-6">
          Demonstration of the air quality panel component with different severity levels and configurations.
        </p>
      </div>

      {/* Good to Moderate Air Quality */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Good to Moderate Air Quality</h3>
        <AirQualityPanel
          airQuality={sampleAirQualityData}
          size="md"
          showTooltips={true}
          showAQI={true}
        />
      </div>

      {/* Unhealthy Air Quality */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Unhealthy Air Quality</h3>
        <AirQualityPanel
          airQuality={unhealthyAirQualityData}
          size="md"
          showTooltips={true}
          showAQI={true}
        />
      </div>

      {/* Different Sizes */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Different Sizes</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Small Size</h4>
            <AirQualityPanel
              airQuality={sampleAirQualityData}
              size="sm"
              showTooltips={false}
              showAQI={false}
            />
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">Large Size</h4>
            <AirQualityPanel
              airQuality={sampleAirQualityData}
              size="lg"
              showTooltips={true}
              showAQI={true}
            />
          </div>
        </div>
      </div>

      {/* List Layout */}
      <div>
        <h3 className="text-lg font-semibold mb-3">List Layout</h3>
        <AirQualityPanel
          airQuality={sampleAirQualityData}
          layout="list"
          showTooltips={true}
          showAQI={true}
        />
      </div>

      {/* Loading State */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Loading State</h3>
        <AirQualityPanel
          airQuality={null}
          isLoading={true}
        />
      </div>

      {/* Error State */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Error State</h3>
        <AirQualityPanel
          airQuality={null}
          error="Failed to load air quality data"
        />
      </div>
    </div>
  );
}
