import { Router } from "express";
import { getTransactionForUser, transferFunds } from "../controllers";

const router = Router();

router.post("/transfer", transferFunds);
router.get("/transactions", getTransactionForUser);

export default router;
