# Epics Overview

This directory contains individual epic files extracted from the main stories.md backlog. Each epic represents a major feature area of the Open-Meteo Weather App.

## Epic Files

- **[E1 - Core Weather Experience](./e1-core-weather-experience.md)** - Core weather functionality including search, current conditions, forecasts, and metrics display
- **[E2 - Theming & Visual System](./e2-theming-visual-system.md)** - Design system, theming, and visual components
- **[E3 - Performance & Accessibility](./e3-performance-accessibility.md)** - Performance optimization and accessibility features
- **[E4 - Personalization](./e4-personalization.md)** - User personalization features including geolocation and favorites
- **[E5 - Delight](./e5-delight.md)** - Delightful user experience features and micro-interactions
- **[E6 - PWA & Analytics](./e6-pwa-analytics.md)** - Progressive Web App features and analytics
- **[E7 - Polish & Demo](./e7-polish-demo.md)** - Final polish, demo features, and quality gates

## Priority Levels

- **P0** - Must have for demo
- **P1** - Strongly desired
- **P2** - Nice to have

## Global Definition of Done

All stories inherit these requirements:
- **Accessibility**: Keyboard + visible focus + ARIA patterns; AA contrast
- **Performance**: No unexpected layout shift; cached where applicable
- **Testing**: Unit for mappers/formatters; component tests for search/tabs/cards; E2E happy path
- **Docs**: README + changelog updated; component props documented

## Cross-Epic Dependencies

Key dependency chains:
- **E2-01 → E2-02 → E2-03** (tokens → themes → animations)
- **E1-04 → E1-05** (daily → hourly)
- **E1-01 → E4-02** (search → favorites)
- **E2-02 → E5-01** (themes/map → Rive)
- **E6-01 → E7-03/E7-07** (PWA before offline UX & demo mode)
