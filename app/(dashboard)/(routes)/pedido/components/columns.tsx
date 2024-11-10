"use client";

import { ColumnDef } from "@tanstack/react-table";

export type PedidoColumn = {
  peid: number;
  pedfecha: string;
  pedtotal: number;
  clinombre: string;
  productos: {
    prdid: number;
    prdnombre: string;
    cantidad: number;
  }[];
};

export const columns: ColumnDef<PedidoColumn>[] = [
  {
    accessorKey: "peid",
    header: "ID Pedido",
  },
  {
    accessorKey: "pedfecha",
    header: "Fecha",
  },
  {
    accessorKey: "pedtotal",
    header: "Total",
  },
  {
    accessorKey: "clinombre",
    header: "Cliente",
  },
  {
    accessorKey: "productos",
    header: "Productos",
    cell: ({ row }) => (
      <div>
        {row.original.productos.map((prod) => (
          <div key={prod.prdid}>
            {prod.prdnombre} (Cantidad: {prod.cantidad})
          </div>
        ))}
      </div>
    ),
  },
];
