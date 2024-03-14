"use client";

import { NextLink } from "./common";
import Routes from "@/config/routes";
import { LogoIcon } from "./svgs";
import { useSession } from "next-auth/react";

export const StartLinks = () => {
  const { status } = useSession();
  return (
    <div className="flex flex-col space-y-2">
      <NextLink href={Routes.meetBase} type="button">
        Go To Forest Meet <LogoIcon width={30} />
      </NextLink>
      {status === "unauthenticated" && (
        <NextLink href={Routes.auth} type="button">
          Sign in / Sign up
        </NextLink>
      )}
    </div>
  );
};
