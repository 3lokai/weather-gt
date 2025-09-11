# Storybook Configuration

This directory contains the Storybook configuration for the Weather GT project.

## Files

- `main.ts` - Main Storybook configuration with addons and framework setup
- `preview.ts` - Global decorators, providers, and story parameters
- `README.md` - This documentation file

## Configuration Overview

### Framework
- **Next.js**: Using `@storybook/nextjs` for seamless Next.js integration
- **TypeScript**: Full TypeScript support with proper type checking
- **Vite**: Fast bundling and hot reload

### Addons
- **@storybook/addon-essentials**: Core addons (docs, controls, viewport, backgrounds)
- **@storybook/addon-a11y**: Accessibility testing with axe-core
- **@storybook/addon-interactions**: User interaction testing and keyboard flows

### Global Decorators
- **ThemeProvider**: Next-themes integration for dark/light mode
- **QueryClientProvider**: TanStack Query mock client for data fetching
- **Theme Classes**: Automatic application of theme classes (.dark, .theme--rain, etc.)

### Viewports
- **Mobile**: 375px × 667px
- **Tablet**: 768px × 1024px
- **Desktop**: 1024px × 768px

### Backgrounds
- Light, dark, and weather condition themes (rain, cloudy, snow, thunder)

## Usage

### Running Storybook
```bash
npm run storybook
```

### Building Storybook
```bash
npm run build-storybook
```

### Writing Stories

Stories should be placed in the `src/stories/` directory with the following structure:

```
src/stories/
├── foundations/     # Design system stories
├── components/      # Component stories
└── fixtures/        # Mock data for stories
```

### Story Requirements

Each story should:
1. Import the component and any required dependencies
2. Define proper TypeScript types using `Meta` and `StoryObj`
3. Include comprehensive argTypes for controls
4. Provide multiple story variants (Default, variants, states)
5. Include proper documentation and descriptions
6. Use fixture data from `src/stories/fixtures/` when needed

### Theme Integration

Stories automatically support:
- **Dark/Light Mode**: Toggle via toolbar
- **Weather Conditions**: Apply condition themes via toolbar
- **Reduced Motion**: Respects user preferences

### Mock Data

Use the fixture data from `src/stories/fixtures/weather-data.ts` for consistent mock data across stories.

## Best Practices

1. **Component Isolation**: Each story should demonstrate the component in isolation
2. **State Management**: Use mock providers for Zustand and TanStack Query
3. **Accessibility**: Always run a11y addon checks
4. **Responsive Design**: Test across all configured viewports
5. **Theme Testing**: Verify components work in all theme modes
6. **Documentation**: Include clear descriptions and usage examples

## Troubleshooting

### Common Issues

1. **Import Errors**: Ensure all imports use the `@/` alias
2. **Theme Issues**: Check that `globals.css` is properly imported
3. **Provider Conflicts**: Verify decorator order in preview.ts
4. **Type Errors**: Run `npm run typecheck` to verify TypeScript setup

### Development Tips

- Use the browser dev tools to inspect component states
- Leverage the controls panel to test different prop combinations
- Use the accessibility addon to catch a11y issues early
- Test keyboard navigation with the interactions addon
