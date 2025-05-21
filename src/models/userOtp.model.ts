import mongoose from "mongoose";
import { string } from "zod";

const userOtpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Number, required: true },
  isUsed: { type: Boolean, default: false },
});

export const UserOtpModel = mongoose.model("UserOtp", userOtpSchema);
