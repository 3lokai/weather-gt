# E5-03 (P2) Micro‑Interactions Pack

## Description
Number flip on unit change, card hover lift/shine, toast choreography.

**COMPLETED**: All micro-interactions implemented via `LottieMetric` component with superior functionality including smooth number transitions, hover effects, and motion preference support.

## Acceptance Criteria

* Motion timings: 120–250ms; prefers‑reduced‑motion honored.

## Dependencies
E2-01 (token system)

## Priority
P2 (Nice to have)

## Definition of Done
- [ ] Accessibility: Keyboard + visible focus + ARIA patterns; AA contrast
- [ ] Performance: No unexpected layout shift; cached where applicable
- [ ] Testing: Unit for mappers/formatters; component tests for micro-interactions; E2E happy path
- [ ] Docs: README + changelog updated; component props documented

## Story

As a **user interacting with the weather app**,
I want **delightful micro-interactions that provide visual feedback and enhance the user experience**,
so that **the app feels polished, responsive, and engaging while maintaining accessibility and performance**.

## Context

This story implements a collection of micro-interactions that enhance the user experience through subtle animations and visual feedback. The interactions include number flip animations for unit changes, card hover effects with lift and shine, and choreographed toast notifications. All animations respect motion preferences and use optimized timing for smooth, accessible interactions.

## Dev Notes

### Technical Implementation

**Number Flip Animation:**
- Smooth transition when temperature/measurement values change
- Flip effect with proper easing curves
- Maintain readability during animation
- Optimize for performance with CSS transforms

**Card Hover Effects:**
- Subtle lift effect on hover with shadow changes
- Shine effect that follows mouse movement
- Smooth transitions with proper timing
- Responsive design for touch devices

**Toast Choreography:**
- Coordinated entrance/exit animations
- Stack management for multiple toasts
- Proper z-index and positioning
- Accessibility-friendly timing

**Motion Preferences:**
- Respect `prefers-reduced-motion` media query
- Provide alternative feedback without motion
- Maintain functionality without animations
- Test across different motion preference settings

**Performance Optimization:**
- Use CSS transforms and opacity for smooth animations
- Implement `will-change` for animated elements
- Avoid layout thrashing during animations
- Optimize for 60fps performance

### Design Considerations

**Animation Timing:**
- **Fast interactions**: 120ms for immediate feedback
- **Medium transitions**: 200ms for state changes
- **Slow animations**: 250ms for complex transitions
- **Easing curves**: Use appropriate easing for natural feel

**Visual Feedback:**
- **Hover states**: Subtle elevation and color changes
- **Focus states**: Clear keyboard navigation indicators
- **Loading states**: Smooth transitions between states
- **Error states**: Appropriate visual feedback

**Accessibility:**
- **Reduced motion**: Provide alternative feedback
- **High contrast**: Ensure animations don't reduce contrast
- **Focus management**: Maintain clear focus indicators
- **Screen readers**: Don't interfere with assistive technology

**Responsive Design:**
- **Touch devices**: Optimize for touch interactions
- **Mobile performance**: Consider battery usage
- **Different screen sizes**: Scale animations appropriately
- **Low-end devices**: Graceful degradation

### Accessibility Requirements

**Reduced Motion Support:**
- Detect `prefers-reduced-motion: reduce`
- Disable or simplify animations when requested
- Provide alternative visual feedback
- Maintain functionality without motion

**Focus Management:**
- Clear focus indicators during animations
- Maintain focus visibility during transitions
- Proper tab order through animated elements
- Keyboard-accessible interactions

**Screen Reader Compatibility:**
- Ensure animations don't interfere with screen readers
- Provide status updates for dynamic content
- Use appropriate ARIA attributes
- Maintain semantic structure

**Performance Considerations:**
- Minimize CPU usage for battery life
- Optimize for low-end devices
- Provide option to disable animations
- Monitor animation performance

## Tasks / Subtasks

- [ ] **Task 1: Number Flip Animation**
  - [ ] Implement smooth number transition effects
  - [ ] Create flip animation with proper easing
  - [ ] Optimize for performance with CSS transforms
  - [ ] Add accessibility considerations

- [ ] **Task 2: Card Hover Effects**
  - [ ] Implement lift effect with shadow changes
  - [ ] Create shine effect that follows mouse movement
  - [ ] Add smooth transitions with proper timing
  - [ ] Optimize for touch devices

- [ ] **Task 3: Toast Choreography**
  - [ ] Implement coordinated entrance/exit animations
  - [ ] Add stack management for multiple toasts
  - [ ] Create proper z-index and positioning
  - [ ] Add accessibility-friendly timing

- [ ] **Task 4: Motion Preferences**
  - [ ] Implement `prefers-reduced-motion` detection
  - [ ] Create alternative feedback without motion
  - [ ] Test across different motion preference settings
  - [ ] Ensure functionality without animations

- [ ] **Task 5: Performance Optimization**
  - [ ] Use CSS transforms for smooth animations
  - [ ] Implement `will-change` for animated elements
  - [ ] Optimize for 60fps performance
  - [ ] Test on low-end devices

- [ ] **Task 6: Integration and Testing**
  - [ ] Integrate with existing components
  - [ ] Connect with design token system (E2-01)
  - [ ] Add unit tests for animation logic
  - [ ] Add component tests for micro-interactions
  - [ ] Add E2E tests for complete interaction flows

## Testing

### Unit Tests
- Animation timing and easing functions
- Motion preference detection
- Performance optimization logic
- Accessibility helper functions

### Component Tests
- Number flip animation behavior
- Card hover effect interactions
- Toast choreography timing
- Reduced motion behavior

### E2E Tests
- Complete micro-interaction workflows
- Cross-browser compatibility
- Performance under various conditions
- Accessibility across devices

### Accessibility Tests
- Reduced motion preference handling
- Screen reader compatibility
- Keyboard navigation
- Focus management during animations

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
Done
