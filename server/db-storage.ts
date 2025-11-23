import User from "./models/User.js";
import Technician from "./models/Technician.js";
import Job from "./models/Job.js";
import Bid from "./models/Bid.js";
import Transaction from "./models/Transaction.js";
import ChatUnlock from "./models/ChatUnlock.js";
import Review from "./models/Review.js";
import Otp from "./models/Otp.js";

export const dbStorage = {
  async createOtpCode(phone, code, expiresAt) {
    await Otp.create({ phone, code, expiresAt });
  },
  async verifyOtpCode(phone, code) {
    const rec = await Otp.findOne({ phone, code });
    if (!rec) return false;
    if (new Date() > new Date(rec.expiresAt)) return false;
    return true;
  },
  async getUserByPhone(phone) {
    return User.findOne({ phone }).lean();
  },
  async createUser(data) {
    return User.create(data);
  },
  async createTechnician(data) {
    return Technician.create(data);
  },
  async getUser(id) {
    return User.findById(id).lean();
  },
  async getTechniciansWithUser(filter) {
    return Technician.find(filter).populate('userId').lean();
  },
  async getTechnicianByUserId(userId) {
    return Technician.findOne({ userId }).lean();
  },
  async getJobsWithCustomer(filter) {
    return Job.find(filter).populate('customerId').lean();
  },
  async createJob(data) {
    return Job.create(data);
  },
  async updateJobStatus(id, status) {
    return Job.findByIdAndUpdate(id, { status }, { new: true }).lean();
  },
  async getBidsForJob(jobId) {
    return Bid.find({ jobId }).lean();
  },
  async getBidsByTechnician(technicianId) {
    return Bid.find({ userId: technicianId }).lean();
  },
  async getJob(jobId) {
    return Job.findById(jobId).lean();
  },
  async createBid(data) {
    return Bid.create(data);
  },
  async updateBidStatus(id, status) {
    return Bid.findByIdAndUpdate(id, { status }, { new: true }).lean();
  },
  async getTransactionsByUser(userId) {
    return Transaction.find({ userId }).lean();
  },
  async updateUserWallet(userId, newBalance) {
    return User.findByIdAndUpdate(userId, { walletBalance: newBalance }, { new: true }).lean();
  },
  async createTransaction(tx) {
    return Transaction.create(tx);
  },
  async getChatUnlocksByCustomer(customerId) {
    return ChatUnlock.find({ customerId }).lean();
  },
  async getChatUnlock(customerId, technicianId) {
    return ChatUnlock.findOne({ customerId, technicianId }).lean();
  },
  async createChatUnlock(customerId, technicianId) {
    return ChatUnlock.create({ customerId, technicianId });
  },
  async getTechnician(technicianId) {
    return Technician.findById(technicianId).lean();
  },
  async createReview(data) {
    return Review.create(data);
  },
  async getReviewsByTechnician(technicianId) {
    return Review.find({ technicianId }).lean();
  },
  async updateTechnicianRating(technicianId, avgRating, count) {
    return Technician.findByIdAndUpdate(technicianId, { rating: avgRating, ratingCount: count }, { new: true }).lean();
  }
};
