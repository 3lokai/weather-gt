# Epic E4 Stories - Personalization

This directory contains the user stories for Epic E4 (Personalization), which focuses on user personalization features including geolocation, favorites, and location comparison functionality.

## Story Overview

### E4-01 (P0) Geolocation First Visit
- **Status**: Draft
- **Description**: Ask permission; load local forecast; fallback to search
- **Dependencies**: E1-02, E1-03

### E4-02 (P1) Favorites Drawer
- **Status**: Not Started
- **Description**: Add/remove, reorder (drag), dedupe, quick switch; local persistence
- **Dependencies**: E1-01, state store

### E4-03 (P1) Compare Grid
- **Status**: Not Started
- **Description**: 2–4 locations in responsive grid; linked hover on sparklines
- **Dependencies**: E1-04, E1-05, charts

## Epic Dependencies

- **E4-01** depends on E1-02 (current conditions) and E1-03 (metrics) ✅
- **E4-02** depends on E1-01 (search functionality) ✅
- **E4-03** depends on E1-04 (daily forecast) and E1-05 (hourly data) ✅

All dependencies are met and Epic 4 is ready to begin.

## Implementation Order

1. **E4-01** (P0) - Start with geolocation as it provides immediate user value
2. **E4-02** (P1) - Favorites functionality builds on search (E1-01)
3. **E4-03** (P1) - Compare grid requires both daily and hourly data

## Notes

- All stories focus on enhancing user experience through personalization
- Geolocation provides immediate value for first-time users
- Favorites and comparison features add depth to the user experience
- Local persistence is key for maintaining user preferences across sessions
