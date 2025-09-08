# Next.js + Tailwind CSS 4 Style Guide

## Overview
This style guide defines the design system for our Next.js weather application using Tailwind CSS 4 with OKLCH color space and CSS custom properties. The color system is built around blue and purple as primary colors with orange as the vibrant accent color.

## CSS Configuration

### globals.css
```css
:root {
  /* Core Colors - Light Theme */
  --background: oklch(0.9800 0.0100 264.0000);
  --foreground: oklch(0.1500 0.0200 264.0000);
  --card: oklch(0.9600 0.0150 264.0000);
  --card-foreground: oklch(0.1500 0.0200 264.0000);
  --popover: oklch(0.9700 0.0120 264.0000);
  --popover-foreground: oklch(0.1500 0.0200 264.0000);
  
  /* Primary Colors - Blue/Purple System (Light Theme) */
  --primary: oklch(0.4500 0.1800 264.0000);
  --primary-50: oklch(0.9600 0.0200 264.0000);
  --primary-100: oklch(0.9200 0.0400 264.0000);
  --primary-200: oklch(0.8500 0.0800 264.0000);
  --primary-300: oklch(0.7500 0.1200 264.0000);
  --primary-400: oklch(0.6000 0.1500 264.0000);
  --primary-500: oklch(0.4500 0.1800 264.0000);
  --primary-600: oklch(0.3500 0.2000 264.0000);
  --primary-700: oklch(0.2500 0.1800 264.0000);
  --primary-800: oklch(0.1800 0.1400 264.0000);
  --primary-900: oklch(0.1200 0.1000 264.0000);
  --primary-foreground: oklch(0.9800 0.0100 264.0000);
  
  /* Secondary Colors - Purple Variants (Light Theme) */
  --secondary: oklch(0.4200 0.1600 300.0000);
  --secondary-50: oklch(0.9600 0.0300 300.0000);
  --secondary-100: oklch(0.9200 0.0600 300.0000);
  --secondary-200: oklch(0.8500 0.1000 300.0000);
  --secondary-300: oklch(0.7500 0.1300 300.0000);
  --secondary-400: oklch(0.6000 0.1500 300.0000);
  --secondary-500: oklch(0.4200 0.1600 300.0000);
  --secondary-600: oklch(0.3200 0.1800 300.0000);
  --secondary-700: oklch(0.2400 0.1600 300.0000);
  --secondary-800: oklch(0.1800 0.1200 300.0000);
  --secondary-900: oklch(0.1300 0.0800 300.0000);
  --secondary-foreground: oklch(0.9800 0.0100 264.0000);
  
  /* Accent Color - Orange (Light Theme) */
  --accent: oklch(0.7500 0.1800 65.0000);
  --accent-50: oklch(0.9800 0.0300 65.0000);
  --accent-100: oklch(0.9600 0.0600 65.0000);
  --accent-200: oklch(0.9200 0.1000 65.0000);
  --accent-300: oklch(0.8800 0.1400 65.0000);
  --accent-400: oklch(0.8200 0.1600 65.0000);
  --accent-500: oklch(0.7500 0.1800 65.0000);
  --accent-600: oklch(0.6500 0.2000 65.0000);
  --accent-700: oklch(0.5500 0.1800 65.0000);
  --accent-800: oklch(0.4500 0.1500 65.0000);
  --accent-900: oklch(0.3500 0.1200 65.0000);
  --accent-foreground: oklch(0.9800 0.0100 264.0000);
  
  /* Neutral Colors (Light Theme) */
  --muted: oklch(0.9200 0.0200 264.0000);
  --muted-foreground: oklch(0.4500 0.0300 264.0000);
  --subtle: oklch(0.9400 0.0250 264.0000);
  --subtle-foreground: oklch(0.3500 0.0400 264.0000);
  
  /* Gray Scale (Blue-tinted Light Theme) */
  --gray-50: oklch(0.9800 0.0100 264.0000);
  --gray-100: oklch(0.9500 0.0150 264.0000);
  --gray-200: oklch(0.9000 0.0200 264.0000);
  --gray-300: oklch(0.8000 0.0250 264.0000);
  --gray-400: oklch(0.6500 0.0200 264.0000);
  --gray-500: oklch(0.5000 0.0150 264.0000);
  --gray-600: oklch(0.4000 0.0200 264.0000);
  --gray-700: oklch(0.3000 0.0250 264.0000);
  --gray-800: oklch(0.2200 0.0300 264.0000);
  --gray-900: oklch(0.1500 0.0200 264.0000);
  
  /* Semantic Colors (Light Theme) */
  --success: oklch(0.6000 0.1500 142.5000);
  --success-foreground: oklch(0.9800 0.0100 264.0000);
  --warning: oklch(0.7000 0.1500 85.8700);
  --warning-foreground: oklch(0.9800 0.0100 264.0000);
  --destructive: oklch(0.5500 0.2200 27.3250);
  --destructive-foreground: oklch(0.9800 0.0100 264.0000);
  --info: oklch(0.6000 0.1800 220.0000);
  --info-foreground: oklch(0.9800 0.0100 264.0000);
  
  /* UI Elements (Light Theme) */
  --border: oklch(0.8500 0.0300 264.0000);
  --input: oklch(0.9500 0.0200 264.0000);
  --ring: oklch(0.4500 0.1800 264.0000);
  
  /* Weather-specific gradients (Light Theme) */
  --gradient-primary: linear-gradient(135deg, oklch(0.4500 0.1800 264.0000) 0%, oklch(0.4200 0.1600 300.0000) 100%);
  --gradient-card: linear-gradient(135deg, oklch(0.9600 0.0200 264.0000) 0%, oklch(0.9400 0.0300 290.0000) 100%);
  --gradient-accent: linear-gradient(135deg, oklch(0.7500 0.1800 65.0000) 0%, oklch(0.8000 0.1600 50.0000) 100%);
  
  /* Typography */
  --font-sans: var(--font-dm-sans), ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  --font-display: var(--font-bricolage-grotesque), ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  
  /* Border Radius */
  --radius: 1rem;
  --radius-sm: 0.5rem;
  --radius-md: 0.75rem;
  --radius-lg: 1rem;
  --radius-xl: 1.25rem;
  --radius-2xl: 1.5rem;
  --radius-3xl: 2rem;
  --radius-full: 9999px;
  
  /* Shadows (Light Theme) */
  --shadow-xs: 0 1px 2px 0 hsl(264 20% 20% / 0.08);
  --shadow-sm: 0 1px 3px 0 hsl(264 20% 20% / 0.12), 0 1px 2px -1px hsl(264 20% 20% / 0.12);
  --shadow: 0 1px 3px 0 hsl(264 20% 20% / 0.12), 0 1px 2px -1px hsl(264 20% 20% / 0.12);
  --shadow-md: 0 4px 6px -1px hsl(264 20% 20% / 0.15), 0 2px 4px -2px hsl(264 20% 20% / 0.15);
  --shadow-lg: 0 10px 15px -3px hsl(264 20% 20% / 0.18), 0 4px 6px -4px hsl(264 20% 20% / 0.18);
  --shadow-xl: 0 20px 25px -5px hsl(264 20% 20% / 0.22), 0 8px 10px -6px hsl(264 20% 20% / 0.22);
  --shadow-2xl: 0 25px 50px -12px hsl(264 20% 20% / 0.25);
  
  /* Spacing */
  --spacing: 0.25rem;
  --spacing-px: 1px;
  --spacing-0: 0;
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-3: 0.75rem;
  --spacing-4: 1rem;
  --spacing-5: 1.25rem;
  --spacing-6: 1.5rem;
  --spacing-8: 2rem;
  --spacing-10: 2.5rem;
  --spacing-12: 3rem;
  --spacing-16: 4rem;
  --spacing-20: 5rem;
  --spacing-24: 6rem;
  --spacing-32: 8rem;
}

.dark {
  /* Dark mode - Deep navy theme (like your original mockup) */
  --background: oklch(0.1200 0.0500 264.0000);
  --foreground: oklch(0.9850 0 0);
  --card: oklch(0.2000 0.0800 264.0000);
  --card-foreground: oklch(0.9850 0 0);
  --popover: oklch(0.2200 0.0600 264.0000);
  --popover-foreground: oklch(0.9850 0 0);
  
  /* Primary colors remain strong in dark mode */
  --primary: oklch(0.5500 0.2000 264.0000);
  --primary-50: oklch(0.2200 0.1000 264.0000);
  --primary-100: oklch(0.2800 0.1200 264.0000);
  --primary-200: oklch(0.3400 0.1400 264.0000);
  --primary-300: oklch(0.4000 0.1600 264.0000);
  --primary-400: oklch(0.4800 0.1800 264.0000);
  --primary-500: oklch(0.5500 0.2000 264.0000);
  --primary-600: oklch(0.6200 0.2200 264.0000);
  --primary-700: oklch(0.7000 0.2000 264.0000);
  --primary-800: oklch(0.8000 0.1800 264.0000);
  --primary-900: oklch(0.8800 0.1400 264.0000);
  --primary-foreground: oklch(0.1200 0.0500 264.0000);
  
  /* Secondary colors for dark mode */
  --secondary: oklch(0.5000 0.1800 300.0000);
  --secondary-50: oklch(0.2000 0.0800 300.0000);
  --secondary-100: oklch(0.2600 0.1000 300.0000);
  --secondary-200: oklch(0.3200 0.1200 300.0000);
  --secondary-300: oklch(0.3800 0.1400 300.0000);
  --secondary-400: oklch(0.4400 0.1600 300.0000);
  --secondary-500: oklch(0.5000 0.1800 300.0000);
  --secondary-600: oklch(0.5600 0.2000 300.0000);
  --secondary-700: oklch(0.6400 0.1800 300.0000);
  --secondary-800: oklch(0.7200 0.1600 300.0000);
  --secondary-900: oklch(0.8000 0.1200 300.0000);
  --secondary-foreground: oklch(0.9850 0 0);
  
  /* Brighter accent for dark mode */
  --accent: oklch(0.8000 0.2000 65.0000);
  --accent-50: oklch(0.3000 0.0800 65.0000);
  --accent-100: oklch(0.4000 0.1000 65.0000);
  --accent-200: oklch(0.5000 0.1200 65.0000);
  --accent-300: oklch(0.6000 0.1400 65.0000);
  --accent-400: oklch(0.7000 0.1600 65.0000);
  --accent-500: oklch(0.8000 0.2000 65.0000);
  --accent-600: oklch(0.8500 0.2200 65.0000);
  --accent-700: oklch(0.9000 0.2000 65.0000);
  --accent-800: oklch(0.9300 0.1800 65.0000);
  --accent-900: oklch(0.9600 0.1400 65.0000);
  --accent-foreground: oklch(0.1200 0.0500 264.0000);
  
  /* Dark mode neutrals */
  --muted: oklch(0.2500 0.0400 264.0000);
  --muted-foreground: oklch(0.7000 0.0200 264.0000);
  --subtle: oklch(0.3000 0.0600 264.0000);
  --subtle-foreground: oklch(0.8500 0.0200 264.0000);
  
  /* Dark mode grays */
  --gray-50: oklch(0.1400 0.0175 264.0000);
  --gray-100: oklch(0.1800 0.0200 264.0000);
  --gray-200: oklch(0.2400 0.0250 264.0000);
  --gray-300: oklch(0.3000 0.0300 264.0000);
  --gray-400: oklch(0.4200 0.0250 264.0000);
  --gray-500: oklch(0.5600 0.0200 264.0000);
  --gray-600: oklch(0.7000 0.0175 264.0000);
  --gray-700: oklch(0.8200 0.0150 264.0000);
  --gray-800: oklch(0.9000 0.0100 264.0000);
  --gray-900: oklch(0.9600 0.0075 264.0000);
  
  /* Dark mode semantics */
  --success: oklch(0.7500 0.1600 142.5000);
  --success-foreground: oklch(0.1200 0.0500 264.0000);
  --warning: oklch(0.8500 0.1600 85.8700);
  --warning-foreground: oklch(0.1200 0.0500 264.0000);
  --destructive: oklch(0.6500 0.2600 27.3250);
  --destructive-foreground: oklch(0.9850 0 0);
  --info: oklch(0.6500 0.2200 220.0000);
  --info-foreground: oklch(0.9850 0 0);
  
  /* Dark mode UI */
  --border: oklch(0.2750 0.0600 264.0000);
  --input: oklch(0.2000 0.0700 264.0000);
  --ring: oklch(0.5500 0.2000 264.0000);
  
  /* Dark mode gradients */
  --gradient-primary: linear-gradient(135deg, oklch(0.5500 0.2000 264.0000) 0%, oklch(0.5000 0.1800 300.0000) 100%);
  --gradient-card: linear-gradient(135deg, oklch(0.2400 0.0800 264.0000) 0%, oklch(0.2200 0.0700 290.0000) 100%);
  --gradient-accent: linear-gradient(135deg, oklch(0.8000 0.2000 65.0000) 0%, oklch(0.8500 0.1800 50.0000) 100%);
  
  /* Dark mode shadows */
  --shadow-xs: 0 1px 2px 0 hsl(264 50% 5% / 0.1);
  --shadow-sm: 0 1px 3px 0 hsl(264 50% 5% / 0.15), 0 1px 2px -1px hsl(264 50% 5% / 0.15);
  --shadow: 0 1px 3px 0 hsl(264 50% 5% / 0.15), 0 1px 2px -1px hsl(264 50% 5% / 0.15);
  --shadow-md: 0 4px 6px -1px hsl(264 50% 5% / 0.2), 0 2px 4px -2px hsl(264 50% 5% / 0.2);
  --shadow-lg: 0 10px 15px -3px hsl(264 50% 5% / 0.25), 0 4px 6px -4px hsl(264 50% 5% / 0.25);
  --shadow-xl: 0 20px 25px -5px hsl(264 50% 5% / 0.3), 0 8px 10px -6px hsl(264 50% 5% / 0.3);
  --shadow-2xl: 0 25px 50px -12px hsl(264 50% 5% / 0.4);
}

@theme inline {
  /* Color Tokens */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  
  /* Primary Colors (Blue/Purple) */
  --color-primary: var(--primary);
  --color-primary-50: var(--primary-50);
  --color-primary-100: var(--primary-100);
  --color-primary-200: var(--primary-200);
  --color-primary-300: var(--primary-300);
  --color-primary-400: var(--primary-400);
  --color-primary-500: var(--primary-500);
  --color-primary-600: var(--primary-600);
  --color-primary-700: var(--primary-700);
  --color-primary-800: var(--primary-800);
  --color-primary-900: var(--primary-900);
  --color-primary-foreground: var(--primary-foreground);
  
  /* Secondary Colors (Purple) */
  --color-secondary: var(--secondary);
  --color-secondary-50: var(--secondary-50);
  --color-secondary-100: var(--secondary-100);
  --color-secondary-200: var(--secondary-200);
  --color-secondary-300: var(--secondary-300);
  --color-secondary-400: var(--secondary-400);
  --color-secondary-500: var(--secondary-500);
  --color-secondary-600: var(--secondary-600);
  --color-secondary-700: var(--secondary-700);
  --color-secondary-800: var(--secondary-800);
  --color-secondary-900: var(--secondary-900);
  --color-secondary-foreground: var(--secondary-foreground);
  
  /* Accent Colors (Orange) */
  --color-accent: var(--accent);
  --color-accent-50: var(--accent-50);
  --color-accent-100: var(--accent-100);
  --color-accent-200: var(--accent-200);
  --color-accent-300: var(--accent-300);
  --color-accent-400: var(--accent-400);
  --color-accent-500: var(--accent-500);
  --color-accent-600: var(--accent-600);
  --color-accent-700: var(--accent-700);
  --color-accent-800: var(--accent-800);
  --color-accent-900: var(--accent-900);
  --color-accent-foreground: var(--accent-foreground);
  
  /* Utility Colors */
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-subtle: var(--subtle);
  --color-subtle-foreground: var(--subtle-foreground);
  
  /* Gray Scale (Blue-tinted) */
  --color-gray-50: var(--gray-50);
  --color-gray-100: var(--gray-100);
  --color-gray-200: var(--gray-200);
  --color-gray-300: var(--gray-300);
  --color-gray-400: var(--gray-400);
  --color-gray-500: var(--gray-500);
  --color-gray-600: var(--gray-600);
  --color-gray-700: var(--gray-700);
  --color-gray-800: var(--gray-800);
  --color-gray-900: var(--gray-900);
  
  /* Semantic Colors */
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-info: var(--info);
  --color-info-foreground: var(--info-foreground);
  
  /* UI Elements */
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);

  /* Typography */
  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
  --font-serif: var(--font-serif);

  /* Border Radius */
  --radius-sm: var(--radius-sm);
  --radius-md: var(--radius-md);
  --radius-lg: var(--radius-lg);
  --radius-xl: var(--radius-xl);
  --radius-2xl: var(--radius-2xl);
  --radius-3xl: var(--radius-3xl);
  --radius-full: var(--radius-full);

  /* Shadows */
  --shadow-xs: var(--shadow-xs);
  --shadow-sm: var(--shadow-sm);
  --shadow: var(--shadow);
  --shadow-md: var(--shadow-md);
  --shadow-lg: var(--shadow-lg);
  --shadow-xl: var(--shadow-xl);
  --shadow-2xl: var(--shadow-2xl);
  
  /* Spacing */
  --spacing-px: var(--spacing-px);
  --spacing-0: var(--spacing-0);
  --spacing-1: var(--spacing-1);
  --spacing-2: var(--spacing-2);
  --spacing-3: var(--spacing-3);
  --spacing-4: var(--spacing-4);
  --spacing-5: var(--spacing-5);
  --spacing-6: var(--spacing-6);
  --spacing-8: var(--spacing-8);
  --spacing-10: var(--spacing-10);
  --spacing-12: var(--spacing-12);
  --spacing-16: var(--spacing-16);
  --spacing-20: var(--spacing-20);
  --spacing-24: var(--spacing-24);
  --spacing-32: var(--spacing-32);
}
```

