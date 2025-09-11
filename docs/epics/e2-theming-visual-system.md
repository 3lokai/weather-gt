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

### E2-04 (P0) Storybook Foundations

**Desc**: Setup Storybook with Next.js + Vite, load Tailwind v4 tokens, add global decorators and add-ons.
**Acceptance**

* Storybook runs with app/globals.css loaded for Tailwind v4 tokens
* Global decorators: ThemeProvider, QueryClientProvider, Zustand mock
* Dark toggle works via .dark class on preview root
* Add-ons: essentials, a11y, interactions
* Condition classes (.theme--rain|cloudy|snow|thunder) available
  **Deps**: E2-01.

### E2-05 (P0) Design Tokens & Typography Docs

**Desc**: MDX documentation pages for design system foundations with live token swatches.
**Acceptance**

* MDX pages: colors, radius, spacing, type scale
* Live swatches bound to @theme tokens
* Interactive token playground
* Typography scale documentation
  **Deps**: E2-01, E2-04.

---

## Dependencies
- **E2-01 → E2-02 → E2-03** (tokens → themes → animations)
- **E2-01 → E2-04 → E2-05** (tokens → storybook → docs)
- **E2-02 → E5-01** (themes/map → Rive)
- **E2-04 → E1 component stories** (storybook foundations → component documentation)
