"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SaleDto } from "@/app/_data-access/sale/get-sales";
import { formatCurrency } from "@/app/_helpers/currency";
import SaleTableDropdownMenu from "./table-dropdown-menu";
import { ProductDto } from "@/app/_data-access/product/get-products";
import { ComboboxOption } from "@/app/_components/ui/combobox";

interface SaleColumns extends SaleDto {
  products: ProductDto[];
  productOptions: ComboboxOption[];
}

export const saleTableColumns: ColumnDef<SaleColumns>[] = [
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
    cell: ({ row }) => (
      <span>{row.original.date.toLocaleDateString("pt-BR")}</span>
    ),
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => (
      <SaleTableDropdownMenu
        productOptions={row.original.productOptions}
        products={row.original.products}
        sale={row.original}
      />
    ),
  },
];
