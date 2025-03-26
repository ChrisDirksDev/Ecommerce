import express from "express";

import errorHandler from "middleware/errorMiddleware";
import {
  productRoutes,
  adminRoutes,
  userRoutes,
  cartRoutes,
  orderRoutes,
  anonUserRoutes,
} from "routes";

const app = express();
app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/anon", anonUserRoutes);
app.use(errorHandler);

export default app;
