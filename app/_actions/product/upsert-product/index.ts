"use server";

import { db } from "@/app/_lib/prisma";
import { UpsertProductSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const upsertProduct = async (data: UpsertProductSchema) => {
  await db.product.upsert({
    where: {
      id: data.id ?? "",
    },
    update: data,
    create: data,
  });
  revalidatePath("/");
};
