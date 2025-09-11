import { render, screen } from '@testing-library/react';
import { SkeletonDemo } from '../skeleton-demo';

describe('SkeletonDemo', () => {
  it('renders all skeleton components', () => {
    render(<SkeletonDemo />);
    
    // Check for all skeleton components
    expect(screen.getByText('Current Conditions Skeleton')).toBeInTheDocument();
    expect(screen.getByText('Metrics Grid Skeleton')).toBeInTheDocument();
    expect(screen.getByText('Daily Forecast Skeleton')).toBeInTheDocument();
    expect(screen.getByText('Hourly Panel Skeleton')).toBeInTheDocument();
  });

  it('renders with proper structure', () => {
    render(<SkeletonDemo />);
    
    // Check for main container
    const container = screen.getByRole('main');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('container', 'mx-auto', 'p-8', 'space-y-8');
  });

  it('renders each skeleton section with title and description', () => {
    render(<SkeletonDemo />);
    
    // Check for section titles
    expect(screen.getByText('Current Conditions Skeleton')).toBeInTheDocument();
    expect(screen.getByText('Metrics Grid Skeleton')).toBeInTheDocument();
    expect(screen.getByText('Daily Forecast Skeleton')).toBeInTheDocument();
    expect(screen.getByText('Hourly Panel Skeleton')).toBeInTheDocument();
    
    // Check for descriptions
    expect(screen.getByText(/Loading state for the current weather conditions card/)).toBeInTheDocument();
    expect(screen.getByText(/Loading state for the weather metrics grid/)).toBeInTheDocument();
    expect(screen.getByText(/Loading state for the daily forecast rail/)).toBeInTheDocument();
    expect(screen.getByText(/Loading state for the hourly forecast panel/)).toBeInTheDocument();
  });

  it('renders skeleton components with proper accessibility', () => {
    render(<SkeletonDemo />);
    
    // Check for skeleton components with proper ARIA labels
    expect(screen.getByLabelText('Loading current weather conditions')).toBeInTheDocument();
    expect(screen.getByLabelText('Loading weather metrics')).toBeInTheDocument();
    expect(screen.getByLabelText('Loading daily forecast')).toBeInTheDocument();
    expect(screen.getByLabelText('Loading hourly forecast')).toBeInTheDocument();
  });

  it('renders with proper spacing and layout', () => {
    render(<SkeletonDemo />);
    
    // Check for proper spacing between sections
    const sections = screen.getAllByRole('region');
    expect(sections).toHaveLength(4);
    
    sections.forEach(section => {
      expect(section).toHaveClass('space-y-4');
    });
  });
});
