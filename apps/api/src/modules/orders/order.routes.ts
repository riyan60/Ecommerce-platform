import { Router } from "express";

import {
  createOrder,
  getMyOrders,
  getMyOrderById,
  updateOrderStatus,
} from "./order.controller";

import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";

const router = Router();

// All order routes require authentication
router.use(authenticate);

// Customer routes
router.post("/", createOrder);
router.get("/", getMyOrders);
router.get("/:id", getMyOrderById);

// Admin-only route
router.patch(
  "/:id/status",
  authorize("ADMIN"),
  updateOrderStatus
);

export default router;