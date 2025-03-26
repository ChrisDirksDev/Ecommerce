import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import * as UserService from "services/userService";
import * as CartService from "services/cartService";
import { IUser, User, Cart } from "models";
import { generateToken } from "utils/func";

dotenv.config();

const mockUserData = {
  name: "John Doe",
  email: "test@test.com",
  password: "password",
};

process.env.JWT_SECRET = "testsecret";
const token = jwt.sign({ id: "adminId" }, process.env.JWT_SECRET);

const mockedUser = {
  _id: "123",
  name: "John Doe",
  email: "test@test.com",
  token,
};

jest.mock("models");
jest.mock("services/cartService");
jest.mock("bcryptjs");
jest.mock("utils/func");

describe("UserService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("registerUser", () => {
    let spy: jest.SpyInstance;

    it("should register a user", async () => {
      spy = jest
        .spyOn(UserService, "handleUserAuthResponse")
        .mockResolvedValue(mockedUser);
      (User.findOne as jest.Mock).mockResolvedValue(null);
      (User.create as jest.Mock).mockResolvedValue(mockedUser);
      (bcrypt.hash as jest.Mock).mockResolvedValue("hashedpassword");

      const user = await UserService.registerUser(
        mockUserData.name,
        mockUserData.email,
        mockUserData.password,
        { id: "123" }
      );

      expect(spy).toHaveBeenCalled();
      expect(User.create).toHaveBeenCalledWith({
        name: mockUserData.name,
        email: mockUserData.email,
        password: expect.any(String),
      });
      expect(user).toEqual(mockedUser);
    });

    it("should throw an error if user already exists", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(mockedUser);

      try {
        await UserService.registerUser(
          mockUserData.name,
          mockUserData.email,
          mockUserData.password,
          { id: "123" }
        );
      } catch (error) {
        expect(User.create).not.toHaveBeenCalled();
        expect(error).toHaveProperty("message", "User already exists");
        expect(error).toHaveProperty("statusCode", 409);
      }
    });

    afterAll(() => {
      spy.mockRestore();
    });
  });

  describe("authUser", () => {
    let spy: jest.SpyInstance;

    it("should authenticate a user", async () => {
      spy = jest
        .spyOn(UserService, "handleUserAuthResponse")
        .mockResolvedValue(mockedUser);
      (User.findOne as jest.Mock).mockResolvedValue(mockedUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const user = await UserService.authUser(
        mockUserData.email,
        mockUserData.password,
        { id: "123" }
      );

      expect(spy).toHaveBeenCalled();
      expect(user).toEqual(mockedUser);
    });

    it("should throw an error if the password is wrong", async () => {
      spy = jest
        .spyOn(UserService, "handleUserAuthResponse")
        .mockResolvedValue(mockedUser);
      (User.findOne as jest.Mock).mockResolvedValue(mockedUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      try {
        await UserService.authUser(mockUserData.email, "wrongpassword", {
          id: "123",
        });
      } catch (error) {
        expect(spy).not.toHaveBeenCalled();
        expect(error).toHaveProperty("message", "Invalid credentials");
        expect(error).toHaveProperty("statusCode", 401);
      }
    });

    it("should throw an error if the user does not exist", async () => {
      spy = jest
        .spyOn(UserService, "handleUserAuthResponse")
        .mockResolvedValue(mockedUser);
      (User.findOne as jest.Mock).mockResolvedValue(null);

      try {
        await UserService.authUser(mockUserData.email, mockUserData.password, {
          id: "123",
        });
      } catch (error) {
        expect(spy).not.toHaveBeenCalled();
        expect(error).toHaveProperty("message", "Invalid credentials");
        expect(error).toHaveProperty("statusCode", 401);
      }
    });

    afterAll(() => {
      spy.mockRestore();
    });
  });

  describe("handleUserAuthResponse", () => {
    let spy: jest.SpyInstance;
    const user = { id: "123", name: "John Doe", email: "test@test.com" };

    it("should not migrate cart if there is no anon id", async () => {
      spy = jest.spyOn(UserService, "migrateCart").mockResolvedValue({} as any);
      (generateToken as jest.Mock).mockReturnValue(token);

      const response = await UserService.handleUserAuthResponse(
        user as IUser,
        undefined
      );

      expect(spy).not.toHaveBeenCalled();
      expect(response).toEqual(mockedUser);
    });

    it("should handle user auth response", async () => {
      spy = jest.spyOn(UserService, "migrateCart").mockResolvedValue({} as any);
      (generateToken as jest.Mock).mockReturnValue(token);

      const response = await UserService.handleUserAuthResponse(
        user as IUser,
        "123"
      );

      expect(spy).toHaveBeenCalledWith(user.id, "123");
      expect(response).toEqual(mockedUser);
    });

    afterAll(() => {
      spy.mockRestore();
    });
  });

  describe("migrateCart", () => {
    const mockUserCart = {
      items: [{ product: "123", quantity: 2 }],
      save: jest.fn(),
    };

    const mockAnonCart = {
      items: [
        { product: "123", quantity: 1 },
        { product: "456", quantity: 3 },
      ],
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("Exits early if no anonymous cart is found", async () => {
      (Cart.findOne as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue(null),
      });

      await UserService.migrateCart("user1", "anon1");

      expect(CartService.getCartForUser).not.toHaveBeenCalled();
    });

    it("Exits early if anonymous cart is empty", async () => {
      (Cart.findOne as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue({ items: [] }),
      });

      await UserService.migrateCart("user1", "anon1");

      expect(CartService.getCartForUser).not.toHaveBeenCalled();
    });

    it("Exits early if user cart is not found", async () => {
      (Cart.findOne as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockAnonCart),
      });
      (CartService.getCartForUser as jest.Mock).mockResolvedValue(null);

      await UserService.migrateCart("user1", "anon1");

      expect(mockUserCart.save).not.toHaveBeenCalled();
      expect(Cart.deleteOne).not.toHaveBeenCalled();
    });

    it("Merges items and saves the user cart", async () => {
      (Cart.findOne as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockAnonCart),
      });

      (CartService.getCartForUser as jest.Mock).mockResolvedValue(mockUserCart);

      const userCart = await UserService.migrateCart("user1", "anon1");

      expect(userCart?.items).toEqual([
        { product: "123", quantity: 3 },
        { product: "456", quantity: 3 },
      ]);
      expect(mockUserCart.save).toHaveBeenCalled();
      expect(Cart.deleteOne).toHaveBeenCalledWith({ anonId: "anon1" });
    });

    it("Does not save if no items were updated", async () => {
      (Cart.findOne as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue({ items: [] }),
      });
      (CartService.getCartForUser as jest.Mock).mockResolvedValue(mockUserCart);

      await UserService.migrateCart("user1", "anon1");

      expect(mockUserCart.save).not.toHaveBeenCalled();
      expect(Cart.deleteOne).not.toHaveBeenCalled();
    });
  });
});
