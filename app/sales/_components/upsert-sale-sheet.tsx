"use client";

import { Button } from "@/app/_components/ui/button";
import { Combobox, ComboboxOption } from "@/app/_components/ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { formatCurrency } from "@/app/_helpers/currency";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@prisma/client";
import { CheckIcon, PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DeleteItemButton from "./delete-item-button";
import { createSale } from "@/app/_actions/sale/create-sale";
import { toast } from "sonner";

const formSchema = z.object({
  productId: z.string().uuid({
    message: "O produto é obrigatório.",
  }),
  quantity: z.coerce
    .number({ message: "Insira uma quantidade válida" })
    .int({ message: "Insira uma quantidade válida" })
    .positive({ message: "Insira uma quantidade válida" }),
});

type FormSchema = z.infer<typeof formSchema>;

interface UpsertSaleSheetProps {
  productOptions: ComboboxOption[];
  products: Product[];
  setSheetIsOpen: (value: boolean) => void;
}

interface SelectedProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const UpsertSaleSheet = ({
  productOptions,
  products,
  setSheetIsOpen,
}: UpsertSaleSheetProps) => {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    [],
  );

  const form = useForm<FormSchema>({
    defaultValues: {
      productId: "",
      quantity: 1,
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormSchema) => {
    const selectedProduct = products.find(
      (product) => product.id === data.productId,
    );
    if (!selectedProduct) return;

    const existingProduct = selectedProducts.find(
      (item) => item.id === selectedProduct.id,
    );

    if (existingProduct) {
      const productOutOfStock =
        existingProduct.quantity + data.quantity > selectedProduct.stock;
      if (productOutOfStock) {
        return form.setError("quantity", {
          message: "Quantidade indisponível em estoque.",
        });
      }

      const newProducts = selectedProducts.map((item) =>
        item.id === existingProduct.id
          ? { ...item, quantity: item.quantity + data.quantity }
          : item,
      );
      setSelectedProducts(newProducts);
      return form.reset();
    }

    const productOutOfStock = data.quantity > selectedProduct.stock;
    if (productOutOfStock) {
      return form.setError("quantity", {
        message: "Quantidade indisponível em estoque.",
      });
    }

    setSelectedProducts((prev) => [
      ...prev,
      {
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: Number(selectedProduct.price),
        quantity: data.quantity,
      },
    ]);
    form.reset();
  };

  const total = useMemo(() => {
    return selectedProducts.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0,
    );
  }, [selectedProducts]);

  const onDelete = (productId: string) => {
    const newProducts = selectedProducts.filter(
      (item) => item.id !== productId,
    );

    setSelectedProducts(newProducts);
  };

  const onSubmitSale = async () => {
    try {
      await createSale({
        products: selectedProducts.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
      });
      toast.success("Venda registrada com sucesso!");
      setSelectedProducts([]);
      form.reset();
      setSheetIsOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao finalizar venda");
    }
  };

  return (
    <SheetContent className="!w-full !max-w-max">
      <SheetHeader>
        <SheetTitle>Nova venda</SheetTitle>
        <SheetDescription>
          Insira as informações da venda abaixo.
        </SheetDescription>
      </SheetHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Produto</FormLabel>
                <FormControl>
                  <Combobox
                    placeholder="Selecione um produto..."
                    {...field}
                    options={productOptions}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Insira a quantidade do produto..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button variant="secondary" className="w-full" type="submit">
            <PlusIcon size={18} />
            Adicionar produto à venda
          </Button>
        </form>
      </Form>

      <Table>
        <TableCaption>Lista de produtos adicionados à venda.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Produto</TableHead>
            <TableHead>Preço unit.</TableHead>
            <TableHead>Qtd.</TableHead>
            <TableHead className="text-right">Subtotal</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>
                {formatCurrency(product.quantity * product.price)}
              </TableCell>
              <TableCell>
                <DeleteItemButton productId={product.id} onDelete={onDelete} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right">
              {formatCurrency(total)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <SheetFooter>
        <Button
          className="mt-6 w-full gap-2"
          disabled={!selectedProducts.length}
          onClick={onSubmitSale}
        >
          <CheckIcon size={20} />
          Finalizar venda
        </Button>
      </SheetFooter>
    </SheetContent>
  );
};

export default UpsertSaleSheet;
