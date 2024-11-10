"use client";

import { ColumnDef } from "@tanstack/react-table";

export type ClienteColumn = {
  clid: number;
  clinombre: string;
  clicorreo: string;
  clitelefono: string;
  clici: string;
};

export const columns: ColumnDef<ClienteColumn>[] = [
  {
    accessorKey: "clid",
    header: "ID Cliente",
  },
  {
    accessorKey: "clinombre",
    header: "Nombre",
  },
  {
    accessorKey: "clicorreo",
    header: "Correo",
  },
  {
    accessorKey: "clitelefono",
    header: "Teléfono",
  },
  {
    accessorKey: "clici",
    header: "CI",
  },
];
