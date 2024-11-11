"use client";

import { ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, ClienteColumn } from "./columns";
import { ApiList } from "@/components/ui/api-list";

interface ClienteClientProps {
  data: ClienteColumn[];
}

export const ClienteClient: React.FC<ClienteClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Clientes" description="Administrar clientes" />
      </div>
      <Separator />
      <Button onClick={() => router.push("../")}>
        <ArrowBigLeft className="mr-2 h-6 w-6" />
        Regresar
      </Button>
      <Separator />
      <DataTable searchKeys={["clinombre", "clicorreo"]} columns={columns} data={data} />
      <Heading title="API" description="API Calls para Clientes" />
      <Separator />
      <ApiList entityName="pedido" entityIdName="pedidoId" />
    </>
  );
};
