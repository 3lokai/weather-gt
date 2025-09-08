# E2 - Theming & Visual System Stories

This directory contains individual story files for Epic E2 - Theming & Visual System. Each story represents a specific aspect of the design system and visual theming that needs to be implemented.

## Story Files

### P0 Stories (Must have for demo)
- **[E2-01 - OKLCH Token System](./e2-01-oklch-token-system.md)** - CSS variables wired to Tailwind with light/dark base
- **[E2-02 - Condition Themes + Icon Map](./e2-02-condition-themes-icon-map.md)** - WMO weather code mapping to themes and icons

### P1 Stories (Strongly desired)
- **[E2-03 - Animated Backgrounds](./e2-03-animated-backgrounds.md)** - Subtle gradients per condition with night variants

## Implementation Order

Based on dependencies, recommended implementation order:

1. **E2-01** (OKLCH Token System) - Foundation for all theming
2. **E2-02** (Condition Themes + Icon Map) - Depends on E2-01
3. **E2-03** (Animated Backgrounds) - Depends on E2-02

## Cross-Epic Dependencies

- **E2-01 → E2-02 → E2-03** (tokens → themes → animations)
- **E2-02 → E5-01** (themes/map → Rive hero animations)
- **E2-02** - Recommended for E1-02 (Current Conditions Card)

## Design System Architecture

### Token System (E2-01)
- OKLCH color space for better accessibility and consistency
- CSS custom properties for all design tokens
- Tailwind CSS integration
- Light/dark mode support
- AA contrast compliance

### Theme System (E2-02)
- WMO weather code mapping
- 7 condition groups: clear, cloudy, overcast, fog, rain, snow, thunder
- Day/night variants
- Icon system integration
- Background gradient system

### Animation System (E2-03)
- Subtle background animations
- Night variants
- Reduced motion support
- Performance-optimized transitions

## Global Definition of Done

All stories inherit these requirements:
- **Accessibility**: Keyboard + visible focus + ARIA patterns; AA contrast
- **Performance**: No unexpected layout shift; cached where applicable
- **Testing**: Unit for mappers/formatters; component tests; E2E happy path
- **Docs**: README + changelog updated; component props documented
