import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./auth.controller.js";
import paymentRoutes from "./payments.controller.js";
import { setupChatSocket } from "./chat.socket.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

// ---------- HEALTH CHECK (REQUIRED BY RENDER) ----------
app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

// ---------- MIDDLEWARE ----------
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  })
);

// ---------- API ROUTES ----------
app.use("/api/auth", authRoutes);
app.use("/api/payments", paymentRoutes);

// ---------- STATIC FRONTEND SERVE (OPTIONAL) ----------
app.use(express.static("../client/dist"));  
// If frontend is deployed separately, no issue.

// ---------- DATABASE CONNECTION ----------
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error", err));

// ---------- SOCKET.IO ----------
setupChatSocket(server);

// ---------- SERVER LISTEN ----------
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
