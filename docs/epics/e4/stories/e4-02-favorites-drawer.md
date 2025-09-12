# E4-02 (P1) Favorites Drawer

## Description
Add/remove, reorder (drag), dedupe, quick switch; local persistence.

## Acceptance Criteria

* Star toggles; toast on add; persists across sessions.

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
I want **to save and quickly access my favorite locations**,
so that **I can easily switch between locations I check regularly without having to search each time**.

## Context

This story implements a favorites system that allows users to save frequently accessed locations, reorder them via drag-and-drop, and quickly switch between them. The system includes local persistence to maintain favorites across browser sessions.

## Dev Notes

### Technical Implementation

**Favorites Storage:**
- Use localStorage for persistence across sessions
- Store location objects with all necessary data (name, coordinates, timezone, etc.)
- Implement deduplication logic to prevent duplicate entries
- Add migration logic for any future schema changes

**Favorites Drawer UI:**
- Slide-out drawer from the right side of the screen
- List of favorite locations with current weather summary
- Drag-and-drop reordering with visual feedback
- Star toggle for adding/removing favorites
- Quick switch functionality to load location data

**State Management:**
- Integrate with existing Zustand store
- Add favorites array to global state
- Implement actions for add/remove/reorder operations
- Sync with localStorage on state changes

**Integration Points:**
- Connect with search functionality (E1-01) for adding favorites
- Use existing weather data fetching for favorites display
- Integrate with location selection system
- Leverage existing toast notification system

### Design Considerations

**Drawer Behavior:**
- Slide in from right on trigger (star icon, menu button)
- Overlay with backdrop for mobile-friendly interaction
- Smooth animations for open/close states
- Responsive design for different screen sizes

**Favorites List:**
- Show location name, country, and current temperature
- Display weather condition icon for quick visual reference
- Include last updated timestamp
- Show loading states for individual favorites

**Drag and Drop:**
- Visual feedback during drag operations
- Smooth reordering animations
- Touch-friendly for mobile devices
- Keyboard accessible reordering (up/down arrows)

**Star Toggle:**
- Prominent star icon in search results and location cards
- Filled star for favorited locations, outline for non-favorites
- Toast notification on add/remove actions
- Smooth transition animations

### Accessibility Requirements

**ARIA Patterns:**
- Proper labeling for drawer and favorites list
- Announcements for add/remove actions
- Status updates for drag-and-drop operations
- Clear focus management when drawer opens/closes

**Keyboard Navigation:**
- Tab navigation through favorites list
- Enter/Space to select favorite location
- Arrow keys for reordering (up/down)
- Escape to close drawer

**Screen Reader Support:**
- Descriptive labels for all interactive elements
- Status announcements for state changes
- Clear instructions for drag-and-drop operations

## Tasks / Subtasks

- [ ] **Task 1: Favorites State Management**
  - [ ] Add favorites array to Zustand store
  - [ ] Implement add/remove/reorder actions
  - [ ] Add localStorage persistence with migration logic
  - [ ] Implement deduplication logic

- [ ] **Task 2: Favorites Drawer Component**
  - [ ] Create slide-out drawer component
  - [ ] Implement favorites list with weather summaries
  - [ ] Add loading states for individual favorites
  - [ ] Implement responsive design for mobile/desktop

- [ ] **Task 3: Drag and Drop Functionality**
  - [ ] Implement drag-and-drop reordering
  - [ ] Add visual feedback during drag operations
  - [ ] Implement keyboard accessible reordering
  - [ ] Add smooth animations for reordering

- [ ] **Task 4: Star Toggle Integration**
  - [ ] Add star toggle to search results
  - [ ] Add star toggle to location cards
  - [ ] Implement toast notifications for add/remove
  - [ ] Add smooth transition animations

- [ ] **Task 5: Quick Switch Functionality**
  - [ ] Implement click-to-switch for favorites
  - [ ] Update current location in store
  - [ ] Trigger weather data refresh for new location
  - [ ] Close drawer after selection

- [ ] **Task 6: Integration and Testing**
  - [ ] Integrate with existing search functionality
  - [ ] Test localStorage persistence across sessions
  - [ ] Add unit tests for favorites logic
  - [ ] Add component tests for drawer functionality
  - [ ] Add E2E tests for complete favorites flow

## Testing

### Unit Tests
- Favorites state management (add/remove/reorder)
- localStorage persistence and migration
- Deduplication logic
- Toast notification triggers

### Component Tests
- Drawer open/close functionality
- Favorites list rendering
- Drag-and-drop interactions
- Star toggle behavior
- Keyboard navigation

### E2E Tests
- Complete favorites workflow (add, reorder, switch)
- Persistence across browser sessions
- Integration with search and weather display
- Mobile touch interactions

### Accessibility Tests
- Screen reader compatibility
- Keyboard navigation
- Focus management
- ARIA pattern compliance

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
