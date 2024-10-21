import "server-only";

import { db } from "@/app/_lib/prisma";
import dayjs from "dayjs";
import "server-only";

export interface DayTotalRevenueDto {
  day: string;
  totalRevenue: number;
}

export const getLast14DaysRevenue = async (): Promise<DayTotalRevenueDto[]> => {
  const today = dayjs().endOf("day").toDate();
  const last14Days = Array.from({ length: 14 }, (_, i) =>
    dayjs(today).subtract(i, "day"),
  ).reverse();

  const totalLast14DaysRevenue: DayTotalRevenueDto[] = [];

  for (const day of last14Days) {
    const startOfDay = day.startOf("day").toDate();
    const endOfDay = day.endOf("day").toDate();

    const saleProducts = await db.saleProduct.findMany({
      where: {
        sale: {
          date: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      },
      select: {
        unitPrice: true,
        quantity: true,
      },
    });

    const totalRevenue = saleProducts.reduce(
      (acc, product) => acc + Number(product.unitPrice) * product.quantity,
      0,
    );

    totalLast14DaysRevenue.push({
      day: day.format("DD/MM"),
      totalRevenue,
    });
  }

  return totalLast14DaysRevenue;
};
