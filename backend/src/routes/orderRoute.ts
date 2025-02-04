import express from "express";
import { isAuthenticated } from "../middleware/authMiddleware";
import {
  getOrders,
  placeOrder,
  getOrderById,
  updateOrderStatus,
} from "../controllers/orderController";

const router = express.Router();

router.get("/", isAuthenticated, getOrders);
router.post("/", isAuthenticated, placeOrder);
router.get("/:orderId", isAuthenticated, getOrderById);
router.put("/:orderId", isAuthenticated, updateOrderStatus);

export default router;
