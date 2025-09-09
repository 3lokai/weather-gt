# Product Requirements Document (PRD)

> **Note**: This PRD has been sharded into focused documents for better maintainability. See the individual documents for detailed specifications.

## Document Structure

* **[Product Overview](product-overview.md)** - Summary, goals, users, scope, and milestones
* **[Technical Architecture](technical-architecture.md)** - APIs, state management, performance, and data flow
* **[Design System](design-system.md)** - Theming, icons, visual tokens, and color palettes
* **[Component Specifications](component-specifications.md)** - UI components, props, interactions, and Rive integration
* **[Development Roadmap](development-roadmap.md)** - Epics, stories, timeline, and success metrics
* **[Accessibility & PWA](accessibility-pwa.md)** - A11y requirements, PWA features, and testing

## 1) Summary

A modern, showcase‑quality **Weather Web App** powered by **Open‑Meteo** that highlights front‑end craftsmanship. Built with **Next.js + TypeScript + Tailwind + shadcn/ui + ReactBits patterns**, with optional **Rive** hero animations. Focus: silky interactions, adaptive theming, accessibility, and responsive layouts.

## 2) Goals & Non‑Goals

**Goals**

* Deliver a pixel‑tight, responsive UI demonstrating design systems, component composition, and delightful micro‑interactions.
* Fast, keyless weather data: search, current conditions, 7‑day, and hourly with day selector.
* Advanced extras: geolocation, favorites, compare locations, animated backgrounds, voice search, PWA.
* **Hackathon constraint**: Use **Open‑Meteo APIs only** for all data displayed in the hackathon build.

**Non‑Goals**

* No account system or server‑side user data storage (local persistence only).
* No historical/climatology analytics beyond 7‑day.
* **Out of scope for hackathon** (can be post‑event extensions): third‑party **radar tiles**, **severe weather alerts** feeds outside Open‑Meteo, proprietary minute‑level nowcasts, push notifications.

## 3) Target Users & Use Cases

* **Everyday users** checking current/weekly weather; save frequent places.
* **Travelers** comparing multiple cities at a glance.
* **Tech enthusiasts** who appreciate best‑in‑class UI polish.

## 4) Success Metrics

* **Lighthouse** ≥ 95 (PWA, Performance, Accessibility, Best Practices, SEO).
* **TTI** < 2.5s on mid‑tier mobile; **FCP** < 1.8s.
* **Search→Results**: < 700ms perceived (optimistic UI + skeletons).
* **Install rate** for PWA ≥ 10% of returning users.
* **Retention**: ≥ 2 favorites saved for 30% of users.

## 5) Scope (Functional Requirements)

### 5.1 Core

1. **Search locations** (debounced autosuggest) via Open‑Meteo Geocoding.
2. **Current conditions**: temp, icon (via `weather_code` mapping), location.
3. **Metrics**: feels‑like, humidity, wind, precipitation, pressure, UV, visibility.
4. **7‑day forecast**: daily hi/low, icons.
5. **Hourly view with day selector**: chart + list.
6. **Units**: global Metric/Imperial; explicit toggles for C/F, km/h|mph, mm.
7. **Responsive**: mobile‑first, tablet/desktop enhancements.
8. **Hover/focus states**: visible, accessible.

### 5.2 Enhancements

9. **Geolocation** (first visit) with graceful deny fallback.
10. **Favorites**: add/remove; quick switch; local persistence.
11. **Compare locations**: side‑by‑side grid (2–4 locations).
12. **Sunrise/Sunset**: times + sun‑path progress visualization.
13. **Animated backgrounds**: based on condition + day/night.
14. **Voice search**: Web Speech API; fallback input.
15. **Theming**: light/dark/system modes with smooth transitions and user preference persistence.
16. **PWA**: installable, offline shell, cached assets; SW update flow.

## 6) Information Architecture & Navigation

**Layout by Device:**
* **Desktop**: Hourly forecast sits in a right rail; daily rail and metrics live under the hero card
* **Tablet**: Stacked layout with responsive breakpoints
* **Mobile**: Fully stacked layout with optimized touch targets

