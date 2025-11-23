import mongoose from "mongoose";

const BidSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: Number,
  message: String,
  status: { type: String, default: "PENDING" }
}, { timestamps: true });

export default mongoose.model("Bid", BidSchema);
