import "server-only";
import { db } from "@/app/_lib/prisma";

export interface MostSoldProductDto {
  productId: string;
  name: string;
  totalSold: number;
  status: "IN_STOCK" | "OUT_OF_STOCK";
  price: number;
}

export const getMostSoldProducts = async (): Promise<MostSoldProductDto[]> => {
  const mostSoldProducts = await db.saleProduct.groupBy({
    by: ["productId"],
    _sum: {
      quantity: true,
    },
    orderBy: {
      _sum: {
        quantity: "desc",
      },
    },
    take: 5,
  });

  const productIds = mostSoldProducts.map((item) => item.productId);

  const products = await db.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
    select: {
      id: true,
      name: true,
      price: true,
      stock: true,
    },
  });

  return mostSoldProducts.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return {
      productId: product?.id || "",
      name: product?.name || "Unknown",
      totalSold: item._sum.quantity ?? 0,
      price: Number(product?.price || 0),
      status: product?.stock && product.stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK",
    };
  });
};