## Color System

### Primary Colors (Blue/Purple Spectrum)
The foundation of our design system uses rich blues and purples that create depth and sophistication.

- **Primary 50**: `bg-primary-50` - Very light blue tint
- **Primary 100**: `bg-primary-100` - Light blue background
- **Primary 500**: `bg-primary-500` - Main brand blue
- **Primary 600**: `bg-primary-600` - Hover state blue
- **Primary 900**: `bg-primary-900` - Deep navy blue

### Secondary Colors (Purple Variants)
Purple tones that complement the primary blues for gradients and accents.

- **Secondary 50**: `bg-secondary-50` - Light purple tint
- **Secondary 500**: `bg-secondary-500` - Main purple
- **Secondary 600**: `bg-secondary-600` - Darker purple
- **Secondary 900**: `bg-secondary-900` - Deep purple

### Accent Colors (Orange)
Vibrant orange used sparingly for highlights, sun icons, and call-to-action elements.

- **Accent 300**: `bg-accent-300` - Light orange
- **Accent 500**: `bg-accent-500` - Main orange (sun icon)
- **Accent 600**: `bg-accent-600` - Darker orange
- **Accent 900**: `bg-accent-900` - Deep orange

### Neutral Colors
Blue-tinted neutrals that maintain color harmony throughout the interface.