**Navigation Structure:**
* **Top bar**: search (with voice), units dropdown, theme toggle, favorites.
* **Hero**: Rounded (≈24px), soft gradient, subtle particle layer (can be Rive or CSS), big temp on the right.
* **Metrics grid**: key stats cards.
* **Daily strip**: 7‑day tiles (selects the day for hourly view).
* **Hourly panel**: tabs per day (or day selector), temperature chart + scrollable list.
* **Favorites drawer**: saved locations + quick actions.
* **Compare page/section**: cards grid; each card = condensed city summary.

## 7) UI/UX Principles

* **Clarity first**: high contrast, legible type, clean hierarchy.
* **Motion with purpose**: subtle transitions (reduced for `prefers-reduced-motion`).
* **Touch-friendly**: large hit targets, swipe where natural.
* **Keyboardable**: full tab order; visible focus; ARIA where needed.

## 7.1) Application States

**Loading States:**
* **Loading skeleton**: Match exact shapes (hero, metrics tiles, daily chips, hourly rows) with subtle grain
* **Skeleton timing**: 300ms delay before showing, 1.2s shimmer cycle

**Error States:**
* **API error**: Centered icon, title "Something went wrong", helper text, Retry button
* **Network error**: Offline indicator with cached data fallback
* **Geolocation denied**: Graceful fallback to search prompt

**Empty States:**
* **No favorites**: Empty state illustration with "Add your first location" CTA
* **No search results**: "No locations found" with search suggestions

## 8) Component Inventory (shadcn/ui + ReactBits mapping)

* **Search (autosuggest)**: `Command` + `Input` + `Popover` (shadcn) with ReactBits debounce, async list, keyboard nav.
* **Units dropdown**: Menu has a top "Switch to Imperial/Metric" action, then grouped options with checkmarks (temp, wind, precip).
* **Theme toggle**: `Toggle` or custom `ModeToggle` (system/light/dark).
* **Current card**: `Card`, `Avatar/Icon`, badges, micro‑transitions on data refresh.
* **Metrics grid**: `Card` xN with iconography; tooltips for definitions.
* **Daily strip**: `Tabs` or `SegmentedControl`‑like pills; `ScrollArea` on mobile.
* **Hourly chart**: `Card` + `Recharts` line chart; pointer hover details.
* **Favorites**: `Sheet/Drawer` + `List` + star toggle; empty‑state.
* **Compare grid**: `Grid` of compact `Card`s + sparklines (Recharts mini).
* **Sun cycle**: custom `Progress` arc/track + sunrise/sunset labels.
* **Voice**: mic `Button` with recording state + permission handling.
* **Toasts**: network errors, added to favorites, SW updated.
* **Skeletons**: ReactBits skeleton loaders for hero, grid, and list.

## 9) Visual System & Theming

**Typography**: Use the provided display scale (96/52/32/28/20/18/16/14) + DM Sans/Bricolage pairing.

**Color Tokens**: Use the Neutral / Orange-500 / Blue-500/700 set as the base; dark uses the navy backdrop. (We already mapped these in Tailwind v4.)

**Color Palettes (Traditional Light/Dark)**

* **Light Theme**: neutral‑50 bg, neutral‑900 text; clean contrast with subtle accent colors.
* **Dark Theme**: neutral‑950 bg, neutral‑50 text; elevated surfaces with soft shadows.
* **System Theme**: Automatically follows user's OS preference.
* **States**: focus ring with high contrast; success/info/warn/error semantic scales.
* **Persistence**: User theme preference saved to localStorage via next-themes.

**Effects**: soft shadows (no harsh elevation), subtle glass morphism effects, smooth theme transitions.

## 10) Data & APIs (Open‑Meteo)

