import express from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} from "../controllers/productController";
import { adminAuth } from "../middleware/authMiddleware";
import {
  validateBody,
  validateParams,
  validateQuery,
} from "middleware/validationMiddleware";
import {
  addProductSchema,
  deleteProductSchema,
  getProductsSchema,
  updateProductBodySchema,
  updateProductParamsSchema,
  getProductByIdSchema,
} from "utils/schemas";

const router = express.Router();

router.get("/", validateQuery(getProductsSchema), getProducts);
router.post("/", adminAuth, validateBody(addProductSchema), createProduct);
router.put(
  "/:id",
  adminAuth,
  validateParams(updateProductParamsSchema),
  validateBody(updateProductBodySchema),
  updateProduct
);
router.delete(
  "/:id",
  adminAuth,
  validateParams(deleteProductSchema),
  deleteProduct
);
router.get("/:id", validateParams(getProductByIdSchema), getProductById);

export default router;
