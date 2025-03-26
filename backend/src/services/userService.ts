import bcrypt from "bcryptjs";
import { Cart, IUser, User } from "models";
import { generateToken } from "utils/func";
import { AppError } from "utils/error";
import { IUserAuth } from "utils/types";
import { getCartForUser } from "./cartService";

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  userAuth: IUserAuth
) => {
  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new AppError("User already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = (await User.create({
    name,
    email,
    password: hashedPassword,
  })) as IUser;

  return await handleUserAuthResponse(user, userAuth.anonId);
};

export const authUser = async (
  email: string,
  password: string,
  userAuth: IUserAuth
) => {
  const user = (await User.findOne({ email })) as IUser;

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AppError("Invalid credentials", 401);
  }

  return await handleUserAuthResponse(user, userAuth.anonId);
};

export const handleUserAuthResponse = async (user: IUser, anonId?: string) => {
  if (anonId) {
    await migrateCart(user.id, anonId);
  }

  return {
    _id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user.id),
  };
};

export const migrateCart = async (userId: string, anonId: string) => {
  const anonCart = await Cart.findOne({ anonId }).lean();
  if (!anonCart || anonCart.items.length === 0) return;

  const userCart = await getCartForUser(userId);
  if (!userCart) return;

  const userCartMap = new Map(
    userCart.items.map((item) => [item.product.toString(), item])
  );

  let updated = false;
  anonCart.items.forEach((item) => {
    const existingItem = userCartMap.get(item.product.toString());
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      userCart.items.push(item);
    }
    updated = true;
  });

  if (updated) await userCart.save();
  await Cart.deleteOne({ anonId });

  return { items: userCart.items };
};
