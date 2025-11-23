// server/controllers/wallet.controller.ts
import { Request, Response } from "express";
import prisma from "../prisma/client";
import Razorpay from "razorpay";
import crypto from "crypto";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// ------------------------------
// Create Order
// ------------------------------
export async function createRechargeOrder(req: any, res: Response) {
  try {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
    });

    return res.json(order);
  } catch (err) {
    return res.status(500).json({ error: "Failed to create order" });
  }
}

// ------------------------------
// Verify Payment
// ------------------------------
export async function verifyRecharge(req: any, res: Response) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (sign !== razorpay_signature) {
      return res.status(400).json({ ok: false, message: "Invalid payment signature" });
    }

    // Store transaction
    const payment = await prisma.payment.create({
      data: {
        userId: req.user.id,
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        status: "paid",
        amount: 0, // Razorpay does not return amount here
      },
    });

    // Add wallet credit
    await prisma.user.update({
      where: { id: req.user.id },
      data: { wallet: { increment: 100 } }, // static? you can adjust
    });

    return res.json({ ok: true, payment });
  } catch (err) {
    return res.status(500).json({ error: "Failed to verify recharge" });
  }
}

// ------------------------------
// Get Wallet Balance
// ------------------------------
export async function getWallet(req: any, res: Response) {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { wallet: true },
  });

  return res.json({ wallet: user?.wallet || 0 });
}
