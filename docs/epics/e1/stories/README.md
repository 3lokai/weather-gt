# E1 - Core Weather Experience Stories

This directory contains individual story files for Epic E1 - Core Weather Experience. Each story represents a specific feature or component that needs to be implemented.

## Story Files

### P0 Stories (Must have for demo)
- **[E1-01 - Geocode Search](./e1-01-geocode-search.md)** - Command palette with debounced autosuggest
- **[E1-02 - Current Conditions Card](./e1-02-current-conditions-card.md)** - Main weather display with temperature and conditions
- **[E1-03 - Metrics Grid v1](./e1-03-metrics-grid-v1.md)** - Core weather metrics (feels-like, humidity, wind, precip, pressure)
- **[E1-04 - 7-Day Forecast Rail](./e1-04-7day-forecast-rail.md)** - Selectable daily forecast chips
- **[E1-05 - Hourly Panel + Chart](./e1-05-hourly-panel-chart.md)** - Interactive hourly weather chart
- **[E1-06 - Units & Time Format](./e1-06-units-time-format.md)** - Global unit toggles and time format

### P1 Stories (Strongly desired)
- **[E1-07 - Metrics Grid v2](./e1-07-metrics-grid-v2.md)** - Extended metrics (gusts, cloud cover, dew point, pressure trend)
- **[E1-08 - Precipitation Probability Everywhere](./e1-08-precipitation-probability-everywhere.md)** - PoP in current badge, daily chips, hourly tooltips
- **[E1-09 - Air Quality Panel](./e1-09-air-quality-panel.md)** - Air quality metrics with severity indicators
- **[E1-10 - Pollen Panel](./e1-10-pollen-panel.md)** - Pollen indices for grass, tree, and weed

## Implementation Order

Based on dependencies, recommended implementation order:

1. **E1-01** (Geocode Search) - No dependencies
2. **E1-02** (Current Conditions) - Depends on E2-02 (optional)
3. **E1-03** (Metrics Grid v1) - No dependencies
4. **E1-06** (Units & Time Format) - No dependencies
5. **E1-04** (7-Day Forecast) - No dependencies
6. **E1-05** (Hourly Panel) - Depends on E1-04
7. **E1-07** (Metrics Grid v2) - Depends on E1-03
8. **E1-08** (Precipitation Probability) - Depends on E1-05
9. **E1-09** (Air Quality Panel) - No dependencies
10. **E1-10** (Pollen Panel) - No dependencies

## Cross-Epic Dependencies

- **E1-01 → E4-02** (search → favorites)
- **E1-04 → E1-05** (daily → hourly)
- **E2-02** (icon map types) - Recommended for E1-02
- **E6-02** (analytics) - Optional for E1-03

## Global Definition of Done

All stories inherit these requirements:
- **Accessibility**: Keyboard + visible focus + ARIA patterns; AA contrast
- **Performance**: No unexpected layout shift; cached where applicable
- **Testing**: Unit for mappers/formatters; component tests; E2E happy path
- **Docs**: README + changelog updated; component props documented
