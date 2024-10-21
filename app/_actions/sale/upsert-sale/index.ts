"use server";

import { db } from "@/app/_lib/prisma";
import { upsertSaleSchema, UpsertSaleSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const upsertSale = async (data: UpsertSaleSchema) => {
  upsertSaleSchema.parse(data);

  const { products, id } = data;

  await db.$transaction(async (trx) => {
    const isUpdating = Boolean(id);

    if (isUpdating) {
      const updatingSale = await db.sale.findUnique({
        where: { id },
        include: { saleProducts: true },
      });
      if (!updatingSale) return;

      for (const saleProduct of updatingSale.saleProducts) {
        await trx.product.update({
          where: { id: saleProduct.productId },
          data: {
            stock: { increment: saleProduct.quantity },
          },
        });
      }

      await trx.sale.delete({
        where: { id },
      });
    }

    const sale = await trx.sale.create({
      data: {
        date: new Date(),
      },
    });

    for (const product of products) {
      const productFromDb = await db.product.findUnique({
        where: { id: product.id },
      });
      if (!productFromDb) {
        throw new Error("Product not found");
      }

      const productOutOfStock = product.quantity > productFromDb?.stock;
      if (productOutOfStock) {
        throw new Error("Product is out of stock");
      }

      await trx.saleProduct.create({
        data: {
          saleId: sale.id,
          productId: product.id,
          quantity: product.quantity,
          unitPrice: Number(productFromDb?.price),
        },
      });

      await trx.product.update({
        where: { id: product.id },
        data: {
          stock: { decrement: product.quantity },
        },
      });
    }
  });

  revalidatePath("/");
  revalidatePath("/sales");
};
