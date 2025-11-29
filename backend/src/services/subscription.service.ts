import { prisma } from "../db/client";

export class SubscriptionService {

  static getAll() {
    return prisma.subscription.findMany({
      orderBy: { createdAt: "desc" }
    });
  }

  static getById(id: number) {
    return prisma.subscription.findUnique({ where: { id } });
  }

  static create(data: any) {
    return prisma.subscription.create({ data });
  }

  static update(id: number, data: any) {
    return prisma.subscription.update({
      where: { id },
      data,
    });
  }

  static delete(id: number) {
    return prisma.subscription.delete({ where: { id } });
  }

  static async getMonthlyTotal() {
    const subs = await prisma.subscription.findMany();
    const USD_TO_HNL = 26;

    return subs.reduce((acc: number, sub: any) => {
      let monthly = sub.frequency === 'annual' ? sub.price / 12 : sub.price;
      if (sub.currency === 'USD') monthly *= USD_TO_HNL;
      return acc + monthly;
    }, 0);
  }
}
