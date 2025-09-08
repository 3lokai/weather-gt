# Development Roadmap

## 30‑Day Hackathon Plan & Epic/Story Map

### Epics

* **E1 Core Weather Experience** (search, current, daily, hourly, **PoP**, gusts, cloud cover, dew point, pressure trend, units/time format, AQI & Pollen)
* **E2 Theming & Visual System** (OKLCH tokens, condition themes, backgrounds)
* **E3 Performance & A11y** (skeletons, caching, ARIA, Lighthouse 95+)
* **E4 Personalization** (geolocation, favorites, compare)
* **E5 Delight** (Rive hero, voice search, micro‑interactions)
* **E6 PWA & Analytics** (install, offline, update flow, events)
* **E7 Polish & Demo** (QA, bug bash, demo script, docs)
* **E8 Post‑Hackathon Extensions** (optional later): Radar tiles, third‑party alerts, minute‑nowcast, notifications

## Timeline (30 days)

### Week 1 (Days 1‑7) — Foundations
* Scaffold Next.js + shadcn + ReactBits; set Tailwind + tokens (E2)
* Geocode search (Command palette) + current card + metrics (E1)
* Unit toggles wired end‑to‑end; **add 12/24‑hour time toggle** (E1)

### Week 2 (Days 8‑14) — Forecast Depth
* 7‑day rail + hourly panel w/ chart + hover‑preview (E1)
* **Add PoP (precipitation\_probability)** everywhere precip appears (E1)
* **Add gusts, cloud cover, dew point, pressure trend** (derive ↑/↓ from recent window) (E1)
* Skeletons + error states + accessibility pass v1 (E3)
* Animated condition backgrounds + day/night (E2)

### Week 3 (Days 15‑21) — Personalization + Air
* Geolocation on first visit + fallback (E4)
* Favorites drawer + quick switch (E4)
* Compare grid (2–3 locations) + linked hover (E4)
* **AQI panel** (OM Air Quality) + **Pollen panel** (OM Pollen) (E1)

### Week 4 (Days 22‑28) — Delight & Platform
* Rive hero baseline (clear, rain, thunder) (E5)
* Voice search (press‑and‑hold) (E5)
* PWA (manifest, SW, offline) + analytics events (E6)

### Days 29‑30 — Polish & Demo
* Lighthouse ≥95 across boards; bug bash; finalize demo script (E7)

## Story Seeds (ready for orchestrator → stories)

### E1 Core

* **S‑E1‑01**: Implement geocode search (debounced Command palette) with keyboard nav.
* **S‑E1‑02**: Current conditions card with icon mapping and a11y labels.
* **S‑E1‑03**: Metrics grid (feels‑like, humidity, wind, **gusts**, precip, **PoP**, pressure + **trend**, UV, visibility, **cloud cover**, **dew point**).
* **S‑E1‑04**: 7‑day rail with selectable day chips showing hi/low + PoP.
* **S‑E1‑05**: Hourly panel with line chart + hover preview; show temp, precip, **PoP**, wind, cloud cover, dew point.
* **S‑E1‑06**: Units toggle (C/F, km/h|mph, mm→**in** label where Imperial) with number flip.
* **S‑E1‑07**: **12/24‑hour time** format toggle.
* **S‑E1‑08**: **AQI panel** using OM Air Quality; show PM2.5/PM10 + regional AQI.
* **S‑E1‑09**: **Pollen panel** (grass/tree/weed) with severity chips and tooltips.

### E2 Theming

* **S‑E2‑01**: Implement OKLCH token system + Tailwind wiring.
* **S‑E2‑02**: Condition → theme switching with day/night.
* **S‑E2‑03**: Animated gradient backgrounds per condition.

### E3 Perf/A11y

* **S‑E3‑01**: Skeletons matching final layout.
* **S‑E3‑02**: ARIA roles & focus rings; AXE clean.
* **S‑E3‑03**: Query caching + SWR; cancel in‑flight requests.

### E4 Personalization

* **S‑E4‑01**: Geolocation with deny fallback + UX.
* **S‑E4‑02**: Favorites drawer with local persistence.
* **S‑E4‑03**: Compare grid (2–4 locations) + linked hover.

### E5 Delight

* **S‑E5‑01**: Rive hero component with inputs contract.
* **S‑E5‑02**: Voice search with Web Speech API fallback handling.
* **S‑E5‑03**: Micro‑interactions (number flips, card hover, toasts).

### E6 Platform

* **S‑E6‑01**: PWA manifest + SW + offline page; update toast.
* **S‑E6‑02**: Analytics: search, geolocate, favorites, compare, install.

### E7 Polish

* **S‑E7‑01**: Lighthouse & performance hardening.
* **S‑E7‑02**: Bug bash + demo script & cue card.

### E8 Post‑Hackathon (backlog)

* **S‑E8‑01**: Radar/precip map overlay (3rd‑party tiles) — **later extension**.
* **S‑E8‑02**: Severe weather alerts (NWS/Meteoalarm) — **later extension**.
* **S‑E8‑03**: Minute‑nowcast (vendor) — **later extension**.
* **S‑E8‑04**: Push notifications — **later extension**.

## Definition of Done (per story)

* **a11y**: keyboard + visible focus + ARIA; AA contrast
* **tests**: basic unit (logic) + Cypress happy path where sensible
* **perf**: no layout shift, cached where applicable
* **docs**: README section updated; changelog entry

## Milestones (MVP → Showcase)

### MVP (Week 1–2)
* Search, current, metrics, 7‑day, hourly, units, responsive, a11y baseline.

### V1 (Week 3–4)
* Geolocation, favorites, sunrise/sunset, animated backgrounds, dark/light.

### Showcase+ (Week 5)
* Compare grid, voice search, Rive hero, PWA polish, analytics.

## Success Metrics

* **Lighthouse** ≥ 95 (PWA, Performance, Accessibility, Best Practices, SEO).
* **TTI** < 2.5s on mid‑tier mobile; **FCP** < 1.8s.
* **Search→Results**: < 700ms perceived (optimistic UI + skeletons).
* **Install rate** for PWA ≥ 10% of returning users.
* **Retention**: ≥ 2 favorites saved for 30% of users.

## Acceptance Criteria (DoD)

* Meets all core requirements; passes AXE checks; Lighthouse ≥95 across categories.
* Units toggle updates all views and charts consistently.
* Day selector synchronizes hourly chart + list.
* Favorites persist; compare shows 2–4 cities with consistent layout.
* PWA installable; offline fallback works; SW update toast present.
