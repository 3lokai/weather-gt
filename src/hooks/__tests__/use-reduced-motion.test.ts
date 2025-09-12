import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock the weather store
vi.mock('@/lib/store/weather-store', () => ({
  useWeatherStore: vi.fn()
}));

// Mock React hooks
const mockUseEffect = vi.fn();
vi.mock('react', () => ({
  useEffect: mockUseEffect
}));

describe('useReducedMotion', () => {
  const mockDocumentElement = {
    classList: {
      add: vi.fn(),
      remove: vi.fn()
    }
  };

  beforeEach(() => {
    // Mock document.documentElement
    Object.defineProperty(document, 'documentElement', {
      value: mockDocumentElement,
      writable: true
    });

    // Reset mocks
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should be importable', async () => {
    const { useReducedMotion } = await import('../use-reduced-motion');
    expect(useReducedMotion).toBeDefined();
    expect(typeof useReducedMotion).toBe('function');
  });

  it('should call useEffect when imported', async () => {
    await import('../use-reduced-motion');
    expect(mockUseEffect).toHaveBeenCalled();
  });
});
