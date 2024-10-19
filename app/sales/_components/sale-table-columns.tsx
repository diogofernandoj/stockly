"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SaleDto } from "@/app/_data-access/sale/get-sales";
import { formatCurrency } from "@/app/_helpers/currency";

export const saleTableColumns: ColumnDef<SaleDto>[] = [
  {
    accessorKey: "productNames",
    header: "Produtos",
    cell: ({ row }) => <span>{row.original.productNames}</span>,
  },
  {
    accessorKey: "totalProducts",
    header: "Quantidade de Produtos",
    cell: ({ row }) => <span>{row.original.totalProducts}</span>,
  },
  {
    accessorKey: "totalAmount",
    header: "Valor Total",
    cell: ({ row }) => <span>{formatCurrency(row.original.totalAmount)}</span>,
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row }) => <span>{row.original.date.toDateString()}</span>,
  },
];
