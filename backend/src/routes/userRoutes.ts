import express from "express";
import { loginUser, signUpUser } from "../controllers/userController";
import { validateBody } from "middleware/validationMiddleware";
import { loginSchema, userSignupSchema } from "utils/utils";

const router = express.Router();

router.post("/login", validateBody(loginSchema), loginUser);
router.post("/signup", validateBody(userSignupSchema), signUpUser);

export default router;
