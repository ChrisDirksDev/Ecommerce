import request from "supertest";
import app from "../app";
import { Cart, Product } from "models";
import mongoose from "mongoose";

const userId = new mongoose.Types.ObjectId();
const productId = new mongoose.Types.ObjectId();

jest.mock("../../src/middleware/authMiddleware", () => ({
  adminAuth: (
    req = { user: { _id: userId.toString(), name: "string" } },
    res: any,
    next: () => void
  ) => {
    req.user = { _id: userId.toString(), name: "Test User" };
    next();
  },
  userAuth: (
    req = { user: { _id: userId.toString(), name: "string" } },
    res: any,
    next: () => void
  ) => {
    req.user = { _id: userId.toString(), name: "Test User" };
    next();
  },
}));

describe("Cart Controller", () => {
  beforeEach(async () => {
    await Product.create({
      _id: productId,
      name: "Test Product",
      price: 100,
      description: "Test Description",
      imageUrl: "http://example.com/image.jpg",
    });
  });
  describe("getCart", () => {
    it("should return an empty cart if there is no active cart", async () => {
      const res = await request(app)
        .get("/api/cart")
        .set("Authorization", `Bearer ${userId}`)
        .expect(200);

      expect(res.body).toHaveProperty("items");
      expect(res.body.items.length).toBe(0);
    });

    it("should retrieve the cart for the authenticated user", async () => {
      await Cart.create({
        user: userId,
        items: [{ product: productId, quantity: 1 }],
      });

      const res = await request(app)
        .get("/api/cart")
        .set("Authorization", `Bearer ${userId}`) // Assuming you use JWT for authentication
        .expect(200);

      expect(res.body).toHaveProperty("items");
      expect(res.body.items[0]).toHaveProperty("product");
      expect(res.body.items[0].product._id).toBe(productId.toString());
    });
  });

  describe("addToCart", () => {
    it("should add a product to the user's cart", async () => {
      await Cart.create({
        user: userId,
        items: [],
      });
      const res = await request(app)
        .post("/api/cart/items")
        .send({ product: productId, quantity: 1 })
        .set("Authorization", `Bearer ${userId}`);

      expect(res.body).toHaveProperty("items");
      expect(res.body.items[0]).toHaveProperty("product");
      expect(res.body.items[0].product._id).toBe(productId.toString());
      expect(res.body.items[0].quantity).toBe(1);
    });

    it("should increment the quantity if the product is already in the cart", async () => {
      await Cart.create({
        user: userId,
        items: [{ product: productId, quantity: 1 }],
      });

      const res = await request(app)
        .post("/api/cart/items")
        .send({ product: productId, quantity: 1 })
        .set("Authorization", `Bearer ${userId}`);

      expect(res.body).toHaveProperty("items");
      expect(res.body.items[0].quantity).toBe(2);
    });

    it("should create a new cart if the user does not have an active cart", async () => {
      const res = await request(app)
        .post("/api/cart/items")
        .send({ product: productId, quantity: 1 })
        .set("Authorization", `Bearer ${userId}`);

      expect(res.body).toHaveProperty("items");
      expect(res.body.items[0].product._id).toBe(productId.toString());
      expect(res.body.items[0].quantity).toBe(1);
    });
  });

  describe("removeFromCart", () => {
    it("should remove a product from the user's cart", async () => {
      await Cart.create({
        user: userId,
        items: [{ product: productId, quantity: 1 }],
      });

      const res = await request(app)
        .delete(`/api/cart/items/${productId}`)
        .set("Authorization", `Bearer ${userId}`)
        .expect(200);

      expect(res.body).toHaveProperty("items");
      expect(res.body.items.length).toBe(0);
    });

    it("should decrement the quantity if the product's quantity is greater than one", async () => {
      await Cart.create({
        user: userId,
        items: [{ product: productId, quantity: 2 }],
      });

      const res = await request(app)
        .delete(`/api/cart/items/${productId}`)
        .set("Authorization", `Bearer ${userId}`)
        .expect(200);

      expect(res.body).toHaveProperty("items");
      expect(res.body.items[0].quantity).toBe(1);
    });

    it("should return 404 if cart is not found when removing", async () => {
      const res = await request(app)
        .delete(`/api/cart/items/${productId}`)
        .set("Authorization", `Bearer ${userId}`)
        .expect(404);

      expect(res.body).toHaveProperty("message", "Cart not found");
    });

    it("should return 404 if item is not found in cart when removing", async () => {
      await Cart.create({
        user: userId,
        items: [{ product: productId, quantity: 1 }],
      });

      const res = await request(app)
        .delete(`/api/cart/items/${new mongoose.Types.ObjectId()}`)
        .set("Authorization", `Bearer ${userId}`)
        .expect(404);

      expect(res.body).toHaveProperty("message", "Item not found in cart");
    });
  });

  describe("updateCart", () => {
    it("should update the cart for the authenticated user", async () => {
      await Cart.create({
        user: userId,
        items: [{ product: productId, quantity: 1 }],
      });

      const newItems = [{ product: productId, quantity: 2 }];
      const res = await request(app)
        .put("/api/cart/items")
        .send({ items: newItems })
        .set("Authorization", `Bearer ${userId}`)
        .expect(200);

      expect(res.body).toHaveProperty("items");
      expect(res.body.items[0].quantity).toBe(2);
    });

    it("should return 404 if the cart is not found", async () => {
      const newItems = [{ product: productId, quantity: 2 }];
      const res = await request(app)
        .put("/api/cart/items")
        .send({ items: newItems })
        .set("Authorization", `Bearer ${userId}`)
        .expect(404);

      expect(res.body).toHaveProperty("message", "Cart not found");
    });
  });

  describe("getPopulatedCart", () => {
    it("should return the populated cart for the authenticated user", async () => {
      await Cart.create({
        user: userId,
        items: [{ product: productId, quantity: 1 }],
      });

      const res = await request(app)
        .get("/api/cart")
        .set("Authorization", `Bearer ${userId}`)
        .expect(200);

      expect(res.body).toHaveProperty("items");
      expect(res.body.items[0].product).toHaveProperty("name", "Test Product");
    });

    it("should return the correct total price for the cart", async () => {
      await Cart.create({
        user: userId,
        items: [
          { product: productId, quantity: 1 },
          { product: productId, quantity: 2 },
        ],
      });

      const res = await request(app)
        .get("/api/cart")
        .set("Authorization", `Bearer ${userId}`)
        .expect(200);

      expect(res.body).toHaveProperty("total");
      expect(res.body.total).toBe(300);
    });
  });
});
