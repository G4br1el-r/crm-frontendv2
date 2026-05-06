"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { iconMap } from "@/lib/utils/iconsMap";
import { cn } from "@/lib/utils/twMerge";
import { ActivePageAnimation } from "./activePageAnimation";

const NAV_ITEMS = {
  dashboard: { icon: iconMap.charts, link: "/dashboard", label: "Dashboard" },
  customer: { icon: iconMap.user, link: "/customer", label: "Clientes" },
  sales: { icon: iconMap.bag, link: "/sales", label: "Vendas" },
  support: { icon: iconMap.headset, link: "/support", label: "SAC" },
};

export function NavItems() {
  const activePage = usePathname();

  return (
    <ul className="flex flex-col w-full">
      {Object.entries(NAV_ITEMS).map(([key, item]) => (
        <Link href={item.link} key={key} aria-label={key}>
          <li className="flex-center justify-start gap-5 text-white cursor-pointer hover:scale-105 transition-all duration-300 h-13 relative p-4">
            <item.icon
              className={cn("w-5 h-5 shrink-0 text-gray-light/50", activePage === item.link && "text-blue-neon")}
              aria-hidden="true"
            />
            <span>{item.label}</span>
            {activePage === item.link && <ActivePageAnimation />}
          </li>
        </Link>
      ))}
    </ul>
  );
}
