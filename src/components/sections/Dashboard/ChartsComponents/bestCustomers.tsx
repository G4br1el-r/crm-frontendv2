/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import { Medal, Trophy } from "lucide-react";
import { formatBRL } from "@/lib/utils/formatCurrency";
import { cn } from "@/lib/utils/twMerge";

type Tier = "gold" | "silver" | "bronze" | null;

interface Customer {
  name: string;
  orders: number;
  code: string;
  value: number;
  tier: Tier;
}

const CUSTOMERS: Customer[] = [
  {
    name: "Paróquia de Santo Afonso Maria de Ligório",
    orders: 1,
    code: "C084154",
    value: 20218.57,
    tier: "gold",
  },
  {
    name: "Paróquia São Luiz Gonzaga",
    orders: 1,
    code: "C023081",
    value: 7402.65,
    tier: "silver",
  },
  {
    name: "Paróquia de São Judas Tadeu",
    orders: 2,
    code: "C107971",
    value: 728.47,
    tier: "bronze",
  },
  {
    name: "Comunidade Vocacional Dom Muniz",
    orders: 1,
    code: "C068968",
    value: 298.5,
    tier: null,
  },
  {
    name: "Centro de Educação Infantil Nossa Senhora Aparecida",
    orders: 1,
    code: "C141865",
    value: 199.2,
    tier: null,
  },
];

const TIER_STYLES: Record<
  NonNullable<Tier>,
  { ring: string; text: string; bg: string; label: string }
> = {
  gold: {
    ring: "border-amber-400",
    text: "text-amber-400",
    bg: "bg-amber-400/10",
    label: "OURO",
  },
  silver: {
    ring: "border-zinc-300",
    text: "text-zinc-300",
    bg: "bg-zinc-300/10",
    label: "PRATA",
  },
  bronze: {
    ring: "border-orange-600",
    text: "text-orange-600",
    bg: "bg-orange-600/10",
    label: "BRONZE",
  },
};

function RankBadge({ index, tier }: { index: number; tier: Tier }) {
  if (tier) {
    const styles = TIER_STYLES[tier];
    return (
      <div
        className={cn(
          "flex-center w-7 h-7 rounded-full border-2 shrink-0",
          styles.ring,
          styles.bg,
        )}
      >
        <Medal size={14} className={styles.text} />
      </div>
    );
  }

  return (
    <div className="flex-center w-7 h-7 rounded-full border border-white/20 bg-white/5 shrink-0">
      <span className="text-[11px] font-semibold text-white/60">
        {index + 1}
      </span>
    </div>
  );
}

function TierLabel({ tier }: { tier: Tier }) {
  if (!tier) return null;
  const styles = TIER_STYLES[tier];
  return (
    <span
      className={cn(
        "text-[10px] font-semibold tracking-widest uppercase",
        styles.text,
      )}
    >
      {styles.label}
    </span>
  );
}

function CustomerRow({
  customer,
  index,
}: {
  customer: Customer;
  index: number;
}) {
  return (
    <div className="flex items-center group gap-4 px-5 border-b border-white/5 last:border-b-0 hover:bg-white/2 transition-colors py-3 cursor-pointer -mx-2">
      <RankBadge index={index} tier={customer.tier} />
      <div className="flex flex-col flex-1 min-w-0">
        <span className="text-[13px] text-white/60 group-hover:text-white transition-colors duration-200 truncate">
          {customer.name}
        </span>
        <span className="text-[11px] text-gray-light/80">
          {customer.orders} {customer.orders === 1 ? "PEDIDO" : "PEDIDOS"} ·{" "}
          {customer.code}
        </span>
      </div>
      <div className="flex flex-col items-end shrink-0">
        <span className="text-[13px] text-white/60 group-hover:text-white transition-colors duration-200 font-medium">
          {formatBRL(customer.value)}
        </span>
        <TierLabel tier={customer.tier} />
      </div>
    </div>
  );
}

export function BestCustomers() {
  return (
    <div className="w-full h-full bg-blue-dark/50 backdrop-blur-xs rounded-[10px] pointer-events-auto flex flex-col gap-4">
      <div className="flex items-center gap-3 px-5 pt-5">
        <div className="bg-blue-neon/20 border border-blue-neon/50 w-fit h-fit p-1.5 rounded-lg shadow-[0_0_10px_rgba(0,50,158,0.2)]">
          <Trophy size={20} className="text-blue-neon" />
        </div>
        <span className="text-white font-medium text-lg tracking-wide">
          Melhores Clientes
        </span>
      </div>
      <div className="flex-1 min-h-0 flex flex-col overflow-y-auto pr-2 gap-1 justify-between">
        {CUSTOMERS.map((customer, i) => (
          <CustomerRow key={i} customer={customer} index={i} />
        ))}
      </div>
    </div>
  );
}
