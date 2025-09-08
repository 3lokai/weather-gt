# Component Props Documentation

This document describes the props for components that utilize the OKLCH token system.

## Weather Icon Components

### WeatherIcon (shadcn@canary)

A Phosphor React icon component for weather conditions.

```typescript
interface WeatherIconProps {
  code: WmoCode;           // Weather condition code from WMO
  isDay: boolean;          // Whether it's day or night
  size?: number;           // Icon size in pixels (default: 24)
  className?: string;      // Additional CSS classes
}
```

**Token Usage:**
- Inherits color from parent elements using the OKLCH token system
- Supports all semantic color tokens (primary, secondary, accent, etc.)
- Automatically adapts to light/dark theme variants
- Weather condition themes can be applied via CSS classes

**Example:**
```tsx
<WeatherIcon 
  code={0} 
  isDay={true} 
  size={48} 
  className="text-accent" 
/>
```

### MeteoconsIcon (shadcn@canary)

A dynamic SVG icon component that loads Meteocons icons.

```typescript
interface MeteoconsIconProps {
  code: WmoCode;           // Weather condition code from WMO
  isDay: boolean;          // Whether it's day or night
  size?: number;           // Icon size in pixels (default: 24)
  className?: string;      // Additional CSS classes
  variant?: 'fill' | 'line'; // Icon style variant (default: 'fill')
}
```

**Token Usage:**
- Uses `bg-muted` token for loading state
- Supports all color tokens through className prop
- Loading state uses `animate-pulse` with muted background
- Fallback emoji uses inherited text color

**Example:**
```tsx
<MeteoconsIcon 
  code={1} 
  isDay={false} 
  size={64} 
  variant="line"
  className="text-primary-500" 
/>
```

### LottieWeatherIcon (shadcn@canary)

An animated Lottie icon component for weather conditions.

```typescript
interface LottieWeatherIconProps {
  code: WmoCode;           // Weather condition code from WMO
  isDay: boolean;          // Whether it's day or night
  size?: number;           // Icon size in pixels (default: 24)
  className?: string;      // Additional CSS classes
  loop?: boolean;          // Whether to loop animation (default: true)
  autoplay?: boolean;      // Whether to autoplay (default: true)
  variant?: 'fill' | 'line'; // Animation style variant (default: 'fill')
  speed?: number;          // Animation speed multiplier (default: 1)
}
```

**Token Usage:**
- Uses `bg-muted` token for loading state
- Supports all color tokens through className prop
- Loading state uses `animate-pulse` with muted background
- Fallback emoji uses inherited text color
- Animation colors can be themed using CSS custom properties

**Example:**
```tsx
<LottieWeatherIcon 
  code={2} 
  isDay={true} 
  size={96} 
  loop={true}
  autoplay={true}
  speed={1.5}
  className="text-accent-500" 
/>
```

## Token System Integration

All weather icon components integrate with the OKLCH token system in the following ways:

### Color Tokens
- **Primary Colors**: `text-primary`, `text-primary-500`, `text-primary-600`
- **Secondary Colors**: `text-secondary`, `text-secondary-500`, `text-secondary-600`
- **Accent Colors**: `text-accent`, `text-accent-500`, `text-accent-600`
- **Semantic Colors**: `text-success`, `text-warning`, `text-destructive`, `text-info`
- **Neutral Colors**: `text-muted`, `text-muted-foreground`, `text-subtle`

### Background Tokens
- **Loading States**: `bg-muted` for skeleton loading
- **Container Backgrounds**: `bg-card`, `bg-popover`, `bg-background`

### Weather Condition Themes
Components automatically inherit weather-specific accent colors when parent elements have theme classes:
- `.theme--clear-day` - Warm amber accents
- `.theme--clear-night` - Dimmed amber accents
- `.theme--rain` - Blue accents
- `.theme--snow` - Crisp icy blue accents
- `.theme--cloudy` - Neutral slate accents
- `.theme--fog` - Neutral slate accents
- `.theme--thunder` - Violet accents

### Accessibility
- All components include proper `aria-label` attributes
- Loading states are announced to screen readers
- Fallback content is provided for failed icon loads
- Color contrast meets AA standards in both light and dark modes

### Performance
- Icons are loaded dynamically to reduce initial bundle size
- Loading states prevent layout shift
- Fallback emojis provide immediate visual feedback
- Lottie animations can be controlled for performance (speed, loop, autoplay)
