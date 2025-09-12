# E1-04 (P0) 7‑Day Forecast Rail

## Description
Selectable daily chips with hi/low, icon, PoP.

## Acceptance Criteria

* Uses `daily.temperature_2m_max/min`, `weather_code`, `precipitation_probability_max`.
* Selecting day updates Hourly Panel.


## Dependencies
E1-05.

## Priority
P0 (Must have for demo)

## Definition of Done
- [x] Accessibility: Keyboard + visible focus + ARIA patterns; AA contrast
- [x] Performance: No unexpected layout shift; cached where applicable
- [x] Testing: Unit for mappers/formatters; component tests for daily chips; E2E happy path
- [x] Docs: README + changelog updated; component props documented

## Technical Notes
- Display 7 daily forecast chips in a horizontal scrollable rail
- Show high/low temperatures, weather icon, and precipitation probability
- Make chips selectable to update hourly panel
- Use responsive design for mobile and desktop
- Integrate with weather store for selected day state
- Handle day/night icon variants based on time

## Related Files
- `src/lib/api/open-meteo.ts` - Daily weather data structure
- `src/lib/store/weather-store.ts` - Selected day index state
- `src/components/weather/` - Daily forecast components (to be created)

## Status
Done