"use client";
import { useState, type FC, useRef, useEffect } from "react";
import { NextImage } from "./common";

interface CarrouselProps {
  images: string[];
  delay: number;
}

export const Slider: FC<CarrouselProps> = ({ images, delay }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, delay);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="h-full w-full">
      <NextImage
        src={images[currentImageIndex]!}
        alt={`slider ${currentImageIndex}`}
        className="h-full w-full"
      />
    </div>
  );
};
