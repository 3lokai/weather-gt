# E7-03 (P1) Offline/Network UX

## Description
Show last‑good timestamp; retry controls; graceful empty states. **Bundled with E6-01 PWA setup for complete offline experience.**

## Acceptance Criteria

* Network flaps do not crash UI; toast + inline message.
* Clear visual indicators showing cached vs live data.
* Simple bottom banner for offline status.

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
- **Bundled with E6-01 PWA setup** for complete offline experience
- Implement offline detection and handling
- Show last good data timestamp when offline
- **Add clear visual indicators for data source** (cached vs live)
- Add retry controls for failed network requests
- Create graceful empty states for network failures
- Implement toast notifications for network status changes
- **Simple bottom banner for offline status** (not complex UI)
- Ensure UI doesn't crash during network flaps
- Cache last good data for offline display
- Implement proper error boundaries for network failures
- **Data freshness indicators on all weather components**

## Related Files
- `src/lib/providers/query-provider.tsx` - Network state management
- `src/components/ui/` - Offline indicators and retry controls (to be created)
- `src/lib/store/weather-store.ts` - Cached data management
- `src/hooks/use-network-status.ts` - Network status detection (to be created)
- `src/components/ui/network-banner.tsx` - Bottom offline banner (to be created)
- `src/components/ui/data-freshness-indicator.tsx` - Data source indicators (to be created)

## Implementation Strategy
**Bundled with E6-01 PWA setup** - Implement together for complete offline experience:
1. **Phase 1**: Add network status detection and timestamps to weather store
2. **Phase 2**: Create simple bottom banner for offline status
3. **Phase 3**: Add data freshness indicators to all weather components
4. **Phase 4**: Integrate with PWA service worker and offline capabilities

**Key Insight**: Clear visual indicators for cached vs live data are crucial for development and user experience.
