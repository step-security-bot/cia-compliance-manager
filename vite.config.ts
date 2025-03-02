import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";
import type { UserConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig(({ mode }): UserConfig => {
  // Load env variables
  const env = loadEnv(mode, process.cwd());
  const baseUrl = env.VITE_BASE_URL || "/";

  return {
    base: baseUrl,
    plugins: [react(), tsconfigPaths()],
    build: {
      // Using 'build' as outDir to match existing configuration
      outDir: "build",
      sourcemap: true,
      manifest: true,
      reportCompressedSize: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
            chart: ["chart.js"],
          },
          // Use deterministic chunk names for better caching
          chunkFileNames: "assets/[name]-[hash].js",
          entryFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash].[ext]",
        },
      },
      // Enable SWC minification (faster than Terser)
      minify: "esbuild",
      target: ["es2020", "edge88", "firefox78", "chrome87", "safari14"],
    },
    server: {
      port: 5173,
      strictPort: true,
      host: true,
      open: true, // Open browser automatically (from JS version)
    },
    preview: {
      port: 4173,
      strictPort: true,
      host: true,
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    define: {
      "import.meta.env.APP_VERSION": JSON.stringify(
        process.env.VITE_APP_VERSION || "0.0.0"
      ),
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./src/setupTests.ts"],
      testTimeout: 15000, // Increase timeout to avoid flaky tests (from JS version)
      pool: "forks", // Use separate process for each test file (from JS version)
      isolate: true, // Isolate tests to prevent interference (from JS version)
      environmentOptions: {
        jsdom: {
          resources: "usable", // From JS version
        },
      },
      coverage: {
        provider: "v8",
        reporter: ["text", "html", "lcov", "json", "cobertura"], // Combined reporters from both versions
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
        // Set thresholds for coverage reporting (from JS version)
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
  };
});
