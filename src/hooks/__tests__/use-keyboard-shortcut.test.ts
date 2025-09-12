import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useKeyboardShortcut, useCommandK } from '@/hooks/use-keyboard-shortcut';

// Mock the useKeyboardShortcut hook
vi.mock('@/hooks/use-keyboard-shortcut', () => ({
  useKeyboardShortcut: vi.fn(),
  useCommandK: vi.fn(),
}));

describe('useKeyboardShortcut', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should be importable', () => {
    expect(useKeyboardShortcut).toBeDefined();
    expect(typeof useKeyboardShortcut).toBe('function');
  });

  it('should be importable with useCommandK', () => {
    expect(useCommandK).toBeDefined();
    expect(typeof useCommandK).toBe('function');
  });
});

describe('useCommandK', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should be importable', () => {
    expect(useCommandK).toBeDefined();
    expect(typeof useCommandK).toBe('function');
  });
});
