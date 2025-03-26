import request from "supertest";
import { Product } from "models";
import mongoose from "mongoose";
import app from "../app";
import * as ProductService from "services/productService";
import { makeRequest } from "../testUtils";

jest.mock("services/productService");

jest.mock("models");

describe("Product Controller", () => {
  const mockProducts = [
    {
      name: "Product 1",
      price: 50,
      description: "Description 1",
      imageUrl: "http://example.com/image.jpg",
    },
    {
      name: "Product 2",
      price: 100,
      description: "Description 2",
      imageUrl: "http://example.com/image2.jpg",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getProducts", () => {
    it("should attempt to get products", async () => {
      (ProductService.fetchProducts as jest.Mock).mockResolvedValue([
        mockProducts[1],
      ]);

      const response = await makeRequest(
        request(app).get("/api/products?page=2&limit=1"),
        200
      );

      expect(ProductService.fetchProducts).toHaveBeenCalledWith(1, 1);
      expect(response.body.length).toBe(1);
      expect(response.body[0].name).toBe("Product 2");
    });
  });

  describe("createProduct", () => {
    const newProduct = {
      name: "New Product",
      price: 200,
      description: "New Description",
      imageUrl: "http://example.com/new-image.jpg",
    };

    it("should attempt to create a new product", async () => {
      (ProductService.createProduct as jest.Mock).mockResolvedValue(newProduct);

      const response = await makeRequest(
        request(app).post("/api/products").send(newProduct),
        201
      );

      expect(ProductService.createProduct).toHaveBeenCalledWith(
        newProduct.name,
        newProduct.price,
        newProduct.description,
        newProduct.imageUrl
      );
      expect(response.body).toEqual(newProduct);
    });
  });

  describe("updateProduct", () => {
    const product = {
      _id: new mongoose.Types.ObjectId().toString(),
      name: "Product to Update",
      price: 100,
      description: "Description to Update",
      imageUrl: "http://example.com/update-image.jpg",
    };

    const { _id, ...productWithoutId } = product;

    it("should return a 404 if the product is not found", async () => {
      Product.findById = jest.fn().mockResolvedValue(null);

      await makeRequest(
        request(app).put(`/api/products/${product._id}`).send(productWithoutId),
        404
      );

      expect(ProductService.updateProduct).not.toHaveBeenCalled();
    });

    it("should attempt to update the product", async () => {
      (ProductService.updateProduct as jest.Mock).mockResolvedValue(product);
      Product.findById = jest.fn().mockResolvedValue(product);

      const response = await makeRequest(
        request(app).put(`/api/products/${_id}`).send(productWithoutId),
        200
      );

      expect(ProductService.updateProduct).toHaveBeenCalledWith(
        product._id,
        product.name,
        product.price,
        product.description,
        product.imageUrl
      );
      expect(response.body).toEqual(product);
    });
  });

  describe("deleteProduct", () => {
    const product = {
      _id: new mongoose.Types.ObjectId().toString(),
      name: "Product to Delete",
      price: 100,
      description: "Description to Delete",
      imageUrl: "http://example.com/delete-image.jpg",
    };

    it("should return a 404 if the product is not found", async () => {
      (ProductService.deleteProduct as jest.Mock).mockResolvedValue(null);

      const response = await makeRequest(
        request(app).delete(`/api/products/${product._id}`),
        404
      );

      expect(response.body.message).toBe("Product not found");
    });

    it("should attempt to delete the product", async () => {
      (ProductService.deleteProduct as jest.Mock).mockResolvedValue(product);

      const response = await makeRequest(
        request(app).delete(`/api/products/${product._id}`),
        200
      );

      expect(ProductService.deleteProduct).toHaveBeenCalledWith(product._id);
      expect(response.body).toEqual({ message: "Product removed" });
    });
  });
});
