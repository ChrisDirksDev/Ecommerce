import { userAuth } from "middleware/authMiddleware";

const path = require("path");

export const mockAuthMiddleware = () => {
  jest.mock("../src/middleware/authMiddleware", () => ({
    adminAuth: (
      req = { user: { id: "string", name: "string" } },
      res: any,
      next: () => void
    ) => {
      req.user = { id: "testUserId", name: "Test User" };
      next();
    },
    userAuth: (
      req = { user: { id: "string", name: "string" } },
      res: any,
      next: () => void
    ) => {
      req.user = { id: "testUserId", name: "Test User" };
      next();
    },
  }));
};
