"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NextLink } from "../default";
import { useRef, useState } from "react";
import { useOutsideClick } from "@/hooks/outside-click";

// pages where the header is not show
const hideOnPages = ["/meet/room"];

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
  const { data, status } = useSession();
  const [showNav, setShowNav] = useState<boolean>(false);
  const userCardRef = useRef<HTMLDivElement | null>(null);

  const onOpenNav = () => {
    setShowNav((prev) => !prev);
  };

  const onCloseNav = () => {
    setShowNav(false);
  };

  useOutsideClick(userCardRef, onCloseNav);

  if (status === "authenticated") {
    return (
      <div
        onClick={onOpenNav}
        ref={userCardRef}
        className="flex cursor-pointer items-center gap-2 bg-green-400 p-2 dark:bg-blue-900"
      >
        <span>{data.user.name}</span>
        <Image
          src={data.user.image ?? "/user.png"}
          width={50}
          height={50}
          alt="avatar"
          className="border-[2px] border-orange-900"
        />
        {showNav && <Nav />}
      </div>
    );
  }

  return <NextLink href={"/auth"}>Sign in</NextLink>;
};

const Nav = () => {
  const handleSignOutClick = async () => {
    await signOut();
  };

  return (
    <div className="absolute top-24 cursor-pointer divide-y-[3px] divide-neutral-950 bg-green-500 p-2 text-2xl dark:divide-neutral-50 dark:bg-blue-900 phone:w-full tablet:w-full desktop:w-[300px]">
      <Link href={"/tips"} className="p-2 duration-150 hover:ml-2">
        Tips
      </Link>
      <div className="p-2 duration-150 hover:ml-2" onClick={handleSignOutClick}>
        Sign out
      </div>
    </div>
  );
};

export default Header;
