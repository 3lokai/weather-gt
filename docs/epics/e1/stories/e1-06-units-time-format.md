# E1-06 (P0) Units & Time Format

## Description
Global toggles: C/F, km/h|mph, mm (display "in"), hPa|inHg, 12/24‑h.

## Acceptance Criteria

* Dropdown uses group headings + checkmarks and a top "Switch to …" quick action.
* Forecast refetches when units/time change; number flip animation ≤180ms.
* Labels update across all views (cards, chart axes, tooltips).

## Dependencies
None

## Priority
P0 (Must have for demo)

## Definition of Done
- [ ] Accessibility: Keyboard + visible focus + ARIA patterns; AA contrast
- [ ] Performance: No unexpected layout shift; cached where applicable
- [ ] Testing: Unit for mappers/formatters; component tests for units; E2E happy path
- [ ] Docs: README + changelog updated; component props documented

## Technical Notes
- Implement global unit toggles for temperature, wind speed, precipitation, and pressure
- Add 12/24 hour time format toggle
- Trigger weather data refetch when units change
- Implement smooth number flip animations (≤180ms) for unit changes
- Update all UI labels, chart axes, and tooltips when units change
- Persist unit preferences in local storage
- Handle unit conversions and formatting consistently across the app

## Related Files
- `src/lib/store/weather-store.ts` - Units state management
- `src/lib/api/open-meteo.ts` - API calls with unit parameters
- `src/components/settings/` - Unit toggle components (to be created)
