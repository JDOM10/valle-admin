import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

// Endpoint para manejar solicitudes GET
export async function GET() {
  try {
    console.log("GET request received at /api/tipo");
    const tipos = await prismadb.tipo.findMany();
    return NextResponse.json(tipos);
  } catch (error) {
    console.log('[TIPO_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// Endpoint para manejar solicitudes POST
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { tipnombre } = body;

    if (!tipnombre) {
      return new NextResponse("Nombre de tipo es requerido", { status: 400 });
    }

    const tipo = await prismadb.tipo.create({
      data: { tipnombre },
    });

    return NextResponse.json(tipo);
  } catch (error) {
    console.log('[TIPO_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}