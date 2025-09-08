# E3-01 (P0) Skeletons & Layout Stability

## Description
Skeletons for hero, metrics, daily, hourly; prevent CLS.

## Acceptance Criteria

* Card sizes locked; skeleton shapes match final.

## Dependencies
None

## Priority
P0 (Must have for demo)

## Definition of Done
- [ ] Accessibility: Keyboard + visible focus + ARIA patterns; AA contrast
- [ ] Performance: No unexpected layout shift; cached where applicable
- [ ] Testing: Unit for mappers/formatters; component tests for skeletons; E2E happy path
- [ ] Docs: README + changelog updated; component props documented

## Technical Notes
- Create skeleton components for all major UI sections: hero, metrics grid, daily forecast, hourly chart
- Ensure skeleton dimensions exactly match final component dimensions to prevent CLS
- Use consistent skeleton styling with the design system
- Implement proper loading states for all data-dependent components
- Consider using CSS animations for skeleton shimmer effects
- Make skeletons responsive to match different screen sizes
- Integrate with TanStack Query loading states
- Ensure skeletons are accessible (proper ARIA labels, reduced motion support)

## Related Files
- `src/components/ui/` - Skeleton components (to be created)
- `src/components/weather/` - Weather components with skeleton integration
- `src/lib/providers/query-provider.tsx` - Query loading state integration
