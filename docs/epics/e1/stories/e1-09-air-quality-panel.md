# E1-09 (P1) Air Quality Panel (Open‑Meteo)

## Description
Show PM2.5, PM10, O₃, NO₂, SO₂, CO; regional AQI if available.

## Acceptance Criteria

* Severity chips (Good/Moderate/Unhealthy…); tooltip explains metric.
* A11y labels for screen readers.

## Dependencies
None

## Priority
P1 (Strongly desired)

## Definition of Done
- [ ] Accessibility: Keyboard + visible focus + ARIA patterns; AA contrast
- [ ] Performance: No unexpected layout shift; cached where applicable
- [ ] Testing: Unit for mappers/formatters; component tests for air quality; E2E happy path
- [ ] Docs: README + changelog updated; component props documented

## Technical Notes
- Display 6 air quality metrics: PM2.5, PM10, O₃, NO₂, SO₂, CO
- Show regional AQI (Air Quality Index) when available
- Use severity-based color coding (Good/Moderate/Unhealthy/etc.)
- Include helpful tooltips explaining each metric and its health implications
- Provide accessible labels for screen readers
- Handle cases where air quality data is not available
- Use appropriate units and formatting for each pollutant
- Integrate with Open-Meteo Air Quality API

## Related Files
- `src/lib/api/open-meteo.ts` - Air quality API integration and data structure
- `src/components/weather/` - Air quality panel components (to be created)
