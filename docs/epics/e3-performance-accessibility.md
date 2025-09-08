# Epic E3 — Performance & Accessibility

## Overview
Performance optimization, accessibility features, and user experience improvements including skeletons, ARIA patterns, and query caching.

---

## Stories

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

## Dependencies
- **E3-02** depends on E1-01 (search) and E1-04 (daily forecast)
