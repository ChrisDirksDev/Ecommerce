import express from "express";
import { getAnonUser } from "../controllers/anonUserController";
import { userAuth } from "middleware/authMiddleware";

const router = express.Router();

router.get("/", userAuth, getAnonUser);

export default router;
