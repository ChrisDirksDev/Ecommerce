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
router.put("/update", isAuthenticated, updateCart);
router.delete("/remove", isAuthenticated, removeFromCart);

export default router;
