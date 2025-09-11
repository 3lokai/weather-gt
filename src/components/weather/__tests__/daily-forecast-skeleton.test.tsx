import { render, screen } from '@testing-library/react';
import { DailyForecastSkeleton } from '../daily-forecast-skeleton';

describe('DailyForecastSkeleton', () => {
  it('renders with default props', () => {
    render(<DailyForecastSkeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass('space-y-4');
  });

  it('renders with custom className', () => {
    render(<DailyForecastSkeleton className="custom-class" data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('custom-class');
  });

  it('renders correct number of day skeletons', () => {
    render(<DailyForecastSkeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    
    // Should have 7 day skeletons by default
    const daySkeletons = skeleton.querySelectorAll('[class*="glass-subtle"]');
    expect(daySkeletons).toHaveLength(7);
  });

  it('renders with custom number of days', () => {
    render(<DailyForecastSkeleton days={5} data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    
    // Should have 5 day skeletons
    const daySkeletons = skeleton.querySelectorAll('[class*="glass-subtle"]');
    expect(daySkeletons).toHaveLength(5);
  });

  it('renders each day skeleton with proper structure', () => {
    render(<DailyForecastSkeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    
    // Each day should have icon, day, and temperature skeletons
    const daySkeletons = skeleton.querySelectorAll('[class*="glass-subtle"]');
    daySkeletons.forEach(day => {
      expect(day).toHaveClass('p-4', 'space-y-3');
      // Should have icon skeleton (circular)
      expect(day.querySelector('[class*="rounded-full"]')).toBeInTheDocument();
      // Should have day skeleton (text)
      expect(day.querySelector('[class*="h-4"]')).toBeInTheDocument();
      // Should have temperature skeleton (text)
      expect(day.querySelector('[class*="h-5"]')).toBeInTheDocument();
    });
  });

  it('renders with shimmer effect', () => {
    render(<DailyForecastSkeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('relative', 'overflow-hidden');
  });

  it('has proper accessibility attributes', () => {
    render(<DailyForecastSkeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveAttribute('role', 'img');
    expect(skeleton).toHaveAttribute('aria-label', 'Loading daily forecast');
  });

  it('can disable shimmer effect', () => {
    render(<DailyForecastSkeleton showShimmer={false} data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).not.toHaveClass('relative', 'overflow-hidden');
  });

  it('renders with different layouts', () => {
    const { rerender } = render(<DailyForecastSkeleton layout="horizontal" data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveClass('flex', 'space-x-4', 'space-y-0');

    rerender(<DailyForecastSkeleton layout="vertical" data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveClass('space-y-4');
  });
});
