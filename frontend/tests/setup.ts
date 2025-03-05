import "@testing-library/jest-dom";
import { server } from "./server";
import { beforeAll, afterEach, afterAll } from "vitest";

// Start API mocking before tests run
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers()); // Reset handlers between tests
afterAll(() => server.close()); // Clean up after tests
