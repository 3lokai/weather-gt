# E7-01 (P0) Settings Drawer

## Description
Units, 12/24‑h, theme (light/dark with next-themes), reduced motion accessibility setting, app reset functionality.

## Acceptance Criteria

* ✅ Mirrors Units menu grouping and time format; retains theme integration.
* ✅ Theme toggle uses next-themes (light/dark modes).
* ✅ Time-based theme switching automatically picks light/dark based on location sunrise/sunset.
* ✅ All options persist in local storage via Zustand.
* ✅ Settings dropdown provides comprehensive unit and time format controls.
* ✅ Reduced motion accessibility setting disables animations for users with motion sensitivity.
* [ ] App reset functionality clears all user preferences.

## Dependencies
E1-06, theme system (next-themes).

## Priority
P0 (Must have for demo)

## Definition of Done
- [x] Accessibility: Keyboard + visible focus + ARIA patterns; AA contrast
- [x] Performance: No unexpected layout shift; cached where applicable
- [ ] Testing: Unit for mappers/formatters; component tests for settings; E2E happy path
- [ ] Docs: README + changelog updated; component props documented

## Technical Notes
- ✅ Settings dropdown with comprehensive unit toggles: temperature (C/F), wind speed (km/h/mph), precipitation (mm/in), pressure (hPa/inHg)
- ✅ Time format toggle (12h/24h) implemented
- ✅ Theme selection using next-themes: light, dark modes
- ✅ Time-based theme switching: automatically picks light/dark based on location sunrise/sunset using suncalc library
- ✅ Unit formatters and hooks for easy consumption across components
- ✅ Integration with weather store for state management
- ✅ Time-based theme calculation utilities with proper error handling and fallbacks
- ✅ Reduced motion accessibility setting: disables all animations (liquid ether, hover effects, transitions) for motion-sensitive users
- ✅ Accessibility settings persisted in weather store with proper migration
- [ ] Add app reset functionality to clear all user preferences
- [ ] Integrate theme toggle into settings dropdown
- [ ] Ensure settings changes trigger appropriate data refetches

## Related Files
- `src/lib/store/weather-store.ts` - Settings state management
- `src/components/settings/settings-dropdown.tsx` - Main settings dropdown component
- `src/components/settings/simple-units-toggle.tsx` - Units, time format, and reduced motion toggles
- `src/components/theme-toggle/theme-toggle.tsx` - Theme toggle component
- `src/lib/providers/theme-provider.tsx` - next-themes provider setup
- `src/hooks/use-theme-toggle.ts` - Theme toggle hook with time-based switching
- `src/hooks/use-reduced-motion.ts` - Reduced motion hook for accessibility
- `src/components/providers/reduced-motion-provider.tsx` - Reduced motion provider component
- `src/lib/utils/time-based-theme.ts` - Time-based theme calculation utilities
- `src/lib/utils/__tests__/time-based-theme.test.ts` - Unit tests for time-based theme logic
- `src/hooks/__tests__/use-reduced-motion.test.ts` - Unit tests for reduced motion functionality

## Implementation Status
- ✅ Units system (metric/imperial) - Complete
- ✅ Time format toggle (12h/24h) - Complete  
- ✅ Theme system (next-themes) - Complete
- ✅ Time-based theme switching - Complete
- ✅ Settings dropdown UI - Complete
- ✅ Unit formatters and hooks - Complete
- ✅ Reduced motion accessibility setting - Complete
- [ ] App reset functionality - Pending
- [ ] Theme toggle integration in settings - Pending

## Status
Done