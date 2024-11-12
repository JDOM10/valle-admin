"use client";

import { useState } from "react";
import { MainNav } from "./main-nav";
import { UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="border-b sticky top-0 bg-white shadow-md z-10">
      <div className="flex items-center justify-between h-16 px-4 md:px-8 lg:px-12">
        {/* Logo o Menú de navegación alineado a la izquierda */}
        <div className="flex items-center">
          <UserButton />
          <div className="ml-4 hidden md:flex">
            <MainNav />
          </div>
        </div>

        {/* Menú hamburguesa en pantallas móviles */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 dark:text-gray-300 focus:outline-none"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menú desplegable en móvil */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg p-4">
          <MainNav className="flex flex-col space-y-4" />
        </div>
      )}
      <div className="h-1"></div>
    </div>
  );
};

export default Navbar;
