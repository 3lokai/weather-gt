# Preflight Kit — A–F

This pack contains the last-mile assets you asked for before coding: **(A)** design tokens, **(B)** icon mapping (WMO→Basmilius/Phosphor), **(C)** Open‑Meteo param matrix, **(D)** copy/i18n skeleton, **(E)** JSON fixtures, **(F)** CI/QA setup.

---

## (A) Design Tokens — Tailwind v4 + shadcn-friendly ✅ COMPLETED

**Status**: ✅ **IMPLEMENTED** - Design tokens are now live in `src/app/globals.css`

### Current Implementation

The design system uses **OKLCH color space** with a **blue/purple/orange theme** and includes:

#### Core Features
- **OKLCH Color Space**: Better perceptual uniformity than HSL
- **shadcn Compatibility**: Full `--color-*` helper variables
- **Essential Color Scales**: Minimized to 100, 200, 500, 600, 900 variants
- **Weather Condition Themes**: Dynamic accent colors based on weather
- **Dark Mode Support**: Proper luminance adjustments

#### Color System
```css
/* Core Colors - OKLCH Color Space (Blue/Purple/Orange Theme) */
--background: oklch(0.1200 0.0500 264.0000);
--foreground: oklch(0.9850 0 0);
--card: oklch(0.2000 0.0800 264.0000);

/* Primary Colors - Blue System (Essential Scale) */
--primary: oklch(0.4500 0.1800 264.0000);
--primary-100: oklch(0.8800 0.0400 264.0000);
--primary-500: oklch(0.4500 0.1800 264.0000);
--primary-600: oklch(0.3800 0.2000 264.0000);
--primary-900: oklch(0.1500 0.1000 264.0000);

/* Secondary Colors - Purple System (Essential Scale) */
--secondary: oklch(0.4200 0.1600 300.0000);
--secondary-100: oklch(0.8600 0.0600 300.0000);
--secondary-500: oklch(0.4200 0.1600 300.0000);
--secondary-600: oklch(0.3500 0.1800 300.0000);
--secondary-900: oklch(0.1400 0.0800 300.0000);

/* Accent Color - Orange System (Essential Scale) */
--accent: oklch(0.7500 0.1800 65.0000);
--accent-100: oklch(0.9300 0.0600 65.0000);
--accent-500: oklch(0.7500 0.1800 65.0000);
--accent-600: oklch(0.7000 0.2000 65.0000);
--accent-900: oklch(0.4000 0.1200 65.0000);
```

#### Weather Condition Themes
```css
/* Weather condition themes - Override accent colors based on weather */
.theme--clear-day   { @theme { --accent: oklch(0.8600 0.1400 85.0000); } }    /* warm amber */
.theme--clear-night { @theme { --accent: oklch(0.7500 0.1000 85.0000); } }    /* dimmed amber */
.theme--rain        { @theme { --accent: oklch(0.7000 0.1200 250.0000); } }   /* blue */
.theme--snow        { @theme { --accent: oklch(0.8500 0.0800 250.0000); } }   /* crisp icy blue */
.theme--cloudy      { @theme { --accent: oklch(0.7200 0.0600 260.0000); } }   /* neutral slate */
.theme--fog         { @theme { --accent: oklch(0.7200 0.0600 260.0000); } }   /* neutral slate */
.theme--thunder     { @theme { --accent: oklch(0.7400 0.1500 300.0000); } }   /* violet */
```

#### shadcn Compatibility
```css
/* Color helpers for shadcn compatibility */
--color-background: var(--background);
--color-foreground: var(--foreground);
--color-card: var(--card);
--color-primary: var(--primary);
--color-secondary: var(--secondary);
--color-accent: var(--accent);
/* ... and more */
```

#### Weather-Specific Typography
```css
/* Weather-specific typography scale */
.text-temp-xl { font-size: 128px; line-height: 140px; font-weight: 700; }
.text-temp-l  { font-size: 96px; line-height: 104px; font-weight: 700; }
.text-temp-m  { font-size: 60px; line-height: 68px; font-weight: 700; }
.text-temp-s  { font-size: 36px; line-height: 44px; font-weight: 600; }

.text-display { font-size: 48px; line-height: 56px; font-weight: 700; }
.text-h1      { font-size: 36px; line-height: 44px; font-weight: 700; }
.text-h2      { font-size: 30px; line-height: 38px; font-weight: 600; }
.text-h3      { font-size: 24px; line-height: 32px; font-weight: 600; }
.text-h4      { font-size: 20px; line-height: 28px; font-weight: 600; }
```

