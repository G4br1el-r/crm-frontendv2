import { Navbar } from "@/components/sections/Navbar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex w-full min-h-dvh">
      <Navbar />
      <main className="w-full min-h-dvh lg:pl-15 lg:py-3 lg:pr-3">
        {children}
      </main>
    </section>
  );
}
