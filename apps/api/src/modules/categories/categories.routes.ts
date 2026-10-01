import { Router } from "express";

import {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} from "./categories.controller";

import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";

const router = Router();

// Public Routes
router.get("/", getAllCategories);
router.get("/:id", getCategory);

// Admin Only Routes
router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  createCategory
);

router.patch(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  updateCategory
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  deleteCategory
);

export default router;