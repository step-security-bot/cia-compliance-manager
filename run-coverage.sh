#!/bin/bash

# First, clean up old Jest files
if [ -f "jest.setup.js" ]; then
  rm jest.setup.js
  echo "Removed outdated jest.setup.js"
fi

if [ -f "jest.config.js" ]; then
  rm jest.config.js
  echo "Removed outdated jest.config.js"
fi

# Clean up any old coverage reports
rm -rf coverage
rm -rf .nyc_output

# Set test environment for better coverage
export NODE_ENV=test

# Run the enhanced coverage report
npx vitest run --coverage \
  --coverage.all=true \
  --coverage.include="src/**/*.{js,jsx,ts,tsx}" \
  --coverage.exclude="src/**/*.{test,spec}.{js,jsx,ts,tsx},src/setupTests.ts,src/**/*.d.ts,src/types/**,src/utils/test*.{ts,tsx},src/utils/testHelpers.ts,src/tests/**,src/index.{ts,tsx}"

# Make the script executable
chmod +x run-coverage.sh

# Display help message
echo "Coverage report generated in the coverage directory"
echo "Open 'coverage/index.html' in your browser to see the detailed report"
