import { render, screen } from '@testing-library/react';
import { HourlyPanelSkeleton } from '../hourly-panel-skeleton';

describe('HourlyPanelSkeleton', () => {
  it('renders with default props', () => {
    render(<HourlyPanelSkeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass('glass-subtle', 'p-6', 'space-y-6');
  });

  it('renders with custom className', () => {
    render(<HourlyPanelSkeleton className="custom-class" data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('custom-class');
  });

  it('renders correct number of hour skeletons', () => {
    render(<HourlyPanelSkeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    
    // Should have 24 hour skeletons by default
    const hourSkeletons = skeleton.querySelectorAll('[class*="glass-subtle"]');
    expect(hourSkeletons).toHaveLength(24);
  });

  it('renders with custom number of hours', () => {
    render(<HourlyPanelSkeleton hours={12} data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    
    // Should have 12 hour skeletons
    const hourSkeletons = skeleton.querySelectorAll('[class*="glass-subtle"]');
    expect(hourSkeletons).toHaveLength(12);
  });

  it('renders each hour skeleton with proper structure', () => {
    render(<HourlyPanelSkeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    
    // Each hour should have time, icon, and temperature skeletons
    const hourSkeletons = skeleton.querySelectorAll('[class*="glass-subtle"]');
    hourSkeletons.forEach(hour => {
      expect(hour).toHaveClass('p-3', 'space-y-2');
      // Should have time skeleton (text)
      expect(hour.querySelector('[class*="h-4"]')).toBeInTheDocument();
      // Should have icon skeleton (circular)
      expect(hour.querySelector('[class*="rounded-full"]')).toBeInTheDocument();
      // Should have temperature skeleton (text)
      expect(hour.querySelector('[class*="h-5"]')).toBeInTheDocument();
    });
  });

  it('renders with shimmer effect', () => {
    render(<HourlyPanelSkeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('relative', 'overflow-hidden');
  });

  it('has proper accessibility attributes', () => {
    render(<HourlyPanelSkeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveAttribute('role', 'img');
    expect(skeleton).toHaveAttribute('aria-label', 'Loading hourly forecast');
  });

  it('can disable shimmer effect', () => {
    render(<HourlyPanelSkeleton showShimmer={false} data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).not.toHaveClass('relative', 'overflow-hidden');
  });

  it('renders with different layouts', () => {
    const { rerender } = render(<HourlyPanelSkeleton layout="horizontal" data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveClass('flex', 'space-x-4', 'space-y-0');

    rerender(<HourlyPanelSkeleton layout="vertical" data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveClass('space-y-4');
  });

  it('renders with different grid layouts', () => {
    const { rerender } = render(<HourlyPanelSkeleton layout="grid" columns={6} data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveClass('grid', 'grid-cols-6', 'gap-4');

    rerender(<HourlyPanelSkeleton layout="grid" columns={8} data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveClass('grid-cols-8');
  });
});
