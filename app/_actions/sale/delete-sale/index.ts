"use server";

import { db } from "@/app/_lib/prisma";
import { deleteSaleSchema, DeleteSaleSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const deleteSale = async (data: DeleteSaleSchema) => {
  deleteSaleSchema.parse(data);

  await db.$transaction(async (trx) => {
    const sale = await trx.sale.findUnique({
      where: { id: data.id },
      include: { saleProducts: true },
    });
    if (!sale) return;

    for (const saleProduct of sale.saleProducts) {
      await trx.product.update({
        where: { id: saleProduct.productId },
        data: {
          stock: { increment: saleProduct.quantity },
        },
      });
    }

    await trx.sale.delete({
      where: data,
    });
  });
  revalidatePath("/", "layout");
};
