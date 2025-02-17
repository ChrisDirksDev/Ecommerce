import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false } // Optional: Prevents auto-generating _id for each item
);

// Virtual field to rename `productId` to `product`
ItemSchema.virtual("product", {
  ref: "Product",
  localField: "productId",
  foreignField: "_id",
  justOne: true,
});

// Enable virtuals for JSON & Object conversion
ItemSchema.set("toJSON", { virtuals: true });
ItemSchema.set("toObject", { virtuals: true });

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

export default mongoose.model("Cart", CartSchema);
