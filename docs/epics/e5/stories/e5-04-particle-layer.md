# E5-04 (P2) Particle Layer

## Description
Particle density scales with condition; disables on reduced-motion; falls back to static noise.

## Acceptance Criteria

* Particle density scales with condition; disables on reduced-motion; falls back to static noise.

## Dependencies
E2-02, E2-03

## Priority
P2 (Nice to have for demo)

## Definition of Done
- [ ] Accessibility: Keyboard + visible focus + ARIA patterns; AA contrast
- [ ] Performance: No unexpected layout shift; cached where applicable
- [ ] Testing: Unit for mappers/formatters; component tests for particle layer; E2E happy path
- [ ] Docs: README + changelog updated; component props documented

## Technical Notes
- Implement particle system that responds to weather conditions
- Scale particle density based on weather intensity (light rain = few particles, heavy storm = many particles)
- Respect `prefers-reduced-motion` setting to disable animations
- Provide fallback to static noise texture when particles are disabled
- Use CSS animations or WebGL for particle rendering
- Consider performance impact on mobile devices
- Integrate with weather condition mapping system
- Ensure particles don't interfere with UI readability
- Add configuration options for particle intensity
- Test across different weather conditions and device capabilities
- Consider using Rive for complex particle animations

## Related Files
- `src/components/background/` - Background and particle components
- `src/lib/weather-conditions/` - Weather condition mapping
- `src/hooks/use-reduced-motion.ts` - Reduced motion preference hook
- `src/styles/particles.css` - Particle animation styles

## Status
Done