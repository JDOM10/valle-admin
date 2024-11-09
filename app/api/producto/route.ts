import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';


export async function POST(
  req: Request,
) {
  try{
        const body = await req.json();

        const { prdnombre, prdprecio, prdcntnut, prdfoto, prddescripcion, tipid, proid } = body;

        if (!prdnombre) {
            return new NextResponse("Nombre de producto es requerido", { status: 400 });
        }


        const producto = await prismadb.producto.create({
        data: {
            prdnombre,
            prddescripcion,
            prdcntnut,
            prdprecio,
            prdfoto,
            tipid,
            proid
        }
        });
    
        return NextResponse.json(producto);
    } catch (error) {
    console.log('[TIPO_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(
  req: Request,
) {
  try {

    const producto = await prismadb.producto.findMany({
    });
  
    return NextResponse.json(producto);
  } catch (error) {
    console.log('[TIPO_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
