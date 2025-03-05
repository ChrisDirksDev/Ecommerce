import express from "express";
import { loginUser, signUpUser } from "../controllers/userController";
import { validateBody } from "middleware/validationMiddleware";
import { loginSchema, userSignupSchema } from "utils/schemas";
import { userAuth } from "middleware/authMiddleware";

const router = express.Router();

router.post("/login", userAuth, validateBody(loginSchema), loginUser);
router.post("/signup", userAuth, validateBody(userSignupSchema), signUpUser);

export default router;
