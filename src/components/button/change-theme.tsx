"use client";

import { useThemeStore } from "@/store";
import { MoonIcon, SunIcon } from "../icons";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const hideOnPages = ["/meet/room"];

export const ChangeTheme = () => {
  const pathname = usePathname();
  const { isDark, setIsDark } = useThemeStore();
  // const timeoutRef = useRef(null);

  const handleClick = () => {
    setIsDark(!isDark);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isDark) document.documentElement.classList.remove("dark");
      else document.documentElement.classList.add("dark");
    }, 200);

    return ()=>{
		clearTimeout(timeout)
	}
    //timeoutRef.current = setTimeout(()=>)
  }, [isDark]);

  if (hideOnPages.some((p) => pathname.includes(p))) {
    return null;
  }

    return (
    <button
      onClick={handleClick}
      className="absolute left-5 z-20 phone:top-[100px] desktop:top-[120px]"
    >
      {isDark ? <SunIcon width={60} className="animate-spin animate-once animate-duration-500 animate-ease-linear"/> : <MoonIcon width={60} className="animate-spin animate-once animate-duration-500 animate-ease-linear"/>}
    </button>
  );
};
