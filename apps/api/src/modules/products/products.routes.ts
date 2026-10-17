import { Router } from "express";

import {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "./products.controller";

import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";

const router = Router();

// Public Routes
router.get("/", getAllProducts);
router.get("/:id", getProduct);

// Admin Only Routes
router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  createProduct
);

router.patch(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  updateProduct
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  deleteProduct
);

export default router;