# Backlog & Stories — Open‑Meteo Weather App (30‑Day Hackathon)

**Conventions**

* IDs: `E{Epic}-{StoryNumber}` (e.g., `E1-01`).
* Priority: **P0** (must for demo), **P1** (strongly desired), **P2** (nice‑to‑have).
* Dependencies: other story IDs or external constraints.
* All stories inherit global DoD: a11y (keyboard + visible focus + ARIA), no layout shift, tests for logic/critical flows, docs updated.

---

## Epic E1 — Core Weather Experience

### E1-01 (P0) Geocode Search (Command Palette)

**Desc**: Debounced autosuggest using Open‑Meteo Geocoding; keyboard‑first.
**Acceptance**

* Query after 300ms debounce; cancel in‑flight requests.
* Results show `name, admin1, country` with keyboard navigation (↑/↓/Enter) and mouse.
* `Cmd/Ctrl+K` opens, `Esc` closes, focus trapped.
* Selecting result sets `selectedLocation` and prefetches forecast.
  **Deps**: —

### E1-02 (P0) Current Conditions Card

**Desc**: Big temp, condition, location; icon via WMO→IconKey map.
**Acceptance**

* Displays `temperature_2m`, `apparent_temperature`, `weather_code` label, location.
* Icon changes with day/night.
* A11y label describes condition (e.g., "Light rain").
  **Deps**: E2-02 (icon map types) optional but recommended.

### E1-03 (P0) Metrics Grid v1

**Desc**: Feels‑like, humidity, wind speed, precip, pressure.
**Acceptance**

* Shows: `apparent_temperature`, `relative_humidity_2m`, `wind_speed_10m`, `precipitation`, `surface_pressure`.
* Unit labels reflect global units.
* Tooltips explain metrics.
  **Deps**: E6-02 (analytics) optional.

### E1-04 (P0) 7‑Day Forecast Rail

**Desc**: Selectable daily chips with hi/low, icon, PoP.
**Acceptance**

* Uses `daily.temperature_2m_max/min`, `weather_code`, `precipitation_probability_max`.
* Selecting day updates Hourly Panel.
  **Deps**: E1-05.

### E1-05 (P0) Hourly Panel + Chart

**Desc**: Hourly temperature line + precip bars and list view for selected day.
**Acceptance**

* Uses `hourly.temperature_2m`, `precipitation`, `precipitation_probability`.
* Hover shows tooltip (temp, PoP, precip); keyboard focusable points.
* Comfort bands (cold/pleasant/hot) indicated in background.
  **Deps**: E1-04.

### E1-06 (P0) Units & Time Format

**Desc**: Global toggles: C/F, km/h|mph, mm (display “in”), hPa|inHg, 12/24‑h.
**Acceptance**

* Forecast refetches when units/time change; number flip animation ≤180ms.
* Labels update across all views (cards, chart axes, tooltips).
  **Deps**: —

### E1-07 (P1) Metrics Grid v2 (Gusts, Cloud, Dew, Pressure Trend)

**Desc**: Add `wind_gusts_10m`, `cloud_cover`, `dew_point_2m`, trend arrow for pressure.
**Acceptance**

* Gusts visible when ≥ wind + 5 units; trend computed over last 3–6h (↑/→/↓).
* Cloud cover shown as % chip; Dew point in °.
  **Deps**: E1-03.

### E1-08 (P1) Precipitation Probability Everywhere

**Desc**: Add PoP to current badge, daily chips, hourly tooltip.
**Acceptance**

* PoP shown as %; when missing regionally, UI gracefully hides.
  **Deps**: E1-05.

### E1-09 (P1) Air Quality Panel (Open‑Meteo)

**Desc**: Show PM2.5, PM10, O₃, NO₂, SO₂, CO; regional AQI if available.
**Acceptance**

* Severity chips (Good/Moderate/Unhealthy…); tooltip explains metric.
* A11y labels for screen readers.
  **Deps**: —

### E1-10 (P1) Pollen Panel (Open‑Meteo)

**Desc**: Grass/Tree/Weed indices with severity chips.
**Acceptance**

* Handles region‑unsupported cases with empty states.
  **Deps**: —

---

## Epic E2 — Theming & Visual System

### E2-01 (P0) OKLCH Token System

**Desc**: CSS variables wired to Tailwind; light/dark base.
**Acceptance**

* Tokens applied app‑wide; AA contrast in both modes.
  **Deps**: —

### E2-02 (P0) Condition Themes + Icon Map

**Desc**: Map WMO→`IconKey` and `ThemeKey` (clear/cloudy/overcast/fog/rain/snow/thunder + day/night).
**Acceptance**

* Changing condition updates background gradient + icon.
* Reduced motion disables gradient animation.
  **Deps**: E2-01.

### E2-03 (P1) Animated Backgrounds

**Desc**: Subtle gradients per condition; night variants.
**Acceptance**

* Transitions ≤600ms; respects reduced motion.
  **Deps**: E2-02.

---

## Epic E3 — Performance & Accessibility

### E3-01 (P0) Skeletons & Layout Stability

**Desc**: Skeletons for hero, metrics, daily, hourly; prevent CLS.
**Acceptance**

* Card sizes locked; skeleton shapes match final.
  **Deps**: —

### E3-02 (P0) ARIA & Keyboard

