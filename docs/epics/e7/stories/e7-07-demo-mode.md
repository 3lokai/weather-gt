# E7-07 (P2) Demo Mode

## Description
"Judges" button cycles through curated cities/conditions.

## Acceptance Criteria

* Works offline using cached demo payloads.

## Dependencies
E6-01.

## Priority
P2 (Nice to have)

## Definition of Done
- [ ] Accessibility: Keyboard + visible focus + ARIA patterns; AA contrast
- [ ] Performance: No unexpected layout shift; cached where applicable
- [ ] Testing: Unit for mappers/formatters; component tests for demo mode; E2E happy path
- [ ] Docs: README + changelog updated; component props documented

## Technical Notes
- Create "Judges" button for demo mode
- Cycle through curated cities with different weather conditions
- Use cached demo payloads for offline functionality
- Include diverse weather scenarios: clear, rain, snow, thunder, fog
- Add smooth transitions between demo locations
- Implement demo mode indicator in UI
- Ensure demo mode works without network connection
- Add keyboard shortcuts for demo navigation
- Create compelling demo sequence for judges
- Include impressive weather conditions and locations
- Add demo mode exit functionality

## Related Files
- `src/components/demo/` - Demo mode components (to be created)
- `fixtures/` - Demo data payloads
- `src/lib/store/weather-store.ts` - Demo mode state
