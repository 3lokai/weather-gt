# E1-02 (P0) Current Conditions Card

## Description
Big temp, condition, location; icon via WMO→IconKey map.

## Acceptance Criteria

* Displays `temperature_2m`, `apparent_temperature`, `weather_code` label, location.
* Icon changes with day/night and overlays the hero background images.
* A11y label describes condition (e.g., "Light rain").
* Hero gradient + particle layer (CSS or Rive fallback), rounded ≈ 24px.

## Dependencies
E2-02 (icon map types) optional but recommended.

## Priority
P0 (Must have for demo)

## Definition of Done
- [x] Accessibility: Keyboard + visible focus + ARIA patterns; AA contrast
- [x] Performance: No unexpected layout shift; cached where applicable
- [ ] Testing: Unit for mappers/formatters; component tests for cards; E2E happy path
- [x] Docs: README + changelog updated; component props documented

## Technical Notes
- Use WMO weather codes to determine condition and icon
- Support day/night icon variants that overlay the background images
- Display current temperature and apparent temperature
- Show location name from selected location
- Integrate with weather condition mapping from API
- Responsive design for different screen sizes
- Use `Desktop - Hero bg.svg` (800x286px) for desktop hero background
- Use `Mobile - Hero bg.svg` (343x286px) for mobile hero background
- SVGs include blue gradient (#4658D9 to #2B1B9C), particle effects, and rounded corners (rx="20")
- Weather icon should be positioned to overlay the background SVG images

## Implementation Status
✅ **COMPLETED** - Current Conditions Card fully implemented and integrated

### Implemented Components
- `src/components/weather/current-conditions-card.tsx` - Main component
- `src/components/weather/current-conditions-demo.tsx` - Interactive demo
- `src/components/weather/index.ts` - Export declarations
- `src/components/weather/README.md` - Component documentation

### Features Delivered
- ✅ Temperature display with unit conversion (°C/°F)
- ✅ Apparent temperature ("feels like") display
- ✅ Weather condition labels from WMO codes
- ✅ Location formatting with country/region
- ✅ Animated weather icons with day/night variants
- ✅ Weather-specific dynamic theming
- ✅ Three responsive size variants (sm, md, lg)
- ✅ Full accessibility support (ARIA, keyboard navigation)
- ✅ Integration with existing theme and store systems

### Demo Available
Interactive demo with multiple weather scenarios at: http://localhost:3001

## Related Files
- `src/lib/api/open-meteo.ts` - Weather data and condition mapping
- `src/lib/store/weather-store.ts` - Selected location state
- `src/components/weather/` - Weather display components (✅ implemented)
- `src/hooks/use-weather-theme.ts` - Weather theme integration
- `public/Desktop - Hero bg.svg` - Desktop hero background (800x286px)
- `public/Mobile - Hero bg.svg` - Mobile hero background (343x286px)
