import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DetailCard from './DetailCard';

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
});
