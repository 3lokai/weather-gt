# Changelog

All notable changes to this project will be documented in this file.

## [0.1.4] - 2024-12-19

### Added
- **Hourly Panel Chart (E1-05)**: Complete interactive hourly forecast component
  - Created `HourlyPanelChart` with dual view modes (chart and list)
  - Implemented temperature line chart with precipitation bars using Recharts
  - Added comfort bands (cold/pleasant/hot) as background indicators
  - Built interactive tooltips with temperature, precipitation, and probability data
  - Included keyboard navigation and accessibility features (ARIA labels, focus management)
  - Created list view mode with weather icons and comfort level badges
  - Added hover effects and click interactions for chart points
  - Implemented responsive design with proper mobile optimization
  - Integrated with selected day from daily forecast rail
  - Created comprehensive demo component with interactive controls
  - Added `useHourlyData` hook for data processing and day selection

### Technical Details
- Uses Recharts library for interactive chart visualization
- Comfort level thresholds: cold (<10°C), pleasant (10-25°C), hot (>25°C)
- Chart features: temperature line, precipitation bars, comfort bands, tooltips
- List features: weather icons, temperature pills, precipitation info, selection states
- Accessibility: keyboard navigation, screen reader support, high contrast ratios
- Integration with existing weather store for selected day management
- Demo data generator for development and testing scenarios

### Files Added
- `src/components/weather/hourly-panel-chart.tsx` - Main hourly chart component
- `src/components/weather/hourly-panel-chart-demo.tsx` - Interactive demo component

### Files Modified
- `src/components/weather/index.ts` - Added new component exports
- `src/components/weather/README.md` - Updated documentation with hourly chart details
- `src/app/page.tsx` - Added hourly chart demo to main page
- `docs/epics/e1/stories/e1-05-hourly-panel-chart.md` - Story completion

## [0.1.3] - 2024-12-19

### Added
- **7-Day Forecast Rail (E1-04)**: Complete daily forecast component system
  - Created `DailyForecastChip` component for individual day display
  - Implemented `SevenDayForecastRail` with horizontal scrollable layout
  - Added selection state management via Zustand store integration
  - Built accessibility-first design with ARIA patterns and keyboard navigation
  - Included responsive design for mobile and desktop viewports
  - Added visual selection indicators and hover effects
  - Implemented precipitation probability display with color coding
  - Created demo data hook for development and testing
  - Integrated with existing weather icon system and design tokens

### Technical Details
- Components use Open-Meteo API data structure for daily forecasts
- Selection state managed through existing `selectedDayIndex` in weather store
- Horizontal scroll with gradient fade indicators for better UX
- Temperature formatting respects user unit preferences (°C/°F)
- Weather icons adapt to day/night conditions
- Mobile-optimized with scroll hints and touch-friendly interactions

### Files Added
- `src/components/weather/daily-forecast-chip.tsx` - Individual daily forecast chip
- `src/components/weather/seven-day-forecast-rail.tsx` - 7-day forecast rail component

### Files Modified
- `src/components/weather/index.ts` - Added new component exports
- `src/components/weather/README.md` - Updated documentation with new components
- `docs/epics/e1/stories/e1-04-7day-forecast-rail.md` - Story completion

## [0.1.2] - 2024-12-19

### Added
- **Metrics Grid v1 (E1-03)**: Core weather metrics display component
  - Created responsive metrics grid with 5 core weather measurements
  - Implemented unit-aware formatting (temperature, wind speed, precipitation)
  - Added loading skeleton states with smooth animations
  - Included comprehensive error handling with user-friendly messages
  - Built accessibility-first design with ARIA labels and keyboard navigation
  - Added tooltip support for metric explanations
  - Created demo component showcasing all variants and states
  - Integrated with existing design system and glassmorphism effects

## [0.1.1] - 2024-12-19

### Added
- **Visual Parity Pass (E2-04)**: Complete design system consistency implementation
  - Updated spacing scale to match visual parity requirements (2/4/6/8/12/16/24/32...)
  - Implemented consistent border radius values (12/16/20/24px)
  - Enhanced shadow consistency across all elevated elements
  - Added "How's the sky looking today?" heading to all relevant pages
  - Created comprehensive design tokens system for consistent styling
  - Updated all UI components to use standardized spacing and radius values
  - Added design tokens export for programmatic access to design system values

### Fixed
- **Hydration Mismatch**: Resolved theme-related hydration errors
  - Added `suppressHydrationWarning` to `<html>` element in layout
  - Enhanced theme provider configuration with custom storage key
  - Ensured proper server-client theme synchronization

### Technical Details
- Spacing scale now follows exact pixel values: 2px, 4px, 6px, 8px, 12px, 16px, 24px, 32px, etc.
- Border radius scale standardized to: 8px (xs), 12px (sm), 16px (md), 20px (lg), 24px (xl)
- Shadow system already well-implemented and consistent across components
- Design tokens available in `src/lib/design-tokens/index.ts` for TypeScript support
- All components reviewed and updated for visual consistency
- Theme system properly configured to prevent hydration mismatches

### Files Modified
- `src/app/globals.css` - Updated spacing and radius scales, added missing radius-xs
- `src/app/compare/page.tsx` - Added consistent heading
- `src/lib/design-tokens/index.ts` - New design tokens system
- `src/app/layout.tsx` - Fixed hydration mismatch with suppressHydrationWarning
- `src/lib/providers/theme-provider.tsx` - Enhanced theme provider configuration
- `docs/epics/e2/stories/e2-04-visual-parity-pass.md` - Story completion

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
