# Design System

## Visual System & Theming

### Typography
* **Font Stack**: Inter/Geist or System UI stack
* **Size Scale**: tuned for readability across devices
* **Line Height**: optimized for weather data display

### Color System (Traditional Light/Dark)

#### Light Theme
* **Background**: neutral‑50
* **Text**: neutral‑900  
* **Cards**: white with subtle borders
* **Primary**: clean slate-based tones

#### Dark Theme
* **Background**: neutral‑950
* **Text**: neutral‑50
* **Cards**: elevated dark surfaces
* **Primary**: softened contrast for comfortable viewing

#### System Theme
* **Automatic**: Follows user's OS preference
* **Smooth Transitions**: CSS custom properties enable seamless switching
* **Persistence**: Theme preference saved via next-themes

### Effects
* **Shadows**: soft, no harsh elevation
* **Overlays**: glassy effects in hero sections
* **Gradients**: subtle washes per condition

## Theme Token System (OKLCH • next-themes)

**Goal**: Clean, accessible light/dark themes with consistent contrast and smooth transitions powered by next-themes.

> **Implementation**: Use next-themes `ThemeProvider` with CSS custom properties. All colors use OKLCH for perceptual uniformity and better accessibility.

### Core Token Structure
* `--background`, `--foreground`, `--card`, `--card-foreground`
* `--popover`, `--popover-foreground`, `--primary`, `--primary-foreground` 
* `--secondary`, `--secondary-foreground`, `--muted`, `--muted-foreground`
* `--accent`, `--accent-foreground`, `--border`, `--input`, `--ring`

### Theme Implementation

#### Light Theme
```css
:root {
  --background: oklch(0.98 0.004 106);
  --foreground: oklch(0.15 0.006 106);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.15 0.006 106);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.15 0.006 106);
  --primary: oklch(0.19 0.028 106);
  --primary-foreground: oklch(0.98 0.004 106);
  --secondary: oklch(0.96 0.006 106);
  --secondary-foreground: oklch(0.19 0.028 106);
  --muted: oklch(0.96 0.006 106);
  --muted-foreground: oklch(0.45 0.009 106);
  --accent: oklch(0.96 0.006 106);
  --accent-foreground: oklch(0.19 0.028 106);
  --destructive: oklch(0.55 0.18 27);
  --destructive-foreground: oklch(0.98 0.004 106);
  --border: oklch(0.89 0.005 106);
  --input: oklch(0.89 0.005 106);
  --ring: oklch(0.19 0.028 106);
}
```

#### Dark Theme
```css
.dark {
  --background: oklch(0.07 0.004 106);
  --foreground: oklch(0.98 0.004 106);
  --card: oklch(0.07 0.004 106);
  --card-foreground: oklch(0.98 0.004 106);
  --popover: oklch(0.07 0.004 106);
  --popover-foreground: oklch(0.98 0.004 106);
  --primary: oklch(0.98 0.004 106);
  --primary-foreground: oklch(0.19 0.028 106);
  --secondary: oklch(0.12 0.006 106);
  --secondary-foreground: oklch(0.98 0.004 106);
  --muted: oklch(0.12 0.006 106);
  --muted-foreground: oklch(0.65 0.009 106);
  --accent: oklch(0.12 0.006 106);
  --accent-foreground: oklch(0.98 0.004 106);
  --destructive: oklch(0.65 0.15 27);
  --destructive-foreground: oklch(0.98 0.004 106);
  --border: oklch(0.12 0.006 106);
  --input: oklch(0.12 0.006 106);
  --ring: oklch(0.82 0.018 106);
}
```

### next-themes Integration
* **ThemeProvider**: Wraps app with theme context
* **System Detection**: Automatically detects OS preference  
* **Smooth Transitions**: CSS custom properties enable seamless switching
* **Persistence**: Saves user choice to localStorage

## Icon Strategy & Mapping (Hackathon‑Ready)

**Goal**: Single source of truth so the entire UI (icons, copy, theme, backgrounds) swaps based on Open‑Meteo codes.

### Abstraction
* Use an internal **`IconKey` enum**; map WMO codes → `IconKey`.
* Then create **pack adapters**:
  * **Basmilius Weather Icons** (primary)
  * **Phosphor Icons** (fallback for UI chrome + any missing glyph)
* Benefits: pack‑agnostic code, easy swap, consistent a11y labels.

