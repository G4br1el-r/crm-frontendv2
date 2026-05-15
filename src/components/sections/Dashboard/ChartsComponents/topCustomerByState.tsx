/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import { Medal, Trophy } from "lucide-react";
import { formatBRL } from "@/lib/utils/formatCurrency";
import { cn } from "@/lib/utils/twMerge";

type Tier = "gold" | "silver" | "bronze" | null;

interface StateTopCustomer {
  stateId: string;
  stateName: string;
  customer: string;
  value: number;
}

const DATA: StateTopCustomer[] = [
  {
    stateId: "SP",
    stateName: "São Paulo",
    customer: "Paróquia São Judas Tadeu",
    value: 20218.57,
  },
  {
    stateId: "RJ",
    stateName: "Rio de Janeiro",
    customer: "Comunidade Nossa Senhora",
    value: 15400.0,
  },
  {
    stateId: "MG",
    stateName: "Minas Gerais",
    customer: "Diocese de Belo Horizonte",
    value: 12800.0,
  },
  {
    stateId: "RS",
    stateName: "Rio Grande do Sul",
    customer: "Paróquia São Francisco",
    value: 9400.0,
  },
  {
    stateId: "PR",
    stateName: "Paraná",
    customer: "Santuário Nossa Senhora",
    value: 8700.0,
  },
  {
    stateId: "BA",
    stateName: "Bahia",
    customer: "Comunidade Shalom Bahia",
    value: 7200.0,
  },
  {
    stateId: "SC",
    stateName: "Santa Catarina",
    customer: "Paróquia São Luiz",
    value: 6800.0,
  },
  {
    stateId: "PE",
    stateName: "Pernambuco",
    customer: "Diocese de Recife",
    value: 5900.0,
  },
  {
    stateId: "CE",
    stateName: "Ceará",
    customer: "Paróquia Cristo Rei",
    value: 5100.0,
  },
  {
    stateId: "GO",
    stateName: "Goiás",
    customer: "Comunidade Canção Nova",
    value: 4800.0,
  },
  {
    stateId: "DF",
    stateName: "Distrito Federal",
    customer: "Paróquia São Pedro",
    value: 4400.0,
  },
  {
    stateId: "ES",
    stateName: "Espírito Santo",
    customer: "Diocese de Vitória",
    value: 3900.0,
  },
  {
    stateId: "PA",
    stateName: "Pará",
    customer: "Paróquia Santa Terezinha",
    value: 3400.0,
  },
  {
    stateId: "MT",
    stateName: "Mato Grosso",
    customer: "Comunidade São José",
    value: 2900.0,
  },
  {
    stateId: "MS",
    stateName: "Mato Grosso do Sul",
    customer: "Paróquia São Paulo",
    value: 2600.0,
  },
  {
    stateId: "MA",
    stateName: "Maranhão",
    customer: "Diocese de São Luís",
    value: 2200.0,
  },
  {
    stateId: "PB",
    stateName: "Paraíba",
    customer: "Paróquia São Francisco",
    value: 1900.0,
  },
  {
    stateId: "RN",
    stateName: "Rio Grande do Norte",
    customer: "Comunidade Magnificat",
    value: 1700.0,
  },
  {
    stateId: "AL",
    stateName: "Alagoas",
    customer: "Paróquia Nossa Senhora",
    value: 1500.0,
  },
  {
    stateId: "PI",
    stateName: "Piauí",
    customer: "Diocese de Teresina",
    value: 1300.0,
  },
  {
    stateId: "AM",
    stateName: "Amazonas",
    customer: "Paróquia São Sebastião",
    value: 1100.0,
  },
  {
    stateId: "SE",
    stateName: "Sergipe",
    customer: "Comunidade São Bento",
    value: 980.0,
  },
  {
    stateId: "TO",
    stateName: "Tocantins",
    customer: "Paróquia Santa Cruz",
    value: 820.0,
  },
  {
    stateId: "RO",
    stateName: "Rondônia",
    customer: "Diocese de Porto Velho",
    value: 640.0,
  },
  {
    stateId: "AC",
    stateName: "Acre",
    customer: "Paróquia São João",
    value: 480.0,
  },
  {
    stateId: "AP",
    stateName: "Amapá",
    customer: "Comunidade São Miguel",
    value: 320.0,
  },
  {
    stateId: "RR",
    stateName: "Roraima",
    customer: "Paróquia Cristo Redentor",
    value: 210.0,
  },
];

const TIER_STYLES: Record<
  NonNullable<Tier>,
  { ring: string; text: string; bg: string }
> = {
  gold: {
    ring: "border-amber-400",
    text: "text-amber-400",
    bg: "bg-amber-400/10",
  },
  silver: {
    ring: "border-zinc-300",
    text: "text-zinc-300",
    bg: "bg-zinc-300/10",
  },
  bronze: {
    ring: "border-orange-600",
    text: "text-orange-600",
    bg: "bg-orange-600/10",
  },
};

function getTier(index: number): Tier {
  if (index === 0) return "gold";
  if (index === 1) return "silver";
  if (index === 2) return "bronze";
  return null;
}

function RankBadge({ index }: { index: number }) {
  const tier = getTier(index);

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
    <div className="flex-center w-7 h-7 rounded-full border border-white/20 bg-white/5 shrink-0" />
  );
}

function StateTopCustomerRow({
  item,
  index,
}: {
  item: StateTopCustomer;
  index: number;
}) {
  const tier = getTier(index);
  const tierStyle = tier ? TIER_STYLES[tier] : null;

  return (
    <div className="flex items-center group gap-4 px-5 border-b border-white/5 last:border-b-0 hover:bg-white/2 transition-colors py-3 cursor-pointer -mx-2">
      <span
        className={cn(
          "text-[11px] font-semibold rounded px-1.5 py-0.5 shrink-0 w-9 text-center border",
          tierStyle
            ? cn(tierStyle.text, tierStyle.bg, tierStyle.ring)
            : "text-blue-neon bg-blue-neon/10 border-blue-neon/30",
        )}
      >
        {item.stateId}
      </span>
      <div className="flex flex-col flex-1 min-w-0">
        <span className="text-[13px] text-white/60 group-hover:text-white transition-colors duration-200 truncate">
          {item.customer}
        </span>
        <span className="text-[11px] text-gray-light/80">{item.stateName}</span>
      </div>
      <div className="flex flex-col items-end shrink-0">
        <span className="text-[13px] text-white/60 group-hover:text-white transition-colors duration-200 font-medium tabular-nums">
          {formatBRL(item.value)}
        </span>
      </div>
    </div>
  );
}

export function TopCustomerByState() {
  return (
    <div className="w-full h-[24.81rem] bg-blue-dark/50 backdrop-blur-xs rounded-[10px] pointer-events-auto flex flex-col gap-4">
      <div className="flex items-center gap-3 px-5 pt-5">
        <div className="bg-blue-neon/20 border border-blue-neon/50 w-fit h-fit p-1.5 rounded-lg shadow-[0_0_10px_rgba(0,50,158,0.2)]">
          <Trophy size={20} className="text-blue-neon" />
        </div>
        <span className="text-white font-medium text-lg tracking-wide">
          Maior Comprador por Estado
        </span>
      </div>
      <div className="flex-1 min-h-0 flex flex-col overflow-y-auto scrollbar-custom pr-2 gap-1">
        {DATA.map((item, i) => (
          <StateTopCustomerRow key={i} item={item} index={i} />
        ))}
      </div>
    </div>
  );
}
