import Image from "next/image";
import { type FC } from "react";

interface NextImageProps {
  src: string;
  width?: number;
  heigth?: number;
  alt: string;
  className?: string;
}

export const NextImage: FC<NextImageProps> = ({
  src,
  width: w = 500,
  heigth: h = 500,
  className: classN = "",
  alt,
}) => {
  return <Image src={src} width={w} height={h} alt={alt} className={classN} />;
};
