# E7-08 (P2) Moon Phase & Wind Arrow

## Description
Daily moon chip; wind direction arrow + Beaufort.

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
- Add moon phase visualization to daily forecast chips
- Implement wind direction arrow with proper orientation
- Add Beaufort scale indicators for wind strength
- Derive all visuals from existing weather data (no additional API calls)
- Use mathematical calculations for moon phase based on date
- Implement proper wind direction calculations
- Add accessibility labels for wind and moon information
- Ensure visuals are responsive and consistent with design system
- Add tooltips explaining moon phases and wind information
- Consider adding wind speed color coding based on Beaufort scale

## Related Files
- `src/components/weather/` - Daily forecast and wind components
- `src/lib/utils/` - Moon phase and wind calculation utilities (to be created)
- `src/lib/api/open-meteo.ts` - Existing weather data structure
