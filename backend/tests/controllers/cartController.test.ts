import request from "supertest";
import mongoose from "mongoose";
import app from "../app";
import * as CartService from "services/cartService";
import { makeRequest } from "../testUtils";

const productId = new mongoose.Types.ObjectId().toString();

jest.mock("services/cartService");

jest.mock("utils/func", () => ({
  extractUserFromRequest: jest.fn(() => "userId"),
}));

describe("Cart Controller", () => {
  const cart = {
    userId: new mongoose.Types.ObjectId().toString(),
    items: [
      {
        product: productId,
        quantity: 2,
      },
    ],
    total: 200,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getCart", () => {
    it("should attempt to get the cart", async () => {
      (CartService.fetchCart as jest.Mock).mockResolvedValue(cart);
      const response = await makeRequest(request(app).get("/api/cart"), 200);

      expect(CartService.fetchCart).toHaveBeenCalledWith("userId");
      expect(response.body).toEqual(cart);
    });
  });

  describe("addToCart", () => {
    it("should attempt to add a product to the cart", async () => {
      (CartService.addProductToCart as jest.Mock).mockResolvedValue(cart);
      const response = await makeRequest(
        request(app)
          .post("/api/cart/items")
          .send({ product: productId, quantity: 2 }),
        200
      );

      expect(CartService.addProductToCart).toHaveBeenCalledWith(
        "userId",
        productId,
        2
      );
      expect(response.body).toEqual(cart);
    });
  });

  describe("removeFromCart", () => {
    it("should attempt to remove a product from the cart", async () => {
      (CartService.removeProductFromCart as jest.Mock).mockResolvedValue(cart);

      const response = await makeRequest(
        request(app).delete(`/api/cart/items/${productId}`),
        200
      );

      expect(CartService.removeProductFromCart).toHaveBeenCalledWith(
        "userId",
        productId
      );
      expect(response.body).toEqual(cart);
    });
  });
  describe("updateCart", () => {
    it("should attempt to update the cart", async () => {
      const newCart = {
        items: [
          {
            product: productId,
            quantity: 3,
          },
        ],
        total: 300,
      };

      (CartService.updateProductInCart as jest.Mock).mockResolvedValue(newCart);

      const response = await makeRequest(
        request(app).put(`/api/cart/items/${productId}`).send({ quantity: 3 }),
        200
      );

      expect(CartService.updateProductInCart).toHaveBeenCalledWith(
        "userId",
        productId,
        3
      );
      expect(response.body).toEqual(newCart);
    });
  });
});
