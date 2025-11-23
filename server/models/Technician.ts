import mongoose from "mongoose";

const TechnicianSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  skills: [String],
  experience: Number,
  location: String,
  bio: String,
  isAvailable: { type: Boolean, default: true },
  profileImage: String,
  rating: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Technician", TechnicianSchema);
