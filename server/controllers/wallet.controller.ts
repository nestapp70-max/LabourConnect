import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import ChatUnlock from "../models/ChatUnlock.js";
import Technician from "../models/Technician.js";

const router = Router();

// Get wallet balance
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json({ balance: user.walletBalance || "0.00" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch wallet" });
  }
});

// Recharge wallet
router.post("/recharge", verifyToken, async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ error: "Invalid amount" });

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const newBalance = (parseFloat(user.walletBalance || "0") + parseFloat(amount)).toFixed(2);
    user.walletBalance = newBalance;
    await user.save();

    await Transaction.create({
      userId: user._id,
      type: "recharge",
      amount: amount.toString(),
      description: `Wallet recharge of ₹${amount}`
    });

    res.json({ ok: true, balance: newBalance });
  } catch (err) {
    console.error("wallet recharge error", err);
    res.status(500).json({ error: "Recharge failed" });
  }
});

# Unlock contact route continues...
