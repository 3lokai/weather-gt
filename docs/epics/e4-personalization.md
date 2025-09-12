# Epic E4 — Personalization

## Overview
User personalization features including geolocation, favorites, and location comparison functionality.

---

## Stories

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

### E4-04 (P0) Home Page Layout Alignment

**Desc**: Restructure home page to match design specifications, replacing demo sections with production layout.
**Acceptance**

* Home page matches provided design mockups (desktop and mobile).
* Clean, focused layout with hero, current weather, metrics, daily forecast, and hourly panel.
* Remove all demo sections and replace with production components.
* Responsive design that works on both desktop and mobile.
  **Deps**: E1-01, E1-02, E1-03, E1-04, E1-05, E4-01.

---

## Dependencies
- **E4-01** depends on E1-02 (current conditions) and E1-03 (metrics)
- **E4-02** depends on E1-01 (search functionality)
- **E4-03** depends on E1-04 (daily forecast) and E1-05 (hourly data)
- **E4-04** depends on E1-01, E1-02, E1-03, E1-04, E1-05, and E4-01
