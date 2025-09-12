# Epic E6 — PWA & Analytics

## Overview
Progressive Web App features and privacy-focused analytics implementation.

---

## Stories

### E6-01 (P0) PWA Baseline

**Desc**: Manifest, icons, SW (next‑pwa), offline page. **Bundled with E7-03 Offline/Network UX for complete offline experience.**
**Acceptance**

* Installable on Chromium + Android; offline shows cached last‑good per location.
* Clear visual indicators for cached vs live data.
* Simple network status banner for offline detection.
  **Deps**: Build pipeline.

### E6-02 (P1) Analytics Events (Privacy‑light)

**Desc**: Track search, geolocate, units/theme change, favorite add/remove, compare add/remove, install.
**Acceptance**

* Toggle to disable analytics in Settings.
  **Deps**: Settings drawer.

---

## Dependencies
- **E6-01 + E7-03** (Bundled together for complete offline experience)
- **E6-01 → E7-07** (PWA before demo mode)
