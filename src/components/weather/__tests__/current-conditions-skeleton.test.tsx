import { render, screen } from '@testing-library/react';
import { CurrentConditionsSkeleton } from '../current-conditions-skeleton';

describe('CurrentConditionsSkeleton', () => {
  it('renders with default props', () => {
    render(<CurrentConditionsSkeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass('glass-subtle', 'p-6', 'space-y-6');
  });

  it('renders with custom className', () => {
    render(<CurrentConditionsSkeleton className="custom-class" data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('custom-class');
  });

  it('renders all skeleton elements', () => {
    render(<CurrentConditionsSkeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    
    // Check for main skeleton elements
    expect(skeleton.querySelector('[class*="h-8"]')).toBeInTheDocument(); // Location
    expect(skeleton.querySelector('[class*="h-16"]')).toBeInTheDocument(); // Temperature
    expect(skeleton.querySelector('[class*="h-6"]')).toBeInTheDocument(); // Description
    expect(skeleton.querySelector('[class*="h-12"]')).toBeInTheDocument(); // Icon
  });

  it('renders with shimmer effect', () => {
    render(<CurrentConditionsSkeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('relative', 'overflow-hidden');
  });

  it('has proper accessibility attributes', () => {
    render(<CurrentConditionsSkeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveAttribute('role', 'img');
    expect(skeleton).toHaveAttribute('aria-label', 'Loading current weather conditions');
  });

  it('can disable shimmer effect', () => {
    render(<CurrentConditionsSkeleton showShimmer={false} data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).not.toHaveClass('relative', 'overflow-hidden');
  });
});
