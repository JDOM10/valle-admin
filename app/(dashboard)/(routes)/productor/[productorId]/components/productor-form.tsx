"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { Productor } from "@prisma/client";
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
  pronombre: z.string().min(1, { message: "Debe ingresar al menos 1 caracter." }),
    prodescripcion: z.string().min(1, { message: "Debe ingresar al menos 1 caracter." }),
    profoto: z.string().min(1, { message: "Debe ingresar al menos 1 caracter." }),
});

type ProductorFormValues = z.infer<typeof formSchema>;

interface ProductorFormProps {
  initialData: Productor | null;
}

export const ProductorForm: React.FC<ProductorFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Editar productor" : "Crear productor";
  const description = initialData ? "Editar un productor." : "Añadir un nuevo productor.";
  const toastMessage = initialData ? "Productor actualizado" : "Productor creado";
  const action = initialData ? "Guardar Cambios" : "Crear";

  const form = useForm<ProductorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      pronombre: "",
      prodescripcion: "",
      profoto: "",
    },
  });

  const onSubmit = async (data: ProductorFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/productor/${params.productorId}`, data);
      } else {
        await axios.post(`/api/productor`, data);
      }
      router.refresh();
      router.push(`/../productor`);
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
      await axios.delete(`/api/productor/${params.productorId}`);
      router.refresh();
      router.push(`/../productor`);
      router.refresh();
      toast.success("Productor borrado");
    } catch (error: any) {
      toast.error(
        "Asegurate de haber borrado todas los productos asociados a este productor."
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
        <div className="flex">
          <FormField
                  control={form.control}
                  name="pronombre"
                  render={({ field }) => (
                    <FormItem className="w-1/4">
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input disabled={loading} placeholder="Ej: ----" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name="prodescripcion"
                  render={({ field }) => (
                    <FormItem className="w-2/3 ml-20">
                      <FormLabel>Descripción</FormLabel>
                      <FormControl>
                        <Input disabled={loading} placeholder="Ej: ------" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
              />
            </div>
            <FormField
                  control={form.control}
                  name="profoto"
                  render={({ field }) => (
                    <FormItem className="w-1/3">
                      <FormLabel>Foto</FormLabel>
                      <FormControl>
                        <Input disabled={loading} placeholder="Ej: ----" {...field} />
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
            onClick={() => router.push(`../productor`)}
            type="reset"
          >
            Cancelar
          </Button>
        </form>
      </Form>
    </>
  );
};
