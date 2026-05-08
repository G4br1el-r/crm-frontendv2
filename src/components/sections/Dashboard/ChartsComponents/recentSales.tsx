/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import { History } from "lucide-react";
import { formatBRL } from "@/lib/utils/format-currency";
import { cn } from "@/lib/utils/twMerge";

type SaleStatus = "completed" | "cancelled";

interface Sale {
  customer: string;
  date: string;
  value: number;
  status: SaleStatus;
}

const SALES: Sale[] = [
  {
    customer: "Wender Dalber Lima",
    date: "16 de mar, 16:08",
    value: 99.6,
    status: "completed",
  },
  {
    customer: "Maria Valne Alves",
    date: "02 de mar, 17:42",
    value: 99.6,
    status: "completed",
  },
  {
    customer: "Paróquia de São Judas Tadeu",
    date: "02 de mar, 17:35",
    value: 378.47,
    status: "completed",
  },
  {
    customer: "Paróquia de São Judas Tadeu",
    date: "02 de mar, 17:29",
    value: 350.0,
    status: "cancelled",
  },
  {
    customer: "Marilete Auxiliadora Longatti",
    date: "02 de mar, 17:13",
    value: 135.9,
    status: "completed",
  },
];

const STATUS_LABELS: Record<SaleStatus, string> = {
  completed: "SENDOTRM",
  cancelled: "CANCELADO",
};

function StatusDot({ status }: { status: SaleStatus }) {
  return (
    <span
      className={cn(
        "h-2 w-2 rounded-full shrink-0",
        status === "completed"
          ? "bg-blue-neon shadow-[0_0_6px_#00329e]"
          : "bg-red-neon shadow-[0_0_6px_#ff0000]",
      )}
    />
  );
}

function StatusLabel({ status }: { status: SaleStatus }) {
  const isSuccess = status === "completed";
  return (
    <span
      className={cn(
        "text-[10px] font-semibold tracking-widest uppercase",
        isSuccess ? "text-blue-neon" : "text-red-neon",
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

function SaleRow({ sale }: { sale: Sale }) {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-b-0">
      <StatusDot status={sale.status} />
      <div className="flex flex-col flex-1 min-w-0">
        <span className="text-[13px] text-white truncate">{sale.customer}</span>
        <span className="text-[11px] text-gray-light/80">{sale.date}</span>
      </div>
      <div className="flex flex-col items-end shrink-0">
        <span className="text-[13px] text-white font-medium">
          {formatBRL(sale.value)}
        </span>
        <StatusLabel status={sale.status} />
      </div>
    </div>
  );
}

export function RecentSales() {
  return (
    <div className="w-full h-full bg-blue-dark/50 backdrop-blur-xs rounded-[10px] py-2.5 px-5 pointer-events-auto flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="bg-blue-neon/20 border border-blue-neon w-fit h-fit p-1 rounded-[5px]">
          <History className="text-blue-neon p-1" />
        </div>
        <span className="text-white">Vendas Recentes</span>
      </div>
      <div className="flex-1 min-h-0 flex flex-col overflow-y-auto pr-1 justify-between">
        {SALES.map((sale, i) => (
          <SaleRow key={i} sale={sale} />
        ))}
      </div>
    </div>
  );
}
