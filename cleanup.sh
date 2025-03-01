#!/bin/bash

# Make sure we're in the right directory
cd /workspaces/cia-compliance-manager

# Remove outdated Jest config files
echo "Removing outdated Jest configuration files..."
rm -f jest.setup.js
rm -f jest.config.js

# Make the script executable
chmod +x cleanup.sh

echo "Removed outdated Jest configuration files successfully"
