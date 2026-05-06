"use client";

import { LayoutGroup } from "framer-motion";
import { ImageComponent } from "@/components/ui/Image";
import { NavItems } from "./components/renderNav";
import { MobileNav } from "./components/MobileNav";

export function Navbar() {
  return (
    <>
      <MobileNav />

      <nav className="sm:w-13 extraxl:hover:w-50 extraxl:w-13 overflow-hidden py-4 h-dvh items-center justify-between group transition-all duration-200 fixed bg-background-main/50 extraxl:backdrop-blur-md backdrop-blur-lg left-0 top-0 z-11 flex-col hidden xl:flex">
        <div className="w-full h-full gap-10 flex flex-col">
          <div>
            <ImageComponent
              src="/login/editora-santuario.ico"
              alt="Editora Santuario"
              classNameWrapper="w-10 h-10 mx-auto"
            />
          </div>
          <LayoutGroup id="desktop-nav">
            <NavItems />
          </LayoutGroup>
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
