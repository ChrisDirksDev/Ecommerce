import asyncHandler from "express-async-handler";
import { extractUserFromRequest } from "../utils/func";
import {
  addProductToCart,
  fetchCart,
  removeProductFromCart,
  updateProductInCart,
} from "services/cartService";

/**
 * Retrieves the cart for the authenticated user.
 *
 * This function uses an asynchronous handler to fetch the cart details
 * for the user making the request. It populates the cart with relevant
 * information and sends it back as a JSON response.
 *
 * @param req - The request object, extended to include the authenticated user.
 * @param res - The response object used to send back the cart data.
 * @returns A promise that resolves to void.
 */
export const getCart = asyncHandler(async (req, res): Promise<void> => {
  const user = extractUserFromRequest(req);
  const cart = await fetchCart(user);

  res.json(cart);
});

/**
 * Adds a product to the user's cart. If the product already exists in the cart,
 * it increments the quantity. If the product does not exist, it adds the product
 * with the specified quantity.
 *
 * @param req - The request object containing the product ID and quantity in the body.
 * @param res - The response object used to send back the updated cart.
 * @returns void
 */
export const addToCart = asyncHandler(async (req, res): Promise<void> => {
  const { product, quantity } = req.body;
  const user = extractUserFromRequest(req);
  const cart = await addProductToCart(user, product, quantity);

  res.json(cart);
});

/**
 * Removes a product from the user's cart. If the product's quantity is greater than one,
 * it decrements the quantity by one. If the product's quantity is one, it removes the product
 * from the cart.
 *
 * @param req - Express request object, expected to contain `params.productId` and `user` in the request object.
 * @param res - Express response object used to send the response.
 * @returns A promise that resolves to void.
 *
 * @throws 404 error if the cart or item is not found.
 */
export const removeFromCart = asyncHandler(async (req, res): Promise<void> => {
  const { productId } = req.params;
  const user = extractUserFromRequest(req);
  const cart = await removeProductFromCart(user, productId);

  res.json(cart);
});

/**
 * Updates the cart for the authenticated user.
 *
 * This function handles the updating of the cart items for the user making the request.
 * It expects the request body to contain the new items for the cart.
 * If the cart does not exist for the user, it responds with a 404 status and an error message.
 * Otherwise, it updates the cart with the new items and saves it.
 * Finally, it responds with the updated and populated cart.
 *
 * @param req - The request object, expected to contain the user and the new cart items.
 * @param res - The response object, used to send back the updated cart or an error message.
 * @returns void
 */
export const updateCart = asyncHandler(async (req, res): Promise<void> => {
  const { productId } = req.params;
  const { quantity } = req.body;
  const user = extractUserFromRequest(req);

  const cart = updateProductInCart(user, productId, quantity);

  res.json(cart);
});
