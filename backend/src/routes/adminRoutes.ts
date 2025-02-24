import express from "express";
import { loginAdmin, registerAdmin } from "../controllers/adminController";
import { validateBody } from "middleware/validationMiddleware";
import { loginSchema } from "utils/utils";

const router = express.Router();

router.post("/login", validateBody(loginSchema), loginAdmin);

export default router;
