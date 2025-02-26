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
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov", "json", "cobertura"],
      exclude: [
        // Default exclusions
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
        "**/setupTests.{js,ts}",
        "**/*.test.{js,jsx,ts,tsx}",
        "**/*.spec.{js,jsx,ts,tsx}",
        "**/testHelpers.ts",

        // Type definitions
        "**/types/*.ts",

        // Build directory
        "**/build/**",

        // Ignore index file (entry point)
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
    },
  },
});
