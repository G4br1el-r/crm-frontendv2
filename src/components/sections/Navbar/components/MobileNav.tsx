"use client";

import { LayoutGroup } from "framer-motion";
import { MenuIcon, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils/twMerge";
import { NavItems } from "./renderNav";
import { ImageComponent } from "@/components/shared/Image";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-full fixed z-11 h-15 bg-background-content/90 backdrop-blur-sm border-b border-white/10 flex-center xl:hidden">
        <button
          className="absolute left-4 text-white"
          type="button"
          aria-label="Abrir menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(true)}
        >
          <MenuIcon />
        </button>
        <ImageComponent
          src="/login/editora-santuario.ico"
          alt="Editora Santuario"
          classNameWrapper="w-10 h-10"
        />
      </div>

      <div
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-10 bg-black/50 transition-opacity duration-300 xl:hidden",
          open ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={() => setOpen(false)}
      />

      <nav
        id="mobile-nav"
        className={cn(
          "fixed left-0 top-0 z-20 h-dvh w-full flex flex-col py-4 items-center justify-between",
          "bg-background-content/90 border-r border-white/10 backdrop-blur-lg transition-transform duration-300 ease-in-out xl:hidden",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="w-full h-full gap-10 flex flex-col">
          <div className="relative">
            <ImageComponent
              src="/login/editora-santuario.ico"
              alt="Editora Santuario"
              classNameWrapper="w-10 h-10 mx-auto"
            />
            <button
              type="button"
              aria-label="Fechar menu"
              className="text-white/90 p-1 absolute top-1 right-3"
              onClick={() => setOpen(false)}
            >
              <X />
            </button>
          </div>
          <LayoutGroup id="mobile-nav">
            <NavItems />
          </LayoutGroup>
        </div>
        <div className="flex-center justify-start text-white cursor-pointer h-13 relative w-full ml-4 gap-4">
          <div className="w-11 h-11 shrink-0">
            <ImageComponent
              src="/profile.webp"
              alt="profile"
              classNameWrapper="p-3 flex-center"
              classNameImg="rounded-full border-2 border-blue-neon"
            />
          </div>
          <div className="shrink-0 flex flex-col">
            <span className="text-white/60">Bem-vindo,</span>
            <span>Gabriel Rodrigues</span>
          </div>
        </div>
      </nav>
    </>
  );
}
