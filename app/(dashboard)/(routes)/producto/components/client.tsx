"use client";

import { ArrowBigLeft, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, ProductoColumn } from "./columns";

interface ProductoClientProps {
  data: ProductoColumn[];
}

export const ProductoClient: React.FC<ProductoClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Productos`} description="Administrar productos" />
        <Button onClick={() => router.push(`producto/0`)}>
          <Plus className="mr-2 h-4 w-4" />
          Añadir
        </Button>
      </div>
      <Separator />
      <Button onClick={() => router.push("../")}>
        <ArrowBigLeft className="mr-2 h-6 w-6" />
        Regresar
      </Button>
      <DataTable searchKeys={["prdnombre", "prddescripcion", "proid"]} columns={columns} data={data} />
    </>
  );
};
