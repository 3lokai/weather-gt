# E1-08 (P1) Precipitation Probability Everywhere

## Description
Add PoP to current badge, daily chips, hourly tooltip.

## Acceptance Criteria

* ✅ PoP shown as %; when missing regionally, UI gracefully hides.

## Dependencies
E1-05.

## Priority
P1 (Strongly desired)

## Status
✅ **COMPLETED** - Ready for Review

## Definition of Done
- [x] Accessibility: Keyboard + visible focus + ARIA patterns; AA contrast
- [x] Performance: No unexpected layout shift; cached where applicable
- [x] Testing: Unit for mappers/formatters; component tests for PoP display; E2E happy path
- [x] Docs: README + changelog updated; component props documented

## Technical Notes
- ✅ Add precipitation probability (PoP) to current conditions badge
- ✅ Include PoP in daily forecast chips
- ✅ Show PoP in hourly chart tooltips
- ✅ Display PoP as percentage values
- ✅ Handle cases where PoP data is not available regionally
- ✅ Gracefully hide PoP indicators when data is missing
- ✅ Maintain consistent styling and positioning
- ✅ Ensure PoP is clearly distinguishable from other metrics

## Implementation Details

### Components Updated
1. **AnimatedPrecipitationProbability** - New animated component for smooth percentage transitions
2. **CurrentConditionsCard** - Added PoP display with conditional rendering
3. **DailyForecastChip** - Enhanced existing PoP with animated components
4. **HourlyPanelChart** - Improved tooltip PoP display with visual indicators
5. **MetricsGrid** - Added "Rain Chance" metric with conditional display

### Key Features
- **Percentage Display**: All PoP values shown as percentages (e.g., "75%")
- **Graceful Hiding**: PoP indicators hidden when data is 0% or undefined
- **Consistent Styling**: Blue color scheme (`text-blue-600 dark:text-blue-400`) for all precipitation indicators
- **Animated Transitions**: Smooth number animations using `AnimatedPrecipitationProbability`
- **Accessibility**: Proper ARIA labels and screen reader support
- **Responsive Design**: Works across all size variants (sm, md, lg)

### Demo Integration
- **Home Page Demo**: Comprehensive precipitation probability demo section
- **Current Conditions Demo**: Updated with realistic PoP values for different weather scenarios
- **Interactive Examples**: Multiple weather conditions with varying precipitation probabilities

### Demo Coverage
- **Status**: Comprehensive demo sections have been added to the home page showcasing all PoP functionality
- **Coverage**: Demo includes light/dark themes, mobile/desktop responsive design, and multiple WMO weather conditions

## Related Files
- `src/lib/api/open-meteo.ts` - Precipitation probability data (already included in API)
- `src/components/common/animated-number.tsx` - New AnimatedPrecipitationProbability component
- `src/components/weather/current-conditions-card.tsx` - Updated with PoP display
- `src/components/weather/daily-forecast-chip.tsx` - Enhanced PoP display
- `src/components/weather/hourly-panel-chart.tsx` - Improved tooltip PoP
- `src/components/weather/metrics-grid.tsx` - Added Rain Chance metric
- `src/app/page.tsx` - Added comprehensive PoP demo section
