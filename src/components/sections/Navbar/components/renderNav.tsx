"use client";

import { iconMap } from "@/lib/utils/iconsMap";
import { cn } from "@/lib/utils/twMerge";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ActivePageAnimation } from "./activePageAnimation";

const NAV_ITEMS = {
  dashboard: { icon: iconMap.charts, link: "/dashboard" },
  customer: { icon: iconMap.user, link: "/customer" },
  sales: { icon: iconMap.bag, link: "/sales" },
  support: { icon: iconMap.headset, link: "/support" },
};

export function NavItems() {
  const activePage = usePathname();

  return (
    <ul className="flex flex-col w-full">
      {Object.entries(NAV_ITEMS).map(([key, item]) => (
        <Link href={item.link} key={key} aria-label={key}>
          <li className="flex-center justify-start gap-5 text-white cursor-pointer hover:scale-105 transition-all duration-300 h-13 relative p-4">
            <item.icon
              className={cn("w-5 h-5 shrink-0 text-[#505050]", activePage === item.link && "text-blue-neon")}
              aria-hidden="true"
            />
            <span className="hidden group-hover:block">{key}</span>
            {activePage === item.link && <ActivePageAnimation />}
          </li>
        </Link>
      ))}
    </ul>
  );
}
