import { Button } from "@/app/_components/ui/button";
import { TrashIcon } from "lucide-react";

interface DeleteSaleItemButtonProps {
  productId: string;
  onDelete: (productId: string) => void;
}

const DeleteSaleItemButton = ({
  productId,
  onDelete,
}: DeleteSaleItemButtonProps) => {
  return (
    <Button variant="ghost" onClick={() => onDelete(productId)}>
      <TrashIcon size={16} />
    </Button>
  );
};

export default DeleteSaleItemButton;
