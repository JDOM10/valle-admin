"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { CellAction } from "./cell-action";

// Función para verificar si una cadena es una URL válida
function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export type ProductoColumn = {
  prdid: number;
  prdnombre: string;
  prdprecio: number;
  proid: string;
  tipid: string;
  prddescripcion: string;
  prdfoto: string; // URL de la imagen de la foto
  prdcntnut: string; // Contenido nutricional, podría ser texto o URL de imagen
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
        {isValidUrl(row.original.prdfoto) ? (
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
        {isValidUrl(row.original.prdcntnut) ? (
          <Image
            src={row.original.prdcntnut}
            alt={`Contenido nutricional de ${row.original.prdnombre}`}
            width={64}
            height={64}
            className="rounded-md"
          />
        ) : (
          <span>{row.original.prdcntnut || "No disponible"}</span>
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
    header: "Productor",
  },
  {
    id: "acciones",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
