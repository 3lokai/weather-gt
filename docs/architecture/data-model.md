# Data Model & API Layer

## Data Model (Key Types)

### Core Entities

* `Location { id, name, country, admin1?, lat, lon, tz }`
* `Units { temp: 'celsius'|'fahrenheit'; wind: 'kmh'|'mph'; precip: 'mm'; pressure: 'hPa'|'inHg'; time: '12h'|'24h' }`
* `Current { temp, feelsLike, code, isDay, humidity, wind, gust, precip, pop, pressure, pressureTrend, uv, visibility, cloudCover, dewPoint }`
* `Daily[] { date, code, tMax, tMin, precipSum, popMax, sunrise, sunset, windMax, uvMax, cloudMean }`
* `Hourly[] { time, temp, precip, pop, wind, gust, uv, visibility, cloud, dewPoint, pressure }`
* `Air { pm25, pm10, o3, no2, so2, co, aqiRegional? }`
* `Pollen { grass, tree, weed }`
* `IconKey` enum (canonical) & `ThemeKey` (clear/cloudy/overcast/fog/rain/snow/thunder + day/night)

## API Layer

### HTTP Client
* `lib/api/http.ts` – `fetchJson(url, { signal })` with AbortController, timeout, safe errors.

### Open-Meteo API Builders
* `lib/api/openMeteo.ts` – builders:
  * `geocode(q, lang) → Location[]`
  * `forecast({ lat, lon, units, tz }) → { current, daily, hourly, isDay }`
  * `airQuality({ lat, lon }) → Air`
  * `pollen({ lat, lon }) → Pollen`

### Data Mappers
* `lib/api/mappers.ts` – WMO code → `IconKey`, `ThemeKey`; derive `pressureTrend` (3–6h Δ), `isDay` (from API or sunrise/sunset), unify units/labels.

### Query Management
* **Query keys**: `['geo', q]`, `['forecast', lat, lon, units]`, `['aq', lat, lon]`, `['pollen', lat, lon]`.
* **Caching**: `staleTime: 10–15m`, `gcTime: 1h`; background refetch on window focus.

## Data Flow

1. **Geocoding**: User search → Open-Meteo geocoding API → Location objects
2. **Weather Data**: Location coordinates → Parallel API calls for forecast, air quality, pollen
3. **Data Transformation**: Raw API responses → Mapped to internal types with derived fields
4. **Caching**: TanStack Query manages caching with stale-while-revalidate strategy
5. **State Management**: Processed data flows into Zustand store for UI consumption

## External API Endpoints

- **Geocoding**: `/v1/search` - Location search and autocomplete
- **Weather Forecast**: `/v1/forecast` - Current, hourly, and daily weather data
- **Air Quality**: `/v1/air-quality` - AQI gases and particulates
- **Pollen**: `pollen.open-meteo.com/v1/forecast` - Pollen indices for allergies

## Data Validation & Error Handling

- Zod schemas for runtime type validation
- Unified error types for network, rate limiting, parsing, and empty responses
- Graceful fallbacks for missing or invalid data
- Retry mechanisms with exponential backoff
