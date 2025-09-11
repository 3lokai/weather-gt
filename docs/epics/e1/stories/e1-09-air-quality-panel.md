# E1-09 (P1) Air Quality Panel (Open‑Meteo)

## Description
Show PM2.5, PM10, O₃, NO₂, SO₂, CO; regional AQI if available.

## Acceptance Criteria

* Severity chips (Good/Moderate/Unhealthy…); tooltip explains metric.
* A11y labels for screen readers.
* **Component has Storybook stories for light/dark, mobile/desktop, loading/empty/error, and at least 2 WMO icon cases.**

## Dependencies
None

## Priority
P1 (Strongly desired)

## Definition of Done
- [x] Accessibility: Keyboard + visible focus + ARIA patterns; AA contrast
- [x] Performance: No unexpected layout shift; cached where applicable
- [x] Testing: Unit for mappers/formatters; component tests for air quality; E2E happy path
- [x] Docs: README + changelog updated; component props documented

## Technical Notes
- Display 6 air quality metrics: PM2.5, PM10, O₃, NO₂, SO₂, CO
- Show regional AQI (Air Quality Index) when available
- Use severity-based color coding (Good/Moderate/Unhealthy/etc.)
- Include helpful tooltips explaining each metric and its health implications
- Provide accessible labels for screen readers
- Handle cases where air quality data is not available
- Use appropriate units and formatting for each pollutant
- Integrate with Open-Meteo Air Quality API

## Related Files
- `src/lib/api/open-meteo.ts` - Air quality API integration and data structure
- `src/components/weather/air-quality-panel.tsx` - Main air quality panel component
- `src/components/weather/air-quality-panel-demo.tsx` - Demo component with sample data
- `src/lib/types/air-quality.ts` - TypeScript interfaces for air quality data
- `src/lib/utils/air-quality.ts` - Utility functions for severity mapping and formatting
- `src/lib/utils/air-quality-transform.ts` - Data transformation utilities
- `src/hooks/use-air-quality.ts` - React hook for fetching air quality data
- `src/lib/store/weather-store.ts` - Updated to include air quality data state
- `src/app/air-quality-demo/page.tsx` - Demo page for testing the component

## Implementation Details

### Components Created
1. **AirQualityPanel** - Main component displaying 6 air quality metrics with severity-based color coding
2. **AirQualityPanelDemo** - Demo component with sample data for different severity levels
3. **useAirQuality** - React hook integrating with TanStack Query for data fetching

### Features Implemented
- ✅ 6 air quality metrics: PM2.5, PM10, O₃, NO₂, SO₂, CO
- ✅ Severity-based color coding (Good/Moderate/Unhealthy/Very Unhealthy/Hazardous)
- ✅ Regional AQI support (US and European standards)
- ✅ Accessible design with ARIA labels and keyboard navigation
- ✅ Responsive design with multiple size variants (sm/md/lg)
- ✅ Grid and list layout options
- ✅ Loading and error states
- ✅ Tooltips with health implications
- ✅ Integration with Open-Meteo Air Quality API
- ✅ Zustand store integration for global state management

### Accessibility Features
- ARIA labels for screen readers
- Keyboard navigation support
- Focus management
- Color contrast compliance (AA level)
- Semantic HTML structure

### Performance Features
- TanStack Query caching (5-minute stale time)
- No layout shift during loading
- Optimized re-renders
- Efficient data transformation

## Status: ✅ COMPLETED
