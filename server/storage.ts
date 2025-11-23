// Simple in-memory storage for development
const users = [];
const otps = {};
const jobs = [];
const bids = [];
const technicians = [];
const transactions = [];
const chatUnlocks = [];
const reviews = [];

export const storage = {
  async createOtpCode(phone, code, expiresAt) {
    otps[phone] = { code, expiresAt };
  },
  async verifyOtpCode(phone, code) {
    const entry = otps[phone];
    if (!entry) return false;
    if (new Date() > new Date(entry.expiresAt)) return false;
    return entry.code === code;
  },
  async getUserByPhone(phone) {
    return users.find(u => u.phone === phone) || null;
  },
  async createUser(data) {
    const user = { id: (Date.now()).toString(), ...data, walletBalance: "0.00" };
    users.push(user);
    return user;
  },
  async createTechnician(data) {
    const tech = { id: (Date.now()).toString(), ...data };
    technicians.push(tech);
    return tech;
  },
  async getUser(id) {
    return users.find(u => u.id === id) || null;
  },
  async getTechniciansWithUser(filter) {
    return technicians.map(t => ({ ...t, user: users.find(u=>u.id===t.userId) || null }));
  },
  async getTechnicianByUserId(userId) {
    return technicians.find(t => t.userId === userId) || null;
  },
  async getJobsWithCustomer(filter) {
    return jobs;
  },
  async createJob(data) {
    const job = { id: (Date.now()).toString(), ...data, status: "PENDING" };
    jobs.push(job);
    return job;
  },
  async updateJobStatus(id, status) {
    const job = jobs.find(j=>j.id===id);
    if (job) job.status = status;
    return job;
  },
  async getBidsForJob(jobId) {
    return bids.filter(b=>b.jobId===jobId);
  },
  async getBidsByTechnician(technicianId) {
    return bids.filter(b=>b.userId===technicianId);
  },
  async getJob(jobId) {
    return jobs.find(j=>j.id===jobId) || null;
  },
  async createBid(data) {
    const bid = { id: (Date.now()).toString(), ...data };
    bids.push(bid);
    return bid;
  },
  async updateBidStatus(id, status) {
    const b = bids.find(x=>x.id===id);
    if (b) b.status = status;
    return b;
  },
  async getTransactionsByUser(userId) {
    return transactions.filter(t=>t.userId===userId);
  },
  async updateUserWallet(userId, newBalance) {
    const u = users.find(x=>x.id===userId);
    if (u) u.walletBalance = newBalance;
    return u;
  },
  async createTransaction(tx) {
    const t = { id: (Date.now()).toString(), ...tx, createdAt: new Date() };
    transactions.push(t);
    return t;
  },
  async getChatUnlocksByCustomer(customerId) {
    return chatUnlocks.filter(u=>u.customerId===customerId);
  },
  async getChatUnlock(customerId, technicianId) {
    return chatUnlocks.find(u=>u.customerId===customerId && u.technicianId===technicianId) || null;
  },
  async createChatUnlock(customerId, technicianId) {
    const u = { id: (Date.now()).toString(), customerId, technicianId, createdAt: new Date() };
    chatUnlocks.push(u);
    return u;
  },
  async getTechnician(technicianId) {
    return technicians.find(t=>t.id===technicianId) || null;
  },
  async createReview(data) {
    const r = { id: (Date.now()).toString(), ...data, createdAt: new Date() };
    reviews.push(r);
    return r;
  },
  async getReviewsByTechnician(technicianId) {
    return reviews.filter(r=>r.technicianId===technicianId);
  },
  async updateTechnicianRating(technicianId, avgRating, count) {
    const t = technicians.find(x=>x.id===technicianId);
    if (t) { t.rating = avgRating; t.ratingCount = count; }
    return t;
  }
};