- **Background**: `bg-background` - Deep navy page background
- **Card**: `bg-card` - Card background (lighter navy)
- **Muted**: `bg-muted` - Subtle background elements
- **Gray Scale**: `bg-gray-50` through `bg-gray-900` - Blue-tinted grays

## Typography

### Font System

The application uses a two-font system optimized for weather data display and user interface:

- **DM Sans** (`--font-sans`): Primary font for body text, UI elements, and general content. Clean, highly legible sans-serif ideal for data display.
- **Bricolage Grotesque** (`--font-display`): Display font for headings, temperature values, and prominent text. Modern, distinctive character that adds personality while maintaining readability.

#### Font Usage Guidelines
- Use **DM Sans** for all body text, buttons, navigation, and data labels
- Use **Bricolage Grotesque** for temperature displays, page headings, section titles, and hero text
- Both fonts are loaded via Next.js Google Fonts with optimal performance settings

### Weather-Specific Typography Scale

#### Temperature Display
- **Temperature XL**: `text-9xl font-bold` - 128px/140px (Main temperature)
- **Temperature L**: `text-8xl font-bold` - 96px/104px (Secondary temp)
- **Temperature M**: `text-6xl font-bold` - 60px/68px (Hourly forecast)
- **Temperature S**: `text-4xl font-semibold` - 36px/44px (Small displays)

