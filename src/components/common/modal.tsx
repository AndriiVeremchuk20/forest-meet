"use client";

import { useOutsideClick } from "@/hooks";
import { useRef, type FC, type ReactNode } from "react";

interface ModalProps {
  children?: ReactNode;
  show: boolean;
  onClose: () => void;
}

export const Modal: FC<ModalProps> = ({ children, show, onClose }) => {
  const childrenRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(childrenRef, onClose);

  if (!show) {
    return null;
  }

  return (
    <div className="fixed z-50 flex h-screen w-full items-center justify-center backdrop-blur-md">
      <div ref={childrenRef}>{children}</div>
    </div>
  );
};
