# File Structure & Extension Points

## App Router File Structure

```
app/
  layout.tsx                    # Root layout with providers
  page.tsx                      # Home page
  compare/page.tsx              # Compare view
  offline/page.tsx              # Offline fallback page
  components/
    topbar/TopBar.tsx           # Main navigation bar
    search/LocationSearch.tsx   # Location search component
    hero/RiveHero.tsx           # Animated weather hero
    weather/CurrentConditionsCard.tsx  # Main weather display
    weather/MetricsGrid.tsx     # Weather metrics grid
    weather/DailyStrip.tsx      # 7-day forecast strip
    weather/HourlyPanel.tsx     # Hourly weather details
    weather/SunCycle.tsx        # Sunrise/sunset visualization
    favorites/FavoritesDrawer.tsx  # Favorites management
    compare/CompareGrid.tsx     # Multi-location comparison
    ui/                         # shadcn exports + wrappers
  styles/globals.css            # Global styles and CSS variables

lib/
  api/http.ts                   # HTTP client with error handling
  api/openMeteo.ts             # Open-Meteo API integration
  api/mappers.ts               # Data transformation and mapping
  icons/iconMap.ts             # WMO → IconKey → icon mapping
  theme/tokens.css.ts          # CSS variable definitions
  theme/provider.tsx           # Theme context provider
  store/appStore.ts            # Zustand store configuration
  utils/format.ts              # Data formatting utilities
  utils/time.ts                # Time and date utilities
  utils/units.ts               # Unit conversion utilities
  voice/speech.ts              # Voice search implementation

public/
  icons/                       # PWA icons and favicons
  manifest.json                # PWA manifest

workers/
  pwa.config.js                # next-pwa configuration
```

## Component Organization

### Weather Components (`app/components/weather/`)
- **CurrentConditionsCard**: Main weather display with icon and temperature
- **MetricsGrid**: Grid layout for weather metrics (wind, humidity, pressure, etc.)
- **DailyStrip**: Horizontal strip of 7-day forecast chips
- **HourlyPanel**: Detailed hourly view with charts and data
- **SunCycle**: Sunrise/sunset visualization with progress arc

### Navigation Components (`app/components/topbar/`, `app/components/search/`)
- **TopBar**: Main navigation with search, units, theme, favorites
- **LocationSearch**: Advanced search with autocomplete and voice input

### Feature Components (`app/components/favorites/`, `app/components/compare/`)
- **FavoritesDrawer**: Manage and organize favorite locations
- **CompareGrid**: Multi-location weather comparison view

### UI Components (`app/components/ui/`)
- **shadcn/ui exports**: Re-exported and customized shadcn components
- **Custom wrappers**: Application-specific component wrappers
- **Shared components**: Common UI patterns and utilities

## Library Organization

### API Layer (`lib/api/`)
- **http.ts**: Base HTTP client with AbortController and error handling
- **openMeteo.ts**: Open-Meteo API integration and query builders
- **mappers.ts**: Data transformation from API responses to internal types

### State Management (`lib/store/`)
- **appStore.ts**: Main Zustand store with persistence middleware

### Utilities (`lib/utils/`)
- **format.ts**: Data formatting for display (temperature, wind speed, etc.)
- **time.ts**: Time zone handling and date formatting
- **units.ts**: Unit conversion between metric and imperial

### Theme System (`lib/theme/`)
- **tokens.css.ts**: CSS variable definitions and theme tokens
- **provider.tsx**: React context for theme management

### Features (`lib/voice/`, `lib/icons/`)
- **speech.ts**: Web Speech API integration for voice search
- **iconMap.ts**: Weather condition to icon mapping

## Extension Points (Post-Hackathon)

### Map Integration
* **Map View**: Interactive map with weather overlays
* **Radar Tiles**: Real-time weather radar integration
* **Location Picker**: Click-to-select locations on map
* **Route Weather**: Weather along travel routes

### Advanced Weather Features
* **Severe Weather Alerts**: Real-time weather warnings and alerts
* **Minute Nowcast**: Short-term precipitation forecasting
* **Weather Cameras**: Live weather camera feeds
* **Historical Data**: Past weather data and trends

### User Features
* **Push Notifications**: Weather alerts and updates
* **Account Sync**: Cross-device synchronization
* **Weather Widgets**: Home screen widgets for mobile
* **Weather Sharing**: Social sharing of weather conditions

### Data Sources
* **Multiple Providers**: Integration with additional weather APIs
* **Local Sensors**: Integration with personal weather stations
* **Crowdsourced Data**: User-contributed weather observations
* **Satellite Data**: Enhanced satellite imagery and data

### Platform Extensions
* **Desktop App**: Electron wrapper for desktop
* **Mobile Apps**: React Native or native mobile apps
* **Smart Home**: Integration with smart home systems
* **Voice Assistants**: Alexa/Google Home integration

## Development Workflow

### File Naming Conventions
* **Components**: PascalCase for component files
* **Utilities**: camelCase for utility functions
* **Types**: PascalCase for TypeScript interfaces
* **Constants**: UPPER_SNAKE_CASE for constants

### Import Organization
* **External libraries**: First
* **Internal components**: Second
* **Utilities and types**: Third
* **Relative imports**: Last

### Code Organization
* **Single Responsibility**: Each file has a clear, single purpose
* **Co-location**: Related files grouped in same directory
* **Barrel Exports**: Index files for clean imports
* **Type Safety**: Strict TypeScript configuration
