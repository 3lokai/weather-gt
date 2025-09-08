# E1-08 (P1) Precipitation Probability Everywhere

## Description
Add PoP to current badge, daily chips, hourly tooltip.

## Acceptance Criteria

* PoP shown as %; when missing regionally, UI gracefully hides.

## Dependencies
E1-05.

## Priority
P1 (Strongly desired)

## Definition of Done
- [ ] Accessibility: Keyboard + visible focus + ARIA patterns; AA contrast
- [ ] Performance: No unexpected layout shift; cached where applicable
- [ ] Testing: Unit for mappers/formatters; component tests for PoP display; E2E happy path
- [ ] Docs: README + changelog updated; component props documented

## Technical Notes
- Add precipitation probability (PoP) to current conditions badge
- Include PoP in daily forecast chips
- Show PoP in hourly chart tooltips
- Display PoP as percentage values
- Handle cases where PoP data is not available regionally
- Gracefully hide PoP indicators when data is missing
- Maintain consistent styling and positioning
- Ensure PoP is clearly distinguishable from other metrics

## Related Files
- `src/lib/api/open-meteo.ts` - Precipitation probability data
- `src/components/weather/` - Current conditions, daily chips, hourly chart components
