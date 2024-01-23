"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NextLink } from "../default";

// pages where the header is not show
const hideOnPages = ["/meet/room"];

const Logo = () => {
  return (
    <Link
      href={"/"}
      className="flex cursor-pointer items-center justify-center"
    >
      <Image src="/icon.png" width={80} height={80} alt="logo" />
      <span className="text-3xl">Forest Meet</span>
    </Link>
  );
};

const User = () => {
  const { data } = useSession();

  return (
    <div className="flex items-center gap-2 bg-green-400 p-2 dark:bg-blue-900">
      {data?.user ? (
        <>
          <span>{data.user.name}</span>
          <Image
            src={data.user.image ?? "/user.png"}
            width={50}
            height={50}
            alt="avatar"
            className="border-[2px] border-orange-900"
          />
        </>
      ) : (
        <NextLink href={"/auth"}>Sign in</NextLink>
      )}
    </div>
  );
};

const Header = () => {
  const pathname = usePathname();

  if (hideOnPages.some((p) => pathname.includes(p))) {
    return null;
  }

  return (
    <header className="fixed flex w-full items-center justify-between border-b-[4px] border-green-500 px-2 py-3 backdrop-blur-xl dark:border-blue-900">
      <Logo />
      <User />
    </header>
  );
};

export default Header;
