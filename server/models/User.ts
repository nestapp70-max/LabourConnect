import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  phone: { type: String, unique: true },
  email: String,
  password: String,
  role: { type: String, enum: ["customer", "technician"], default: "customer" },
  walletBalance: { type: String, default: "0.00" }
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
