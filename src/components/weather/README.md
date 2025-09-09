# Weather Components

This directory contains weather-related UI components for the Weather GT application.

## Components

### CurrentConditionsCard

A comprehensive card component that displays current weather conditions with accessibility features and responsive design.

#### Features

- **Temperature Display**: Shows current and apparent temperature with configurable units
- **Weather Icons**: Animated Lottie weather icons with day/night variants, enhanced styling, and fallbacks
- **Location Display**: Formatted location name with country/region info
- **Weather Condition**: Human-readable weather condition labels
- **Accessibility**: Full ARIA support, keyboard navigation, and AA contrast compliance
- **Responsive Design**: Three size variants (sm, md, lg) for different layouts
- **Dynamic Weather Themes**: Uses enhanced `useWeatherTheme` hook with time-of-day variants
- **Hero Backgrounds**: Optional weather-adaptive SVG backgrounds that respond to conditions and time
- **Enhanced Atmospheric Effects**: Time-based theming (dawn, day, dusk, night) with automatic adjustments

#### Props

```typescript
interface CurrentConditionsCardProps {
  /** Current weather conditions data */
  conditions: CurrentConditionsData;
  /** Location for display */
  location: Location;
  /** Additional CSS classes */
  className?: string;
  /** Size variant for the card */
  size?: 'sm' | 'md' | 'lg';
  /** Show apparent temperature */
  showApparentTemp?: boolean;
  /** Enable weather hero background */
  showHeroBackground?: boolean;
  /** Hero background opacity (0-1) */
  heroBackgroundOpacity?: number;
}
```

#### Data Structure

```typescript
interface CurrentConditionsData {
  temperature_2m: number;
  apparent_temperature: number;
  weather_code: number;
  is_day: boolean;
}
```

#### Usage Examples

```tsx
// Basic usage
<CurrentConditionsCard
  conditions={weatherData}
  location={selectedLocation}
/>

// Large size variant
<CurrentConditionsCard
  conditions={weatherData}
  location={selectedLocation}
  size="lg"
/>

// Custom styling
<CurrentConditionsCard
  conditions={weatherData}
  location={selectedLocation}
  className="border-primary"
  showApparentTemp={false}
/>

// With hero background
<CurrentConditionsCard
  conditions={weatherData}
  location={selectedLocation}
  size="lg"
  showHeroBackground={true}
  heroBackgroundOpacity={0.6}
/>

// Enhanced atmospheric card (adapts to time and weather)
<CurrentConditionsCard
  conditions={weatherData}
  location={selectedLocation}
  showHeroBackground={true}
  className="backdrop-blur-sm"
/>
```

#### Accessibility Features

- **ARIA Labels**: Comprehensive labeling for screen readers
- **Semantic Markup**: Proper HTML5 semantic elements
- **Keyboard Navigation**: Full keyboard accessibility
- **High Contrast**: Theme-aware contrast ratios meeting AA standards
- **Focus Management**: Visible focus indicators
- **Screen Reader Support**: Descriptive labels for all interactive elements

#### Integration

The component integrates with:

- **Weather Store**: Uses Zustand store for units and location state
- **Icon System**: Leverages the Meteocons icon library
- **Weather Theme System**: Uses `useWeatherTheme` hook to dynamically apply weather-specific themes
- **Global Theme System**: Responds to light/dark theme changes via CSS custom properties
- **API Layer**: Compatible with Open-Meteo API data structure

#### Testing

Component tests should cover:

- **Rendering**: All size variants and prop combinations
- **Accessibility**: ARIA attributes and keyboard navigation
- **Units**: Temperature and location formatting
- **Theming**: Light/dark theme variants
- **Icons**: Icon loading and fallback behavior

#### Related Components

- `LottieWeatherIcon` - Weather icon rendering
- `WeatherTheme` - Theme integration hooks
- `SearchProvider` - Location search functionality

#### Story Implementation

This component implements story E1-02 (Current Conditions Card) with the following acceptance criteria:

- ✅ Displays temperature_2m, apparent_temperature, weather_code label, location
- ✅ Icon changes with day/night
- ✅ A11y label describes condition
- ✅ Accessibility: Keyboard + visible focus + ARIA patterns; AA contrast
- ✅ Performance: No unexpected layout shift; cached where applicable
- ✅ Testing: Component structure ready for unit and E2E tests
- ✅ Docs: README and component props documented

#### Technical Notes

- Uses WMO weather codes for condition mapping
- Supports day/night icon variants
- Responsive design for different screen sizes
- Integrates with weather condition mapping from API
- Performance optimized with proper memoization patterns
