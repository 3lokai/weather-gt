# Technical Architecture

## Data & APIs (Open‑Meteo)

### Geocoding API
* **Endpoint**: `/v1/search?name={q}&count=10&language=en`
* **Response**: `{ name, country, admin1, latitude, longitude, timezone }`

### Forecast API
* **Endpoint**: `/v1/forecast`
* **Parameters**:
  * `current`: `temperature_2m,apparent_temperature,weather_code,wind_speed_10m,wind_gusts_10m,relative_humidity_2m,precipitation,precipitation_probability,surface_pressure,uv_index,visibility,cloud_cover,dew_point_2m`
  * `hourly`: `temperature_2m,precipitation,precipitation_probability,wind_speed_10m,wind_gusts_10m,uv_index,visibility,cloud_cover,dew_point_2m,surface_pressure`
  * `daily`: `weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,uv_index_max,cloud_cover_mean`
  * `temperature_unit={celsius|fahrenheit}`
  * `wind_speed_unit={kmh|mph}`
  * `precipitation_unit=mm`
  * `timezone=auto`

### Air Quality API
* **Endpoint**: `/v1/air-quality`
* **Response**: PM2.5/PM10, O₃, NO₂, SO₂, CO, plus regional AQI indices where available.

### Pollen API
* **Endpoint**: `pollen.open-meteo.com/v1/forecast`
* **Response**: daily/hourly **grass/tree/weed** pollen indices (region dependent).

### Icon/Condition Mapping
Map `weather_code` → descriptive label + icon set + background bucket.

## State & Persistence

### Global Store (Zustand)
```typescript
{
  units: { temp: 'celsius'|'fahrenheit', wind: 'kmh'|'mph', precip: 'mm' },
  selectedLocation?: { id, name, country, admin1, lat, lon, tz },
  selectedDayIndex: number,
  favorites: Location[],
}
```

### Theme Management (next-themes)
```typescript
{
  theme: 'light'|'dark'|'system',
  systemTheme: 'light'|'dark',
  setTheme: (theme: string) => void,
  forcedTheme?: string,
  resolvedTheme: 'light'|'dark'
}
```

### Query Cache (TanStack Query)
* **Key**: `{lat,lon,units,day}`
* **Stale Time**: 10–15 minutes
* **Strategy**: SWR (stale-while-revalidate)

### Persistence
* **localStorage**: units, favorites (via Zustand persist)
* **next-themes**: theme preference persistence  
* **No server-side storage**: local persistence only

## Performance & Reliability

### Request Optimization
* **Debounced search**: 300ms delay
* **Cancel in-flight requests**: prevent race conditions
* **Optimistic UI**: immediate feedback with skeletons

### Code Splitting
* **Charts/Compare**: lazy-loaded components
* **Rive hero**: lazy-loaded animations
* **Route-based**: automatic code splitting

### Error Handling
* **Error boundaries**: graceful degradation
* **Retriable fetches**: automatic retry with backoff
* **Cached fallbacks**: last good response during outages

## API Utilities (TypeScript Shapes)

### Core Functions
```typescript
geocode(q: string): Promise<Location[]>
getForecast({lat,lon,units}): Promise<{ current, hourly, daily, isDay }>
```

### Derived Helpers
```typescript
getWmoGroup(code: number): string
getIconKey(code: number, isDay: boolean): IconKey
// Removed getThemeFor - themes now managed by next-themes
```

## Routes & Layout

### Page Structure
* `/` - Home (search, hero, metrics, daily, hourly)
* `/compare` - Compare grid
* `/offline` - Offline page (PWA)

### Shared Layout
* **TopBar**: search/voice, units, theme, favorites
* **Responsive**: mobile-first, tablet/desktop enhancements

## Analytics & Telemetry

### Events to Track
* Page views
* Search events
* Geolocation success/deny
* Favorites add/remove
* Compare usage
* Install prompt accepted/dismissed

### Implementation
* **Client-side**: lightweight event tracking
* **Privacy-focused**: no personal data collection
* **Performance**: non-blocking analytics
