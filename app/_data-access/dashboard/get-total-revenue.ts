import { db } from "@/app/_lib/prisma";
import "server-only";

export const getTotalRevenue = async (): Promise<number> => {
  const saleProducts = await db.saleProduct.findMany({
    select: { unitPrice: true, quantity: true },
  });

  return saleProducts.reduce(
    (acc, product) => acc + Number(product.unitPrice) * product.quantity,
    0,
  );
};
