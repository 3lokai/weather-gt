# E7-03 (P1) Offline/Network UX

## Description
Show last‑good timestamp; retry controls; graceful empty states.

## Acceptance Criteria

* Network flaps do not crash UI; toast + inline message.

## Dependencies
E6-01.

## Priority
P1 (Strongly desired)

## Definition of Done
- [ ] Accessibility: Keyboard + visible focus + ARIA patterns; AA contrast
- [ ] Performance: No unexpected layout shift; cached where applicable
- [ ] Testing: Unit for mappers/formatters; component tests for offline states; E2E happy path
- [ ] Docs: README + changelog updated; component props documented

## Technical Notes
- Implement offline detection and handling
- Show last good data timestamp when offline
- Add retry controls for failed network requests
- Create graceful empty states for network failures
- Implement toast notifications for network status changes
- Add inline messages for network issues
- Ensure UI doesn't crash during network flaps
- Cache last good data for offline display
- Implement proper error boundaries for network failures
- Add network status indicator in UI

## Related Files
- `src/lib/providers/query-provider.tsx` - Network state management
- `src/components/ui/` - Offline indicators and retry controls (to be created)
- `src/lib/store/weather-store.ts` - Cached data management
