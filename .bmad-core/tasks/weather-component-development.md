# Weather Component Development Task

## Overview
Guide for building weather-specific React components with proper accessibility, theming, and performance considerations.

## Prerequisites
- shadcn/ui components installed
- Tailwind CSS configured
- Zustand store setup
- Icon system (Basmilius/Phosphor) configured

## Component Categories

### 1. Search & Navigation
- **LocationSearch**: Command palette with debounced geocoding
- **UnitsDropdown**: Global unit toggles with persistence
- **ThemeToggle**: System/light/dark/auto-time modes

### 2. Weather Display
- **CurrentConditionsCard**: Hero card with temperature and conditions
- **MetricsGrid**: Weather metrics with tooltips and icons
- **DailyStrip**: 7-day forecast with selectable chips
- **HourlyPanel**: Chart and list view for hourly data

### 3. Specialized Components
- **SunCycle**: Sunrise/sunset with progress visualization
- **AirQualityPanel**: AQI metrics with severity indicators
- **PollenPanel**: Pollen indices with regional support
- **CompareGrid**: Multi-location comparison view

### 4. Interactive Elements
- **FavoritesDrawer**: Saved locations management
- **VoiceSearch**: Web Speech API integration
- **RiveHero**: Animated background based on conditions

## Development Guidelines

### Accessibility
- Use proper ARIA roles and labels
- Ensure keyboard navigation works
- Maintain AA contrast ratios
- Support screen readers

### Performance
- Implement skeleton loading states
- Use React.memo for expensive components
- Lazy load charts and animations
- Optimize re-renders with proper dependencies

### Theming
- Use CSS custom properties for condition-based themes
- Support reduced motion preferences
- Implement smooth transitions (≤600ms)
- Handle day/night variants

## Testing Strategy
- Unit tests for utility functions
- Component tests with React Testing Library
- Accessibility tests with axe-core
- Visual regression tests for theming

## Acceptance Criteria
- [ ] All components are fully accessible
- [ ] Performance meets budget requirements
- [ ] Theming works across all conditions
- [ ] Components are properly typed
- [ ] Tests cover critical functionality

## Related Stories
- E1-02 through E1-10: Core weather components
- E2-01 through E2-03: Theming system
- E3-01 through E3-03: Performance and accessibility
- E4-01 through E4-03: Personalization features
