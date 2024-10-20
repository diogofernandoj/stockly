"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { SaleDto } from "@/app/_data-access/sale/get-sales";
import {
  MoreHorizontalIcon,
  ClipboardCopyIcon,
  EditIcon,
  TrashIcon,
} from "lucide-react";
import { toast } from "sonner";
import DeleteSaleDialogContent from "./delete-dialog-content";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import UpsertSaleSheet from "./upsert-sale-sheet";
import { ProductDto } from "@/app/_data-access/product/get-products";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { useState } from "react";

interface SaleTableDropdownMenuProps {
  sale: SaleDto;
  products: ProductDto[];
  productOptions: ComboboxOption[];
}

const SaleTableDropdownMenu = ({
  sale,
  productOptions,
  products,
}: SaleTableDropdownMenuProps) => {
  const [sheetIsOpen, setSheetIsOpen] = useState(false);

  const handleCopyIdClick = () => {
    navigator.clipboard.writeText(sale.id);
    toast.success("ID Copiado para a área de transferência!");
  };

  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <MoreHorizontalIcon size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-1.5" onClick={handleCopyIdClick}>
              <ClipboardCopyIcon size={16} />
              Copiar ID
            </DropdownMenuItem>

            <SheetTrigger asChild>
              <DropdownMenuItem className="gap-1.5">
                <EditIcon size={16} />
                Editar
              </DropdownMenuItem>
            </SheetTrigger>

            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="gap-1.5">
                <TrashIcon size={16} />
                Deletar
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <DeleteSaleDialogContent id={sale.id} />
      </AlertDialog>

      <UpsertSaleSheet
        products={products}
        productOptions={productOptions}
        setSheetIsOpen={setSheetIsOpen}
        saleId={sale.id}
        sheetIsOpen={sheetIsOpen}
        defaultSelectedProducts={sale.saleProducts.map((product) => ({
          id: product.productId,
          name: product.productName,
          price: product.unitPrice,
          quantity: product.quantity,
        }))}
      />
    </Sheet>
  );
};

export default SaleTableDropdownMenu;
