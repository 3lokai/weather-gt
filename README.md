# Weather GT

A modern weather application built with Next.js 15, React 19, and TypeScript, featuring a comprehensive OKLCH-based design system.

## Design System

This project uses a sophisticated OKLCH color token system for consistent, accessible theming:

### Color System
- **OKLCH Color Space**: Better color consistency and accessibility than traditional RGB/HSL
- **Light/Dark Themes**: Automatic theme switching with proper contrast ratios
- **Weather Condition Themes**: Dynamic accent colors based on weather conditions
- **Semantic Tokens**: Primary, secondary, accent, and semantic color scales

### Key Features
- AA contrast compliance in both light and dark modes
- Weather-specific color theming (clear, rain, snow, cloudy, fog, thunder)
- Comprehensive typography scale optimized for weather data display
- Custom gradients and shadows for depth and visual hierarchy

### Usage
The design system is implemented in `src/app/globals.css` using Tailwind CSS v4's `@theme` directive. All color tokens are available as CSS custom properties and can be used throughout the application.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
