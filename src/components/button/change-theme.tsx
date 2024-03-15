"use client";

import { useThemeStore } from "@/store";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { MoonIcon, SunIcon } from "../svgs";

const hideOnPages = ["/meet/room"];

export const ChangeTheme = () => {
  const pathname = usePathname();
  const { isDark, setIsDark } = useThemeStore();

  const handleClick = () => {
    setIsDark(!isDark);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isDark) document.documentElement.classList.remove("dark");
      else document.documentElement.classList.add("dark");
    }, 200);

    return () => {
      clearTimeout(timeout);
    };
    //timeoutRef.current = setTimeout(()=>)
  }, [isDark]);

  if (hideOnPages.some((p) => pathname.includes(p))) {
    return null;
  }

  return (
    <button onClick={handleClick}>
      {isDark ? (
        <SunIcon
          width={50}
          height={50}
          className="animate-spin animate-duration-500 animate-once animate-ease-linear"
        />
      ) : (
        <MoonIcon
          width={50}
          height={50}
          className="animate-spin animate-duration-500 animate-once animate-ease-linear"
        />
      )}
    </button>
  );
};
