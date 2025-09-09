# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] - 2024-12-19

### Added
- **Current Conditions Card (E1-02)**: Complete weather display component
  - Temperature display with unit conversion (°C/°F) 
  - Apparent temperature ("feels like") indication
  - Weather condition labels from WMO weather codes
  - Location formatting with country/region support
  - Animated Lottie weather icons with day/night variants
  - Dynamic weather-specific theming integration
  - Three responsive size variants (sm, md, lg)
  - Full accessibility support (ARIA, keyboard navigation, AA contrast)
  - Integration with Zustand store and weather theme system
  - Interactive demo with multiple weather scenarios

- **OKLCH Token System (E2-01)**: Complete design system implementation
  - Full OKLCH color space integration for better color consistency and accessibility
  - Light and dark theme variants with proper contrast ratios
  - Weather condition-specific theming (clear, rain, snow, cloudy, fog, thunder)
  - Semantic color tokens (primary, secondary, accent, success, warning, destructive, info)
  - Comprehensive typography scale optimized for weather data display
  - Custom gradients and shadows for visual hierarchy
  - AA contrast compliance in both light and dark modes
  - Integration with Tailwind CSS v4 using `@theme` directive

### Technical Details
- Implemented in `src/app/globals.css` using CSS custom properties
- Color system based on blue/purple/orange theme palette
- Weather-specific accent color overrides for contextual theming
- Custom utility classes for weather-specific typography scales
- Gradient utilities for primary, card, and accent backgrounds

### Files Modified
- `src/app/globals.css` - Complete OKLCH token system implementation
- `README.md` - Added design system documentation
- `docs/epics/e2/stories/e2-01-oklch-token-system.md` - Story completion
