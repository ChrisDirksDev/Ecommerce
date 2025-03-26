import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import * as AdminService from "services/adminService";
import { Admin } from "models";
import { generateToken } from "utils/func";

dotenv.config();
process.env.JWT_SECRET = "testsecret";

jest.mock("bcryptjs");
jest.mock("utils/func");
jest.mock("models");

describe("Admin Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("registerAdmin", () => {
    it("should register an admin", async () => {
      (generateToken as jest.Mock).mockReturnValue("token");
      (Admin.findOne as jest.Mock).mockResolvedValue(null);
      (Admin.create as jest.Mock).mockResolvedValue({
        name: "test",
        email: "test",
        password: "password",
      });

      const admin = await AdminService.registerAdmin(
        "test",
        "test",
        "password"
      );

      expect(admin).toEqual({
        _id: undefined,
        name: "test",
        email: "test",
        token: "token",
      });
    });

    it("should throw an error if admin already exists", async () => {
      (Admin.findOne as jest.Mock).mockResolvedValue({});

      expect(
        AdminService.registerAdmin("test", "test", "test")
      ).rejects.toThrow("Admin already exists");
    });
  });

  describe("authAdmin", () => {
    it("should authenticate an admin", async () => {
      (generateToken as jest.Mock).mockReturnValue("token");
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (Admin.findOne as jest.Mock).mockResolvedValue({
        name: "test",
        email: "test",
        password: "password",
      });

      const admin = await AdminService.authAdmin("test", "password");

      expect(admin).toEqual({
        _id: undefined,
        name: "test",
        email: "test",
        token: "token",
      });
    });

    it("should throw an error if admin does not exist", async () => {
      (Admin.findOne as jest.Mock).mockResolvedValue(null);

      expect(AdminService.authAdmin("test", "password")).rejects.toThrow(
        "Invalid credentials"
      );
    });

    it("should throw an error if password is incorrect", async () => {
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);
      (Admin.findOne as jest.Mock).mockResolvedValue({
        name: "test",
        email: "test",
        password: "password",
      });

      expect(AdminService.authAdmin("test", "wrongpassword")).rejects.toThrow(
        "Invalid credentials"
      );
    });
  });
});