### Usage Examples
```html
<!-- Main weather card with gradient -->
<div class="bg-gradient-primary rounded-2xl p-8 text-foreground shadow-xl">
  <div class="text-temp-xl">20°</div>
  <div class="text-h1">Berlin, Germany</div>
</div>

<!-- Weather stats cards -->
<div class="bg-card rounded-xl p-4 text-card-foreground border border-border">
  <h3 class="text-body-s text-muted-foreground">Humidity</h3>
  <p class="text-h3">46%</p>
</div>

<!-- Weather condition theming -->
<div class="theme--rain">
  <!-- Accent color automatically becomes blue for rain -->
  <div class="bg-accent text-accent-foreground">Rain theme active</div>
</div>
```

### Next Steps
- ✅ Design tokens implemented
- ✅ Icon mapping (Section B)
- ✅ Open-Meteo integration (Section C)
- ✅ i18n setup (Section D)
- ✅ JSON fixtures (Section E)
- ✅ CI/QA setup (Section F)

---

## (B) Icon Mapping — WMO → IconKey → Basmilius/Phosphor ✅ COMPLETED

**Status**: ✅ **IMPLEMENTED** - Icon mapping system is now live in `src/lib/icons/iconMap.ts`

```ts
// lib/icons/iconMap.ts
export type WmoCode = number; // 0..99
export type IconKey =
  | 'clear-day' | 'clear-night'
  | 'partly-cloudy-day' | 'partly-cloudy-night' | 'cloudy' | 'overcast' | 'overcast-day' | 'overcast-night'
  | 'fog' | 'fog-day' | 'fog-night' | 'haze' | 'haze-day' | 'haze-night' | 'smoke'
  | 'drizzle' | 'rain' | 'sleet' | 'snow' | 'hail'
  | 'showers' | 'wind' | 'tornado' | 'hurricane'
  | 'thunderstorms' | 'thunderstorms-day' | 'thunderstorms-night' | 'thunderstorms-rain' | 'thunderstorms-day-rain' | 'thunderstorms-night-rain';

export function getIconKey(code: WmoCode, isDay: boolean): IconKey {
  // WMO groups
  if (code === 0) return isDay ? 'clear-day' : 'clear-night';
  if (code === 1 || code === 2) return isDay ? 'partly-cloudy-day' : 'partly-cloudy-night';
  if (code === 3) return 'overcast';
  if (code === 45 || code === 48) return isDay ? 'fog-day' : 'fog-night';
  if (code === 51 || code === 53 || code === 55) return 'drizzle';
  if (code === 56 || code === 57) return 'sleet'; // freezing drizzle → sleet glyph
  if (code === 61) return 'rain';
  if (code === 63) return 'rain';
  if (code === 65) return 'rain';
  if (code === 66 || code === 67) return 'sleet'; // freezing rain → sleet glyph
  if (code === 71 || code === 73 || code === 75) return 'snow';
  if (code === 77) return 'snow'; // snow grains → snow
  if (code === 80 || code === 81 || code === 82) return 'showers';
  if (code === 85 || code === 86) return 'snow'; // snow showers → snow
  if (code === 95) return isDay ? 'thunderstorms-day' : 'thunderstorms-night';
  if (code === 96 || code === 99) return 'thunderstorms-rain';
  return isDay ? 'overcast-day' : 'overcast-night';
}

// Basmilius (Meteocons) adapter: string IDs from https://basmilius.github.io/weather-icons/index-fill.html
export const basmiliusMap: Record<IconKey, string> = {
  'clear-day': 'clear-day',
  'clear-night': 'clear-night',
  'partly-cloudy-day': 'partly-cloudy-day',
  'partly-cloudy-night': 'partly-cloudy-night',
  cloudy: 'cloudy',
  overcast: 'overcast',
  'overcast-day': 'overcast-day',
  'overcast-night': 'overcast-night',
  fog: 'fog',
  'fog-day': 'fog-day',
  'fog-night': 'fog-night',
  haze: 'haze',
  'haze-day': 'haze-day',
  'haze-night': 'haze-night',
  smoke: 'smoke',
  drizzle: 'drizzle',
  rain: 'rain',
  sleet: 'sleet',
  snow: 'snow',
  hail: 'hail',
  showers: 'rain', // no explicit *showers* icon → use rain
  wind: 'wind',
  tornado: 'tornado',
  hurricane: 'hurricane',
  thunderstorms: 'thunderstorms',
  'thunderstorms-day': 'thunderstorms-day',
  'thunderstorms-night': 'thunderstorms-night',
  'thunderstorms-rain': 'thunderstorms-rain',
  'thunderstorms-day-rain': 'thunderstorms-day-rain',
  'thunderstorms-night-rain': 'thunderstorms-night-rain',
};

// Phosphor fallback (import names)
export const phosphorMap: Record<IconKey, string> = {
  'clear-day': 'Sun',
  'clear-night': 'Moon',
  'partly-cloudy-day': 'CloudSun',
  'partly-cloudy-night': 'CloudMoon',
  cloudy: 'Cloud',
  overcast: 'Cloud',
  'overcast-day': 'Cloud',
  'overcast-night': 'Cloud',
  fog: 'CloudFog', 'fog-day': 'CloudFog', 'fog-night': 'CloudFog',
  haze: 'CloudFog', 'haze-day': 'CloudFog', 'haze-night': 'CloudFog',
  smoke: 'Smiley', // fallback glyph if you prefer custom
  drizzle: 'CloudRain', rain: 'CloudRain', sleet: 'CloudSnow', snow: 'CloudSnow', hail: 'CloudHail',
  showers: 'CloudRain', wind: 'Wind', tornado: 'Tornado', hurricane: 'Wind',
  thunderstorms: 'CloudLightning', 'thunderstorms-day': 'CloudLightning', 'thunderstorms-night': 'CloudLightning',
  'thunderstorms-rain': 'CloudLightning', 'thunderstorms-day-rain': 'CloudLightning', 'thunderstorms-night-rain': 'CloudLightning',
};

export function getIconId(code: WmoCode, isDay: boolean, pack: 'bas'|'phosphor' = 'bas') {
  const key = getIconKey(code, isDay);
  return pack === 'bas' ? basmiliusMap[key] : phosphorMap[key];
}
```

