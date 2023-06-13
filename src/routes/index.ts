import { Router } from "express";
import authRoutes from "./auth.routes";
import paymentRoutes from "./payment.routes";
import transactionRoutes from "./transaction.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/paystack", paymentRoutes);
router.use("/transact", transactionRoutes);

export default router;
