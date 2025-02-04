import asyncHandler from "express-async-handler";
import { AuthRequest } from "../middleware/authMiddleware";
import Product from "../models/Product";

export const getProducts = asyncHandler(async (req: AuthRequest, res) => {
  const products = await Product.find({});

  res.json(products);
});

export const createProduct = asyncHandler(async (req: AuthRequest, res) => {
  const { name, price, description, imageUrl } = req.body;

  const product = await Product.create({ name, price, description, imageUrl });

  res.status(201).json(product);
});

export const updateProduct = asyncHandler(async (req: AuthRequest, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedProduct);
});

export const deleteProduct = asyncHandler(async (req: AuthRequest, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await product.deleteOne();
  res.json({ message: "Product removed" });
});