* **Geocoding**: `/v1/search?name={q}&count=10&language=en` → { name, country, admin1, latitude, longitude, timezone }.
* **Forecast**: `/v1/forecast` with params:

  * `current`: `temperature_2m,apparent_temperature,weather_code,wind_speed_10m,wind_gusts_10m,relative_humidity_2m,precipitation,precipitation_probability,surface_pressure,uv_index,visibility,cloud_cover,dew_point_2m`
  * `hourly`: `temperature_2m,precipitation,precipitation_probability,wind_speed_10m,wind_gusts_10m,uv_index,visibility,cloud_cover,dew_point_2m,surface_pressure`
  * `daily`: `weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,uv_index_max,cloud_cover_mean`
  * `temperature_unit={celsius|fahrenheit}`
  * `wind_speed_unit={kmh|mph}`
  * `precipitation_unit=mm`
  * `timezone=auto`
* **Air Quality (OM)**: `/v1/air-quality` → PM2.5/PM10, O₃, NO₂, SO₂, CO, plus regional AQI indices where available.
* **Pollen (OM)**: `pollen.open-meteo.com/v1/forecast` → daily/hourly **grass/tree/weed** pollen indices (region dependent).

**Icon/Condition Mapping**: Map `weather_code` → descriptive label + icon set + background bucket.

## 11) State & Persistence

* **Global store** (Zustand): `{ units, favorites[], selectedLocation, selectedDay }`.
* **Theme management** (next-themes): handles light/dark/system modes with persistence.
* **Query cache** (TanStack Query): keyed by `{lat,lon,units,day}`; `staleTime: 10–15m`.
* **Persistence**: localStorage for units, favorites; next-themes for theme preferences.

## 12) Performance & Reliability

* Debounced search (300ms), cancel in‑flight requests.
* Code‑split charts/compare; lazy-load Rive hero.
* Optimistic UI; skeletons + shimmer.
* Error boundaries with retriable fetches.

## 13) Accessibility

* Keyboard nav for search, tabs, units; visible focus rings.
* ARIA roles for combobox, tabs, dialogs; `aria-busy` on loads.
* Color contrast AA+; reduced animation mode.

## 14) PWA

* `manifest.json`, 512/192 icons, theme colors.
* Service worker (next‑pwa): cache static assets + API (SWR strategy).
* Offline page (`/offline`), update toast when SW activates.

## 15) Analytics & Telemetry

* Page views, search events, geolocation success/deny, favorites add/remove, compare usage, install prompt accepted/dismissed.

## 16) Risks & Mitigations

* **Geolocation denied** → default to last city or prompt search.
* **API outages** → cached last good response + error UI.
* **Voice API unsupported** → hide mic, keep keyboard search.

## 17) Milestones (MVP → Showcase)

**MVP (Week 1–2)**

* Search, current, metrics, 7‑day, hourly, units, responsive, a11y baseline.

**V1 (Week 3–4)**

* Geolocation, favorites, sunrise/sunset, animated backgrounds, dark/light.

**Showcase+ (Week 5)**

* Compare grid, voice search, Rive hero, PWA polish, analytics.

## 18) Acceptance Criteria (DoD)

* Meets all core requirements; passes AXE checks; Lighthouse ≥95 across categories.
* Units toggle updates all views and charts consistently.
* Day selector synchronizes hourly chart + list.
* Favorites persist; compare shows 2–4 cities with consistent layout.
* PWA installable; offline fallback works; SW update toast present.

## 19) Open Questions

* Preferred icon set style (outlined vs filled, animated vs static)?
* Rive hero concept: abstract weather motifs vs literal scenes?
* Compare layout: max 3 or 4 cards on desktop? 2 on tablet?
* Any specific brand hue to weave into palettes?

---

## 20) Icon Strategy & Mapping (Hackathon‑Ready)

**Goal**: Single source of truth so the entire UI (icons, copy, theme, backgrounds) swaps based on Open‑Meteo codes.

### 20.1 Abstraction

* Use an internal **`IconKey` enum**; map WMO codes → `IconKey`.
* Then create **pack adapters**:

  * **Basmilius Weather Icons** (primary)
  * **Phosphor Icons** (fallback for UI chrome + any missing glyph)
* Benefits: pack‑agnostic code, easy swap, consistent a11y labels.

**IconKey (canonical)**

