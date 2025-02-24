import request from "supertest";
import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "../app";
import { registerAdmin } from "controllers/adminController";
import { Admin } from "models";
import errorHandler from "middleware/errorMiddleware";

const adminId = new mongoose.Types.ObjectId();
dotenv.config();
const admin = {
  name: "Test Admin",
  email: "test@test.com",
  password: "password",
};
jest.mock("../../src/middleware/authMiddleware", () => ({
  adminAuth: (
    req = { user: { _id: adminId.toString(), name: "string" } },
    res: any,
    next: () => void
  ) => {
    req.user = { _id: adminId.toString(), name: "Test User" };
    next();
  },
  userAuth: (
    req = { user: { _id: adminId.toString(), name: "string" } },
    res: any,
    next: () => void
  ) => {
    req.user = { _id: adminId.toString(), name: "Test User" };
    next();
  },
}));

app.post("/api/admin/register", registerAdmin);
app.use(errorHandler);

describe("Admin Controller", () => {
  afterEach(async () => {
    await Admin.collection.dropIndexes();
  });
  describe("registerAdmin", () => {
    it("should create a new admin", async () => {
      const response = await request(app)
        .post("/api/admin/register")
        .send(admin)
        .expect(201);

      expect(response.body).toEqual({
        _id: expect.any(String),
        name: "Test Admin",
        email: "test@test.com",
        token: expect.any(String),
      });
    });

    it("should return an error if the admin already exists", async () => {
      await request(app).post("/api/admin/register").send(admin).expect(201);

      const resp = await request(app)
        .post("/api/admin/register")
        .send(admin)
        .expect(400);

      expect(resp.body.message).toEqual("Admin already exists");
    });
  });
  describe("loginAdmin", () => {
    it("should login an admin", async () => {
      const resp = await request(app)
        .post("/api/admin/register")
        .send(admin)
        .expect(201);

      const response = await request(app)
        .post("/api/admin/login")
        .send({
          email: "test@test.com",
          password: "password",
        })
        .expect(200);

      expect(response.body).toEqual({
        _id: expect.any(String),
        name: "Test Admin",
        email: "test@test.com",
        token: expect.any(String),
      });
    });

    it("should return an error if the credentials are invalid", async () => {
      await request(app).post("/api/admin/register").send(admin).expect(201);

      const response = await request(app)
        .post("/api/admin/login")
        .send({
          email: "wrong@test.com",
          password: "password",
        })
        .expect(401);

      expect(response.body.message).toEqual("Invalid credentials");
    });
  });
});
