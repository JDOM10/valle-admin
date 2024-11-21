import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

// GET: Obtener un producto por ID con relaciones
export async function GET(
  req: Request,
  { params }: { params: { productoId: number } }
) {
  try {
    if (!params.productoId) {
      return new NextResponse("Id de producto es requerido", { status: 400 });
    }

    const productoId = Number(params.productoId);

    const producto = await prismadb.producto.findUnique({
      where: {
        prdid: productoId,
      },
      include: {
        tipo: true, // Incluye la relación con Tipo
        productor: true, // Incluye la relación con Productor (si aplica)
      },
    });

    if (!producto) {
      return new NextResponse("Producto no encontrado", { status: 404 });
    }

    return NextResponse.json(producto);
  } catch (error) {
    console.log("[PRODUCTO_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// PATCH: Actualizar un producto por ID
export async function PATCH(
  req: Request,
  { params }: { params: { productoId: number } }
) {
  try {
    const body = await req.json();
    const { prdcntnut, prddescripcion, prdfoto, prdnombre, prdprecio, tipid, proid } = body;

    if (!prdnombre) {
      return new NextResponse("Nombre de producto es requerido", { status: 400 });
    }

    if (!params.productoId) {
      return new NextResponse("Id de Producto es requerido", { status: 400 });
    }

    const productoId = Number(params.productoId);

    const producto = await prismadb.producto.update({
      where: {
        prdid: productoId,
      },
      data: {
        prdcntnut,
        prddescripcion,
        prdfoto,
        prdnombre,
        prdprecio,
        tipid,
        proid,
      },
      include: {
        tipo: true, // Incluye la relación actualizada con Tipo
        productor: true, // Incluye la relación actualizada con Productor
      },
    });

    return NextResponse.json(producto);
  } catch (error) {
    console.log("[PRODUCTO_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// DELETE: Eliminar un producto por ID
export async function DELETE(
  req: Request,
  { params }: { params: { productoId: number } }
) {
  try {
    if (!params.productoId) {
      return new NextResponse("Id de producto es requerido", { status: 400 });
    }

    const productoId = Number(params.productoId);

    const producto = await prismadb.producto.delete({
      where: {
        prdid: productoId,
      },
    });

    return NextResponse.json(producto);
  } catch (error) {
    console.log("[PRODUCTO_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
