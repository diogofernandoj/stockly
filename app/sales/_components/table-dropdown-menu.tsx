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

interface SaleTableDropdownMenuProps {
  sale: SaleDto;
}

const SaleTableDropdownMenu = ({ sale }: SaleTableDropdownMenuProps) => {
  const handleCopyIdClick = () => {
    navigator.clipboard.writeText(sale.id);
    toast.success("ID Copiado para a área de transferência!");
  };

  return (
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

          <DropdownMenuItem className="gap-1.5">
            <EditIcon size={16} />
            Editar
          </DropdownMenuItem>

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
  );
};

export default SaleTableDropdownMenu;
