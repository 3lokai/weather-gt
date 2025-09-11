import { render, screen } from '@testing-library/react';
import { Skeleton, SkeletonContainer, SkeletonText, SkeletonCard } from '../skeleton';

describe('Skeleton Components', () => {
  describe('Skeleton', () => {
    it('renders with default props', () => {
      render(<Skeleton data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toBeInTheDocument();
      expect(skeleton).toHaveClass('bg-muted', 'animate-pulse', 'rounded-md');
    });

    it('renders with custom className', () => {
      render(<Skeleton className="custom-class" data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('custom-class');
    });

    it('renders with custom width and height', () => {
      render(<Skeleton width={100} height={50} data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveStyle({ width: '100px', height: '50px' });
    });

    it('renders with different variants', () => {
      const { rerender } = render(<Skeleton variant="text" data-testid="skeleton" />);
      expect(screen.getByTestId('skeleton')).toHaveClass('h-4');

      rerender(<Skeleton variant="circular" data-testid="skeleton" />);
      expect(screen.getByTestId('skeleton')).toHaveClass('rounded-full');

      rerender(<Skeleton variant="rectangular" data-testid="skeleton" />);
      expect(screen.getByTestId('skeleton')).toHaveClass('rounded-none');
    });

    it('renders with different border radius', () => {
      const { rerender } = render(<Skeleton rounded="sm" data-testid="skeleton" />);
      expect(screen.getByTestId('skeleton')).toHaveClass('rounded-sm');

      rerender(<Skeleton rounded="lg" data-testid="skeleton" />);
      expect(screen.getByTestId('skeleton')).toHaveClass('rounded-lg');

      rerender(<Skeleton rounded="full" data-testid="skeleton" />);
      expect(screen.getByTestId('skeleton')).toHaveClass('rounded-full');
    });

    it('can disable animation', () => {
      render(<Skeleton animate={false} data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).not.toHaveClass('animate-pulse');
    });

    it('has proper accessibility attributes', () => {
      render(<Skeleton data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveAttribute('role', 'img');
      expect(skeleton).toHaveAttribute('aria-label', 'Loading content');
    });
  });

  describe('SkeletonContainer', () => {
    it('renders children with shimmer effect', () => {
      render(
        <SkeletonContainer data-testid="container">
          <div data-testid="content">Content</div>
        </SkeletonContainer>
      );
      
      expect(screen.getByTestId('container')).toBeInTheDocument();
      expect(screen.getByTestId('content')).toBeInTheDocument();
      expect(screen.getByTestId('container')).toHaveClass('relative', 'overflow-hidden');
    });

    it('can disable shimmer effect', () => {
      render(
        <SkeletonContainer showShimmer={false} data-testid="container">
          <div data-testid="content">Content</div>
        </SkeletonContainer>
      );
      
      const container = screen.getByTestId('container');
      expect(container).toBeInTheDocument();
      // Should not have shimmer element when disabled
      expect(container.querySelector('[class*="animate-shimmer"]')).not.toBeInTheDocument();
    });
  });

  describe('SkeletonText', () => {
    it('renders single line by default', () => {
      render(<SkeletonText data-testid="text-skeleton" />);
      const container = screen.getByTestId('text-skeleton');
      expect(container).toBeInTheDocument();
      expect(container.children).toHaveLength(1);
    });

    it('renders multiple lines', () => {
      render(<SkeletonText lines={3} data-testid="text-skeleton" />);
      const container = screen.getByTestId('text-skeleton');
      expect(container.children).toHaveLength(3);
    });

    it('renders last line shorter', () => {
      render(<SkeletonText lines={3} data-testid="text-skeleton" />);
      const container = screen.getByTestId('text-skeleton');
      const lastLine = container.children[2];
      expect(lastLine).toHaveClass('w-3/4');
    });

    it('renders with custom line height', () => {
      render(<SkeletonText lineHeight="h-6" data-testid="text-skeleton" />);
      const container = screen.getByTestId('text-skeleton');
      const firstLine = container.children[0];
      expect(firstLine).toHaveClass('h-6');
    });
  });

  describe('SkeletonCard', () => {
    it('renders with header and content by default', () => {
      render(<SkeletonCard data-testid="card-skeleton" />);
      const card = screen.getByTestId('card-skeleton');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('glass-subtle', 'p-4', 'space-y-4');
    });

    it('can hide header', () => {
      render(<SkeletonCard showHeader={false} data-testid="card-skeleton" />);
      const card = screen.getByTestId('card-skeleton');
      // Should only have content skeletons, not header
      const skeletons = card.querySelectorAll('[class*="bg-muted"]');
      expect(skeletons.length).toBeLessThan(5); // Less than header + content skeletons
    });

    it('can hide content', () => {
      render(<SkeletonCard showContent={false} data-testid="card-skeleton" />);
      const card = screen.getByTestId('card-skeleton');
      // Should only have header skeletons, not content
      const skeletons = card.querySelectorAll('[class*="bg-muted"]');
      expect(skeletons.length).toBeLessThan(5); // Less than header + content skeletons
    });
  });
});
