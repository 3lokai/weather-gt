# E4-03 (P1) Compare Grid

## Description
2–4 locations in responsive grid with synchronized mini sparklines for visual pattern comparison and decision-making.

## Acceptance Criteria

* Each card shows current conditions, core metrics, and mini 7-day temperature/precipitation sparklines
* Synchronized hover interactions across all cards highlight same time period
* Visual pattern recognition enables quick weather trend comparison
* Responsive design adapts graph complexity based on screen size

## Dependencies
E1-04 (daily forecast), E1-05 (hourly data), charts

## Priority
P1 (Strongly desired)

## Definition of Done
- [ ] Accessibility: Keyboard + visible focus + ARIA patterns; AA contrast
- [ ] Performance: No unexpected layout shift; cached where applicable
- [ ] Testing: Unit for mappers/formatters; component tests for comparison; E2E happy path
- [ ] Docs: README + changelog updated; component props documented

## Story

As a **user planning travel or comparing locations**,
I want **to see multiple locations side-by-side with synchronized weather data**,
so that **I can easily compare weather conditions across different places and make informed decisions**.

## Context

This story implements a location comparison feature that displays 2-4 locations in a responsive grid layout. Each location card shows current conditions, core weather metrics, and mini sparkline graphs for 7-day temperature and precipitation trends. The feature includes synchronized hover interactions on sparklines to enable visual pattern comparison across locations at the same time index, supporting quick decision-making for travel and activity planning.

## Dev Notes

### Technical Implementation

**Comparison Grid Layout:**
- Responsive grid that adapts from 1-4 columns based on screen size
- Consistent card sizing with proper spacing
- Mobile-first design with stacked layout on small screens
- Smooth transitions when adding/removing locations

**Location Cards:**
- Current weather conditions (temperature, condition, icon)
- Core metrics (feels like, wind, humidity, pressure)
- Mini 7-day temperature sparkline with high/low trends
- Mini 7-day precipitation sparkline with probability trends
- Location name and country
- Quick action buttons (favorite, remove from comparison)

**Synchronized Interactions:**
- Hover over sparklines syncs time index across all cards
- Visual feedback showing which time period is being compared
- Smooth animations for synchronized data updates
- Touch-friendly interactions for mobile devices
- Visual connection lines or shared highlight colors between cards
- Unified tooltip showing all locations' data for selected day

**Data Management:**
- Fetch weather data for multiple locations in parallel
- Use existing daily forecast (E1-04) and hourly data (E1-05) components
- Implement efficient caching for comparison data
- Handle loading states for individual locations

**Integration Points:**
- Connect with favorites system for quick location selection
- Use existing search functionality to add locations
- Leverage existing Recharts components from HourlyPanelChart for sparklines
- Integrate with weather data fetching system
- Use existing metrics grid patterns for core weather data display

### Design Considerations

**Grid Responsiveness:**
- 4 columns on desktop (xl screens)
- 3 columns on large tablets (lg screens)
- 2 columns on small tablets (md screens)
- 1 column on mobile (sm screens)
- Consistent card aspect ratios across all sizes

**Card Content:**
- Prominent current temperature and condition
- Core metrics (feels like, wind, humidity, pressure) in compact format
- Mini temperature sparkline showing 7-day high/low trends
- Mini precipitation sparkline showing rain probability trends
- Subtle location identification
- Consistent visual hierarchy with clear metric prioritization

**Synchronized Hover:**
- Highlighted time index across all cards
- Smooth transitions between time periods
- Clear visual connection between cards
- Accessible alternative for keyboard users

**Performance Optimization:**
- Lazy load comparison data and sparkline graphs
- Efficient re-rendering on hover interactions
- Debounced hover events to prevent excessive updates
- Optimized chart rendering for multiple locations using existing Recharts setup
- Progressive loading: core metrics first, graphs second
- Pre-computed sparkline data for faster rendering

### Accessibility Requirements

**ARIA Patterns:**
- Proper labeling for comparison grid
- Announcements for synchronized interactions
- Clear identification of compared locations
- Status updates for data loading

**Keyboard Navigation:**
- Tab navigation through location cards
- Arrow keys for time index navigation
- Enter/Space for location selection
- Clear focus indicators

**Screen Reader Support:**
- Descriptive labels for all data points and sparkline trends
- Clear comparison context with data table alternatives for graphs
- Instructions for synchronized interactions
- Alternative text for weather icons
- Trend descriptions for sparklines (e.g., "Temperature rising over next 3 days")

## Tasks / Subtasks

- [ ] **Task 1: Comparison Grid Layout**
  - [ ] Create responsive grid component
  - [ ] Implement 1-4 column layout based on screen size
  - [ ] Add smooth transitions for layout changes
  - [ ] Ensure consistent card sizing and spacing

- [ ] **Task 2: Location Card Component**
  - [ ] Create comparison card with current conditions
  - [ ] Add core metrics display (feels like, wind, humidity, pressure)
  - [ ] Implement mini temperature sparkline (7-day high/low trends)
  - [ ] Implement mini precipitation sparkline (7-day probability trends)
  - [ ] Add location identification and action buttons

- [ ] **Task 3: Synchronized Hover System**
  - [ ] Implement hover detection on sparklines
  - [ ] Create synchronized time index updates across all cards
  - [ ] Add visual feedback for active time period (highlight colors/connecting lines)
  - [ ] Implement smooth animations for data updates
  - [ ] Add unified tooltip showing all locations' data for selected day

- [ ] **Task 4: Data Management**
  - [ ] Implement parallel data fetching for multiple locations
  - [ ] Add efficient caching for comparison data and sparkline data
  - [ ] Handle loading states for individual locations
  - [ ] Implement error handling for failed location data
  - [ ] Pre-compute sparkline data for faster rendering
  - [ ] Implement progressive loading (core metrics first, graphs second)

- [ ] **Task 5: Location Management**
  - [ ] Add interface for selecting comparison locations
  - [ ] Implement add/remove functionality
  - [ ] Connect with favorites system
  - [ ] Add validation for maximum 4 locations

- [ ] **Task 6: Integration and Testing**
  - [ ] Integrate with existing weather components and Recharts from HourlyPanelChart
  - [ ] Connect with search and favorites functionality
  - [ ] Add unit tests for comparison logic and sparkline data processing
  - [ ] Add component tests for grid, cards, and synchronized interactions
  - [ ] Add E2E tests for complete comparison flow including graph interactions
  - [ ] Add accessibility tests for screen reader support and keyboard navigation

## Testing

### Unit Tests
- Comparison data management
- Synchronized hover logic
- Location validation (max 4 locations)
- Data fetching and caching
- Sparkline data processing and trend calculations
- Progressive loading logic

### Component Tests
- Grid layout responsiveness
- Card rendering with different data and sparklines
- Hover interactions and synchronization across cards
- Loading and error states
- Sparkline rendering and interaction
- Progressive loading behavior

### E2E Tests
- Complete comparison workflow
- Adding/removing locations
- Synchronized interactions across devices
- Performance with multiple locations
- Sparkline hover synchronization
- Visual pattern comparison effectiveness

### Accessibility Tests
- Screen reader compatibility
- Keyboard navigation
- Focus management
- ARIA pattern compliance
- Data table alternatives for sparklines
- Trend descriptions for visual patterns

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
