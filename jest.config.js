// or vitest.config.js depending on your setup

module.exports = {
  // ...existing config
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/src/index.tsx", // Entry point doesn't need testing
    "/src/setupTests.ts", // Test configuration
    "/src/types/", // Type definitions
    "/src/constants/testConstants.ts", // Test helpers
  ],
};
