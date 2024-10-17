"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteProduct = async (id: string) => {
  await db.product.delete({
    where: { id },
  });
  revalidatePath("/");
};
