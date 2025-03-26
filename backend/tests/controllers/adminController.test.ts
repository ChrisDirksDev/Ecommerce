import request from "supertest";
import dotenv from "dotenv";
import app from "../app";
import { registerAdmin } from "controllers/adminController";
import errorHandler from "middleware/errorMiddleware";
import * as AdminService from "services/adminService";
import { makeRequest } from "../testUtils";

dotenv.config();

jest.mock("services/adminService");

app.post("/api/admin/register", registerAdmin);
app.use(errorHandler);

describe("Admin Controller", () => {
  const admin = {
    name: "Test Admin",
    email: "test@test.com",
    password: "password",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("registerAdmin", () => {
    it("should attempt to register an admin", async () => {
      (AdminService.registerAdmin as jest.Mock).mockResolvedValue(admin);

      const response = await makeRequest(
        request(app).post("/api/admin/register").send(admin),
        201
      );

      expect(AdminService.registerAdmin).toHaveBeenCalledWith(
        admin.name,
        admin.email,
        admin.password
      );
      expect(response.body).toEqual(admin);
    });
  });

  describe("loginAdmin", () => {
    it("should attempt to login an admin", async () => {
      (AdminService.authAdmin as jest.Mock).mockResolvedValue(admin);

      const response = await makeRequest(
        request(app)
          .post("/api/admin/login")
          .send({ email: admin.email, password: admin.password }),
        200
      );

      expect(AdminService.authAdmin).toHaveBeenCalledWith(
        admin.email,
        admin.password
      );
      expect(response.body).toEqual(admin);
    });
  });
});
