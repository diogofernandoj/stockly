"use server";

import { db } from "@/app/_lib/prisma";
import { deleteSaleSchema, DeleteSaleSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const deleteSale = async (data: DeleteSaleSchema) => {
  deleteSaleSchema.parse(data);

  await db.sale.delete({
    where: data,
  });

  revalidatePath("/sales");
};
