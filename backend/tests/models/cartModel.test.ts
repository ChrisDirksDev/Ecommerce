import mongoose from "mongoose";
import Cart from "../../src/models/cartModel";

describe("Cart Model", () => {
  it("should create and save a cart successfully", async () => {
    const validCart = new Cart({
      user: new mongoose.Types.ObjectId(),
      items: [
        {
          product: new mongoose.Types.ObjectId(),
          quantity: 2,
        },
      ],
    });
    const savedCart = await validCart.save();

    expect(savedCart._id).toBeDefined();
    expect(savedCart.user).toBe(validCart.user);
    expect(savedCart.items.length).toBe(1);
    expect(savedCart.items[0].product).toBe(validCart.items[0].product);
    expect(savedCart.items[0].quantity).toBe(validCart.items[0].quantity);
  });

  it("should fail to create a cart without required fields", async () => {
    const cartWithoutRequiredField = new Cart({});
    let err;
    try {
      await cartWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    if (err instanceof mongoose.Error.ValidationError) {
      expect(err.errors.user).toBeDefined();
    }
  });

  it("should fail to create a cart with invalid quantity", async () => {
    const cartWithInvalidQuantity = new Cart({
      user: new mongoose.Types.ObjectId(),
      items: [
        {
          product: new mongoose.Types.ObjectId(),
          quantity: 0,
        },
      ],
    });
    let err;
    try {
      await cartWithInvalidQuantity.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    if (err instanceof mongoose.Error.ValidationError) {
      expect(err.errors["items.0.quantity"]).toBeDefined();
    }
  });
});