#### Headings
- **Display**: `text-5xl font-bold` - 48px/56px ("How's the sky looking today?")
- **H1**: `text-4xl font-bold` - 36px/44px (Location names)
- **H2**: `text-3xl font-semibold` - 30px/38px (Section headers)
- **H3**: `text-2xl font-semibold` - 24px/32px (Card titles)
- **H4**: `text-xl font-semibold` - 20px/28px (Subsections)

#### Body Text
- **Body L**: `text-lg` - 18px/28px (Descriptions)
- **Body M**: `text-base` - 16px/24px (Standard text)
- **Body S**: `text-sm` - 14px/20px (Secondary info)
- **Caption**: `text-xs` - 12px/16px (Time stamps, units)

## Weather Component Patterns

### Main Weather Card
```html
<div class="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl p-8 text-foreground shadow-xl">
  <div class="flex items-start justify-between mb-6">
    <div>
      <h1 class="text-4xl font-bold mb-2">Berlin, Germany</h1>
      <p class="text-lg text-primary-100">Tuesday, Aug 5, 2025</p>
    </div>
  </div>
  
  <div class="flex items-center justify-between">
    <div class="flex items-center space-x-4">
      <!-- Weather Icon -->
      <div class="text-accent-500 text-6xl">☀️</div>
      <div class="text-9xl font-bold">20°</div>
    </div>
  </div>
  
  <!-- Weather decorations -->
  <div class="absolute top-4 right-8 text-accent-400 text-2xl">✨</div>
  <div class="absolute bottom-6 left-12 text-primary-200 text-xl">❄️</div>
</div>
```

