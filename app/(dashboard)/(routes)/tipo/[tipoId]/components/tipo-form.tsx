"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { Tipo } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";

const formSchema = z.object({
  tipnombre: z.string().min(1, { message: "Debe ingresar al menos 1 caracter." }),
});

type TipoFormValues = z.infer<typeof formSchema>;

interface TipoFormProps {
  initialData: Tipo | null;
}

export const TipoForm: React.FC<TipoFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Editar tipo" : "Crear tipo";
  const description = initialData ? "Editar un tipo." : "Añadir un nuevo tipo.";
  const toastMessage = initialData ? "Tipo actualizado" : "Tipo creado";
  const action = initialData ? "Guardar Cambios" : "Crear";

  const form = useForm<TipoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      tipnombre: "",
    },
  });

  const onSubmit = async (data: TipoFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/tipo/${params.tipoId}`, data);
      } else {
        await axios.post(`/api/tipo`, data);
      }
      router.refresh();
      router.push(`/../tipo`);
      router.refresh();
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Algo estuvo mal.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/tipo/${params.tipoId}`);
      router.refresh();
      router.push(`/../tipo`);
      router.refresh();
      toast.success("Tipo borrado");
    } catch (error: any) {
      toast.error(
        "Asegurate de haber borrado todas los productos asociados a este tipo."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="tipnombre"
            render={({ field }) => (
              <FormItem className="w-1/3">
                <FormLabel>Descripción*</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Ej: Textil"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
          <Button
            className="ml-5"
            onClick={() => router.push(`../tipo`)}
            type="reset"
          >
            Cancelar
          </Button>
        </form>
      </Form>
    </>
  );
};
