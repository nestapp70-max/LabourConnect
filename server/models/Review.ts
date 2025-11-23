import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  technicianId: { type: mongoose.Schema.Types.ObjectId, ref: "Technician" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: Number,
  comment: String
}, { timestamps: true });

export default mongoose.model("Review", ReviewSchema);
