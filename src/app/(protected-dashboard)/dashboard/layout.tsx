import { Navbar } from "@/components/sections/Navbar";

export default function LayoutDashboard({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex-center w-full h-full">
      <Navbar />
      <main className="flex-1">{children}</main>
    </section>
  );
}
