import { iconMap, IconName } from "@/lib/utils/iconsMap";
import { cn } from "@/lib/utils/twMerge";

interface InputWrapperProps {
  children: React.ReactNode;
  iconName: IconName;
  isPassword?: boolean;
  showPassword?: boolean;
  classNameWrapper?: string;
  classNameIcon?: string;
  onShowPassword?: () => void;
  onSubmitIcon?: () => void;
}

export function InputWrapper({
  children,
  iconName,
  classNameWrapper,
  classNameIcon,
  onSubmitIcon,
  isPassword,
  showPassword,
  onShowPassword,
}: InputWrapperProps) {
  const Icon = iconMap[iconName];
  const IconPassword = iconMap[showPassword ? "eye" : "eyeClose"];

  return (
    <div
      className={cn(
        "w-full h-10 px-3 py-1 flex gap-3 items-center transition-all duration-300",
        classNameWrapper,
      )}
    >
      {Icon && onSubmitIcon ? (
        <button
          type="button"
          onClick={onSubmitIcon}
          aria-label="Pesquisar"
          className="flex items-center justify-center shrink-0"
        >
          <Icon className={cn("w-5 h-5", classNameIcon)} />
        </button>
      ) : Icon ? (
        <Icon
          aria-hidden="true"
          className={cn("w-5 h-5 shrink-0", classNameIcon)}
        />
      ) : null}
      {children}
      {isPassword && IconPassword ? (
        <IconPassword
          onMouseDown={(e: { preventDefault: () => any }) => e.preventDefault()}
          onClick={() => onShowPassword?.()}
          aria-hidden="true"
          className={cn("w-5 h-5 shrink-0 cursor-pointer", classNameIcon)}
        />
      ) : null}
    </div>
  );
}
