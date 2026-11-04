import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes";
import userRoutes from "../modules/users/users.routes";
import categoryRoutes from "../modules/categories/categories.routes";
import productRoutes from "../modules/products/products.routes";
import cartRoutes from "../modules/cart/cart.routes";
import orderRoutes from "../modules/orders/order.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/cart", cartRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);

export default router;