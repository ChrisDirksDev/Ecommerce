import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/utils";
import { Request, Response } from "express";

/**
 * Handles user sign-up requests.
 *
 * This function validates the incoming request against the `signUpSchema`,
 * checks if a user with the provided email already exists, hashes the password,
 * creates a new user, and returns the user data along with a generated token.
 *
 * @param req - The request object containing user sign-up data.
 * @param res - The response object used to send back the appropriate HTTP response.
 * @returns A promise that resolves to void.
 *
 * @throws {Error} If there is an issue with user creation or validation.
 */
export const signUpUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  }
);

/**
 * Handles user login.
 *
 * This function validates the login request, checks the user's credentials,
 * and returns a JSON response with the user's details and a generated token.
 *
 * @param req - The request object containing the user's login details.
 * @param res - The response object used to send back the appropriate response.
 *
 * @returns A promise that resolves to void.
 *
 * @throws {400} If the request validation fails.
 * @throws {401} If the user's credentials are invalid.
 */
export const loginUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401);
      throw new Error("Invalid credentials");
    }

    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  }
);
