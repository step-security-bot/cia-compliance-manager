import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import CIAClassificationApp from './CIAClassificationApp';

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText(/CIA Classification App for PartyRock AWS/i)).toBeInTheDocument();
  });

  test('renders CIAClassificationApp component', () => {
    render(<App />);
    expect(screen.getByText(/CIA Classification App for PartyRock AWS/i)).toBeInTheDocument();
  });

  test('renders specific elements within CIAClassificationApp', () => {
    render(<App />);
    expect(screen.getByText(/Dark Mode/i)).toBeInTheDocument();
    expect(screen.getByText(/Availability Level/i)).toBeInTheDocument();
    expect(screen.getByText(/Integrity Level/i)).toBeInTheDocument();
    expect(screen.getByText(/Confidentiality Level/i)).toBeInTheDocument();
  });
});
