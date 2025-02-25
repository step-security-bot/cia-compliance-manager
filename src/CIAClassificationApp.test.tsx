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

  test('invalid selections', () => {
    render(<CIAClassificationApp />);
    const select = screen.getByLabelText(/Availability Level/i);
    fireEvent.change(select, { target: { value: 'Invalid' } });
    expect(select).toHaveValue('Invalid');
  });

  test('boundary values', () => {
    render(<CIAClassificationApp />);
    const select = screen.getByLabelText(/Availability Level/i);
    fireEvent.change(select, { target: { value: 'Very High' } });
    expect(screen.getByText(/Estimated CAPEX/i)).toHaveTextContent('$1,000,000');
    expect(screen.getByText(/Estimated OPEX/i)).toHaveTextContent('$50,000');
  });

  test('performance optimization', () => {
    render(<CIAClassificationApp />);
    const select = screen.getByLabelText(/Availability Level/i);
    fireEvent.change(select, { target: { value: 'High' } });
    expect(screen.getByText(/Estimated CAPEX/i)).toHaveTextContent('$1,000,000');
    fireEvent.change(select, { target: { value: 'High' } });
    expect(screen.getByText(/Estimated CAPEX/i)).toHaveTextContent('$1,000,000');
  });

  test('conditional rendering', () => {
    render(<CIAClassificationApp />);
    const select = screen.getByLabelText(/Availability Level/i);
    fireEvent.change(select, { target: { value: 'None' } });
    expect(screen.getByText(/Small solution estimation based on lower risk configuration./i)).toBeInTheDocument();
    fireEvent.change(select, { target: { value: 'Very High' } });
    expect(screen.getByText(/Large solution estimation for high-criticality deployment./i)).toBeInTheDocument();
  });

  test('error handling', () => {
    render(<CIAClassificationApp />);
    const select = screen.getByLabelText(/Availability Level/i);
    fireEvent.change(select, { target: { value: 'Invalid' } });
    expect(screen.getByText(/Estimated CAPEX/i)).toHaveTextContent('$10,000');
  });
});
