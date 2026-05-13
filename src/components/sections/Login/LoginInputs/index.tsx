"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { InputComponent } from "@/components/ui/InputComponent";

export function LoginInputs() {
  const [showPassword, setShowPassword] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);

  function handleTogglePassword() {
    const el = passwordRef.current;
    const pos = el?.selectionStart ?? 0;

    setShowPassword((prev) => !prev);

    requestAnimationFrame(() => {
      el?.focus();
      el?.setSelectionRange(pos, pos);
    });
  }

  return (
    <form className="w-full h-full flex-center-column gap-5">
      <InputComponent.root>
        <InputComponent.label
          htmlFor="user"
          label="Usuário"
          classNameLabel="text-white"
        />
        <InputComponent.wrapper
          iconName="user"
          classNameWrapper="bg-background-input focus-within:outline-none focus-within:border-focus-input focus-within:ring-1 focus-within:ring-focus-input"
          classNameIcon="text-white/50 group-focus-within:text-focus-input transition-all duration-300"
        >
          <InputComponent.inputBase
            id="user"
            placeHolder="Usuário"
            className="placeholder:text-white/50 text-white"
          />
        </InputComponent.wrapper>
      </InputComponent.root>

      <InputComponent.root>
        <InputComponent.label
          htmlFor="password"
          label="Senha"
          classNameLabel="text-white"
        />
        <InputComponent.wrapper
          iconName="password"
          isPassword
          showPassword={showPassword}
          onShowPassword={handleTogglePassword}
          classNameWrapper="bg-background-input focus-within:outline-none focus-within:border-focus-input focus-within:ring-1 focus-within:ring-focus-input"
          classNameIcon="text-white/50 group-focus-within:text-focus-input transition-all duration-300"
        >
          <InputComponent.password
            id="password"
            ref={passwordRef}
            placeHolder="************"
            showPassword={showPassword}
            className="placeholder:text-white/50 text-white"
          />
        </InputComponent.wrapper>
      </InputComponent.root>

      <Link
        type="submit"
        className="bg-primary-blue w-full h-10 rounded-[10px] text-white active:scale-95 cursor-pointer transition-all duration-300 hover:scale-105 focus:outline-none focus:scale-105 flex items-center justify-center"
        href="/dashboard"
      >
        Acessar portal
      </Link>
    </form>
  );
}
