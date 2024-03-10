"use client";

import Aos from "aos";
import { useEffect, type ReactNode } from "react";

const AosProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    Aos.init({ duration: 1500, easing: "ease-out" });
  }, []);

  return <>{children}</>;
};

export default AosProvider;
