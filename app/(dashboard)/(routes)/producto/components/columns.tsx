"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { CellAction } from "./cell-action";

export type ProductoColumn = {
  prdid: number;
  prdnombre: string;
  prdprecio: number;
  proid: string;
  tipid: string;
  prddescripcion: string;
  prdfoto: string; // URL de la imagen de la foto
  prdcntnut: string; // URL del contenido nutricional como imagen
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
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        {row.original.prdfoto ? (
          <Image
            src={row.original.prdfoto}
            alt={`Foto de ${row.original.prdnombre}`}
            width={64}
            height={64}
            className="rounded-md"
          />
        ) : (
          <span>No disponible</span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "prdcntnut",
    header: "Contenido Nutricional",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        {row.original.prdcntnut ? (
          <Image
            src={row.original.prdcntnut}
            alt={`Contenido nutricional de ${row.original.prdnombre}`}
            width={64}
            height={64}
            className="rounded-md"
          />
        ) : (
          <span>No disponible</span>
        )}
      </div>
    ),
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
