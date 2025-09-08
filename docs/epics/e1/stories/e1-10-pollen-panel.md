# E1-10 (P1) Pollen Panel (Open‑Meteo)

## Description
Grass/Tree/Weed indices with severity chips.

## Acceptance Criteria

* Handles region‑unsupported cases with empty states.

## Dependencies
None

## Priority
P1 (Strongly desired)

## Definition of Done
- [ ] Accessibility: Keyboard + visible focus + ARIA patterns; AA contrast
- [ ] Performance: No unexpected layout shift; cached where applicable
- [ ] Testing: Unit for mappers/formatters; component tests for pollen data; E2E happy path
- [ ] Docs: README + changelog updated; component props documented

## Technical Notes
- Display 3 pollen indices: Grass, Tree, and Weed pollen
- Use severity-based color coding and chips for each pollen type
- Handle cases where pollen data is not available in certain regions
- Show appropriate empty states when data is unavailable
- Include helpful tooltips explaining pollen levels and health implications
- Provide accessible labels for screen readers
- Use consistent styling with other weather panels
- Integrate with Open-Meteo Pollen API

## Related Files
- `src/lib/api/open-meteo.ts` - Pollen API integration and data structure
- `src/components/weather/` - Pollen panel components (to be created)
