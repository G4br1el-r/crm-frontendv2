/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import { ShoppingBasket } from "lucide-react";
import { formatBRL } from "@/lib/utils/formatCurrency";

interface Product {
  name: string;
  value: number;
  orders: number;
  units: number;
}

const PRODUCTS: Product[] = [
  {
    name: "DEUS CONOSCO DIA A DIA - (ASSINATURA)",
    value: 28041.35,
    orders: 11,
    units: 520,
  },
  {
    name: "DEUS CONOSCO DIA A DIA LETRAS GRANDES - (ASSINATURA)",
    value: 1038.6,
    orders: 3,
    units: 8,
  },
  {
    name: "FOLHETO DEUS CONOSCO MENSAGEM - MARCO - (29/03/26)",
    value: 200.0,
    orders: 2,
    units: 800,
  },
  {
    name: "FOLHETO DEUS CONOSCO MENSAGEM - ABRIL - (03/04/26)",
    value: 200.0,
    orders: 2,
    units: 800,
  },
  {
    name: "FOLHETO DEUS CONOSCO MENSAGEM - ABRIL - (04/04/26)",
    value: 200.0,
    orders: 2,
    units: 800,
  },
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

function ProductRow({
  product,
  index,
  maxValue,
}: {
  product: Product;
  index: number;
  maxValue: number;
}) {
  const percent = (product.value / maxValue) * 100;

  return (
    <div className="flex items-center px-5 group gap-4 py-3 border-b border-white/5 last:border-b-0 hover:bg-white/2 transition-colors cursor-pointer -mx-2">
      <Rank index={index} />
      <div className="flex flex-col flex-1 min-w-0 gap-1.5">
        <span className="text-[12px] text-white/60 group-hover:text-white transition-colors duration-200 truncate uppercase">
          {product.name}
        </span>
        <ProgressBar percent={percent} />
      </div>
      <div className="flex flex-col items-end shrink-0">
        <span className="text-[13px] text-white/60 group-hover:text-white transition-colors duration-200 font-medium">
          {formatBRL(product.value)}
        </span>
        <div className="flex items-center gap-4 text-[10px] text-gray-light/80 tabular-nums">
          <span># {product.orders}</span>
          <span>◷ {product.units} un.</span>
        </div>
      </div>
    </div>
  );
}

export function TopProducts() {
  const maxValue = Math.max(...PRODUCTS.map((p) => p.value));

  return (
    <div className="w-full h-full bg-blue-dark/50 backdrop-blur-xs rounded-[10px] pointer-events-auto flex flex-col gap-4">
      <div className="flex items-center gap-3 px-5 pt-5">
        <div className="bg-blue-neon/20 border border-blue-neon/50 w-fit h-fit p-1.5 rounded-lg shadow-[0_0_10px_rgba(0,50,158,0.2)]">
          <ShoppingBasket size={20} className="text-blue-neon" />
        </div>
        <span className="text-white font-medium text-lg tracking-wide">
          Top Produtos
        </span>
      </div>
      <div className="flex-1 min-h-0 flex flex-col overflow-y-auto pr-2 gap-1 justify-between">
        {PRODUCTS.map((product, i) => (
          <ProductRow key={i} product={product} index={i} maxValue={maxValue} />
        ))}
      </div>
    </div>
  );
}
