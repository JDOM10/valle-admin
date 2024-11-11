"use client";

import { useEffect, useState } from "react";
import { MainNav } from "./main-nav";
import { UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react"; // Importamos iconos de menú hamburguesa y de cierre

const Navbar = () => {
  const [isMenuFixed, setIsMenuFixed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsMenuFixed(window.scrollY > 1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`border-b ${
        isMenuFixed ? "fixed top-0 left-0 right-0 bg-white shadow-md z-10" : ""
      }`}
    >
      <div className="flex items-center justify-between h-16 px-4 md:px-8 lg:px-12">
        {/* Logo o botón de usuario */}
        <div className="flex items-center">
          <UserButton />
        </div>

        {/* Menú de navegación y botón de hamburguesa */}
        <div className="flex items-center">
          <div className="hidden md:flex">
            {/* Menú normal en pantallas medianas y grandes */}
            <MainNav className="ml-4" />
          </div>
          <div className="md:hidden">
            {/* Menú hamburguesa para móviles */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 dark:text-gray-300 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú desplegable en móvil */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg p-4">
          <MainNav className="flex flex-col space-y-4" />
        </div>
      )}
      <div className={`h-1 ${isMenuFixed ? "mt-0 mb-0" : "mt-0 mb-0"}`}></div>
    </div>
  );
};

export default Navbar;
