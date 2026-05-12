/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import { CircleDollarSign } from "lucide-react";
import { formatBRL } from "@/lib/utils/format-currency";

interface StateTicket {
  id: string;
  name: string;
  ticket: number;
}

const DATA: StateTicket[] = [
  { id: "DF", name: "Distrito Federal", ticket: 487.5 },
  { id: "SP", name: "São Paulo", ticket: 412.3 },
  { id: "RJ", name: "Rio de Janeiro", ticket: 389.1 },
  { id: "SC", name: "Santa Catarina", ticket: 361.8 },
  { id: "PR", name: "Paraná", ticket: 334.2 },
  { id: "MG", name: "Minas Gerais", ticket: 298.7 },
  { id: "RS", name: "Rio Grande do Sul", ticket: 274.4 },
  { id: "GO", name: "Goiás", ticket: 241.9 },
  { id: "ES", name: "Espírito Santo", ticket: 218.3 },
  { id: "BA", name: "Bahia", ticket: 196.6 },
  { id: "PE", name: "Pernambuco", ticket: 178.4 },
  { id: "CE", name: "Ceará", ticket: 162.9 },
  { id: "MT", name: "Mato Grosso", ticket: 154.2 },
  { id: "MS", name: "Mato Grosso do Sul", ticket: 143.7 },
  { id: "AM", name: "Amazonas", ticket: 134.5 },
  { id: "PA", name: "Pará", ticket: 122.8 },
  { id: "MA", name: "Maranhão", ticket: 114.3 },
  { id: "RN", name: "Rio Grande do Norte", ticket: 108.6 },
  { id: "PB", name: "Paraíba", ticket: 98.2 },
  { id: "AL", name: "Alagoas", ticket: 91.4 },
  { id: "PI", name: "Piauí", ticket: 84.7 },
  { id: "SE", name: "Sergipe", ticket: 78.3 },
  { id: "TO", name: "Tocantins", ticket: 69.5 },
  { id: "RO", name: "Rondônia", ticket: 61.2 },
  { id: "AC", name: "Acre", ticket: 52.8 },
  { id: "AP", name: "Amapá", ticket: 44.1 },
  { id: "RR", name: "Roraima", ticket: 38.6 },
];

function Rank({ index }: { index: number }) {
  return (
    <span className="flex-center w-5 h-5 rounded-full bg-blue-neon/20 border border-blue-neon text-[10px] font-semibold text-blue-neon shrink-0">
      {index + 1}
    </span>
  );
}

function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
      <div
        className="h-full bg-linear-to-r from-blue-neon to-secondary-blue rounded-full"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

function StateTicketRow({
  state,
  index,
  maxTicket,
}: {
  state: StateTicket;
  index: number;
  maxTicket: number;
}) {
  const percent = (state.ticket / maxTicket) * 100;

  return (
    <div className="flex items-center px-5 group gap-4 py-3 border-b border-white/5 last:border-b-0 hover:bg-white/2 transition-colors cursor-pointer -mx-2">
      <Rank index={index} />
      <div className="flex flex-col flex-1 min-w-0 gap-1.5">
        <span className="text-[12px] text-white/60 group-hover:text-white transition-colors duration-200 truncate uppercase">
          {state.name}
        </span>
        <ProgressBar percent={percent} />
      </div>
      <div className="flex flex-col items-end shrink-0">
        <span className="text-[13px] text-white/60 group-hover:text-white transition-colors duration-200 font-medium tabular-nums">
          {formatBRL(state.ticket)}
        </span>
        <span className="text-[10px] text-gray-light/80 tracking-widest uppercase">
          ticket médio
        </span>
      </div>
    </div>
  );
}

export function TopStateTicket() {
  const maxTicket = Math.max(...DATA.map((d) => d.ticket));

  return (
    <div className="w-full h-[24.81rem] bg-blue-dark/50 backdrop-blur-xs rounded-[10px] pointer-events-auto flex flex-col gap-4">
      <div className="flex items-center gap-3 px-5 pt-5">
        <div className="bg-blue-neon/20 border border-blue-neon/50 w-fit h-fit p-1.5 rounded-lg shadow-[0_0_10px_rgba(0,50,158,0.2)]">
          <CircleDollarSign size={20} className="text-blue-neon" />
        </div>
        <span className="text-white font-medium text-lg tracking-wide">
          Ticket Médio por Estado
        </span>
      </div>
      <div className="flex-1 min-h-0 flex flex-col scrollbar-custom overflow-y-auto pr-2 gap-1">
        {DATA.map((state, i) => (
          <StateTicketRow
            key={i}
            state={state}
            index={i}
            maxTicket={maxTicket}
          />
        ))}
      </div>
    </div>
  );
}
