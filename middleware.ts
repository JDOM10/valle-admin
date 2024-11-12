import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse, NextRequest } from 'next/server';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/api/tipo', '/api/producto']);

export default clerkMiddleware(async (auth, request: NextRequest) => {
  // Agregar encabezados CORS
  const response = NextResponse.next();

  response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3001'); // Cambia al dominio de tu cliente
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Manejar solicitudes preflight (OPTIONS) para CORS
  if (request.method === 'OPTIONS') {
    return response;
  }

  // Lógica de autenticación con Clerk
  if (!isPublicRoute(request)) {
    await auth.protect();
  }

  return response;
});

export const config = {
  matcher: [
    // Aplica el middleware a todas las rutas bajo /api
    '/api/:path*',
    // Saltar archivos internos de Next.js y todos los archivos estáticos
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Siempre ejecutar para rutas de trpc (si también necesitas trpc)
    '/trpc/:path*',
  ],
};
