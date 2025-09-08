# E7-04 (P1) Keyboard Shortcuts

## Description
`⌘K`, `U`, `T`, `F`, `C`; on‑screen cheat sheet.

## Acceptance Criteria

* Accessible; can be disabled in Settings.

## Dependencies
Relevant features.

## Priority
P1 (Strongly desired)

## Definition of Done
- [ ] Accessibility: Keyboard + visible focus + ARIA patterns; AA contrast
- [ ] Performance: No unexpected layout shift; cached where applicable
- [ ] Testing: Unit for mappers/formatters; component tests for shortcuts; E2E happy path
- [ ] Docs: README + changelog updated; component props documented

## Technical Notes
- Implement keyboard shortcuts for common actions
- ⌘K (Cmd/Ctrl+K): Open search command palette
- U: Toggle units
- T: Toggle theme
- F: Toggle favorites
- C: Open compare view
- Create on-screen cheat sheet accessible via ? key
- Make shortcuts accessible and discoverable
- Allow disabling shortcuts in settings
- Implement proper keyboard event handling
- Add visual feedback for shortcut actions
- Ensure shortcuts don't conflict with browser shortcuts
- Add help text and tooltips for shortcuts

## Related Files
- `src/hooks/` - Keyboard shortcut hooks (to be created)
- `src/components/ui/` - Cheat sheet component (to be created)
- `src/lib/store/weather-store.ts` - Shortcut preferences
