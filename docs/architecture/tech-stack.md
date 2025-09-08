# Tech Stack & Rationale

## Core Technologies

* **Next.js (App Router) + TypeScript**: File‑system routing, SSR/SSG optional (client‑first for API).
* **Tailwind + shadcn/ui + ReactBits**: Design system, fast composition, command palette, skeletons.
* **TanStack Query**: Remote data cache (SWR), retries, de‑dupe, background refetch.
* **Zustand (persist)**: UI/app state (units, theme, favorites, selected location/day).
* **Rive**: Lightweight vector animation for hero; inputs bound to weather state.
* **next‑pwa**: Manifest + SW; offline shell + stale‑while‑revalidate for API.
* **Recharts**: Hourly temp/precip lines; small multiples in Compare.

## System Context

Frontend‑only web app. External services (all Open‑Meteo):

* **/v1/search** (geocoding)
* **/v1/forecast** (current/hourly/daily)
* **/v1/air‑quality** (AQI gases + particulates)
* **pollen.open‑meteo.com/v1/forecast** (pollen indices)
  Client obtains timezone via OM or Intl API; no server storage.

## Technology Choices Rationale

### Next.js App Router
- File-system routing for intuitive navigation structure
- Built-in SSR/SSG capabilities for performance optimization
- Client-first approach for API interactions

### Design System (Tailwind + shadcn/ui + ReactBits)
- Tailwind for utility-first styling and rapid development
- shadcn/ui for consistent, accessible component library
- ReactBits for additional UI patterns and command palette functionality

### State Management
- **TanStack Query**: Handles server state with caching, retries, and background updates
- **Zustand**: Manages client state with persistence for user preferences

### Animation & Visualization
- **Rive**: Lightweight vector animations for weather hero section
- **Recharts**: Data visualization for weather charts and comparisons

### PWA Capabilities
- **next-pwa**: Service worker implementation for offline functionality
- Stale-while-revalidate strategy for API caching
