# State Management

## Zustand Store Structure

```typescript
useAppStore: {
  units, 
  themeMode: 'system'|'light'|'dark'|'auto-time',
  settings: { reducedMotion: boolean, language: string },
  selectedLocation?: Location,
  selectedDayIndex: number,
  favorites: Location[], 
  recent: Location[],
}
```

## State Categories

### User Preferences
- **Units**: Temperature, wind speed, precipitation, pressure, time format
- **Theme Mode**: System, light, dark, or auto-time (based on sunrise/sunset)
- **Settings**: Reduced motion preference, language selection

### Location Management
- **Selected Location**: Currently active weather location
- **Selected Day Index**: Which day is currently being viewed (0-6)
- **Favorites**: User's starred locations with persistence
- **Recent**: Recently searched locations for quick access

### Persistence Strategy
- Persist via `zustand/middleware/persist` to `localStorage`
- Whitelist: `units`, `theme`, `favorites`, `recent`, `settings`
- Exclude: `selectedLocation`, `selectedDayIndex` (session-only)

## State Flow

1. **Initialization**: Load persisted preferences from localStorage
2. **Location Selection**: Update selectedLocation and add to recent
3. **Theme Changes**: Apply theme mode with system/auto-time logic
4. **Unit Changes**: Trigger data refetch with new units
5. **Favorites**: Add/remove locations with persistence

## Integration with TanStack Query

- Store state drives query parameters (location, units)
- Query results update UI state
- Cache invalidation on unit changes
- Background refetch on window focus

## State Synchronization

- URL state sync for shareable links
- Cross-tab synchronization via storage events
- Debounced updates for performance
- Optimistic updates for better UX
