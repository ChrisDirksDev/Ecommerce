import asyncHandler from "express-async-handler";

import { UserRequest } from "../utils/types";
import { Request, Response } from "express";
import { authUser, registerUser } from "services/userService";

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
    const { user } = req as UserRequest;
    const newUser = await registerUser(name, email, password, user);

    res.status(201).json(newUser);
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
 * @throws {401} If the user's credentials are invalid.
 */
export const loginUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    const { user } = req as UserRequest;
    const authedUser = await authUser(email, password, user);

    res.json(authedUser);
  }
);
