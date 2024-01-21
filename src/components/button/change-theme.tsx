"use client";

import { useThemeStore } from "@/store";
import { MoonIcon, SunIcon } from "../icons";
import { useEffect } from "react";

const ChangeTheme = () => {
  const { isDark, setIsDark } = useThemeStore();

  const handleClick = () => {
    setIsDark(!isDark);
  };

  useEffect(() => {
    if (isDark) document.documentElement.classList.remove("dark");
    else document.documentElement.classList.add("dark");
  }, [isDark]);

  return (
    <button onClick={handleClick} className="absolute right-5 top-[120px] z-20">
      {isDark ? <SunIcon width={60} /> : <MoonIcon width={60} />}
    </button>
  );
};

export default ChangeTheme;
