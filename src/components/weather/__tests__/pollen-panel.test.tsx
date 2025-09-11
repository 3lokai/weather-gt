import { render, screen } from '@testing-library/react';
import { PollenPanel } from '../pollen-panel';
import { PollenData } from '@/lib/types/pollen';

// Mock pollen data for testing
const mockPollenData: PollenData = {
  grass: {
    value: 45,
    unit: 'grains/m³',
    severity: 'moderate',
    description: 'Moderate',
    healthImplications: 'People with allergies may experience symptoms.',
  },
  tree: {
    value: 12,
    unit: 'grains/m³',
    severity: 'low',
    description: 'Low',
    healthImplications: 'People with severe allergies may experience mild symptoms.',
  },
  weed: {
    value: 8,
    unit: 'grains/m³',
    severity: 'very-low',
    description: 'Very Low',
    healthImplications: 'Most people will not experience allergy symptoms.',
  },
};

describe('PollenPanel', () => {
  it('renders pollen data correctly', () => {
    render(<PollenPanel pollen={mockPollenData} />);
    
    // Check that all pollen types are displayed
    expect(screen.getByText('Grass')).toBeInTheDocument();
    expect(screen.getByText('Tree')).toBeInTheDocument();
    expect(screen.getByText('Weed')).toBeInTheDocument();
    
    // Check that values are displayed
    expect(screen.getByText('45 grains/m³')).toBeInTheDocument();
    expect(screen.getByText('12 grains/m³')).toBeInTheDocument();
    expect(screen.getByText('8 grains/m³')).toBeInTheDocument();
    
    // Check that severity badges are displayed
    expect(screen.getByText('Moderate')).toBeInTheDocument();
    expect(screen.getByText('Low')).toBeInTheDocument();
    expect(screen.getByText('Very Low')).toBeInTheDocument();
  });

  it('renders loading state correctly', () => {
    render(<PollenPanel pollen={null} isLoading={true} />);
    
    // Check that loading skeletons are displayed
    expect(screen.getByLabelText('Loading Grass pollen')).toBeInTheDocument();
    expect(screen.getByLabelText('Loading Tree pollen')).toBeInTheDocument();
    expect(screen.getByLabelText('Loading Weed pollen')).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    const errorMessage = 'Failed to load pollen data';
    render(<PollenPanel pollen={null} error={errorMessage} />);
    
    expect(screen.getByText('Unable to load pollen data')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('renders empty state correctly when no pollen data', () => {
    render(<PollenPanel pollen={null} />);
    
    expect(screen.getByText('No pollen data available')).toBeInTheDocument();
    expect(screen.getByText('Pollen information is not available for this region')).toBeInTheDocument();
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<PollenPanel pollen={mockPollenData} size="sm" />);
    expect(screen.getByText('Grass')).toHaveClass('text-xs');
    
    rerender(<PollenPanel pollen={mockPollenData} size="md" />);
    expect(screen.getByText('Grass')).toHaveClass('text-sm');
    
    rerender(<PollenPanel pollen={mockPollenData} size="lg" />);
    expect(screen.getByText('Grass')).toHaveClass('text-base');
  });

  it('applies correct layout classes', () => {
    const { rerender } = render(<PollenPanel pollen={mockPollenData} layout="grid" />);
    expect(screen.getByLabelText('Pollen levels')).toHaveClass('grid');
    
    rerender(<PollenPanel pollen={mockPollenData} layout="list" />);
    expect(screen.getByLabelText('Pollen levels')).toHaveClass('flex', 'flex-col');
  });

  it('has proper accessibility attributes', () => {
    render(<PollenPanel pollen={mockPollenData} />);
    
    // Check region role
    expect(screen.getByRole('region', { name: 'Pollen levels' })).toBeInTheDocument();
    
    // Check group roles for individual metrics
    expect(screen.getByRole('group', { name: /Grass pollen/ })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: /Tree pollen/ })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: /Weed pollen/ })).toBeInTheDocument();
  });

  it('renders tooltips when showTooltips is true', () => {
    render(<PollenPanel pollen={mockPollenData} showTooltips={true} />);
    
    // Check that tooltip elements are present (though hidden from screen readers)
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('does not render tooltips when showTooltips is false', () => {
    render(<PollenPanel pollen={mockPollenData} showTooltips={false} />);
    
    // Check that no tooltip elements are present
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const customClass = 'custom-pollen-panel';
    render(<PollenPanel pollen={mockPollenData} className={customClass} />);
    
    expect(screen.getByLabelText('Pollen levels')).toHaveClass(customClass);
  });

  it('handles high pollen levels correctly', () => {
    const highPollenData: PollenData = {
      grass: {
        value: 180,
        unit: 'grains/m³',
        severity: 'very-high',
        description: 'Very High',
        healthImplications: 'Most people with allergies will experience significant symptoms.',
      },
      tree: {
        value: 95,
        unit: 'grains/m³',
        severity: 'high',
        description: 'High',
        healthImplications: 'Most people with allergies will experience symptoms.',
      },
      weed: {
        value: 220,
        unit: 'grains/m³',
        severity: 'extreme',
        description: 'Extreme',
        healthImplications: 'Everyone with allergies will experience severe symptoms.',
      },
    };

    render(<PollenPanel pollen={highPollenData} />);
    
    expect(screen.getByText('180 grains/m³')).toBeInTheDocument();
    expect(screen.getByText('95 grains/m³')).toBeInTheDocument();
    expect(screen.getByText('220 grains/m³')).toBeInTheDocument();
    
    expect(screen.getByText('Very High')).toBeInTheDocument();
    expect(screen.getByText('High')).toBeInTheDocument();
    expect(screen.getByText('Extreme')).toBeInTheDocument();
  });
});
