import { type FC, type ReactNode } from "react";

interface BoxProps {
  children: ReactNode;
  className?: string;
}

export const Box: FC<BoxProps> = ({ children, className }) => {
  return (
    <div
      className={`${className ?? ""} animate-fade border-[5px] border-green-500 backdrop-blur-xl animate-delay-200 dark:border-blue-900 phone:w-full tablet:w-5/6 desktop:w-4/6`}
    >
      {children}
    </div>
  );
};
