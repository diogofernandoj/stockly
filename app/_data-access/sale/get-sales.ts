import { db } from "@/app/_lib/prisma";

interface SaleProductDto {
  productId: string;
  quantity: number;
  unitPrice: number;
  productName: string;
}

export interface SaleDto {
  id: string;
  productNames: string;
  totalProducts: number;
  totalAmount: number;
  date: Date;
  saleProducts: SaleProductDto[];
}

export const getSales = async (): Promise<SaleDto[]> => {
  const sales = await db.sale.findMany({
    include: { saleProducts: { include: { product: true } } },
  });

  return sales.map((sale) => ({
    id: sale.id,
    date: sale.date,
    productNames: sale.saleProducts
      .map((product) => product.product.name)
      .join(" • "),
    totalProducts: sale.saleProducts.reduce(
      (acc, product) => acc + product.quantity,
      0,
    ),
    totalAmount: sale.saleProducts.reduce(
      (acc, product) => acc + Number(product.unitPrice) * product.quantity,
      0,
    ),
    saleProducts: sale.saleProducts.map(
      (saleProduct): SaleProductDto => ({
        productId: saleProduct.id,
        productName: saleProduct.product.name,
        quantity: saleProduct.quantity,
        unitPrice: Number(saleProduct.unitPrice),
      }),
    ),
  }));
};
