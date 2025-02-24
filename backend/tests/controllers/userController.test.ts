import request from "supertest";
import dotenv from "dotenv";
import app from "../app";

dotenv.config();

jest.mock("../../src/middleware/authMiddleware", () => ({
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

describe("User Controller", () => {
  describe("signUpUser", () => {
    it("should create a new user", async () => {
      const response = await request(app)
        .post("/api/user/signup")
        .send({
          name: "Test User",
          email: "test@test.com",
          password: "password",
        })
        .expect(201);

      expect(response.body).toEqual({
        _id: expect.any(String),
        name: "Test User",
        email: "test@test.com",
        token: expect.any(String),
      });
    });

    it("should return an error if the user already exists", async () => {
      await request(app).post("/api/user/signup").send({
        name: "Test User",
        email: "test@test.com",
        password: "password",
      });

      const response = await request(app)
        .post("/api/user/signup")
        .send({
          name: "Test User",
          email: "test@test.com",
          password: "password",
        })
        .expect(400);

      expect(response.body.message).toEqual("User already exists");
    });
  });

  describe("loginUser", () => {
    it("should log in a user", async () => {
      await request(app).post("/api/user/signup").send({
        name: "Test User",
        email: "test@test.com",
        password: "password",
      });

      const response = await request(app)
        .post("/api/user/login")
        .send({
          email: "test@test.com",
          password: "password",
        })
        .expect(200);

      expect(response.body).toEqual({
        _id: expect.any(String),
        name: "Test User",
        email: "test@test.com",
        token: expect.any(String),
      });
    });

    it("should return an error if the user does not exist", async () => {
      const response = await request(app)
        .post("/api/user/login")
        .send({
          email: "test@test.com",
          password: "password",
        })
        .expect(401);

      expect(response.body.message).toEqual("Invalid credentials");
    });
  });
});
