import { Router } from "express";
import { me } from "./users.controller";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";

const router = Router();

router.get(
  "/me",
  authenticate,
  authorize("CUSTOMER", "ADMIN"),
  me
);

export default router;