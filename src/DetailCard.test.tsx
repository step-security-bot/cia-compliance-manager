import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DetailCard from './components/DetailCard';

describe('DetailCard', () => {
  const mockDetails = {
    capex: 10,
    opex: 20,
    impact: 'Test impact',
    technical: 'Test technical',
    description: 'Test description',
  };

  test('renders the DetailCard component with correct props', () => {
    render(<DetailCard category="Test Category" level="High" details={mockDetails} />);
    expect(screen.getByText(/Test Category - High/i)).toBeInTheDocument();
    expect(screen.getByText(/CAPEX: 10% | OPEX: 20%/i)).toBeInTheDocument();
    expect(screen.getByText(/Impact: Test impact/i)).toBeInTheDocument();
    expect(screen.getByText(/Technical: Test technical/i)).toBeInTheDocument();
  });

  test('renders the DetailCard component for different levels', () => {
    const levels = ['None', 'Basic', 'Moderate', 'High', 'Very High'];
    levels.forEach(level => {
      render(<DetailCard category="Test Category" level={level} details={mockDetails} />);
      expect(screen.getByText(new RegExp(`Test Category - ${level}`, 'i'))).toBeInTheDocument();
    });
  });

  test('handles missing or undefined details gracefully', () => {
    render(<DetailCard category="Test Category" level="High" details={undefined} />);
    expect(screen.getByText(/Test Category - High/i)).toBeInTheDocument();
  });

  test('conditionally renders Impact and Technical details based on provided details', () => {
    render(<DetailCard category="Test Category" level="High" details={mockDetails} />);
    expect(screen.getByText(/Impact: Test impact/i)).toBeInTheDocument();
    expect(screen.getByText(/Technical: Test technical/i)).toBeInTheDocument();
  });

  test('applies correct color styles based on level prop', () => {
    const levels = {
      None: { bg: '#e5e7eb', text: '#374151' },
      Basic: { bg: '#d1fae5', text: '#065f46' },
      Moderate: { bg: '#fef3c7', text: '#92400e' },
      High: { bg: '#ffedd5', text: '#c2410c' },
      'Very High': { bg: '#fee2e2', text: '#991b1b' },
    };

    Object.keys(levels).forEach(level => {
      render(<DetailCard category="Test Category" level={level} details={mockDetails} />);
      const card = screen.getByText(new RegExp(`Test Category - ${level}`, 'i')).parentElement;
      expect(card).toHaveStyle(`background-color: ${levels[level].bg}`);
      expect(screen.getByText(new RegExp(`Test Category - ${level}`, 'i'))).toHaveStyle(`color: ${levels[level].text}`);
    });
  });

  test('checks for appropriate ARIA attributes and keyboard navigation support', () => {
    render(<DetailCard category="Test Category" level="High" details={mockDetails} />);
    const card = screen.getByText(/Test Category - High/i).parentElement;
    expect(card).toHaveAttribute('role', 'region');
    expect(card).toHaveAttribute('tabindex', '0');
  });
});
