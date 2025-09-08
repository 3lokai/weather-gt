# Epic E1 — Core Weather Experience

## Overview
Core weather functionality including search, current conditions, forecasts, and metrics display.

---

## Stories

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

**Desc**: Global toggles: C/F, km/h|mph, mm (display "in"), hPa|inHg, 12/24‑h.
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

## Dependencies
- **E1-04 → E1-05** (daily → hourly)
- **E1-01 → E4-02** (search → favorites)
