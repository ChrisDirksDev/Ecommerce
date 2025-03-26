import express from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
  updateCart,
} from "../controllers/cartController";
import { userAuth } from "middleware/authMiddleware";
import { validateBody, validateParams } from "middleware/validationMiddleware";
import {
  cartItemSchema,
  productIdSchema,
  updateCartBodySchema,
} from "utils/schemas";

const router = express.Router();

router.get("/", userAuth, getCart);
router.post("/items", userAuth, validateBody(cartItemSchema), addToCart);
router.delete(
  "/items/:productId",
  userAuth,
  validateParams(productIdSchema),
  removeFromCart
);
router.put(
  "/items/:productId",
  userAuth,
  validateParams(productIdSchema),
  validateBody(updateCartBodySchema),
  updateCart
);

export default router;
