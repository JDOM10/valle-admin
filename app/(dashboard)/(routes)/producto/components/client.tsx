"use client";

import { ArrowBigLeft, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { columns, ProductoColumn } from "./columns";
import { ApiList } from "@/components/ui/api-list";

interface ProductoClientProps {
  data: ProductoColumn[];
}

export const ProductoClient: React.FC<ProductoClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <div className="space-y-4 px-4 sm:px-6 md:px-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Heading title="Productos" description="Administrar productos" />
        <Button onClick={() => router.push("producto/0")} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Añadir
        </Button>
      </div>
      
      <Separator />

      <Button onClick={() => router.push("../")} className="w-full sm:w-auto">
        <ArrowBigLeft className="mr-2 h-6 w-6" />
        Regresar
      </Button>
      
      <Separator />
      
      <div className="overflow-auto">
        <DataTable searchKeys={["prdnombre", "prddescripcion", "proid"]} columns={columns} data={data} />
      </div>
      
      <Heading title="API" description="API Calls para Productos" />
      
      <Separator />
      
      <ApiList entityName="producto" entityIdName="productoId" />
    </div>
  );
};
