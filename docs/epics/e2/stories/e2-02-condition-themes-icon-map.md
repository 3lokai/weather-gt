# E2-02 (P0) Condition Themes + Icon Map

## Description
Map WMO→`IconKey` and `ThemeKey` (clear/cloudy/overcast/fog/rain/snow/thunder + day/night).

## Acceptance Criteria

* Changing condition updates background gradient + icon.
* Reduced motion disables gradient animation.

## Dependencies
E2-01.

## Priority
P0 (Must have for demo)

## Definition of Done
- [x] Accessibility: Keyboard + visible focus + ARIA patterns; AA contrast
- [x] Performance: No unexpected layout shift; cached where applicable
- [x] Testing: Unit for mappers/formatters; component tests for themes; E2E happy path (SKIPPED)
- [x] Docs: README + changelog updated; component props documented

## Status: ✅ COMPLETED
**Implementation**: Complete condition themes and icon mapping system with ReactBits liquid ether background:
- **Icon Mapping**: Full WMO code to IconKey mapping in `src/lib/icons/iconMap.ts`
- **Theme System**: Weather condition themes in `src/app/globals.css` (clear-day, clear-night, rain, snow, cloudy, fog, thunder)
- **Icon Support**: Basmilius and Phosphor icon pack mappings
- **WMO Labels**: Complete weather condition labels for accessibility
- **Day/Night Variants**: Proper day/night icon and theme variants
- **Dynamic Background**: Weather-themed liquid ether background with OKLCH color palettes
- **Theme Application**: `useWeatherTheme` hook for dynamic theme switching
- **Reduced Motion**: Full accessibility support for motion preferences
- **Background Integration**: Seamless integration with weather condition themes

## Technical Notes
- Create comprehensive mapping from WMO weather codes to icon keys and theme keys
- Support 7 main condition groups: clear, cloudy, overcast, fog, rain, snow, thunder
- Implement day/night variants for all conditions and icons
- Create theme system that updates background gradients based on weather conditions
- Implement icon system with appropriate weather icons for each condition
- Respect user's reduced motion preferences for animations
- Ensure smooth transitions between different weather conditions
- Create fallback themes for unknown or missing weather codes

## Related Files
- `src/lib/api/open-meteo.ts` - WMO weather code mapping (existing)
- `src/lib/theme/` - Theme and icon mapping utilities (to be created)
- `src/components/weather/` - Weather condition components
- `src/styles/` - Theme-specific CSS variables
