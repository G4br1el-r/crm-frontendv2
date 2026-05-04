import { Navbar } from "@/components/sections/Navbar";

export default function LayoutDashboard({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex w-full min-h-dvh">
      <Navbar />
      <main className="flex-1 min-h-dvh">{children}</main>
    </section>
  );
}
