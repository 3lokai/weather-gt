# Weather API Integration Task

## Overview
Guide for integrating Open-Meteo APIs into the weather app with proper error handling, caching, and TypeScript types.

## Prerequisites
- Next.js project with TypeScript
- TanStack Query installed
- Basic understanding of Open-Meteo API structure

## Steps

### 1. API Client Setup
- Create `lib/api/http.ts` with AbortController and timeout handling
- Implement `fetchJson` utility with proper error handling
- Add request cancellation for debounced searches

### 2. Open-Meteo Integration
- Create `lib/api/openMeteo.ts` with typed API functions:
  - `geocode(q: string, lang?: string): Promise<Location[]>`
  - `forecast(params): Promise<ForecastData>`
  - `airQuality(params): Promise<AirQualityData>`
  - `pollen(params): Promise<PollenData>`

### 3. Type Definitions
- Define TypeScript interfaces for all API responses
- Create mapper functions for WMO weather codes
- Implement unit conversion utilities

### 4. Query Configuration
- Set up TanStack Query with appropriate cache settings
- Configure staleTime (10-15 minutes) and gcTime (1 hour)
- Implement background refetch on window focus

### 5. Error Handling
- Create unified error types for different failure modes
- Implement retry logic with exponential backoff
- Add user-friendly error messages

## Acceptance Criteria
- [ ] All API calls are properly typed
- [ ] Request cancellation works for search
- [ ] Caching prevents unnecessary API calls
- [ ] Error states are handled gracefully
- [ ] Unit tests cover API functions

## Related Stories
- E1-01: Geocode Search
- E1-09: Air Quality Panel
- E1-10: Pollen Panel
- E3-03: Query Caching & SWR
