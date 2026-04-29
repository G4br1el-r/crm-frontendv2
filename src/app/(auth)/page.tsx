import { LoginBackground } from "@/components/sections/Login/LoginBackground";
import { LoginWrapper } from "@/components/sections/Login/LoginWrapper";

export default function SignIn() {
  return (
    <main className="min-h-dvh overflow-hidden relative w-full flex-col">
      <LoginBackground />
      <LoginWrapper />
    </main>
  );
}
