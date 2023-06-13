import { Router } from "express";
import authRoutes from "./auth.routes";
import paymentRoutes from "./payment.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/paystack", paymentRoutes);

export default router;
