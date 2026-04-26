import { ImageComponent } from "@/components/ui/Image";
import { LoginInputs } from "../LoginInputs";
import { FadeAnimation } from "@/components/ui/Motion/FadeAnimation";

export function LoginWrapper() {
  return (
    <div className="w-full h-full p-5 absolute bg-background-main/50 flex-center z-10 bottom-0 backdrop-blur-md extra-xl:backdrop-blur-none extra-xl:justify-end extra-xl:pr-10 2xl:pr-15">
      <FadeAnimation
        className="w-full px-5 pb-20 pt-0 flex-center-column gap-7 rounded-md max-w-xl"
        fadeDirection="up"
        fadeValue={100}
        transitionDuration={0.8}
      >
        <ImageComponent
          src="/login/editora-santuario.ico"
          alt="Editora Santuario"
          classNameWrapper="h-15 w-15 mx-auto opacity-30"
          priority
        />
        <div className="flex-center-column gap-5">
          <h1 className="text-[clamp(1.5rem,4vw,2.5rem)] text-center font-bold font-playfair text-white">
            Bem-vindo de Volta
          </h1>
          <h2 className="font-playfair text-[clamp(0.875rem,0.9vw,2.5rem)] text-white/50 text-center">
            Portal do time comercial · Gestão de vendas e catálogo
          </h2>
          <LoginInputs />
        </div>
      </FadeAnimation>
    </div>
  );
}
