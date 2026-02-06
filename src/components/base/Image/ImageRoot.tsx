import type { ImgHTMLAttributes } from "react";

interface ImageRootProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
}

export function ImageRoot({ src, alt = "imagem", ...rest }: ImageRootProps) {
  return <img src={src} alt={alt} {...rest} />;
}
