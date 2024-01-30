import Link from "next/link";
import type { FC, ReactNode } from "react";

interface NextLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  type?: "link" | "button";
}

const defaultLinkClassName =
  "text-3xl text-blue-500 underline hover:text-blue-700";

const defaultButtonLinkClassName =
  "bg-green-400 p-4 text-3xl text-center text-white hover:bg-green-500 focus:bg-green-500 dark:bg-blue-900 dark:hover:bg-blue-950 focus:dark:bg-opacity-60 focus:dark:bg-opacity-60 disabled:bg-neutral-600 duration-200 disabled:text-neutral-200";

export const NextLink: FC<NextLinkProps> = ({
  href,
  children,
  type: linkType = "link",
}) => {
  return (
    <Link
      className={
        linkType === "link" ? defaultLinkClassName : defaultButtonLinkClassName
      }
      href={href}
    >
      {children}
    </Link>
  );
};