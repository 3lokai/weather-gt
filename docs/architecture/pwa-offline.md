# PWA & Offline Capabilities

## Progressive Web App (PWA)

### PWA Configuration
* **next-pwa**: Service worker implementation and configuration
* **manifest.json**: App metadata with icons (512/192), theme color, display mode
* **Icons**: Multiple sizes for different devices and contexts
* **Theme Color**: Dynamic theme color based on weather conditions

### Service Worker Strategies

#### Static Assets
* **CacheFirst**: Static assets with revision-based caching
* **Long-term Storage**: Persistent cache for app shell and icons
* **Version Management**: Automatic cache invalidation on updates

#### API Data (Open-Meteo)
* **StaleWhileRevalidate**: Serve cached data while fetching fresh data
* **Per-location Cache**: Separate cache entries for different locations
* **Unit Change Purge**: Clear cache when units change to avoid stale data
* **Background Sync**: Update data when connection is restored

#### HTML Pages
* **NetworkFirst**: Try network first, fallback to cache
* **Offline Fallback**: `/offline` page for complete offline experience
* **Graceful Degradation**: Show cached content when possible

### Service Worker Update Flow
1. **Update Detection**: Service worker detects new version
2. **PostMessage**: Notify app of available update
3. **Toast Notification**: Show "Update available" message to user
4. **User Action**: User chooses to reload or continue
5. **Reload**: Apply new service worker and refresh app

## Offline Experience

### Offline Page
* **Custom Offline UI**: Branded offline page with helpful information
* **Cached Data Display**: Show last known weather data if available
* **Connection Status**: Visual indicator of offline state
* **Retry Mechanism**: Button to retry connection when back online

### Offline Data Strategy
* **Essential Data**: Cache current weather for selected location
* **Recent Locations**: Keep recent searches available offline
* **User Preferences**: Persist settings and favorites
* **Graceful Degradation**: Show "last updated" timestamps

### Cache Management
* **Storage Quotas**: Monitor and manage cache storage limits
* **Cache Cleanup**: Remove old or unused cache entries
* **Selective Caching**: Cache only essential data to save space
* **Cache Versioning**: Handle cache migrations between app versions

## Voice Search

### Web Speech API Implementation
* **Feature Detection**: Check for speech recognition support
* **Press-and-Hold**: Record audio while button is pressed
* **Release to Search**: Process speech when button is released
* **Graceful Fallback**: Fall back to text input if speech not supported

### Voice Search Features
* **Location Recognition**: Convert speech to location search queries
* **Error Handling**: Handle speech recognition errors gracefully
* **Visual Feedback**: Show recording state and processing indicators
* **Privacy**: No speech data stored or transmitted

### Browser Compatibility
* **Chrome/Edge**: Full Web Speech API support
* **Safari**: Limited support, graceful fallback
* **Firefox**: No support, text input fallback
* **Mobile**: Platform-specific speech recognition

## Installation & App-like Experience

### Install Prompts
* **Before Install Prompt**: Capture and defer install prompts
* **Custom Install UI**: Branded install experience
* **Install Analytics**: Track installation events
* **Post-install**: Welcome experience for new installs

### App-like Features
* **Standalone Mode**: Full-screen app experience
* **Splash Screen**: Custom splash screen with app branding
* **Status Bar**: Custom status bar styling
* **Navigation**: App-like navigation patterns

### Platform Integration
* **iOS**: Add to Home Screen with proper meta tags
* **Android**: Native app-like experience with manifest
* **Desktop**: Installable web app with native-like features
* **Cross-platform**: Consistent experience across devices
