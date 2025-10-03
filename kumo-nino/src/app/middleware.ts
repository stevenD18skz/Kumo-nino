import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rutas protegidas por rol
const protectedRoutes: Record<string, string[]> = {
  client: ["/client", "/dashboard"],
  internal: ["/internal", "/dashboard"],
  admin: ["/admin", "/internal", "/dashboard"],
};

// Función auxiliar para saber si la URL está dentro de un rol
function isRouteAllowed(pathname: string, role: string) {
  const routes = protectedRoutes[role] || [];
  return routes.some((route) => pathname.startsWith(route));
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Rutas públicas que no necesitan auth
  const publicPaths = ["/login", "/signup", "/"];
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Obtener token o cookie (simulación: aquí lo ideal es JWT en cookies)
  const token = req.cookies.get("token")?.value;

  if (!token) {
    // No autenticado → enviar al login
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Decodificar role (mock: en prod decodifica JWT o session)
  // Simulación: guardamos role en cookie
  const role = req.cookies.get("role")?.value || "client";

  // Verificar si el rol puede acceder
  if (!isRouteAllowed(pathname, role)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

// Configurar en qué rutas corre el middleware
export const config = {
  matcher: [
    "/((?!_next|api|static|.*\\..*).*)", // aplica a todas menos assets/api
  ],
};
