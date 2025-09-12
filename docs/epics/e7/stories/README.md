# E7 - Polish & Demo Stories

This directory contains individual story files for Epic E7 - Polish & Demo. Each story represents a critical aspect of production readiness, user experience polish, and demo functionality.

## Story Files

### P0 Stories (Must have for demo)
- **[E7-01 - Settings Drawer](./e7-01-settings-drawer.md)** - User preferences and app configuration
- **[E7-02 - Deep Links & Share](./e7-02-deep-links-share.md)** - URL state management and sharing
- **[E7-06 - Quality Gates](./e7-06-quality-gates.md)** - CI/CD, testing, and performance standards

### P1 Stories (Strongly desired)
- **[E7-03 - Offline/Network UX](./e7-03-offline-network-ux.md)** - Network failure handling and offline states
- **[E7-04 - Keyboard Shortcuts](./e7-04-keyboard-shortcuts.md)** - Power user keyboard shortcuts

### P2 Stories (Nice to have)
- **[E7-07 - Demo Mode](./e7-07-demo-mode.md)** - Curated demo experience for judges
- **[E7-08 - Moon Phase & Wind Arrow](./e7-08-moon-phase-wind-arrow.md)** - Enhanced weather visuals

## Implementation Order

Based on dependencies and priority, recommended implementation order:

1. **E7-06** (Quality Gates) - Foundation for all development
2. **E7-01** (Settings Drawer) - Depends on E1-06 and i18n
3. **E7-02** (Deep Links & Share) - Core functionality for demo
4. **E7-03** (Offline/Network UX) - Depends on E6-01 (PWA)
5. **E7-04** (Keyboard Shortcuts) - Enhances user experience
7. **E7-07** (Demo Mode) - Depends on E6-01 (PWA)
8. **E7-08** (Moon Phase & Wind Arrow) - Nice-to-have enhancements

## Cross-Epic Dependencies

- **E7-01** depends on E1-06 (units & time format) and i18n
- **E7-03** depends on E6-01 (PWA baseline)
- **E7-07** depends on E6-01 (PWA baseline)
- **E7-08** depends on E1 data (weather information)

## Production Readiness Architecture

### Quality Assurance (E7-06)
- Strict TypeScript configuration
- ESLint/Prettier code quality
- Axe accessibility testing
- Lighthouse CI with ≥95 scores
- Performance budget monitoring
- Automated CI/CD pipeline

### User Experience (E7-01, E7-02, E7-04)
- Comprehensive settings management
- Deep linking and state persistence
- Keyboard shortcuts for power users
- Share functionality for mobile

### Resilience (E7-03)
- Offline detection and handling
- Network failure recovery
- Graceful error states
- Cached data management

### Documentation (E7-05)
- Component documentation
- Interactive examples
- Visual testing
- Design system showcase

### Demo Features (E7-07, E7-08)
- Curated demo experience
- Enhanced weather visuals
- Offline demo functionality

## Global Definition of Done

All stories inherit these requirements:
- **Accessibility**: Keyboard + visible focus + ARIA patterns; AA contrast
- **Performance**: No unexpected layout shift; cached where applicable
- **Testing**: Unit for mappers/formatters; component tests; E2E happy path
- **Docs**: README + changelog updated; component props documented
