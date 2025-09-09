# Weather Components

This directory contains weather-related UI components for the weather application.

## Components

### CurrentConditionsCard
Displays current weather conditions with temperature, weather icon, and location information.

**Props:**
- `conditions`: Current weather conditions data
- `location`: Location information
- `size`: Size variant ('sm' | 'md' | 'lg')
- `showApparentTemp`: Whether to show apparent temperature
- `showHeroBackground`: Enable weather hero background
- `heroBackgroundOpacity`: Background opacity (0-1)

### MetricsGrid
Displays weather metrics in a responsive grid layout with 5 core metrics:
- Feels like temperature
- Humidity
- Wind speed
- Precipitation
- Surface pressure

**Props:**
- `weather`: Current weather data (can be null for loading/error states)
- `isLoading`: Loading state
- `error`: Error message
- `size`: Size variant ('sm' | 'md' | 'lg')
- `showTooltips`: Whether to show tooltips
- `layout`: Layout variant ('grid' | 'list')

**Features:**
- Responsive grid layout (2 cols mobile, 3 cols tablet, 5 cols desktop)
- Unit-aware formatting based on user preferences
- Loading skeleton states
- Error handling with user-friendly messages
- Accessibility compliant (ARIA labels, keyboard navigation)
- Glassmorphism styling with hover effects
- Tooltip support for metric explanations

### WeatherHeroBackground
Animated background component that adapts to weather conditions.

### DailyForecastChip
Individual daily forecast chip showing day name, weather icon, temperature range, and precipitation probability.

**Props:**
- `data`: Daily forecast data
- `dayIndex`: Day index (0-6)
- `isSelected`: Whether this chip is currently selected
- `isToday`: Whether this is today
- `onSelect`: Click handler for selection

### SevenDayForecastRail
Horizontal scrollable rail displaying 7 daily forecast chips with selection functionality.

**Props:**
- `dailyData`: Array of daily forecast data (7 days)
- `showScrollIndicators`: Whether to show scroll indicators
- `className`: Additional CSS classes

**Features:**
- Horizontal scrollable layout
- Keyboard navigation support
- Selection state management via Zustand store
- Responsive design for mobile and desktop
- Accessibility compliant with ARIA patterns
- Visual selection indicators

### HourlyPanelChart
Interactive hourly forecast component with both chart and list view modes. Shows temperature line chart with precipitation bars and comfort bands.

**Props:**
- `hourlyData`: Hourly weather data from Open-Meteo API
- `selectedDayIndex`: Selected day index from daily forecast rail
- `temperatureUnit`: Temperature unit ('celsius' | 'fahrenheit')
- `timeFormat`: Time format preference ('12h' | '24h')
- `viewMode`: Display mode ('chart' | 'list')
- `className`: Additional CSS classes

**Features:**
- **Chart View:**
  - Temperature line with interactive dots
  - Precipitation bars with probability
  - Comfort bands (cold/pleasant/hot) background indicators
  - Hover tooltips with detailed information
  - Keyboard navigation support
  - Responsive design with Recharts
- **List View:**
  - Weather icons for each hour
  - Temperature with comfort level badges
  - Precipitation amounts and probability
  - Click to select active hour
  - Accessible button interactions
- **Accessibility:**
  - ARIA labels and keyboard navigation
  - Screen reader friendly
  - High contrast ratios
  - Focus management

## Usage Examples

### Basic Metrics Grid
```tsx
import { MetricsGrid } from '@/components/weather';

<MetricsGrid
  weather={weatherData}
  size="md"
  showTooltips={true}
  layout="grid"
/>
```

### With Loading State
```tsx
<MetricsGrid
  weather={null}
  isLoading={true}
  size="md"
/>
```

### With Error State
```tsx
<MetricsGrid
  weather={null}
  error="Failed to load weather data"
  size="md"
/>
```

### Seven Day Forecast Rail
```tsx
import { SevenDayForecastRail, useDailyForecast } from '@/components/weather';

const dailyData = useDailyForecast(location);

<SevenDayForecastRail
  dailyData={dailyData}
  showScrollIndicators={true}
/>
```

### Hourly Panel Chart
```tsx
import { HourlyPanelChart, useHourlyData } from '@/components/weather';

const hourlyData = useHourlyData(weatherData.hourly, selectedDayIndex);

<HourlyPanelChart
  hourlyData={hourlyData}
  selectedDayIndex={selectedDayIndex}
  temperatureUnit="celsius"
  timeFormat="12h"
  viewMode="chart"
/>
```

### With List View
```tsx
<HourlyPanelChart
  hourlyData={hourlyData}
  selectedDayIndex={selectedDayIndex}
  temperatureUnit="celsius"
  timeFormat="24h"
  viewMode="list"
/>
```

## Design System Integration

All components use the weather app's design system:
- OKLCH color space for consistent theming
- Glassmorphism effects with backdrop blur
- Responsive typography scale
- Weather condition-based accent colors
- Accessibility-first approach

## Accessibility

Components are built with accessibility in mind:
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios
- Semantic HTML structure

## Performance

- Optimized for minimal layout shifts
- Efficient re-renders with proper memoization
- Responsive images with proper sizing
- CSS-based animations for smooth performance