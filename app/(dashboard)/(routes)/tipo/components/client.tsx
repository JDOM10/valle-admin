"use client";

import { ArrowBigLeft, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, TipoColumn } from "./columns";

interface TipoClientProps {
  data: TipoColumn[];
}

export const TipoClient: React.FC<TipoClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Tipos de Producto`} description="Administrar tipos de producto" />
        <Button onClick={() => router.push(`tipo/0`)}>
          <Plus className="mr-2 h-4 w-4" />
          Añadir
        </Button>
      </div>
      <Separator />
      <Button onClick={() => router.push("../")}>
        <ArrowBigLeft className="mr-2 h-6 w-6" />
        Regresar
      </Button>
      <DataTable searchKeys={["tipnombre"]} columns={columns} data={data} />
    </>
  );
};
