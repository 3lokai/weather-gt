# E3-03 (P1) Query Caching & SWR

## Description
TanStack Query with `staleTime` 10–15m; cancel in‑flight requests.

## Acceptance Criteria

* Background refetch on focus; no duplicate calls on rapid input.

## Dependencies
API layer.

## Priority
P1 (Strongly desired)

## Definition of Done
- [ ] Accessibility: Keyboard + visible focus + ARIA patterns; AA contrast
- [ ] Performance: No unexpected layout shift; cached where applicable
- [ ] Testing: Unit for mappers/formatters; component tests for caching; E2E happy path
- [ ] Docs: README + changelog updated; component props documented

## Technical Notes
- Implement TanStack Query for all API calls
- Set appropriate staleTime (10-15 minutes) for weather data
- Implement request deduplication to prevent duplicate API calls
- Add background refetch on window focus
- Implement proper error handling and retry logic
- Add loading states for all queries
- Implement optimistic updates where appropriate
- Add proper cache invalidation strategies
- Consider implementing offline support with cached data
- Add query prefetching for better UX

## Related Files
- `src/lib/providers/query-provider.tsx` - TanStack Query setup
- `src/lib/api/` - API functions with query integration
- `src/hooks/` - Custom query hooks (to be created)
