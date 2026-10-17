import { Router } from "express";

import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "./cart.controller";

import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

router.use(authenticate);

// Get current user's cart
router.get("/", getCart);

// Add product to cart
router.post("/items", addToCart);

// Update cart item quantity
router.patch("/items/:id", updateCartItem);

// Remove item from cart
router.delete("/items/:id", removeCartItem);

// Clear entire cart
router.delete("/", clearCart);

export default router;