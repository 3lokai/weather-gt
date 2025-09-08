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

---

## Dependencies
- **E4-01** depends on E1-02 (current conditions) and E1-03 (metrics)
- **E4-02** depends on E1-01 (search functionality)
- **E4-03** depends on E1-04 (daily forecast) and E1-05 (hourly data)
