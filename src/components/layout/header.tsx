"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// pages where the header is not show
const hideOnPages = ["/meet"];

const Header = () => {
  const pathname = usePathname();

  const { data, status } = useSession();

  const renderUser = (
    <div>
      {data?.user ? (
        <div className="flex items-center gap-2 border-[5px] border-orange-900 bg-neutral-200 p-2">
          <span>{data.user.name}</span>
          <Image
            src={data.user.image ?? "/user.png"}
            width={50}
            height={50}
            alt="avatar"
            className="border-[2px] border-orange-900"
          />
        </div>
      ) : (
        <Link
          href={"/auth"}
          className="text-blue-500 underline hover:text-blue-700"
        >
          Sign in
        </Link>
      )}
    </div>
  );

  if (hideOnPages.some((p) => pathname.includes(p))) {
    return null;
  }

  return (
    <header className="fixed flex w-full items-center justify-between border-b-[4px] border-green-500 px-2 py-3 backdrop-blur-xl ">
      <div className="flex cursor-pointer items-center justify-center">
        <Image src="/icon.png" width={80} height={80} alt="logo" />
        <span className="text-3xl">Forest Meet</span>
      </div>
      <div>{status === "loading" ? "loading" : renderUser}</div>
    </header>
  );
};

export default Header;
