# E7-08 (P2) Wind Direction, Beaufort Scale & Sunrise/Sunset

## Description
Wind direction arrow with proper orientation; Beaufort scale indicators for wind strength; sunrise/sunset times with day/night indicators.

## Acceptance Criteria

* Derived visuals from existing data; no extra calls.

## Dependencies
E1 data.

## Priority
P2 (Nice to have)

## Definition of Done
- [ ] Accessibility: Keyboard + visible focus + ARIA patterns; AA contrast
- [ ] Performance: No unexpected layout shift; cached where applicable
- [ ] Testing: Unit for mappers/formatters; component tests for moon/wind; E2E happy path
- [ ] Docs: README + changelog updated; component props documented

## Technical Notes

### Wind Direction & Beaufort Scale
- **API Status**: `wind_direction_10m` is supported by Open-Meteo but NOT currently requested
- **Required Changes**: Add `wind_direction_10m` to API parameter arrays in `open-meteo.ts`
- **Data Format**: Degrees from North (0° = North, 90° = East, 180° = South, 270° = West)
- **Display Location**: Add to `MetricsGrid` as new metric alongside existing wind speed
- **Beaufort Scale**: Already implemented in `LottieMetric` component (no changes needed)
- **Visual**: Rotate wind arrow icon based on direction value
- **Interface Updates**: Add `wind_direction_10m: number` to `CurrentWeather` and `HourlyWeather` interfaces

### Sunrise/Sunset Implementation
- Display sunrise/sunset times in `CurrentConditionsCard` (not daily forecast cards)
- Show for ANY selected day (not just today) - users need this for planning ahead
- Use existing Lottie animations: `sunrise.json` and `sunset.json`
- Responsive layout:
  - **Large screens**: Bottom left, two rows (sunrise above sunset)
  - **Small screens**: Bottom left (sunrise) and bottom right (sunset)
- Use city timezone only (no timezone conversion needed)
- Format times using existing `units.timeFormat` (12h/24h)
- Add to `CurrentConditionsCardProps` interface: `sunrise?: string; sunset?: string`

### Data Sources
- **Open-Meteo API Parameters** (need to be added to requests):
  - `wind_direction_10m` - Wind direction in degrees (0-360°)
  - `wind_speed_10m` - Already requested, used for Beaufort scale
  - `sunrise[]` and `sunset[]` - Already requested, used for day/night indicators
- **API Request Updates Required**:
  - Add `wind_direction_10m` to current weather parameters array
  - Add `wind_direction_10m` to hourly forecast parameters array
- **Data Mapping**: Map selected day index to API day index for sunrise/sunset data
- **No Additional API Calls**: All data comes from existing Open-Meteo requests

### Accessibility & UX
- Add accessibility labels for wind and time information
- Ensure visuals are responsive and consistent with design system
- Use subtle styling: `text-body-s text-muted-foreground`
- Icon colors: Amber for sunrise, orange for sunset
- Icon size: 16px, line variant for subtlety

## Related Files
- `src/components/weather/current-conditions-card.tsx` - Add sunrise/sunset display
- `src/components/weather/metrics-grid.tsx` - Add wind direction metric
- `src/components/common/lottie-metric.tsx` - Extend with wind direction and time metrics
- `src/lib/api/open-meteo.ts` - Add `wind_direction_10m` to `CurrentWeather` interface
- `src/lib/utils/units.ts` - Add sunrise/sunset time formatting functions
- `src/lib/utils/weather-data-mapping.ts` - Add sunrise/sunset data mapping for selected days
- `public/icons/meteocons/line/lottie/` - Wind Beaufort scale animations (0-12)
- `public/icons/meteocons/fill/lottie/` - Sunrise and sunset animations
