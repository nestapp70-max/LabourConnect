import { drizzle } from "drizzle-orm/neon-http";
import { eq, and, like } from "drizzle-orm";
import {
  users,
  technicians,
  jobs,
  bids,
  transactions,
  chatUnlocks,
  reviews,
  otpCodes,
} from "@shared/schema";
import type {
  User,
  Technician,
  Job,
  Bid,
  Transaction,
  ChatUnlock,
  Review,
  OtpCode,
  InsertUser,
  InsertTechnician,
  InsertJob,
  InsertBid,
  InsertTransaction,
  InsertReview,
  TechnicianWithUser,
  JobWithCustomer,
  BidWithTechnician,
} from "@shared/schema";
import type { IStorage } from "./storage";

export const db = drizzle(process.env.DATABASE_URL!);

export class DbStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByPhone(phone: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.phone, phone));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async updateUserWallet(userId: string, newBalance: string): Promise<User> {
    const result = await db
      .update(users)
      .set({ walletBalance: newBalance })
      .where(eq(users.id, userId))
      .returning();
    if (!result[0]) throw new Error("User not found");
    return result[0];
  }

  // Technicians
  async getTechnician(id: string): Promise<Technician | undefined> {
    const result = await db
      .select()
      .from(technicians)
      .where(eq(technicians.id, id));
    return result[0];
  }

  async getTechnicianByUserId(userId: string): Promise<Technician | undefined> {
    const result = await db
      .select()
      .from(technicians)
      .where(eq(technicians.userId, userId));
    return result[0];
  }

  async getTechniciansWithUser(filters?: {
    category?: string;
    location?: string;
  }): Promise<TechnicianWithUser[]> {
    let query = db.select().from(technicians);

    if (filters?.category) {
      // Filter by category in skills array (PostgreSQL array contains)
      query = db.selectDistinct().from(technicians);
    }

    const techniciansData = await query;

    // Apply filters in JS
    let filtered = techniciansData;
    if (filters?.category) {
      filtered = filtered.filter((t) =>
        t.skills.some((s) => s.toLowerCase().includes(filters.category!.toLowerCase()))
      );
    }
    if (filters?.location) {
      filtered = filtered.filter((t) =>
        t.location.toLowerCase().includes(filters.location!.toLowerCase()) ||
        (t.pinCode && t.pinCode.includes(filters.location!))
      );
    }

    // Join with users
    const result: TechnicianWithUser[] = [];
    for (const tech of filtered) {
      const user = await this.getUser(tech.userId);
      if (user) {
        result.push({ ...tech, user });
      }
    }
    return result;
  }

  async createTechnician(insertTechnician: InsertTechnician): Promise<Technician> {
    const result = await db
      .insert(technicians)
      .values(insertTechnician)
      .returning();
    return result[0];
  }

  async updateTechnicianRating(
    technicianId: string,
    newRating: string,
    totalReviews: number
  ): Promise<Technician> {
    const result = await db
      .update(technicians)
      .set({ rating: newRating, totalReviews })
      .where(eq(technicians.id, technicianId))
      .returning();
    if (!result[0]) throw new Error("Technician not found");
    return result[0];
  }

  // Jobs
  async getJob(id: string): Promise<Job | undefined> {
    const result = await db.select().from(jobs).where(eq(jobs.id, id));
    return result[0];
  }

  async getJobsWithCustomer(filters?: {
    customerId?: string;
    status?: string;
  }): Promise<JobWithCustomer[]> {
    let query = db.select().from(jobs);

    if (filters?.customerId) {
      query = db
        .select()
        .from(jobs)
        .where(eq(jobs.customerId, filters.customerId));
    }
    if (filters?.status) {
      query = db
        .select()
        .from(jobs)
        .where(eq(jobs.status, filters.status));
    }

    const jobsData = await query;

    const result: JobWithCustomer[] = [];
    for (const job of jobsData) {
      const customer = await this.getUser(job.customerId);
      if (customer) {
        result.push({ ...job, customer });
      }
    }
    return result;
  }

  async getAvailableJobs(): Promise<JobWithCustomer[]> {
    return this.getJobsWithCustomer({ status: "open" });
  }

  async createJob(insertJob: InsertJob): Promise<Job> {
    const result = await db.insert(jobs).values(insertJob).returning();
    return result[0];
  }

  async updateJobStatus(jobId: string, status: string): Promise<Job> {
    const result = await db
      .update(jobs)
      .set({ status })
      .where(eq(jobs.id, jobId))
      .returning();
    if (!result[0]) throw new Error("Job not found");
    return result[0];
  }

  // Bids
  async getBid(id: string): Promise<Bid | undefined> {
    const result = await db.select().from(bids).where(eq(bids.id, id));
    return result[0];
  }

  async getBidsForJob(jobId: string): Promise<BidWithTechnician[]> {
    const bidsData = await db
      .select()
      .from(bids)
      .where(eq(bids.jobId, jobId));

    const result: BidWithTechnician[] = [];
    for (const bid of bidsData) {
      const technician = await this.getTechnician(bid.technicianId);
      if (technician) {
        const user = await this.getUser(technician.userId);
        if (user) {
          result.push({
            ...bid,
            technician: { ...technician, user },
          });
        }
      }
    }
    return result;
  }

  async getBidsByTechnician(technicianId: string): Promise<Bid[]> {
    return db
      .select()
      .from(bids)
      .where(eq(bids.technicianId, technicianId));
  }

  async createBid(insertBid: InsertBid): Promise<Bid> {
    const result = await db.insert(bids).values(insertBid).returning();
    return result[0];
  }

  async updateBidStatus(bidId: string, status: string): Promise<Bid> {
    const result = await db
      .update(bids)
      .set({ status })
      .where(eq(bids.id, bidId))
      .returning();
    if (!result[0]) throw new Error("Bid not found");
    return result[0];
  }

  // Transactions
  async getTransactionsByUser(userId: string): Promise<Transaction[]> {
    const result = await db
      .select()
      .from(transactions)
      .where(eq(transactions.userId, userId));
    return result.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const result = await db
      .insert(transactions)
      .values(insertTransaction)
      .returning();
    return result[0];
  }

  // Chat Unlocks
  async getChatUnlock(
    customerId: string,
    technicianId: string
  ): Promise<ChatUnlock | undefined> {
    const result = await db
      .select()
      .from(chatUnlocks)
      .where(
        and(
          eq(chatUnlocks.customerId, customerId),
          eq(chatUnlocks.technicianId, technicianId)
        )
      );
    return result[0];
  }

  async getChatUnlocksByCustomer(customerId: string): Promise<ChatUnlock[]> {
    return db
      .select()
      .from(chatUnlocks)
      .where(eq(chatUnlocks.customerId, customerId));
  }

  async createChatUnlock(customerId: string, technicianId: string): Promise<ChatUnlock> {
    const result = await db
      .insert(chatUnlocks)
      .values({ customerId, technicianId })
      .returning();
    return result[0];
  }

  // Reviews
  async getReviewsByTechnician(technicianId: string): Promise<Review[]> {
    const result = await db
      .select()
      .from(reviews)
      .where(eq(reviews.technicianId, technicianId));
    return result.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const result = await db.insert(reviews).values(insertReview).returning();
    return result[0];
  }

  // OTP
  async getOtpCode(phone: string): Promise<OtpCode | undefined> {
    const result = await db
      .select()
      .from(otpCodes)
      .where(
        and(
          eq(otpCodes.phone, phone),
          eq(otpCodes.verified, false)
        )
      );
    // Filter by expiration and return most recent
    const valid = result.filter((otp) => otp.expiresAt > new Date());
    return valid.sort(
      (a, b) => b.expiresAt.getTime() - a.expiresAt.getTime()
    )[0];
  }

  async createOtpCode(phone: string, code: string, expiresAt: Date): Promise<OtpCode> {
    const result = await db
      .insert(otpCodes)
      .values({ phone, code, expiresAt, verified: false })
      .returning();
    return result[0];
  }

  async verifyOtpCode(phone: string, code: string): Promise<boolean> {
    const otpCode = await this.getOtpCode(phone);
    if (!otpCode || otpCode.code !== code) {
      return false;
    }
    await db
      .update(otpCodes)
      .set({ verified: true })
      .where(eq(otpCodes.id, otpCode.id));
    return true;
  }
}

export const dbStorage = new DbStorage();
