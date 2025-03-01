import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../config/db";
import { config } from "../config/config";
import {
  orderRoutes,
  productRoutes,
  adminRoutes,
  userRoutes,
  cartRoutes,
  anonUserRoutes,
} from "./routes";
import errorHandler from "./middleware/errorMiddleware";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/anon", anonUserRoutes);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start Server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful error handling
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
  process.exit(1);
});
