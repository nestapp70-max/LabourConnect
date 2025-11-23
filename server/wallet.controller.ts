import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import Wallet from "../models/Wallet.js";
import Payment from "../models/Payment.js";

const router = Router();

/** Get wallet balance */
router.get("/", verifyToken, async (req: any, res) => {
  const wallet = await Wallet.findOne({ user: req.user._id });

  res.json({
    balance: wallet?.balance || 0
  });
});

/** Recharge wallet */
router.post("/recharge", verifyToken, async (req: any, res) => {
  const { amount } = req.body;

  let wallet = await Wallet.findOne({ user: req.user._id });

  if (!wallet) {
    wallet = await Wallet.create({
      user: req.user._id,
      balance: 0
    });
  }

  wallet.balance += amount;
  await wallet.save();

  await Payment.create({
    user: req.user._id,
    amount,
    type: "wallet_recharge",
    status: "success"
  });

  res.json({ balance: wallet.balance });
});

export default router;
