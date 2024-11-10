"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
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
    cell: ({ row }) => (
      <div className="w-16 h-16 relative">
        {row.original.profoto ? (
          <Image
            src={row.original.profoto}
            alt={row.original.pronombre}
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        ) : (
          "--"
        )}
      </div>
    ),
  },
  {
    id: "acciones",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
