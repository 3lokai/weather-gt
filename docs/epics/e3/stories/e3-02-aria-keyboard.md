# E3-02 (P0) ARIA & Keyboard

## Description
Combobox ARIA; Tabs ARIA; focus rings.

## Acceptance Criteria

* Axe clean (no critical issues); keyboardable end‑to‑end.

## Dependencies
E1-01, E1-04.

## Priority
P0 (Must have for demo)

## Definition of Done
- [ ] Accessibility: Keyboard + visible focus + ARIA patterns; AA contrast
- [ ] Performance: No unexpected layout shift; cached where applicable
- [ ] Testing: Unit for mappers/formatters; component tests for accessibility; E2E happy path
- [ ] Docs: README + changelog updated; component props documented

## Technical Notes
- Implement proper ARIA patterns for combobox (search component)
- Add ARIA support for tabs (daily forecast selection)
- Ensure all interactive elements have visible focus rings
- Implement keyboard navigation for all components
- Add proper ARIA labels and descriptions for screen readers
- Ensure color contrast meets AA standards
- Implement proper heading hierarchy (h1, h2, h3)
- Add skip links for keyboard users
- Test with screen readers and keyboard-only navigation
- Use Axe-core for automated accessibility testing

## Related Files
- `src/components/search/` - Search combobox with ARIA
- `src/components/weather/` - Daily forecast tabs with ARIA
- `src/styles/` - Focus ring styles
- `tests/a11y.spec.ts` - Accessibility test suite
