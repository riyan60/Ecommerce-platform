
import { Router } from "express";

import {
  createPayment,
  verifyPayment,
} from "./payments.controller";

import { handleRazorpayWebhook } from "./payments.webhook.controller";

import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

// Public endpoint: Razorpay authenticates using its webhook signature
router.post("/webhook", handleRazorpayWebhook);

// All remaining payment routes require customer authentication
router.use(authenticate);

router.post("/:orderId/create", createPayment);
router.post("/verify", verifyPayment);

export default router;
