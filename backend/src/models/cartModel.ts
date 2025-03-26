import { func } from "joi";
import mongoose, { InferSchemaType } from "mongoose";
import { validate } from "uuid";

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
      required: function (this: any) {
        return !this.anonId;
      },
    },
    anonId: {
      type: String,
      required: function (this: any) {
        return !this.user;
      },
      index: true, // Helps with lookup performance
    },
    // make required
    items: { type: [ItemSchema], required: true, default: [] },
  },
  {
    timestamps: true,
  }
);

export type ICart = InferSchemaType<typeof CartSchema>;

export default mongoose.model("Cart", CartSchema);
