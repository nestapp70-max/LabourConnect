import mongoose from "mongoose";

const ChatUnlockSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  technicianId: { type: mongoose.Schema.Types.ObjectId, ref: "Technician" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("ChatUnlock", ChatUnlockSchema);
