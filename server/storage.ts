import {
  type User,
  type InsertUser,
  type Technician,
  type InsertTechnician,
  type Job,
  type InsertJob,
  type Bid,
  type InsertBid,
  type Transaction,
  type InsertTransaction,
  type ChatUnlock,
  type Review,
  type InsertReview,
  type OtpCode,
  type TechnicianWithUser,
  type JobWithCustomer,
  type BidWithTechnician,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByPhone(phone: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserWallet(userId: string, newBalance: string): Promise<User>;

  // Technicians
  getTechnician(id: string): Promise<Technician | undefined>;
  getTechnicianByUserId(userId: string): Promise<Technician | undefined>;
  getTechniciansWithUser(filters?: { category?: string; location?: string }): Promise<TechnicianWithUser[]>;
  createTechnician(technician: InsertTechnician): Promise<Technician>;
  updateTechnicianRating(technicianId: string, newRating: string, totalReviews: number): Promise<Technician>;

  // Jobs
  getJob(id: string): Promise<Job | undefined>;
  getJobsWithCustomer(filters?: { customerId?: string; status?: string }): Promise<JobWithCustomer[]>;
  getAvailableJobs(): Promise<JobWithCustomer[]>;
  createJob(job: InsertJob): Promise<Job>;
  updateJobStatus(jobId: string, status: string): Promise<Job>;

  // Bids
  getBid(id: string): Promise<Bid | undefined>;
  getBidsForJob(jobId: string): Promise<BidWithTechnician[]>;
  getBidsByTechnician(technicianId: string): Promise<Bid[]>;
  createBid(bid: InsertBid): Promise<Bid>;
  updateBidStatus(bidId: string, status: string): Promise<Bid>;

  // Transactions
  getTransactionsByUser(userId: string): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;

  // Chat Unlocks
  getChatUnlock(customerId: string, technicianId: string): Promise<ChatUnlock | undefined>;
  getChatUnlocksByCustomer(customerId: string): Promise<ChatUnlock[]>;
  createChatUnlock(customerId: string, technicianId: string): Promise<ChatUnlock>;

  // Reviews
  getReviewsByTechnician(technicianId: string): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;

  // OTP
  getOtpCode(phone: string): Promise<OtpCode | undefined>;
  createOtpCode(phone: string, code: string, expiresAt: Date): Promise<OtpCode>;
  verifyOtpCode(phone: string, code: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private technicians: Map<string, Technician>;
  private jobs: Map<string, Job>;
  private bids: Map<string, Bid>;
  private transactions: Map<string, Transaction>;
  private chatUnlocks: Map<string, ChatUnlock>;
  private reviews: Map<string, Review>;
  private otpCodes: Map<string, OtpCode>;

  constructor() {
    this.users = new Map();
    this.technicians = new Map();
    this.jobs = new Map();
    this.bids = new Map();
    this.transactions = new Map();
    this.chatUnlocks = new Map();
    this.reviews = new Map();
    this.otpCodes = new Map();
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByPhone(phone: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((user) => user.phone === phone);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      ...insertUser,
      id,
      walletBalance: "0.00",
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserWallet(userId: string, newBalance: string): Promise<User> {
    const user = this.users.get(userId);
    if (!user) throw new Error("User not found");
    const updated = { ...user, walletBalance: newBalance };
    this.users.set(userId, updated);
    return updated;
  }

  // Technicians
  async getTechnician(id: string): Promise<Technician | undefined> {
    return this.technicians.get(id);
  }

  async getTechnicianByUserId(userId: string): Promise<Technician | undefined> {
    return Array.from(this.technicians.values()).find((t) => t.userId === userId);
  }

  async getTechniciansWithUser(filters?: { category?: string; location?: string }): Promise<TechnicianWithUser[]> {
    let technicians = Array.from(this.technicians.values());

    if (filters?.category) {
      technicians = technicians.filter((t) => t.skills.some((s) => s.toLowerCase().includes(filters.category!.toLowerCase())));
    }

    if (filters?.location) {
      technicians = technicians.filter((t) =>
        t.location.toLowerCase().includes(filters.location!.toLowerCase()) ||
        (t.pinCode && t.pinCode.includes(filters.location!))
      );
    }

    return technicians.map((t) => {
      const user = this.users.get(t.userId);
      return { ...t, user: user! };
    }).filter((t) => t.user);
  }

  async createTechnician(insertTechnician: InsertTechnician): Promise<Technician> {
    const id = randomUUID();
    const technician: Technician = {
      ...insertTechnician,
      id,
      rating: "0.00",
      totalReviews: 0,
    };
    this.technicians.set(id, technician);
    return technician;
  }

  async updateTechnicianRating(technicianId: string, newRating: string, totalReviews: number): Promise<Technician> {
    const technician = this.technicians.get(technicianId);
    if (!technician) throw new Error("Technician not found");
    const updated = { ...technician, rating: newRating, totalReviews };
    this.technicians.set(technicianId, updated);
    return updated;
  }

  // Jobs
  async getJob(id: string): Promise<Job | undefined> {
    return this.jobs.get(id);
  }

  async getJobsWithCustomer(filters?: { customerId?: string; status?: string }): Promise<JobWithCustomer[]> {
    let jobs = Array.from(this.jobs.values());

    if (filters?.customerId) {
      jobs = jobs.filter((j) => j.customerId === filters.customerId);
    }

    if (filters?.status) {
      jobs = jobs.filter((j) => j.status === filters.status);
    }

    return jobs.map((j) => {
      const customer = this.users.get(j.customerId);
      return { ...j, customer: customer! };
    }).filter((j) => j.customer);
  }

  async getAvailableJobs(): Promise<JobWithCustomer[]> {
    return this.getJobsWithCustomer({ status: 'open' });
  }

  async createJob(insertJob: InsertJob): Promise<Job> {
    const id = randomUUID();
    const job: Job = {
      ...insertJob,
      id,
      status: "open",
      createdAt: new Date(),
    };
    this.jobs.set(id, job);
    return job;
  }

  async updateJobStatus(jobId: string, status: string): Promise<Job> {
    const job = this.jobs.get(jobId);
    if (!job) throw new Error("Job not found");
    const updated = { ...job, status };
    this.jobs.set(jobId, updated);
    return updated;
  }

  // Bids
  async getBid(id: string): Promise<Bid | undefined> {
    return this.bids.get(id);
  }

  async getBidsForJob(jobId: string): Promise<BidWithTechnician[]> {
    const bids = Array.from(this.bids.values()).filter((b) => b.jobId === jobId);
    return bids.map((b) => {
      const technician = this.technicians.get(b.technicianId);
      const user = technician ? this.users.get(technician.userId) : undefined;
      return {
        ...b,
        technician: technician && user ? { ...technician, user } : undefined as any,
      };
    }).filter((b) => b.technician);
  }

  async getBidsByTechnician(technicianId: string): Promise<Bid[]> {
    return Array.from(this.bids.values()).filter((b) => b.technicianId === technicianId);
  }

  async createBid(insertBid: InsertBid): Promise<Bid> {
    const id = randomUUID();
    const bid: Bid = {
      ...insertBid,
      id,
      status: "pending",
      createdAt: new Date(),
    };
    this.bids.set(id, bid);
    return bid;
  }

  async updateBidStatus(bidId: string, status: string): Promise<Bid> {
    const bid = this.bids.get(bidId);
    if (!bid) throw new Error("Bid not found");
    const updated = { ...bid, status };
    this.bids.set(bidId, updated);
    return updated;
  }

  // Transactions
  async getTransactionsByUser(userId: string): Promise<Transaction[]> {
    return Array.from(this.transactions.values())
      .filter((t) => t.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = randomUUID();
    const transaction: Transaction = {
      ...insertTransaction,
      id,
      createdAt: new Date(),
    };
    this.transactions.set(id, transaction);
    return transaction;
  }

  // Chat Unlocks
  async getChatUnlock(customerId: string, technicianId: string): Promise<ChatUnlock | undefined> {
    return Array.from(this.chatUnlocks.values()).find(
      (cu) => cu.customerId === customerId && cu.technicianId === technicianId
    );
  }

  async getChatUnlocksByCustomer(customerId: string): Promise<ChatUnlock[]> {
    return Array.from(this.chatUnlocks.values()).filter((cu) => cu.customerId === customerId);
  }

  async createChatUnlock(customerId: string, technicianId: string): Promise<ChatUnlock> {
    const id = randomUUID();
    const chatUnlock: ChatUnlock = {
      id,
      customerId,
      technicianId,
      createdAt: new Date(),
    };
    this.chatUnlocks.set(id, chatUnlock);
    return chatUnlock;
  }

  // Reviews
  async getReviewsByTechnician(technicianId: string): Promise<Review[]> {
    return Array.from(this.reviews.values())
      .filter((r) => r.technicianId === technicianId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = randomUUID();
    const review: Review = {
      ...insertReview,
      id,
      createdAt: new Date(),
    };
    this.reviews.set(id, review);
    return review;
  }

  // OTP
  async getOtpCode(phone: string): Promise<OtpCode | undefined> {
    return Array.from(this.otpCodes.values())
      .filter((otp) => otp.phone === phone && !otp.verified && otp.expiresAt > new Date())
      .sort((a, b) => b.expiresAt.getTime() - a.expiresAt.getTime())[0];
  }

  async createOtpCode(phone: string, code: string, expiresAt: Date): Promise<OtpCode> {
    const id = randomUUID();
    const otpCode: OtpCode = {
      id,
      phone,
      code,
      expiresAt,
      verified: false,
    };
    this.otpCodes.set(id, otpCode);
    return otpCode;
  }

  async verifyOtpCode(phone: string, code: string): Promise<boolean> {
    const otpCode = await this.getOtpCode(phone);
    if (!otpCode || otpCode.code !== code) {
      return false;
    }
    const verified = { ...otpCode, verified: true };
    this.otpCodes.set(otpCode.id, verified);
    return true;
  }
}

// Export storage - will be set based on environment
// Default to memory storage, but routes.ts will override with dbStorage if DATABASE_URL is set
export const storage = new MemStorage();
