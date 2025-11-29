import { Request, Response, NextFunction } from "express";

export function validateSubscription(req: Request, res: Response, next: NextFunction) {
  const { name, price, payDay } = req.body;
  if (!name || !price || !payDay) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  next();
}
