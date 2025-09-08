# Search Components

Geocode search functionality using Open-Meteo Geocoding API with keyboard-first design.

## Components

### SearchProvider

Wraps your app to provide global search functionality with keyboard shortcuts.

```tsx
import { SearchProvider } from '@/components/search';

export default function App() {
  return (
    <SearchProvider>
      {/* Your app content */}
    </SearchProvider>
  );
}
```

### SearchCommand

Command palette dialog for location search with debounced API calls.

```tsx
import { SearchCommand } from '@/components/search';

function MyComponent() {
  const [open, setOpen] = useState(false);
  
  return (
    <SearchCommand 
      open={open} 
      onOpenChange={setOpen}
    />
  );
}
```

## Features

- **Keyboard Navigation**: Arrow keys (↑/↓) to navigate, Enter to select, Escape to close
- **Global Shortcut**: Cmd/Ctrl+K opens search from anywhere
- **Debounced Search**: 300ms debounce prevents excessive API calls
- **Accessibility**: ARIA patterns, focus trapping, high contrast support
- **Integration**: Automatic weather store updates and data prefetching
- **Responsive**: Mobile-friendly design with touch support

## API Integration

Uses the Open-Meteo Geocoding API via `src/lib/api/open-meteo.ts`:

- Searches after 2+ character input
- Returns up to 10 results
- Includes coordinates, timezone, and administrative regions
- Automatically prefetches weather data on selection

## Styling

Follows the project's glassmorphism design system:

- `glass-strong` - Dialog backdrop
- `glass-hover` - Interactive elements
- `glass-subtle` - Accent styling
- Consistent with shadcn@canary components

## Accessibility

- Screen reader friendly with proper ARIA labels
- Keyboard navigation support
- Focus management and trapping
- High contrast mode compatible
- Reduced motion support
