# Architecture Overview

This document provides a high-level overview of the weather application architecture. For detailed information, see the specialized documentation files listed below.

## Architecture Documentation

The architecture has been organized into focused documents for better maintainability and easier navigation:

### Core Architecture
- **[Tech Stack & Rationale](tech-stack.md)** - Technology choices and system context
- **[Data Model & API Layer](data-model.md)** - Data structures and API integration
- **[State Management](state-management.md)** - Zustand store structure and persistence

### User Experience
- **[UI Components & Theming](ui-components.md)** - Component architecture and design system
- **[Routing & Layout](routing-layout.md)** - Route structure and page layouts
- **[Accessibility & i18n](accessibility-i18n.md)** - A11y compliance and internationalization

### Advanced Features
- **[PWA & Offline](pwa-offline.md)** - Progressive Web App capabilities and offline experience
- **[Performance & Testing](performance-testing.md)** - Performance budgets and testing strategies
- **[Security & Privacy](security-privacy.md)** - Security measures and privacy compliance

### Development
- **[File Structure](file-structure.md)** - Project organization and extension points
- **[User Flows](user-flows.md)** - Primary user journeys and happy paths

## Quick Reference

### Key Technologies
- **Next.js 15** with App Router and TypeScript
- **TanStack Query** for server state management
- **Zustand** for client state with persistence
- **Tailwind CSS** + **shadcn/ui** for styling
- **Rive** for weather animations
- **next-pwa** for offline capabilities

### Core Features
- Real-time weather data from Open-Meteo API
- Location search with geocoding
- 7-day forecast with hourly details
- Air quality and pollen information
- Voice search capabilities
- Offline support with service workers
- Progressive Web App installation

### Performance Targets
- Initial JS bundle ≤ 300KB gzipped
- TTI < 2.5s on mid-tier mobile
- FCP < 1.8s, LCP < 2.5s
- Lighthouse accessibility score ≥95

For implementation details and specific technical requirements, refer to the individual architecture documents listed above.
