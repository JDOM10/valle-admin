import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { clienteId: number } }
) {
  try {
    if (!params.clienteId) {
      return new NextResponse("Id de cliente es requerido", { status: 400 });
    }

    const clienteId = Number(params.clienteId);

    const cliente = await prismadb.cliente.findUnique({
      where: {
        clid: clienteId,
      },
    });

    if (!cliente) {
      return new NextResponse("Cliente no encontrado", { status: 404 });
    }

    return NextResponse.json(cliente);
  } catch (error) {
    console.log("[CLIENTE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { clienteId: number } }
) {
  try {
    const body = await req.json();
    const { clinombre, clicorreo, clitelefono, clici } = body;

    if (!clinombre) {
      return new NextResponse("Nombre de cliente es requerido", { status: 400 });
    }

    if (!params.clienteId) {
      return new NextResponse("Id de Cliente es requerido", { status: 400 });
    }

    const clienteId = Number(params.clienteId);

    const cliente = await prismadb.cliente.update({
      where: {
        clid: clienteId,
      },
      data: {
        clinombre,
        clicorreo,
        clitelefono,
        clici,
      },
    });

    return NextResponse.json(cliente);
  } catch (error) {
    console.log("[CLIENTE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { clienteId: number } }
) {
  try {
    if (!params.clienteId) {
      return new NextResponse("Id de cliente es requerido", { status: 400 });
    }

    const clienteId = Number(params.clienteId);

    const cliente = await prismadb.cliente.delete({
      where: {
        clid: clienteId,
      },
    });

    return NextResponse.json(cliente);
  } catch (error) {
    console.log("[CLIENTE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