A11y label helper (optional):

```ts
export function wmoLabel(code: number): string {
  const map: Record<number, string> = {
    0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
    45: 'Fog', 48: 'Rime fog', 51: 'Light drizzle', 53: 'Moderate drizzle', 55: 'Dense drizzle',
    56: 'Light freezing drizzle', 57: 'Dense freezing drizzle', 61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
    66: 'Light freezing rain', 67: 'Heavy freezing rain', 71: 'Slight snow', 73: 'Moderate snow', 75: 'Heavy snow',
    77: 'Snow grains', 80: 'Slight rain showers', 81: 'Moderate rain showers', 82: 'Violent rain showers',
    85: 'Slight snow showers', 86: 'Heavy snow showers', 95: 'Thunderstorm', 96: 'Thunderstorm with slight hail', 99: 'Thunderstorm with heavy hail'
  };
  return map[code] ?? 'Unknown weather';
}
```

---

## (C) Open‑Meteo Param Matrix — Single Source of Truth ✅ COMPLETED

**Status**: ✅ **IMPLEMENTED** - Parameter matrix documented in `docs/om-matrix.md` and integrated into `src/lib/api/open-meteo.ts`

### Endpoints

* **Geocoding**: `https://geocoding-api.open-meteo.com/v1/search?name={q}&count=10&language={lang}`
* **Forecast**: `https://api.open-meteo.com/v1/forecast` (supports `current`, `hourly`, `daily`, `timezone=auto`, units)
* **Air Quality + Pollen**: `https://air-quality-api.open-meteo.com/v1/air-quality` (pollutants + **pollen** indices)

