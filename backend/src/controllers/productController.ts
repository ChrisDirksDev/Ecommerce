import asyncHandler from "express-async-handler";
import { AuthRequest } from "../middleware/authMiddleware";
import Product from "../models/productModel";
import Joi from "joi";

/**
 * Retrieves a paginated list of products.
 *
 * @param {AuthRequest} req - The request object, containing query parameters for pagination.
 * @param {number} req.query.page - The page number to retrieve (default is 1).
 * @param {number} req.query.limit - The number of products per page (default is 10).
 * @param {Response} res - The response object, used to send the retrieved products.
 *
 * @returns {Promise<void>} A promise that resolves when the products have been retrieved and sent in the response.
 */
export const getProducts = asyncHandler(async (req: AuthRequest, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const products = await Product.find({})
    .sort({ createdAt: 1, name: 1 })
    .skip(skip)
    .limit(limit);
  res.json(products);
});

/**
 * Creates a new product.
 *
 * This function handles the creation of a new product by validating the request body
 * against the product schema. If the validation fails, it responds with a 400 status
 * and an error message. If the validation succeeds, it creates a new product in the
 * database and responds with the created product and a 201 status.
 *
 * @param req - The request object, which includes the product details in the body.
 * @param res - The response object used to send the response.
 *
 * @throws Will throw an error if the validation fails.
 */
export const createProduct = asyncHandler(async (req: AuthRequest, res) => {
  const { name, price, description, imageUrl } = req.body;

  const product = await Product.create({
    name,
    price,
    description,
    imageUrl,
  });
  res.status(201).json(product);
});

/**
 * Retrieves a product by its ID.
 *
 * This function uses an asynchronous handler to find a product by its ID from the request parameters.
 * If the product is not found, it responds with a 404 status and throws an error.
 * If the product is found, it responds with the product as JSON.
 *
 * @param {AuthRequest} req - The request object, containing the product ID in the parameters.
 * @param {Response} res - The response object used to send the product.
 *
 * @throws {Error} If the product is not found.
 */
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

/**
 * Deletes a product by its ID.
 *
 * This function uses an asynchronous handler to find a product by its ID from the request parameters.
 * If the product is not found, it responds with a 404 status and throws an error.
 * If the product is found, it deletes the product and responds with a JSON message indicating the product was removed.
 *
 * @param {AuthRequest} req - The request object, containing the product ID in the parameters.
 * @param {Response} res - The response object used to send the status and JSON message.
 *
 * @throws {Error} If the product is not found.
 */
export const deleteProduct = asyncHandler(async (req: AuthRequest, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await product.deleteOne();
  res.json({ message: "Product removed" });
});
