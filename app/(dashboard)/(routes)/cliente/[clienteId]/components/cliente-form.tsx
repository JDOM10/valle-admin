"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { Cliente } from "@prisma/client";
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
  clinombre: z.string().min(1, { message: "El nombre es requerido." }),
  clicorreo: z.string().email({ message: "Debe ser un correo válido." }),
  clitelefono: z.string().min(1, { message: "El teléfono es requerido." }),
  clici: z.string().min(1, { message: "El CI es requerido." }),
});

type ClienteFormValues = z.infer<typeof formSchema>;

interface ClienteFormProps {
  initialData: Cliente | null;
}

export const ClienteForm: React.FC<ClienteFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Editar cliente" : "Crear cliente";
  const description = initialData ? "Editar un cliente." : "Añadir un nuevo cliente.";
  const toastMessage = initialData ? "Cliente actualizado" : "Cliente creado";
  const action = initialData ? "Guardar Cambios" : "Crear";

  const form = useForm<ClienteFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clinombre: initialData?.clinombre || "",
      clicorreo: initialData?.clicorreo || "",
      clitelefono: initialData?.clitelefono || "",
      clici: initialData?.clici || "",
    },
  });

  const onSubmit = async (data: ClienteFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/cliente/${params.clienteId}`, data);
      } else {
        await axios.post(`/api/cliente`, data);
      }
      router.refresh();
      router.push(`/../cliente`);
      toast.success(toastMessage);
    } catch (error) {
      console.log(error);
      toast.error("Algo estuvo mal.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/cliente/${params.clienteId}`);
      router.refresh();
      router.push(`/../cliente`);
      toast.success("Cliente borrado");
    } catch (error) {
      console.log(error);
      toast.error("Asegúrate de haber borrado todas las dependencias del cliente.");
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="clinombre"
            render={({ field }) => (
              <FormItem className="w-1/3">
                <FormLabel>Nombre*</FormLabel>
                <FormControl>
                  <Input disabled={loading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="clicorreo"
            render={({ field }) => (
              <FormItem className="w-1/3">
                <FormLabel>Correo*</FormLabel>
                <FormControl>
                  <Input type="email" disabled={loading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="clitelefono"
            render={({ field }) => (
              <FormItem className="w-1/3">
                <FormLabel>Teléfono*</FormLabel>
                <FormControl>
                  <Input disabled={loading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="clici"
            render={({ field }) => (
              <FormItem className="w-1/3">
                <FormLabel>CI*</FormLabel>
                <FormControl>
                  <Input disabled={loading} {...field} />
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
            onClick={() => router.push(`../cliente`)}
            type="reset"
          >
            Cancelar
          </Button>
        </form>
      </Form>
    </>
  );
};
