import mongoose, { InferSchemaType } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    lastAccessed: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export type IUser = InferSchemaType<typeof userSchema>;

export default mongoose.model("User", userSchema);