```
clear-day | clear-night | partly-cloudy-day | partly-cloudy-night | overcast |
fog-day | fog-night | drizzle | freezing-drizzle |
rain-light | rain | rain-heavy | freezing-rain |
snow-light | snow | snow-heavy | snow-grains |
showers-light | showers | showers-heavy |
snow-showers-light | snow-showers-heavy |
thunderstorm | thunderstorm-hail | wind
```

### 20.2 WMO Weather Code → IconKey Matrix

(Use day/night variant when `isDay` from API or local time)

| WMO Codes  | Condition                             | IconKey                                     |
| ---------- | ------------------------------------- | ------------------------------------------- |
| 0          | Clear sky                             | `clear-day` / `clear-night`                 |
| 1,2        | Mainly clear / Partly cloudy          | `partly-cloudy-day` / `partly-cloudy-night` |
| 3          | Overcast                              | `overcast`                                  |
| 45, 48     | Fog / Depositing rime fog             | `fog-day` / `fog-night`                     |
| 51, 53, 55 | Drizzle (light/moderate/dense)        | `drizzle`                                   |
| 56, 57     | Freezing drizzle (light/dense)        | `freezing-drizzle`                          |
| 61         | Rain: slight                          | `rain-light`                                |
| 63         | Rain: moderate                        | `rain`                                      |
| 65         | Rain: heavy                           | `rain-heavy`                                |
| 66, 67     | Freezing rain (light/heavy)           | `freezing-rain`                             |
| 71, 73, 75 | Snow (slight/moderate/heavy)          | `snow-light` / `snow` / `snow-heavy`        |
| 77         | Snow grains                           | `snow-grains`                               |
| 80         | Rain showers: slight                  | `showers-light`                             |
| 81         | Rain showers: moderate                | `showers`                                   |
| 82         | Rain showers: violent                 | `showers-heavy`                             |
| 85         | Snow showers: slight                  | `snow-showers-light`                        |
| 86         | Snow showers: heavy                   | `snow-showers-heavy`                        |
| 95         | Thunderstorm (slight/moderate)        | `thunderstorm`                              |
| 96, 99     | Thunderstorm with hail (slight/heavy) | `thunderstorm-hail`                         |

### 20.3 Pack Adapters (examples)

* **Basmilius** (example mapping – adjust to exact icon IDs in the library when integrating):

```
clear-day→"clear-day"; clear-night→"clear-night"; partly-cloudy-day→"partly-cloudy-day"; partly-cloudy-night→"partly-cloudy-night"; overcast→"overcast";
fog-day→"fog-day"; fog-night→"fog-night"; drizzle→"drizzle"; freezing-drizzle→"drizzle-freezing";
rain-light→"rain-light"; rain→"rain"; rain-heavy→"rain-heavy"; freezing-rain→"rain-freezing";
snow-light→"snow-light"; snow→"snow"; snow-heavy→"snow-heavy"; snow-grains→"snow-grains";
showers-light→"showers-light"; showers→"showers"; showers-heavy→"showers-heavy";
snow-showers-light→"snow-showers-light"; snow-showers-heavy→"snow-showers-heavy";
thunderstorm→"thunderstorm"; thunderstorm-hail→"thunderstorm-hail"; wind→"wind";
```

* **Phosphor** (React icons):

```
clear-day→Sun; clear-night→Moon; partly-cloudy-day→CloudSun; partly-cloudy-night→CloudMoon; overcast→Cloud;
fog-day/night→CloudFog; drizzle→CloudRain; freezing-drizzle→CloudSnow (or CloudRain + Snowflake badge);
rain-light→CloudRain; rain→CloudRain; rain-heavy→CloudRain (thicker weight);
freezing-rain→CloudRain + Snowflake; snow-light/snow/snow-heavy→CloudSnow;
showers-*→CloudRain; snow-showers-*→CloudSnow; thunderstorm→CloudLightning; thunderstorm-hail→CloudLightning + CloudHail; wind→Wind;
```

* **A11y labels**: e.g., `"Thunderstorm with hail"` for `thunderstorm-hail`.

