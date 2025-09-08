# Performance & Testing

## Performance Budget

### JavaScript Bundle Size
* **Initial JS**: ≤ 300KB gzipped
* **Lazy Loading**: Rive animations and charts loaded on demand
* **Code Splitting**: Route-based and component-based splitting
* **Tree Shaking**: Remove unused code from bundles

### Core Web Vitals Targets
* **TTI (Time to Interactive)**: < 2.5s on mid-tier mobile
* **FCP (First Contentful Paint)**: < 1.8s
* **LCP (Largest Contentful Paint)**: < 2.5s
* **CLS (Cumulative Layout Shift)**: < 0.1

### Optimization Strategies
* **Debounce**: 300ms geocode requests; cancel inflight on input change
* **Prefetching**: `prefetchQuery` on day hover for better UX
* **Content Visibility**: Use `content-visibility` for off-screen content
* **Image Optimization**: WebP format, responsive images, lazy loading

## Testing Strategy

### Unit Testing
* **Framework**: Vitest for fast unit testing
* **Coverage**: Mappers, trend calculations, query builders
* **Mocking**: API responses and external dependencies
* **Snapshots**: Component output snapshots for regression testing

### Component Testing
* **Framework**: React Testing Library (RTL)
* **Focus Areas**: Combobox, tabs, weather cards
* **User Interactions**: Click, keyboard navigation, form inputs
* **Accessibility**: Automated a11y testing with jest-axe

### End-to-End Testing
* **Framework**: Playwright for cross-browser testing
* **Happy Paths**: Complete user journeys from search to weather display
* **Offline Mode**: Test PWA functionality and offline experience
* **Performance**: Measure Core Web Vitals in real conditions

### Accessibility Testing
* **Automated**: axe-core integration in CI pipeline
* **Lighthouse CI**: Accessibility score ≥95
* **Manual Testing**: Screen reader and keyboard navigation
* **User Testing**: Testing with users with disabilities

## Analytics & Monitoring

### User Analytics (Optional)
* **Events Tracked**:
  * `search` - Location search events
  * `geolocate` - GPS location requests
  * `units_change` - Unit preference changes
  * `theme_change` - Theme mode changes
  * `favorite_add/remove` - Favorite location management
  * `compare_add/remove` - Compare view usage
  * `install_prompt` - PWA installation prompts
  * `voice_search` - Voice search usage

### Performance Monitoring
* **Real User Monitoring**: Core Web Vitals from actual users
* **Error Tracking**: JavaScript errors and API failures
* **API Performance**: Response times and error rates
* **Cache Hit Rates**: Service worker cache effectiveness

### Privacy-First Analytics
* **No Personal Data**: No user identification or tracking
* **Aggregate Metrics**: Only anonymous usage statistics
* **Local Processing**: Analytics processed client-side when possible
* **Opt-out**: Easy way for users to disable analytics

## Error Handling & Monitoring

### Error Types
* **Unified AppError**: `{ kind: 'network'|'rate'|'parse'|'empty' }`
* **Network Errors**: Connection issues, timeouts
* **Rate Limiting**: API rate limit exceeded
* **Parse Errors**: Invalid API responses
* **Empty Results**: No data returned

### Error Recovery
* **Retry Logic**: Exponential backoff for failed requests
* **Fallback UI**: Show cached data with "Last updated" timestamp
* **User Feedback**: Toast notifications for errors
* **Graceful Degradation**: Continue functioning with reduced features

### Monitoring & Alerting
* **Error Tracking**: Capture and report JavaScript errors
* **API Monitoring**: Track API response times and error rates
* **User Experience**: Monitor Core Web Vitals and user interactions
* **Alerting**: Notify team of critical issues or performance degradation

## Quality Assurance

### Code Quality
* **TypeScript**: Strict type checking and null safety
* **ESLint**: Code style and best practices enforcement
* **Prettier**: Consistent code formatting
* **Husky**: Pre-commit hooks for quality checks

### Performance Testing
* **Lighthouse CI**: Automated performance audits
* **Bundle Analysis**: Monitor bundle size and dependencies
* **Load Testing**: Test API performance under load
* **Memory Profiling**: Identify memory leaks and optimization opportunities

### Security Testing
* **Dependency Scanning**: Check for vulnerable dependencies
* **Content Security Policy**: Enforce CSP headers
* **XSS Prevention**: Sanitize user inputs and API responses
* **HTTPS Enforcement**: Ensure all connections are secure
