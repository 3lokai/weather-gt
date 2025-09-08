# Epic E7 — Polish & Demo

## Overview
Final polish, demo features, and quality gates for production readiness.

---

## Stories

### E7-01 (P0) Settings Drawer

**Desc**: Units, 12/24‑h, theme (system/light/dark/auto‑time), reduced motion, language, reset app.
**Acceptance**

* All options persist; language affects geocoding results.
  **Deps**: E1-06, i18n.

### E7-02 (P0) Deep Links & Share

**Desc**: URLs encode `lat,lon,name,units,timeFormat,dayIndex`; "Copy link" button.
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

**Desc**: "Judges" button cycles through curated cities/conditions.
**Acceptance**

* Works offline using cached demo payloads.
  **Deps**: E6-01.

### E7-08 (P2) Moon Phase & Wind Arrow

**Desc**: Daily moon chip; wind direction arrow + Beaufort.
**Acceptance**

* Derived visuals from existing data; no extra calls.
  **Deps**: E1 data.

---

## Dependencies
- **E7-01** depends on E1-06 (units & time format) and i18n
- **E7-03** depends on E6-01 (PWA baseline)
- **E7-07** depends on E6-01 (PWA baseline)
