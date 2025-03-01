import mongoose, { InferSchemaType } from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

export type ICartItem = InferSchemaType<typeof ItemSchema>;

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    anonId: {
      type: String,
      required: false,
      index: true, // Helps with lookup performance
    },
    items: [ItemSchema], // List of cart items
  },
  { timestamps: true }
);

export type ICart = InferSchemaType<typeof CartSchema>;

export default mongoose.model("Cart", CartSchema);
