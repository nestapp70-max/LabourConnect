import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
  phone: String,
  code: String,
  expiresAt: Date
}, { timestamps: true });

export default mongoose.model("Otp", OtpSchema);
