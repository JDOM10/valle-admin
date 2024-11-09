"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type ProductorColumn = {
  proid: number;
  pronombre: string;
  prodescripcion: string;
  profoto: string;
};

export const columns: ColumnDef<ProductorColumn>[] = [
  {
    accessorKey: "proid",
    header: "Id",
  },
  {
    accessorKey: "pronombre",
    header: "Nombre",
  },
  {
    accessorKey: "prodescripcion",
    header: "Descripción",
  },
  {
    accessorKey: "profoto",
    header: "Foto",
  },
  {
    id: "acciones",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
