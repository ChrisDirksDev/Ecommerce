import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest", // Use ts-jest for TypeScript support
  testEnvironment: "node", // Since it's a backend app
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"], // Setup files for Jest
  roots: ["<rootDir>/tests"], // Ensure this points to backend/tests, not backend/backend/tests
  moduleDirectories: ["node_modules", "<rootDir>/src"], // Allow absolute imports from src
  moduleFileExtensions: ["ts", "js", "json"], // Support TypeScript and JavaScript files
  testMatch: [
    "<rootDir>/tests/**/*.test.ts", // Ensure it matches the test files in backend/tests
    "**/?(*.)+(spec|test).ts", // Also support other patterns
  ],
  transform: {
    "^.+\\.ts$": "ts-jest", // Compile TypeScript with ts-jest
  },
  collectCoverage: true, // Enable test coverage reports
  collectCoverageFrom: ["src/**/*.{ts,js}", "!src/**/*.d.ts"], // Ignore type definitions
  coverageDirectory: "coverage", // Store coverage reports in coverage/
  resetMocks: true, // Reset mocks between tests
  clearMocks: true,
  restoreMocks: true,
};

export default config;