**Desc**: Combobox ARIA; Tabs ARIA; focus rings.
**Acceptance**

* Axe clean (no critical issues); keyboardable end‑to‑end.
  **Deps**: E1-01, E1-04.

### E3-03 (P1) Query Caching & SWR

**Desc**: TanStack Query with `staleTime` 10–15m; cancel in‑flight requests.
**Acceptance**

* Background refetch on focus; no duplicate calls on rapid input.
  **Deps**: API layer.

---

## Epic E4 — Personalization

### E4-01 (P0) Geolocation First Visit

**Desc**: Ask permission; load local forecast; fallback to search.
**Acceptance**

* Friendly prompt; denial path emphasized; remembers choice.
  **Deps**: E1-02/E1-03.

### E4-02 (P1) Favorites Drawer

**Desc**: Add/remove, reorder (drag), dedupe, quick switch; local persistence.
**Acceptance**

* Star toggles; toast on add; persists across sessions.
  **Deps**: E1-01, state store.

### E4-03 (P1) Compare Grid

**Desc**: 2–4 locations in responsive grid; linked hover on sparklines.
**Acceptance**

* Each card shows current, mini 7‑day hi/lo, PoP; hover syncs time index.
  **Deps**: E1-04/E1-05, charts.

---

## Epic E5 — Delight

### E5-01 (P1) Rive Hero

**Desc**: State machine inputs (`isDay`, `condition`, `windNorm`, `uvNorm`, `precipNorm`, `thunder`).
**Acceptance**

* Switches scenes based on weather; paused on reduced motion; fallback SVG.
  **Deps**: E2-02.

### E5-02 (P1) Voice Search

**Desc**: Web Speech API; press‑and‑hold to record; release to search.
**Acceptance**

* Feature‑detect; graceful fallback; permission errors handled.
  **Deps**: E1-01.

### E5-03 (P2) Micro‑Interactions Pack

**Desc**: Number flip on unit change, card hover lift/shine, toast choreography.
**Acceptance**

* Motion timings: 120–250ms; prefers‑reduced‑motion honored.
  **Deps**: E2-01.

---

## Epic E6 — PWA & Analytics

### E6-01 (P0) PWA Baseline

**Desc**: Manifest, icons, SW (next‑pwa), offline page.
**Acceptance**

* Installable on Chromium + Android; offline shows cached last‑good per location.
  **Deps**: Build pipeline.

### E6-02 (P1) Analytics Events (Privacy‑light)

**Desc**: Track search, geolocate, units/theme change, favorite add/remove, compare add/remove, install.
**Acceptance**

* Toggle to disable analytics in Settings.
  **Deps**: Settings drawer.

---

## Epic E7 — Polish & Demo

### E7-01 (P0) Settings Drawer

**Desc**: Units, 12/24‑h, theme (system/light/dark/auto‑time), reduced motion, language, reset app.
**Acceptance**

* All options persist; language affects geocoding results.
  **Deps**: E1-06, i18n.

### E7-02 (P0) Deep Links & Share

**Desc**: URLs encode `lat,lon,name,units,timeFormat,dayIndex`; “Copy link” button.
**Acceptance**

* Loading a deep link restores exact state.
  **Deps**: Routing.

### E7-03 (P1) Offline/Network UX

**Desc**: Show last‑good timestamp; retry controls; graceful empty states.
**Acceptance**

* Network flaps do not crash UI; toast + inline message.
  **Deps**: E6-01.

### E7-04 (P1) Keyboard Shortcuts

**Desc**: `⌘K`, `U`, `T`, `F`, `C`; on‑screen cheat sheet.
**Acceptance**

* Accessible; can be disabled in Settings.
  **Deps**: Relevant features.

### E7-05 (P1) Storybook Mini

**Desc**: 5–6 key components documented with props and states.
**Acceptance**

* Snapshots for tokens, cards, daily chips, hourly chart, search.
  **Deps**: Components exist.

### E7-06 (P0) Quality Gates

**Desc**: Strict TS, ESLint/Prettier, Axe, Lighthouse CI ≥95.
**Acceptance**

* CI fails below thresholds; perf budget respected.
  **Deps**: CI config.

### E7-07 (P2) Demo Mode

**Desc**: “Judges” button cycles through curated cities/conditions.
**Acceptance**

* Works offline using cached demo payloads.
  **Deps**: E6-01.

### E7-08 (P2) Moon Phase & Wind Arrow

**Desc**: Daily moon chip; wind direction arrow + Beaufort.
**Acceptance**

* Derived visuals from existing data; no extra calls.
  **Deps**: E1 data.

---

## Dependencies Graph (high level)

* **E2-01 → E2-02 → E2-03** (tokens → themes → animations)
* **E1-04 → E1-05** (daily → hourly)
* **E1-01 → E4-02** (search → favorites)
* **E2-02 → E5-01** (themes/map → Rive)
* **E6-01 → E7-03/E7-07** (PWA before offline UX & demo mode)

---

## Definition of Done (Global)

* **Accessibility**: Keyboard + visible focus + ARIA patterns; AA contrast.
* **Performance**: No unexpected layout shift; cached where applicable.
* **Testing**: Unit for mappers/formatters; component tests for search/tabs/cards; E2E happy path.
* **Docs**: README + changelog updated; component props documented.
