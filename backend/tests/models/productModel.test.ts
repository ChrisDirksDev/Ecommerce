import mongoose from "mongoose";
import Product from "../../src/models/productModel";

describe("Product Model", () => {
  it("should create and save a product successfully", async () => {
    const validProduct = new Product({
      name: "Sample Product",
      price: 29.99,
      description: "This is a sample product",
      imageUrl: "http://example.com/image.jpg",
    });
    const savedProduct = await validProduct.save();

    expect(savedProduct._id).toBeDefined();
    expect(savedProduct.name).toBe(validProduct.name);
    expect(savedProduct.price).toBe(validProduct.price);
    expect(savedProduct.description).toBe(validProduct.description);
    expect(savedProduct.imageUrl).toBe(validProduct.imageUrl);
  });

  it("should fail to create a product without required fields", async () => {
    const productWithoutRequiredField = new Product({});
    let err;
    try {
      await productWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    if (err instanceof mongoose.Error.ValidationError) {
      expect(err.errors.name).toBeDefined();
      expect(err.errors.price).toBeDefined();
    }
  });

  it("should create a product without optional fields", async () => {
    const validProduct = new Product({
      name: "Sample Product",
      price: 29.99,
    });
    const savedProduct = await validProduct.save();

    expect(savedProduct._id).toBeDefined();
    expect(savedProduct.name).toBe(validProduct.name);
    expect(savedProduct.price).toBe(validProduct.price);
    expect(savedProduct.description).toBeUndefined();
    expect(savedProduct.imageUrl).toBeUndefined();
  });
});
