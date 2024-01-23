"use client";

import type { ReactNode, FC } from "react";

interface ButtonProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const defButtonStyle =
  "bg-green-400 p-4 text-3xl text-white hover:bg-green-500 focus:bg-green-500 dark:bg-blue-900 dark:hover:bg-blue-950 focus:dark:bg-opacity-60 focus:dark:bg-opacity-60 disabled:bg-neutral-600 disabled:text-neutral-200";

export const Button: FC<ButtonProps> = ({
  children,
  type,
  disabled,
  className,
  onClick,
}) => {
  return (
    <button
      type={type ?? "button"}
      disabled={!!disabled}
      onClick={onClick}
      className={className ?? defButtonStyle}
    >
      {children}
    </button>
  );
};
