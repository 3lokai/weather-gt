# Geolocation Components

This directory contains the geolocation permission system for the weather app, implementing the E4-01 story requirements for first-visit geolocation experience.

## Components Overview

### `GeolocationBanner`
The main permission request banner that appears on first visit. Features:
- **Contextual messaging**: Explains why location is needed and benefits to user
- **Progressive disclosure**: Non-blocking banner that doesn't interrupt the experience
- **Accessibility**: Full ARIA support, keyboard navigation, screen reader friendly
- **Error handling**: User-friendly error messages with retry options
- **Loading states**: Clear feedback during geolocation requests

### `GeolocationFallback`
Fallback component shown when geolocation is denied or dismissed. Features:
- **Graceful degradation**: Smooth transition to search interface
- **Helpful messaging**: Guides users to manual location entry
- **Search integration**: Direct integration with existing search functionality

### `GeolocationProvider`
Main provider component that manages the geolocation flow. Features:
- **State management**: Coordinates between banner and fallback components
- **Flow control**: Manages when to show each component
- **Integration**: Connects with search provider and weather store

## Technical Implementation

### Geolocation Service (`src/lib/utils/geolocation.ts`)
- **Browser compatibility**: Feature detection and graceful fallbacks
- **Error handling**: User-friendly error messages for all failure scenarios
- **Permission management**: Integration with Permissions API when available
- **Storage**: Persistent user preferences in localStorage

### Geolocation Hook (`src/hooks/use-geolocation.ts`)
- **State management**: Comprehensive state for loading, errors, permissions
- **Zustand integration**: Automatic location setting in weather store
- **Permission tracking**: Monitors permission status changes
- **Error recovery**: Clear error state and retry functionality

## User Experience Flow

1. **First Visit**: Banner appears after 1.5 seconds
2. **Permission Request**: User clicks "Allow Location" → browser permission dialog
3. **Success Path**: Location obtained → weather loads automatically → banner disappears
4. **Denial Path**: Permission denied → fallback search prompt appears
5. **Dismissal**: User dismisses → fallback search prompt appears
6. **Search Integration**: Fallback integrates with existing search functionality

## Design System Integration

### Visual Design
- **Design tokens**: Uses existing color system and spacing
- **Glass morphism**: Consistent with app's glass effects
- **Animations**: Smooth slide-in transitions with CSS animations
- **Responsive**: Works on all screen sizes

### Accessibility
- **ARIA patterns**: Proper roles, labels, and live regions
- **Keyboard navigation**: Full keyboard support
- **Screen readers**: Descriptive text and status announcements
- **Focus management**: Clear focus indicators and logical tab order

## Integration Points

### Weather Store
- Automatically sets `selectedLocation` when geolocation succeeds
- Integrates with existing location management

### Search Provider
- Fallback component triggers search interface
- Maintains consistent user experience

### Theme System
- Respects light/dark theme preferences
- Uses design system color tokens

## Testing

### Unit Tests
- Component behavior and state management
- Error handling and edge cases
- Accessibility features

### Integration Tests
- Geolocation service functionality
- Permission API integration
- Storage and persistence

### E2E Tests
- Complete user flows
- Cross-browser compatibility
- Mobile device testing

## Browser Support

### Geolocation API
- **Supported**: All modern browsers
- **Fallback**: Graceful degradation to search interface

### Permissions API
- **Supported**: Chrome, Firefox, Safari (limited)
- **Fallback**: Permission status unknown, show prompt

### Storage
- **localStorage**: Used for preference persistence
- **Fallback**: Graceful handling if storage unavailable

## Configuration

### Options
- **Timeout**: 15 seconds (configurable)
- **High accuracy**: Enabled by default
- **Cache age**: 5 minutes
- **Banner delay**: 1.5 seconds

### Customization
Components accept className props for styling customization while maintaining design system consistency.

## Future Enhancements

### Potential Improvements
- **IP-based fallback**: Use IP geolocation as backup
- **Location history**: Remember recent locations
- **Smart prompts**: Context-aware permission requests
- **Analytics**: Track permission grant/denial rates

### Performance Optimizations
- **Lazy loading**: Load geolocation components only when needed
- **Caching**: Cache location data for offline use
- **Prefetching**: Preload weather data for detected location

## Troubleshooting

### Common Issues
1. **Permission denied**: Check browser settings and HTTPS requirement
2. **Timeout errors**: Verify network connectivity and GPS availability
3. **Storage errors**: Check localStorage availability and quota
4. **Cross-origin issues**: Ensure HTTPS for geolocation API

### Debug Mode
Enable debug logging by setting `localStorage.setItem('geolocation-debug', 'true')` in browser console.