### 20.4 Backgrounds & Copy

* Background group = one of: `clear | cloudy | overcast | fog | rain | snow | thunder` (day/night variant).
* Short copy by group: e.g., `clear → "Clear skies"`, `rain-heavy → "Heavy rain"`.

---

## 21) Traditional Theme System (Light/Dark with OKLCH)

**Goal**: Clean, accessible light and dark themes with consistent contrast ratios and smooth transitions.

> **Implementation**: Use next-themes for theme management with CSS custom properties for seamless transitions. All values use OKLCH for perceptual uniformity.

### 21.1 Theme Token Structure

* `--background`, `--foreground`, `--card`, `--card-foreground`
* `--popover`, `--popover-foreground`, `--primary`, `--primary-foreground`
* `--secondary`, `--secondary-foreground`, `--muted`, `--muted-foreground`
* `--accent`, `--accent-foreground`, `--destructive`, `--destructive-foreground`
* `--border`, `--input`, `--ring`

### 21.2 Light Theme Palette

```css
:root {
  --background: oklch(0.98 0.004 106);
  --foreground: oklch(0.15 0.006 106);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.15 0.006 106);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.15 0.006 106);
  --primary: oklch(0.19 0.028 106);
  --primary-foreground: oklch(0.98 0.004 106);
  --secondary: oklch(0.96 0.006 106);
  --secondary-foreground: oklch(0.19 0.028 106);
  --muted: oklch(0.96 0.006 106);
  --muted-foreground: oklch(0.45 0.009 106);
  --accent: oklch(0.96 0.006 106);
  --accent-foreground: oklch(0.19 0.028 106);
  --destructive: oklch(0.55 0.18 27);
  --destructive-foreground: oklch(0.98 0.004 106);
  --border: oklch(0.89 0.005 106);
  --input: oklch(0.89 0.005 106);
  --ring: oklch(0.19 0.028 106);
}
```

### 21.3 Dark Theme Palette

```css
.dark {
  --background: oklch(0.07 0.004 106);
  --foreground: oklch(0.98 0.004 106);
  --card: oklch(0.07 0.004 106);
  --card-foreground: oklch(0.98 0.004 106);
  --popover: oklch(0.07 0.004 106);
  --popover-foreground: oklch(0.98 0.004 106);
  --primary: oklch(0.98 0.004 106);
  --primary-foreground: oklch(0.19 0.028 106);
  --secondary: oklch(0.12 0.006 106);
  --secondary-foreground: oklch(0.98 0.004 106);
  --muted: oklch(0.12 0.006 106);
  --muted-foreground: oklch(0.65 0.009 106);
  --accent: oklch(0.12 0.006 106);
  --accent-foreground: oklch(0.98 0.004 106);
  --destructive: oklch(0.65 0.15 27);
  --destructive-foreground: oklch(0.98 0.004 106);
  --border: oklch(0.12 0.006 106);
  --input: oklch(0.12 0.006 106);
  --ring: oklch(0.82 0.018 106);
}
```

---

## 22) Front‑End Spec Addendum (Components • Props • Rive)

### 22.1 Routes & Layout

* `/` Home (search, hero, metrics, daily, hourly)
* `/compare` Compare grid
* `/offline` Offline page (PWA)
* Shared layout: TopBar (search/voice, units, theme, favorites)

### 22.2 Global Store (Zustand)

```
units: { temp: 'celsius'|'fahrenheit', wind: 'kmh'|'mph', precip: 'mm' },
selectedLocation?: { id, name, country, admin1, lat, lon, tz },
selectedDayIndex: number,
favorites: Location[],
```

### 22.3 Theme Management (next-themes)

```
theme: 'light'|'dark'|'system',
systemTheme: 'light'|'dark',
setTheme: (theme: string) => void,
```

### 22.4 API Utilities (shapes)

* `geocode(q: string): Promise<Location[]>`
* `getForecast({lat,lon,units}): Promise<{ current, hourly, daily, isDay }>`
* Derived helpers: `getWmoGroup(code)`, `getIconKey(code,isDay)`

