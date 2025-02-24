import request from "supertest";
import { Product } from "models";
import mongoose from "mongoose";
import app from "../app";

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
    req = { user: { _id: userId.toString(), name: "string" } },
    res: any,
    next: () => void
  ) => {
    req.user = { _id: userId.toString(), name: "Test User" };
    next();
  },
}));

describe("Product Controller", () => {
  describe("getProducts", () => {
    beforeEach(async () => {
      await Product.create([
        {
          name: "Product 1",
          price: 50,
          description: "Description 1",
          imageUrl: "http://example.com/image1.jpg",
        },
        {
          name: "Product 2",
          price: 100,
          description: "Description 2",
          imageUrl: "http://example.com/image2.jpg",
        },
      ]);
    });

    it("should retrieve a paginated list of products", async () => {
      const response = await request(app)
        .get("/api/products?page=2&limit=1")
        .expect(200);

      expect(response.body.length).toBe(1);
      expect(response.body[0].name).toBe("Product 2");
    });

    it("should return an empty array if no products are found", async () => {
      await Product.deleteMany({});

      const response = await request(app)
        .get("/api/products?page=1&limit=1")
        .expect(200);

      expect(response.body.length).toBe(0);
    });
  });

  describe("createProduct", () => {
    it("should create a new product successfully", async () => {
      const newProduct = {
        name: "New Product",
        price: 200,
        description: "New Description",
        imageUrl: "http://example.com/new-image.jpg",
      };

      const response = await request(app)
        .post("/api/products")
        .send(newProduct)
        .expect(201);

      expect(response.body.name).toBe(newProduct.name);
      expect(response.body.price).toBe(newProduct.price);
      expect(response.body.description).toBe(newProduct.description);
      expect(response.body.imageUrl).toBe(newProduct.imageUrl);
    });
  });

  describe("updateProduct", () => {
    let product: any;

    beforeEach(async () => {
      product = await Product.create({
        name: "Test Product",
        price: 100,
        description: "Test Description",
        imageUrl: "http://example.com/image.jpg",
      });
    });

    it("should update a product successfully", async () => {
      const updatedData = {
        name: "Updated Product",
        price: 150,
        description: "Updated Description",
        imageUrl: "http://example.com/updated-image.jpg",
      };

      const response = await request(app)
        .put(`/api/products/${product._id}`)
        .send(updatedData)
        .expect(200);

      expect(response.body.name).toBe(updatedData.name);
      expect(response.body.price).toBe(updatedData.price);
      expect(response.body.description).toBe(updatedData.description);
      expect(response.body.imageUrl).toBe(updatedData.imageUrl);
    });

    it("should return 404 if the product is not found", async () => {
      const nonExistentId = new mongoose.Types.ObjectId();

      const response = await request(app)
        .put(`/api/products/${nonExistentId}`)
        .send({
          name: "Non-existent Product",
          price: 200,
          description: "Non-existent Description",
          imageUrl: "http://example.com/non-existent-image.jpg",
        })
        .expect(404);

      expect(response.body.message).toBe("Product not found");
    });
  });
  describe("deleteProduct", () => {
    let product: any;

    beforeEach(async () => {
      product = await Product.create({
        name: "Product to Delete",
        price: 100,
        description: "Description to Delete",
        imageUrl: "http://example.com/delete-image.jpg",
      });
    });

    it("should delete a product successfully", async () => {
      const response = await request(app)
        .delete(`/api/products/${product._id}`)
        .expect(200);

      expect(response.body.message).toBe("Product removed");
    });

    it("should return 404 if the product is not found", async () => {
      const nonExistentId = new mongoose.Types.ObjectId();

      const response = await request(app)
        .delete(`/api/products/${nonExistentId}`)
        .expect(404);

      expect(response.body.message).toBe("Product not found");
    });
  });
});
