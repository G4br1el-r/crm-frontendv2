/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import { PackageSearch } from "lucide-react";

interface StateOrders {
  id: string;
  name: string;
  orders: number;
}

const DATA: StateOrders[] = [
  { id: "SP", name: "São Paulo", orders: 1240 },
  { id: "RJ", name: "Rio de Janeiro", orders: 890 },
  { id: "MG", name: "Minas Gerais", orders: 720 },
  { id: "RS", name: "Rio Grande do Sul", orders: 540 },
  { id: "PR", name: "Paraná", orders: 480 },
  { id: "BA", name: "Bahia", orders: 320 },
  { id: "SC", name: "Santa Catarina", orders: 290 },
  { id: "PE", name: "Pernambuco", orders: 210 },
  { id: "CE", name: "Ceará", orders: 180 },
  { id: "GO", name: "Goiás", orders: 140 },
  { id: "DF", name: "Distrito Federal", orders: 120 },
  { id: "ES", name: "Espírito Santo", orders: 98 },
  { id: "PA", name: "Pará", orders: 87 },
  { id: "MT", name: "Mato Grosso", orders: 76 },
  { id: "MS", name: "Mato Grosso do Sul", orders: 65 },
  { id: "MA", name: "Maranhão", orders: 58 },
  { id: "PB", name: "Paraíba", orders: 52 },
  { id: "RN", name: "Rio Grande do Norte", orders: 47 },
  { id: "AL", name: "Alagoas", orders: 41 },
  { id: "PI", name: "Piauí", orders: 38 },
  { id: "AM", name: "Amazonas", orders: 34 },
  { id: "SE", name: "Sergipe", orders: 29 },
  { id: "TO", name: "Tocantins", orders: 24 },
  { id: "RO", name: "Rondônia", orders: 19 },
  { id: "AC", name: "Acre", orders: 12 },
  { id: "AP", name: "Amapá", orders: 9 },
  { id: "RR", name: "Roraima", orders: 7 },
];

function StateOrderRow({ state }: { state: StateOrders }) {
  return (
    <div className="flex group items-center gap-4 py-3 cursor-pointer border-b border-white/5 last:border-b-0 hover:bg-white/2 transition-colors px-5 -mx-2">
      <span className="text-[11px] font-semibold text-blue-neon bg-blue-neon/10 border border-blue-neon/30 rounded px-1.5 py-0.5 shrink-0 w-9 text-center">
        {state.id}
      </span>
      <div className="flex flex-col flex-1 min-w-0">
        <span className="text-[13px] group-hover:text-white transition-colors duration-200 text-white/60 truncate">
          {state.name}
        </span>
      </div>
      <div className="flex flex-col items-end shrink-0">
        <span className="text-[13px] text-white/60 group-hover:text-white transition-colors duration-200 font-medium tabular-nums">
          {state.orders.toLocaleString("pt-BR")}
        </span>
        <span className="text-[10px] text-gray-light/80 tracking-widest uppercase">
          pedidos
        </span>
      </div>
    </div>
  );
}

export function TopStateOrders() {
  return (
    <div className="w-full h-[24.81rem] bg-blue-dark/50 backdrop-blur-xs rounded-[10px] pointer-events-auto flex flex-col gap-4">
      <div className="flex items-center gap-3 px-5 pt-5">
        <div className="bg-blue-neon/20 border border-blue-neon/50 w-fit h-fit p-1.5 rounded-lg shadow-[0_0_10px_rgba(0,50,158,0.2)]">
          <PackageSearch size={20} className="text-blue-neon" />
        </div>
        <span className="text-white font-medium text-lg tracking-wide">
          Pedidos por Estado
        </span>
      </div>
      <div className="flex-1 min-h-0 flex flex-col overflow-y-auto scrollbar-custom pr-2 justify-between">
        {DATA.map((state, i) => (
          <StateOrderRow key={i} state={state} />
        ))}
      </div>
    </div>
  );
}
