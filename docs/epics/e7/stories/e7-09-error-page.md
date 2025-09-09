# E7-09 (P0) Error Page

## Description
Full-page error exactly like sample (icon, "Something went wrong", helper text, Retry).

## Acceptance Criteria

* Full-page error exactly like sample (icon, "Something went wrong", helper text, Retry).

## Dependencies
None

## Priority
P0 (Must have for demo)

## Definition of Done
- [ ] Accessibility: Keyboard + visible focus + ARIA patterns; AA contrast
- [ ] Performance: No unexpected layout shift; cached where applicable
- [ ] Testing: Unit for mappers/formatters; component tests for error page; E2E happy path
- [ ] Docs: README + changelog updated; component props documented

## Technical Notes
- Create a full-page error component with centered layout
- Include appropriate error icon (warning or error state)
- Display "Something went wrong" as the main title
- Add helpful error message explaining what happened
- Include a prominent "Retry" button to attempt recovery
- Ensure error page is accessible with proper ARIA labels
- Handle different error types (network, API, geolocation, etc.)
- Integrate with error boundary system
- Make error page responsive for all screen sizes
- Consider adding error reporting/logging functionality

## Related Files
- `src/app/error.tsx` - Next.js error page component
- `src/components/error/` - Error page components (to be created)
- `src/lib/error-handling/` - Error handling utilities (to be created)
