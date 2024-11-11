"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  const routes = [
    {
      href: `/tipo`,
      label: "Tipo de Producto",
      active: pathname === `/tipo`,
    },
    {
      href: `/producto`,
      label: "Productos",
      active: pathname === `/producto`,
    },
    {
      href: `/productor`,
      label: "Productores",
      active: pathname === `/productor`,
    },
    {
      href: `/pedido`,
      label: "Pedidos",
      active: pathname === `/pedido`,
    },
    {
      href: `/cliente`,
      label: "Clientes",
      active: pathname === `/cliente`,
    },
  ];

  return (
    <nav
      className={cn(
        "flex items-center space-x-4 lg:space-x-6",
        "text-gray-700 dark:text-gray-300", // Color por defecto
        className
      )}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-blue-500",
            route.active
              ? "text-blue-600 dark:text-blue-400 font-semibold" // Color activo
              : "text-gray-500"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