### 22.5 Components (key props)

* **LocationSearch**: `{ onSelect(Location), onVoice?, recent?: Location[], favorites?: Location[] }`
* **CurrentConditionsCard**: `{ current, location, iconKey }`
* **MetricsGrid**: `{ current }` (calculates chips + tooltips)
* **DailyStrip**: `{ days[], selectedIndex, onSelect(i) }`
* **HourlyPanel**: `{ day, units }` + **linked hover** via context
* **UnitsDropdown**: `{ units, onChange }`
* **ThemeToggle**: next-themes integration with system/light/dark options
* **FavoritesDrawer**: `{ favorites, onRemove, onSelect }`
* **CompareGrid**: `{ locations[], units }`
* **SunCycle**: `{ sunrise, sunset, now }` (computes progress)
* **RiveHero**: `{ inputs: RiveInputs, reducedMotion?: boolean }`

### 22.5 Rive Contract

```
RiveInputs = {
  isDay: boolean,
  condition: 'clear|cloudy|overcast|fog|rain|snow|thunder',
  windNorm: number,      // 0..1 from wind_speed_10m
  uvNorm: number,        // 0..1 from uv_index/max 11
  precipNorm: number,    // 0..1 from rain/snow intensity
  thunder: boolean
}
```

### 22.6 Interaction Timings

* Command palette open/close: **140ms**
* Hover preview to hourly: **120ms** (delay 100ms)
* Number flip on unit change: **180ms**
* Card hover lift/shine: **120ms**
* Background gradient shift: **600ms** (reduced‑motion → 0)
* Toasts: **250ms** in/out, auto‑dismiss **3.5s**

### 22.7 Accessibility

* Combobox ARIA pattern, Tabs ARIA for day selector, `aria-busy` while fetching
* Focus rings always visible; ensure ≥ AA contrast for all tokens
* Reduced motion respected across Rive (pause) + gradients (static)

---

## 23) 30‑Day Hackathon Plan & Epic/Story Map

### 23.1 Epics

* **E1 Core Weather Experience** (search, current, daily, hourly, **PoP**, gusts, cloud cover, dew point, pressure trend, units/time format, AQI & Pollen)
* **E2 Theming & Visual System** (OKLCH tokens, condition themes, backgrounds)
* **E3 Performance & A11y** (skeletons, caching, ARIA, Lighthouse 95+)
* **E4 Personalization** (geolocation, favorites, compare)
* **E5 Delight** (Rive hero, voice search, micro‑interactions)
* **E6 PWA & Analytics** (install, offline, update flow, events)
* **E7 Polish & Demo** (QA, bug bash, demo script, docs)
* **E8 Post‑Hackathon Extensions** (optional later): Radar tiles, third‑party alerts, minute‑nowcast, notifications

### 23.2 Timeline (30 days)

**Week 1 (Days 1‑7)** — Foundations

* Scaffold Next.js + shadcn + ReactBits; set Tailwind + tokens (E2)
* Geocode search (Command palette) + current card + metrics (E1)
* Unit toggles wired end‑to‑end; **add 12/24‑hour time toggle** (E1)

**Week 2 (Days 8‑14)** — Forecast Depth

* 7‑day rail + hourly panel w/ chart + hover‑preview (E1)
* **Add PoP (precipitation\_probability)** everywhere precip appears (E1)
* **Add gusts, cloud cover, dew point, pressure trend** (derive ↑/↓ from recent window) (E1)
* Skeletons + error states + accessibility pass v1 (E3)
* Animated condition backgrounds + day/night (E2)

**Week 3 (Days 15‑21)** — Personalization + Air

* Geolocation on first visit + fallback (E4)
* Favorites drawer + quick switch (E4)
* Compare grid (2–3 locations) + linked hover (E4)
* **AQI panel** (OM Air Quality) + **Pollen panel** (OM Pollen) (E1)

**Week 4 (Days 22‑28)** — Delight & Platform

* Rive hero baseline (clear, rain, thunder) (E5)
* Voice search (press‑and‑hold) (E5)
* PWA (manifest, SW, offline) + analytics events (E6)

