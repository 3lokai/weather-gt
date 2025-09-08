# Routing & Layout

## Route Structure

### Main Routes
* `/` - Home page (search, hero, metrics, daily rail, hourly panel)
* `/compare` - Compare grid (2–4 locations)
* `/offline` - Offline page (PWA fallback)

### Route Organization
- File-system routing via Next.js App Router
- Nested layouts for shared UI elements
- Dynamic segments for location-based routing (future)

## Layout Architecture

### Root Layout
- **TopBar**: Search/Voice, Units, Theme, Favorites
- **SEO**: `<metadata>` tags for search optimization
- **Global styles**: CSS variables and theme application
- **Providers**: Query client, theme provider, error boundaries

### Page Layouts
- **Home Layout**: Hero section, metrics grid, daily strip, hourly panel
- **Compare Layout**: Grid-based comparison view
- **Offline Layout**: Minimal offline experience

## Navigation Structure

### TopBar Components
- **LocationSearch**: Primary search interface with autocomplete
- **UnitsDropdown**: Temperature, wind, pressure unit selection
- **ThemeToggle**: Theme mode switching
- **FavoritesButton**: Quick access to favorite locations

### Navigation Patterns
- **Breadcrumbs**: Location context and navigation
- **Tab Navigation**: Day selection in daily strip
- **Drawer Navigation**: Favorites and settings panels
- **Modal Navigation**: Compare view and detailed settings

## SEO & Metadata

### Page Metadata
- Dynamic titles based on location and weather conditions
- Open Graph tags for social sharing
- Structured data for weather information
- Canonical URLs for location-based pages

### Performance Optimization
- Static generation for common locations
- Dynamic imports for heavy components
- Image optimization for weather icons
- Font optimization and preloading

## Responsive Design

### Breakpoints
- Mobile-first approach with Tailwind breakpoints
- Tablet and desktop optimizations
- Touch-friendly interactions on mobile
- Keyboard navigation on desktop

### Layout Adaptations
- **Mobile**: Single column, stacked components
- **Tablet**: Two-column layout with sidebar
- **Desktop**: Multi-column grid with expanded panels

## URL State Management

### Query Parameters
- Location coordinates for shareable links
- Selected day index for deep linking
- Unit preferences for consistent experience
- Theme mode for user preference persistence

### History Management
- Browser back/forward support
- State restoration on page refresh
- Deep linking to specific weather conditions
- Shareable URLs for locations and comparisons
