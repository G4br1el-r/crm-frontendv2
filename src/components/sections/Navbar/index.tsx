import { ImageComponent } from "@/components/ui/Image";
import { NavItems } from "./components/renderNav";

export function Navbar() {
  return (
    <nav className="w-13 hover:w-40 overflow-hidden py-4 flex h-screen items-center justify-between group transition-all duration-300 absolute bg-background-main/50 backdrop-blur-md left-0 top-0 z-11">
      <div className="w-full h-full gap-10 flex flex-col">
        <ImageComponent
          src="/login/editora-santuario.ico"
          alt="Editora Santuario"
          classNameWrapper="w-10 h-10 mx-auto"
        />
        <NavItems />
      </div>
    </nav>
  );
}
