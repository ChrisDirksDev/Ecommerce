import { Types } from "mongoose";
import { Cart, IProduct } from "models";
import { userQuery } from "utils/func";
import { AppError } from "utils/error";

export const fetchCart = async (user: string) => {
  return await getPopulatedCart(user);
};

export const addProductToCart = async (
  user: string,
  product: string,
  quantity: number
) => {
  let cart = await Cart.findOneAndUpdate(
    { ...userQuery(user), "items.product": product },
    { $inc: { "items.$.quantity": quantity } },
    { new: true }
  );

  if (!cart) {
    await Cart.findOneAndUpdate(
      userQuery(user),
      { $push: { items: { product, quantity } } },
      { new: true, upsert: true }
    );
  }

  return await getPopulatedCart(user);
};

export const removeProductFromCart = async (user: string, product: string) => {
  await Cart.updateOne(userQuery(user), { $pull: { items: { product } } });

  return await getPopulatedCart(user);
};

export const updateProductInCart = async (
  user: string,
  productId: string,
  quantity: number
) => {
  const cart = await Cart.findOne(userQuery(user));
  if (!cart) {
    throw new AppError("Cart not found", 404);
  }

  await Cart.updateOne(
    { ...userQuery(user), "items.product": productId },
    { $set: { "items.$.quantity": quantity } }
  );

  return await getPopulatedCart(user);
};

interface PopulatedCartItem {
  product: IProduct;
  quantity: number;
}

const getPopulatedCart = async (user: string) => {
  const isObjectId = Types.ObjectId.isValid(user);
  const cart = await Cart.findOneAndUpdate(
    userQuery(user),
    {
      $setOnInsert: {
        user: isObjectId ? new Types.ObjectId(user) : null,
        anonId: isObjectId ? null : user,
        items: [],
      },
    },
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

export const getCartForUser = async (user: string) => {
  const isObjectId = Types.ObjectId.isValid(user);

  return await Cart.findOneAndUpdate(
    userQuery(user),
    {
      $setOnInsert: {
        user: isObjectId ? new Types.ObjectId(user) : null,
        anonId: isObjectId ? null : user,
        items: [],
      },
    },
    { new: true, upsert: true }
  );
};
