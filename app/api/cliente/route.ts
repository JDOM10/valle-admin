import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

export async function POST(
  req: Request,
) {
  try {
    const body = await req.json();

    const { clinombre, clicorreo, clitelefono, clici } = body;

    if (!clinombre) {
      return new NextResponse("Nombre de cliente es requerido", { status: 400 });
    }

    // Crear un nuevo cliente
    const cliente = await prismadb.cliente.create({
      data: {
        clinombre,
        clicorreo,
        clitelefono,
        clici,
      },
    });

    return NextResponse.json(cliente);
  } catch (error) {
    console.log('[CLIENTE_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
) {
  try {
    // Obtener todos los clientes
    const clientes = await prismadb.cliente.findMany();

    return NextResponse.json(clientes);
  } catch (error) {
    console.log('[CLIENTE_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
