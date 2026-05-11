import { ImageComponent } from "@/components/ui/Image";
import { formatBRL } from "@/lib/utils/format-currency";
import { cn } from "@/lib/utils/twMerge";

interface KpiProps {
  title: string;
  percent: number;
  value: number;
  successDisplay?: boolean;
  isMoney?: boolean;
}

export function Kpi({
  title,
  percent,
  value,
  isMoney,
  successDisplay,
}: KpiProps) {
  const srcBackground = successDisplay
    ? "/dashboard/chart-background-green.webp"
    : "/dashboard/chart-background-red.webp";

  const numberFormatted = isMoney ? formatBRL(value) : value;

  return (
    <div className="min-h-40 w-full bg-blue-dark/50 backdrop-blur-xs xl:border-t-2 xl:border-t-blue-neon rounded-[10px] p-5 flex flex-col justify-between items-start overflow-hidden relative">
      <ImageComponent
        src={srcBackground}
        alt="Grafico"
        classNameWrapper="w-full h-24 absolute bottom-0 left-0 -z-1 opacity-70"
      />
      <div className="flex flex-col gap-1 w-full relative z-10">
        <span className="text-white text-lg font-medium opacity-90">
          {title}
        </span>
        <div
          className={cn(
            "flex items-center gap-4 text-sm",
            successDisplay ? "text-green-neon" : "text-red-neon",
          )}
        >
          <span className="font-semibold">
            {percent > 0 ? `+${percent}` : percent}%
          </span>
          <span className="text-white/60 font-medium truncate">
            vs. período anterior
          </span>
        </div>
      </div>
      <span className="text-3xl 2xl:text-4xl font-bold text-white mt-4 tracking-tight relative z-10">
        {numberFormatted}
      </span>
    </div>
  );
}