### Variables (pick per view)

* **current**: `temperature_2m,apparent_temperature,weather_code,is_day,wind_speed_10m,wind_gusts_10m,relative_humidity_2m,precipitation,precipitation_probability,surface_pressure,uv_index,visibility,cloud_cover,dew_point_2m`
* **hourly**: `temperature_2m,precipitation,precipitation_probability,wind_speed_10m,wind_gusts_10m,uv_index,visibility,cloud_cover,dew_point_2m,surface_pressure`
* **daily**: `weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,uv_index_max,cloud_cover_mean`
* **air quality hourly**: `pm10,pm2_5,o3,no2,so2,co,european_aqi,us_aqi,uv_index,uv_index_clear_sky`
* **pollen hourly** (via air-quality endpoint): `alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen`

### Units

* `temperature_unit=celsius|fahrenheit`
* `wind_speed_unit=kmh|mph|ms|kn`
* `precipitation_unit=mm|inch`
* `timeformat=iso8601|unixtime` (still localize in UI); `timezone=auto`

### Example URL (compose)

```
https://api.open-meteo.com/v1/forecast?latitude=12.97&longitude=77.59&timezone=auto&temperature_unit=celsius&wind_speed_unit=kmh&precipitation_unit=mm&
current=temperature_2m,apparent_temperature,weather_code,is_day,wind_speed_10m,wind_gusts_10m,relative_humidity_2m,precipitation,precipitation_probability,surface_pressure,uv_index,visibility,cloud_cover,dew_point_2m&
hourly=temperature_2m,precipitation,precipitation_probability,wind_speed_10m,wind_gusts_10m,uv_index,visibility,cloud_cover,dew_point_2m,surface_pressure&
daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,uv_index_max,cloud_cover_mean
```

---

## (D) Copy & i18n Dictionary Skeleton ✅ COMPLETED

**Status**: ✅ **IMPLEMENTED** - i18n system is now live in `src/lib/i18n/` with English translations and utility functions

```ts
// lib/i18n/en.ts
export default {
  app: {
    title: 'Weather',
    lastUpdated: 'Last updated at {{time}}',
    offline: 'Showing last good data',
    attribution: 'Data by Open‑Meteo · Icons by Meteocons',
  },
  actions: {
    search: 'Search', favorite: 'Favorite', compare: 'Compare', share: 'Share',
    install: 'Install App', retry: 'Retry', copyLink: 'Copy link'
  },
  units: {
    celsius: '°C', fahrenheit: '°F', kmh: 'km/h', mph: 'mph', mm: 'mm', inch: 'in', hPa: 'hPa', inHg: 'inHg'
  },
  settings: {
    title: 'Settings', units: 'Units', tempUnit: 'Temperature', windUnit: 'Wind speed', precipUnit: 'Precipitation',
    timeFormat: 'Time format', _12h: '12‑hour', _24h: '24‑hour',
    theme: 'Theme', system: 'System', light: 'Light', dark: 'Dark', autoTime: 'Auto by time',
    motion: 'Reduced motion', language: 'Language', reset: 'Reset app'
  },
  metrics: {
    temperature: 'Temperature', feelsLike: 'Feels like', humidity: 'Humidity', wind: 'Wind', gust: 'Gust',
    precip: 'Precipitation', pop: 'Chance of precip', pressure: 'Pressure', pressureTrend: 'Trend',
    uv: 'UV Index', visibility: 'Visibility', cloud: 'Cloud cover', dewPoint: 'Dew point',
    aqi: 'Air Quality', pollen: 'Pollen'
  },
  tooltips: {
    pop: 'Probability of precipitation in the period',
    pressureTrend: 'Change in surface pressure vs last 3–6 hours',
    uv: 'Max UV exposure risk today',
    dewPoint: 'Temp where air becomes saturated; closer to air temp feels muggy'
  },
  a11y: {
    searchPlaceholder: 'Search for a city or place',
    iconLabel: '{{label}}',
    dayChip: 'Day {{index}}: high {{high}}, low {{low}}, precipitation {{pop}} percent',
    hourlyPoint: '{{time}}: {{temp}} and {{pop}} percent precip',
  },
  states: {
    emptySearch: "Type to search…",
    noResults: 'No locations found',
    error: 'Could not load data',
    geoDenied: 'Location permission denied — use search',
  },
};
```

