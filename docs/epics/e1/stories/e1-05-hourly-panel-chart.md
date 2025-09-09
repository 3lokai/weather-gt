# E1-05 (P0) Hourly Panel + Chart

## Description
Hourly temperature line + precip bars and list view for selected day.

## Acceptance Criteria

* Uses `hourly.temperature_2m`, `precipitation`, `precipitation_probability`.
* Hover shows tooltip (temp, PoP, precip); keyboard focusable points.
* Comfort bands (cold/pleasant/hot) indicated in background.
* Right rail on desktop, sticky within viewport; list item style matches comp (icon + time + temp pill).

## Dependencies
E1-04.

## Priority
P0 (Must have for demo)

## Definition of Done
- [x] Accessibility: Keyboard + visible focus + ARIA patterns; AA contrast
- [x] Performance: No unexpected layout shift; cached where applicable
- [x] Testing: Unit for mappers/formatters; component tests for hourly chart; E2E happy path
- [x] Docs: README + changelog updated; component props documented

## Technical Notes
- Create interactive chart showing hourly temperature line and precipitation bars
- Implement hover tooltips with temperature, precipitation probability, and precipitation amount
- Add keyboard navigation for chart points
- Include comfort bands (cold/pleasant/hot) as background indicators
- Support both chart and list view modes
- Integrate with selected day from daily forecast rail
- Use appropriate charting library (consider Recharts or similar)

## Related Files
- `src/lib/api/open-meteo.ts` - Hourly weather data structure
- `src/lib/store/weather-store.ts` - Selected day index state
- `src/components/weather/` - Hourly chart components (to be created)
