import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DetailCard from './components/DetailCard';  // This should work now since both files are in the same directory

// Define the type for our levels
type Level = 'None' | 'Basic' | 'Moderate' | 'High' | 'Very High';

const levels = {
  'None': {
    bg: "#e5e7eb",
    text: "#374151"
  },
  'Basic': {
    bg: "#d1fae5",
    text: "#065f46"
  },
  'Moderate': {
    bg: "#fef3c7",
    text: "#92400e"
  },
  'High': {
    bg: "#ffedd5",
    text: "#c2410c"
  },
  'Very High': {
    bg: "#fee2e2",
    text: "#991b1b"
  }
} as const;

const mockDetails = {
  capex: 10,
  opex: 5,
  impact: "Test Impact",
  technical: "Test Technical Details",
  description: "Test Description"
};

describe('DetailCard', () => {
  const validLevels = Object.keys(levels) as Level[];

  test('renders with all level options', () => {
    validLevels.forEach((level) => {
      render(<DetailCard category="Test Category" level={level} details={mockDetails} />);
      const card = screen.getByText(new RegExp(`Test Category - ${level}`, 'i')).parentElement;
      expect(card).toHaveStyle(`background-color: ${levels[level].bg}`);
      expect(screen.getByText(new RegExp(`Test Category - ${level}`, 'i'))).toHaveStyle(`color: ${levels[level].text}`);
    });
  });

  test('displays impact and technical details', () => {
    render(<DetailCard category="Test Category" level="None" details={mockDetails} />);
    expect(screen.getByText(/Test Impact/)).toBeInTheDocument();
    expect(screen.getByText(/Test Technical Details/)).toBeInTheDocument();
  });
});
