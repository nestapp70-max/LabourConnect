import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: String,
  amount: String,
  description: String,
  relatedId: String,
  status: { type: String, default: "success" }
}, { timestamps: true });

export default mongoose.model("Transaction", TransactionSchema);
