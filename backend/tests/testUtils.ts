import { userAuth } from "../src/middleware/authMiddleware";
import request from "supertest";

const path = require("path");

export const mockAuthMiddleware = () => {};

/**
 * Request wrapper to handle response status and error logging.
 */
export async function makeRequest(
  requestCall: Promise<request.Response>,
  expectedStatus: number
) {
  const response = await requestCall;

  if (response.status !== expectedStatus) {
    console.error(
      `Test Failed - Expected: ${expectedStatus}, Received: ${response.status}`
    );
    console.error(`Response Body:`, response.body);
  }

  expect(response.status).toBe(expectedStatus);
  return response;
}
