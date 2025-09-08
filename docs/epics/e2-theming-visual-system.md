# Epic E2 — Theming & Visual System

## Overview
Design system, theming, and visual components including color tokens, condition themes, and animated backgrounds.

---

## Stories

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

## Dependencies
- **E2-01 → E2-02 → E2-03** (tokens → themes → animations)
- **E2-02 → E5-01** (themes/map → Rive)
