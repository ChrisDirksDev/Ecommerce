import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Admin, Cart, Order, Product, User } from "../models";

dotenv.config();

const demoPassword = "Password123!";

const products = [
  {
    name: "Artisan Sourdough Bread",
    price: 7.5,
    description: "A crusty, slow-fermented loaf with a soft, tangy centre.",
    imageUrl: "/products/bread.jpeg",
    catagory: "Bread",
  },
  {
    name: "Butter Croissant",
    price: 4.25,
    description: "A light and flaky croissant made with cultured butter.",
    imageUrl: "/products/croissant.jpeg",
    catagory: "Pastries",
  },
  {
    name: "Vanilla Celebration Cake",
    price: 38,
    description: "Vanilla sponge layered with silky vanilla buttercream.",
    imageUrl: "/products/cake1.jpeg",
    catagory: "Cakes",
  },
  {
    name: "Chocolate Ganache Cake",
    price: 42,
    description: "Rich chocolate cake finished with dark chocolate ganache.",
    imageUrl: "/products/cake2.jpeg",
    catagory: "Cakes",
  },
  {
    name: "Berry Layer Cake",
    price: 45,
    description: "Soft sponge, berry compote, and fresh whipped cream.",
    imageUrl: "/products/cake3.jpeg",
    catagory: "Cakes",
  },
  {
    name: "Chocolate Cupcake",
    price: 3.75,
    description: "A chocolate cupcake topped with fudge frosting.",
    imageUrl: "/products/cupcake.jpeg",
    catagory: "Cupcakes",
  },
];

const seed = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing. Add it to backend/.env before seeding.");
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  const password = await bcrypt.hash(demoPassword, 10);

  const admin = await Admin.findOneAndUpdate(
    { email: "admin@example.com" },
    { name: "Demo Admin", email: "admin@example.com", password },
    { upsert: true, new: true, runValidators: true }
  );

  const user = await User.findOneAndUpdate(
    { email: "customer@example.com" },
    {
      name: "Demo Customer",
      email: "customer@example.com",
      password,
      lastAccessed: new Date(),
    },
    { upsert: true, new: true, runValidators: true }
  );

  await Promise.all(
    products.map((product) =>
      Product.findOneAndUpdate({ name: product.name }, product, {
        upsert: true,
        new: true,
        runValidators: true,
      })
    )
  );

  const seededProducts = await Product.find({
    name: { $in: products.map(({ name }) => name) },
  });
  const byName = new Map(seededProducts.map((product) => [product.name, product]));
  const bread = byName.get("Artisan Sourdough Bread")!;
  const croissant = byName.get("Butter Croissant")!;
  const cake = byName.get("Chocolate Ganache Cake")!;

  const cartItems = [
    { product: bread._id, quantity: 1 },
    { product: croissant._id, quantity: 2 },
  ];

  const existingCart = await Cart.findOne({ user: user._id });
  if (existingCart) {
    existingCart.set("items", cartItems);
    await existingCart.save();
  } else {
    await Cart.create({
      user: user._id,
      items: cartItems,
    });
  }

  const existingOrder = await Order.exists({ user: user._id });
  if (!existingOrder) {
    await Order.create({
      user: user._id,
      items: [
        { product: cake._id, quantity: 1 },
        { product: croissant._id, quantity: 2 },
      ],
      totalPrice: cake.price + croissant.price * 2,
      paymentStatus: "paid",
      status: "processing",
    });
  }

  console.log(`Seeded ${seededProducts.length} products, 1 user, 1 admin, a cart, and an order.`);
  console.log(`Admin: ${admin.email} / ${demoPassword}`);
  console.log(`Customer: ${user.email} / ${demoPassword}`);
};

seed()
  .catch((error) => {
    console.error("Database seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
