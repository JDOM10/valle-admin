"use client";

import Link from "next/link"
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  const routes = [
    {
      href: `/tipo`,
      label: 'Tipo de Producto',
      active: pathname === `/tipo`,
    },
    {
      href: `/producto`,
      label: 'Productos',
      active: pathname === `/producto`,
    },
    {
      href: `/productor`,
      label: 'Productores',
      active: pathname === `/productor`,
    },
    {
      href: `/pedido`,
      label: 'Pedidos',
      active: pathname === `/pedido`,
    },
    {
      href: `/cliente`,
      label: 'Clientes',
      active: pathname === `/cliente`,
    },
  ]

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
          )}
        >
          {route.label}
      </Link>
      ))}
    </nav>
  )
};
