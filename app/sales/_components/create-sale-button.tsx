"use client";

import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { Product } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import UpsertSaleSheet from "./upsert-sale-sheet";
import { ComboboxOption } from "@/app/_components/ui/combobox";

interface UpsertSaleButtonProps {
  products: Product[];
  productOptions: ComboboxOption[];
}

const CreateSaleButton = ({
  productOptions,
  products,
}: UpsertSaleButtonProps) => {
  const [sheetIsOpen, setSheetIsOpen] = useState(false);

  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Button className="gap-2">
          <PlusIcon size={20} />
          Nova Venda
        </Button>
      </SheetTrigger>
      <UpsertSaleSheet productOptions={productOptions} products={products} />
    </Sheet>
  );
};

export default CreateSaleButton;
