import { cn } from "@/lib/utils/twMerge";
import Image from "next/image";

interface ImageComponentProps {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  classNameImg?: string;
  classNameWrapper?: string;
}

export function ImageComponent({ alt, src, classNameImg, classNameWrapper, priority, sizes }: ImageComponentProps) {
  return (
    <div className={cn("relative w-full h-full", classNameWrapper)}>
      <Image alt={alt} src={src} className={classNameImg} priority={priority} sizes={sizes} fill />
    </div>
  );
}
