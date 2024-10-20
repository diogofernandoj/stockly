"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { deleteProductSchema, DeleteProductSchema } from "./schema";

export const deleteProduct = async (data: DeleteProductSchema) => {
  deleteProductSchema.parse(data);

  await db.product.delete({
    where: data,
  });
  revalidatePath("/");
};