### IconKey (canonical)
```
clear-day | clear-night | partly-cloudy-day | partly-cloudy-night | overcast |
fog-day | fog-night | drizzle | freezing-drizzle |
rain-light | rain | rain-heavy | freezing-rain |
snow-light | snow | snow-heavy | snow-grains |
showers-light | showers | showers-heavy |
snow-showers-light | snow-showers-heavy |
thunderstorm | thunderstorm-hail | wind
```

### WMO Weather Code → IconKey Matrix

(Use day/night variant when `isDay` from API or local time)

| WMO Codes  | Condition                             | IconKey                                     |
| ---------- | ------------------------------------- | ------------------------------------------- |
| 0          | Clear sky                             | `clear-day` / `clear-night`                 |
| 1,2        | Mainly clear / Partly cloudy          | `partly-cloudy-day` / `partly-cloudy-night` |
| 3          | Overcast                              | `overcast`                                  |
| 45, 48     | Fog / Depositing rime fog             | `fog-day` / `fog-night`                     |
| 51, 53, 55 | Drizzle (light/moderate/dense)        | `drizzle`                                   |
| 56, 57     | Freezing drizzle (light/dense)        | `freezing-drizzle`                          |
| 61         | Rain: slight                          | `rain-light`                                |
| 63         | Rain: moderate                        | `rain`                                      |
| 65         | Rain: heavy                           | `rain-heavy`                                |
| 66, 67     | Freezing rain (light/heavy)           | `freezing-rain`                             |
| 71, 73, 75 | Snow (slight/moderate/heavy)          | `snow-light` / `snow` / `snow-heavy`        |
| 77         | Snow grains                           | `snow-grains`                               |
| 80         | Rain showers: slight                  | `showers-light`                             |
| 81         | Rain showers: moderate                | `showers`                                   |
| 82         | Rain showers: violent                 | `showers-heavy`                             |
| 85         | Snow showers: slight                  | `snow-showers-light`                        |
| 86         | Snow showers: heavy                   | `snow-showers-heavy`                        |
| 95         | Thunderstorm (slight/moderate)        | `thunderstorm`                              |
| 96, 99     | Thunderstorm with hail (slight/heavy) | `thunderstorm-hail`                         |

### Pack Adapters (examples)

#### Basmilius (example mapping – adjust to exact icon IDs in the library when integrating)
```
clear-day→"clear-day"; clear-night→"clear-night"; partly-cloudy-day→"partly-cloudy-day"; partly-cloudy-night→"partly-cloudy-night"; overcast→"overcast";
fog-day→"fog-day"; fog-night→"fog-night"; drizzle→"drizzle"; freezing-drizzle→"drizzle-freezing";
rain-light→"rain-light"; rain→"rain"; rain-heavy→"rain-heavy"; freezing-rain→"rain-freezing";
snow-light→"snow-light"; snow→"snow"; snow-heavy→"snow-heavy"; snow-grains→"snow-grains";
showers-light→"showers-light"; showers→"showers"; showers-heavy→"showers-heavy";
snow-showers-light→"snow-showers-light"; snow-showers-heavy→"snow-showers-heavy";
thunderstorm→"thunderstorm"; thunderstorm-hail→"thunderstorm-hail"; wind→"wind";
```

#### Phosphor (React icons)
```
clear-day→Sun; clear-night→Moon; partly-cloudy-day→CloudSun; partly-cloudy-night→CloudMoon; overcast→Cloud;
fog-day/night→CloudFog; drizzle→CloudRain; freezing-drizzle→CloudSnow (or CloudRain + Snowflake badge);
rain-light→CloudRain; rain→CloudRain; rain-heavy→CloudRain (thicker weight);
freezing-rain→CloudRain + Snowflake; snow-light/snow/snow-heavy→CloudSnow;
showers-*→CloudRain; snow-showers-*→CloudSnow; thunderstorm→CloudLightning; thunderstorm-hail→CloudLightning + CloudHail; wind→Wind;
```

#### A11y labels
e.g., `"Thunderstorm with hail"` for `thunderstorm-hail`.

### Backgrounds & Copy
* Background group = one of: `clear | cloudy | overcast | fog | rain | snow | thunder` (day/night variant).
* Short copy by group: e.g., `clear → "Clear skies"`, `rain-heavy → "Heavy rain"`.
