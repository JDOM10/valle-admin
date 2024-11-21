"use client";

import Navbar from "@/components/navbar";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const { userId, isLoaded } = useAuth(); // Obtiene el ID del usuario y el estado de carga
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/sign-in"); // Redirige si no hay usuario autenticado
    }
  }, [userId, isLoaded, router]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Cargando...</p> {/* Muestra un mensaje de carga */}
      </div>
    );
  }

  if (!userId) {
    return null; // Evita renderizar si no hay usuario mientras se redirige
  }

  return (
    <div className="p-4">
      <Navbar />
      {children}
    </div>
  );
}
