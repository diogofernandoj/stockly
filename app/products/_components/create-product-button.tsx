"use client";

import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import { PlusIcon } from "lucide-react";
import UpsertProductContent from "./upsert-product-content";
import { useState } from "react";

const CreateProductButton = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="gap-1">
          <PlusIcon size={20} />
          Novo produto
        </Button>
      </DialogTrigger>
      <UpsertProductContent setDialogOpen={setDialogOpen} />
    </Dialog>
  );
};

export default CreateProductButton;
