import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';


export async function POST(
  req: Request,
) {
  try{
        const body = await req.json();

        const { pronombre, profoto, prodescripcion } = body;

        if (!pronombre) {
            return new NextResponse("Nombre de productor es requerido", { status: 400 });
        }


        const productor = await prismadb.productor.create({
        data: {
            pronombre,
            prodescripcion,
            profoto
        }
        });
    
        return NextResponse.json(productor);
    } catch (error) {
    console.log('[PRODUCTOR_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(
  req: Request,
) {
  try {

    const productor = await prismadb.productor.findMany({
    });
  
    return NextResponse.json(productor);
  } catch (error) {
    console.log('[PRODUCTOR_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
