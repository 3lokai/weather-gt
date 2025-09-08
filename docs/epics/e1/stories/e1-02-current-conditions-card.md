# E1-02 (P0) Current Conditions Card

## Description
Big temp, condition, location; icon via WMO→IconKey map.

## Acceptance Criteria

* Displays `temperature_2m`, `apparent_temperature`, `weather_code` label, location.
* Icon changes with day/night.
* A11y label describes condition (e.g., "Light rain").

## Dependencies
E2-02 (icon map types) optional but recommended.

## Priority
P0 (Must have for demo)

## Definition of Done
- [ ] Accessibility: Keyboard + visible focus + ARIA patterns; AA contrast
- [ ] Performance: No unexpected layout shift; cached where applicable
- [ ] Testing: Unit for mappers/formatters; component tests for cards; E2E happy path
- [ ] Docs: README + changelog updated; component props documented

## Technical Notes
- Use WMO weather codes to determine condition and icon
- Support day/night icon variants
- Display current temperature and apparent temperature
- Show location name from selected location
- Integrate with weather condition mapping from API
- Responsive design for different screen sizes

## Related Files
- `src/lib/api/open-meteo.ts` - Weather data and condition mapping
- `src/lib/store/weather-store.ts` - Selected location state
- `src/components/weather/` - Weather display components (to be created)
