"use client";

import Navbar from "@/components/navbar";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/sign-in");
    }
  }, [userId, isLoaded, router]);

  if (!isLoaded) {
    return <div>Loading...</div>; // Muestra un cargador hasta que la autenticación esté cargada
  }

  return (
    <div className="p-4">
      <Navbar />
      {children}
    </div>
  );
}
