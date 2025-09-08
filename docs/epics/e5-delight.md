# Epic E5 — Delight

## Overview
Delightful user experience features including animated hero elements, voice search, and micro-interactions.

---

## Stories

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

## Dependencies
- **E5-01** depends on E2-02 (condition themes and icon map)
- **E5-02** depends on E1-01 (search functionality)
- **E5-03** depends on E2-01 (token system)
