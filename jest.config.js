module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^chart.js/auto$": "<rootDir>/src/__mocks__/chart.js",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
