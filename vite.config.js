import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: "build",
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
    testTimeout: 15000, // Increase timeout to avoid flaky tests
    pool: "forks", // Use separate process for each test file
    isolate: true, // Isolate tests to prevent interference
    environmentOptions: {
      jsdom: {
        resources: "usable",
      },
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov", "json", "cobertura"],
      include: ["src/**/*.{js,jsx,ts,tsx}"],
      exclude: [
        // Default exclusions
        "node_modules/**",
        "**/node_modules/**",
        "**/dist/**",
        "**/cypress/**",
        "**/*.d.ts",
        "**/*.cy.ts",
        "**/coverage/**",

        // Configuration files
        "**/*.config.js",
        "**/*.config.ts",
        "tailwind.config.js",

        // Test files
        "**/test-utils.{ts,tsx}",
        "**/tests/**/*",
        "**/setupTests.{js,ts}",
        "**/setupTests.ts",
        "**/*.test.{js,jsx,ts,tsx}",
        "**/*.spec.{js,jsx,ts,tsx}",
        "**/testHelpers.ts",
        "**/utils/test-*.{js,jsx,ts,tsx}",
        "**/utils/testHelpers.ts",

        // Type definitions
        "**/types/*.ts",
        "**/types/*.d.ts",
        "**/*.d.ts",
        "**/vitest.d.ts",

        // Build directory
        "**/build/**",

        // Entry point
        "**/index.tsx",
        "**/index.ts",
        "**/index.js",

        // Ignore mocks and test utilities
        "**/__mocks__/**",
        "**/__tests__/**",
      ],
      // Set more lenient thresholds for coverage reporting
      thresholds: {
        statements: 70,
        branches: 65,
        functions: 65,
        lines: 70,
      },
      all: true, // Include all files (even files with no tests)
      skipFull: false, // Don't skip files with 100% coverage
      clean: true, // Clean old coverage reports
      reportsDirectory: "coverage",
    },
  },
});
