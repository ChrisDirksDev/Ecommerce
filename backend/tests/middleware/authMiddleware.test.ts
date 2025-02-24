import request from "supertest";
import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {
  adminAuth,
  userAuth,
  AuthRequest,
  UserAuthRequest,
} from "middleware/authMiddleware";
import Admin from "models/adminModel";

const app = express();

app.use(express.json());

app.get("/admin", adminAuth, (req: AuthRequest, res: Response) => {
  res.status(200).json({ message: "Admin route accessed" });
});

app.get("/user", userAuth, (req: UserAuthRequest, res: Response) => {
  res.status(200).json({ message: "User route accessed" });
});

jest.mock("../../src/models/adminModel");
jest.mock("../../src/models/userModel");

describe("Auth Middleware", () => {
  let token: string;

  beforeAll(() => {
    process.env.JWT_SECRET = "testsecret";
    token = jwt.sign({ id: "adminId" }, process.env.JWT_SECRET);
  });

  describe("adminAuth middleware", () => {
    it("should allow access to admin route with valid token", async () => {
      (Admin.findById as jest.Mock).mockReturnValue({
        select: jest.fn().mockResolvedValue({
          _id: "adminId",
          name: "Admin User",
        }),
      });

      const res = await request(app)
        .get("/admin")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Admin route accessed");
    });

    it("should deny access to admin route with invalid token", async () => {
      const res = await request(app)
        .get("/admin")
        .set("Authorization", "Bearer invalidtoken");

      expect(res.status).toBe(401);
      expect(res.text).toContain("Not authorized, token failed");
    });

    it("should deny access to admin route with no token", async () => {
      const res = await request(app).get("/admin");

      expect(res.status).toBe(401);
      expect(res.text).toContain("Not authorized, no token");
    });
  });

  describe("userAuth middleware", () => {
    it("should allow access to user route with valid token", async () => {
      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
      }
      token = jwt.sign({ _id: "userId" }, process.env.JWT_SECRET);

      const res = await request(app)
        .get("/user")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("User route accessed");
    });

    it("should deny access to user route with invalid token", async () => {
      const res = await request(app)
        .get("/user")
        .set("Authorization", "Bearer invalidtoken");

      expect(res.status).toBe(401);
      expect(res.text).toContain("Not authorized, token failed");
    });

    it("should deny access to user route with no token", async () => {
      const res = await request(app).get("/user");

      expect(res.status).toBe(401);
      expect(res.text).toContain("Not authorized, no token");
    });
  });
});
