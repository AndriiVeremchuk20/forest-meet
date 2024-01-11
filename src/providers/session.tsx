"use client";

import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

const AppSessionProvider = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AppSessionProvider;
