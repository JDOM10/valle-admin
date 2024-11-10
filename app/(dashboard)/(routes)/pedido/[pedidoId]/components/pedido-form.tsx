"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { Pedido, Cliente, Producto } from "@prisma/client";
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
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  pedfecha: z.string().min(1, { message: "La fecha es requerida." }),
  pedtotal: z.number().min(1, { message: "El total es requerido." }),
  clienteId: z.string().min(1, { message: "El cliente es requerido." }),
  productos: z.array(z.object({
    productoId: z.string().min(1),
    cantidad: z.number().min(1, { message: "Cantidad debe ser al menos 1." }),
  })),
});

type PedidoFormValues = z.infer<typeof formSchema>;

interface PedidoFormProps {
  initialData: Pedido & { cliente?: Cliente; producto?: { producto: Producto; ppcantidad: number }[] } | null;
  clientes: Cliente[];
  productos: Producto[];
}

export const PedidoForm: React.FC<PedidoFormProps> = ({ initialData, clientes, productos }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Editar pedido" : "Crear pedido";
  const description = initialData ? "Editar un pedido." : "Añadir un nuevo pedido.";
  const toastMessage = initialData ? "Pedido actualizado" : "Pedido creado";
  const action = initialData ? "Guardar Cambios" : "Crear";

  // Ajuste para el tipo de `pedidoData`, asegurando que cliente y productos sean opcionales
  const pedidoData: PedidoFormValues = {
    pedfecha: initialData?.pedfecha ? initialData.pedfecha.toISOString().split('T')[0] : "",
    pedtotal: initialData?.pedtotal || 0,
    clienteId: initialData?.cliente ? initialData.cliente.clid.toString() : "",
    productos: initialData?.producto?.map((item) => ({
      productoId: item.producto.prdid.toString(),
      cantidad: item.ppcantidad,
    })) || [],
  };

  const form = useForm<PedidoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: pedidoData,
  });

  const onSubmit = async (data: PedidoFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/pedido/${params.pedidoId}`, data);
      } else {
        await axios.post(`/api/pedido`, data);
      }
      router.refresh();
      router.push(`/../pedido`);
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
      await axios.delete(`/api/pedido/${params.pedidoId}`);
      router.refresh();
      router.push(`/../pedido`);
      toast.success("Pedido borrado");
    } catch (error) {
      console.log(error);
      toast.error("Asegúrate de haber borrado todas las dependencias del pedido.");
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
            name="pedfecha"
            render={({ field }) => (
              <FormItem className="w-1/3">
                <FormLabel>Fecha*</FormLabel>
                <FormControl>
                  <Input type="date" disabled={loading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pedtotal"
            render={({ field }) => (
              <FormItem className="w-1/3">
                <FormLabel>Total*</FormLabel>
                <FormControl>
                  <Input type="number" disabled={loading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="clienteId"
            render={({ field }) => (
              <FormItem className="w-1/3">
                <FormLabel>Cliente*</FormLabel>
                <Select
                  disabled={loading}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un cliente" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {clientes.map((cliente) => (
                      <SelectItem key={cliente.clid} value={cliente.clid.toString()}>
                        {cliente.clinombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator />
          <Heading title="Productos" description="Seleccione productos y cantidad" />
          {form.watch("productos").map((_, index) => (
            <div key={index} className="flex space-x-4">
              <FormField
                control={form.control}
                name={`productos.${index}.productoId`}
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Producto</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un producto" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {productos.map((producto) => (
                          <SelectItem key={producto.prdid} value={producto.prdid.toString()}>
                            {producto.prdnombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`productos.${index}.cantidad`}
                render={({ field }) => (
                  <FormItem className="w-1/4">
                    <FormLabel>Cantidad</FormLabel>
                    <FormControl>
                      <Input type="number" disabled={loading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
          <Button
            className="ml-5"
            onClick={() => router.push(`../pedido`)}
            type="reset"
          >
            Cancelar
          </Button>
        </form>
      </Form>
    </>
  );
};
