import { render, screen } from '@testing-library/react';
import { MetricsGridSkeleton } from '../metrics-grid-skeleton';

describe('MetricsGridSkeleton', () => {
  it('renders with default props', () => {
    render(<MetricsGridSkeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass('grid', 'grid-cols-2', 'gap-4');
  });

  it('renders with custom className', () => {
    render(<MetricsGridSkeleton className="custom-class" data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('custom-class');
  });

  it('renders correct number of metric skeletons', () => {
    render(<MetricsGridSkeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    
    // Should have 4 metric skeletons (2x2 grid)
    const metricSkeletons = skeleton.querySelectorAll('[class*="glass-subtle"]');
    expect(metricSkeletons).toHaveLength(4);
  });

  it('renders each metric skeleton with proper structure', () => {
    render(<MetricsGridSkeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    
    // Each metric should have icon, value, and label skeletons
    const metricSkeletons = skeleton.querySelectorAll('[class*="glass-subtle"]');
    metricSkeletons.forEach(metric => {
      expect(metric).toHaveClass('p-4', 'space-y-3');
      // Should have icon skeleton (circular)
      expect(metric.querySelector('[class*="rounded-full"]')).toBeInTheDocument();
      // Should have value skeleton (text)
      expect(metric.querySelector('[class*="h-6"]')).toBeInTheDocument();
      // Should have label skeleton (text)
      expect(metric.querySelector('[class*="h-4"]')).toBeInTheDocument();
    });
  });

  it('renders with shimmer effect', () => {
    render(<MetricsGridSkeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('relative', 'overflow-hidden');
  });

  it('has proper accessibility attributes', () => {
    render(<MetricsGridSkeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveAttribute('role', 'img');
    expect(skeleton).toHaveAttribute('aria-label', 'Loading weather metrics');
  });

  it('can disable shimmer effect', () => {
    render(<MetricsGridSkeleton showShimmer={false} data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).not.toHaveClass('relative', 'overflow-hidden');
  });

  it('renders with different grid layouts', () => {
    const { rerender } = render(<MetricsGridSkeleton columns={3} data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveClass('grid-cols-3');

    rerender(<MetricsGridSkeleton columns={4} data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveClass('grid-cols-4');
  });
});
