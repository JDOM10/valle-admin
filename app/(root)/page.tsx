"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";

const SetupPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/tipo"); // Redirige automáticamente a "Tipo de Producto"
  }, []);

  return (
    <div className="p-4">
      <Navbar />
    </div>
  );
};

export default SetupPage;
