import mongoose, { InferSchemaType } from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export type IAdmin = InferSchemaType<typeof adminSchema>;

export default mongoose.model("Admin", adminSchema);
