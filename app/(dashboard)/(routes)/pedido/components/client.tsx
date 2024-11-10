"use client";

import { ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, PedidoColumn } from "./columns";

interface PedidoClientProps {
  data: PedidoColumn[];
}

export const PedidoClient: React.FC<PedidoClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Pedidos" description="Administrar pedidos" />
      </div>
      <Separator />
      <Button onClick={() => router.push("../")}>
        <ArrowBigLeft className="mr-2 h-6 w-6" />
        Regresar
      </Button>
      <DataTable searchKeys={["clinombre", "productos.prdnombre"]} columns={columns} data={data} />
    </>
  );
};
