# E7-10 (P1) Component Cleanup & Demo Removal

## Description
Remove unused demo components and simplify component APIs by removing unused size/layout variants while preserving user-facing features like showExtendedMetrics.

## Acceptance Criteria

* All demo components removed from codebase
* Component APIs simplified to only include variants actually used in production
* showExtendedMetrics feature preserved with built-in toggle
* Bundle size reduced and build performance improved
* All existing functionality maintained

## Dependencies
All existing components (E1 stories), current app structure

## Priority
P1 (Important for production readiness)

## Definition of Done
- [ ] Accessibility: No regressions in existing functionality
- [ ] Performance: Bundle size reduced, build time improved
- [ ] Testing: All existing tests pass, no functionality broken
- [ ] Docs: Component APIs documented with simplified prop lists

## Story

As a **developer maintaining the codebase**,
I want **to remove unused demo components and simplify component APIs**,
so that **the codebase is cleaner, more maintainable, and has better performance for production**.

## Context

The current codebase contains multiple demo components and component variants that are not used in production. This creates unnecessary complexity, increases bundle size, and makes the codebase harder to maintain. We need to clean up these unused components while preserving all user-facing features.

## Dev Notes

### Components to Remove

**Demo Components (Not Used in Production):**
- `current-conditions-demo.tsx`
- `hourly-panel-chart-demo.tsx`
- `pollen-panel-demo.tsx`
- `air-quality-panel-demo.tsx`
- `skeleton-demo.tsx`
- `lottie-metric-demo.tsx`

**Demo Routes/Pages:**
- Remove any demo routes from routing configuration
- Clean up demo imports from remaining files

### Component API Simplification

**Keep These Features (Actually Used):**
- `showExtendedMetrics` - User feature with built-in toggle
- `lg` size for MetricsGrid - Good visual hierarchy
- `sm` size for side panels - Consistent sizing
- `layout="grid"` - Standard layout (keep prop for flexibility)
- `viewMode="list"` - Current usage (keep prop for future flexibility)

**Remove These Variants:**
- `md` size - Not used anywhere in production
- `chart` view mode - Not used in production (but keep prop)
- Unused layout options - Only `grid` is used

### Production Usage Analysis

**Current Props in app/page.tsx:**
```typescript
<MetricsGrid size="lg" />  // Keep lg
<AirQualityPanel size="sm" layout="grid" />  // Keep sm, keep layout prop
<PollenPanel size="sm" layout="grid" />      // Keep sm, keep layout prop
<HourlyPanelChart viewMode="list" />         // Keep viewMode prop
```

### Bundle Size Impact

**Expected Improvements:**
- Remove ~6 demo component files
- Reduce component variant complexity
- Faster build times
- Smaller bundle size
- Cleaner component APIs

## Tasks / Subtasks

- [ ] **Task 1: Remove Demo Components**
  - [ ] Delete all `*-demo.tsx` files
  - [ ] Remove demo imports from any remaining files
  - [ ] Clean up demo routes from routing configuration
  - [ ] Update any documentation that references demo components

- [ ] **Task 2: Simplify Component APIs**
  - [ ] Remove `md` size variant from all components
  - [ ] Keep `sm` and `lg` sizes (actually used)
  - [ ] Keep `layout` and `viewMode` props (for flexibility)
  - [ ] Preserve `showExtendedMetrics` feature completely

- [ ] **Task 3: Update Component Documentation**
  - [ ] Update component prop interfaces
  - [ ] Update Storybook stories to remove unused variants
  - [ ] Update component documentation
  - [ ] Ensure all examples use production-relevant props

- [ ] **Task 4: Verify No Regressions**
  - [ ] Run all existing tests
  - [ ] Verify app/page.tsx still works correctly
  - [ ] Check that showExtendedMetrics toggle still works
  - [ ] Verify all size variants work as expected
  - [ ] Test build performance improvements

- [ ] **Task 5: Bundle Analysis**
  - [ ] Measure bundle size before cleanup
  - [ ] Measure bundle size after cleanup
  - [ ] Document performance improvements
  - [ ] Verify build time improvements

## Testing

### Unit Tests
- All existing component tests pass
- No functionality regressions
- showExtendedMetrics toggle works correctly
- Size variants render correctly

### Integration Tests
- app/page.tsx renders correctly
- All component props work as expected
- No broken imports or missing components

### Performance Tests
- Bundle size reduced
- Build time improved
- No runtime performance regressions

### Manual Testing
- Verify all components render correctly
- Test showExtendedMetrics toggle functionality
- Verify responsive behavior maintained
- Check that all user features still work

## File List
*This section will be updated by the Dev Agent during implementation*

## Dev Agent Record

### Agent Model Used
*To be filled by Dev Agent*

### Debug Log References
*To be filled by Dev Agent*

### Completion Notes List
*To be filled by Dev Agent*

## Change Log
*To be updated by Dev Agent*

## Status
Draft
