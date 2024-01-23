"use client";

import { NextLink } from "@/components/default";

const NotFoundPage = () => {
  return (
    <main className="z-50 flex h-screen w-full items-center justify-center backdrop-blur-md">
      <div className="h-auto space-y-3 border-[5px] border-green-400 dark:border-blue-900 phone:w-5/6 tablet:w-4/5 desktop:w-3/6">
        <div className="text-center">
          <h1 className="text-9xl">404</h1>
          <h1 className="text-5xl">Page not found</h1>
        </div>
        <div className="flex w-full justify-center">
          <NextLink type="button" href="/">
            Home
          </NextLink>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
