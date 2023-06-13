import { Router } from "express";
import { transferFunds } from "../controllers";

const router = Router();

router.post("/transfer", transferFunds);

export default router;