**Days 29‑30** — Polish & Demo

* Lighthouse ≥95 across boards; bug bash; finalize demo script (E7)

### 23.3 Story Seeds (ready for *orchestrator → stories*)

**E1 Core**

* S‑E1‑01: Implement geocode search (debounced Command palette) with keyboard nav.
* S‑E1‑02: Current conditions card with icon mapping and a11y labels.
* S‑E1‑03: Metrics grid (feels‑like, humidity, wind, **gusts**, precip, **PoP**, pressure + **trend**, UV, visibility, **cloud cover**, **dew point**).
* S‑E1‑04: 7‑day rail with selectable day chips showing hi/low + PoP.
* S‑E1‑05: Hourly panel with line chart + hover preview; show temp, precip, **PoP**, wind, cloud cover, dew point.
* S‑E1‑06: Units toggle (C/F, km/h|mph, mm→**in** label where Imperial) with number flip.
* S‑E1‑07: **12/24‑hour time** format toggle.
* S‑E1‑08: **AQI panel** using OM Air Quality; show PM2.5/PM10 + regional AQI.
* S‑E1‑09: **Pollen panel** (grass/tree/weed) with severity chips and tooltips.

**E2 Theming**

* S‑E2‑01: Implement OKLCH token system + Tailwind wiring.
* S‑E2‑02: Condition → theme switching with day/night.
* S‑E2‑03: Animated gradient backgrounds per condition.

**E3 Perf/A11y**

* S‑E3‑01: Skeletons matching final layout.
* S‑E3‑02: ARIA roles & focus rings; AXE clean.
* S‑E3‑03: Query caching + SWR; cancel in‑flight requests.

**E4 Personalization**

* S‑E4‑01: Geolocation with deny fallback + UX.
* S‑E4‑02: Favorites drawer with local persistence.
* S‑E4‑03: Compare grid (2–4 locations) + linked hover.

**E5 Delight**

* S‑E5‑01: Rive hero component with inputs contract.
* S‑E5‑02: Voice search with Web Speech API fallback handling.
* S‑E5‑03: Micro‑interactions (number flips, card hover, toasts).

**E6 Platform**

* S‑E6‑01: PWA manifest + SW + offline page; update toast.
* S‑E6‑02: Analytics: search, geolocate, favorites, compare, install.

**E7 Polish**

* S‑E7‑01: Lighthouse & performance hardening.
* S‑E7‑02: Bug bash + demo script & cue card.

**E8 Post‑Hackathon (backlog)**

* S‑E8‑01: Radar/precip map overlay (3rd‑party tiles) — **later extension**.
* S‑E8‑02: Severe weather alerts (NWS/Meteoalarm) — **later extension**.
* S‑E8‑03: Minute‑nowcast (vendor) — **later extension**.
* S‑E8‑04: Push notifications — **later extension**.

### 23.4 Definition of Done (per story)

* a11y: keyboard + visible focus + ARIA; AA contrast
* tests: basic unit (logic) + Cypress happy path where sensible
* perf: no layout shift, cached where applicable
* docs: README section updated; changelog entry

---

## Quick Reference

### Key Technologies
- **Frontend**: Next.js 15 + React 19 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui + ReactBits
- **State**: Zustand + TanStack Query
- **Data**: Open-Meteo APIs only
- **Animations**: Rive (optional)

### Core Features
1. Location search with autocomplete
2. Current conditions with weather icons
3. 7-day forecast with hourly details
4. Units toggle (metric/imperial)
5. Geolocation with fallback
6. Favorites system
7. Location comparison
8. PWA with offline support

### Success Metrics
- Lighthouse ≥ 95 across all categories
- TTI < 2.5s, FCP < 1.8s
- PWA install rate ≥ 10%
- User retention with favorites

### Development Timeline
- **Week 1-2**: MVP (core features)
- **Week 3-4**: V1 (personalization, theming)
- **Week 5**: Showcase+ (delight features, PWA)

For detailed specifications, refer to the individual documents listed above.
