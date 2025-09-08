# Design System

## Visual System & Theming

### Typography
* **Font Stack**: Inter/Geist or System UI stack
* **Size Scale**: tuned for readability across devices
* **Line Height**: optimized for weather data display

### Color Palettes (Tailwind tokens)

#### Light Theme
* **Background**: neutral‑100
* **Text**: neutral‑900
* **Accent Hues**: condition-based (clear: amber, rain: blue, snow: slate, storm: violet, fog: zinc)

#### Dark Theme
* **Background**: neutral‑950
* **Text**: neutral‑50
* **Surfaces**: dimmed with elevated cards and subtle shadows

#### States
* **Focus Ring**: `accent/outline`
* **Semantic Scales**: success/info/warn/error
* **Auto Theme**: switch at sunrise/sunset (local) unless user overrides

### Effects
* **Shadows**: soft, no harsh elevation
* **Overlays**: glassy effects in hero sections
* **Gradients**: subtle washes per condition

## Condition → Theme Token Table (OKLCH • Tailwind vars)

**Goal**: An atmospheric palette that changes with the weather + day/night. All values are OKLCH for consistent perceptual steps.

> **Implementation**: Expose CSS vars (e.g., `--accent`, `--bg`, `--card`, `--ring`, `--grad-from`, `--grad-to`, `--glow`) and wire Tailwind to use them (via `theme.extend.colors`). Night variants slightly lower L and C.

### Token Keys
* `--bg`, `--fg`, `--card`, `--card-fg`, `--muted`, `--muted-fg`, `--ring`
* `--accent`, `--accent-fg`, `--grad-from`, `--grad-to`, `--glow`, `--chart-line`

### Palettes (examples; tweak during design pass)

#### Clear‑Day
```css
--bg: oklch(0.98 0.01 95);
--fg: oklch(0.22 0.03 257);
--card: oklch(0.99 0.01 95);
--muted: oklch(0.95 0.02 95);
--ring: oklch(0.78 0.12 95);
--accent: oklch(0.86 0.14 85);    /* warm amber */
--accent-fg: oklch(0.24 0.05 257);
--grad-from: oklch(0.94 0.05 240);
--grad-to: oklch(0.90 0.10 85);
--glow: oklch(0.90 0.12 85 / 0.35);
--chart-line: oklch(0.62 0.12 85);
```

#### Clear‑Night
```css
--bg: oklch(0.13 0.02 257);
--fg: oklch(0.95 0.02 95);
--card: oklch(0.18 0.02 257);
--muted: oklch(0.16 0.02 257);
--ring: oklch(0.62 0.10 85);
--accent: oklch(0.75 0.10 85);
--accent-fg: oklch(0.13 0.02 257);
--grad-from: oklch(0.22 0.03 257);
--grad-to: oklch(0.28 0.08 85);
--glow: oklch(0.50 0.12 85 / 0.35);
--chart-line: oklch(0.78 0.12 85);
```

#### Rain
```css
--bg: oklch(0.97 0.02 250);
--fg: oklch(0.20 0.04 250);
--card: oklch(0.99 0.01 250);
--muted: oklch(0.93 0.02 250);
--ring: oklch(0.70 0.08 250);
--accent: oklch(0.70 0.12 250);   /* blue */
--accent-fg: oklch(0.18 0.04 250);
--grad-from: oklch(0.92 0.04 240);
--grad-to: oklch(0.86 0.06 220);
--glow: oklch(0.70 0.10 250 / 0.35);
--chart-line: oklch(0.52 0.10 250);
```

#### Thunder
```css
--bg: oklch(0.15 0.02 260);
--fg: oklch(0.96 0.02 95);
--card: oklch(0.18 0.02 260);
--muted: oklch(0.17 0.02 260);
--ring: oklch(0.78 0.12 300);
--accent: oklch(0.74 0.15 300);   /* violet */
--accent-fg: oklch(0.15 0.02 260);
--grad-from: oklch(0.22 0.04 260);
--grad-to: oklch(0.30 0.10 300);
--glow: oklch(0.70 0.15 300 / 0.35);
--chart-line: oklch(0.80 0.14 300);
```

#### Snow
```css
--bg: oklch(0.99 0.01 260);
--fg: oklch(0.24 0.03 260);
--card: oklch(1 0 0);
--muted: oklch(0.96 0.01 260);
--ring: oklch(0.72 0.07 250);
--accent: oklch(0.85 0.08 250);   /* crisp icy blue */
--accent-fg: oklch(0.20 0.03 260);
--grad-from: oklch(0.96 0.03 250);
--grad-to: oklch(0.90 0.05 230);
--glow: oklch(0.85 0.08 250 / 0.30);
--chart-line: oklch(0.55 0.08 250);
```

#### Fog / Overcast (shared base, overcast slightly darker)
```css
--bg: oklch(0.96 0.01 260);
--fg: oklch(0.26 0.02 260);
--card: oklch(0.99 0.005 260);
--muted: oklch(0.92 0.005 260);
--ring: oklch(0.70 0.05 260);
--accent: oklch(0.72 0.06 260);   /* neutral slate */
--accent-fg: oklch(0.20 0.02 260);
--grad-from: oklch(0.94 0.01 260);
--grad-to: oklch(0.90 0.02 260);
--glow: oklch(0.72 0.06 260 / 0.25);
--chart-line: oklch(0.48 0.04 260);
```

> Add `Partly‑Cloudy` variants by blending Clear & Overcast (50/50) and lowering contrast at night.

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
