import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { clinombre, clicorreo, clitelefono, clici } = body;

    if (!clinombre || !clicorreo) {
      return new NextResponse("Nombre y correo de cliente son requeridos", { status: 400 });
    }

    // Verificar si el cliente ya existe basado en correo o cédula
    const existingCliente = await prismadb.cliente.findFirst({
      where: {
        OR: [
          { clicorreo: clicorreo || undefined },
          { clici: clici || undefined },
        ],
      },
    });

    if (existingCliente) {
      // Si el cliente ya existe, retornarlo
      return NextResponse.json(existingCliente);
    }

    // Si no existe, crearlo
    const nuevoCliente = await prismadb.cliente.create({
      data: {
        clinombre,
        clicorreo,
        clitelefono: clitelefono || "", // Manejo de teléfono opcional
        clici: clici || "", // Manejo de cédula opcional
      },
    });

    return NextResponse.json(nuevoCliente);
  } catch (error) {
    console.error('[CLIENTE_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const clicorreo = searchParams.get("clicorreo");
    const clici = searchParams.get("clici");

    // Filtrar valores null antes de la consulta
    const whereClause: any = {};
    if (clicorreo) {
      whereClause.clicorreo = clicorreo;
    }
    if (clici) {
      whereClause.clici = clici;
    }

    if (clicorreo || clici) {
      // Buscar cliente por correo o cédula
      const cliente = await prismadb.cliente.findFirst({
        where: whereClause,
      });

      if (!cliente) {
        return new NextResponse("Cliente no encontrado", { status: 404 });
      }

      return NextResponse.json(cliente);
    }

    // Si no se pasa correo ni cédula, devolver todos los clientes
    const clientes = await prismadb.cliente.findMany();

    return NextResponse.json(clientes);
  } catch (error) {
    console.error('[CLIENTE_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
