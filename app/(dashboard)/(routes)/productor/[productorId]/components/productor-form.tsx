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
      toast.success("Productor borrado");
    } catch (error: any) {
      toast.error("Asegurate de haber borrado todos los productos asociados a este productor.");
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="sm:w-full md:w-2/3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="pronombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Ej: Juan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="prodescripcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Ej: Montenegro" {...field} />
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
              <FormItem>
                <FormLabel>Foto</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Ej: https://i.pinimg.com/imagen.jpg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex space-x-4">
            <Button disabled={loading} type="submit">
              {action}
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push(`../productor`)}
              type="button"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