### Weather Stats Cards
```html
<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
  <div class="bg-card rounded-xl p-4 text-card-foreground border border-border">
    <h3 class="text-sm text-muted-foreground mb-1">Feels Like</h3>
    <p class="text-2xl font-bold">18°</p>
  </div>
  
  <div class="bg-card rounded-xl p-4 text-card-foreground border border-border">
    <h3 class="text-sm text-muted-foreground mb-1">Humidity</h3>
    <p class="text-2xl font-bold">46%</p>
  </div>
  
  <div class="bg-card rounded-xl p-4 text-card-foreground border border-border">
    <h3 class="text-sm text-muted-foreground mb-1">Wind</h3>
    <p class="text-2xl font-bold">14 km/h</p>
  </div>
  
  <div class="bg-card rounded-xl p-4 text-card-foreground border border-border">
    <h3 class="text-sm text-muted-foreground mb-1">Precipitation</h3>
    <p class="text-2xl font-bold">0 mm</p>
  </div>
</div>
```

### Hourly Forecast
```html
<div class="bg-card rounded-xl p-6 text-card-foreground border border-border">
  <div class="flex items-center justify-between mb-4">
    <h2 class="text-xl font-semibold">Hourly forecast</h2>
    <select class="bg-muted text-muted-foreground rounded-lg px-3 py-1 text-sm">
      <option>Tuesday</option>
    </select>
  </div>
  
  <div class="space-y-3">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <span class="text-muted-foreground text-lg">☁️</span>
        <span class="text-base">3 PM</span>
      </div>
      <span class="text-lg font-semibold">20°</span>
    </div>
    
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <span class="text-muted-foreground text-lg">⛅</span>
        <span class="text-base">4 PM</span>
      </div>
      <span class="text-lg font-semibold">20°</span>
    </div>
    
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <span class="text-accent-500 text-lg">☀️</span>
        <span class="text-base">5 PM</span>
      </div>
      <span class="text-lg font-semibold">20°</span>
    </div>
  </div>
</div>
```

