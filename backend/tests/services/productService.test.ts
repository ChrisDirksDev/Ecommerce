import dotenv from "dotenv";
import * as ProductService from "services/productService";
import { Product } from "models";

dotenv.config();

jest.mock("models");

describe("ProductService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchProducts", () => {
    it("should fetch products", async () => {
      (Product.find as jest.Mock).mockReturnValue({
        sort: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([]),
          }),
        }),
      });

      const products = await ProductService.fetchProducts(0, 10);

      expect(products).toEqual([]);
    });
  });

  describe("createProduct", () => {
    it("should create a product", async () => {
      (Product.create as jest.Mock).mockResolvedValue({ name: "test" });

      const product = await ProductService.createProduct(
        "test",
        10,
        "test",
        "test"
      );

      expect(product).toEqual({ name: "test" });
    });
  });

  describe("updateProduct", () => {
    it("should update a product", async () => {
      (Product.findByIdAndUpdate as jest.Mock).mockResolvedValue({
        name: "test",
      });

      const product = await ProductService.updateProduct(
        "123",
        "test",
        10,
        "test",
        "test"
      );

      expect(product).toEqual({ name: "test" });
    });
  });

  describe("deleteProduct", () => {
    it("should delete a product", async () => {
      (Product.findByIdAndDelete as jest.Mock).mockResolvedValue({
        name: "test",
      });

      const product = await ProductService.deleteProduct("123");

      expect(product).toEqual({ name: "test" });
    });
  });

  describe("getProductById", () => {
    it("should get a product by id", async () => {
      (Product.findById as jest.Mock).mockResolvedValue({ name: "test" });

      const product = await ProductService.getProductById("123");

      expect(product).toEqual({ name: "test" });
    });
  });
});
