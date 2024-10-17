"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@prisma/client";
import ProductStatusBadge from "@/app/_components/product-status-badge";
import ProductTableDropdownMenu from "./table-dropdown-menu";

export const productTableColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Produto",
  },
  {
    accessorKey: "price",
    header: "Valor unitário",
    cell: (row) => {
      const product = row.row.original;
      return Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(product.price));
    },
  },
  {
    accessorKey: "stock",
    header: "Estoque",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row: { original: product } }) => {
      return <ProductStatusBadge stock={product.stock} />;
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => <ProductTableDropdownMenu product={row.original} />,
  },
];
