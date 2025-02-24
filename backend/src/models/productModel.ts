import mongoose, { InferSchemaType } from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

export type IProduct = InferSchemaType<typeof ProductSchema>;

export default mongoose.model("Product", ProductSchema);
