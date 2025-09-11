# E7-01 Settings - Deferred Features Backlog

## Overview
Features deferred from the main E7-01 Settings Drawer story to focus on core functionality for demo.

## ✅ Recently Completed Features

### Time-Based Theme Switching (Completed)
**Status:** ✅ **FULLY IMPLEMENTED**
**Completion Date:** Current sprint
**Impact:** Users now automatically get appropriate theme (light during day, dark at night) based on their location's sunrise/sunset times.

**Key Benefits:**
- Enhanced user experience with contextually appropriate themes
- Automatic adaptation to user's local time and location
- Non-intrusive implementation that respects user preferences
- Robust error handling and fallback mechanisms

## Deferred Features

### 1. Reduced Motion Preference
**Priority:** P2 (Nice to have)
**Description:** Add accessibility preference for users who prefer reduced motion animations.

**Technical Requirements:**
- Add `prefers-reduced-motion` toggle to settings
- Integrate with CSS `prefers-reduced-motion` media query
- Disable/limit animations when preference is enabled
- Persist preference in weather store

**Files to Modify:**
- `src/lib/store/weather-store.ts` - Add reduced motion state
- `src/components/settings/simple-units-toggle.tsx` - Add toggle
- `src/app/globals.css` - Add reduced motion styles
- Animation components - Respect reduced motion preference

### 2. Language Selection
**Priority:** P2 (Nice to have)  
**Description:** Add language selection that affects geocoding results and UI text.

**Technical Requirements:**
- Add language dropdown to settings
- Integrate with i18n system
- Update geocoding API calls with language parameter
- Persist language preference
- Update UI text based on selected language

**Dependencies:**
- i18n system implementation
- Geocoding API language support

**Files to Modify:**
- `src/lib/store/weather-store.ts` - Add language state
- `src/components/settings/simple-units-toggle.tsx` - Add language dropdown
- `src/lib/api/openMeteo.ts` - Add language parameter to geocoding
- `src/lib/i18n/` - Language system integration

### 3. ~~Automatic Time-based Theme Switching~~ ✅ COMPLETED
**Priority:** ~~P3 (Future enhancement)~~ **COMPLETED**
**Description:** ~~Automatically switch between light and dark themes based on time of day.~~ **IMPLEMENTED**

**✅ Implementation Details:**
- ✅ Detects sunrise/sunset times for user location using suncalc library
- ✅ Automatically sets theme on first render based on current time vs sunrise/sunset
- ✅ Respects user manual theme overrides (only applies when no explicit preference)
- ✅ Handles timezone changes and location updates
- ✅ Graceful error handling with fallbacks

**✅ Files Created/Modified:**
- ✅ `src/lib/utils/time-based-theme.ts` - Core time-based theme calculation utilities
- ✅ `src/hooks/use-theme-toggle.ts` - Enhanced with time-based logic
- ✅ `src/lib/providers/theme-provider.tsx` - Updated default theme configuration
- ✅ `src/lib/utils/__tests__/time-based-theme.test.ts` - Unit tests for time-based logic

**✅ Dependencies Resolved:**
- ✅ Location data integration with weather store
- ✅ Timezone handling via existing location data

## Implementation Notes

### When to Implement
- **Reduced Motion:** Implement after core accessibility audit
- **Language Selection:** Implement after i18n system is complete
- ~~**Auto Theme:** Implement after location services are stable~~ ✅ **COMPLETED**

### Testing Considerations
- All features should maintain existing functionality
- Accessibility testing for reduced motion
- Internationalization testing for language features
- ~~Timezone testing for auto-theme switching~~ ✅ **COMPLETED with unit tests**

### Future Epic Considerations
These features could be grouped into:
- **E8-Accessibility:** Reduced motion, enhanced accessibility features
- **E9-Internationalization:** Language selection, full i18n support
- ~~**E10-Smart-Features:** Auto-theme, location-based preferences~~ ✅ **COMPLETED in E7-01**
