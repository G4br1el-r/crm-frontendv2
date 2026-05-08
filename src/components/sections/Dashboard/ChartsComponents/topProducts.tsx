/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import { ShoppingBasket } from "lucide-react";
import { formatBRL } from "@/lib/utils/format-currency";

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
    <div className="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-b-0">
      <Rank index={index} />
      <div className="flex flex-col flex-1 min-w-0 gap-1.5">
        <span className="text-[12px] text-white truncate uppercase">
          {product.name}
        </span>
        <ProgressBar percent={percent} />
      </div>
      <div className="flex flex-col items-end shrink-0">
        <span className="text-[13px] text-white font-medium">
          {formatBRL(product.value)}
        </span>
        <div className="flex items-center gap-2 text-[10px] text-gray-light/80 tabular-nums">
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
    <div className="w-full h-full bg-blue-dark/50 backdrop-blur-xs rounded-[10px] py-2.5 px-5 pointer-events-auto flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="bg-blue-neon/20 border border-blue-neon w-fit h-fit p-1 rounded-[5px]">
          <ShoppingBasket className="text-blue-neon p-1" />
        </div>
        <span className="text-white">Top Produtos</span>
      </div>
      <div className="flex-1 min-h-0 flex flex-col overflow-y-auto pr-1 justify-between">
        {PRODUCTS.map((product, i) => (
          <ProductRow key={i} product={product} index={i} maxValue={maxValue} />
        ))}
      </div>
    </div>
  );
}
