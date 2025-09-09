# E7-01 (P0) Settings Drawer

## Description
Units, 12/24‑h, theme (light/dark with next-themes), reduced motion, language, reset app.

## Acceptance Criteria

* Mirrors Units menu grouping and time format; retains reduced-motion & theme.
* Theme toggle uses next-themes (light/dark modes).
* Automatic time-based theme switching on page load.
* All options persist; language affects geocoding results.

## Dependencies
E1-06, i18n.

## Priority
P0 (Must have for demo)

## Definition of Done
- [ ] Accessibility: Keyboard + visible focus + ARIA patterns; AA contrast
- [ ] Performance: No unexpected layout shift; cached where applicable
- [ ] Testing: Unit for mappers/formatters; component tests for settings; E2E happy path
- [ ] Docs: README + changelog updated; component props documented

## Technical Notes
- Create a slide-out settings drawer with all user preferences
- Include unit toggles: temperature (C/F), wind speed (km/h/mph), precipitation (mm/in), pressure (hPa/inHg)
- Add time format toggle (12h/24h)
- Implement theme selection using next-themes: light, dark modes
- Add automatic time-based theme switching (light during day, dark during night)
- Add reduced motion preference toggle
- Include language selection that affects geocoding results
- Add app reset functionality
- Persist all settings in local storage
- Integrate with weather store for state management
- Ensure settings changes trigger appropriate data refetches

## Related Files
- `src/lib/store/weather-store.ts` - Settings state management
- `src/components/settings/` - Settings drawer components (to be created)
- `src/lib/i18n/` - Internationalization system
- `src/lib/providers/theme-provider.tsx` - next-themes provider setup
- `src/hooks/use-theme-toggle.ts` - Theme toggle hook with time-based detection
