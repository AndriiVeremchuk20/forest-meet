"use client";

import { usePathname } from "next/navigation";

// pages where the header is not show
const hideOnPages = ["/meet"];

const Header = () => {
  const pathname = usePathname();

  if (hideOnPages.some((p) => pathname.includes(p))) {
    return null;
  }

  return (
    <header className="fixed flex w-full justify-between bg-neutral-500 px-2 py-3 ">
      <div>Logo</div>
      <div className="flex">
        <div>Theme</div>
        <div>Lang</div>
      </div>
      <div>User info</div>
    </header>
  );
};

export default Header;
