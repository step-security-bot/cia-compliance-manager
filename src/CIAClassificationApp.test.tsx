import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CIAClassificationApp from './CIAClassificationApp';

describe('CIAClassificationApp', () => {
  test('renders the app', () => {
    render(<CIAClassificationApp />);
    expect(screen.getByText(/CIA Classification App for PartyRock AWS/i)).toBeInTheDocument();
  });

  test('toggles dark mode', () => {
    render(<CIAClassificationApp />);
    const button = screen.getByText(/Dark Mode/i);
    fireEvent.click(button);
    expect(button).toHaveTextContent(/Light Mode/i);
  });

  test('changes availability level', () => {
    render(<CIAClassificationApp />);
    const select = screen.getByLabelText(/Availability Level/i);
    fireEvent.change(select, { target: { value: 'High' } });
    expect(select).toHaveValue('High');
  });

  test('changes integrity level', () => {
    render(<CIAClassificationApp />);
    const select = screen.getByLabelText(/Integrity Level/i);
    fireEvent.change(select, { target: { value: 'Moderate' } });
    expect(select).toHaveValue('Moderate');
  });

  test('changes confidentiality level', () => {
    render(<CIAClassificationApp />);
    const select = screen.getByLabelText(/Confidentiality Level/i);
    fireEvent.change(select, { target: { value: 'Very High' } });
    expect(select).toHaveValue('Very High');
  });

  test('displays cost estimates', () => {
    render(<CIAClassificationApp />);
    expect(screen.getByText(/Estimated CAPEX/i)).toBeInTheDocument();
    expect(screen.getByText(/Estimated OPEX/i)).toBeInTheDocument();
  });

  test('displays detailed analysis', () => {
    render(<CIAClassificationApp />);
    expect(screen.getByText(/Detailed Analysis/i)).toBeInTheDocument();
  });

  test('initial state', () => {
    render(<CIAClassificationApp />);
    expect(screen.getByLabelText(/Availability Level/i)).toHaveValue('None');
    expect(screen.getByLabelText(/Integrity Level/i)).toHaveValue('None');
    expect(screen.getByLabelText(/Confidentiality Level/i)).toHaveValue('None');
    expect(screen.getByText(/Estimated CAPEX/i)).toHaveTextContent('$10,000');
    expect(screen.getByText(/Estimated OPEX/i)).toHaveTextContent('$500');
  });

  test('boundary values', () => {
    render(<CIAClassificationApp />);
    // Set all levels to "Very High" to exceed the small solution threshold
    const availabilitySelect = screen.getByLabelText(/Availability Level/i);
    const integritySelect = screen.getByLabelText(/Integrity Level/i);
    const confidentialitySelect = screen.getByLabelText(/Confidentiality Level/i);

    fireEvent.change(availabilitySelect, { target: { value: 'Very High' } });
    fireEvent.change(integritySelect, { target: { value: 'Very High' } });
    fireEvent.change(confidentialitySelect, { target: { value: 'Very High' } });

    expect(screen.getByText(/Estimated CAPEX/i)).toHaveTextContent('$1,000,000');
    expect(screen.getByText(/Estimated OPEX/i)).toHaveTextContent('$50,000');
  });

  test('performance optimization', () => {
    render(<CIAClassificationApp />);
    const select = screen.getByLabelText(/Availability Level/i);
    // Start with initial state
    expect(screen.getByText(/Estimated CAPEX/i)).toHaveTextContent('$10,000');
    // Change to High
    fireEvent.change(select, { target: { value: 'High' } });
    // Should still be $10,000 since only one selection is High
    expect(screen.getByText(/Estimated CAPEX/i)).toHaveTextContent('$10,000');
  });

  test('error handling', () => {
    render(<CIAClassificationApp />);
    const select = screen.getByLabelText(/Availability Level/i);
    // Initial state check
    expect(select).toHaveValue('None');
    // Try to set invalid value
    fireEvent.change(select, { target: { value: 'Invalid' } });
    // Should remain at 'None' since 'Invalid' is not a valid option
    expect(select).toHaveValue('None');
    // Cost should remain at initial value
    expect(screen.getByText(/Estimated CAPEX/i)).toHaveTextContent('$10,000');
  });

  test('useMemo hook with different combinations', () => {
    render(<CIAClassificationApp />);
    const availabilitySelect = screen.getByLabelText(/Availability Level/i);
    const integritySelect = screen.getByLabelText(/Integrity Level/i);
    const confidentialitySelect = screen.getByLabelText(/Confidentiality Level/i);

    // Setting moderate values that should still result in small solution
    fireEvent.change(availabilitySelect, { target: { value: 'High' } });
    fireEvent.change(integritySelect, { target: { value: 'Moderate' } });
    fireEvent.change(confidentialitySelect, { target: { value: 'Basic' } });

    // These selections should still result in small solution costs
    expect(screen.getByText(/Estimated CAPEX/i)).toHaveTextContent('$10,000');
    expect(screen.getByText(/Estimated OPEX/i)).toHaveTextContent('$500');
  });
});
