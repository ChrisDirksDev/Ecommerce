import request from "supertest";
import mongoose from "mongoose";
import app from "../app";
import { Cart, Order, Product } from "models";

const userId = new mongoose.Types.ObjectId();

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
    req = { user: { _id: userId.toString(), admin: true } },
    res: any,
    next: () => void
  ) => {
    req.user = { _id: userId.toString(), admin: true };
    next();
  },
}));

describe("Order Controller", () => {
  describe("getOrders", () => {
    it("should return no orders if the user has none", async () => {
      const response = await request(app)
        .get("/api/orders")
        .set("Authorization", `Bearer ${userId}`)
        .expect(200);

      expect(response.body).toEqual([]);
    });

    it("should return an order if the user has one", async () => {
      await Order.create({
        user: userId,
        items: [
          {
            product: new mongoose.Types.ObjectId(),
            quantity: 1,
          },
        ],
        totalPrice: 50,
        paymentStatus: "pending",
        status: "pending",
      });

      const response = await request(app)
        .get("/api/orders")
        .set("Authorization", `Bearer ${userId}`)
        .expect(200);

      expect(response.body.length).toBe(1);
    });
  });
  describe("placeOrder", () => {
    it("should return an error if the cart is empty", async () => {
      const response = await request(app)
        .post("/api/orders")
        .set("Authorization", `Bearer ${userId}`)
        .expect(400);

      expect(response.body.message).toEqual("Cart is empty");
    });

    it("should create a new order if the cart is not empty", async () => {
      const productId = new mongoose.Types.ObjectId();

      await Product.create({
        _id: productId,
        name: "Product 1",
        price: 50,
        description: "Description 1",
        imageUrl: "http://example.com/image1.jpg",
      });

      await Cart.create({
        user: userId,
        items: [
          {
            product: productId,
            quantity: 1,
          },
        ],
      });

      const response = await request(app)
        .post("/api/orders")
        .set("Authorization", `Bearer ${userId}`)
        .expect(201);

      expect(response.body).toMatchObject({
        user: userId.toString(),
        items: [
          {
            product: productId.toString(),
            quantity: 1,
          },
        ],
        totalPrice: 50,
        paymentStatus: "pending",
        status: "pending",
      });
    });
  });
  describe("getOrderById", () => {
    it("should return an error if the order is not found", async () => {
      const response = await request(app)
        .get(`/api/orders/${new mongoose.Types.ObjectId()}`)
        .set("Authorization", `Bearer ${userId}`)
        .expect(404);

      expect(response.body.message).toEqual("Order not found");
    });

    it("should return the order if it is found", async () => {
      const order = await Order.create({
        user: userId,
        items: [
          {
            product: new mongoose.Types.ObjectId(),
            quantity: 1,
          },
        ],
        totalPrice: 50,
        paymentStatus: "pending",
        status: "pending",
      });

      const response = await request(app)
        .get(`/api/orders/${order._id}`)
        .set("Authorization", `Bearer ${userId}`)
        .expect(200);

      expect(response.body).toMatchObject({
        user: userId.toString(),
        items: [
          {
            product: order.items[0].product.toString(),
            quantity: 1,
          },
        ],
        totalPrice: 50,
        paymentStatus: "pending",
        status: "pending",
      });
    });
  });
  describe("updateOrderStatus", () => {
    it("should return an error if the order is not found", async () => {
      const response = await request(app)
        .put(`/api/orders/${new mongoose.Types.ObjectId()}`)
        .set("Authorization", `Bearer ${userId}`)
        .send({
          status: "shipped",
          paymentStatus: "paid",
        })
        .expect(404);

      expect(response.body.message).toEqual("Order not found");
    });

    it("should update the order status if the order is found", async () => {
      const order = await Order.create({
        user: userId,
        items: [
          {
            product: new mongoose.Types.ObjectId(),
            quantity: 1,
          },
        ],
        totalPrice: 50,
        paymentStatus: "pending",
        status: "pending",
      });

      const response = await request(app)
        .put(`/api/orders/${order._id}`)
        .set("Authorization", `Bearer ${userId}`)
        .send({
          status: "shipped",
          paymentStatus: "paid",
        })
        .expect(200);

      expect(response.body).toMatchObject({
        user: userId.toString(),
        items: [
          {
            product: order.items[0].product.toString(),
            quantity: 1,
          },
        ],
        totalPrice: 50,
        paymentStatus: "paid",
        status: "shipped",
      });
    });
  });
});
