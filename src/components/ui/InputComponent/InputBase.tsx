import { cn } from "@/lib/utils/twMerge";
import { forwardRef } from "react";

interface InputBaseProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  className?: string;
  placeHolder?: string;
  readOnly?: boolean;
  disable?: boolean;
}

export const InputBase = forwardRef<HTMLInputElement, InputBaseProps>(function InputBase(
  { id, className, placeHolder, readOnly, disable, ...props },
  ref,
) {
  return (
    <input
      {...props}
      ref={ref}
      id={id}
      tabIndex={readOnly ? -1 : 0}
      placeholder={placeHolder}
      readOnly={readOnly}
      disabled={disable}
      className={cn("w-full h-full focus:outline-none flex", className)}
    />
  );
});
