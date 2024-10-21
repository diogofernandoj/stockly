import "server-only";

import { db } from "@/app/_lib/prisma";
import dayjs from "dayjs";

export const getTodayRevenue = async (): Promise<number> => {
  const todaySales = await db.saleProduct.findMany({
    where: {
      sale: {
        date: {
          gte: dayjs().startOf("day").toDate(),
          lte: dayjs().endOf("day").toDate(),
        },
      },
    },
    select: {
      unitPrice: true,
      quantity: true,
    },
  });

  return todaySales.reduce(
    (acc, product) => acc + Number(product.unitPrice) * product.quantity,
    0,
  );
};
