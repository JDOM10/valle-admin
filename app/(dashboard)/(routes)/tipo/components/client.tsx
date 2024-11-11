"use client";

import { ArrowBigLeft, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, TipoColumn } from "./columns";
import { ApiList } from "@/components/ui/api-list";

interface TipoClientProps {
  data: TipoColumn[];
}

export const TipoClient: React.FC<TipoClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <div className="space-y-4 px-4 sm:px-6 md:px-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Heading title="Tipos de Producto" description="Administrar tipos de producto" />
        <Button onClick={() => router.push("tipo/0")} className="w-full sm:w-auto">
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
        <DataTable searchKeys={["tipnombre"]} columns={columns} data={data} />
      </div>
      
      <Heading title="API" description="API Calls para Tipos de Productos" />
      
      <Separator />
      
      <ApiList entityName="tipo" entityIdName="tipoId" />
    </div>
  );
};
