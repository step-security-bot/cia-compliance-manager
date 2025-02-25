import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Selection from './components/Selection';
import { availabilityOptions } from './hooks/useCIAOptions';

describe('Selection Component', () => {
  test('renders the selection component with correct label', () => {
    render(
      <Selection
        label="Availability Level"
        options={availabilityOptions}
        value="None"
        onChange={() => {}}
        id="availability"
      />
    );
    expect(screen.getByText(/Availability Level/i)).toBeInTheDocument();
  });

  test('renders the correct options', () => {
    render(
      <Selection
        label="Availability Level"
        options={availabilityOptions}
        value="None"
        onChange={() => {}}
        id="availability"
      />
    );
    expect(screen.getByText(/No Availability Controls/i)).toBeInTheDocument();
    expect(screen.getByText(/Backup & Restore/i)).toBeInTheDocument();
    expect(screen.getByText(/Pilot Light/i)).toBeInTheDocument();
    expect(screen.getByText(/Warm Standby/i)).toBeInTheDocument();
    expect(screen.getByText(/Multi-Site Active\/Active/i)).toBeInTheDocument();
  });

  test('handles option change', () => {
    const handleChange = jest.fn();
    render(
      <Selection
        label="Availability Level"
        options={availabilityOptions}
        value="None"
        onChange={handleChange}
        id="availability"
      />
    );
    fireEvent.change(screen.getByLabelText(/Availability Level/i), {
      target: { value: 'High' },
    });
    expect(handleChange).toHaveBeenCalledWith('High');
  });
});
