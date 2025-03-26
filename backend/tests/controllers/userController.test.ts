import request from "supertest";
import dotenv from "dotenv";
import app from "../app";
import { registerUser, authUser } from "services/userService";

dotenv.config();

const testUser = { id: "userId", anonId: "anonUserId", admin: false };

jest.mock("services/userService");

describe("User Controller", () => {
  beforeEach(() => {
    (registerUser as jest.Mock).mockResolvedValue({
      _id: "testUserId",
      name: "Test User",
      email: "test@test.com",
      token: "testToken",
    });

    (authUser as jest.Mock).mockResolvedValue({
      _id: "testUserId",
      name: "Test User",
      email: "test@test.com",
      token: "testToken",
    });
  });

  describe("signUpUser", () => {
    it("should call registerUser with the provided user data", async () => {
      await request(app)
        .post("/api/user/signup")
        .send({
          name: "Test User",
          email: "test@test.com",
          password: "password",
        })
        .expect(201);

      expect(registerUser).toHaveBeenCalledWith(
        "Test User",
        "test@test.com",
        "password",
        testUser
      );
    });

    it("should return with a 201 status and the new user", async () => {
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
  });

  describe("loginUser", () => {
    it("should call authUser with the provided user data", async () => {
      await request(app)
        .post("/api/user/login")
        .send({
          email: "test@test.com",
          password: "password",
        })
        .expect(200);

      expect(authUser).toHaveBeenCalledWith(
        "test@test.com",
        "password",
        testUser
      );
    });

    it("should return a 200 status and the user data", async () => {
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
  });
});
