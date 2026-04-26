import { cn } from "@/lib/utils/twMerge";

interface InputLabelProps {
  label: string;
  htmlFor: string;
  readOnly?: boolean;
  classNameLabel?: string;
}

export function InputLabel({ label, htmlFor, readOnly, classNameLabel }: InputLabelProps) {
  return (
    <label htmlFor={htmlFor}>
      <span className={cn("font-bold transition-colors duration-300", classNameLabel)}>{label}</span>
    </label>
  );
}
