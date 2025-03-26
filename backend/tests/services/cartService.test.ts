import * as CartService from "services/cartService";
import { Cart, Product } from "models";
import mongoose from "mongoose";

jest.mock("models");

describe("Cart Service", () => {
  let spy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchCart", () => {
    it("should fetch cart", async () => {
      spy = jest
        .spyOn(CartService, "getPopulatedCart")
        .mockResolvedValue({} as any);

      const cart = await CartService.fetchCart("123");

      expect(cart).toEqual({});
    });
  });

  describe("addProductToCart", () => {
    it("should call Cart.findOneAndUpdate twice if no cart exists", async () => {
      spy = jest
        .spyOn(CartService, "getPopulatedCart")
        .mockResolvedValue({} as any);
      (Product.findOneAndUpdate as jest.Mock).mockResolvedValue(null);

      await CartService.addProductToCart("123", "456", 1);

      expect(Product.findOneAndUpdate).toHaveBeenCalledTimes(2);
    });

    it("should add product to cart", async () => {
      spy = jest
        .spyOn(CartService, "getPopulatedCart")
        .mockResolvedValue({} as any);
      (Product.findOneAndUpdate as jest.Mock).mockResolvedValue({});

      const cart = await CartService.addProductToCart("123", "456", 1);

      expect(Product.findOneAndUpdate).toHaveBeenCalledTimes(1);
      expect(cart).toEqual({});
    });
  });

  describe("removeProductFromCart", () => {
    it("should remove product from cart", async () => {
      spy = jest
        .spyOn(CartService, "getPopulatedCart")
        .mockResolvedValue({} as any);

      const cart = await CartService.removeProductFromCart("123", "456");

      expect(Product.updateOne).toHaveBeenCalled();
      expect(cart).toEqual({});
    });
  });

  describe("updateProductInCart", () => {
    it("should throw error if cart not found", async () => {
      (Cart.findOne as jest.Mock).mockResolvedValue(null);

      expect(CartService.updateProductInCart("123", "456", 2)).rejects.toThrow(
        "Cart not found"
      );
    });

    it("should update product in cart", async () => {
      spy = jest
        .spyOn(CartService, "getPopulatedCart")
        .mockResolvedValue({} as any);
      (Cart.findOne as jest.Mock).mockResolvedValue({});
      (Cart.updateOne as jest.Mock).mockResolvedValue({});

      const cart = await CartService.updateProductInCart("123", "456", 2);

      expect(Product.updateOne).toHaveBeenCalled();
      expect(cart).toEqual({});
    });
  });

  describe("getPopulatedCart", () => {
    beforeAll(() => {
      spy.mockRestore();
    });
    it("should get populated cart", async () => {
      const id = new mongoose.Types.ObjectId().toString();
      (Cart.findOneAndUpdate as jest.Mock).mockReturnValue({
        populate: jest.fn().mockReturnValue({
          lean: jest.fn().mockResolvedValue({
            items: [{ product: { name: "test", price: 10 }, quantity: 2 }],
          }),
        }),
      });

      const cart = await CartService.getPopulatedCart(id);

      expect(cart).toEqual({
        items: [{ product: { name: "test", price: 10 }, quantity: 2 }],
        total: 20,
      });
    });
  });

  describe("getCartForUser", () => {
    it("should get cart for user", async () => {
      const id = new mongoose.Types.ObjectId().toString();
      (Product.findOneAndUpdate as jest.Mock).mockResolvedValue({
        name: "test",
        price: 10,
      });

      const cart = await CartService.getCartForUser(id);

      expect(cart).toEqual({
        name: "test",
        price: 10,
      });
    });
  });
});