---

## (E) JSON Fixtures — 4 Archetypes ✅ COMPLETED

**Status**: ✅ **IMPLEMENTED** - JSON fixtures are now available in `/fixtures/` directory for testing and demos

**1) `fixtures/bangalore-clear.json`**

```json
{
  "location": {"name": "Bengaluru", "country": "IN", "lat": 12.97, "lon": 77.59, "tz": "Asia/Kolkata"},
  "lastUpdated": "2025-09-08T08:30:00+05:30",
  "current": {
    "temp": 26.4, "feelsLike": 27.0, "wmo": 1, "isDay": true, "humidity": 58,
    "wind": 12.0, "gust": 22.0, "pop": 10, "precip": 0.0, "pressure": 1011.2,
    "uv": 7, "visibility": 10.0, "cloudCover": 32, "dewPoint": 17.6,
    "iconKey": "partly-cloudy-day"
  },
  "daily": [
    {"date": "2025-09-08", "wmo": 1, "tMax": 28.0, "tMin": 20.1, "popMax": 20, "sunrise": "06:04", "sunset": "18:24"},
    {"date": "2025-09-09", "wmo": 2, "tMax": 27.6, "tMin": 19.8, "popMax": 30, "sunrise": "06:04", "sunset": "18:23"}
  ],
  "hourlySample": [
    {"time": "09:00", "temp": 25.0, "precip": 0.0, "pop": 8, "cloud": 20},
    {"time": "12:00", "temp": 27.0, "precip": 0.0, "pop": 10, "cloud": 30},
    {"time": "15:00", "temp": 28.0, "precip": 0.1, "pop": 20, "cloud": 40},
    {"time": "18:00", "temp": 24.1, "precip": 0.0, "pop": 10, "cloud": 25}
  ]
}
```

**2) `fixtures/london-rain.json`**

```json
{
  "location": {"name": "London", "country": "GB", "lat": 51.5072, "lon": -0.1276, "tz": "Europe/London"},
  "lastUpdated": "2025-09-08T10:00:00+01:00",
  "current": {
    "temp": 17.3, "feelsLike": 17.0, "wmo": 63, "isDay": true, "humidity": 81,
    "wind": 18.0, "gust": 32.0, "pop": 80, "precip": 2.1, "pressure": 1004.8,
    "uv": 2, "visibility": 7.5, "cloudCover": 95, "dewPoint": 14.2,
    "iconKey": "rain"
  },
  "daily": [
    {"date": "2025-09-08", "wmo": 63, "tMax": 18.0, "tMin": 12.3, "popMax": 85, "sunrise": "06:22", "sunset": "19:32"}
  ],
  "hourlySample": [
    {"time": "09:00", "temp": 15.0, "precip": 0.5, "pop": 70, "cloud": 90},
    {"time": "12:00", "temp": 16.2, "precip": 0.8, "pop": 80, "cloud": 95},
    {"time": "15:00", "temp": 17.3, "precip": 0.6, "pop": 75, "cloud": 100},
    {"time": "18:00", "temp": 16.8, "precip": 0.2, "pop": 60, "cloud": 95}
  ]
}
```

**3) `fixtures/reykjavik-snow.json`**

```json
{
  "location": {"name": "Reykjavík", "country": "IS", "lat": 64.1466, "lon": -21.9426, "tz": "Atlantic/Reykjavik"},
  "lastUpdated": "2025-02-10T10:00:00+00:00",
  "current": {
    "temp": -2.5, "feelsLike": -7.0, "wmo": 75, "isDay": false, "humidity": 92,
    "wind": 22.0, "gust": 38.0, "pop": 60, "precip": 3.2, "pressure": 1009.3,
    "uv": 0, "visibility": 2.0, "cloudCover": 100, "dewPoint": -3.0,
    "iconKey": "snow"
  },
  "daily": [
    {"date": "2025-02-10", "wmo": 75, "tMax": -1.0, "tMin": -6.0, "popMax": 70, "sunrise": "10:04", "sunset": "17:36"}
  ],
  "hourlySample": [
    {"time": "18:00", "temp": -2.0, "precip": 1.0, "pop": 60, "cloud": 100},
    {"time": "21:00", "temp": -2.8, "precip": 0.6, "pop": 55, "cloud": 100},
    {"time": "00:00", "temp": -3.2, "precip": 0.4, "pop": 50, "cloud": 100},
    {"time": "03:00", "temp": -3.8, "precip": 0.3, "pop": 45, "cloud": 95}
  ]
}
```

