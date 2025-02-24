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
  { _id: false } // Optional: Prevents auto-generating _id for each item
);

export type ICartItem = InferSchemaType<typeof ItemSchema>;

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [ItemSchema], // Use the new ItemSchema
  },
  { timestamps: true }
);

export type ICart = InferSchemaType<typeof CartSchema>;

export default mongoose.model("Cart", CartSchema);
