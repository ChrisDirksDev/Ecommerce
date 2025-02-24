import asyncHandler from "express-async-handler";
import { Cart, IProduct } from "models";
import { UserRequest } from "../utils/utils";

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
  const user = (req as UserRequest).user;
  const cart = await getPopulatedCart(user);
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
  const user = (req as UserRequest).user;

  let cart = await Cart.findOneAndUpdate(
    { user: user._id, "items.product": product },
    { $inc: { "items.$.quantity": quantity } },
    { new: true }
  );

  if (!cart) {
    await Cart.findOneAndUpdate(
      { user: user._id },
      { $push: { items: { product, quantity } } },
      { new: true, upsert: true }
    );
  }

  res.json(await getPopulatedCart(user));
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
  const user = (req as UserRequest).user;

  const cart = await Cart.findOne({ user: user._id });
  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  // Decrement the quantity of the item
  const result = await Cart.updateOne(
    { user: user._id, "items.product": productId },
    { $inc: { "items.$.quantity": -1 } }
  );

  if (result.modifiedCount === 0) {
    res.status(404);
    throw new Error("Item not found in cart");
  }

  // Remove the item if its quantity is zero
  await Cart.updateOne(
    { user: user._id },
    { $pull: { items: { product: productId, quantity: { $lte: 0 } } } }
  );

  res.json(await getPopulatedCart(user));
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
  const { items } = req.body;
  const user = (req as UserRequest).user;

  const cart = await Cart.findOne({ user: user._id });
  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  cart.items = items;
  await cart.save();
  res.json(await getPopulatedCart(user));
});

interface PopulatedCartItem {
  product: IProduct;
  quantity: number;
}

/**
 * Retrieves and populates the cart for a given user. If the cart does not exist, it creates a new one.
 *
 * @param user - An object containing the user's ID.
 * @returns A promise that resolves to the populated cart with a total price of all items.
 *
 * @remarks
 * - The cart is populated with the product details for each item.
 * - The total price is calculated based on the price and quantity of each item in the cart.
 *
 * @example
 * ```typescript
 * const user = { _id: "userId123" };
 * const cart = await getPopulatedCart(user);
 * console.log(cart.total); // Outputs the total price of the cart
 * ```
 */
const getPopulatedCart = async (user: { _id: string }) => {
  const cart = await Cart.findOneAndUpdate(
    { user: user._id },
    { $setOnInsert: { user: user._id, items: [] } },
    { new: true, upsert: true }
  )
    .populate<{ items: PopulatedCartItem[] }>("items.product")
    .lean();

  const total = cart.items.reduce(
    (sum, item) => sum + (item.product.price || 0) * item.quantity,
    0
  );

  return { ...cart, total };
};
