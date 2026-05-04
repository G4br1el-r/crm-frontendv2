import { Navbar } from "@/components/sections/Navbar";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex w-full min-h-dvh">
      <Navbar />
      <main className="w-full min-h-dvh pl-15 py-3 pr-3">{children}</main>
    </section>
  );
}
