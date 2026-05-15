import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { iconMap, IconName } from "@/lib/utils/iconsMap";
import { cn } from "@/lib/utils";

interface TooltipComponentProps {
  iconName: IconName;
  iconClassName?: string;
  contentClassName?: string;
  textTooltip: string;
  iconSize?: number;
  side?: "top" | "right" | "bottom" | "left";
  onIconClick?: () => void;
}

export function TooltipComponent({
  iconName,
  iconClassName,
  contentClassName,
  textTooltip,
  iconSize = 16,
  side = "top",
  onIconClick,
}: TooltipComponentProps) {
  const Icon = iconMap[iconName];

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {Icon && (
          <Icon
            size={iconSize}
            className={cn(iconClassName)}
            onClick={onIconClick}
          />
        )}
      </TooltipTrigger>
      <TooltipContent side={side} className={cn(contentClassName)}>
        <span>{textTooltip}</span>
      </TooltipContent>
    </Tooltip>
  );
}
