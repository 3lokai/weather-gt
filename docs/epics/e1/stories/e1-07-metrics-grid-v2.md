# E1-07 (P1) Metrics Grid v2 (Gusts, Cloud, Dew, Pressure Trend)

## Description
Add `wind_gusts_10m`, `cloud_cover`, `dew_point_2m`, trend arrow for pressure.

## Acceptance Criteria

* Gusts visible when ≥ wind + 5 units; trend computed over last 3–6h (↑/→/↓).
* Cloud cover shown as % chip; Dew point in °.
* **Component has Storybook stories for light/dark, mobile/desktop, loading/empty/error, and at least 2 WMO icon cases.**

## Dependencies
E1-03.

## Priority
P1 (Strongly desired)

## Definition of Done
- [x] Accessibility: Keyboard + visible focus + ARIA patterns; AA contrast
- [x] Performance: No unexpected layout shift; cached where applicable
- [x] Testing: Unit for mappers/formatters; component tests for extended metrics; E2E happy path
- [x] Docs: README + changelog updated; component props documented

## Technical Notes
- Extend metrics grid with 4 additional weather parameters
- Show wind gusts only when significantly higher than base wind speed (≥5 units difference)
- Calculate pressure trend by comparing current pressure to 3-6 hours ago
- Display trend with directional arrows (↑/→/↓)
- Show cloud cover as percentage chip
- Display dew point in appropriate temperature units
- Maintain consistent styling with v1 metrics grid
- Handle cases where data might be unavailable

## Related Files
- `src/lib/api/open-meteo.ts` - Extended weather data structure
- `src/lib/store/weather-store.ts` - Units preferences
- `src/components/weather/metrics-grid.tsx` - Extended metrics grid component
- `src/components/weather/metrics-grid-demo.tsx` - Demo component with extended metrics
- `src/components/common/animated-number.tsx` - New animated components for extended metrics
- `src/lib/utils/trend-calculator.ts` - Pressure trend calculation utilities

## Implementation Status
✅ **COMPLETED** - All acceptance criteria met and Definition of Done items completed.

### Key Features Implemented:
- ✅ Wind gusts display with conditional logic (≥5 units difference from base wind)
- ✅ Cloud cover percentage display with animated component
- ✅ Dew point temperature display with unit-aware formatting
- ✅ Pressure trend calculation with directional arrows (↑/→/↓)
- ✅ Extended metrics toggle in demo component
- ✅ Dynamic grid layout that adapts to number of visible metrics
- ✅ Trend display with color-coded indicators
- ✅ Maintains all existing v1 functionality and accessibility
- ✅ Responsive design with proper loading states
- ✅ Comprehensive demo showcasing all features
