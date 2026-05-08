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
    <div className="h-40 w-full bg-blue-dark/50 backdrop-blur-xs border-t-2 border-t-blue-neon rounded-[10px] p-2.5 flex flex-col justify-between items-start overflow-hidden">
      <ImageComponent
        src={srcBackground}
        alt="Grafico"
        classNameWrapper="w-full h-20 absolute bottom-0 left-0 -z-1"
      />
      <div className="flex flex-col gap-2">
        <span className="text-gray-light/50 text-2xl">{title}</span>
        <div
          className={cn(
            "flex-center items-center gap-5 text-[clamp(1rem,2vw,3rem)] lg:text-[clamp(0.8rem,1vw,3rem)]",
            successDisplay ? "text-green-neon" : "text-red-neon",
          )}
        >
          <span>{percent}%</span>
          <span>vs. mesmo período anterior</span>
        </div>
      </div>
      <span className="text-5xl font-bold text-white text-[clamp(2.7rem,3vw,5rem)] lg:text-[clamp(0.8rem,3vw,3rem)]">
        {numberFormatted}
      </span>
    </div>
  );
}
