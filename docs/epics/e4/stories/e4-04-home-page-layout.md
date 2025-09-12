# E4-04 (P0) Home Page Layout Alignment

## Description
Restructure the home page to match the actual design specifications, replacing demo sections with production layout that follows the design system.

## Acceptance Criteria

* Home page matches the provided design mockups (desktop and mobile)
* Clean, focused layout with hero section, current weather card, metrics grid, daily forecast, and hourly panel
* Remove all demo sections and replace with production components
* Responsive design that works on both desktop and mobile
* Proper component integration following the established patterns

## Dependencies
E1-01 (search), E1-02 (current conditions), E1-03 (metrics), E1-04 (daily forecast), E1-05 (hourly data), E4-01 (geolocation)

## Priority
P0 (Critical for launch)

## Definition of Done
- [ ] Accessibility: Keyboard + visible focus + ARIA patterns; AA contrast
- [ ] Performance: No unexpected layout shift; cached where applicable
- [ ] Testing: Component tests for layout; E2E happy path
- [ ] Docs: README + changelog updated; component props documented

## Story

As a **user visiting the weather app**,
I want **to see a clean, focused home page that matches the design specifications**,
so that **I can quickly understand the current weather and access forecast information without being overwhelmed by demo content**.

## Context

The current home page contains many demo sections and test components that were useful during development but need to be replaced with the actual production layout. The design specifications show a clean, focused layout with:

1. **Header**: Logo, location display, settings dropdown, theme toggle
2. **Hero Section**: Main question, search bar, subtitle
3. **Current Weather Card**: Large card with location, date, weather icon, and temperature
4. **Metrics Grid**: 2x2 grid showing feels like, humidity, wind, precipitation
5. **Daily Forecast**: Horizontal scrollable strip of 7-day forecast
6. **Hourly Forecast**: Right sidebar (desktop) or full-width section (mobile) with hourly details

## Dev Notes

### Design Analysis

**Desktop Layout (from design mockup):**
- Three-column layout with main content on left, hourly forecast on right
- Current weather card is prominent with gradient background
- Metrics grid is 2x2 below the main weather card
- Daily forecast is horizontal scrollable strip
- Hourly forecast is in right sidebar with day selector

**Mobile Layout (from design mockup):**
- Single column layout with all sections stacked vertically
- Same components but optimized for mobile viewing
- Hourly forecast becomes full-width section below daily forecast

### Technical Implementation

**Layout Structure:**
- Use CSS Grid for desktop three-column layout
- Use Flexbox for mobile single-column layout
- Implement responsive breakpoints for smooth transitions
- Ensure proper spacing and alignment according to design system

**Component Integration:**
- Replace demo components with production versions
- Use existing `RealWeatherConditions` component for current weather
- Integrate `MetricsGrid` component for weather metrics
- Use `SevenDayForecast` component for daily forecast
- Use `HourlyPanel` component for hourly forecast
- Maintain existing search and geolocation functionality

**Responsive Design:**
- Desktop: Three-column layout (main content + hourly sidebar)
- Tablet: Two-column layout (main content + hourly below)
- Mobile: Single-column layout with all sections stacked

### Design System Compliance

**Typography:**
- Use established typography scale from design system
- Maintain proper hierarchy with display, heading, and body text
- Ensure consistent spacing between elements

**Colors and Theming:**
- Use established color tokens from design system
- Maintain glass morphism effects for cards
- Ensure proper contrast ratios for accessibility

**Spacing and Layout:**
- Use consistent spacing scale from design system
- Maintain proper component margins and padding
- Ensure responsive spacing that scales appropriately

### Component Mapping

**Current Components to Use:**
- `RealWeatherConditions` → Current weather card
- `MetricsGrid` → Weather metrics grid
- `SevenDayForecast` → Daily forecast strip
- `HourlyPanel` → Hourly forecast section
- `InlineSearch` → Search functionality
- `SettingsDropdown` → Settings menu
- `ThemeToggle` → Theme switching

**Layout Components to Create:**
- `HomePageLayout` → Main layout wrapper
- `WeatherHero` → Hero section with search
- `WeatherContent` → Main weather content area
- `WeatherSidebar` → Hourly forecast sidebar (desktop)

## Tasks / Subtasks

- [ ] **Task 1: Layout Structure Setup**
  - [ ] Create responsive layout wrapper component
  - [ ] Implement CSS Grid for desktop three-column layout
  - [ ] Implement Flexbox for mobile single-column layout
  - [ ] Add proper responsive breakpoints

- [ ] **Task 2: Header Section**
  - [ ] Clean up header layout to match design
  - [ ] Ensure proper logo and branding placement
  - [ ] Integrate location display with selected location
  - [ ] Maintain settings dropdown and theme toggle

- [ ] **Task 3: Hero Section**
  - [ ] Implement hero section with main question
  - [ ] Integrate search functionality
  - [ ] Add dynamic subtitle based on selected location
  - [ ] Ensure proper spacing and typography

- [ ] **Task 4: Current Weather Card**
  - [ ] Replace demo content with `RealWeatherConditions`
  - [ ] Ensure proper card styling and gradient background
  - [ ] Integrate with weather data and location state
  - [ ] Add proper loading states

- [ ] **Task 5: Metrics Grid**
  - [ ] Replace demo metrics with production `MetricsGrid`
  - [ ] Ensure 2x2 grid layout matches design
  - [ ] Integrate with current weather data
  - [ ] Add proper responsive behavior

- [ ] **Task 6: Daily Forecast**
  - [ ] Replace demo daily forecast with production component
  - [ ] Ensure horizontal scrollable layout
  - [ ] Integrate with weather data and day selection
  - [ ] Add proper mobile optimization

- [ ] **Task 7: Hourly Forecast**
  - [ ] Replace demo hourly forecast with production component
  - [ ] Implement desktop sidebar layout
  - [ ] Implement mobile full-width layout
  - [ ] Integrate with day selection and weather data

- [ ] **Task 8: Demo Content Removal**
  - [ ] Remove all demo sections and test components
  - [ ] Clean up unused imports and dependencies
  - [ ] Remove demo-specific styling and components
  - [ ] Ensure no demo content remains in production

- [ ] **Task 9: Responsive Optimization**
  - [ ] Test and optimize desktop layout
  - [ ] Test and optimize tablet layout
  - [ ] Test and optimize mobile layout
  - [ ] Ensure smooth transitions between breakpoints

- [ ] **Task 10: Integration and Testing**
  - [ ] Test all component integrations
  - [ ] Verify data flow and state management
  - [ ] Test responsive behavior across devices
  - [ ] Add component tests for layout components

## Testing

### Component Tests
- Layout wrapper responsive behavior
- Component integration and data flow
- Responsive breakpoint transitions
- Loading states and error handling

### E2E Tests
- Complete home page load and interaction
- Search functionality integration
- Weather data display and updates
- Responsive layout behavior

### Visual Regression Tests
- Desktop layout matches design mockup
- Mobile layout matches design mockup
- Component styling and spacing
- Theme switching behavior

### Accessibility Tests
- Keyboard navigation through layout
- Screen reader compatibility
- Focus management and ARIA patterns
- Color contrast compliance

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
