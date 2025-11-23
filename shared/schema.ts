import { z } from "zod";

export const insertUserSchema = z.object({
  phone: z.string().min(10),
  name: z.string().min(2),
  role: z.enum(["customer", "technician"]).optional(),
});

export const insertJobSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  price: z.number().optional(),
  customerId: z.string().optional(),
  category: z.string().optional()
});

export const insertBidSchema = z.object({
  jobId: z.string(),
  userId: z.string(),
  amount: z.number(),
  message: z.string().optional(),
});

export const insertReviewSchema = z.object({
  technicianId: z.string(),
  userId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
});

export const insertTechnicianSchema = z.object({
  userId: z.string(),
  skills: z.array(z.string()).optional(),
  experience: z.number().optional(),
  location: z.string().optional()
});