### Search Bar
```html
<div class="flex items-center space-x-4 max-w-2xl mx-auto">
  <div class="relative flex-1">
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg class="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
    </div>
    <input class="w-full bg-input border border-border rounded-xl pl-10 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:border-ring outline-none transition-all" 
           type="text" placeholder="Search for a place...">
  </div>
  
  <button class="bg-primary text-primary-foreground hover:bg-primary-600 font-medium px-6 py-3 rounded-xl transition-colors focus:ring-2 focus:ring-ring focus:ring-offset-2 outline-none">
    Search
  </button>
</div>
```

### Units Toggle
```html
<button class="bg-subtle text-subtle-foreground hover:bg-muted font-medium px-4 py-2 rounded-lg transition-colors focus:ring-2 focus:ring-ring focus:ring-offset-2 outline-none flex items-center space-x-2">
  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
  </svg>
  <span>Units</span>
  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
  </svg>
</button>
```

## Layout Patterns

### Weather App Layout
```html
<div class="min-h-screen bg-background text-foreground">
  <!-- Header -->
  <header class="flex items-center justify-between p-6">
    <div class="flex items-center space-x-3">
      <div class="text-accent-500 text-2xl">☀️</div>
      <h1 class="text-2xl font-bold">Weather Now</h1>
    </div>
    <!-- Units toggle here -->
  </header>
  
  <!-- Main Content -->
  <main class="max-w-7xl mx-auto px-6 pb-12">
    <!-- Search section -->
    <div class="text-center mb-12">
      <h1 class="text-5xl font-bold mb-8">How's the sky looking today?</h1>
      <!-- Search bar here -->
    </div>
    
    <!-- Weather grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main weather card (spans 2 columns) -->
      <div class="lg:col-span-2">
        <!--