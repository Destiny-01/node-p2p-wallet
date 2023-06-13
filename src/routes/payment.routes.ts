import { Router } from "express";
import { initializePayment, verifyPayment } from "../controllers";

const router = Router();

router.post("/init", initializePayment);
router.get("/callback", verifyPayment);

export default router;
