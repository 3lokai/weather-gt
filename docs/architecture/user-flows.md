# User Flows & Happy Paths

## Primary User Journeys

### 1. Initial App Load & Geolocation
**Flow**: User lands → geolocate → fetch forecast/aq/pollen in parallel → render skeleton → hydrate hero/metrics

**Steps**:
1. **App Initialization**: Load app shell and initialize providers
2. **Geolocation Request**: Prompt user for location permission
3. **Parallel Data Fetching**: 
   - Fetch weather forecast for current location
   - Fetch air quality data
   - Fetch pollen data
4. **Skeleton Loading**: Show loading skeletons while data loads
5. **Data Hydration**: Populate UI components with fetched data
6. **Hero Animation**: Trigger Rive animation based on weather conditions

**Success Criteria**:
- App loads in < 2.5 seconds
- Location permission granted
- All weather data displayed correctly
- Smooth animation transitions

### 2. Location Search & Selection
**Flow**: Search → pick location → prefetch forecast → swap `selectedLocation` → animate gradient + Rive → render

**Steps**:
1. **Search Input**: User types location name in search box
2. **Debounced Search**: 300ms debounce triggers geocoding API
3. **Results Display**: Show autocomplete results with recent/favorites
4. **Location Selection**: User clicks on desired location
5. **Data Prefetching**: Fetch weather data for selected location
6. **State Update**: Update `selectedLocation` in store
7. **UI Animation**: Animate gradient and Rive hero to new conditions
8. **Data Rendering**: Display new location's weather data

**Success Criteria**:
- Search results appear quickly (< 500ms)
- Smooth transition to new location
- All weather data updates correctly
- Animation reflects new weather conditions

### 3. Day Navigation & Hourly Details
**Flow**: Hover Day N → prefetch hourly for day N → preview; click to set day

**Steps**:
1. **Day Hover**: User hovers over day chip in daily strip
2. **Data Prefetching**: Fetch hourly data for hovered day
3. **Preview Display**: Show preview of hourly data
4. **Day Selection**: User clicks to select the day
5. **State Update**: Update `selectedDayIndex` in store
6. **Hourly Panel Update**: Display detailed hourly view
7. **Chart Animation**: Animate charts to new day's data

**Success Criteria**:
- Hover preview appears quickly
- Smooth day selection transition
- Hourly data displays correctly
- Charts animate smoothly

### 4. Unit System Changes
**Flow**: Toggle units → invalidate queries → brief number flip → re‑render

**Steps**:
1. **Unit Selection**: User changes unit system (metric/imperial)
2. **State Update**: Update units in store
3. **Query Invalidation**: Invalidate cached weather data
4. **Data Refetch**: Fetch weather data with new units
5. **UI Update**: Update all displayed values
6. **Animation**: Brief number flip animation for changed values

**Success Criteria**:
- All values update to new units
- Smooth number transition animations
- No data inconsistencies
- Cache properly invalidated

## Secondary User Journeys

### 5. Favorites Management
**Flow**: Add to favorites → persist to localStorage → show in favorites drawer

**Steps**:
1. **Favorite Action**: User clicks star icon on location
2. **State Update**: Add location to favorites array
3. **Persistence**: Save to localStorage via Zustand persist
4. **UI Update**: Update star icon state
5. **Drawer Update**: Show in favorites drawer

### 6. Compare View
**Flow**: Add to compare → open compare view → display side-by-side

**Steps**:
1. **Add to Compare**: User adds location to comparison
2. **Navigation**: Navigate to `/compare` route
3. **Data Fetching**: Fetch weather data for all compared locations
4. **Grid Display**: Show weather cards in comparison grid
5. **Linked Interactions**: Hover effects sync across cards

### 7. Voice Search
**Flow**: Press and hold → record speech → process → search

**Steps**:
1. **Voice Activation**: User presses and holds voice button
2. **Speech Recording**: Web Speech API records audio
3. **Speech Processing**: Convert speech to text
4. **Search Execution**: Use converted text for location search
5. **Results Display**: Show search results
6. **Location Selection**: User selects from results

### 8. Offline Experience
**Flow**: Go offline → show cached data → retry when online

**Steps**:
1. **Connection Loss**: Network connection lost
2. **Offline Detection**: Service worker detects offline state
3. **Cached Data**: Display last known weather data
4. **Offline UI**: Show offline indicator and retry button
5. **Reconnection**: Network restored
6. **Data Refresh**: Fetch fresh data and update UI

## Error Handling Flows

### 9. API Error Recovery
**Flow**: API error → show error state → retry → success

**Steps**:
1. **Error Detection**: API request fails
2. **Error Classification**: Determine error type (network, rate limit, etc.)
3. **Error Display**: Show appropriate error message
4. **Retry Option**: Provide retry button
5. **Retry Execution**: User clicks retry
6. **Success Recovery**: Data loads successfully

### 10. Geolocation Denied
**Flow**: Permission denied → show search → manual location entry

**Steps**:
1. **Permission Request**: Request geolocation permission
2. **Permission Denied**: User denies location access
3. **Fallback UI**: Show search interface prominently
4. **Manual Entry**: User manually searches for location
5. **Normal Flow**: Continue with selected location

## Performance Optimizations

### Prefetching Strategies
- **Day Hover**: Prefetch hourly data on day hover
- **Search Results**: Prefetch weather data for top search results
- **Route Preloading**: Preload compare page when user shows interest

### Caching Strategies
- **Stale-While-Revalidate**: Show cached data while fetching fresh
- **Background Updates**: Update data when app regains focus
- **Smart Invalidation**: Invalidate cache only when necessary

### Animation Optimizations
- **Reduced Motion**: Respect user's motion preferences
- **GPU Acceleration**: Use transform properties for smooth animations
- **Animation Queuing**: Queue animations to prevent conflicts
