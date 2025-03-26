import * as OrderService from "services/orderService";
import { Cart, Order } from "models";

jest.mock("models");

describe("OrderService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchOrders", () => {
    it("should fetch orders", async () => {
      (Order.find as jest.Mock).mockResolvedValue([]);

      const orders = await OrderService.fetchOrders("123");

      expect(orders).toEqual([]);
    });
  });

  describe("placeOrder", () => {
    it("should throw an error if cart is empty", async () => {
      (Cart.findOne as jest.Mock).mockReturnValue({
        populate: jest.fn().mockResolvedValue({ items: [] }),
      });

      expect(OrderService.placeOrder("123")).rejects.toThrow("Cart is empty");
    });

    it("should place an order", async () => {
      (Order as any).mockImplementation(() => ({
        user: "123",
        save: jest.fn(),
      }));
      (Cart.findOne as jest.Mock).mockReturnValue({
        populate: jest.fn().mockResolvedValue({
          items: {
            length: 2,
            map: jest.fn().mockReturnValue([
              { product: "123", quantity: 2 },
              { product: "456", quantity: 1 },
            ]),
            toObject: jest.fn().mockReturnValue({
              reduce: jest.fn().mockReturnValue([
                { product: { price: 10 }, quantity: 2 },
                { product: { price: 20 }, quantity: 1 },
              ]),
            }),
          },
        }),
      });
      (Order.create as jest.Mock).mockResolvedValue({ user: "123" });
      (Cart.deleteOne as jest.Mock).mockResolvedValue({});

      const order = await OrderService.placeOrder("123");

      expect(order.user).toBe("123");
    });
  });

  describe("fetchOrderById", () => {
    it("should fetch an order by id", async () => {
      (Order.findOne as jest.Mock).mockReturnValue({
        populate: jest.fn().mockReturnValue({
          lean: jest.fn().mockResolvedValue({ user: "123" }),
        }),
      });

      const order = await OrderService.fetchOrderById("123", "123");

      expect(order).toEqual({ user: "123" });
    });
  });

  describe("updateOrderStatus", () => {
    it("should throw an error if order is not found", async () => {
      (Order.findById as jest.Mock).mockResolvedValue(null);

      await expect(
        OrderService.updateOrderStatus("123", "pending", "pending")
      ).rejects.toThrow("Order not found");
    });

    it("should update an order status", async () => {
      (Order.findById as jest.Mock).mockResolvedValue({
        status: "",
        paymentStatus: "",
        save: jest.fn(),
      });

      const response = await OrderService.updateOrderStatus(
        "123",
        "pending",
        "pending"
      );

      expect(response).toMatchObject({
        status: "pending",
        paymentStatus: "pending",
      });
    });
  });
});
