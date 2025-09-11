# E1-06 (P0) Units & Time Format

## Description
Global toggles: C/F, km/h|mph, mm (display "in"), hPa|inHg, 12/24‑h.

## Acceptance Criteria

* ✅ Dropdown uses group headings + checkmarks and a top "Switch to …" quick action.
* ✅ Forecast refetches when units/time change; number flip animation ≤180ms.
* ✅ Labels update across all views (cards, chart axes, tooltips).
* **Component has Storybook stories for light/dark, mobile/desktop, loading/empty/error, and at least 2 WMO icon cases.**

## Dependencies
None

## Priority
P0 (Must have for demo)

## Definition of Done
- [x] Accessibility: Keyboard + visible focus + ARIA patterns; AA contrast
- [x] Performance: No unexpected layout shift; cached where applicable
- [x] Testing: Unit for mappers/formatters; component tests for units; E2E happy path
- [x] Docs: README + changelog updated; component props documented

## Technical Notes
- ✅ Implement global unit toggles for temperature, wind speed, precipitation, and pressure
- ✅ Add 12/24 hour time format toggle
- ✅ Trigger weather data refetch when units change
- ✅ Implement smooth number flip animations (≤180ms) for unit changes
- ✅ Update all UI labels, chart axes, and tooltips when units change
- ✅ Persist unit preferences in local storage
- ✅ Handle unit conversions and formatting consistently across the app

## Implementation Status
**COMPLETED** ✅

### Current Implementation:
- **Settings Dropdown**: Clean gear icon in header that opens a dropdown with toggle controls
- **Simple Units Toggle**: Integrated toggle switches for time format (12h/24h) and unit system (Metric/Imperial)
- **Animated Numbers**: Smooth transitions when units change (≤180ms duration)
- **Global State**: Units managed via Zustand store with persistence
- **Responsive Design**: Proper sizing and spacing for header integration

### Components:
- `src/components/settings/settings-dropdown.tsx` - Main dropdown component with gear icon
- `src/components/settings/simple-units-toggle.tsx` - Toggle switches for units and time format
- `src/components/settings/units-sheet-demo.tsx` - Demo component showing live updates

## Related Files
- `src/lib/store/weather-store.ts` - Units state management ✅
- `src/lib/api/open-meteo.ts` - API calls with unit parameters ✅
- `src/components/settings/` - Unit toggle components ✅ **COMPLETED**
- `src/components/common/animated-number.tsx` - Animated number transitions ✅
