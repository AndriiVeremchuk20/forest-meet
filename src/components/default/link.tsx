import Link from "next/link";
import type { FC, ReactNode } from "react";

interface NextLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

const defaultLinkClassName = "text-blue-500 underline hover:text-blue-700";

export const NextLink: FC<NextLinkProps> = ({
  href,
  children,
  className: classN = defaultLinkClassName,
}) => {
  return (
    <Link className={classN} href={href}>
      {children}
    </Link>
  );
};

const defaultCustomLinkClassName =
  "bg-green-400 p-4 text-3xl text-white hover:bg-green-500 focus:bg-green-500 dark:bg-blue-900 dark:hover:bg-blue-950";

export const CustomNextLink: FC<NextLinkProps> = ({
  href,
  children,
  className: classN = defaultCustomLinkClassName,
}) => {
  return (
    <Link href={href} className={classN}>
      {children}
    </Link>
  );
};
