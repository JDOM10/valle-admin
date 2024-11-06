"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MainNav } from "./main-nav";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  const [isMenuFixed, setIsMenuFixed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsMenuFixed(scrollY > 1);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`border-b ${isMenuFixed ? 'fixed top-0 left-0 right-0 bg-white z-10' : ''}`}>
      <div className="flex h-16 items-center px-4">
        <MainNav className="mx-6" />
        <Button className="ml-6" onClick={() => {router.push("/sign-out");}}>
          <LogOut className="logouticon" />
        </Button>
      </div>
      <div className={`h-1 ${isMenuFixed ? 'mt-0 mb-0' : 'mt-0 mb-0'}`}></div>
    </div>
  );
};

export default Navbar;

