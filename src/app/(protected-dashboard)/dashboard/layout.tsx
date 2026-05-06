import { Navbar } from "@/components/sections/Navbar";

export default function LayoutDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex w-full min-h-dvh">
      <Navbar />
      <main className="w-full min-h-dvh overflow-auto">{children}</main>
    </section>
  );
}
