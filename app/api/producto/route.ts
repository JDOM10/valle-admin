import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

// POST: Crear un nuevo producto
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { prdnombre, prdprecio, prdcntnut, prdfoto, prddescripcion, tipid, proid } = body;

    // Validación de campos requeridos
    if (!prdnombre || !prdprecio || !tipid || !proid) {
      return new NextResponse("Campos requeridos faltantes", { status: 400 });
    }

    // Creación del producto
    const producto = await prismadb.producto.create({
      data: {
        prdnombre,
        prddescripcion: prddescripcion || "",
        prdcntnut: prdcntnut || "",
        prdprecio,
        prdfoto: prdfoto || "",
        tipid,
        proid,
      },
    });

    return NextResponse.json(producto, { status: 201 }); // Código 201 para indicar creación exitosa
  } catch (error) {
    console.error('[PRODUCTO_POST]', error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
}

// GET: Obtener productos con filtros dinámicos y relaciones
export async function GET(req: Request) {
  try {
    // Parsear los parámetros de consulta desde la URL
    const url = new URL(req.url);
    const tipid = url.searchParams.get('tipid');
    const proid = url.searchParams.get('proid');
    const minPrice = url.searchParams.get('minPrice');
    const maxPrice = url.searchParams.get('maxPrice');

    // Construir el filtro dinámico basado en los parámetros de consulta
    const where: any = {};
    if (tipid) where.tipid = Number(tipid);
    if (proid) where.proid = Number(proid);

    // Agregar filtros de rango de precio
    if (minPrice || maxPrice) {
      where.prdprecio = {};
      if (minPrice) where.prdprecio.gte = Number(minPrice); // Precio mayor o igual
      if (maxPrice) where.prdprecio.lte = Number(maxPrice); // Precio menor o igual
    }

    // Consultar productos con filtros e incluir relaciones
    const productos = await prismadb.producto.findMany({
      where,
      include: {
        tipo: true, // Relación con Tipo
        productor: true, // Relación con Productor
      },
    });

    return NextResponse.json(productos, { status: 200 }); // Respuesta con código 200
  } catch (error) {
    console.error('[PRODUCTO_GET]', error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
}
