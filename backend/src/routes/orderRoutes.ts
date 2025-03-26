import express from "express";
import { userAuth } from "middleware/authMiddleware";
import {
  getOrders,
  placeOrder,
  getOrderById,
  updateOrderStatus,
} from "../controllers/orderController";
import { validateBody, validateParams } from "middleware/validationMiddleware";
import { orderIdParamsSchema, updateOrderBodySchema } from "utils/schemas";

const router = express.Router();

router.get("/", userAuth, getOrders);
router.post("/", userAuth, placeOrder);
router.get(
  "/:orderId",
  userAuth,
  validateParams(orderIdParamsSchema),
  getOrderById
);
router.put(
  "/:orderId",
  userAuth,
  validateParams(orderIdParamsSchema),
  validateBody(updateOrderBodySchema),
  updateOrderStatus
);

export default router;
