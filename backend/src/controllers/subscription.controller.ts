import { Request, Response } from "express";
import { SubscriptionService } from "../services/subscription.service";

export class SubscriptionController {

  static async getAll(req: Request, res: Response) {
    res.json(await SubscriptionService.getAll());
  }

  static async getOne(req: Request, res: Response) {
    const id = Number(req.params.id);
    res.json(await SubscriptionService.getById(id));
  }

  static async create(req: Request, res: Response) {
    const data = await SubscriptionService.create(req.body);
    res.status(201).json(data);
  }

  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = await SubscriptionService.update(id, req.body);
    res.json(data);
  }

  static async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    await SubscriptionService.delete(id);
    res.json({ message: "Subscription deleted" });
  }

  static async getMonthlyTotal(req: Request, res: Response) {
    const total = await SubscriptionService.getMonthlyTotal();
    res.json({ totalHNL: total });
  }
}
