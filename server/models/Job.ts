import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  category: String,
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  technicianId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  status: { type: String, default: "PENDING" }
}, { timestamps: true });

export default mongoose.model("Job", JobSchema);
