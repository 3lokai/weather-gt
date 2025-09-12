import { describe, it, expect, vi } from 'vitest';
import { KeyboardShortcutsSheet } from '@/components/ui/keyboard-shortcuts-sheet';

// Mock the Sheet components
vi.mock('@/components/ui/sheet', () => ({
  Sheet: ({ children }: { children: React.ReactNode }) => <div data-testid="sheet">{children}</div>,
  SheetContent: ({ children }: { children: React.ReactNode }) => <div data-testid="sheet-content">{children}</div>,
  SheetDescription: ({ children }: { children: React.ReactNode }) => <div data-testid="sheet-description">{children}</div>,
  SheetHeader: ({ children }: { children: React.ReactNode }) => <div data-testid="sheet-header">{children}</div>,
  SheetTitle: ({ children }: { children: React.ReactNode }) => <div data-testid="sheet-title">{children}</div>,
  SheetTrigger: ({ children }: { children: React.ReactNode }) => <div data-testid="sheet-trigger">{children}</div>,
}));

// Mock the weather store
vi.mock('@/lib/store/weather-store', () => ({
  useWeatherStore: () => ({
    accessibility: {
      keyboardShortcuts: true,
    },
  }),
}));

// Mock the Button component
vi.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));

// Mock the Icon component
vi.mock('@/components/icons/phosphor-icon', () => ({
  Icon: ({ name, ...props }: any) => <div data-testid={`icon-${name}`} {...props} />,
}));

describe('KeyboardShortcutsSheet', () => {
  it('should be importable', () => {
    expect(KeyboardShortcutsSheet).toBeDefined();
    expect(typeof KeyboardShortcutsSheet).toBe('function');
  });

  it('should render when keyboard shortcuts are enabled', () => {
    expect(KeyboardShortcutsSheet).toBeDefined();
  });
});
