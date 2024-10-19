import { db } from "@/app/_lib/prisma";
import { Product } from "@prisma/client";
import { cache } from "react";

export type ProductStatusDto = "IN_STOCK" | "OUT_OF_STOCK";
export interface ProductDto extends Omit<Product, "price"> {
  price: number;
  status: ProductStatusDto;
}

export const getProducts = async (): Promise<ProductDto[]> => {
  const products = await db.product.findMany({});

  return products.map((product) => ({
    ...product,
    price: Number(product.price),
    status: product.stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK",
  }));
};

export const cachedGetProducts = cache(getProducts);
