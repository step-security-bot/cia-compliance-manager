import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { configDefaults } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: "build",
    sourcemap: true,
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/tests/setup.ts"], // Updated path
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      exclude: [
        "node_modules/",
        "src/tests/**/*",
        "src/**/*.test.{js,ts,jsx,tsx}",
        "src/**/*.spec.{js,ts,jsx,tsx}",
        "src/**/*.d.ts",
      ],
      all: true,
      include: ["src/**/*.{js,ts,jsx,tsx}"],
      reportOnFailure: true,
    },
    testTimeout: 10000,
    exclude: [
      ...configDefaults.exclude,
      "**/*.e2e.{test,spec}.{js,ts,jsx,tsx}",
    ],
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
