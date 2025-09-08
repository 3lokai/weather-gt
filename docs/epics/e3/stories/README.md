# E3 - Performance & Accessibility Stories

This directory contains individual story files for Epic E3 - Performance & Accessibility. Each story represents a critical aspect of performance optimization and accessibility that needs to be implemented.

## Story Files

### P0 Stories (Must have for demo)
- **[E3-01 - Skeletons & Layout Stability](./e3-01-skeletons-layout-stability.md)** - Loading skeletons to prevent CLS
- **[E3-02 - ARIA & Keyboard](./e3-02-aria-keyboard.md)** - Accessibility patterns and keyboard navigation

### P1 Stories (Strongly desired)
- **[E3-03 - Query Caching & SWR](./e3-03-query-caching-swr.md)** - TanStack Query with caching and deduplication

## Implementation Order

Based on dependencies, recommended implementation order:

1. **E3-01** (Skeletons & Layout Stability) - No dependencies, needed immediately
2. **E3-02** (ARIA & Keyboard) - Depends on E1-01 and E1-04
3. **E3-03** (Query Caching & SWR) - Can be implemented alongside API layer

## Cross-Epic Dependencies

- **E3-02** depends on E1-01 (search) and E1-04 (daily forecast)
- **E3-01** supports all E1 components with loading states
- **E3-03** enhances all API-dependent features

## Performance & Accessibility Architecture

### Layout Stability (E3-01)
- Skeleton components for all major sections
- Exact dimension matching to prevent CLS
- Responsive skeleton designs
- Shimmer animations with reduced motion support

### Accessibility (E3-02)
- ARIA patterns for complex components
- Keyboard navigation throughout the app
- Screen reader support
- Focus management and visible focus rings
- AA contrast compliance

### Data Management (E3-03)
- TanStack Query for efficient data fetching
- Request deduplication and caching
- Background refetching
- Error handling and retry logic
- Offline support considerations

## Global Definition of Done

All stories inherit these requirements:
- **Accessibility**: Keyboard + visible focus + ARIA patterns; AA contrast
- **Performance**: No unexpected layout shift; cached where applicable
- **Testing**: Unit for mappers/formatters; component tests; E2E happy path
- **Docs**: README + changelog updated; component props documented
