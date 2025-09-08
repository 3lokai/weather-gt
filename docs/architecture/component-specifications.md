# Component Specifications

## Component Inventory (shadcn/ui + ReactBits mapping)

### Core UI Components

#### Search (autosuggest)
* **Components**: `Command` + `Input` + `Popover` (shadcn)
* **Features**: ReactBits debounce, async list, keyboard nav
* **Props**: `{ onSelect(Location), onVoice?, recent?: Location[], favorites?: Location[] }`

#### Units dropdown
* **Components**: `Select` with grouped options
* **Features**: shows active unit chips
* **Props**: `{ units, onChange }`

#### Theme toggle
* **Components**: `Toggle` or custom `ModeToggle`
* **Features**: system/light/dark/auto‑by‑time modes
* **Props**: `{ mode, onChange }`

#### Current card
* **Components**: `Card`, `Avatar/Icon`, badges
* **Features**: micro‑transitions on data refresh
* **Props**: `{ current, location, iconKey, theme }`

#### Metrics grid
* **Components**: `Card` xN with iconography
* **Features**: tooltips for definitions
* **Props**: `{ current }` (calculates chips + tooltips)

#### Daily strip
* **Components**: `Tabs` or `SegmentedControl`‑like pills
* **Features**: `ScrollArea` on mobile
* **Props**: `{ days[], selectedIndex, onSelect(i) }`

#### Hourly chart
* **Components**: `Card` + `Recharts` line chart
* **Features**: pointer hover details
* **Props**: `{ day, units }` + **linked hover** via context

#### Favorites
* **Components**: `Sheet/Drawer` + `List` + star toggle
* **Features**: empty‑state handling
* **Props**: `{ favorites, onRemove, onSelect }`

#### Compare grid
* **Components**: `Grid` of compact `Card`s + sparklines (Recharts mini)
* **Props**: `{ locations[], units }`

#### Sun cycle
* **Components**: custom `Progress` arc/track + sunrise/sunset labels
* **Props**: `{ sunrise, sunset, now }` (computes progress)

#### Voice
* **Components**: mic `Button` with recording state
* **Features**: permission handling

#### Toasts
* **Use Cases**: network errors, added to favorites, SW updated

#### Skeletons
* **Components**: ReactBits skeleton loaders
* **Use Cases**: hero, grid, and list loading states

## Front‑End Spec Addendum (Components • Props • Rive)

### Routes & Layout
* `/` Home (search, hero, metrics, daily, hourly)
* `/compare` Compare grid
* `/offline` Offline page (PWA)
* Shared layout: TopBar (search/voice, units, theme, favorites)

### Global Store (Zustand)
```typescript
{
  units: { temp: 'celsius'|'fahrenheit', wind: 'kmh'|mph', precip: 'mm' },
  themeMode: 'system'|'light'|'dark'|'auto-time',
  selectedLocation?: { id, name, country, admin1, lat, lon, tz },
  selectedDayIndex: number,
  favorites: Location[],
}
```

### API Utilities (shapes)
```typescript
geocode(q: string): Promise<Location[]>
getForecast({lat,lon,units}): Promise<{ current, hourly, daily, isDay }>
```

### Derived helpers
```typescript
getWmoGroup(code: number): string
getIconKey(code: number, isDay: boolean): IconKey
getThemeFor(code: number, isDay: boolean): ThemeTokens
```

### Components (key props)

#### LocationSearch
```typescript
{
  onSelect: (location: Location) => void,
  onVoice?: () => void,
  recent?: Location[],
  favorites?: Location[]
}
```

#### CurrentConditionsCard
```typescript
{
  current: CurrentConditions,
  location: Location,
  iconKey: IconKey,
  theme: ThemeTokens
}
```

#### MetricsGrid
```typescript
{
  current: CurrentConditions
} // calculates chips + tooltips
```

#### DailyStrip
```typescript
{
  days: DailyForecast[],
  selectedIndex: number,
  onSelect: (index: number) => void
}
```

#### HourlyPanel
```typescript
{
  day: DailyForecast,
  units: Units
} // + linked hover via context
```

#### UnitsDropdown
```typescript
{
  units: Units,
  onChange: (units: Units) => void
}
```

#### ThemeToggle
```typescript
{
  mode: ThemeMode,
  onChange: (mode: ThemeMode) => void
}
```

#### FavoritesDrawer
```typescript
{
  favorites: Location[],
  onRemove: (location: Location) => void,
  onSelect: (location: Location) => void
}
```

#### CompareGrid
```typescript
{
  locations: Location[],
  units: Units
}
```

#### SunCycle
```typescript
{
  sunrise: string,
  sunset: string,
  now: Date
} // computes progress
```

#### RiveHero
```typescript
{
  inputs: RiveInputs,
  reducedMotion?: boolean
}
```

## Rive Contract

```typescript
RiveInputs = {
  isDay: boolean,
  condition: 'clear|cloudy|overcast|fog|rain|snow|thunder',
  windNorm: number,      // 0..1 from wind_speed_10m
  uvNorm: number,        // 0..1 from uv_index/max 11
  precipNorm: number,    // 0..1 from rain/snow intensity
  thunder: boolean
}
```

## Interaction Timings

* **Command palette open/close**: 140ms
* **Hover preview to hourly**: 120ms (delay 100ms)
* **Number flip on unit change**: 180ms
* **Card hover lift/shine**: 120ms
* **Background gradient shift**: 600ms (reduced‑motion → 0)
* **Toasts**: 250ms in/out, auto‑dismiss 3.5s

## Accessibility

* **Combobox ARIA pattern**: for search components
* **Tabs ARIA**: for day selector
* **aria-busy**: while fetching data
* **Focus rings**: always visible
* **Contrast**: ensure ≥ AA contrast for all tokens
* **Reduced motion**: respected across Rive (pause) + gradients (static)
