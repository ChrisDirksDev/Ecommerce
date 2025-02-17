import asyncHandler from "express-async-handler";
import Cart from "../models/cartModel";
import { UserRequest } from "../utils/utils";

/**
 * Retrieves the cart for the authenticated user.
 *
 * @param {UserRequest} req - The request object, containing the authenticated user.
 * @param {Response} res - The response object used to send back the cart data.
 * @returns {Promise<void>} - A promise that resolves when the cart data is sent in the response.
 */
export const getCart = asyncHandler(async (req: UserRequest, res) => {
  const user = req.user;

  const cart = await getPopulatedCart(user);

  res.json(cart);
});

/**
 * Adds a product to the user's cart. If the cart already exists, it updates the quantity of the product if it is already in the cart,
 * or adds the product to the cart if it is not. If the cart does not exist, it creates a new cart with the product.
 *
 * @param {UserRequest} req - The request object containing the user and the product details.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.productId - The ID of the product to add to the cart.
 * @param {number} [req.body.quantity=1] - The quantity of the product to add to the cart.
 * @param {Object} res - The response object.
 *
 * @returns {Promise<void>} - A promise that resolves to void.
 */
export const addToCart = asyncHandler(async (req: UserRequest, res) => {
  const { productId, quantity = 1 } = req.body;
  const user = req.user;
  const cart = await Cart.findOne({ user: user.id });

  if (cart) {
    const item = cart.items.find(
      (item: { productId: any }) => item.productId == productId
    );

    if (item) {
      item.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    const populatedCart = await getPopulatedCart(user);
    res.json(populatedCart);
  } else {
    const newCart = await Cart.create({
      user: user.id,
      items: [{ productId, quantity }],
    });
    res.status(201).json(newCart);
  }
});

/**
 * Removes a product from the user's cart.
 *
 * @param {UserRequest} req - The request object containing the user and product ID.
 * @param {Response} res - The response object to send the result.
 * @throws {Error} If the cart is not found.
 *
 * @returns {Promise<void>} A promise that resolves when the product is removed from the cart.
 */
export const removeFromCart = asyncHandler(async (req: UserRequest, res) => {
  const { productId } = req.params;
  const user = req.user;
  const cart = await Cart.findOne({ user: user.id });

  if (cart) {
    const item = cart.items.find(
      (item: { productId: any }) => item.productId == productId
    );

    if (item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        cart.items = cart.items
          .toObject()
          .filter((item: { productId: any }) => item.productId != productId);
      }
    } else {
      throw new Error("Item not found in cart");
    }

    await cart.save();
    const populatedCart = await getPopulatedCart(user);
    res.json(populatedCart);
  } else {
    res.status(404);
    throw new Error("Cart not found");
  }
});

/**
 * Updates the cart for the authenticated user.
 *
 * This function handles the updating of the cart items for the user making the request.
 * It expects the request body to contain the new items for the cart.
 * If the cart exists for the user, it updates the cart with the new items and saves it.
 * Then, it returns the populated cart as a JSON response.
 * If the cart does not exist, it responds with a 404 status and an error message.
 *
 * @param req - The request object, containing the user and the new cart items.
 * @param res - The response object, used to send the JSON response or error message.
 * @throws Will throw an error if the cart is not found.
 */
export const updateCart = asyncHandler(async (req: UserRequest, res) => {
  const { items } = req.body;
  const user = req.user;
  const cart = await Cart.findOne({ user: user.id });

  if (cart) {
    cart.items = items;
    await cart.save();
    const populatedCart = await getPopulatedCart(user);
    res.json(populatedCart);
  } else {
    res.status(404);
    throw new Error("Cart not found");
  }
});

/**
 * Retrieves a user's cart from the database, creating a new cart if one does not exist.
 * The cart is populated with product details for each item.
 *
 * @param {any} user - The user object containing the user's ID.
 * @returns {Promise<Cart>} - A promise that resolves to the user's populated cart.
 */
const getPopulatedCart = async (user: any) => {
  const cart = await Cart.findOneAndUpdate(
    { user: user?.id }, // Search by user ID
    { $setOnInsert: { user: user?.id, items: [] } }, // Create new cart if not found
    { new: true, upsert: true } // Return the updated/new document
  ).populate("items.productId");

  // Calculate cart total
  const total = cart.items
    .toObject()
    .reduce(
      (sum: number, item: any) =>
        sum + (item.product.price || 0) * item.quantity,
      0
    );

  return { ...cart.toObject(), total };
};
