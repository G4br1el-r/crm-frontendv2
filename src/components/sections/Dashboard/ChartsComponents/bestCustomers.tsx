/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import { Medal, Trophy } from "lucide-react";
import { formatBRL } from "@/lib/utils/format-currency";
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
  { name: "Paróquia de Santo Afonso Maria de Ligório", orders: 1, code: "C084154", value: 20218.57, tier: "gold" },
  { name: "Paróquia São Luiz Gonzaga", orders: 1, code: "C023081", value: 7402.65, tier: "silver" },
  { name: "Paróquia de São Judas Tadeu", orders: 2, code: "C107971", value: 728.47, tier: "bronze" },
  { name: "Comunidade Vocacional Dom Muniz", orders: 1, code: "C068968", value: 298.5, tier: null },
  { name: "Centro de Educação Infantil Nossa Senhora Aparecida", orders: 1, code: "C141865", value: 199.2, tier: null },
];

const TIER_STYLES: Record<NonNullable<Tier>, { ring: string; text: string; bg: string; label: string }> = {
  gold: { ring: "border-amber-400", text: "text-amber-400", bg: "bg-amber-400/10", label: "OURO" },
  silver: { ring: "border-zinc-300", text: "text-zinc-300", bg: "bg-zinc-300/10", label: "PRATA" },
  bronze: { ring: "border-orange-600", text: "text-orange-600", bg: "bg-orange-600/10", label: "BRONZE" },
};

function RankBadge({ index, tier }: { index: number; tier: Tier }) {
  if (tier) {
    const styles = TIER_STYLES[tier];
    return (
      <div className={cn("flex-center w-7 h-7 rounded-full border-2 shrink-0", styles.ring, styles.bg)}>
        <Medal size={14} className={styles.text} />
      </div>
    );
  }

  return (
    <div className="flex-center w-7 h-7 rounded-full border border-white/20 bg-white/5 shrink-0">
      <span className="text-[11px] font-semibold text-white/60">{index + 1}</span>
    </div>
  );
}

function TierLabel({ tier }: { tier: Tier }) {
  if (!tier) return null;
  const styles = TIER_STYLES[tier];
  return <span className={cn("text-[10px] font-semibold tracking-widest uppercase", styles.text)}>{styles.label}</span>;
}

function CustomerRow({ customer, index }: { customer: Customer; index: number }) {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-b-0">
      <RankBadge index={index} tier={customer.tier} />
      <div className="flex flex-col flex-1 min-w-0">
        <span className="text-[13px] text-white truncate">{customer.name}</span>
        <span className="text-[11px] text-gray-light/80">
          {customer.orders} {customer.orders === 1 ? "PEDIDO" : "PEDIDOS"} · {customer.code}
        </span>
      </div>
      <div className="flex flex-col items-end shrink-0">
        <span className="text-[13px] text-white font-medium">{formatBRL(customer.value)}</span>
        <TierLabel tier={customer.tier} />
      </div>
    </div>
  );
}

export function BestCustomers() {
  return (
    <div className="w-full h-full bg-blue-dark/50 backdrop-blur-xs rounded-[10px] py-2.5 px-5 pointer-events-auto flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="bg-blue-neon/20 border border-blue-neon w-fit h-fit p-1 rounded-[5px]">
          <Trophy className="text-blue-neon p-1" />
        </div>
        <span className="text-white">Melhores Clientes</span>
      </div>
      <div className="flex-1 min-h-0 flex flex-col overflow-y-auto pr-1 justify-between">
        {CUSTOMERS.map((customer, i) => (
          <CustomerRow key={i} customer={customer} index={i} />
        ))}
      </div>
    </div>
  );
}
