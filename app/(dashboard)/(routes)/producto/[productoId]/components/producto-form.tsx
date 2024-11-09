"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { Producto, Productor, Tipo } from "@prisma/client";
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


import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
    prdnombre: z.string().min(1, { message: "Debe ingresar al menos 1 caracter." }),
    prddescripcion: z.string().min(1, { message: "Debe ingresar al menos 1 caracter." }),
    prdfoto: z.string().min(1, { message: "Debe ingresar al menos 1 caracter." }),
    prdprecio: z.coerce
    .number()
    .min(1, { message: "Debe ser un número." })
    .int({ message: "Debe ingresar un número entero." }),
    proid: z.optional(z.number()),
    tipid: z.optional(z.number()),
    prdcntnut: z.string().min(1, { message: "Debe ingresar al menos 1 caracter." }),  
});

type ProductoFormValues = z.infer<typeof formSchema>;

interface ProductoFormProps {
  initialData: Producto | null;
  productores: Productor[];
  tipos: Tipo[];
}

export const ProductoForm: React.FC<ProductoFormProps> = ({ initialData, tipos, productores}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Editar producto" : "Crear producto";
  const description = initialData ? "Editar un producto." : "Añadir un nuevo producto.";
  const toastMessage = initialData ? "Producto actualizado" : "Producto creado";
  const action = initialData ? "Guardar Cambios" : "Crear";

  const form = useForm<ProductoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      prdnombre: "",
      prddescripcion: "",
      prdcntnut: "",
      prdfoto: "",
      prdprecio: -1,
      proid: 0,
      tipid: 0,
    },
  })

  const onSubmit = async (data: ProductoFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/producto/${params.productoId}`, data);
      } else {
        await axios.post(`/api/producto`, data);
      }
      router.refresh();
      router.push(`/../producto`);
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
      await axios.delete(`/api/producto/${params.productoId}`);
      router.refresh();
      router.push(`/../producto`);
      router.refresh();
      toast.success("Producto borrado");
    } catch (error: any) {
      toast.error(
        "Asegurate de haber borrado todas los productos asociados a este producto."
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
                  name="prdnombre"
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
                  name="prddescripcion"
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
            <div className="flex">
            <FormField
              control={form.control}
              name="prdprecio"
              render={({ field }) => (
                <FormItem className="w-16 mx-20">
                  <FormLabel>Stock*</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Stock"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <FormField
                  control={form.control}
                  name="prdfoto"
                  render={({ field }) => (
                    <FormItem className="w-2/3 ml-20">
                      <FormLabel>Foto</FormLabel>
                      <FormControl>
                        <Input disabled={loading} placeholder="Ej: ------" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
              />
            </div>
            <div className="flex">
          <FormField
                  control={form.control}
                  name="prdcntnut"
                  render={({ field }) => (
                    <FormItem className="w-1/4">
                      <FormLabel>Cnt nut</FormLabel>
                      <FormControl>
                        <Input disabled={loading} placeholder="Ej: ----" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
              />
              <FormField
                control={form.control}
                name="proid"
                render={({ field }) => (
                  <FormItem className="w-1/5 mx-8">
                    <FormLabel>Productor*</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={(selectedValue) => {
                        field.onChange(parseInt(selectedValue, 10));
                      }}
                      value={initialData ? String(field.value) : undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} placeholder="Selecciona un Productor:" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="h-[170px]">
                        {productores.map((productor) => (
                          <SelectItem key={productor.proid} value={String(productor.proid)}>
                            {productor.pronombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}  
            />
            </div>
            <div className="flex">
            <FormField
                control={form.control}
                name="tipid"
                render={({ field }) => (
                  <FormItem className="w-1/5 mx-8">
                    <FormLabel>Tipo*</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={(selectedValue) => {
                        field.onChange(parseInt(selectedValue, 10));
                      }}
                      value={initialData ? String(field.value) : undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} placeholder="Selecciona un Tipo:" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="h-[170px]">
                        {tipos.map((tipo) => (
                          <SelectItem key={tipo.tipid} value={String(tipo.tipid)}>
                            {tipo.tipnombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}  
            />
            </div>
                     
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
          <Button
            className="ml-5"
            onClick={() => router.push(`../producto`)}
            type="reset"
          >
            Cancelar
          </Button>
        </form>
      </Form>
    </>
  );
};
