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
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        {isValidUrl(row.original.profoto) ? (
          <Image
            src={row.original.profoto}
            alt={`Foto de ${row.original.pronombre}`}
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
    id: "acciones",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
