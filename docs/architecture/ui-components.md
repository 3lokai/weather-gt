# UI Components & Theming

## Component Architecture

### Core Components

* **TopBar**: `LocationSearch` (shadcn Command), `UnitsDropdown`, `ThemeToggle`, `FavoritesButton`.
* **LocationSearch**: debounced geocode; recent + favorites; voice mic.
* **Hero**: `RiveHero` + `CurrentConditionsCard` (icon, big temp, location, feels‑like).
* **MetricsGrid**: cards for wind/gust, humidity, precip+PoP, pressure(+trend), UV, visibility, cloud, dew point.
* **DailyStrip**: 7 day chips (icon, hi/lo, PoP) → drives selectedDay.
* **HourlyPanel**: chart (temp + comfort bands, precip) + list; hover links to cards & compare.
* **SunCycle**: sunrise/sunset with progress arc.
* **FavoritesDrawer**: list, star/unstar, reorder; dedupe; quick switch.
* **CompareGrid**: small multiples; linked hover across cards.
* **SettingsDrawer**: units, time format, theme, reduced motion, language, reset.
* **Toasts, Skeletons, ErrorBoundary, EmptyState**.

## Component Organization

### Weather Components
- `CurrentConditionsCard`: Main weather display with icon, temperature, location
- `MetricsGrid`: Grid of weather metrics (wind, humidity, pressure, UV, etc.)
- `DailyStrip`: 7-day forecast chips with navigation
- `HourlyPanel`: Detailed hourly view with charts and lists
- `SunCycle`: Sunrise/sunset visualization with progress arc

### Navigation Components
- `TopBar`: Main navigation with search, units, theme, favorites
- `LocationSearch`: Advanced search with autocomplete and voice input
- `FavoritesDrawer`: Manage favorite locations
- `SettingsDrawer`: App settings and preferences

### Utility Components
- `RiveHero`: Animated weather hero section
- `CompareGrid`: Multi-location comparison view
- `ErrorBoundary`: Error handling and fallback UI
- `Skeletons`: Loading states
- `Toasts`: Notifications and feedback

## Theming System

### CSS Variables (OKLCH Color Space)
* `--bg`: Background color
* `--fg`: Foreground/text color
* `--card`: Card background
* `--muted`: Muted text/background
* `--ring`: Focus ring color
* `--accent`: Accent color
* `--accent-fg`: Accent foreground
* `--grad-from`: Gradient start
* `--grad-to`: Gradient end
* `--glow`: Glow effect color
* `--chart-line`: Chart line color

### Theme Modes
* **System**: Follows OS preference
* **Light**: Light theme
* **Dark**: Dark theme
* **Auto-time**: Switches at sunrise/sunset for selected location

### Theme Provider
* Exposes `themeMode` and applies theme changes
* **Condition theme**: Dynamic theme based on weather conditions (clear/cloudy/rain/snow)
* **Reduced motion**: Respects `prefers-reduced-motion` and app setting; stops Rive animations

## Design System Integration

### shadcn/ui Components
- Command palette for search
- Dropdown menus for units and settings
- Drawer components for favorites and settings
- Toast notifications
- Skeleton loading states

### Custom Styling
- Tailwind utilities for rapid styling
- Custom CSS variables for consistent theming
- Responsive design patterns
- Animation and transition utilities

## Component Patterns

### Data Flow
1. Components receive data via props or hooks
2. State management through Zustand store
3. API data via TanStack Query
4. Local state for UI interactions

### Error Handling
- Error boundaries for component-level error catching
- Loading states with skeletons
- Empty states for no data
- Retry mechanisms for failed operations

### Accessibility
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management
