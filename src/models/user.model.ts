import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tokenVersion: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", userSchema);
