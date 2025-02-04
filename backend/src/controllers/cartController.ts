import asyncHandler from "express-async-handler";
import Cart from "../models/cartModel";

export const getCart = asyncHandler(async (req, res) => {
  const { user } = req.body;
  const cart = await Cart.find({ user });
  res.json(cart);
});

export const addToCart = asyncHandler(async (req, res) => {
  const { userId, productId, quantity } = req.body;
  const cart = await Cart.findOne({ userId });

  if (cart) {
    const item = cart.items.find(
      (item: { productId: any }) => item.productId === productId
    );

    if (item) {
      item.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.json(cart);
  } else {
    const newCart = await Cart.create({
      userId,
      items: [{ productId, quantity }],
    });
    res.status(201).json(newCart);
  }
});

export const removeFromCart = asyncHandler(async (req, res) => {
  const { userId, productId } = req.body;
  const cart = await Cart.findOne({ userId });

  if (cart) {
    cart.items = cart.items
      .toObject()
      .filter((item: { productId: any }) => item.productId !== productId);

    await cart.save();
    res.json(cart);
  } else {
    res.status(404);
    throw new Error("Cart not found");
  }
});

export const updateCart = asyncHandler(async (req, res) => {
  const { userId, productId, quantity } = req.body;
  const cart = await Cart.findOne({ userId });

  if (cart) {
    const item = cart.items.find(
      (item: { productId: any }) => item.productId === productId
    );

    if (item) {
      item.quantity = quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.json(cart);
  } else {
    res.status(404);
    throw new Error("Cart not found");
  }
});
