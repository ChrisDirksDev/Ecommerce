import express from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
  updateCart,
} from "../controllers/cartController";
import { isAuthenticated } from "../middleware/authMiddleware";

const router = express.Router();
router.get("/", isAuthenticated, getCart);
router.post("/add", isAuthenticated, addToCart);
router.delete("/remove/:productId", isAuthenticated, removeFromCart);
router.put("/update", isAuthenticated, updateCart);

export default router;
