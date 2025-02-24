import mongoose from "mongoose";
import Order from "../../src/models/orderModel";

describe("Order Model", () => {
  it("should create and save an order successfully", async () => {
    const validOrder = new Order({
      user: new mongoose.Types.ObjectId(),
      items: [
        {
          product: new mongoose.Types.ObjectId(),
          quantity: 2,
        },
      ],
      totalPrice: 100,
    });
    const savedOrder = await validOrder.save();

    expect(savedOrder._id).toBeDefined();
    expect(savedOrder.user).toBe(validOrder.user);
    expect(savedOrder.items.length).toBe(1);
    expect(savedOrder.items[0].product).toBe(validOrder.items[0].product);
    expect(savedOrder.items[0].quantity).toBe(validOrder.items[0].quantity);
    expect(savedOrder.totalPrice).toBe(validOrder.totalPrice);
    expect(savedOrder.paymentStatus).toBe("pending");
    expect(savedOrder.status).toBe("pending");
  });

  it("should fail to create an order without required fields", async () => {
    const orderWithoutRequiredField = new Order({});
    let err;
    try {
      await orderWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    if (err instanceof mongoose.Error.ValidationError) {
      expect(err.errors.user).toBeDefined();
    }
  });

  it("should fail to create an order with invalid quantity", async () => {
    const orderWithInvalidQuantity = new Order({
      user: new mongoose.Types.ObjectId(),
      items: [
        {
          product: new mongoose.Types.ObjectId(),
          quantity: 0,
        },
      ],
      totalPrice: 100,
    });
    let err;
    try {
      await orderWithInvalidQuantity.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    if (err instanceof mongoose.Error.ValidationError) {
      expect(err.errors["items.0.quantity"]).toBeDefined();
    }
  });

  it("should default paymentStatus and status to 'pending'", async () => {
    const validOrder = new Order({
      user: new mongoose.Types.ObjectId(),
      items: [
        {
          product: new mongoose.Types.ObjectId(),
          quantity: 1,
        },
      ],
      totalPrice: 50,
    });
    const savedOrder = await validOrder.save();

    expect(savedOrder.paymentStatus).toBe("pending");
    expect(savedOrder.status).toBe("pending");
  });
});
