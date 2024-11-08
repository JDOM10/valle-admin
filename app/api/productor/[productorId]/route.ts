import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { productorId: number } }
) {
  try {
    if (!params.productorId) {
      return new NextResponse("Id de productor es requerido", { status: 400 });
    }

    const productorId = Number(params.productorId);

    const productor = await prismadb.productor.findUnique({
      where: {
        proid: productorId
      },
    });
  
    return NextResponse.json(productor);
  } catch (error) {
    console.log('[PRODUCTOR_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function PATCH(
  req: Request,
  { params }: { params: { productorId: number} }
) {
  try {   

    const body = await req.json();
    
    const { pronombre, prodescripcion, profoto } = body;
    
    if (!pronombre) {
      return new NextResponse("Nombre de productor es requerido", { status: 400 });
    }

    if (!params.productorId) {
      return new NextResponse("Id de Productor es requerido", { status: 400 });
    }

    const productorId = Number(params.productorId);

    const productor = await prismadb.productor.update({
      where: {
        proid: productorId
      },
      data: {
        pronombre,
        prodescripcion,
        profoto
      },
    });
  
    return NextResponse.json(productor);
  } catch (error) {
    console.log('[PRODUCTOR_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { productorId: number} }
) {
  try {

    if (!params.productorId) {
      return new NextResponse("Id de productor es requerido", { status: 400 });
    }

    const productorId = Number(params.productorId);

    const productor = await prismadb.productor.delete({
      where: {
        proid: productorId,
      }
    });
  
    return NextResponse.json(productor);
  } catch (error) {
    console.log('[PRODUCTOR_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


