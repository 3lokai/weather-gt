'use client';

import { PollenPanel } from './pollen-panel';
import { PollenData } from '@/lib/types/pollen';

// Mock pollen data for demonstration
const mockPollenData: PollenData = {
  grass: {
    value: 45,
    unit: 'grains/m³',
    severity: 'moderate',
    description: 'Moderate',
    healthImplications: 'People with allergies may experience symptoms.',
  },
  tree: {
    value: 12,
    unit: 'grains/m³',
    severity: 'low',
    description: 'Low',
    healthImplications: 'People with severe allergies may experience mild symptoms.',
  },
  weed: {
    value: 8,
    unit: 'grains/m³',
    severity: 'very-low',
    description: 'Very Low',
    healthImplications: 'Most people will not experience allergy symptoms.',
  },
};

const mockHighPollenData: PollenData = {
  grass: {
    value: 180,
    unit: 'grains/m³',
    severity: 'very-high',
    description: 'Very High',
    healthImplications: 'Most people with allergies will experience significant symptoms.',
  },
  tree: {
    value: 95,
    unit: 'grains/m³',
    severity: 'high',
    description: 'High',
    healthImplications: 'Most people with allergies will experience symptoms.',
  },
  weed: {
    value: 220,
    unit: 'grains/m³',
    severity: 'extreme',
    description: 'Extreme',
    healthImplications: 'Everyone with allergies will experience severe symptoms.',
  },
};

export function PollenPanelDemo() {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Pollen Panel Demo</h2>
        <p className="text-muted-foreground mb-6">
          Demonstration of the pollen panel component with different states and data.
        </p>
      </div>

      {/* Normal pollen levels */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Normal Pollen Levels</h3>
        <PollenPanel 
          pollen={mockPollenData}
          size="md"
          showTooltips={true}
        />
      </div>

      {/* High pollen levels */}
      <div>
        <h3 className="text-lg font-semibold mb-3">High Pollen Levels</h3>
        <PollenPanel 
          pollen={mockHighPollenData}
          size="md"
          showTooltips={true}
        />
      </div>

      {/* Loading state */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Loading State</h3>
        <PollenPanel 
          pollen={null}
          isLoading={true}
          size="md"
        />
      </div>

      {/* Error state */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Error State</h3>
        <PollenPanel 
          pollen={null}
          error="Failed to load pollen data"
          size="md"
        />
      </div>

      {/* Empty state */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Empty State (No Data)</h3>
        <PollenPanel 
          pollen={null}
          size="md"
        />
      </div>

      {/* Different sizes */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Different Sizes</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Small</h4>
            <PollenPanel 
              pollen={mockPollenData}
              size="sm"
            />
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">Medium</h4>
            <PollenPanel 
              pollen={mockPollenData}
              size="md"
            />
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">Large</h4>
            <PollenPanel 
              pollen={mockPollenData}
              size="lg"
            />
          </div>
        </div>
      </div>

      {/* List layout */}
      <div>
        <h3 className="text-lg font-semibold mb-3">List Layout</h3>
        <PollenPanel 
          pollen={mockPollenData}
          layout="list"
          size="md"
        />
      </div>
    </div>
  );
}
