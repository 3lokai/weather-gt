# E1-03 (P0) Metrics Grid v1

## Description
Feels‑like, humidity, wind speed, precip, pressure.

## Acceptance Criteria

* Shows: `apparent_temperature`, `relative_humidity_2m`, `wind_speed_10m`, `precipitation`, `surface_pressure`.
* Unit labels reflect global units.
* Tooltips explain metrics.

## Dependencies
E6-02 (analytics) optional.

## Priority
P0 (Must have for demo)

## Definition of Done
- [ ] Accessibility: Keyboard + visible focus + ARIA patterns; AA contrast
- [ ] Performance: No unexpected layout shift; cached where applicable
- [ ] Testing: Unit for mappers/formatters; component tests for metrics; E2E happy path
- [ ] Docs: README + changelog updated; component props documented

## Technical Notes
- Display 5 core weather metrics in a responsive grid
- Show appropriate units based on user preferences
- Include helpful tooltips for each metric
- Use consistent styling with the design system
- Handle loading and error states gracefully
- Support metric-specific formatting (percentages, pressure, etc.)

## Related Files
- `src/lib/api/open-meteo.ts` - Weather data structure
- `src/lib/store/weather-store.ts` - Units preferences
- `src/components/weather/` - Metrics display components (to be created)
