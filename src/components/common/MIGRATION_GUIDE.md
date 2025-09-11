c# Migration Guide: AnimatedNumber → LottieMetric

This guide shows how to migrate from the existing `AnimatedNumber` components to the new standardized `LottieMetric` components.

## Overview

The new `LottieMetric` components provide the same functionality as the existing `AnimatedNumber` components but with added visual context through Lottie animations. They maintain the same API for easy migration.

## Component Mapping

| Old Component | New Component | Notes |
|---------------|---------------|-------|
| `AnimatedTemperature` | `LottieTemperature` | Same API, adds thermometer animation |
| `AnimatedWindSpeed` | `LottieWindSpeed` | Same API, adds wind animation based on speed |
| `AnimatedPrecipitation` | `LottiePrecipitation` | Same API, adds raindrop animation |
| `AnimatedPressure` | `LottiePressure` | Same API, adds pressure indicator animation |
| `AnimatedHumidity` | `LottieHumidity` | New component, adds humidity animation |
| `AnimatedUVIndex` | `LottieUVIndex` | New component, adds UV index animation |
| `AnimatedPollen` | `LottiePollen` | New component, adds pollen animation |
| `AnimatedAirQuality` | `LottieAirQuality` | New component, adds air quality animation |

## Migration Examples

### Temperature Component

**Before:**
```tsx
import { AnimatedTemperature } from '@/components/common';

<AnimatedTemperature
  value={22}
  unit="celsius"
  duration={180}
  className="text-2xl font-bold"
/>
```

**After:**
```tsx
import { LottieTemperature } from '@/components/common';

<LottieTemperature
  value={22}
  unit="celsius"
  duration={180}
  className="text-2xl font-bold"
  showLottie={true}        // New: control Lottie visibility
  lottieSize={24}          // New: control Lottie size
/>
```

### Wind Speed Component

**Before:**
```tsx
import { AnimatedWindSpeed } from '@/components/common';

<AnimatedWindSpeed
  value={15}
  unit="kmh"
  duration={180}
  className="text-xl font-semibold"
/>
```

**After:**
```tsx
import { LottieWindSpeed } from '@/components/common';

<LottieWindSpeed
  value={15}
  unit="kmh"
  duration={180}
  className="text-xl font-semibold"
  showLottie={true}
  lottieSize={24}
/>
```

### Precipitation Component

**Before:**
```tsx
import { AnimatedPrecipitation } from '@/components/common';

<AnimatedPrecipitation
  value={5.2}
  unit="mm"
  duration={180}
  className="text-lg font-medium"
/>
```

**After:**
```tsx
import { LottiePrecipitation } from '@/components/common';

<LottiePrecipitation
  value={5.2}
  unit="mm"
  duration={180}
  className="text-lg font-medium"
  showLottie={true}
  lottieSize={24}
/>
```

## New Features

### 1. Visual Context
Each metric now displays a contextual Lottie animation that responds to the value:
- **Temperature**: Thermometer with mercury level based on temperature
- **Wind**: Wind animation intensity based on Beaufort scale
- **Precipitation**: Raindrop animation based on intensity
- **Pressure**: High/low pressure indicators

### 2. Smart Animation Selection
The components automatically select appropriate Lottie animations based on values:
- `thermometer-warmer.json` for hot temperatures
- `thermometer-colder.json` for cold temperatures
- `wind-beaufort-0.json` through `wind-beaufort-12.json` for wind speeds
- `pressure-high.json` or `pressure-low.json` for pressure

### 3. Fallback Support
If Lottie animations fail to load, the components gracefully fall back to text-only display.

### 4. Accessibility
All accessibility features from the original components are preserved:
- ARIA labels
- Screen reader support
- Keyboard navigation

## New Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showLottie` | `boolean` | `true` | Whether to display the Lottie animation |
| `lottieSize` | `number` | `24` | Size of the Lottie animation in pixels |
| `lottieSpeed` | `number` | `1` | Animation speed multiplier |
| `lottieLoop` | `boolean` | `true` | Whether to loop the animation |

## Migration Strategy

### Phase 1: Gradual Migration
1. Import both old and new components
2. Replace components one by one
3. Test each replacement thoroughly

### Phase 2: Feature Testing
1. Test with `showLottie={false}` to ensure text-only mode works
2. Test with different `lottieSize` values
3. Test animation performance on target devices

### Phase 3: Cleanup
1. Remove old `AnimatedNumber` imports
2. Update all component references
3. Remove old component files

## Performance Considerations

- Lottie animations are lightweight and optimized
- Animations only load when `showLottie={true}`
- Failed animations gracefully fall back to text
- Consider using `showLottie={false}` on low-end devices

## Accessibility Considerations

- All animations respect `prefers-reduced-motion`
- Screen readers can access the numeric values
- Lottie animations are marked with `aria-hidden="true"`
- Text content remains fully accessible

## Example: Complete Component Migration

**Before (metrics-grid.tsx):**
```tsx
import { AnimatedTemperature, AnimatedWindSpeed, AnimatedPrecipitation } from '@/components/common';

// In component
<AnimatedTemperature value={data.temperature} unit="celsius" />
<AnimatedWindSpeed value={data.windSpeed} unit="kmh" />
<AnimatedPrecipitation value={data.precipitation} unit="mm" />
```

**After (metrics-grid.tsx):**
```tsx
import { LottieTemperature, LottieWindSpeed, LottiePrecipitation } from '@/components/common';

// In component
<LottieTemperature 
  value={data.temperature} 
  unit="celsius" 
  showLottie={true}
  lottieSize={24}
/>
<LottieWindSpeed 
  value={data.windSpeed} 
  unit="kmh" 
  showLottie={true}
  lottieSize={24}
/>
<LottiePrecipitation 
  value={data.precipitation} 
  unit="mm" 
  showLottie={true}
  lottieSize={24}
/>
```

## Testing Checklist

- [ ] All existing functionality works
- [ ] Lottie animations load correctly
- [ ] Fallback behavior works when animations fail
- [ ] Accessibility features are preserved
- [ ] Performance is acceptable on target devices
- [ ] Different `lottieSize` values work correctly
- [ ] `showLottie={false}` works as expected
