"use client";

import { ImageComponent } from "@/components/ui/Image";
import { NavItems } from "./components/renderNav";
import { MenuIcon, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils/twMerge";

export function Navbar() {
  const [openNavbar, setOpenNavbar] = useState(false);

  return (
    <>
      <div className="w-full fixed z-11 h-15 bg-background-main/80 backdrop-blur-sm border-b border-blue-neon flex-center md:hidden">
        <button className="absolute left-4 text-white" type="button" onClick={() => setOpenNavbar(!openNavbar)}>
          <MenuIcon />
        </button>
        <ImageComponent src="/login/editora-santuario.ico" alt="Editora Santuario" classNameWrapper="w-10 h-10" />
      </div>
      <nav
        className={cn(
          "sm:w-13 extraxl:hover:w-50 extraxl:w-13 w-0 overflow-hidden py-4 flex h-dvh items-center justify-between group transition-all duration-200 fixed bg-background-main/50 extraxl:backdrop-blur-md backdrop-blur-lg left-0 top-0 z-11 flex-col",
          openNavbar && "w-full",
        )}
      >
        <div className="w-full h-full gap-10 flex flex-col">
          <div>
            <ImageComponent
              src="/login/editora-santuario.ico"
              alt="Editora Santuario"
              classNameWrapper="w-10 h-10 mx-auto"
            />
            <button
              type="button"
              className="text-white/90 sm:hidden absolute top-3 right-3"
              onClick={() => setOpenNavbar(!openNavbar)}
            >
              <X />
            </button>
          </div>
          <NavItems />
        </div>
        <div className="flex-center justify-start text-white cursor-pointer h-13 relative w-full ml-4 gap-2">
          <div className="w-11 h-11 shrink-0">
            <ImageComponent
              src="/profile.webp"
              alt="profile"
              classNameWrapper="p-3 flex-center"
              classNameImg="rounded-full border-2 border-blue-neon"
            />
          </div>
          <div className="shrink-0 flex flex-col">
            <span>Bem-vindo,</span>
            <span>Gabriel Rodrigues</span>
          </div>
        </div>
      </nav>
    </>
  );
}
