import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { pedfecha, pedtotal, clid, productos } = body;

    // Validar campos requeridos
    if (!pedfecha || !pedtotal || !clid || !productos || !Array.isArray(productos)) {
      return new NextResponse("Fecha, total, cliente y productos son requeridos", { status: 400 });
    }

    // Validar que los productos tengan estructura válida
    const invalidProduct = productos.some(
      (prod: { prdid: number; cantidad: number }) => !prod.prdid || !prod.cantidad
    );
    if (invalidProduct) {
      return new NextResponse("Cada producto debe incluir 'prdid' y 'cantidad'", { status: 400 });
    }

    // Crear el pedido con los productos asociados
    const pedido = await prismadb.pedido.create({
      data: {
        pedfecha: new Date(pedfecha), // Convertir `pedfecha` a tipo Date
        pedtotal,
        cliente: {
          connect: { clid }, // Conectar el pedido con el cliente usando `clid`
        },
        producto: {
          create: productos.map((prod: { prdid: number; cantidad: number }) => ({
            producto: {
              connect: { prdid: prod.prdid }, // Conectar cada producto al pedido usando `prdid`
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

    return NextResponse.json(pedido);
  } catch (error) {
    console.error('[PEDIDO_POST]', error);
    return new NextResponse("Error interno al crear el pedido", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    // Obtener todos los pedidos con información de cliente y productos asociados
    const pedidos = await prismadb.pedido.findMany({
      include: {
        cliente: true, // Incluir datos del cliente asociado
        producto: {
          include: {
            producto: true, // Incluir detalles de cada producto en el pedido
          },
        },
      },
    });

    // Formatear los pedidos para incluir detalles de los productos y cliente en un formato más adecuado
    const formattedPedidos = pedidos.map((pedido) => ({
      peid: pedido.peid,
      pedfecha: pedido.pedfecha.toISOString().split('T')[0], // Convertir a string en formato de fecha
      pedtotal: pedido.pedtotal,
      cliente: {
        clid: pedido.cliente.clid,
        clinombre: pedido.cliente.clinombre,
      },
      productos: pedido.producto.map((prod) => ({
        prdid: prod.producto.prdid,
        prdnombre: prod.producto.prdnombre,
        cantidad: prod.ppcantidad,
      })),
    }));

    return NextResponse.json(formattedPedidos);
  } catch (error) {
    console.error('[PEDIDO_GET]', error);
    return new NextResponse("Error interno al obtener los pedidos", { status: 500 });
  }
}
