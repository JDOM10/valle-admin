"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type TipoColumn = {
  tipid: number;
  tipnombre: string;
};

export const columns: ColumnDef<TipoColumn>[] = [
  {
    accessorKey: "tipid",
    header: "Id",
  },
  {
    accessorKey: "tipnombre",
    header: "Descripción",
  },
  {
    id: "acciones",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
