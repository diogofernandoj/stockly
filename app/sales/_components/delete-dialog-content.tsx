import { deleteSale } from "@/app/_actions/sale/delete-sale";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { toast } from "sonner";

interface DeleteSaleDialogContentProps {
  id: string;
}

const DeleteSaleDialogContent = ({ id }: DeleteSaleDialogContentProps) => {
  const handleDeleteClick = async () => {
    try {
      await deleteSale({ id });
      toast.success("Venda deletada com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Algo deu errado!");
    }
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
        <AlertDialogDescription>
          Você está prestes a excluir esta venda. Esta ação não pode ser
          desfeita. Deseja continuar?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={handleDeleteClick}>
          Continuar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteSaleDialogContent;