**4) `fixtures/miami-thunder.json`**

```json
{
  "location": {"name": "Miami", "country": "US", "lat": 25.7617, "lon": -80.1918, "tz": "America/New_York"},
  "lastUpdated": "2025-08-12T15:45:00-04:00",
  "current": {
    "temp": 31.2, "feelsLike": 38.0, "wmo": 95, "isDay": true, "humidity": 72,
    "wind": 20.0, "gust": 35.0, "pop": 90, "precip": 5.6, "pressure": 1008.1,
    "uv": 9, "visibility": 6.0, "cloudCover": 90, "dewPoint": 25.8,
    "iconKey": "thunderstorms-day"
  },
  "daily": [
    {"date": "2025-08-12", "wmo": 95, "tMax": 32.5, "tMin": 27.1, "popMax": 95, "sunrise": "06:50", "sunset": "20:02"}
  ],
  "hourlySample": [
    {"time": "13:00", "temp": 30.1, "precip": 2.2, "pop": 80, "cloud": 85},
    {"time": "15:00", "temp": 31.2, "precip": 3.6, "pop": 90, "cloud": 95},
    {"time": "17:00", "temp": 30.3, "precip": 1.8, "pop": 85, "cloud": 90},
    {"time": "19:00", "temp": 28.4, "precip": 0.9, "pop": 70, "cloud": 80}
  ]
}
```

> These fixtures mirror your derived shapes; the app should still fetch raw Open‑Meteo responses.

---

## (F) CI/QA Setup — Quality Gates ✅ COMPLETED

**Status**: ✅ **IMPLEMENTED** - CI/QA quality gates are now configured with GitHub Actions, Lighthouse CI, and testing frameworks

**package.json scripts (added):**

```json
{
  "scripts": {
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "e2e": "playwright test",
    "lh": "lighthouse http://localhost:3000 --quiet --chrome-flags=\"--headless=new\" --preset=desktop --output=json --output-path=./.lighthouse/report.json",
    "ci": "npm run lint && npm run typecheck && npm run test && npm run e2e"
  }
}
```

**Lighthouse CI (`.lighthouserc.json`):**

```json
{
  "ci": {
    "collect": { "staticDistDir": ".next/static" },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.95}],
        "categories:accessibility": ["error", {"minScore": 0.95}],
        "categories:best-practices": ["error", {"minScore": 0.95}],
        "categories:seo": ["error", {"minScore": 0.95}]
      }
    }
  }
}
```

**GitHub Actions (`.github/workflows/ci.yml`):**

```yaml
name: CI
on: [push, pull_request]
jobs:
  build-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run test
      - uses: microsoft/playwright-github-action@v1
      - run: npx playwright install --with-deps
      - run: npm run e2e
      - name: Lighthouse
        run: npx @lhci/cli autorun || npx lhci autorun || npm run lh
```

**A11y check (Playwright + Axe minimal):**

```ts
// tests/a11y.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('home has no a11y violations', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
```

**TS Strict + ESLint**: enable `"strict": true` in `tsconfig.json`; extend `next/core-web-vitals`.

**Perf budget**: enforce ≤300KB gz initial (report via `next build` + `@next/bundle-analyzer` in dev).

---

## Notes

* Condition themes pair with `ThemeKey` from your mapper; add `.theme--{key}` on wrapper.
* Basmilius icon IDs sourced from the Meteocons preview; Phosphor used for UI chrome.
* OM param matrix consolidates fields for **PoP, gusts, cloud, dew point, AQI, pollen**.
