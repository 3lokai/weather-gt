# E7-02 (P0) Deep Links & Share

## Description
URLs encode `lat,lon,name,units,timeFormat,dayIndex`; "Copy link" button.

## Acceptance Criteria

* Loading a deep link restores exact state.

## Dependencies
Routing.

## Priority
P0 (Must have for demo)

## Definition of Done
- [ ] Accessibility: Keyboard + visible focus + ARIA patterns; AA contrast
- [ ] Performance: No unexpected layout shift; cached where applicable
- [ ] Testing: Unit for mappers/formatters; component tests for deep links; E2E happy path
- [ ] Docs: README + changelog updated; component props documented

## Technical Notes
- Implement URL state management for all app state
- Encode location (lat, lon, name), units, time format, and selected day index in URL
- Add "Copy link" button for sharing current state
- Ensure loading a deep link restores exact app state
- Handle URL updates when user changes settings or location
- Implement proper URL encoding/decoding
- Add share functionality for mobile devices
- Consider implementing URL shortening for complex states
- Ensure deep links work with browser back/forward navigation
- Add proper error handling for invalid URLs

## Related Files
- `src/lib/store/weather-store.ts` - State management for URL sync
- `src/components/ui/` - Share button component (to be created)
- `src/app/` - Next.js routing integration
