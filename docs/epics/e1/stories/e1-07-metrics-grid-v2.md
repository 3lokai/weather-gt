# E1-07 (P1) Metrics Grid v2 (Gusts, Cloud, Dew, Pressure Trend)

## Description
Add `wind_gusts_10m`, `cloud_cover`, `dew_point_2m`, trend arrow for pressure.

## Acceptance Criteria

* Gusts visible when ≥ wind + 5 units; trend computed over last 3–6h (↑/→/↓).
* Cloud cover shown as % chip; Dew point in °.

## Dependencies
E1-03.

## Priority
P1 (Strongly desired)

## Definition of Done
- [ ] Accessibility: Keyboard + visible focus + ARIA patterns; AA contrast
- [ ] Performance: No unexpected layout shift; cached where applicable
- [ ] Testing: Unit for mappers/formatters; component tests for extended metrics; E2E happy path
- [ ] Docs: README + changelog updated; component props documented

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
- `src/components/weather/` - Extended metrics components (to be created)
