/**
 * Design Tokens for Weather GT
 * 
 * This file exports design tokens for consistent styling across the application.
 * These tokens are based on the visual parity requirements and follow the
 * spacing scale (2/4/6/8/12/16/24/32...) and radius scale (12/16/20/24px).
 */

// Spacing Scale - Visual Parity (2/4/6/8/12/16/24/32...)
export const spacing = {
  px: '1px',
  '0': '0',
  '1': '0.125rem',  // 2px
  '2': '0.25rem',   // 4px
  '3': '0.375rem',  // 6px
  '4': '0.5rem',    // 8px
  '5': '0.625rem',  // 10px
  '6': '0.75rem',   // 12px
  '7': '0.875rem',  // 14px
  '8': '1rem',      // 16px
  '9': '1.125rem',  // 18px
  '10': '1.25rem',  // 20px
  '11': '1.375rem', // 22px
  '12': '1.5rem',   // 24px
  '14': '1.75rem',  // 28px
  '16': '2rem',     // 32px
  '20': '2.5rem',   // 40px
  '24': '3rem',     // 48px
  '28': '3.5rem',   // 56px
  '32': '4rem',     // 64px
  '36': '4.5rem',   // 72px
  '40': '5rem',     // 80px
  '44': '5.5rem',   // 88px
  '48': '6rem',     // 96px
  '52': '6.5rem',   // 104px
  '56': '7rem',     // 112px
  '60': '7.5rem',   // 120px
  '64': '8rem',     // 128px
  '72': '9rem',     // 144px
  '80': '10rem',    // 160px
  '96': '12rem',    // 192px
} as const;

// Border Radius Scale - Visual Parity (12/16/20/24px)
export const radius = {
  xs: '0.5rem',   // 8px
  sm: '0.75rem',  // 12px
  md: '1rem',     // 16px
  lg: '1.25rem',  // 20px
  xl: '1.5rem',   // 24px
  '2xl': '1.75rem', // 28px
  '3xl': '2rem',    // 32px
  full: '9999px',
} as const;

// Shadow Tokens
export const shadows = {
  xs: '0 1px 2px 0 hsl(264 20% 20% / 0.08)',
  sm: '0 1px 3px 0 hsl(264 20% 20% / 0.12), 0 1px 2px -1px hsl(264 20% 20% / 0.12)',
  md: '0 4px 6px -1px hsl(264 20% 20% / 0.15), 0 2px 4px -2px hsl(264 20% 20% / 0.15)',
  lg: '0 10px 15px -3px hsl(264 20% 20% / 0.18), 0 4px 6px -4px hsl(264 20% 20% / 0.18)',
  xl: '0 20px 25px -5px hsl(264 20% 20% / 0.22), 0 8px 10px -6px hsl(264 20% 20% / 0.22)',
  '2xl': '0 25px 50px -12px hsl(264 20% 20% / 0.25)',
} as const;

// Typography Scale
export const typography = {
  // Display sizes
  'temp-xl': {
    fontFamily: 'var(--font-display)',
    fontSize: '152px',
    lineHeight: '160px',
    fontWeight: '700',
  },
  'temp-l': {
    fontFamily: 'var(--font-display)',
    fontSize: '112px',
    lineHeight: '120px',
    fontWeight: '700',
  },
  'temp-m': {
    fontFamily: 'var(--font-display)',
    fontSize: '72px',
    lineHeight: '80px',
    fontWeight: '700',
  },
  'temp-s': {
    fontFamily: 'var(--font-display)',
    fontSize: '44px',
    lineHeight: '52px',
    fontWeight: '600',
  },
  display: {
    fontFamily: 'var(--font-display)',
    fontSize: '60px',
    lineHeight: '68px',
    fontWeight: '700',
  },
  h1: {
    fontFamily: 'var(--font-display)',
    fontSize: '44px',
    lineHeight: '52px',
    fontWeight: '700',
  },
  h2: {
    fontFamily: 'var(--font-display)',
    fontSize: '36px',
    lineHeight: '44px',
    fontWeight: '600',
  },
  h3: {
    fontFamily: 'var(--font-display)',
    fontSize: '28px',
    lineHeight: '36px',
    fontWeight: '600',
  },
  h4: {
    fontFamily: 'var(--font-display)',
    fontSize: '24px',
    lineHeight: '32px',
    fontWeight: '600',
  },
  'body-l': {
    fontSize: '20px',
    lineHeight: '30px',
  },
  'body-m': {
    fontSize: '18px',
    lineHeight: '26px',
  },
  'body-s': {
    fontSize: '16px',
    lineHeight: '22px',
  },
  caption: {
    fontSize: '14px',
    lineHeight: '18px',
  },
} as const;

// Glass Morphism Effects
export const glassEffects = {
  base: {
    backdropFilter: 'blur(16px) saturate(180%)',
    background: 'oklch(from var(--card) l c h / 0.75)',
    border: '1px solid oklch(from var(--border) l c h / 0.2)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-lg), inset 0 1px 0 oklch(from var(--foreground) l c h / 0.1)',
  },
  strong: {
    backdropFilter: 'blur(24px) saturate(200%)',
    background: 'oklch(from var(--card) l c h / 0.85)',
    border: '1px solid oklch(from var(--border) l c h / 0.3)',
    borderRadius: 'var(--radius-xl)',
    boxShadow: 'var(--shadow-xl), inset 0 1px 0 oklch(from var(--foreground) l c h / 0.15), inset 0 -1px 0 oklch(from var(--foreground) l c h / 0.05)',
  },
  subtle: {
    backdropFilter: 'blur(8px) saturate(150%)',
    background: 'oklch(from var(--card) l c h / 0.6)',
    border: '1px solid oklch(from var(--border) l c h / 0.15)',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-md), inset 0 1px 0 oklch(from var(--foreground) l c h / 0.08)',
  },
} as const;

// Weather-specific theme tokens
export const weatherThemes = {
  'clear-day': {
    accent: 'oklch(0.8600 0.1400 85.0000)', // warm amber
  },
  'clear-night': {
    accent: 'oklch(0.7500 0.1000 85.0000)', // dimmed amber
  },
  rain: {
    accent: 'oklch(0.7000 0.1200 250.0000)', // blue
  },
  snow: {
    accent: 'oklch(0.8500 0.0800 250.0000)', // crisp icy blue
  },
  cloudy: {
    accent: 'oklch(0.7200 0.0600 260.0000)', // neutral slate
  },
  fog: {
    accent: 'oklch(0.7200 0.0600 260.0000)', // neutral slate
  },
  thunder: {
    accent: 'oklch(0.7400 0.1500 300.0000)', // violet
  },
} as const;

// Export all tokens as a single object for easy access
export const designTokens = {
  spacing,
  radius,
  shadows,
  typography,
  glassEffects,
  weatherThemes,
} as const;

// Type definitions for better TypeScript support
export type SpacingKey = keyof typeof spacing;
export type RadiusKey = keyof typeof radius;
export type ShadowKey = keyof typeof shadows;
export type TypographyKey = keyof typeof typography;
export type WeatherThemeKey = keyof typeof weatherThemes;
