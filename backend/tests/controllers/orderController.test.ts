import request from "supertest";
import mongoose from "mongoose";
import app from "../app";
import { makeRequest } from "../testUtils";
import * as OrderService from "services/orderService";
import * as AuthMiddlware from "middleware/authMiddleware";

const order = {
  _id: new mongoose.Types.ObjectId().toString(),
  user: "userId",
  products: [
    {
      product: "product1",
      quantity: 2,
    },
  ],
  total: 200,
  status: "pending",
  paymentStatus: "unpaid",
};

jest.mock("services/orderService");

jest.mock("utils/func", () => ({
  extractUserFromRequest: jest.fn(() => "userId"),
}));

describe("Order Controller", () => {
  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe("getOrders", () => {
    it("should attempt to get the orders", async () => {
      (OrderService.fetchOrders as jest.Mock).mockResolvedValue([order]);

      const response = await makeRequest(request(app).get("/api/orders"), 200);

      expect(OrderService.fetchOrders).toHaveBeenCalledWith("userId");
      expect(response.body).toEqual([order]);
    });
  });
  describe("placeOrder", () => {
    it("should attempt to place an order", async () => {
      (OrderService.placeOrder as jest.Mock).mockResolvedValue(order);

      const response = await makeRequest(request(app).post("/api/orders"), 201);

      expect(OrderService.placeOrder).toHaveBeenCalledWith("userId");
      expect(response.body).toEqual(order);
    });
  });
  describe("getOrderById", () => {
    it("should attempt to get an order by ID", async () => {
      (OrderService.fetchOrderById as jest.Mock).mockResolvedValue(order);

      const response = await makeRequest(
        request(app).get("/api/orders/" + order._id),
        200
      );

      expect(OrderService.fetchOrderById).toHaveBeenCalledWith(
        order._id,
        "userId"
      );
      expect(response.body).toEqual(order);
    });
  });
  describe("updateOrderStatus", () => {
    it("should return 401 if the user is not an admin", async () => {
      const response = await makeRequest(
        request(app)
          .put("/api/orders/" + order._id)
          .send({
            status: "shipped",
            paymentStatus: "paid",
          }),
        401
      );

      expect(response.body.message).toBe("Unauthorized");
    });

    it("should attempt to update the order status", async () => {
      (OrderService.updateOrderStatus as jest.Mock).mockResolvedValue(order);
      (AuthMiddlware.userAuth as jest.Mock).mockImplementation(
        (req, res, next) => {
          (req as any).user = { admin: true };
          next();
        }
      );

      const response = await makeRequest(
        request(app)
          .put("/api/orders/" + order._id)
          .send({
            status: "shipped",
            paymentStatus: "paid",
          }),
        200
      );

      expect(OrderService.updateOrderStatus).toHaveBeenCalledWith(
        order._id,
        "shipped",
        "paid"
      );
      expect(response.body).toEqual(order);
    });
  });
});
