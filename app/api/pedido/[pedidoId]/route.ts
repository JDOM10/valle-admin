import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { pedidoId: number } }
) {
  try {
    if (!params.pedidoId) {
      return new NextResponse("Id de pedido es requerido", { status: 400 });
    }

    const pedidoId = Number(params.pedidoId);

    const pedido = await prismadb.pedido.findUnique({
      where: {
        peid: pedidoId,
      },
      include: {
        cliente: true, // Incluye información del cliente asociado al pedido
        producto: {
          include: {
            producto: true, // Incluye detalles de cada producto en el pedido
          },
        },
      },
    });

    if (!pedido) {
      return new NextResponse("Pedido no encontrado", { status: 404 });
    }

    return NextResponse.json(pedido);
  } catch (error) {
    console.log('[PEDIDO_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function PATCH(
  req: Request,
  { params }: { params: { pedidoId: number } }
) {
  try {
    if (!params.pedidoId) {
      return new NextResponse("Id de pedido es requerido", { status: 400 });
    }

    const body = await req.json();
    const { pedfecha, pedtotal, clienteId, productos } = body;

    if (!pedfecha || !pedtotal || !clienteId) {
      return new NextResponse("Fecha, total y cliente son requeridos", { status: 400 });
    }

    const pedidoId = Number(params.pedidoId);

    // Actualizar el pedido y sus productos
    const updatedPedido = await prismadb.pedido.update({
      where: {
        peid: pedidoId,
      },
      data: {
        pedfecha: new Date(pedfecha),
        pedtotal,
        cliente: {
          connect: { clid: clienteId },
        },
        producto: {
          deleteMany: {}, // Eliminar productos existentes asociados al pedido
          create: productos.map((prod: { productoId: number; cantidad: number }) => ({
            producto: {
              connect: { prdid: prod.productoId },
            },
            ppcantidad: prod.cantidad,
          })),
        },
      },
      include: {
        cliente: true,
        producto: {
          include: {
            producto: true,
          },
        },
      },
    });

    return NextResponse.json(updatedPedido);
  } catch (error) {
    console.log('[PEDIDO_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { pedidoId: number } }
) {
  try {
    if (!params.pedidoId) {
      return new NextResponse("Id de pedido es requerido", { status: 400 });
    }

    const pedidoId = Number(params.pedidoId);

    const deletedPedido = await prismadb.pedido.delete({
      where: {
        peid: pedidoId,
      },
    });

    return NextResponse.json(deletedPedido);
  } catch (error) {
    console.log('[PEDIDO_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
