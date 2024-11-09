"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type ProductoColumn = {
    prdid: number;
    prdnombre: string;
    prdprecio: number;
    proid: string;
    tipid: string;
    prddescripcion: string;
    prdfoto: string;
    prdcntnut: string;
};

export const columns: ColumnDef<ProductoColumn>[] = [
  {
    accessorKey: "prdid",
    header: "Id",
  },
  {
    accessorKey: "prdnombre",
    header: "Nombre",
  },
  {
    accessorKey: "prddescripcion",
    header: "Descripción",
  },
  {
    accessorKey: "prdfoto",
    header: "Foto",
  },
  {
    accessorKey: "prdcntnut",
    header: "Contenido Nutricional",
  },
  {
    accessorKey: "tipid",
    header: "Tipo",
  },
  {
    accessorKey: "prdprecio",
    header: "Precio",
  },
  {
    accessorKey: "proid",
    header: "Producto",
  },
  {
    id: "acciones",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
