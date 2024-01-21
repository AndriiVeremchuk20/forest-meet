"use client";

import { useThemeStore } from "@/store";
import { MoonIcon, SunIcon } from "../icons";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const hideOnPages = ["/meet/room"];

const ChangeTheme = () => {
  const pathname = usePathname();
  const { isDark, setIsDark } = useThemeStore();

  const handleClick = () => {
    setIsDark(!isDark);
  };

  useEffect(() => {
    if (isDark) document.documentElement.classList.remove("dark");
    else document.documentElement.classList.add("dark");
  }, [isDark]);

  if (hideOnPages.some((p) => pathname.includes(p))) {
    return null;
  }

  return (
    <button
      onClick={handleClick}
      className="absolute right-5 z-20 phone:top-[100px] desktop:top-[120px]"
    >
      {isDark ? <SunIcon width={60} /> : <MoonIcon width={60} />}
    </button>
  );
};

export default ChangeTheme;
