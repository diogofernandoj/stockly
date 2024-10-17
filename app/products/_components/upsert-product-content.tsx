"use client";

import { upsertProduct } from "@/app/_components/_actions/product/upsert-product";
import {
  UpsertProductSchema,
  upsertProductSchema,
} from "@/app/_components/_actions/product/upsert-product/schema";
import { Button } from "@/app/_components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { Loader2Icon } from "lucide-react";
import { NumericFormat } from "react-number-format";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface UpsertProductContentProps {
  defaultValues?: UpsertProductSchema;
  setDialogOpen: (value: boolean) => void;
}

const UpsertProductContent = ({
  defaultValues,
  setDialogOpen,
}: UpsertProductContentProps) => {
  const form = useForm<UpsertProductSchema>({
    shouldUnregister: true,
    resolver: zodResolver(upsertProductSchema),
    defaultValues: defaultValues ?? {
      name: "",
      price: 0,
      stock: 1,
    },
  });

  const onSubmit = async (values: UpsertProductSchema) => {
    try {
      await upsertProduct({ ...values, id: defaultValues?.id ?? "" });
      setDialogOpen(false);
      toast("Sucesso!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Adicionar produto</DialogTitle>
        <DialogDescription>Insira as informações abaixo</DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Insira o nome do produto..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço</FormLabel>
                <FormControl>
                  <NumericFormat
                    thousandSeparator="."
                    decimalSeparator=","
                    fixedDecimalScale
                    decimalScale={2}
                    prefix="R$ "
                    allowNegative={false}
                    customInput={Input}
                    onValueChange={(values) =>
                      field.onChange(values.floatValue)
                    }
                    {...field}
                    onChange={() => {}}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estoque</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Digite o estoque do produto"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary" type="reset">
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="gap-1.5"
            >
              {form.formState.isSubmitting && (
                <Loader2Icon className="animate-spin" size={16} />
              )}
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default UpsertProductContent;
