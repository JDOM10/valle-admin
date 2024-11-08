import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";


export async function GET(
  req: Request,
  { params }: { params: { tipoId: number } }
) {
  try {
    if (!params.tipoId) {
      return new NextResponse("Id de tipo es requerido", { status: 400 });
    }

    const tipoId = Number(params.tipoId);

    const tipo = await prismadb.tipo.findUnique({
      where: {
        tipid: tipoId
      },
    });
  
    return NextResponse.json(tipo);
  } catch (error) {
    console.log('[TIPO_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function PATCH(
  req: Request,
  { params }: { params: { tipoId: number} }
) {
  try {   

    const body = await req.json();
    
    const { tipnombre } = body;
    
    if (!tipnombre) {
      return new NextResponse("Nombre de tipo es requerido", { status: 400 });
    }

    if (!params.tipoId) {
      return new NextResponse("Id de Tipo es requerido", { status: 400 });
    }

    const tipoId = Number(params.tipoId);

    const tipo = await prismadb.tipo.update({
      where: {
        tipid: tipoId
      },
      data: {
        tipnombre,
      },
    });
  
    return NextResponse.json(tipo);
  } catch (error) {
    console.log('[TIPO_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { tipoId: number} }
) {
  try {

    if (!params.tipoId) {
      return new NextResponse("Id de tipo es requerido", { status: 400 });
    }

    const tipoId = Number(params.tipoId);

    const tipo = await prismadb.tipo.delete({
      where: {
        tipid: tipoId,
      }
    });
  
    return NextResponse.json(tipo);
  } catch (error) {
    console.log('[TIPO_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


