import mongoose, { InferSchemaType } from "mongoose";

const anonUserSchema = new mongoose.Schema(
  {
    uuid: { type: String, required: true },
    lastAccessed: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export type IAnonUser = InferSchemaType<typeof anonUserSchema>;

export default mongoose.model("AnonUser", anonUserSchema);
