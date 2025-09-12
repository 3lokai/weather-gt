# E4-02 (P1) Favorites Dropdown + Recent Search Integration

## Description
Header favorites dropdown with live weather data, recent searches under search bar, star toggles, drag reordering, local persistence.

## Acceptance Criteria

* Header favorites dropdown with live weather data for each favorite
* Recent searches appear under search bar when focused
* Star toggles throughout app; toast on add; persists across sessions
* Drag-and-drop reordering in favorites dropdown
* Quick switch functionality from both favorites and recent searches

## Dependencies
E1-01 (search functionality), state store

## Priority
P1 (Strongly desired)

## Definition of Done
- [ ] Accessibility: Keyboard + visible focus + ARIA patterns; AA contrast
- [ ] Performance: No unexpected layout shift; cached where applicable
- [ ] Testing: Unit for mappers/formatters; component tests for favorites; E2E happy path
- [ ] Docs: README + changelog updated; component props documented

## Story

As a **frequent user**,
I want **to save favorite locations and access recent searches**,
so that **I can quickly switch between my regular locations and easily re-find recently viewed places without having to search each time**.

## Context

This story implements a dual-location access system: a favorites dropdown in the header for quick access to regularly used locations, and recent searches integrated into the search experience for easy re-access to recently viewed places. The system includes local persistence, drag-and-drop reordering, and live weather data display for favorites.

## Dev Notes

### Technical Implementation

**Favorites Storage:**
- Use localStorage for persistence across sessions
- Store location objects with all necessary data (name, coordinates, timezone, etc.)
- Implement deduplication logic to prevent duplicate entries
- Add migration logic for any future schema changes

**Recent Searches Storage:**
- Store recent search history in localStorage (last 10 searches)
- Include timestamp and location data for each recent search
- Auto-cleanup old entries (older than 30 days)
- Exclude current location from recent searches

**Favorites Dropdown UI:**
- Dropdown in header next to current location display
- List of favorite locations with live weather data (temp, condition icon)
- Drag-and-drop reordering with visual feedback
- Current location shown at top if favorited
- Quick switch functionality to load location data

**Recent Searches Integration:**
- Show recent searches when search input is focused
- Display location name and last viewed timestamp
- Quick selection without typing
- "Clear Recent" option for privacy

**State Management:**
- Integrate with existing Zustand store
- Add favorites array and recentSearches array to global state
- Implement actions for add/remove/reorder favorites
- Implement actions for add/clear recent searches
- Sync with localStorage on state changes

**Integration Points:**
- Connect with search functionality (E1-01) for adding favorites and tracking recent searches
- Use existing weather data fetching for favorites display
- Integrate with location selection system
- Leverage existing toast notification system
- Replace current location display in header with favorites dropdown

### Design Considerations

**Favorites Dropdown Behavior:**
- Dropdown trigger in header next to current location
- Smooth open/close animations
- Click outside to close
- Responsive design for different screen sizes
- Mobile-friendly touch targets

**Favorites List:**
- Show location name, country, and current temperature
- Display weather condition icon for quick visual reference
- Include last updated timestamp
- Show loading states for individual favorites
- Current location highlighted at top if favorited

**Recent Searches Behavior:**
- Appear when search input is focused
- Show below search input with clear section header
- Include location name and relative timestamp ("2 hours ago")
- "Clear Recent" link at bottom of recent section
- Smooth fade-in/out animations

**Drag and Drop:**
- Visual feedback during drag operations in favorites dropdown
- Smooth reordering animations
- Touch-friendly for mobile devices
- Keyboard accessible reordering (up/down arrows)

**Star Toggle:**
- Heart icon in current weather card header (top-right corner, next to share button)
- Prominent star icon in search results and location cards
- Filled heart/star for favorited locations, outline for non-favorites
- Toast notification on add/remove actions
- Smooth transition animations

### Accessibility Requirements

**ARIA Patterns:**
- Proper labeling for favorites dropdown and recent searches
- Announcements for add/remove actions
- Status updates for drag-and-drop operations
- Clear focus management when dropdown opens/closes
- Combobox pattern for search with recent suggestions

**Keyboard Navigation:**
- Tab navigation through favorites dropdown
- Enter/Space to select favorite location
- Arrow keys for reordering favorites (up/down)
- Escape to close dropdown
- Arrow keys to navigate recent searches
- Enter to select recent search

**Screen Reader Support:**
- Descriptive labels for all interactive elements
- Status announcements for state changes
- Clear instructions for drag-and-drop operations
- Announce recent searches section when search is focused

## Tasks / Subtasks

- [ ] **Task 1: State Management Enhancement**
  - [ ] Add favorites array to Zustand store
  - [ ] Add recentSearches array to Zustand store
  - [ ] Implement add/remove/reorder actions for favorites
  - [ ] Implement add/clear actions for recent searches
  - [ ] Add localStorage persistence with migration logic
  - [ ] Implement deduplication logic for favorites

- [ ] **Task 2: Favorites Dropdown Component**
  - [ ] Create dropdown component for header
  - [ ] Implement favorites list with live weather data
  - [ ] Add loading states for individual favorites
  - [ ] Implement responsive design for mobile/desktop
  - [ ] Replace current location display in header

- [ ] **Task 3: Recent Searches Integration**
  - [ ] Enhance search component to show recent searches
  - [ ] Add recent searches section when search is focused
  - [ ] Implement timestamp display and "Clear Recent" functionality
  - [ ] Add smooth animations for recent searches appearance

- [ ] **Task 4: Drag and Drop Functionality**
  - [ ] Implement drag-and-drop reordering in favorites dropdown
  - [ ] Add visual feedback during drag operations
  - [ ] Implement keyboard accessible reordering
  - [ ] Add smooth animations for reordering

- [ ] **Task 5: Star Toggle Integration**
  - [ ] Add heart icon to current weather card header
  - [ ] Add star toggle to search results
  - [ ] Add star toggle to location cards
  - [ ] Implement toast notifications for add/remove
  - [ ] Add smooth transition animations

- [ ] **Task 6: Quick Switch Functionality**
  - [ ] Implement click-to-switch for favorites dropdown
  - [ ] Implement click-to-switch for recent searches
  - [ ] Update current location in store
  - [ ] Trigger weather data refresh for new location
  - [ ] Close dropdown after selection

- [ ] **Task 7: Integration and Testing**
  - [ ] Integrate with existing search functionality
  - [ ] Test localStorage persistence across sessions
  - [ ] Add unit tests for favorites and recent searches logic
  - [ ] Add component tests for dropdown functionality
  - [ ] Add E2E tests for complete favorites and recent searches flow

## Testing

### Unit Tests
- Favorites state management (add/remove/reorder)
- Recent searches state management (add/clear)
- localStorage persistence and migration
- Deduplication logic for favorites
- Toast notification triggers

### Component Tests
- Favorites dropdown open/close functionality
- Recent searches display in search component
- Favorites list rendering with live weather data
- Drag-and-drop interactions in dropdown
- Heart icon toggle in current weather card
- Star toggle behavior in search results
- Keyboard navigation for both components

### E2E Tests
- Complete favorites workflow (add, reorder, switch)
- Recent searches workflow (search, select, clear)
- Persistence across browser sessions
- Integration with search and weather display
- Mobile touch interactions
- Header dropdown and search integration

### Accessibility Tests
- Screen reader compatibility for both components
- Keyboard navigation for dropdown and recent searches
- Focus management when switching between components
- ARIA pattern compliance (combobox for search)
- Announcements for recent searches section

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
