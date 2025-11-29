import { Router } from "express";
import { SubscriptionController } from "../controllers/subscription.controller";

const router = Router();

router.get("/", SubscriptionController.getAll);
router.get("/total", SubscriptionController.getMonthlyTotal);
router.get("/:id", SubscriptionController.getOne);
router.post("/", SubscriptionController.create);
router.put("/:id", SubscriptionController.update);
router.delete("/:id", SubscriptionController.delete);

export default router;
